import { browser } from '@wdio/globals';
import { Helpers } from '../src/helpers.js';
import { navigationData } from '../test/testData/navigationData.ts';

export default class MainPage {
	public static get languageSwitcher () {
		return $('#languageSwitcher');
	}

	public static get languageFlag () {
		return $('.ccm-region-flag');
	}

	public static get cookieOverlay () {
		return $('#onetrust-banner-sdk');
	}

	public static get acceptCookiesBtn () {
		return $('#onetrust-accept-btn-handler');
	}

	public static get loginBtn () {
		return $('#login');
	}

	public static get registration () {
		return $('[class=regbtn][href="/en-gb/registration"]');
	}

	public static get menuBar () {
		return $('.nav navbar-nav');
	}

	public static get menuSell () {
		return $('#sell');
	}

	public static get menuHowItWorks () {
		return $('#how_it_works');
	}

	public static get menuZiffitApp () {
		return $('#ziffit_app');
	}

	public static get menuAboutUs () {
		return $('#about_us');
	}

	public static get menuHelp () {
		return $('#help');
	}

	public static get hamburgerMenu () {
		return $('button[class="navbar-toggle collapsed"]');
	}

	public static get barcodeInput () {
		return $('#barcode');
	}

	public static get getValueBtn () {
		return $('#scan-button');
	}

	public static get basket () {
		return $('.cartholder');
	}

	public static get contactUs () {
		return $('div.col-sm-3>ul>li>a[href*="contact-us"]');
	}

	public static get ziffitApp () {
		return $('div.col-sm-3>ul>li>a[href*="ziffit-app"]');
	}

	public static get subscriptionBox () {
		return $('body > div:nth-child(1)').shadow$('button[class="close"]');
	}

	//methods
	public static async open () {
		return browser.url(navigationData.urls.default);
	}

	public static async openZiffit () {
		await this.open();
		await this.acceptCookies();
		await this.closeSubscriptionBox();
	}

	public static async acceptCookies () {
		if (await this.cookieOverlay.isDisplayed() === true) {	
			await this.acceptCookiesBtn.waitForClickable();
			await this.acceptCookiesBtn.click();
		}
	}

	public static async closeSubscriptionBox() {
		if (await this.subscriptionBox.isDisplayed() === true ) {
			await this.subscriptionBox.click();
		}
	}

	public static async openLogin () {
		await this.loginBtn.waitForClickable();
		await this.loginBtn.click();
	}

	public static async openRegistration() {
		await this.registration.waitForClickable();
		await this.registration.click();
	}

	public static async clickMenuItem(menuItem: Helpers.MenuItems) {
		switch (menuItem) {
		case Helpers.MenuItems.Sell:
			await this.menuSell.waitForClickable();
			await this.menuSell.click();
			break;
		case Helpers.MenuItems.HowItWorks:
			await this.menuHowItWorks.waitForClickable();
			await this.menuHowItWorks.click();
			break;
		case Helpers.MenuItems.ZiffitApp:
			await this.menuZiffitApp.waitForClickable();
			await this.menuZiffitApp.click();
			break;
		case Helpers.MenuItems.AboutUs:
			await this.menuAboutUs.waitForClickable();
			await this.menuAboutUs.click();
			break;
		case Helpers.MenuItems.Help:
			await this.menuHelp.waitForClickable();
			await this.menuHelp.click();
			break;
		}
	}

	public static async addBarcode (barcode: string) {
		await this.barcodeInput.waitForDisplayed();
		await this.barcodeInput.addValue(barcode);
	}

	public static async getItemValue (barcode: string) {
		await this.addBarcode(barcode);
		await this.getValueBtn.waitForClickable();
		await this.getValueBtn.click();
		await browser.waitUntil(async () => {
			return await browser.getUrl() === navigationData.urls.basket;
		});
	}

	public static async openBasket () {
		await this.basket.waitForClickable();
		await this.basket.click();
	}

	public static async footerOpenContactUs () {
		await this.contactUs.waitForClickable();
		await this.contactUs.click();
	}

	public static async footerOpenZiffitApp () {
		await this.ziffitApp.waitForClickable();
		await this.ziffitApp.click();
	}
}