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

    /** Navega para a tela Webview e abre/fecha a barra de navegação. */
    async acessarTelaWebview() {
        await (await this.webviewButton).waitForDisplayed({ timeout: 15000 });
        await (await this.webviewButton).click();
    }

    /** Abre a barra de navegação interna do Webview. */
    async abrirBarraNavegacao() {
        await (await this.toggleNavigationBar).waitForDisplayed({ timeout: 15000 });
        await (await this.toggleNavigationBar).click();
    }

    /** Fecha a barra de navegação interna do Webview. */
    async fecharBarraNavegacao() {
        await (await this.closeNavigationBar).waitForDisplayed({ timeout: 15000 });
        await (await this.closeNavigationBar).click();
    }

    /** Navega para a tela Swipe. */
    async acessarTelaSwipe() {
        await (await this.swipeButton).waitForDisplayed({ timeout: 15000 });
        await (await this.swipeButton).click();
    }

    /** Navega para a tela Drag. */
    async acessarTelaDrag() {
        await (await this.dragButton).waitForDisplayed({ timeout: 15000 });
        await (await this.dragButton).click();
    }
}

module.exports = new NavigationPage();
