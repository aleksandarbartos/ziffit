import MainPage from './main.page.js';
import { $ } from '@wdio/globals';
import { Helpers } from '../src/helpers.js';
import { testData } from '../test/testData/testData.js';

class BasketPage extends MainPage {
	//selectors
	public get errorMessage () {
		return $('.alert-danger');
	}

	public get totalComputedValue () {
		return $('.col-md-3 .basketblock label:nth-child(2)');
	}

	public get completeTradeBtn () {
		return $('#checkout');
	}

	public get barcodeInput () {
		return $('input[name="barcode"]');
	}

	public get getValueBtn () {
		return $('#scan-button');
	}

	public get tradingRulesDropdown () {
		return $('.visible-md > .faqitem:nth-of-type(1)');
	}

	public get rejectingReasonsDropdown () {
		return $('.visible-md > .faqitem:nth-of-type(2)');
	}

	public get tradingRulesContent () {
		return $('.visible-md > .faqitem:nth-of-type(1) > #faqcontent1');
	}

	public get rejectingReasonsContent () {
		return $('.visible-md > .faqitem:nth-of-type(2) > #faqcontent2');
	}

	public get listItemTitle () {
		return $$('[data-label="Title"]');
	}

	public get listItemRemove () {
		return $$('[data-label="Remove"]');
	}

	public get successBanner () {
		return $('.alert-success');
	}

	//methods
	public async addBarcode (barcode: string) {
		await this.barcodeInput.waitForDisplayed();
		await this.barcodeInput.addValue(barcode);
		await this.getValueBtn.waitForClickable();
		await this.getValueBtn.click();
		await this.getValueBtn.waitForClickable();
	}
	public async scanMultipleItems (scanItem: number) {
		for (let i = 0; i < scanItem; i++) {
			await this.addBarcode(Helpers.randomizeData(testData.validBarcodes));
			if (await this.errorMessage.isDisplayed() === true) {
				console.log('Barcode was not added to the input');
				throw new Error ('Barcode was not added to the input');
			} else {
				await this.getValueBtn.waitForClickable();
				await this.totalComputedValue.waitForDisplayed();
				await this.successBanner.waitForDisplayed();
			}
		}
	}

	public async openTradingRules () {
		await this.tradingRulesDropdown.waitForClickable();
		await this.tradingRulesDropdown.click();
	}

	public async openRejectingReasons () {
		await this.rejectingReasonsDropdown.waitForClickable();
		await this.rejectingReasonsDropdown.click();
	}

	public async removeItem (listItemNumber: number) {
		await this.listItemTitle[listItemNumber - 1].waitForDisplayed();
		await this.listItemRemove[listItemNumber - 1].waitForClickable();
		await this.listItemRemove[listItemNumber - 1].click();
	}
}

export default new BasketPage();
