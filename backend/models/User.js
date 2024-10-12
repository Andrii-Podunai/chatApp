import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the User schema
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String },
});

// Middleware to hash the password before saving the user
UserSchema.pre('save', async function(next) {
    // Check if the password has been modified or not
    if (!this.isModified('password')) return next();
    // Generate a salt for hashing
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);
    // Proceed to save the user
    next();
});

// Method to compare the entered password with the hashed password
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Create the User model using the User schema
const User = mongoose.model('User', UserSchema);
export default User;
