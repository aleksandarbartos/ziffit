import { expect } from 'expect-webdriverio';
import { browser } from '@wdio/globals';
import { Helpers } from '../../src/helpers.js';
import { navigationData } from '../testData/navigationData.js';
import { testData } from '../testData/testData.js';
import { assertionData } from '../testData/assertionData.js';
import MainPage from '../../pages/main.page.js';
import RegistrationPage from '../../pages/registration.page.js';
import LoginPage from '../../pages/login.page.js';
import BasketPage from '../../pages/basket.page.js';

describe('Ziffit Smoke Test Suit', () => {
	it('Should open main page with en-gb location when navigating to https://ziffit.com/', async () => {
		await MainPage.openZiffit();
		await expect(MainPage.languageSwitcher).toBeDisplayed();
		await expect(MainPage.languageFlag).toHaveAttribute('id', assertionData.texts.gbFlag);
		await expect(browser).toHaveUrl(navigationData.urls.main);
		await expect(browser).toHaveTitle(navigationData.titles.main);
	});

	it('Should throw errors for new user registration with valid firstname, lastname, email but invalid password and missing confirmation', async () => {
		await MainPage.openZiffit();
		await MainPage.openRegistration();
		const firstname = await Helpers.getFirstname();
		const lastname = await Helpers.getLastname();
		const email = await Helpers.getEmail();
		const password = await Helpers.getPassword();
		await RegistrationPage.addRegistrationData(firstname, lastname, email, password);
		await expect(RegistrationPage.requiredErrorMessage[0]).toHaveText(assertionData.errorMessages.invalidPassword);
		await expect(RegistrationPage.requiredErrorMessage[1]).toHaveText(assertionData.errorMessages.required);
		
	});

	it('Should not log in with invalid credentials', async () => {
		await MainPage.openZiffit();
		await MainPage.openLogin();
		const email = await Helpers.getEmail();
		const password = await Helpers.getPassword();
		await LoginPage.login(email, password);
		await expect(LoginPage.loginErrorMessage).toBeDisplayed();
		await expect(LoginPage.loginErrorMessage).toHaveText(assertionData.errorMessages.badLogin);
	});

	it('Should open Sell menu item from menubar', async () => {
		await MainPage.openZiffit();
		await MainPage.clickMenuItem(Helpers.MenuItems.Sell);
		await expect(MainPage.menuSell).toBeDisplayed();
		await expect(MainPage.menuSell).toBeClickable();
		await expect(browser).toHaveUrl(navigationData.urls.sellMyBooks);
		await expect(browser).toHaveTitle(navigationData.titles.sellMyBooks);
	});

	it('Should have responsive menu based on width', async () => {
		await MainPage.openZiffit();
		await browser.setWindowSize(500, 800);
		await expect(MainPage.menuSell).not.toBeDisplayed();
		await expect(MainPage.hamburgerMenu).toBeDisplayed();
		await expect(MainPage.hamburgerMenu).toBeClickable();
	});

	it('Should open basket but not return value after adding invalid barcode', async () => {
		await MainPage.openZiffit();
		await MainPage.getItemValue(Helpers.randomizeData(testData.invalidBarcodes));
		await expect(browser).toHaveTitle(navigationData.titles.basket);
		await expect(browser).toHaveUrl(navigationData.urls.basket);
		await expect(BasketPage.totalComputedValue).toBeDisplayed();
		await expect(BasketPage.totalComputedValue).toHaveText(assertionData.texts.computedValueZero);
		await expect(BasketPage.errorMessage).toBeDisplayed();
	});

	it('Should open basket and return value after adding valid barcode', async () => {
		await MainPage.openZiffit();
		await MainPage.getItemValue(Helpers.randomizeData(testData.validBarcodes));
		await expect(browser).toHaveTitle(navigationData.titles.basket);
		await expect(browser).toHaveUrl(navigationData.urls.basket);
		await expect(BasketPage.totalComputedValue).toBeDisplayed();
		await expect(BasketPage.totalComputedValue).not.toHaveText(assertionData.texts.computedValueZero);
		await expect(BasketPage.errorMessage).not.toBeDisplayed();
	});

	it('Should open Basket when clicking on the icon', async () => {
		await MainPage.openZiffit();
		await MainPage.openBasket();
		await expect(browser).toHaveTitle(navigationData.titles.basket);
		await expect(browser).toHaveUrl(navigationData.urls.basket);
		await expect(BasketPage.totalComputedValue).toBeDisplayed();
	});

	it('Should not allow to complete trade with 9 scanned items', async () => {
		await MainPage.openZiffit();
		await MainPage.openBasket();
		await BasketPage.scanMultipleItems(9);
		await expect(BasketPage.totalComputedValue).toBeDisplayed();
		await expect(BasketPage.completeTradeBtn).not.toBeClickable();
	});

	it('Should allow to complete trade with 10 scanned items', async () => {
		await MainPage.openZiffit();
		await MainPage.openBasket();
		await BasketPage.scanMultipleItems(10);
		await expect(BasketPage.totalComputedValue).toBeDisplayed();
		await expect(BasketPage.completeTradeBtn).toBeClickable();
	});

	it('Should remove item from Basket', async () => {
		await MainPage.openZiffit();
		await MainPage.getItemValue(Helpers.randomizeData(testData.validBarcodes));
		await BasketPage.removeItem(1);
		await expect(BasketPage.listItemTitle[0]).not.toBeDisplayed();
		await expect(BasketPage.totalComputedValue).toHaveText(assertionData.texts.computedValueZero);
	});

	it('Should open "Trading rules" section', async () => {
		await MainPage.openZiffit();
		await MainPage.openBasket();
		await BasketPage.openTradingRules();
		await expect(BasketPage.tradingRulesContent).toBeDisplayed();
	});

	it('Should open "Rejecting reasons" section', async () => {
		await MainPage.openZiffit();
		await MainPage.openBasket();
		await BasketPage.openRejectingReasons();
		await expect(BasketPage.rejectingReasonsContent).toBeDisplayed();
	});

	it('Should open "Contact Us" page from footer', async () => {
		await MainPage.openZiffit();
		await MainPage.footerOpenContactUs();
		await expect(browser).toHaveUrl(navigationData.urls.contactUs);
		await expect(browser).toHaveTitle(navigationData.titles.contactUs);
	});

	it('Should open "Ziffit App" page from footer', async () => {
		await MainPage.openZiffit();
		await MainPage.footerOpenZiffitApp();
		await expect(browser).toHaveUrl(navigationData.urls.ziffitApp);
		await expect(browser).toHaveTitle(navigationData.titles.ziffitApp);
	});
});
