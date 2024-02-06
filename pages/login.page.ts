import { $ } from '@wdio/globals';
import MainPage from './main.page.js';

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
	public async login (username: string, password: string) {
		await this.inputEmail.setValue(username);
		await this.inputPassword.setValue(password);
		await this.loginButton.click();
	}
}

export default new LoginPage();
