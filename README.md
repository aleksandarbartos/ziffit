---
runme:
  id: 01HP45VT9R6ZT9ADQA0MEGPNRX
  version: v2.2
---

## Project to run Smoke tests on Ziffit Web application

### Introduction

This project was created to execute smoke tests on the Ziffit Web application.
Disclaimer: the tests are executed in the production environment

### Prerequisites

NodeJS is installed on the local machine

Git is installed on the local machine

A source-code editor is installed on the local machine

### Installation and set up configuration

1. Clone the project to you local machine using

```text {"id":"01HNZE79RCH4YTWPJ0R743944M"}
git clone

```

2. Open the cloned project folder, open a Terminal and run the following command to install all dependencies:

```sh {"id":"01HNZE79RCH4YTWPJ0R7KG1K1G"}
npm install

```

3. After npm install a node_modules folder and a package-lock.json file should be present in the project directory
4. Make sure the testData folder files contain data and are not empty

### Executable scripts:

To install all dependencies using package.json data

```sh {"id":"01HNZE79RCH4YTWPJ0RAMDY7EC"}
npm install

```

To install all dependencies using package-lock.json data

```sh {"id":"01HNZE79RCH4YTWPJ0RDQ3XP57"}
npm run setup

```

To fix eslint problems

```sh {"id":"01HNZE79RCH4YTWPJ0REJCJGJX"}
npm run eslint:fix

```

To execute the smoke tests

```sh {"id":"01HNZE79RCH4YTWPJ0RFQ2MRQG"}
npm run test

```

### Project structure

src folder contains the helpers used in the test execution (Helpers)

pages folder contains the PageObjects (Main page, Login page, Registration page, Basket)

test/specs folder contains the test files (test.e2e.smoke)

test/testData folder contains the test data used in the tests (assertion data, navigation data, barcodes)
The user related test data is generated in test runtime (firstname, lastname, email, password) using fetch (firstname, lastname) and npm packages (generate-password, random-email)

### Addig new tests to the project

Make sure you create a separate branch for the new test development

Before commiting and pushing your changes, run eslint:fix command to ensure code quality

Raise a merge request for code review

### Smoke test cases documentation

Not covered test cases in the Smoke suit as the tests run on Production environment:

- Successful login
- Successful registration

### Possibly unstable solutions due to application structure

- Some  selectors could not be precisely defined, as multiple elements share the same selectors, findElements method with indexing was used for these:
   - MainPage.contactUs, MainPage.ziffitApp footer items
   - RegistrationPage.requiredErrorMessage
   - BasketPage.totalComputedValue, BasketPage.tradingRulesDropdown, BasketPage.tradingRulesContent, BasketPage.rejectingReasonsDropdown, BasketPage.rejectingReasonsContent, BasketPage.listItemTitle, BasketPage.listItemRemove

### Smoke test suit

| Test case name                                                     | Test data                      | Reproduction steps                                                                                                 | Expected results                                                                                                                                |
|----------------------------------------------------------------------------|------------------------------------|--------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Should open main page with en-gb location when navigating to https://ziffit.com/              | -                                  | 1. Open https://ziffit.com/ in the browser                                                                         | https://ziffit.com/en-gb is opened, Location indicator flag is EN-GB                                                                            |
| Should throw errors for new user registration with valid firstname, lastname, email but invalid password and missing confirmation |firstname, lastname, email, password| 1. Open https://ziffit.com/ in the browser 2. Click on "Register" 3. Add registration data (firstname, lastname, email address) 4. Click on "Next" | "Invalid password." Error message is displayed for password not meeting criteria , "Required." error message is displayed for confirm password confirmation                                                                                                         |
| Should not log in with invalid credentials                                 |  email, password                  | 1. Open https://ziffit.com/ in the browser 2. Click on "Log in" button 3. Enter invalid username and password 4. Click on "Log in"                            | User is not logged in, error message is displayed                                                                                               |
| Should open Sell menu item from menubar                                         | - | 1. Open https://ziffit.com/ in the browser 2. Click on "Sell" menu item                                                                                       | Menubar Sell item is still displayed and clickable, https://www.ziffit.com/en-gb/sell-my-books is opened, Page title is "Sell Second Hand Books Online | Ziffit"                                                       |
| Should have responsive menu based on width                                 | - | 1. Open https://ziffit.com/ in the browser 2. Change window width to 500px 2. Click on "Hamburger menu"                                                       | Menubar Sell item is not displayed "Hamburger menu" is displayed and clickable |
| Should open basket but not return value after adding invalid barcode       | invalid barcode | 1. Open https://ziffit.com/ in the browser 2. Add invalid barcode to the input field                                                                          | Basket is opened (https://www.ziffit.com/en-gb/basket) Error message is displayed that the barcode is invalid, Value is "£0.00"                                   |
| Should open basket and return value after adding valid barcode             | valid barcode | 1. Open https://ziffit.com/ in the browser 2. Add valid barcode to the input field                                                                            | Basket is opened (https://www.ziffit.com/en-gb/basket) Value for the scanned item is displayed, value is not "£0.00"                                                  |
| Should open Basket when clicking on the icon                               | - | 1. Open https://ziffit.com/ in the browser 2. Click on "Basket" icon                                                                                          | Basket is opened (https://www.ziffit.com/en-gb/basket)                                                                                          |
| Should not allow to complete trade with only 1 scanned item                | valid barcode | 1. Open https://ziffit.com/ in the browser 2. Add valid barcode to the input field                                                                            | Basket is opened (https://www.ziffit.com/en-gb/basket) "Complete Trade" is disabled (not clickable)                                             |
| Should allow to complete trade with 10+ scanned items                      | valid barcodes | 1. Open https://ziffit.com/ in the browser 2. Add 10+ valid barcodes to the input field                                                                       | Basket is opened (https://www.ziffit.com/en-gb/basket) "Complete Trade" is enabled (is clickable)                                               |
| Should open "Trading rules" section                                        | - | 1. Open https://ziffit.com/ in the browser 2. Open Basket 3. Click on "Trading rules" link                                                                    | Trading rules dropdown is opened                                                                                                                |
| Should open "Rejecting reasons" section                                    | - | 1. Open https://ziffit.com/ in the browser 2. Open Basket 3. Click on "Rejecting reasons" link                                                                | Rejecting reasons dropdown is opened                                                                                                            |
| Should remove item from Basket                                                        | valid barcode | 1. Open https://ziffit.com/ in the browser 2. Add valid barcode to the input field 3. In Basket, click on "Remove" icon for the added item                                      | Added item is removed from the basket, the list is empty                                                                                                         |
| Should open "Contact Us" page                                              |  -                  | 1. Open https://ziffit.com/ in the browser 2. Click on "Contact Us" link in the footer                                                                        | https://www.ziffit.com/en-gb/ziffit-app is opened                                                                                               |
| Should open "Download App" page                                            | -                   | 1. Open https://ziffit.com/ in the browser 2. Click on "Ziffit App" link in the footer                                                                        | https://www.ziffit.com/en-gb/contact-us is opened                                                                                               |
