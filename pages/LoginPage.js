'use strict';

const BasePage = require('./BasePage');

/**
 * LoginPage — selectors and actions for the Login screen.
 *
 * Accessibility IDs match the WebdriverIO native-demo-app.
 * Update the selector strings if your app uses different IDs.
 */
class LoginPage extends BasePage {
    // ─── Selectors ────────────────────────────────────────────────────────────

    get usernameInput()     { return $('input-email'); }
    get passwordInput()     { return $('input-password'); }
    get loginButton()       { return $('android=new UiSelector().description("button-LOGIN")'); }
    get errorMessage()      { return $('~test-error-message'); }
    get signUpLink()        { return $('android=new UiSelector().text("Sign up")'); }
    get forgotPasswordLink(){ return $('~test-forgot-password'); }

    // ─── Actions ──────────────────────────────────────────────────────────────

    /**
     * Type credentials and tap the Login button.
     * Pass empty strings to test required-field validation.
     */
    async login(username, password) {
        const userEl = await this.usernameInput;
        await userEl.waitForDisplayed({ timeout: 15000 });
        await userEl.clearValue();
        await userEl.setValue(username);

        const passEl = await this.passwordInput;
        await passEl.clearValue();
        await passEl.setValue(password);

        await this.hideKeyboard();

        const loginBtn = await this.loginButton;
        await loginBtn.click();
    }

    /**
     * Return the text of the inline error message.
     */
    async getErrorMessage() {
        const el = await this.errorMessage;
        await el.waitForDisplayed({ timeout: 8000 });
        return el.getText();
    }

    /** Tap the "Sign Up" link to navigate to the registration screen. */
    async tapSignUpLink() {
        const el = await this.signUpLink;
        await el.waitForDisplayed({ timeout: 10000 });
        await el.click();
    }

    /** Returns true when the Login button is displayed. */
    async isLoginPageDisplayed() {
        return this.isDisplayed('android=new UiSelector().description("button-LOGIN")', 10000);
    }
}

module.exports = new LoginPage();
