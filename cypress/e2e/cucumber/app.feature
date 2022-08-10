Feature: Running the star-wars app

  Background:
    When The app is open

  Scenario: Should only present the search form
    And The page title is The Star Wars Search
    Then Only the SearchForm should be visible

  Scenario: Should have default values set
    Then Default SearchForm values should be set

  Scenario: Should be able to search with pressing "enter"
    When Typing a in searchInput
    And Pressing the "Enter" key on keyboard
    Then People searchResults should be visible

  Scenario: Should switch between planets and people
    When Searching and validating API call for planet Tatooine
    Then Planet result should match
      | name     | population | climate | gravity    |
      | Tatooine | 200000     | arid    | 1 standard |
    When Searching and validating API call for people
    Then Not Found page is shown

  Scenario: Should show "Not found." when no results could be found
    When Searching for people abcdef1234!@#$
    Then Not Found page is shown

  Scenario: Should clear results when searching for empty string
    When Searching for planet a
    Then Planets searchResults should be visible
    Then Planet should have more than 1 result
    When Clearing the searchInput
    And Pressing the "Enter" key on keyboard
    Then Planets searchResults should not exist


