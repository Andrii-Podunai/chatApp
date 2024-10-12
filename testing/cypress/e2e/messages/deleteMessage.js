import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
const { userA, userB } = require('../../fixtures/users.json');
let messageId = '';

// Login for User A
Given('I am logged in as User A', () => {
  cy.visit('http://localhost:3000/login');
  cy.get('[data-testid="username-input"]').type(userA.username);
  cy.get('[data-testid="password-input"]').type(userA.password);
  cy.get('[data-testid="login-button"]').click();
});

// User A sends a message
When('User A sends a message {string}', (message) => {
  cy.intercept('POST', '**/api/messages').as('sendMessage');

  cy.get('[data-testid="message-input"]').type(message);
  cy.get('[data-testid="send-button"]').click();

  cy.wait('@sendMessage').then((interception) => {
    const response = interception.response.body;
    messageId = response._id;
    cy.get(`[data-testid="message-${messageId}"]`).should('be.visible');
  });
});

// User A deletes the message
When('User A deletes the message', () => {
  cy.get(`[data-testid="delete-button-${messageId}"]`).click();
  cy.get(`[data-testid="message-${messageId}"]`).should('not.exist');
});

// User A logs out
When('User A logs out', () => {
  cy.get('[data-testid="logout-button"]').click();
  cy.get('[data-testid="login-title"]').should('be.visible');
});

// Login for User B
Then('I log in as User B', () => {
  cy.get('[data-testid="username-input"]').type(userB.username);
  cy.get('[data-testid="password-input"]').type(userB.password);
  cy.get('[data-testid="login-button"]').click();
});

// User B does not see the message
Then('User B should not see {string} in the message history', (message) => {
  cy.get('[data-testid="messages-container"]').should('be.visible');
  cy.get(`[data-testid="message-${messageId}"]`).should('not.exist');
});
