'use strict';

const { expect } = require('chai');
const allure = require('@wdio/allure-reporter').default;
const FormPage = require('../../pages/FormPage');

// ─────────────────────────────────────────────────────────────────────────────
// Funcionalidade: Forms
// Preenchimento, interações e validação do modal
// ─────────────────────────────────────────────────────────────────────────────

describe('Preenchimento do formulário', () => {
    beforeEach(async () => {
        allure.addFeature('Preenchimento do formulário');

        await driver.execute('mobile: terminateApp', { appId: 'com.wdiodemoapp' }).catch(() => {});
        await driver.execute('mobile: activateApp', { appId: 'com.wdiodemoapp' });
    });

    it('[TC-10] Deve preencher o formulário, interagir com switch e dropdown, e validar o modal', async () => {
        allure.addStory('Preenchimento do Forms');
        allure.addSeverity('critical');
        allure.addDescription(
            'Verifica o preenchimento do campo de texto, alteração do switch, seleção do dropdown '
            + 'e exibição/fechamento do modal ao selecionar Active.',
        );

        // ─────────────────────────────────────────────────────────────────────
        // Acessar tela Forms
        // ─────────────────────────────────────────────────────────────────────
        allure.startStep('Clicar em Forms e validar elementos principais da tela');

        await FormPage.acessarTelaForms();

        await (await FormPage.formComponentsTitle).waitForDisplayed({ timeout: 15000 });
        expect(await (await FormPage.formComponentsTitle).isDisplayed()).to.be.true;

        allure.endStep('passed');

        // ─────────────────────────────────────────────────────────────────────
        // Preencher campo de texto
        // ─────────────────────────────────────────────────────────────────────
        allure.startStep('Preencher o campo text-input e validar o texto refletido');

        await FormPage.preencherTextInput('Teste de QA');

        const inputTextResult = await FormPage.inputTextResultByDesc;
        await inputTextResult.waitForDisplayed({ timeout: 15000 });
        expect(await inputTextResult.getText()).to.equal('Teste de QA');

        allure.endStep('passed');

        // ─────────────────────────────────────────────────────────────────────
        // Interagir com switch
        // ─────────────────────────────────────────────────────────────────────
        allure.startStep('Validar texto inicial do switch, clicar no switch e validar mudança');

        await (await FormPage.switchTextOff).waitForDisplayed({ timeout: 15000 });
        expect(await (await FormPage.switchTextOff).isDisplayed()).to.be.true;

        await FormPage.clicarSwitch();

        await (await FormPage.switchTextOn).waitForDisplayed({ timeout: 15000 });
        expect(await (await FormPage.switchTextOn).isDisplayed()).to.be.true;

        allure.endStep('passed');

        // ─────────────────────────────────────────────────────────────────────
        // Selecionar opção no dropdown
        // ─────────────────────────────────────────────────────────────────────
        allure.startStep('Selecionar opção no dropdown e validar valor selecionado');

        await FormPage.selecionarOpcaoDropdown();

        expect(await (await FormPage.dropdownField).getText()).to.equal('webdriver.io is awesome');

        allure.endStep('passed');

        // ─────────────────────────────────────────────────────────────────────
        // Abrir modal
        // ─────────────────────────────────────────────────────────────────────
        allure.startStep('Clicar em Inactive, depois em Active e validar exibição do modal');

        await FormPage.abrirModal();

        await (await FormPage.modalTitle).waitForDisplayed({ timeout: 15000 });
        expect(await (await FormPage.modalTitle).isDisplayed()).to.be.true;

        await (await FormPage.modalMessage).waitForDisplayed({ timeout: 15000 });
        expect(await (await FormPage.modalMessage).isDisplayed()).to.be.true;

        await (await FormPage.modalButton1).waitForDisplayed({ timeout: 15000 });
        expect(await (await FormPage.modalButton1).isDisplayed()).to.be.true;

        await (await FormPage.modalButton2).waitForDisplayed({ timeout: 15000 });
        expect(await (await FormPage.modalButton2).isDisplayed()).to.be.true;

        await (await FormPage.modalButton3).waitForDisplayed({ timeout: 15000 });
        expect(await (await FormPage.modalButton3).isDisplayed()).to.be.true;

        allure.endStep('passed');

        // ─────────────────────────────────────────────────────────────────────
        // Fechar modal
        // ─────────────────────────────────────────────────────────────────────
        allure.startStep('Clicar no botão principal do modal e validar que ele foi fechado');

        await FormPage.fecharModal();

        await (await FormPage.modalTitle).waitForDisplayed({ timeout: 5000, reverse: true });
        await (await FormPage.modalMessage).waitForDisplayed({ timeout: 5000, reverse: true });

        allure.endStep('passed');
    });
});
