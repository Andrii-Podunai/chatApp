Feature: send a message in chat

  Scenario: User A sends an empty message
    Given I am logged in as User A
    When User A tries to send an empty message
    Then User A should see a validation error for the empty message

  Scenario: User A sends a message and verifies its existence and after User B verifies its existence
    Given I am logged in as User A
    When User A sends a message "Hello, User B!"
    Then User A verifies the message is sent
    When User A logs out
    Then I log in as User B
    Then User B should see "Hello, User B!" in the message history
