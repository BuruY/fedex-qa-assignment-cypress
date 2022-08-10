Feature: Searching for people

  Background:
    When The app is open

  Scenario: Should be able to search by full name
    When Searching for people Chewbacca
    Then People searchResults should be visible
    And Planets searchResults should not exist
    And People should have 1 result
    And People result should match
      | name      | gender | birtYear | eyeColor | skinColor |
      | Chewbacca | male   | 200BBY   | blue     | unknown   |

  Scenario: Should be able to partially match
    When Searching for people si
    Then People should have more than 1 result
    And People result should match
      | name                  | gender        | birtYear | eyeColor | skinColor        |
      | Jabba Desilijic Tiure | hermaphrodite | 600BBY   | orange   | green-tan, brown |
      | Lando Calrissian      | male          | 31BBY    | brown    | dark             |

  Scenario: Should show loading state when awaiting results
    When Delaying API call for people for 3000 ms
    And Searching for people doesn't matter
    Then Loading page is shown
