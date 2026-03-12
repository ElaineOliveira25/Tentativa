'use strict';

const BasePage = require('./BasePage');

/**
 * LoginPage — selectors and actions for the Login screen.
 * Seletores extraídos de 01_login.spec.js e 03_navigation.spec.js.
 */
class LoginPage extends BasePage {
    // ─── Navegação ────────────────────────────────────────────────────────────

    /** Botão "Login" no menu inferior (description). */
    get loginMenuButton() {
        return $('android=new UiSelector().description("Login")');
    }

    /** Título da tela "Login / Sign up Form". */
    get loginSignUpTitle() {
        return $('android=new UiSelector().text("Login / Sign up Form")');
    }

    // ─── Campos ───────────────────────────────────────────────────────────────

    /** Campo de e-mail (primeiro EditText da tela). */
    get emailField() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(0)');
    }

    /** Campo de senha (segundo EditText da tela). */
    get passwordField() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(1)');
    }

    // ─── Buttons ──────────────────────────────────────────────────────────────

    /** Botão de submit do formulário de login. */
    get loginButton() {
        return $('android=new UiSelector().text("LOGIN")');
    }

    /** Accessibility ID do botão de login (usado em 03_navigation). */
    get loginButtonById() {
        return $('~button-LOGIN');
    }

    /** Accessibility ID do campo e-mail (usado em 03_navigation). */
    get emailFieldById() {
        return $('~input-email');
    }

    /** Accessibility ID do campo senha (usado em 03_navigation). */
    get passwordFieldById() {
        return $('~input-password');
    }

    // ─── Mensagens de erro ────────────────────────────────────────────────────

    get errorEmailMsg() {
        return $('android=new UiSelector().text("Please enter a valid email address")');
    }

    get errorPasswordMsg() {
        return $('android=new UiSelector().text("Please enter at least 8 characters")');
    }

    // ─── Modal de sucesso ─────────────────────────────────────────────────────

    get alertTitle() {
        return $('id=com.wdiodemoapp:id/alert_title');
    }

    get alertMessage() {
        return $('android=new UiSelector().resourceId("android:id/message")');
    }

    get alertOkButton() {
        return $('android=new UiSelector().resourceId("android:id/button1")');
    }

    // ─── Actions ──────────────────────────────────────────────────────────────

    /** Navega até a tela de Login pelo menu inferior e valida o título. */
    async acessarTelaLogin() {
        await (await this.loginMenuButton).waitForDisplayed({ timeout: 15000 });
        await (await this.loginMenuButton).click();
        await (await this.loginSignUpTitle).waitForDisplayed({ timeout: 15000 });
    }

    /** Aguarda os três campos principais da tela ficarem visíveis. */
    async aguardarCampos() {
        await (await this.emailField).waitForDisplayed({ timeout: 15000 });
        await (await this.passwordField).waitForDisplayed({ timeout: 15000 });
        await (await this.loginButton).waitForDisplayed({ timeout: 15000 });
    }

    /**
     * Preenche e-mail e senha e clica em LOGIN.
     * Passe strings vazias para testar validação de campos obrigatórios.
     */
    async login(username, password) {
        const email = await this.emailField;
        await email.waitForDisplayed({ timeout: 15000 });
        await email.clearValue();
        if (username) await email.setValue(username);

        const pass = await this.passwordField;
        await pass.waitForDisplayed({ timeout: 15000 });
        await pass.clearValue();
        if (password) await pass.setValue(password);

        await (await this.loginButton).click();
    }

    /** Clica no botão LOGIN sem preencher nenhum campo. */
    async clicarLoginSemPreencher() {
        await (await this.loginButton).waitForDisplayed({ timeout: 15000 });
        await (await this.loginButton).click();
    }

    /** Fecha o modal de sucesso clicando em OK. */
    async fecharModalSucesso() {
        await (await this.alertOkButton).waitForDisplayed({ timeout: 10000 });
        await (await this.alertOkButton).click();
    }
}

module.exports = new LoginPage();
