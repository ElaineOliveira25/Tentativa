'use strict';

const BasePage = require('./BasePage');

/**
 * FormPage — selectors and actions for the Forms screen.
 */
class FormPage extends BasePage {
    // ─── Selectors ────────────────────────────────────────────────────────────

    get nameInput()           { return $('~test-input-name'); }
    get emailInput()          { return $('~test-input-email'); }
    get passwordInput()       { return $('~test-input-password'); }
    get repeatPasswordInput() { return $('~test-input-repeat-password'); }
    get websiteInput()        { return $('~test-input-website'); }
    get descriptionInput()    { return $('~test-input-description'); }
    get activeSwitch()        { return $('~test-active-switch'); }
    get submitButton()        { return $('~test-submit-btn'); }
    get successMessage()      { return $('~test-success-message'); }
    get errorMessage()        { return $('~test-error-message'); }

    // ─── Actions ──────────────────────────────────────────────────────────────

    /**
     * Fill form fields. Any key absent from the data object is skipped.
     *
     * @param {object} data
     * @param {string} [data.name]
     * @param {string} [data.email]
     * @param {string} [data.password]
     * @param {string} [data.repeatPassword]
     * @param {string} [data.website]
     * @param {string} [data.description]
     */
    async fillForm({ name, email, password, repeatPassword, website, description } = {}) {
        const fill = async (getter, value) => {
            if (value === undefined) return;
            const el = await getter;
            await el.clearValue();
            if (value !== '') await el.setValue(value);
        };

        await fill(this.nameInput, name);
        await fill(this.emailInput, email);
        await fill(this.passwordInput, password);
        await fill(this.repeatPasswordInput, repeatPassword);
        await fill(this.websiteInput, website);
        await fill(this.descriptionInput, description);

        await this.hideKeyboard();
    }

    /** Tap the submit button. */
    async submit() {
        const el = await this.submitButton;
        await el.waitForDisplayed({ timeout: 10000 });
        await el.click();
    }

    /** Return success message text; throws if not visible within timeout. */
    async getSuccessMessage() {
        const el = await this.successMessage;
        await el.waitForDisplayed({ timeout: 8000 });
        return el.getText();
    }

    /** Return error message text; throws if not visible within timeout. */
    async getErrorMessage() {
        const el = await this.errorMessage;
        await el.waitForDisplayed({ timeout: 8000 });
        return el.getText();
    }

    /** Toggle the active/inactive switch on the form. */
    async toggleActiveSwitch() {
        await (await this.activeSwitch).click();
    }

    /** Returns true when the Submit button is displayed. */
    async isFormPageDisplayed() {
        return this.isDisplayed('~test-submit-btn', 10000);
    }
}

module.exports = new FormPage();
