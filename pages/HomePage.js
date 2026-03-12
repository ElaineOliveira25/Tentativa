'use strict';

const BasePage = require('./BasePage');

/**
 * HomePage — bottom navigation bar and home screen elements.
 * Seletores extraídos de 03_navigation.spec.js.
 */
class HomePage extends BasePage {
    // ─── Menu inferior ────────────────────────────────────────────────────────

    get homeButton() {
        return $('android=new UiSelector().text("Home")');
    }

    // ─── Elementos da tela Home ───────────────────────────────────────────────

    get homeImage() {
        return $('android=new UiSelector().className("android.widget.ImageView").instance(0)');
    }

    get webdriverTitle() {
        return $('android=new UiSelector().text("WEBDRIVER")');
    }

    get supportText() {
        return $('android=new UiSelector().text("Support")');
    }

    get demoText() {
        return $('android=new UiSelector().text("Demo app for the appium-boilerplate")');
    }

    // ─── Actions ──────────────────────────────────────────────────────────────

    /** Navega para a tela Home pelo menu inferior. */
    async acessarTelaHome() {
        await (await this.homeButton).waitForDisplayed({ timeout: 15000 });
        await (await this.homeButton).click();
    }
}

module.exports = new HomePage();
