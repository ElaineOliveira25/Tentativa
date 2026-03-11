'use strict';

const BasePage = require('./BasePage');

/**
 * SignUpPage — selectors and actions for the Sign Up / Registration screen.
 */
class SignUpPage extends BasePage {
    // ─── Selectors ────────────────────────────────────────────────────────────

    get firstNameInput()       { return $('~test-firstname'); }
    get lastNameInput()        { return $('~test-lastname'); }
    get emailInput()           { return $('android=new UiSelector().text("Email")'); }
    get passwordInput()        { return $('android=new UiSelector().text("Password")'); }
    get confirmPasswordInput() { return $('android=new UiSelector().text("Confirm password")'); }
    get registerButton()       { return $('~test-register-btn'); }
    get errorMessage()         { return $('~test-error-message'); }
    get backToLoginLink()      { return $('~test-back-to-login'); }
    get formTitle()            { return $('android=new UiSelector().text("Login / Sign up Form")'); }

    // ─── Actions ──────────────────────────────────────────────────────────────

    /**
     * Fill the sign-up form.
     * Any field left undefined in the data object is skipped.
     *
     * @param {object} data
     * @param {string} [data.firstName]
     * @param {string} [data.lastName]
     * @param {string} [data.email]
     * @param {string} [data.password]
     * @param {string} [data.confirmPassword]
     */
    async fillSignUpForm({ firstName, lastName, email, password, confirmPassword } = {}) {
        if (firstName !== undefined) {
            const el = await this.firstNameInput;
            await el.waitForDisplayed({ timeout: 15000 });
            await el.clearValue();
            await el.setValue(firstName);
        }
        if (lastName !== undefined) {
            const el = await this.lastNameInput;
            await el.clearValue();
            await el.setValue(lastName);
        }
        if (email !== undefined) {
            const el = await this.emailInput;
            await el.clearValue();
            await el.setValue(email);
        }
        if (password !== undefined) {
            const el = await this.passwordInput;
            await el.clearValue();
            await el.setValue(password);
        }
        if (confirmPassword !== undefined) {
            const el = await this.confirmPasswordInput;
            await el.clearValue();
            await el.setValue(confirmPassword);
        }
        await this.hideKeyboard();
    }

    /** Tap the Register / Sign Up button. */
    async tapRegister() {
        const el = await this.registerButton;
        await el.waitForDisplayed({ timeout: 10000 });
        await el.click();
    }

    /** Return the text of the first visible error message. */
    async getErrorMessage() {
        const el = await this.errorMessage;
        await el.waitForDisplayed({ timeout: 8000 });
        return el.getText();
    }

    /** Returns true when the Register button is displayed. */
    async isSignUpPageDisplayed() {
        return this.isDisplayed('~test-register-btn', 10000);
    }

    /** Returns true when the "Login / Sign up Form" title is visible. */
    async isFormTitleDisplayed() {
        const el = await this.formTitle;
        await el.waitForDisplayed({ timeout: 10000 });
        return el.isDisplayed();
    }

    /** Navigate back to the Login screen. */
    async tapBackToLogin() {
        await this.click('~test-back-to-login');
    }
}

module.exports = new SignUpPage();
