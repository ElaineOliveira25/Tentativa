'use strict';

const { expect } = require('chai');
const allure = require('@wdio/allure-reporter').default;
const HomePage = require('../../pages/HomePage');
const NavigationPage = require('../../pages/NavigationPage');
const LoginPage = require('../../pages/LoginPage');
const SignUpPage = require('../../pages/SignUpPage');
const FormPage = require('../../pages/FormPage');

describe('Navegação entre telas', () => {
    beforeEach(async () => {
        allure.addFeature('Navegação');
    });

    it('Deve navegar entre as telas pelo menu inferior e validar os elementos principais de cada tela', async () => {
        allure.addStory('Navegação entre telas');
        allure.addSeverity('critical');
        allure.addDescription(
            'Verifica a navegação entre as telas Home, Webview, Login, Sign up, Forms, Swipe e Drag, '
            + 'validando os principais elementos exibidos em cada tela.',
        );

        // ─────────────────────────────────────────────────────────────────────
        // Home
        // ─────────────────────────────────────────────────────────────────────
        allure.startStep('Clicar em Home e validar elementos da tela inicial');

        await HomePage.acessarTelaHome();

        const homeImage = await HomePage.homeImage;
        await homeImage.waitForDisplayed({ timeout: 15000 });
        expect(await homeImage.isDisplayed()).to.be.true;

        const webdriverTitle = await HomePage.webdriverTitle;
        await webdriverTitle.waitForDisplayed({ timeout: 15000 });
        expect(await webdriverTitle.isDisplayed()).to.be.true;

        const supportText = await HomePage.supportText;
        await supportText.waitForDisplayed({ timeout: 15000 });
        expect(await supportText.isDisplayed()).to.be.true;

        const demoText = await HomePage.demoText;
        await demoText.waitForDisplayed({ timeout: 15000 });
        expect(await demoText.isDisplayed()).to.be.true;

        allure.endStep('passed');

        // ─────────────────────────────────────────────────────────────────────
        // Webview
        // ─────────────────────────────────────────────────────────────────────
        allure.startStep('Clicar em Webview e validar elementos da tela');

        await NavigationPage.acessarTelaWebview();

        const webviewTitle = await NavigationPage.webviewTitle;
        await webviewTitle.waitForDisplayed({ timeout: 15000 });
        expect(await webviewTitle.isDisplayed()).to.be.true;

        const toggleNavigationBar = await NavigationPage.toggleNavigationBar;
        await toggleNavigationBar.waitForDisplayed({ timeout: 15000 });
        expect(await toggleNavigationBar.isDisplayed()).to.be.true;

        await NavigationPage.abrirBarraNavegacao();

        const openedNavigationBar = await NavigationPage.openedNavigationBar;
        await openedNavigationBar.waitForDisplayed({ timeout: 15000 });
        expect(await openedNavigationBar.isDisplayed()).to.be.true;

        const closeNavigationBar = await NavigationPage.closeNavigationBar;
        await closeNavigationBar.waitForDisplayed({ timeout: 15000 });
        expect(await closeNavigationBar.isDisplayed()).to.be.true;

        await NavigationPage.fecharBarraNavegacao();

        allure.endStep('passed');

        // ─────────────────────────────────────────────────────────────────────
        // Login
        // ─────────────────────────────────────────────────────────────────────
        allure.startStep('Clicar em Login e validar elementos da tela de login');

        await LoginPage.acessarTelaLogin();

        const loginSignUpTitle = await LoginPage.loginSignUpTitle;
        await loginSignUpTitle.waitForDisplayed({ timeout: 15000 });
        expect(await loginSignUpTitle.isDisplayed()).to.be.true;

        const emailInputLogin = await LoginPage.emailFieldById;
        await emailInputLogin.waitForDisplayed({ timeout: 15000 });
        expect(await emailInputLogin.isDisplayed()).to.be.true;

        const passwordInputLogin = await LoginPage.passwordFieldById;
        await passwordInputLogin.waitForDisplayed({ timeout: 15000 });
        expect(await passwordInputLogin.isDisplayed()).to.be.true;

        const loginSubmitButton = await LoginPage.loginButtonById;
        await loginSubmitButton.waitForDisplayed({ timeout: 15000 });
        expect(await loginSubmitButton.isDisplayed()).to.be.true;

        allure.endStep('passed');

        // ─────────────────────────────────────────────────────────────────────
        // Sign up
        // ─────────────────────────────────────────────────────────────────────
        allure.startStep('Clicar em Sign up e validar elementos da tela de cadastro');

        await SignUpPage.acessarAbaSignUp();

        const emailInputSignUp = await SignUpPage.emailFieldById;
        await emailInputSignUp.waitForDisplayed({ timeout: 15000 });
        expect(await emailInputSignUp.isDisplayed()).to.be.true;

        const passwordInputSignUp = await SignUpPage.passwordFieldById;
        await passwordInputSignUp.waitForDisplayed({ timeout: 15000 });
        expect(await passwordInputSignUp.isDisplayed()).to.be.true;

        const repeatPasswordInput = await SignUpPage.repeatPasswordFieldById;
        await repeatPasswordInput.waitForDisplayed({ timeout: 15000 });
        expect(await repeatPasswordInput.isDisplayed()).to.be.true;

        const signUpSubmitButton = await SignUpPage.signUpButton;
        await signUpSubmitButton.waitForDisplayed({ timeout: 15000 });
        expect(await signUpSubmitButton.isDisplayed()).to.be.true;

        allure.endStep('passed');

        // ─────────────────────────────────────────────────────────────────────
        // Forms
        // ─────────────────────────────────────────────────────────────────────
        allure.startStep('Clicar em Forms e validar elementos da tela');

        await FormPage.acessarTelaForms();

        const formComponentsTitle = await FormPage.formComponentsTitle;
        await formComponentsTitle.waitForDisplayed({ timeout: 15000 });
        expect(await formComponentsTitle.isDisplayed()).to.be.true;

        const textInput = await FormPage.textInput;
        await textInput.waitForDisplayed({ timeout: 15000 });
        expect(await textInput.isDisplayed()).to.be.true;

        const inputTextResult = await FormPage.inputTextResult;
        await inputTextResult.waitForDisplayed({ timeout: 15000 });
        expect(await inputTextResult.isDisplayed()).to.be.true;

        const switchLabel = await FormPage.switchLabel;
        await switchLabel.waitForDisplayed({ timeout: 15000 });
        expect(await switchLabel.isDisplayed()).to.be.true;

        const dropdownLabel = await FormPage.dropdownLabel;
        await dropdownLabel.waitForDisplayed({ timeout: 15000 });
        expect(await dropdownLabel.isDisplayed()).to.be.true;

        const activeOption = await FormPage.dropdownDefaultOption;
        await activeOption.waitForDisplayed({ timeout: 15000 });
        expect(await activeOption.isDisplayed()).to.be.true;

        const formsViewGroup = await FormPage.formsViewGroup;
        await formsViewGroup.waitForDisplayed({ timeout: 15000 });
        expect(await formsViewGroup.isDisplayed()).to.be.true;

        allure.endStep('passed');

        // ─────────────────────────────────────────────────────────────────────
        // Swipe
        // ─────────────────────────────────────────────────────────────────────
        allure.startStep('Clicar em Swipe e validar elementos da tela');

        await NavigationPage.acessarTelaSwipe();

        const swipeTitle = await NavigationPage.swipeTitle;
        await swipeTitle.waitForDisplayed({ timeout: 15000 });
        expect(await swipeTitle.isDisplayed()).to.be.true;

        const swipeSubtitle = await NavigationPage.swipeSubtitle;
        await swipeSubtitle.waitForDisplayed({ timeout: 15000 });
        expect(await swipeSubtitle.isDisplayed()).to.be.true;

        const swipeCard = await NavigationPage.swipeCard;
        await swipeCard.waitForDisplayed({ timeout: 15000 });
        expect(await swipeCard.isDisplayed()).to.be.true;

        allure.endStep('passed');

        // ─────────────────────────────────────────────────────────────────────
        // Drag
        // ─────────────────────────────────────────────────────────────────────
        allure.startStep('Clicar em Drag e validar elementos da tela');

        await NavigationPage.acessarTelaDrag();

        const dragTitle = await NavigationPage.dragTitle;
        await dragTitle.waitForDisplayed({ timeout: 15000 });
        expect(await dragTitle.isDisplayed()).to.be.true;

        allure.endStep('passed');
    });
});
