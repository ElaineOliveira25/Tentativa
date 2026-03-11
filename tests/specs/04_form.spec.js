'use strict';

const { expect }  = require('chai');
const allure      = require('@wdio/allure-reporter').default;
const LoginPage   = require('../../pages/LoginPage');
const HomePage    = require('../../pages/HomePage');
const FormPage    = require('../../pages/FormPage');
const SwipePage   = require('../../pages/SwipePage');
const gestures    = require('../../helpers/gestures');
const users       = require('../../data/users.json');
const forms       = require('../../data/forms.json');

// ─────────────────────────────────────────────────────────────────────────────
// TC-07 | TC-08 | TC-09 — Form submission and gesture interaction
// ─────────────────────────────────────────────────────────────────────────────

describe('Form & Gesture Features', () => {

    before(async () => {
        // Log in once before all tests in this file
        if (!(await LoginPage.isLoginPageDisplayed())) {
           await browser.reloadSession();
        }
        await LoginPage.login(users.validUser.username, users.validUser.password);
        const homeVisible = await HomePage.isHomePageDisplayed();
        expect(homeVisible, 'Must be logged in before form/gesture tests').to.be.true;
    });

    beforeEach(() => {
        allure.addFeature('Forms & Gestures');
        allure.addSuite('Form Interactions');
    });

    // ── TC-07 ─────────────────────────────────────────────────────────────────

    it('[TC-07] Should submit the form successfully with valid data', async () => {
        allure.addStory('Valid Form Submission');
        allure.addSeverity('critical');
        allure.addDescription(
            'Verify that a user can fill in the form with valid data, submit it, '
            + 'and see a success confirmation message.',
        );

        allure.startStep('Navigate to the Forms screen');
        await HomePage.tapFormsTab();
        const formsVisible = await FormPage.isFormPageDisplayed();
        expect(formsVisible, 'Forms screen should be reachable from Home').to.be.true;
        allure.endStep('passed');

        allure.startStep('Fill all form fields with valid data');
        await FormPage.fillForm(forms.validForm);
        allure.endStep('passed');

        allure.startStep('Tap the Submit button');
        await FormPage.submit();
        allure.endStep('passed');

        allure.startStep('Verify success message is displayed');
        const successMsg = await FormPage.getSuccessMessage();
        expect(successMsg, 'A success message should appear after valid submission').to.not.be.empty;
        allure.endStep('passed');
    });

    // ── TC-08 ─────────────────────────────────────────────────────────────────

    it('[TC-08] Should display validation errors when form is submitted with invalid data', async () => {
        allure.addStory('Invalid Form Validation');
        allure.addSeverity('high');
        allure.addDescription(
            'Verify that the form shows appropriate error messages when submitted '
            + 'with invalid input (empty name, malformed email, mismatched passwords).',
        );

        allure.startStep('Navigate to the Forms screen');
        await HomePage.tapFormsTab();
        await FormPage.isFormPageDisplayed();
        allure.endStep('passed');

        allure.startStep('Fill form with invalid data');
        await FormPage.fillForm(forms.invalidForm);
        allure.endStep('passed');

        allure.startStep('Tap Submit');
        await FormPage.submit();
        allure.endStep('passed');

        allure.startStep('Verify at least one error message is displayed');
        const errorVisible = await FormPage.isDisplayed('~test-error-message', 8000);
        expect(errorVisible, 'Error message(s) must appear for invalid form data').to.be.true;
        allure.endStep('passed');

        allure.startStep('Verify success message is NOT displayed');
        const successVisible = await FormPage.isDisplayed('~test-success-message', 2000);
        expect(successVisible, 'Success message must NOT appear for invalid data').to.be.false;
        allure.endStep('passed');
    });

    // ── TC-09 ─────────────────────────────────────────────────────────────────

    it('[TC-09] Should handle swipe gestures correctly on the Swipe screen', async () => {
        allure.addStory('Mobile Gesture Interaction');
        allure.addSeverity('medium');
        allure.addDescription(
            'Verify that swipe-left, swipe-right, and swipe-up gestures can be '
            + 'performed on the Swipe screen without crashing or losing the screen.',
        );

        allure.startStep('Navigate to the Swipe screen');
        await HomePage.tapSwipeTab();
        const swipeVisible = await SwipePage.isSwipePageDisplayed();
        expect(swipeVisible, 'Swipe screen should be displayed').to.be.true;
        allure.endStep('passed');

        allure.startStep('Get the swipe container element');
        const container = await $('~Swipe-screen');
        await container.waitForDisplayed({ timeout: 10000 });
        allure.endStep('passed');

        allure.startStep('Perform swipe-left gesture');
        await gestures.swipeLeft(container);
        await browser.pause(600);
        allure.endStep('passed');

        allure.startStep('Perform swipe-right gesture');
        await gestures.swipeRight(container);
        await browser.pause(600);
        allure.endStep('passed');

        allure.startStep('Perform swipe-up gesture (scroll down)');
        await gestures.swipeUp(0.5);
        await browser.pause(600);
        allure.endStep('passed');

        allure.startStep('Verify Swipe screen is still active after gestures');
        const stillVisible = await SwipePage.isSwipePageDisplayed();
        expect(stillVisible, 'Swipe screen should still be visible after gestures').to.be.true;
        allure.endStep('passed');
    });
});
