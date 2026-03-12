'use strict';

const { expect } = require('chai');
const allure = require('@wdio/allure-reporter').default;
const LoginPage = require('../../pages/LoginPage');
const dataLogin = require('../../data/dataLogin.json');

// ─────────────────────────────────────────────────────────────────────────────
// Funcionalidade: Login
// Cenários positivos e negativos de autenticação
// ─────────────────────────────────────────────────────────────────────────────

describe('Tela de Login', () => {
    beforeEach(async () => {
        allure.addFeature('Tela de Login');

        await driver.execute('mobile: terminateApp', { appId: 'com.wdiodemoapp' }).catch(() => {});
        await driver.execute('mobile: activateApp', { appId: 'com.wdiodemoapp' });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // TC-01
    // Login com credenciais válidas
    // ─────────────────────────────────────────────────────────────────────────

    it('[TC-01] Deve realizar login com sucesso utilizando credenciais válidas', async () => {
        allure.addStory('Login válido');
        allure.addSeverity('critical');

        await LoginPage.acessarTelaLogin();

        const loginSignUpTitle = await LoginPage.loginSignUpTitle123456;
        expect(await loginSignUpTitle.isDisplayed()).to.be.true;

        await LoginPage.login(dataLogin.validUser.username, dataLogin.validUser.password);

        const alertTitle = await LoginPage.alertTitle;
        await alertTitle.waitForDisplayed({ timeout: 20000 });
        expect(await alertTitle.isDisplayed()).to.be.true;
        expect(await alertTitle.getText()).to.equal('Success');

        const alertMessage = await LoginPage.alertMessage;
        await alertMessage.waitForDisplayed({ timeout: 10000 });
        expect(await alertMessage.isDisplayed()).to.be.true;

        const okButton = await LoginPage.alertOkButton;
        await okButton.waitForDisplayed({ timeout: 10000 });
        expect(await okButton.isDisplayed()).to.be.true;

        await LoginPage.fecharModalSucesso();
    });

    // ─────────────────────────────────────────────────────────────────────────
    // TC-02
    // Login sem preencher email e senha
    // ─────────────────────────────────────────────────────────────────────────

    it.skip('[TC-02] Deve exibir mensagens de erro ao tentar logar sem preencher email e senha', async () => {
        allure.addStory('Validação de campos obrigatórios');
        allure.addSeverity('high');

        await LoginPage.acessarTelaLogin();
        await LoginPage.clicarLoginSemPreencher();

        const erroEmail = await LoginPage.errorEmailMsg;
        const erroSenha = await LoginPage.errorPasswordMsg;

        await erroEmail.waitForDisplayed({ timeout: 10000 });
        await erroSenha.waitForDisplayed({ timeout: 10000 });

        expect(await erroEmail.isDisplayed()).to.be.true;
        expect(await erroSenha.isDisplayed()).to.be.true;
    });

    // ─────────────────────────────────────────────────────────────────────────
    // TC-03
    // Login com email inválido
    // ─────────────────────────────────────────────────────────────────────────

    it('[TC-03] Deve exibir mensagem de erro ao informar email inválido', async () => {
        allure.addStory('Validação de email inválido');
        allure.addSeverity('high');

        await LoginPage.acessarTelaLogin();
        await LoginPage.login(dataLogin.invalidEmail.username, dataLogin.invalidEmail.password);

        const erroEmail = await LoginPage.errorEmailMsg;
        await erroEmail.waitForDisplayed({ timeout: 10000 });

        expect(await erroEmail.isDisplayed()).to.be.true;
    });

    // ─────────────────────────────────────────────────────────────────────────
    // TC-04
    // Login com email válido e senha vazia
    // ─────────────────────────────────────────────────────────────────────────

    it('[TC-04] Deve exibir mensagem de erro quando a senha não for preenchida', async () => {
        allure.addStory('Senha obrigatória');
        allure.addSeverity('high');

        await LoginPage.acessarTelaLogin();
        await LoginPage.login(dataLogin.validEmailEmptyPassword.username, '');

        const erroSenha = await LoginPage.errorPasswordMsg;
        await erroSenha.waitForDisplayed({ timeout: 10000 });

        expect(await erroSenha.isDisplayed()).to.be.true;
    });

    // ─────────────────────────────────────────────────────────────────────────
    // TC-05
    // Login com senha menor que 8 caracteres
    // ─────────────────────────────────────────────────────────────────────────

    it('[TC-05] Deve exibir erro quando a senha possuir menos de 8 caracteres', async () => {
        allure.addStory('Validação de tamanho da senha');
        allure.addSeverity('high');

        await LoginPage.acessarTelaLogin();
        await LoginPage.login(dataLogin.shortPassword.username, dataLogin.shortPassword.password);

        const erroSenha = await LoginPage.errorPasswordMsg;
        await erroSenha.waitForDisplayed({ timeout: 10000 });

        expect(await erroSenha.isDisplayed()).to.be.true;
    });
});
