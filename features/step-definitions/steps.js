const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, $ } = require('@wdio/globals')

const LoginPage = require('../pageobjects/login.page');
const HomePage = require('../pageobjects/home.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');


Given(/^I am on the login page$/, async() => {
	await browser.url(`https://www.saucedemo.com/`)
});


When(/^I login with (.*) and (.*)$/, async (username, password) => {
    await LoginPage.login(username, password)
});


When(/^I should see (.*) inside website$/, async(logo) => {
	await expect(HomePage.logo).toBeExisting();
    await expect(HomePage.logo).toHaveTextContaining(logo);
});


When(/^I see price of products$/, async() => {
	await HomePage.textProductPricesSort();
});


When(/^I sort (.*) prices$/, async (filter) => {
	await HomePage.selectFilterDropdown(filter)
});


When(/^I should see the prices is sorted highest to lowest$/, async() => {
	await HomePage.verifyHighest2LowestPrices();
});


When(/^I should see the highest prices is (.*) and product is (.*)$/, async(price,product_name) => {
	await expect(HomePage.productName).toBeExisting();
    await expect(HomePage.productName).toHaveTextContaining(product_name);

    await expect(HomePage.priceProduct).toBeExisting();
    await expect(HomePage.priceProduct).toHaveTextContaining(price);
});


When(/^I select the highest price product$/, async() => {
	await HomePage.clickProduct();
});


When(/^I choose add to cart the highest product$/, async() => {
	await CartPage.clickAdd2Cart();
    await CartPage.clickCart();
});


When(/^I checkout the highest product$/, async() => {
	await CartPage.clickCheckout();
});



When(/^I should see checkout information consist of (.*)$/, async(items) => {
	var optArr = items.split(",")
    for (let i = 0; i < optArr.length; i++) {
		const elem = await CheckoutPage.checkoutInformation(optArr[i]);
		await expect(elem).toBePresent()
	  }
});



When(/^I insert (.*) of checkout information with each of (.*)$/, async(items,values) => {
	var optArr = items.split(",")
	var valArr = values.split(",")
    for (let i = 0; i < optArr.length; i++){
		await CheckoutPage.insertCheckoutInformation(optArr[i],valArr[i]);
	}
	await browser.pause(1000);
});


When(/^I go to next page after checkout$/, async() => {
	await CheckoutPage.clickContinue();
	await CheckoutPage.clickFinish();
});



Then(/^I should see success order (.*) after buy the product$/, async(messages) => {
	await expect(CheckoutPage.completeOrderMessage).toBeExisting();
    await expect(CheckoutPage.completeOrderMessage).toHaveTextContaining(messages);
	await browser.saveScreenshot("./screenshoot/web/screenshot.png")
});
