import { test, expect } from '@playwright/test';
import { WidgetPage } from "./widget.page";

test.describe('Uchi.ru widget', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({ page }) => {
    widgetPage = new WidgetPage(page);

    // open uchi.ru main page
    await page.goto('https://uchi.ru/');

    // close cookies popup
    await page.click('._UCHI_COOKIE__button', { timeout: 5000 }); // Added timeout to prevent freezing
  });

  test('opens', async () => { //  Removed unused parameter {page}
    await widgetPage.openWidget();

    await expect(widgetPage.getWidgetBody()).toBeVisible();
  });

  test('has correct title', async () => { // Removed unused parameter {page}
    await widgetPage.openWidget();

    const articles = await widgetPage.getPopularArticles();

    if (articles.length === 0) {
      throw new Error('No popular articles found'); // Check for articles
    }

    await articles[0].click();

    await widgetPage.clickWriteToUs();

    expect(await widgetPage.getTitle()).toEqual('Связь с поддержкой');
  });
});
