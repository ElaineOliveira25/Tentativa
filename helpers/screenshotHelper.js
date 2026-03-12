'use strict';

const path = require('path');
const fs   = require('fs');

/**
 * ScreenshotHelper — captures screenshots and attaches them to Allure.
 *
 * Screenshots are also saved to ./errorShots/ for CI artifact collection.
 */
class ScreenshotHelper {
    constructor() {
        this.dir = path.resolve(process.cwd(), 'errorShots');
        this._ensureDir(this.dir);
    }

    _ensureDir(dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }

    /**
     * Take a screenshot and save it to errorShots/.
     *
     * @param {string} name  File name prefix (unsafe chars are stripped)
     * @returns {string}     Absolute path of the saved file
     */
    async takeScreenshot(name) {
        const safeName  = (name || 'screenshot').replace(/[^a-z0-9_-]/gi, '_').substring(0, 100);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName  = `${safeName}_${timestamp}.png`;
        const filePath  = path.join(this.dir, fileName);

        const base64 = await browser.takeScreenshot();
        fs.writeFileSync(filePath, Buffer.from(base64, 'base64'));

        console.log(`📸  Screenshot saved: ${filePath}`);
        return filePath;
    }

    /**
     * Take a screenshot, save it to disk, and attach it to the current
     * Allure report step as an image/png attachment.
     *
     * @param {string} testName  Label used for both the file name and Allure attachment
     * @returns {string}         Path of the saved screenshot
     */
    async captureAndAttach(testName) {
        const safeName = (testName || 'screenshot').replace(/[^a-z0-9_-]/gi, '_').substring(0, 100);
        const fileName = `${safeName}.png`;
        const filePath  = path.join(this.dir, fileName);

        const base64 = await browser.takeScreenshot();
        fs.writeFileSync(filePath, Buffer.from(base64, 'base64'));
        console.log(`📸  Screenshot saved: ${filePath}`);

        try {
            const allureReporter = require('@wdio/allure-reporter').default;
            allureReporter.addAttachment(
                `Failure Screenshot — ${testName}`,
                Buffer.from(base64, 'base64'),
                'image/png',
            );
        } catch {
            // Allure reporter may not be loaded in every environment; not fatal
        }

        return filePath;
    }
}

module.exports = new ScreenshotHelper();
