'use strict';

/**
 * BasePage — shared helpers for all Page Objects.
 * All page classes extend this class.
 */
class BasePage {
    /**
     * Wait for an element to be displayed and return it.
     * @param {string} selector  WebdriverIO selector string
     * @param {number} timeout   ms to wait (default: 15 000)
     */
    async waitForDisplayed(selector, timeout = 15000) {
        const el = await $(selector);
        await el.waitForDisplayed({ timeout });
        return el;
    }

    /**
     * Wait for an element, then click it.
     */
    async click(selector) {
        const el = await this.waitForDisplayed(selector);
        await el.click();
    }

    /**
     * Wait for an element, clear it, then type the value.
     */
    async setValue(selector, value) {
        const el = await this.waitForDisplayed(selector);
        await el.clearValue();
        await el.setValue(value);
    }

    /**
     * Return the visible text of an element.
     */
    async getText(selector) {
        const el = await this.waitForDisplayed(selector);
        return el.getText();
    }

    /**
     * Return true when the element becomes visible within the timeout.
     * Returns false without throwing if it never appears.
     */
    async isDisplayed(selector, timeout = 5000) {
        try {
            const el = await $(selector);
            await el.waitForDisplayed({ timeout });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Wait until an element is no longer visible.
     */
    async waitForHidden(selector, timeout = 10000) {
        const el = await $(selector);
        await el.waitForDisplayed({ timeout, reverse: true });
    }

    /**
     * Return the value of an attribute on an element.
     */
    async getAttribute(selector, attribute) {
        const el = await this.waitForDisplayed(selector);
        return el.getAttribute(attribute);
    }

    /**
     * Hide the keyboard if it is currently open (no-op when not open).
     */
    async hideKeyboard() {
        try {
            await driver.hideKeyboard();
        } catch {
            // Keyboard may not be open; safe to ignore
        }
    }

    /**
     * Pause execution for the given number of milliseconds.
     */
    async pause(ms = 1000) {
        await browser.pause(ms);
    }
}

module.exports = BasePage;
