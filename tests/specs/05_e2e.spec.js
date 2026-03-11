'use strict';

const { expect }  = require('chai');
const allure      = require('@wdio/allure-reporter').default;
const LoginPage   = require('../../pages/LoginPage');
const SignUpPage  = require('../../pages/SignUpPage');
const HomePage    = require('../../pages/HomePage');
const FormPage    = require('../../pages/FormPage');
const users       = require('../../data/users.json');
const forms       = require('../../data/forms.json');

// ─────────────────────────────────────────────────────────────────────────────
// TC-10 — End-to-end happy path
// ─────────────────────────────────────────────────────────────────────────────

describe('End-to-End: Happy Path', () => {

    before(async () => {
        // Ensure a clean app state before the E2E scenario
        if (!(await LoginPage.isLoginPageDisplayed())) {
            await browser.reloadSession();
        }
    });

    beforeEach(() => {
        allure.addFeature('End-to-End');
        allure.addSuite('E2E Happy Path');
    });

    // ── TC-10 ─────────────────────────────────────────────────────────────────

    it('[TC-10] Full happy path — sign up → login → navigate → submit form', async () => {
        allure.addStory('Complete Happy Path');
        allure.addSeverity('blocker');
        allure.addDescription(
            'End-to-end scenario covering: app launch → sign up with a new account → '
            + 'login with a known valid account → navigate to the Forms screen → '
            + 'fill and submit the form → verify success.',
        );

        // ── Step 1: App opens on Login screen ─────────────────────────────────
        allure.startStep('Step 1 — Verify app launches on the Login screen');
        const loginVisible = await LoginPage.isLoginPageDisplayed();
        expect(loginVisible, 'App should open on the Login screen').to.be.true;
        allure.endStep('passed');

        // ── Step 2: Navigate to Sign Up ───────────────────────────────────────
        allure.startStep('Step 2 — Navigate to Sign Up from Login');
        await LoginPage.tapSignUpLink();
        const signUpVisible = await SignUpPage.isSignUpPageDisplayed();
        expect(signUpVisible, 'Sign Up screen should be visible').to.be.true;
        allure.endStep('passed');

        // ── Step 3: Register a new account ────────────────────────────────────
        allure.startStep('Step 3 — Register a new user account');
        const uniqueEmail = `e2e_${Date.now()}@test.com`;
        await SignUpPage.fillSignUpForm({
            firstName:       users.newUser.firstName,
            lastName:        users.newUser.lastName,
            email:           uniqueEmail,
            password:        users.newUser.password,
            confirmPassword: users.newUser.confirmPassword,
        });
        await SignUpPage.tapRegister();
        allure.endStep('passed');

        // ── Step 4: Confirm redirect back to Login ────────────────────────────
        allure.startStep('Step 4 — Confirm redirect to Login screen after registration');
        const backOnLogin = await LoginPage.isLoginPageDisplayed();
        expect(backOnLogin, 'App should redirect to Login after successful sign-up').to.be.true;
        allure.endStep('passed');

        // ── Step 5: Log in with the seeded valid user ─────────────────────────
        allure.startStep('Step 5 — Log in with valid credentials');
        await LoginPage.login(users.validUser.username, users.validUser.password);
        const homeVisible = await HomePage.isHomePageDisplayed();
        expect(homeVisible, 'Home screen should appear after successful login').to.be.true;
        allure.endStep('passed');

        // ── Step 6: Navigate to Forms screen ──────────────────────────────────
        allure.startStep('Step 6 — Navigate to the Forms screen');
        await HomePage.tapFormsTab();
        const formVisible = await FormPage.isFormPageDisplayed();
        expect(formVisible, 'Forms screen should be accessible from Home').to.be.true;
        allure.endStep('passed');

        // ── Step 7: Fill form with valid data ─────────────────────────────────
        allure.startStep('Step 7 — Fill the form with valid data');
        await FormPage.fillForm(forms.validForm);
        allure.endStep('passed');

        // ── Step 8: Submit form ────────────────────────────────────────────────
        allure.startStep('Step 8 — Submit the form');
        await FormPage.submit();
        allure.endStep('passed');

        // ── Step 9: Verify success message ────────────────────────────────────
        allure.startStep('Step 9 — Verify form submission success message');
        const successMsg = await FormPage.getSuccessMessage();
        expect(successMsg, 'A success message must be shown after valid form submission')
            .to.not.be.empty;
        allure.endStep('passed');
    });
});
