import { Page } from "@playwright/test";

enum WidgetPageSelectors {
    WRAPPER = '.sc-dino-typography-h > [class^=widget__]',
    WIDGET_BODY = '[class^=widgetWrapper] > [class^=widget__]',
    HEADER_TEXT = 'header h5',
    BUTTON_OPEN = '[data-test=openWidget]',
    BUTTON_WRITE_TO_US = '[class^=btn]',
    ARTICLE_POPULAR_TITLE = '[class^=popularTitle__]',
    ARTICLE_POPULAR_LIST = `${WidgetPageSelectors.ARTICLE_POPULAR_TITLE} + ul[class^=articles__]`, // Fixed: Added WidgetPageSelectors
    ARTICLE_POPULAR_LIST_ITEM = `${WidgetPageSelectors.ARTICLE_POPULAR_LIST} > li`, // Fixed: Added WidgetPageSelectors
}

export class WidgetPage {
    static selector = WidgetPageSelectors;

    constructor(protected page: Page) {}

    wrapper() {
        return this.page.locator(WidgetPage.selector.WRAPPER);
    }

    async openWidget() {
        await this.wrapper().locator(WidgetPage.selector.BUTTON_OPEN).click(); // Added await for asynchronous calling
    }

    async getPopularArticles() {
        return this.wrapper().locator(WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM).all();
    }

    async clickWriteToUs() {
        await this.wrapper().locator(WidgetPage.selector.BUTTON_WRITE_TO_US).click(); // Added await for asynchronous calling
    }

    async getTitle() {
        return this.wrapper().locator(WidgetPage.selector.HEADER_TEXT).textContent(); // textContent returns Promise, you need to use await
    }

    async getWidgetBody() { // Changed to async to return Promise
        return this.page.locator(WidgetPage.selector.WIDGET_BODY);
    }
}
