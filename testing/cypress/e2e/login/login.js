import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const users = require('../../fixtures/users.json');

// Step to visit login page
Given('I visit the login page', () => {
  cy.visit('http://localhost:3000/login');
});

// Step to fill in the username
Given('I fill in the username', () => {
  cy.get('[data-testid="username-input"]').type(users.userA.username); // using data-testid for username
});

// Step to fill in the login form with correct username and password
When('I fill in the username and password', () => {
  cy.get('[data-testid="username-input"]').type(users.userA.username); // using data-testid for username
  cy.get('[data-testid="password-input"]').type(users.userA.password); // using data-testid for password
});

// Step to fill in the login form with incorrect username and password
When('I fill in an incorrect username and password', () => {
  cy.get('[data-testid="username-input"]').type('incorrectUsername');
  cy.get('[data-testid="password-input"]').type('incorrectPassword'); 
});

// Step to click the login button
When('I click the login button', () => {
  cy.get('[data-testid="login-button"]').click();
});

// Validation for empty username
Then('I should see a validation error for the empty username', () => {
  cy.get('[data-testid="username-input"]:invalid').should('exist'); 
});

// Validation for empty password
Then('I should see a validation error for the empty password', () => {
  cy.get('[data-testid="password-input"]:invalid').should('exist');
});

// Step to check if the chat interface is visible
Then('I should see the chat interface and my username', () => {
  cy.get('[data-testid="user-info"]').contains(users.userA.username)
  cy.get('[data-testid="messages-container"]').should('be.visible');
});

// Step to check for the error alert
Then('I should see an error alert', () => {
  cy.on('window:alert', (str) => {
    expect(str).to.equal('Incorrect username or password');
  });
});
