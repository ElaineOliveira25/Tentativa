'use strict';

const { expect }  = require('chai');
const allure      = require('@wdio/allure-reporter').default;
const LoginPage   = require('../../pages/LoginPage');
const HomePage    = require('../../pages/HomePage');
const FormPage    = require('../../pages/FormPage');
const SwipePage   = require('../../pages/SwipePage');
const users       = require('../../data/users.json');

// ─────────────────────────────────────────────────────────────────────────────
// TC-06 — Navigation feature
// ─────────────────────────────────────────────────────────────────────────────

describe('Navigation Feature', () => {

    before(async () => {
        // Log in once before all navigation tests
        if (!(await LoginPage.isLoginPageDisplayed())) {
           await browser.reloadSession();
        }
        await LoginPage.login(users.validUser.username, users.validUser.password);
        const homeVisible = await HomePage.isHomePageDisplayed();
        expect(homeVisible, 'Must be logged in before navigation tests').to.be.true;
    });

    beforeEach(() => {
        allure.addFeature('Navigation');
        allure.addSuite('Screen Navigation');
    });

    // ── TC-06 ─────────────────────────────────────────────────────────────────

    it('[TC-06] Should navigate between all main screens via bottom navigation bar', async () => {
        allure.addStory('Screen Navigation');
        allure.addSeverity('high');
        allure.addDescription(
            'Verify that the user can navigate to every main screen using the '
            + 'bottom navigation bar and that each screen loads correctly.',
        );

        // ── Home → Forms ──────────────────────────────────────────────────────
        allure.startStep('Navigate to the Forms screen');
        await HomePage.tapFormsTab();
        const formsVisible = await FormPage.isFormPageDisplayed();
        expect(formsVisible, 'Forms screen should be displayed').to.be.true;
        allure.endStep('passed');

        // ── Forms → Swipe ─────────────────────────────────────────────────────
        allure.startStep('Navigate to the Swipe screen');
        await HomePage.tapSwipeTab();
        const swipeVisible = await SwipePage.isSwipePageDisplayed();
        expect(swipeVisible, 'Swipe screen should be displayed').to.be.true;
        allure.endStep('passed');

        // ── Swipe → Home ──────────────────────────────────────────────────────
        allure.startStep('Navigate back to the Home screen');
        await HomePage.tapHomeTab();
        const homeVisible = await HomePage.isHomePageDisplayed();
        expect(homeVisible, 'Home screen should be displayed').to.be.true;
        allure.endStep('passed');

        // ── Home → Login tab ──────────────────────────────────────────────────
        allure.startStep('Navigate to the Login screen via the Login tab');
        await HomePage.tapLoginTab();
        const loginVisible = await LoginPage.isLoginPageDisplayed();
        expect(loginVisible, 'Login screen should be displayed via the Login tab').to.be.true;
        allure.endStep('passed');
    });
});
