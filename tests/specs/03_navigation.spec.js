'use strict';

const allure = require('@wdio/allure-reporter').default;
const HomePage = require('../../pages/HomePage');
const NavigationPage = require('../../pages/NavigationPage');
const LoginPage = require('../../pages/LoginPage');
const SignUpPage = require('../../pages/SignUpPage');
const FormPage = require('../../pages/FormPage');

// ─────────────────────────────────────────────────────────────────────────────
// Funcionalidade: Navegação entre telas
// ─────────────────────────────────────────────────────────────────────────────

describe('Navegação entre telas', () => {
    beforeEach(async () => {
        allure.addFeature('Navegação entre telas');
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

        await (await HomePage.homeImage).waitForDisplayed({ timeout: 15000 });
        await (await HomePage.webdriverTitle).waitForDisplayed({ timeout: 15000 });
        await (await HomePage.supportText).waitForDisplayed({ timeout: 15000 });
        await (await HomePage.demoText).waitForDisplayed({ timeout: 15000 });

        allure.endStep('passed');

        // ─────────────────────────────────────────────────────────────────────
        // Webview
        // ─────────────────────────────────────────────────────────────────────
        allure.startStep('Clicar em Webview e validar elementos da tela');

        await NavigationPage.acessarTelaWebview();

        await (await NavigationPage.webviewTitle).waitForDisplayed({ timeout: 15000 });
        await (await NavigationPage.toggleNavigationBar).waitForDisplayed({ timeout: 15000 });

        await NavigationPage.abrirBarraNavegacao();

        await (await NavigationPage.openedNavigationBar).waitForDisplayed({ timeout: 15000 });
        await (await NavigationPage.closeNavigationBar).waitForDisplayed({ timeout: 15000 });

        await NavigationPage.fecharBarraNavegacao();

        allure.endStep('passed');

        // ─────────────────────────────────────────────────────────────────────
        // Login
        // ─────────────────────────────────────────────────────────────────────
        allure.startStep('Clicar em Login e validar elementos da tela de login');

        await LoginPage.acessarTelaLogin();

        await (await LoginPage.loginSignUpTitle).waitForDisplayed({ timeout: 15000 });
        await (await LoginPage.emailFieldById).waitForDisplayed({ timeout: 15000 });
        await (await LoginPage.passwordFieldById).waitForDisplayed({ timeout: 15000 });
        await (await LoginPage.loginButtonById).waitForDisplayed({ timeout: 15000 });

        allure.endStep('passed');

        // ─────────────────────────────────────────────────────────────────────
        // Sign up
        // ─────────────────────────────────────────────────────────────────────
        allure.startStep('Clicar em Sign up e validar elementos da tela de cadastro');

        await SignUpPage.acessarAbaSignUp();

        await (await SignUpPage.emailFieldById).waitForDisplayed({ timeout: 15000 });
        await (await SignUpPage.passwordFieldById).waitForDisplayed({ timeout: 15000 });
        await (await SignUpPage.repeatPasswordFieldById).waitForDisplayed({ timeout: 15000 });
        await (await SignUpPage.signUpButton).waitForDisplayed({ timeout: 15000 });

        allure.endStep('passed');

        // ─────────────────────────────────────────────────────────────────────
        // Forms
        // ─────────────────────────────────────────────────────────────────────
        allure.startStep('Clicar em Forms e validar elementos da tela');

        await FormPage.acessarTelaForms();

        await (await FormPage.formComponentsTitle).waitForDisplayed({ timeout: 15000 });
        await (await FormPage.textInput).waitForDisplayed({ timeout: 15000 });
        await (await FormPage.inputTextResult).waitForDisplayed({ timeout: 15000 });
        await (await FormPage.switchLabel).waitForDisplayed({ timeout: 15000 });
        await (await FormPage.dropdownLabel).waitForDisplayed({ timeout: 15000 });
        await (await FormPage.dropdownDefaultOption).waitForDisplayed({ timeout: 15000 });
        await (await FormPage.formsViewGroup).waitForDisplayed({ timeout: 15000 });

        allure.endStep('passed');

        // ─────────────────────────────────────────────────────────────────────
        // Swipe
        // ─────────────────────────────────────────────────────────────────────
        allure.startStep('Clicar em Swipe e validar elementos da tela');

        await NavigationPage.acessarTelaSwipe();

        await (await NavigationPage.swipeTitle).waitForDisplayed({ timeout: 15000 });
        await (await NavigationPage.swipeSubtitle).waitForDisplayed({ timeout: 15000 });
        await (await NavigationPage.swipeCard).waitForDisplayed({ timeout: 15000 });

        allure.endStep('passed');

        // ─────────────────────────────────────────────────────────────────────
        // Drag
        // ─────────────────────────────────────────────────────────────────────
        allure.startStep('Clicar em Drag e validar elementos da tela');

        await NavigationPage.acessarTelaDrag();

        await (await NavigationPage.dragTitle).waitForDisplayed({ timeout: 15000 });

        allure.endStep('passed');
    });
});
