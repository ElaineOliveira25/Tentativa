'use strict';

const BasePage = require('./BasePage');

/**
 * SignUpPage — selectors and actions for the Sign Up / Registration screen.
 * Seletores extraídos de 02_signup.spec.js e 03_navigation.spec.js.
 */
class SignUpPage extends BasePage {
    // ─── Navegação ────────────────────────────────────────────────────────────

    /** Aba "Sign up" dentro da tela Login/Sign up (por description). */
    get signUpTab() {
        return $('android=new UiSelector().description("button-sign-up-container")');
    }

    /** Aba "Sign up" por texto (usada em 03_navigation). */
    get signUpTabByText() {
        return $('android=new UiSelector().text("Sign up")');
    }

    // ─── Campos ───────────────────────────────────────────────────────────────

    /** Campo de e-mail (primeiro EditText da tela de sign up). */
    get emailField() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(0)');
    }

    /** Campo de password (segundo EditText da tela de sign up). */
    get passwordField() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(1)');
    }

    /** Campo de confirm password (terceiro EditText da tela de sign up). */
    get confirmPasswordField() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(2)');
    }

    /** Accessibility ID do campo e-mail (usado em 03_navigation). */
    get emailFieldById() {
        return $('~input-email');
    }

    /** Accessibility ID do campo senha (usado em 03_navigation). */
    get passwordFieldById() {
        return $('~input-password');
    }

    /** Accessibility ID do campo confirm password (usado em 03_navigation). */
    get repeatPasswordFieldById() {
        return $('~input-repeat-password');
    }

    // ─── Buttons ──────────────────────────────────────────────────────────────

    get signUpButton() {
        return $('android=new UiSelector().text("SIGN UP")');
    }

    // ─── Modal de sucesso ─────────────────────────────────────────────────────

    get alertTitle() {
        return $('id=com.wdiodemoapp:id/alert_title');
    }

    /** Título do modal por texto (fallback). */
    get alertTitleByText() {
        return $('android=new UiSelector().text("Signed Up!")');
    }

    get alertOkButton() {
        return $('android=new UiSelector().resourceId("android:id/button1")');
    }

    // ─── Mensagens de erro ────────────────────────────────────────────────────

    get errorEmailMsg() {
        return $('android=new UiSelector().text("Please enter a valid email address")');
    }

    get errorPasswordMsg() {
        return $('android=new UiSelector().text("Please enter at least 8 characters")');
    }

    get errorConfirmPasswordMsg() {
        return $('android=new UiSelector().text("Please enter the same password")');
    }

    // ─── Actions ──────────────────────────────────────────────────────────────

    /** Clica na aba Sign Up para trocar de aba dentro da tela Login/Sign up. */
    async acessarAbaSignUp() {
        await (await this.signUpTab).waitForDisplayed({ timeout: 10000 });
        await (await this.signUpTab).click();
    }

    /**
     * Preenche os campos de sign up.
     * Campos com string vazia são limpos mas não preenchidos (testa validação).
     */
    async preencherCampos(username, password, confirmPassword) {
        const email = await this.emailField;
        await email.waitForDisplayed({ timeout: 10000 });
        await email.setValue(username);

        const pass = await this.passwordField;
        await pass.waitForDisplayed({ timeout: 10000 });
        await pass.setValue(password);

        const confirm = await this.confirmPasswordField;
        await confirm.waitForDisplayed({ timeout: 10000 });
        await confirm.setValue(confirmPassword);
    }

    /** Clica no botão SIGN UP. */
    async clicarSignUp() {
        await (await this.signUpButton).waitForDisplayed({ timeout: 10000 });
        await (await this.signUpButton).click();
    }
}

module.exports = new SignUpPage();
