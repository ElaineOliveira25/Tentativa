'use strict';

const { expect } = require('chai');
const allure = require('@wdio/allure-reporter').default;
const LoginPage = require('../../pages/LoginPage');
const SignUpPage = require('../../pages/SignUpPage');
const dataSignUp = require('../../data/dataSignUp.json');

// ─────────────────────────────────────────────────────────────────────────────
// Funcionalidade: Sign Up
// Cenários positivos e negativos de cadastro
// ─────────────────────────────────────────────────────────────────────────────

describe('Tela de Sign Up', () => {
    beforeEach(async () => {
        allure.addFeature('Sign Up');

        await driver.execute('mobile: terminateApp', { appId: 'com.wdiodemoapp' }).catch(() => {});
        await driver.execute('mobile: activateApp', { appId: 'com.wdiodemoapp' });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // TC-01
    // Cadastro com dados válidos
    // ─────────────────────────────────────────────────────────────────────────

    it('[TC-01] Deve realizar cadastro com sucesso ao informar dados válidos', async () => {
        allure.addStory('Cadastro válido');
        allure.addSeverity('critical');

        await LoginPage.acessarTelaLogin();

        const loginSignUpTitle = await LoginPage.loginSignUpTitle;
        expect(await loginSignUpTitle.isDisplayed()).to.be.true;

        await SignUpPage.acessarAbaSignUp();

        await SignUpPage.preencherCampos(
            dataSignUp.validSignUpUser.username,
            dataSignUp.validSignUpUser.password,
            dataSignUp.validSignUpUser.confirmPassword,
        );

        await SignUpPage.clicarSignUp();

        const alertTitle = await SignUpPage.alertTitle;
        await alertTitle.waitForDisplayed({ timeout: 20000 });
        expect(await alertTitle.isDisplayed()).to.be.true;
        expect(await alertTitle.getText()).to.equal('Signed Up!');

        const alertTitleByText = await SignUpPage.alertTitleByText;
        await alertTitleByText.waitForDisplayed({ timeout: 10000 });
        expect(await alertTitleByText.isDisplayed()).to.be.true;

        const okButton = await SignUpPage.alertOkButton;
        await okButton.waitForDisplayed({ timeout: 10000 });
        expect(await okButton.isDisplayed()).to.be.true;
    });

    // ─────────────────────────────────────────────────────────────────────────
    // TC-02
    // Cadastro com todos os campos vazios
    // ─────────────────────────────────────────────────────────────────────────

    it('[TC-02] Deve exibir mensagens de erro ao tentar cadastrar com todos os campos vazios', async () => {
        allure.addStory('Validação de campos obrigatórios');
        allure.addSeverity('high');

        await LoginPage.acessarTelaLogin();
        await SignUpPage.acessarAbaSignUp();
        await SignUpPage.clicarSignUp();

        const erroEmail = await SignUpPage.errorEmailMsg;
        const erroPassword = await SignUpPage.errorPasswordMsg;
        const erroConfirmPassword = await SignUpPage.errorConfirmPasswordMsg;

        await erroEmail.waitForDisplayed({ timeout: 10000 });
        await erroPassword.waitForDisplayed({ timeout: 10000 });
        await erroConfirmPassword.waitForDisplayed({ timeout: 10000 });

        expect(await erroEmail.isDisplayed()).to.be.true;
        expect(await erroPassword.isDisplayed()).to.be.true;
        expect(await erroConfirmPassword.isDisplayed()).to.be.true;
    });

    // ─────────────────────────────────────────────────────────────────────────
    // TC-03
    // Cadastro com email inválido
    // ─────────────────────────────────────────────────────────────────────────

    it('[TC-03] Deve exibir mensagem de erro ao informar email inválido', async () => {
        allure.addStory('Validação de email inválido');
        allure.addSeverity('high');

        await LoginPage.acessarTelaLogin();
        await SignUpPage.acessarAbaSignUp();

        await SignUpPage.preencherCampos(
            dataSignUp.invalidEmailSignUpUser.username,
            dataSignUp.invalidEmailSignUpUser.password,
            dataSignUp.invalidEmailSignUpUser.confirmPassword,
        );

        await SignUpPage.clicarSignUp();

        const erroEmail = await SignUpPage.errorEmailMsg;
        await erroEmail.waitForDisplayed({ timeout: 10000 });
        expect(await erroEmail.isDisplayed()).to.be.true;
    });

    // ─────────────────────────────────────────────────────────────────────────
    // TC-04
    // Cadastro com password menor que 8 caracteres
    // ─────────────────────────────────────────────────────────────────────────

    it('[TC-04] Deve exibir erro quando o password possuir menos de 8 caracteres', async () => {
        allure.addStory('Validação de tamanho do password');
        allure.addSeverity('high');

        await LoginPage.acessarTelaLogin();
        await SignUpPage.acessarAbaSignUp();

        await SignUpPage.preencherCampos(
            dataSignUp.shortPasswordSignUpUser.username,
            dataSignUp.shortPasswordSignUpUser.password,
            dataSignUp.shortPasswordSignUpUser.confirmPassword,
        );

        await SignUpPage.clicarSignUp();

        const erroPassword = await SignUpPage.errorPasswordMsg;
        await erroPassword.waitForDisplayed({ timeout: 10000 });
        expect(await erroPassword.isDisplayed()).to.be.true;
    });

    // ─────────────────────────────────────────────────────────────────────────
    // TC-05
    // Cadastro com confirm password menor que 8 caracteres
    // ─────────────────────────────────────────────────────────────────────────

    it('[TC-05] Deve exibir erro quando o confirm password possuir menos de 8 caracteres', async () => {
        allure.addStory('Validação de tamanho do confirm password');
        allure.addSeverity('high');

        await LoginPage.acessarTelaLogin();
        await SignUpPage.acessarAbaSignUp();

        await SignUpPage.preencherCampos(
            dataSignUp.shortConfirmPasswordUser.username,
            dataSignUp.shortConfirmPasswordUser.password,
            dataSignUp.shortConfirmPasswordUser.confirmPassword,
        );

        await SignUpPage.clicarSignUp();

        const erroConfirmPassword = await SignUpPage.errorConfirmPasswordMsg;
        await erroConfirmPassword.waitForDisplayed({ timeout: 10000 });
        expect(await erroConfirmPassword.isDisplayed()).to.be.true;
    });

    // ─────────────────────────────────────────────────────────────────────────
    // TC-06
    // Cadastro com password vazio
    // ─────────────────────────────────────────────────────────────────────────

    it('[TC-06] Deve exibir erro quando o password não for preenchido', async () => {
        allure.addStory('Password obrigatório');
        allure.addSeverity('high');

        await LoginPage.acessarTelaLogin();
        await SignUpPage.acessarAbaSignUp();

        await SignUpPage.preencherCampos(
            dataSignUp.emptyPasswordSignUpUser.username,
            dataSignUp.emptyPasswordSignUpUser.password,
            dataSignUp.emptyPasswordSignUpUser.confirmPassword,
        );

        await SignUpPage.clicarSignUp();

        const erroPassword = await SignUpPage.errorPasswordMsg;
        await erroPassword.waitForDisplayed({ timeout: 10000 });
        expect(await erroPassword.isDisplayed()).to.be.true;
    });

    // ─────────────────────────────────────────────────────────────────────────
    // TC-07
    // Cadastro com confirm password vazio
    // ─────────────────────────────────────────────────────────────────────────

    it('[TC-07] Deve exibir erro quando o confirm password não for preenchido', async () => {
        allure.addStory('Confirm Password obrigatório');
        allure.addSeverity('high');

        await LoginPage.acessarTelaLogin();
        await SignUpPage.acessarAbaSignUp();

        await SignUpPage.preencherCampos(
            dataSignUp.emptyConfirmPasswordSignUpUser.username,
            dataSignUp.emptyConfirmPasswordSignUpUser.password,
            dataSignUp.emptyConfirmPasswordSignUpUser.confirmPassword,
        );

        await SignUpPage.clicarSignUp();

        const erroConfirmPassword = await SignUpPage.errorConfirmPasswordMsg;
        await erroConfirmPassword.waitForDisplayed({ timeout: 10000 });
        expect(await erroConfirmPassword.isDisplayed()).to.be.true;
    });

    // ─────────────────────────────────────────────────────────────────────────
    // TC-08
    // Cadastro com email vazio
    // ─────────────────────────────────────────────────────────────────────────

    it('[TC-08] Deve exibir erro quando o email não for preenchido', async () => {
        allure.addStory('Email obrigatório');
        allure.addSeverity('high');

        await LoginPage.acessarTelaLogin();
        await SignUpPage.acessarAbaSignUp();

        await SignUpPage.preencherCampos(
            dataSignUp.emptyEmailSignUpUser.username,
            dataSignUp.emptyEmailSignUpUser.password,
            dataSignUp.emptyEmailSignUpUser.confirmPassword,
        );

        await SignUpPage.clicarSignUp();

        const erroEmail = await SignUpPage.errorEmailMsg;
        await erroEmail.waitForDisplayed({ timeout: 10000 });
        expect(await erroEmail.isDisplayed()).to.be.true;
    });

    // ─────────────────────────────────────────────────────────────────────────
    // TC-09
    // Cadastro com password e confirm password diferentes
    // ─────────────────────────────────────────────────────────────────────────

    it('[TC-09] Deve exibir erro quando password e confirm password forem diferentes', async () => {
        allure.addStory('Validação de confirmação de password');
        allure.addSeverity('high');

        await LoginPage.acessarTelaLogin();
        await SignUpPage.acessarAbaSignUp();

        await SignUpPage.preencherCampos(
            dataSignUp.mismatchedPasswordSignUpUser.username,
            dataSignUp.mismatchedPasswordSignUpUser.password,
            dataSignUp.mismatchedPasswordSignUpUser.confirmPassword,
        );

        await SignUpPage.clicarSignUp();

        const erroConfirmPassword = await SignUpPage.errorConfirmPasswordMsg;
        await erroConfirmPassword.waitForDisplayed({ timeout: 10000 });
        expect(await erroConfirmPassword.isDisplayed()).to.be.true;
    });
});
