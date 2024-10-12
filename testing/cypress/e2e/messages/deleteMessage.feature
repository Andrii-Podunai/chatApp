Feature: Delete a message in chat

  Scenario: User A deletes a message and User B no longer sees it
    Given I am logged in as User A
    When User A sends a message "Hello from A"
    And User A deletes the message
    And User A logs out
    Then I log in as User B
    Then User B should not see "Hello from A" in the message history
