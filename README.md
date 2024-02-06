### Project to run Smoke tests on Ziffit Web application

#### Introduction
This project was created to execute smoke tests on the Ziffit Web application.
Disclaimer: the tests are executed in the production environment

### Installation and set up configuration
1. Clone the project to you local machine using
```
git clone
```
2. Open the cloned project folder, open a Terminal and run the following command to install all dependencies:
```
npm install
```
3. After npm install a node_modules folder and a package-lock.json file should be present in the project directory
4. Make sure src/testData.ts file contains data
5. Add your valid Ziffit Production credentials to testconfig.json file, where username = user email address, password = user password

#### Executable scripts:
To install all dependencies using package.json data
```
npm install
```
To install all dependencies using package-lock.json data
```
npm run setup
```
To fix eslint problems
```
npm run eslint:fix
```
To execute the smoke tests
```
npm run test
```

#### Addig new tests to the project
Make sure you create a separate branch for the new test development

Before commiting and pushing your changes, run eslint:fix command to ensure code quality

Raise a merge request for code review

### Smoke test cases documentation
| Test case                                                                  | Prerequisites                      | Reproduction steps                                                                                                 | Expected results                                                                                                                                |
|----------------------------------------------------------------------------|------------------------------------|--------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| https://ziffit.com/ should open main page with gb-en location              | -                                  | 1. Open https://ziffit.com/ in the browser                                                                         | https://ziffit.com/gb-en is opened, Location indicator flag is GB-EN                                                                            |
| Should open address set page when clicking "Next" on new user registration | Ziffit is opened                   | 1. Click on "Register" 2. Add registration data (firstname, lastname, email address, passwords) 3. Click on "Next" | New page opens with input for address                                                                                                           |
| Should not log in with invalid credentials                                 | Ziffit is opened                   | 1. Click on "Log in" button 2. Enter invalid username and password 3. Click on "Log in"                            | User is not logged in, error message is displayed                                                                                               |
| Should log in with valid credentials                                       | Ziffit is opened                   | 1. Click on "Log in" button 2. Enter valid username and password 3. Click on "Log in"                              | User is logged in successfully                                                                                                                  |
| Should open menu item from menubar                                         | Ziffit is opened User is logged in | 1. Click on "Sell" menu item                                                                                       | https://www.ziffit.com/en-gb/sell-my-books is opened Page title is "Sell my books online"                                                       |
| Should have responsive menu based on width                                 | Ziffit is opened User is logged in | 1. Change window width to 500px 2. Click on "Hamburger menu"                                                       | "Sell" menu item is not displayed "Hamburger menu" is displayed and clickable "Hambuerger menu" contains menu items and "Log in" and "Register" |
| Should open basket but not return value after adding invalid barcode       | Ziffit is opened User is logged in | 1. Add invalid barcode to the input field                                                                          | Basket is opened (https://www.ziffit.com/en-gb/basket) Error message is displayed that the barcode is invalid                                   |
| Should open basket and return value after adding valid barcode             | Ziffit is opened User is logged in | 1. Add valid barcode to the input field                                                                            | Basket is opened (https://www.ziffit.com/en-gb/basket) Value for the scanned item is displayed                                                  |
| Should open Basket when clicking on the icon                               | Ziffit is opened User is logged in | 1. Click on "Basket" icon                                                                                          | Basket is opened (https://www.ziffit.com/en-gb/basket)                                                                                          |
| Should not allow to complete trade with only 1 scanned item                | Ziffit is opened User is logged in | 1. Add valid barcode to the input field                                                                            | Basket is opened (https://www.ziffit.com/en-gb/basket) "Complete Trade" is disabled (not clickable)                                             |
| Should allow to complete trade with 10+ scanned items                      | Ziffit is opened User is logged in | 1. Add 10+ valid barcodes to the input field                                                                       | Basket is opened (https://www.ziffit.com/en-gb/basket) "Complete Trade" is enabled (is clickable)                                               |
| Should open "Trading rules" section                                        | Ziffit is opened User is logged in | 1. Open Basket 2. Click on "Trading rules" link                                                                    | Trading rules dropdown is opened                                                                                                                |
| Should open "Rejecting reasons" section                                    | Ziffit is opened User is logged in | 1. Open Basket 2. Click on "Rejecting reasons" link                                                                | Rejecting reasons dropdown is opened                                                                                                            |
| Should clear Basket                                                        | Ziffit is opened User is logged in | 1. Add valid barcode to the input field 2. In Basket, click on "Clear" button                                      | Scanned item is removed from the basket                                                                                                         |
| Should open "Contact Us" page                                              | Ziffit is opened                   | 1. Click on "Contact Us" link in the footer                                                                        | https://www.ziffit.com/en-gb/ziffit-app is opened                                                                                               |
| Should open "Download App" page                                            | Ziffit is opened                   | 1. Click on "Ziffit App" link in the footer                                                                        | https://www.ziffit.com/en-gb/contact-us is opened                                                                                               |