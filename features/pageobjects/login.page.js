const { $ } = require('@wdio/globals')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage{
    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $('input[data-test="username"]');
    }

    get inputPassword () {
        return $('input[data-test="password"]');
    }

    get btnSubmit () {
        return $('input[data-test="login-button"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }
}

module.exports = new LoginPage();
