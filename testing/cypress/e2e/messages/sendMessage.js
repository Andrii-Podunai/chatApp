import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
const { userA, userB } = require('../../fixtures/users.json');
let messageId = '';

// User A logs in
Given('I am logged in as User A', () => {
  cy.login(userA.username, userA.password);
});

// Test for sending an empty message (required field validation)
When('User A tries to send an empty message', () => {
  cy.get('[data-testid="send-button"]').click(); 
});

// Validate that an error message is displayed for the empty message
Then('User A should see a validation error for the empty message', () => {
  cy.get('[data-testid="message-input"]:invalid').should('exist'); 
});

// User A sends a message
When('User A sends a message {string}', (message) => {
  cy.intercept('POST', '**/api/messages').as('sendMessage');

  cy.get('[data-testid="message-input"]').type(message);
  cy.get('[data-testid="send-button"]').click();

  cy.wait('@sendMessage').then((interception) => {
    const response = interception.response.body;
    messageId = response._id;
  });
});

// User A verifies the message is sent
Then('User A verifies the message is sent', () => {
  cy.get(`[data-testid="message-${messageId}"]`).should('be.visible'); 
});

// User A logs out
When('User A logs out', () => {
  cy.get('[data-testid="logout-button"]').click(); // Click logout button
  cy.get('[data-testid="login-title"]').should('be.visible');
});

// User B logs in
Then('I log in as User B', () => {
  cy.login(userB.username, userB.password); 
});

// User B should see the message sent by User A
Then('User B should see {string} in the message history', (message) => {
  cy.get(`[data-testid="message-${messageId}"]`).should('contain', message); 
});
