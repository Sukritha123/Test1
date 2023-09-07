Feature: E2E validate ECommerce site

    Test to E2E validate the ECommerce site

    Scenario: Ecommerce products delivery
    Given User opens Ecommerce page
    When User adds items to cart
    And Validate the total price
    Then User selects the country and Verify Thankyou message

    Scenario: Filling form to shop
    Given User opens Ecommerce page
    When User fills form details
    And Validate the forms behavior
    Then User clicks shop button

    @DataDrivenCucumber
    Scenario: Filling form to shop-Cucumber Data Driven
    Given User opens Ecommerce page
    When User fills form details- CucumberDataDriven
    | Name | Gender |
    | Billy| Male   |
    And Validate the forms behavior- CucumberDataDriven
    Then User clicks shop button