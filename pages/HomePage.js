'use strict';

const BasePage = require('./BasePage');

/**
 * HomePage — bottom navigation bar and the home/dashboard screen.
 */
class HomePage extends BasePage {
    // ─── Selectors ────────────────────────────────────────────────────────────

    get homeTab()       { return $('~Home'); }
    get formsTab()      { return $('~Forms'); }
    get swipeTab()      { return $('~Swipe'); }
    get loginTab()      { return $('~Login'); }
    get webviewTab()    { return $('~WebView'); }
    get welcomeText()   { return $('~test-welcome-message'); }

    // ─── Actions ──────────────────────────────────────────────────────────────

    async tapHomeTab()    { await (await this.homeTab).click(); }
    async tapFormsTab()   { await (await this.formsTab).click(); }
    async tapSwipeTab()   { await (await this.swipeTab).click(); }
    async tapLoginTab()   { await (await this.loginTab).click(); }
    async tapWebviewTab() { await (await this.webviewTab).click(); }

    /** Returns true when the Home tab is displayed (post-login anchor). */
    async isHomePageDisplayed() {
        return this.isDisplayed('~Home', 15000);
    }

    /** Return the welcome / headline text on the home screen. */
    async getWelcomeText() {
        try {
            return this.getText('~test-welcome-message');
        } catch {
            return '';
        }
    }
}

module.exports = new HomePage();
