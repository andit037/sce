Feature: The Internet Sauce Labs Website

  Scenario Outline: As a user, I can make order
    Given I am on the login page
    When I login with <username> and <password>
    And I should see <logo> inside website
    And I see price of products
    And I sort <option> prices
    And I should see the prices is sorted highest to lowest
    And I should see the highest prices is <prices> and product is <product_name>
    And I select the highest price product
    And I choose add to cart the highest product
    And I checkout the highest product
    And I should see checkout information consist of <items>
    And I insert <items> of checkout information with each of <values>
    And I go to next page after checkout
    Then I should see success order <messages> after buy the product

    Examples: 
      | username      | password     | logo      | option              | prices | product_name             | items                         | values              | messages                  |
      | standard_user | secret_sauce | Swag Labs | Price (high to low) | $49.99 | Sauce Labs Fleece Jacket | firstName,lastName,postalCode | user,standart,13690 | Thank you for your order! |
