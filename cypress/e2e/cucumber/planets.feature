Feature: Searching for planets

  Background:
    When The app is open

  Scenario: Should be able to search by full name
    When Searching for planet Coruscant
    Then Planets searchResults should be visible
    And People searchResults should not exist
    And Planet should have 1 result
    And Planet result should match
      | name      | population    | climate   | gravity    |
      | Coruscant | 1000000000000 | temperate | 1 standard |

  Scenario: Should be able to partially match
    When Searching for planet alee
    Then Planet should have more than 1 result
    And Planet result should match
      | name        | population | climate                   | gravity |
      | Aleen Minor | unknown    | unknown                   | unknown |
      | Kalee       | 4000000000 | arid, temperate, tropical | 1       |

  Scenario: Should show loading state when awaiting results
    When Delaying API call for planet for 3000 ms
    And Searching for planet doesn't matter
    Then Loading page is shown

