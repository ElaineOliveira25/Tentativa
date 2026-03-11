'use strict';

const { expect }    = require('chai');
const allure        = require('@wdio/allure-reporter').default;
const LoginPage     = require('../../pages/LoginPage');
const HomePage      = require('../../pages/HomePage');
const users         = require('../../data/users.json');

// ─────────────────────────────────────────────────────────────────────────────
// TC-01 | TC-02 | TC-03 — Login feature
// ─────────────────────────────────────────────────────────────────────────────

describe('Login Feature', () => {

    // Each spec resets to the Login screen by restarting the app activity.
    beforeEach(async () => {
        allure.addFeature('Login');
        allure.addSuite('Authentication');
        // Ensure we are on the Login screen before each test
        if (!(await LoginPage.isLoginPageDisplayed())) {
           await browser.reloadSession();
        }
    });

    // ── TC-01 ─────────────────────────────────────────────────────────────────

    it('[TC-01] Should login successfully with valid credentials', async () => {
        allure.addStory('Valid Login');
        allure.addSeverity('critical');
        allure.addDescription(
            'Verify that a registered user can log in with correct credentials '
            + 'and is redirected to the Home screen.',
        );

        allure.startStep('Verify Login screen is displayed');
        const loginVisible = await LoginPage.isLoginPageDisplayed();
        expect(loginVisible, 'Login screen must be visible on app launch').to.be.true;
        allure.endStep('passed');

        allure.startStep('Enter valid username and password then tap Login');
        await LoginPage.login(users.validUser.username, users.validUser.password);
        allure.endStep('passed');

        allure.startStep('Verify Home screen is displayed after login');
        const homeVisible = await HomePage.isHomePageDisplayed();
        expect(homeVisible, 'Home screen should appear after successful login').to.be.true;
        allure.endStep('passed');
    });

    // ── TC-02 ─────────────────────────────────────────────────────────────────

    it('[TC-02] Should show error message when logging in with invalid credentials', async () => {
        allure.addStory('Invalid Login');
        allure.addSeverity('high');
        allure.addDescription(
            'Verify that an error message is displayed when the user submits '
            + 'credentials that do not match any account.',
        );

        allure.startStep('Enter invalid credentials and tap Login');
        await LoginPage.login(users.invalidUser.username, users.invalidUser.password);
        allure.endStep('passed');

        allure.startStep('Verify error message is displayed');
        const errorText = await LoginPage.getErrorMessage();
        expect(errorText, 'An error message should be present').to.not.be.empty;
        allure.endStep('passed');

        allure.startStep('Verify Login screen is still displayed (not navigated away)');
        const stillOnLogin = await LoginPage.isLoginPageDisplayed();
        expect(stillOnLogin, 'User should remain on the Login screen').to.be.true;
        allure.endStep('passed');
    });

    // ── TC-03 ─────────────────────────────────────────────────────────────────

    it('[TC-03] Should show validation error when submitting empty login form', async () => {
        allure.addStory('Login Required Field Validation');
        allure.addSeverity('medium');
        allure.addDescription(
            'Verify that required-field validation is triggered when the login '
            + 'form is submitted without any credentials.',
        );

        allure.startStep('Tap Login without entering any credentials');
        await LoginPage.login(users.emptyUser.username, users.emptyUser.password);
        allure.endStep('passed');

        allure.startStep('Verify an error or validation message is displayed');
        const errorVisible = await LoginPage.isDisplayed('~test-error-message', 8000);
        expect(errorVisible, 'A validation error message must appear for empty fields').to.be.true;
        allure.endStep('passed');
    });
});
