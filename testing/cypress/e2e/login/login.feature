Feature: User Login Validation

  Scenario: User logs in with existing credentials
    Given I visit the login page
    When I fill in the username and password
    And I click the login button
    Then I should see the chat interface and my username

  Scenario: User tries to log in with an incorrect username and password
    Given I visit the login page
    When I fill in an incorrect username and password
    When I click the login button
    Then I should see an error alert

  Scenario: User attempts to log in with empty username and password
    Given I visit the login page
    When I click the login button
    Then I should see a validation error for the empty username

  Scenario: User attempts to log in with empty password
    Given I visit the login page
    And I fill in the username
    When I click the login button
    Then I should see a validation error for the empty password
