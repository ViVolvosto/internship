import { test, expect } from '@playwright/test';
import { WidgetPage } from "./widget.page";

/**
 * This automated test is designed to verify the functionality of the login form 
 * and the registration button within the Uchi.ru widget.
 * 
 * The test performs the following steps:
 * 1. It sets up the testing environment by navigating to the main page of Uchi.ru 
 *    and closing any cookie consent popups that may appear.
 * 2. It opens the widget to ensure it is visible on the page.
 * 3. The test checks that the login form is displayed within the widget, confirming 
 *    that users can access it for logging in.
 * 4. It verifies that the "Register" button is present and visible, indicating 
 *    that users have an option to create a new account.
 * 5. Upon clicking the "Register" button, the test checks that the registration form 
 *    appears, ensuring that users can proceed with account creation.
 * 6. Optionally, it verifies that a specific title (e.g., "Регистрация") is present 
 *    in the registration form to confirm that users are in the correct context for registration.
 *
 * The purpose of this test is to ensure that both login and registration functionalities 
 * are working correctly within the widget, providing a smooth user experience for new 
 * and returning users alike. If any of these elements are not displayed or do not function 
 * as expected, it indicates a potential issue with user access to these critical features.
 */


test.describe('Uchi.ru widget', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({ page }) => {
    widgetPage = new WidgetPage(page);

    // Open the main page of uchi.ru
    await page.goto('https://uchi.ru/');

    // Close the cookies popup
    await page.click('._UCHI_COOKIE__button', { timeout: 5000 });
  });

  test('displays login form and register button in the widget', async () => {
    await widgetPage.openWidget();

    // Check that the widget is visible
    await expect(widgetPage.getWidgetBody()).toBeVisible();

    // Check that the login form is displayed
    await expect(widgetPage.getLoginForm()).toBeVisible();

    // Check that the "Register" button is present
    const registerButton = widgetPage.getRegisterButton();
    await expect(registerButton).toBeVisible();

    // Click on the "Register" button
    await registerButton.click();

    // Check that the registration form is displayed after clicking "Register"
    const registrationForm = widgetPage.getRegistrationForm();
    await expect(registrationForm).toBeVisible();
    
    // Optionally, check for a specific title or header in the registration form
    const registrationTitle = await registrationForm.locator('h2').innerText();
    expect(registrationTitle).toEqual('Регистрация'); // Replace with actual title of your registration form
  });
});
