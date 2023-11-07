const { $ } = require('@wdio/globals')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage{
    /**
     * define selectors using getter methods
     */
    get logo () {
        return $('div[class="app_logo"]');
    }

    get pricesProducts () {
        return browser.$$('//div[@class="inventory_item_price"]');
    }

    get selectFilter () {
        return $('select[data-test="product_sort_container"]');
    }

    get priceProduct () {
        return $('div[class="inventory_item_price"]');
    }

    get productName () {
        return $('div[class="inventory_item_name "]');
    }

    get firstProduct () {
        return $('div[class="inventory_item"]');
    }

    
    
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */

    async sortFunc(list){
        var data = list.sort();
        var data = data.sort(function(a,b){
            a = parseFloat(a.replace(/[^\d\.]/,''));
            b = parseFloat(b.replace(/[^\d\.]/,''));
        
            return b-a;
        });

        return data
    }

    async textProductPricesSort () {
        const selectBox = await $('//select/option');
        if (await selectBox.getText() == 'Name (A to Z)'){
            var txtArray = await this.pricesProducts.map(elem => elem.getText());
            var sortProductPrices = await this.sortFunc(txtArray);
        }
        return sortProductPrices
    }

    async selectFilterDropdown (filter) {
        await this.selectFilter.selectByVisibleText(filter);
    }

    async verifyHighest2LowestPrices(){
        const afterSortPrices = await this.pricesProducts.map(elem => elem.getText());
        const expectedSortPrices= await this.sortFunc(await this.textProductPricesSort());
        await expect(await expectedSortPrices).to.deep.equal(afterSortPrices);
        
    }

    async clickProduct(){
        await this.firstProduct.click();
    }
}

module.exports = new HomePage();
