# Use the official React image as the base
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Побудова проєкту
RUN npm run build

# Expose the port
EXPOSE 3000

# Command to run the front-end
CMD ["npm", "start"]
