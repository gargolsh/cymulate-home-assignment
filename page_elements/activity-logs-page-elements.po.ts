import {Page, Locator, expect} from "playwright/test";

export class DashboardPageElements{
    readonly page: Page
    readonly dashboardsBtn: Locator


    constructor(page: Page) {
        this.page = page
        this.dashboardsBtn = page.getByTestId('link-button-Dashboards')
    }
}