import { $ } from '@wdio/globals';
import MainPage from './main.page.js';
import { randomizeData } from '../helpers/helpers.js';
import { testData } from '../testData/testData.js';

class BasketPage extends MainPage {
	//selectors
	public get errorMessage () {
		return $('[class="alert alert-danger"]');
	}

    public get totalComputedValue () {
        return $$('.basketblock label');
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
        return $$('#title1');
    }

    public get rejectingReasonsDropdown () {
        return $$('#title2');
    }

    public get tradingRulesContent () {
        return $$('#faqcontent1');
    }

    public get rejectingReasonsContent () {
        return $$('#faqcontent2');
    }

    public get listItemTitle () {
        return $$('[data-label="Title"]')
    }

    public get listItemRemove () {
        return $$('[data-label="Remove"]')
    }

    public get successBanner () {
        return $('[class="alert alert-success"]');
    }

    //methods
    public async addBarcode (barcode: string) {
        await this.barcodeInput.waitForDisplayed();
        await this.barcodeInput.addValue(barcode);
        await this.getValueBtn.waitForClickable();
        await this.getValueBtn.click();
    }
    public async scanMultipleItems (scanItem: number) {
        for (let i = 0; i < scanItem; i++) {
            await this.addBarcode(randomizeData(testData.validBarcodes));
            await this.successBanner.waitForDisplayed();
        }
    }

    public async openTradingRules () {
        await this.tradingRulesDropdown[0].waitForClickable();
        await this.tradingRulesDropdown[0].click();
    }

    public async openRejectingReasons () {
        await this.rejectingReasonsDropdown[0].waitForClickable();
        await this.rejectingReasonsDropdown[0].click();
    }

    public async removeItem (listItemNumber: number) {
        await this.listItemTitle[listItemNumber - 1].waitForDisplayed();
        await this.listItemRemove[listItemNumber - 1].waitForClickable();
        await this.listItemRemove[listItemNumber - 1].click();
    }
}

export default new BasketPage();
