'use strict';

const { expect } = require('chai');
const allure = require('@wdio/allure-reporter').default;

describe('Preenchimento do formulário', () => {
    beforeEach(async () => {
        allure.addFeature('Forms');
    });

    it('[TC-10] Deve preencher o formulário, interagir com switch e dropdown, e validar o modal', async () => {
        allure.addStory('Preenchimento do Forms');
        allure.addSeverity('critical');
        allure.addDescription(
            'Verifica o preenchimento do campo de texto, alteração do switch, seleção do dropdown '
            + 'e exibição/fechamento do modal ao selecionar Active.',
        );

        // Acessar tela Forms
        allure.startStep('Clicar em Forms e validar elementos principais da tela');

        const formsButton = $('android=new UiSelector().text("Forms")');
        await formsButton.waitForDisplayed({ timeout: 15000 });
        await formsButton.click();

        const formComponentsTitle = $('android=new UiSelector().text("Form components")');
        await formComponentsTitle.waitForDisplayed({ timeout: 15000 });
        expect(await formComponentsTitle.isDisplayed()).to.be.true;

        allure.endStep('passed');

        // Preencher campo de texto
        allure.startStep('Preencher o campo text-input e validar o texto refletido');

        const textInput = $('~text-input');
        await textInput.waitForDisplayed({ timeout: 15000 });
        await textInput.click();
        await textInput.clearValue();
        await textInput.setValue('Teste de QA');

        const inputTextResult = $('android=new UiSelector().description("input-text-result")');
        await inputTextResult.waitForDisplayed({ timeout: 15000 });
        expect(await inputTextResult.isDisplayed()).to.be.true;

        const inputTextResultText = await inputTextResult.getText();
        expect(inputTextResultText).to.equal('Teste de QA');

        allure.endStep('passed');

        // Interagir com switch
        allure.startStep('Validar texto inicial do switch, clicar no switch e validar mudança');

        const switchTextOff = $('android=new UiSelector().text("Click to turn the switch ON")');
        await switchTextOff.waitForDisplayed({ timeout: 15000 });
        expect(await switchTextOff.isDisplayed()).to.be.true;

        const switchButton = $('android=new UiSelector().className("android.widget.Switch")');
        await switchButton.waitForDisplayed({ timeout: 15000 });
        await switchButton.click();

        const switchTextOn = $('android=new UiSelector().text("Click to turn the switch OFF")');
        await switchTextOn.waitForDisplayed({ timeout: 15000 });
        expect(await switchTextOn.isDisplayed()).to.be.true;

        allure.endStep('passed');

        // Selecionar opção no dropdown
        allure.startStep('Selecionar opção no dropdown e validar valor selecionado');

        const dropdownField = $('android=new UiSelector().resourceId("text_input")');
        await dropdownField.waitForDisplayed({ timeout: 15000 });
        await dropdownField.click();

        const dropdownOption = $('android=new UiSelector().text("webdriver.io is awesome")');
        await dropdownOption.waitForDisplayed({ timeout: 15000 });
        await dropdownOption.click();

        const selectedText = await dropdownField.getText();
        expect(selectedText).to.equal('webdriver.io is awesome');

        allure.endStep('passed');

        // Abrir modal
        allure.startStep('Clicar em Inactive, depois em Active e validar exibição do modal');

        const inactiveButton = $('android=new UiSelector().text("Inactive")');
        await inactiveButton.waitForDisplayed({ timeout: 15000 });
        await inactiveButton.click();

        const activeButton = $('android=new UiSelector().text("Active")');
        await activeButton.waitForDisplayed({ timeout: 15000 });
        await activeButton.click();

        const modalTitle = $('android=new UiSelector().resourceId("com.wdiodemoapp:id/alert_title")');
        await modalTitle.waitForDisplayed({ timeout: 15000 });
        expect(await modalTitle.isDisplayed()).to.be.true;

        const modalMessage = $('android=new UiSelector().resourceId("android:id/message")');
        await modalMessage.waitForDisplayed({ timeout: 15000 });
        expect(await modalMessage.isDisplayed()).to.be.true;

        const modalButton3 = $('android=new UiSelector().resourceId("android:id/button3")');
        await modalButton3.waitForDisplayed({ timeout: 15000 });
        expect(await modalButton3.isDisplayed()).to.be.true;

        const modalButton2 = $('android=new UiSelector().resourceId("android:id/button2")');
        await modalButton2.waitForDisplayed({ timeout: 15000 });
        expect(await modalButton2.isDisplayed()).to.be.true;

        const modalButton1 = $('//android.widget.Button[@resource-id="android:id/button1"]');
        await modalButton1.waitForDisplayed({ timeout: 15000 });
        expect(await modalButton1.isDisplayed()).to.be.true;

        allure.endStep('passed');

        // Fechar modal
        allure.startStep('Clicar no botão principal do modal e validar que ele foi fechado');

        await modalButton1.click();

        const modalTitleClosed = $('android=new UiSelector().resourceId("com.wdiodemoapp:id/alert_title")');
        const modalMessageClosed = $('android=new UiSelector().resourceId("android:id/message")');

        await modalTitleClosed.waitForDisplayed({ timeout: 5000, reverse: true });
        await modalMessageClosed.waitForDisplayed({ timeout: 5000, reverse: true });

        allure.endStep('passed');
    });
});