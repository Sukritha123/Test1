Feature: Library API site

    API level testing
@focus 
    Scenario: Single book displayed
    Given User visits website
    When User clicks on Library button
    Then Details of 1 book is displayed

    Scenario: Security testing
    Given User visits website
    When User accesses library page as a different user
    Then 404 error is displayed

    #-----Commented the below scenario, as it needs different test data on each run-----#
    #Scenario: API test POST
    #Then book is added using POST Method







