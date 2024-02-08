import MainPage from './main.page.js';
import { $ } from '@wdio/globals';

class RegistrationPage extends MainPage {
	//selectors
	public get firstName () {
		return $('#firstname');
	}

	public get lastName () {
		return $('#lastname');
	}

	public get email () {
		return $('#email');
	}

	public get password () {
		return $('#password');
	}

	public get passwordConfirmation () {
		return $('#passwordConfirmation');
	}

	public get nextBtn () {
		return $('button[class="btn ziffitbutton nextbtn ziffit-new-btn keep-size pull-right"]');
	}

	public get requiredErrorMessage () {
		return $$('div.form-group > div.col-sm-12 > p.validation-error'); //cannot find unique selector, indexing used in methods and tests
	}

	//methods
	public async addRegistrationData(firstName: string, lastName: string, email: string, password: string) {
		await this.firstName.waitForDisplayed();
		await this.firstName.addValue(firstName);
		await this.lastName.waitForDisplayed();
		await this.lastName.addValue(lastName);
		await this.email.waitForDisplayed();
		await this.email.addValue(email);
		await this.password.waitForDisplayed();
		await this.password.addValue(password);
		/* Commenting out for test purposes
		await this.passwordConfirmation.waitForDisplayed();
		await this.passwordConfirmation.addValue(password);
		*/
		await this.nextBtn.waitForClickable();
		await this.nextBtn.click();
	}
}

export default new RegistrationPage();
