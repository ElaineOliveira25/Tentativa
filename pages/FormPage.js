'use strict';

const BasePage = require('./BasePage');

/**
 * FormPage — selectors and actions for the Forms screen.
 */
class FormPage extends BasePage {
    // ─── Selectors ────────────────────────────────────────────────────────────

    /** Botão "Forms" no menu inferior (por texto). */
    get formsMenuButton() {
        return $('android=new UiSelector().text("Forms")');
    }

    /** Botão "Forms" no menu inferior (por description — usado em 03_navigation). */
    get formsMenuButtonByDesc() {
        return $('android=new UiSelector().description("Forms")');
    }

    /** Título da tela de formulário. */
    get formComponentsTitle() {
        return $('android=new UiSelector().text("Form components")');
    }

    // ─── Campo de texto ───────────────────────────────────────────────────────

    /** Campo de texto principal (accessibility ID). */
    get textInput() {
        return $('~text-input');
    }

    /** Elemento que reflete o texto digitado (accessibility ID). */
    get inputTextResult() {
        return $('~input-text-result');
    }

    /** Elemento que reflete o texto digitado (por description — fallback). */
    get inputTextResultByDesc() {
        return $('android=new UiSelector().description("input-text-result")');
    }

    // ─── Switch ───────────────────────────────────────────────────────────────

    get switchLabel() {
        return $('android=new UiSelector().text("Switch:")');
    }

    get switchButton() {
        return $('android=new UiSelector().className("android.widget.Switch")');
    }

    get switchTextOff() {
        return $('android=new UiSelector().text("Click to turn the switch ON")');
    }

    get switchTextOn() {
        return $('android=new UiSelector().text("Click to turn the switch OFF")');
    }

    // ─── Dropdown ─────────────────────────────────────────────────────────────

    get dropdownLabel() {
        return $('android=new UiSelector().text("Dropdown:")');
    }

    get dropdownField() {
        return $('android=new UiSelector().resourceId("text_input")');
    }

    get dropdownOptionAwesome() {
        return $('android=new UiSelector().text("webdriver.io is awesome")');
    }

    get dropdownDefaultOption() {
        return $('android=new UiSelector().text("Active")');
    }

    // ─── Botões Active / Inactive ─────────────────────────────────────────────

    get inactiveButton() {
        return $('android=new UiSelector().text("Inactive")');
    }

    get activeButton() {
        return $('android=new UiSelector().text("Active")');
    }

    /** ViewGroup que agrupa os botões Active/Inactive (usado em 03_navigation). */
    get formsViewGroup() {
        return $('android=new UiSelector().className("android.view.ViewGroup").instance(20)');
    }

    // ─── Modal ────────────────────────────────────────────────────────────────

    get modalTitle() {
        return $('android=new UiSelector().resourceId("com.wdiodemoapp:id/alert_title")');
    }

    get modalMessage() {
        return $('android=new UiSelector().resourceId("android:id/message")');
    }

    get modalButton1() {
        return $('//android.widget.Button[@resource-id="android:id/button1"]');
    }

    get modalButton2() {
        return $('android=new UiSelector().resourceId("android:id/button2")');
    }

    get modalButton3() {
        return $('android=new UiSelector().resourceId("android:id/button3")');
    }

    // ─── Actions ──────────────────────────────────────────────────────────────

    /** Navega para a tela Forms pelo menu inferior. */
    async acessarTelaForms() {
        const btn = await this.formsMenuButton;
        await btn.waitForDisplayed({ timeout: 15000 });
        await btn.click();
    }

    /** Preenche o campo de texto principal com o valor informado. */
    async preencherTextInput(text) {
        const input = await this.textInput;
        await input.waitForDisplayed({ timeout: 15000 });
        await input.click();
        await input.clearValue();
        await input.setValue(text);
    }

    /** Clica no switch para alternar o estado. */
    async clicarSwitch() {
        const sw = await this.switchButton;
        await sw.waitForDisplayed({ timeout: 15000 });
        await sw.click();
    }

    /** Abre o dropdown e seleciona a opção "webdriver.io is awesome". */
    async selecionarOpcaoDropdown() {
        const field = await this.dropdownField;
        await field.waitForDisplayed({ timeout: 15000 });
        await field.click();
        const option = await this.dropdownOptionAwesome;
        await option.waitForDisplayed({ timeout: 15000 });
        await option.click();
    }

    /** Clica em Inactive e depois em Active para abrir o modal. */
    async abrirModal() {
        const inactive = await this.inactiveButton;
        await inactive.waitForDisplayed({ timeout: 15000 });
        await inactive.click();
        const active = await this.activeButton;
        await active.waitForDisplayed({ timeout: 15000 });
        await active.click();
    }

    /** Fecha o modal clicando no botão principal (button1). */
    async fecharModal() {
        const btn = await this.modalButton1;
        await btn.waitForDisplayed({ timeout: 15000 });
        await btn.click();
    }

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
