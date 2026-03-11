'use strict';

const { expect }  = require('chai');
const allure      = require('@wdio/allure-reporter').default;
const LoginPage   = require('../../pages/LoginPage');
const SignUpPage  = require('../../pages/SignUpPage');
const users       = require('../../data/users.json');

// ─────────────────────────────────────────────────────────────────────────────
// TC-04 | TC-05 — Sign Up feature
// ─────────────────────────────────────────────────────────────────────────────

describe('Sign Up Feature', () => {

    beforeEach(async () => {
        allure.addFeature('Sign Up');
        allure.addSuite('Registration');

        // Start from the Login screen
        if (!(await LoginPage.isLoginPageDisplayed())) {
            await browser.reloadSession();
        }
        // Navigate to Sign Up
        await LoginPage.tapSignUpLink();
        const signUpVisible = await SignUpPage.isSignUpPageDisplayed();
        expect(signUpVisible, 'Sign Up screen must be reachable from Login').to.be.true;

        // Validate that the form title is displayed
        const titleVisible = await SignUpPage.isFormTitleDisplayed();
        expect(titleVisible, '"Login / Sign up Form" title must be visible').to.be.true;
    });

    // ── TC-04 ─────────────────────────────────────────────────────────────────

    it('[TC-04] Should register a new user successfully with valid data', async () => {
        allure.addStory('Valid Sign Up');
        allure.addSeverity('critical');
        allure.addDescription(
            'Verify that a new user can complete the sign-up form with valid data '
            + 'and is redirected to the Login screen upon success.',
        );

        // Use a unique email so the test is repeatable across runs
        const uniqueEmail = `tc04_${Date.now()}@test.com`;

        allure.startStep('Fill sign-up form with valid data');
        await SignUpPage.fillSignUpForm({
            firstName:       users.newUser.firstName,
            lastName:        users.newUser.lastName,
            email:           uniqueEmail,
            password:        users.newUser.password,
            confirmPassword: users.newUser.confirmPassword,
        });
        allure.endStep('passed');

        allure.startStep('Tap the Register button');
        await SignUpPage.tapRegister();
        allure.endStep('passed');

        allure.startStep('Verify redirect to Login screen after successful registration');
        const onLogin = await LoginPage.isLoginPageDisplayed();
        expect(onLogin, 'App should redirect to Login after sign-up').to.be.true;
        allure.endStep('passed');
    });

    // ── TC-05 ─────────────────────────────────────────────────────────────────

    it('[TC-05] Should show validation error when sign-up form is submitted empty', async () => {
        allure.addStory('Sign Up Required Field Validation');
        allure.addSeverity('medium');
        allure.addDescription(
            'Verify that all required-field validations are triggered when '
            + 'the sign-up form is submitted without any input.',
        );

        allure.startStep('Tap Register without filling any field');
        await SignUpPage.tapRegister();
        allure.endStep('passed');

        allure.startStep('Verify at least one validation error message is displayed');
        const errorVisible = await SignUpPage.isDisplayed('~test-error-message', 8000);
        expect(errorVisible, 'A validation error message must appear for an empty form').to.be.true;
        allure.endStep('passed');

        allure.startStep('Verify user remains on the Sign Up screen');
        const stillOnSignUp = await SignUpPage.isSignUpPageDisplayed();
        expect(stillOnSignUp, 'User should stay on the Sign Up screen after failed submission').to.be.true;
        allure.endStep('passed');
    });
});
