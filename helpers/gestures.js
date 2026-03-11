'use strict';

/**
 * Gestures — reusable W3C touch-action helpers for Appium.
 *
 * Uses the WebdriverIO `driver.action('pointer')` API (WDIO v8 / Appium 2.x).
 */
class Gestures {
    /**
     * Perform a straight-line swipe between two absolute coordinates.
     *
     * @param {number} startX
     * @param {number} startY
     * @param {number} endX
     * @param {number} endY
     * @param {number} duration  gesture duration in ms (default: 800)
     */
    async swipe(startX, startY, endX, endY, duration = 800) {
        await driver
            .action('pointer')
            .move({ duration: 0, x: startX, y: startY })
            .down({ button: 0 })
            .pause(100)
            .move({ duration, x: endX, y: endY })
            .up({ button: 0 })
            .perform();
    }

    /**
     * Swipe upward across a given fraction of the screen height.
     * @param {number} fraction  0–1, proportion of screen to scroll (default: 0.6)
     */
    async swipeUp(fraction = 0.6) {
        const { width, height } = await driver.getWindowSize();
        const x      = Math.round(width / 2);
        const startY = Math.round(height * 0.8);
        const endY   = Math.round(height * (1 - fraction));
        await this.swipe(x, startY, x, endY);
    }

    /**
     * Swipe downward across a given fraction of the screen height.
     * @param {number} fraction  0–1, proportion of screen to scroll (default: 0.6)
     */
    async swipeDown(fraction = 0.6) {
        const { width, height } = await driver.getWindowSize();
        const x      = Math.round(width / 2);
        const startY = Math.round(height * 0.2);
        const endY   = Math.round(height * fraction);
        await this.swipe(x, startY, x, endY);
    }

    /**
     * Swipe left on a specific element (e.g. to reveal a next card).
     * @param {object} element  WebdriverIO element object
     */
    async swipeLeft(element) {
        const loc  = await element.getLocation();
        const size = await element.getSize();

        const startX = Math.round(loc.x + size.width * 0.85);
        const endX   = Math.round(loc.x + size.width * 0.15);
        const midY   = Math.round(loc.y + size.height / 2);

        await this.swipe(startX, midY, endX, midY);
    }

    /**
     * Swipe right on a specific element (e.g. to reveal a previous card).
     * @param {object} element  WebdriverIO element object
     */
    async swipeRight(element) {
        const loc  = await element.getLocation();
        const size = await element.getSize();

        const startX = Math.round(loc.x + size.width * 0.15);
        const endX   = Math.round(loc.x + size.width * 0.85);
        const midY   = Math.round(loc.y + size.height / 2);

        await this.swipe(startX, midY, endX, midY);
    }

    /**
     * Scroll the page until the element with the given accessibility label
     * is visible (Android only — uses UiScrollable).
     *
     * @param {string} accessibilityLabel
     */
    async scrollToElementAndroid(accessibilityLabel) {
        return $(`android=new UiScrollable(new UiSelector().scrollable(true))`
            + `.scrollIntoView(new UiSelector().description("${accessibilityLabel}"))`);
    }

    /**
     * Repeatedly swipe up until the element matching the selector is visible,
     * or the maximum number of attempts is exhausted.
     *
     * @param {string} selector
     * @param {number} maxSwipes
     */
    async scrollUntilVisible(selector, maxSwipes = 10) {
        let attempts = 0;
        while (attempts < maxSwipes) {
            const el = await $(selector);
            const visible = await el.isDisplayed().catch(() => false);
            if (visible) return el;
            await this.swipeUp(0.4);
            attempts++;
        }
        throw new Error(`Element "${selector}" not found after ${maxSwipes} swipes`);
    }
}

module.exports = new Gestures();
