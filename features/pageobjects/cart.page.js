const { $ } = require('@wdio/globals')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CartPage{
    /**
     * define selectors using getter methods
     */
    get add2CartButton () {
        return $('button[data-test="add-to-cart-sauce-labs-backpack"]');
    }

    get cartButton () {
        return $('a[class="shopping_cart_link"]');
    }
    
    get checkoutButton () {
        return $('button[data-test="checkout"]');
    }

    
    
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */

    async clickAdd2Cart(){
        (await this.add2CartButton).click();    
    }

    async clickCart(){
        (await this.cartButton).click();    
    }

    async clickCheckout(){
        (await this.checkoutButton).click();    
    }
}

module.exports = new CartPage();
