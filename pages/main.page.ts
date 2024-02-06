import { browser } from '@wdio/globals';
import { navigationData } from '../testData/navigationData.ts';

export default class MainPage {
	public static get languageSwitcher () {
		return $('#language-switcher');
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

	//methods
	public static async open () {
		return browser.url(navigationData.urls.default);
	}

	public static async openZiffit () {
		await this.open();
		await this.acceptCookies();
	}

	public static async acceptCookies () {
		if (await this.cookieOverlay.isDisplayed() === true) {
			await this.acceptCookiesBtn.click();
		}
	}

	public static async openLogin () {
		await this.loginBtn.click();
	}

	public static async openRegistration() {
		await this.registration.click();
	}
}