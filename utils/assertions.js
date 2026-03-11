
'use strict';

const { expect } = require('chai');

/**
 * Assertions — thin wrappers around Chai that produce clearer failure messages.
 *
 * Usage:
 *   const assert = require('../utils/assertions');
 *   assert.isTrue(value, 'Login button should be visible');
 */
class Assertions {
    isTrue(value, message) {
        expect(value, message).to.be.true;
    }

    isFalse(value, message) {
        expect(value, message).to.be.false;
    }

    equal(actual, expected, message) {
        expect(actual, message).to.equal(expected);
    }

    notEqual(actual, unexpected, message) {
        expect(actual, message).to.not.equal(unexpected);
    }

    includes(text, substring, message) {
        expect(text, message).to.include(substring);
    }

    notEmpty(value, message) {
        expect(value, message).to.not.be.empty;
    }

    isDefined(value, message) {
        expect(value, message).to.not.be.undefined;
        expect(value, message).to.not.be.null;
    }

    isGreaterThan(actual, threshold, message) {
        expect(actual, message).to.be.greaterThan(threshold);
    }

    /**
     * Verify that an async getter (e.g. an element isDisplayed call) returns true.
     * Throws a descriptive assertion error if it does not.
     *
     * @param {Promise<boolean>} promisedValue
     * @param {string}           message
     */
    async isDisplayed(promisedValue, message) {
        const result = await promisedValue;
        expect(result, message || 'Expected element to be displayed').to.be.true;
    }
}

module.exports = new Assertions();
