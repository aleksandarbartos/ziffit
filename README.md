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
To execute the smoke tests
```
npm run test
```
### Smoke test cases documentation
| Test case      | Reproduction Steps | Expected Results |
| -----------    | -----------        | ---------------- |
|          |               | |
|       |                | |