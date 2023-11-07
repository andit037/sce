const { $ } = require('@wdio/globals')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CheckoutPage{
    /**
     * define selectors using getter methods
     */
    checkoutInformation(item) {
        return $(`input[data-test='${item}']`);
    }
    
    get continueButton() {
        return $('input[data-test="continue"]');
    }

    get finishButton() {
        return $('button[data-test="finish"]');
    }
    
    get completeOrderMessage() {
        return $('h2[class="complete-header"]');
    }
    
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */

    async insertCheckoutInformation(items,values){
        await this.checkoutInformation(items).waitForDisplayed({ timeout: 5000 });
        (await this.checkoutInformation(items)).setValue(values);    
    }

    async clickCheckout(){
        (await this.checkoutButton).click();    
    }

    async clickContinue(){
        (await this.continueButton).click();    
    }

    async clickFinish(){
        (await this.finishButton).click();    
    }
}

module.exports = new CheckoutPage();
