# QA Engineer Assessment - solution

## Environment
### Node.js version
For this assignment I only focussed at the tests, not for improving the app.
Because of that, I used libraries and packages for the Angular and Node versions specified. And I did not attempt at upgrading them.

The latest version of Cypress works with **Node.js 12** or higher. Please make sure that a 12.x node version is installed by running `node -v`.
This assignment has been written with Node.js version `v12.22.7`.

## Scope
* It seems no unit-tests are available. Since the focus on this assignment was e2e testing, no unit-tests are written.
* The timeout on Cypress commands is set to 20 seconds, because the SWAPI sometimes took a long time responding
  * Usually in front-end testing I will mock/intercept all backend activity, but the focus on this assignment clearly stated using that API.
* Package.json contains packages that are not used, I did not focus on making it tidier
* No changes to the application is made (not even fixing bugs), considered that out of scope

## Tests
### run
The Cypress tests can be run by either running `ng e2e` or `npm run e2e`.
This command will do 2 things:
* Serve the default build for the application on `http://127.0.0.1:4200`,
* Start Cypress in a headless electron browser.

### watch
To open Cypress and see the test running, please run `ng run tnt-assignment-e2e:e2e-watch` or `npm run e2e-watch`.
This command will do 2 things:
* Serve the default build for the application on `http://127.0.0.1:4200`,
* Start Cypress in 'open' mode.

### output
Screenshots (for failing tests only), videos (for all tests) and mochawesome reporter will be saved in the `/output/cypress` directory. These are generated after test execution.
The report will be generated with npm command `npm run report:generate` and located in `/output/cypress/report` in json and html format.

### result
There are 12 tests (for both mocha and cucumber) and 11 of them are passing.
The failing test is located at `app.spec.ts` | `app.feature` > `'Should clear results when searching for empty string'`. The test is failing because it is nog compliant with the requirement:
````
When you search for either a character or a planet and you get one or more results for it, clear the “Search form” and hit the Search button again, you should then get an empty result list (previous search results are removed).
````
