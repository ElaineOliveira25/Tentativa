'use strict';

const BasePage = require('./BasePage');

/**
 * NavigationPage — selectors and actions for the Webview, Swipe and Drag screens.
 * Seletores extraídos de 03_navigation.spec.js.
 */
class NavigationPage extends BasePage {
    // ─── Webview ──────────────────────────────────────────────────────────────

    get webviewButton() {
        return $('android=new UiSelector().description("Webview")');
    }

    get webviewTitle() {
        return $('android=new UiSelector().text("WebdriverIO")');
    }

    get toggleNavigationBar() {
        return $('android=new UiSelector().text("Toggle navigation bar")');
    }

    get openedNavigationBar() {
        return $('android=new UiSelector().className("android.view.View").instance(5)');
    }

    get closeNavigationBar() {
        return $('android=new UiSelector().text("Close navigation bar")');
    }

    // ─── Swipe ────────────────────────────────────────────────────────────────

    get swipeButton() {
        return $('//android.widget.TextView[@text="Swipe"]');
    }

    get swipeTitle() {
        return $('android=new UiSelector().text("Swipe horizontal")');
    }

    get swipeSubtitle() {
        return $('android=new UiSelector().text("Or swipe vertical to find what I\'m hiding.")');
    }

    get swipeCard() {
        return $('android=new UiSelector().description("card").instance(0)');
    }

    // ─── Drag ─────────────────────────────────────────────────────────────────

    get dragButton() {
        return $('//android.widget.TextView[@text="Drag"]');
    }

    get dragTitle() {
        return $('android=new UiSelector().text("Drag and Drop")');
    }

    // ─── Actions ──────────────────────────────────────────────────────────────

    /** Navega para a tela Webview. */
    async acessarTelaWebview() {
        const btn = await this.webviewButton;
        await btn.waitForDisplayed({ timeout: 15000 });
        await btn.click();
    }

    /** Abre a barra de navegação interna do Webview. */
    async abrirBarraNavegacao() {
        const btn = await this.toggleNavigationBar;
        await btn.waitForDisplayed({ timeout: 15000 });
        await btn.click();
    }

    /** Fecha a barra de navegação interna do Webview. */
    async fecharBarraNavegacao() {
        const btn = await this.closeNavigationBar;
        await btn.waitForDisplayed({ timeout: 15000 });
        await btn.click();
    }

    /** Navega para a tela Swipe. */
    async acessarTelaSwipe() {
        const btn = await this.swipeButton;
        await btn.waitForDisplayed({ timeout: 15000 });
        await btn.click();
    }

    /** Navega para a tela Drag. */
    async acessarTelaDrag() {
        const btn = await this.dragButton;
        await btn.waitForDisplayed({ timeout: 15000 });
        await btn.click();
    }
}

module.exports = new NavigationPage();
