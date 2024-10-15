# Testing

This project uses Cypress for end-to-end testing of the chat application. Below are the details on the tools used, how to run the tests, and how to access the generated reports.

## Tools Used
- **Cypress**: A JavaScript-based end-to-end testing framework that allows for easy testing of web applications.
- **Cypress Cucumber Preprocessor**: For writing tests in a behavior-driven development (BDD) style using Gherkin syntax.
- **Mochawesome**: A custom reporter for Cypress that generates beautiful HTML reports.
- **Mochawesome Merge**: A tool to merge multiple Mochawesome reports into a single report.
- **Mochawesome Report Generator**: A utility for generating HTML reports from the merged Mochawesome report.

## Prerequisites
- Make sure that your project has already been launched so that the cypress has access to its url 

## Running Tests

To run the tests and generate reports, follow these steps:

1. Navigate to the `/testing` directory of your project:
    ```bash
    cd testing
    ```
    
2. Install dependencies with the following command:
    ```bash
    npm i
    ```

3. Run the tests with the following command:
    ```bash
    npm run test
    ```

   This command performs the following actions:
   - Cleans up old reports.
   - Runs Cypress tests using the Mochawesome reporter.
   - Merges the test reports.
   - Generates a combined report in HTML format.
   - Automatically opens the generated report in your default web browser.

## Accessing Reports

After running the tests, you can find the reports in the `cypress/reports` directory. The merged report will be opened automatically in your browser after the tests finish running.

You can also manually open the report by running:
```bash
npm run open-report
