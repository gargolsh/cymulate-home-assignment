import {Page, Locator, expect} from "playwright/test";

export class ActivityLogsPageElements {
    public activityLogsPageUrl: string = "https://app.cymulate.com/cym/activity_logs"
    readonly page: Page
    readonly activityFilter: Locator
    readonly applyFiltersBtn: Locator
    readonly typeFilter: Locator
    readonly advancedScenariosBtn: Locator
    readonly clearBtn: Locator
    readonly assessmentId: Locator
    readonly attackId1: Locator
    readonly attackId2: Locator
    readonly attackId3: Locator
    readonly temp: Locator


    constructor(page: Page) {
        this.page = page
        this.activityFilter = page.locator('[data-test-id="filter-bar"] #icon_')
        this.applyFiltersBtn = page.getByRole('button', { name: 'Apply Filters' })
        this.typeFilter = page.getByRole('main').getByText('Type')
        this.advancedScenariosBtn = page.getByRole('button', { name: 'Advanced Scenarios' })
        this.clearBtn = page.getByRole('button', { name: 'Clear', exact: true })
        this.assessmentId = page.locator('[test-data-id="assessmentID"]')
        this.attackId1 = page.locator('[data-test-id="\\31 -3"]')
        this.attackId2 = page.locator('[data-test-id="\\32 -3"]')
        this.attackId3 = page.locator('[data-test-id="\\33 -3"]')
    }

    async navigateToActivityLogsPage() {
        await this.page.goto(this.activityLogsPageUrl)
        await expect(this.activityFilter).toBeVisible( {timeout: 15_000 })
    }

    async filterForAdvancedScenarios() {
        await this.activityFilter.click()
        await expect(this.applyFiltersBtn).toBeVisible()
        await this.typeFilter.click()
        await expect(this.advancedScenariosBtn).toBeVisible()
        await this.advancedScenariosBtn.click()
        await expect(this.clearBtn).toBeVisible()
        await this.applyFiltersBtn.click()
    }

    async getAttackIdsAndPrint() {
        let text1 = await this.attackId1.textContent()
        let text2 = await this.attackId2.textContent()
        let text3 = await this.attackId3.textContent()
        text1 = this.extractAttackId(text1)
        text2 = this.extractAttackId(text2)
        text3 = this.extractAttackId(text3)


        console.log("Attack ID no.1:  ", text1)
        console.log("Attack ID no.2:  ", text2)
        console.log("Attack ID no.3:  ", text3)
    }

    private extractAttackId(text: string) {
        return text.substring(text.indexOf("ID:") + 3, text.indexOf("Test"));
    }
}