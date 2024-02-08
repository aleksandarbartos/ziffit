import MainPage from './main.page.js';
import { $ } from '@wdio/globals';

class LoginPage extends MainPage {
	//selectors
	public get inputEmail () {
		return $('#email');
	}

	public get inputPassword () {
		return $('#password');
	}

	public get loginButton () {
		return $('.asyncbtn');
	}

	public get loginErrorMessage () {
		return $('.text-danger');
	}

	//methods
	public async login (email: string, password: string) {
		await this.inputEmail.waitForDisplayed();
		await this.inputEmail.setValue(email);
		await this.inputPassword.waitForDisplayed();
		await this.inputPassword.setValue(password);
		await this.loginButton.waitForClickable();
		await this.loginButton.click();
	}
}

export default new LoginPage();
