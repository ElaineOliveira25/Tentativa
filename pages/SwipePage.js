'use strict';

const BasePage = require('./BasePage');

/**
 * SwipePage — selectors and actions for the Swipe / Gesture screen.
 */
class SwipePage extends BasePage {
    // ─── Selectors ────────────────────────────────────────────────────────────

    get swipeContainer() { return $('~Swipe-screen'); }
    get firstCard()      { return $('~test-card-1'); }
    get lastCard()       { return $('~test-last-card'); }
    get cardTitle()      { return $$('~test-card-title'); }

    // ─── Actions ──────────────────────────────────────────────────────────────

    /** Returns true when the swipe container is displayed. */
    async isSwipePageDisplayed() {
        return this.isDisplayed('~Swipe-screen', 10000);
    }

    /**
     * Return the title text of the currently visible card (index 0 = first).
     */
    async getCardTitleAt(index = 0) {
        const titles = await this.cardTitle;
        if (!titles[index]) return '';
        return titles[index].getText();
    }
}

module.exports = new SwipePage();
