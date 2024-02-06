import { expect } from 'expect-webdriverio';
import { browser } from '@wdio/globals';
import MainPage from '../pages/main.page.js';
import LoginPage from '../pages/login.page.js';
import { navigationData } from '../testData/navigationData.js';
import { testData } from '../testData/testData.js';
import RegistrationPage from '../pages/registration.page.js';

describe('Ziffit Smoke Test Suit', () => {
	afterEach(async () => {
		await browser.reloadSession();
	});

	it('Should open main page with en-gb location when navigating to https://ziffit.com/', async () => {
		await MainPage.openZiffit();
		expect(await MainPage.languageSwitcher).toBeDisplayed();
		expect(await MainPage.languageFlag).toHaveAttribute('id', 'ccm-region-flag-gb');
		expect(browser).toHaveUrl(navigationData.urls.main);
		expect(browser).toHaveTitle(navigationData.titles.main);
	});

	it('Should throw error when clicking "Next" on new user registration without password confirmation', async () => {
		await MainPage.openZiffit();
		await MainPage.openRegistration();
		await RegistrationPage.addRegistrationData(testData.registration.firstName, testData.registration.lastName, testData.registration.email, testData.registration.password);
		expect(await RegistrationPage.requiredErrorMessage.length).toBe(2);
		expect(await RegistrationPage.requiredErrorMessage[0]).toHaveText('Invalid password.');
		expect(await RegistrationPage.requiredErrorMessage[1]).toHaveText('Required.');
		
	});

	it('Should not log in with invalid credentials', async () => {
		await MainPage.openZiffit();
		await MainPage.openLogin();
		await LoginPage.login(testData.invalidLogin.email, testData.invalidLogin.password);
		expect(await LoginPage.loginErrorMessage).toBeDisplayed();
		expect(await LoginPage.loginErrorMessage).toHaveText('Wrong username or password');
	});
});
