import {Page, Locator, expect, selectors} from "playwright/test";

export class ActivityLogsPageElements {
    public activityLogsPageUrl: string = "https://app.cymulate.com/cym/activity_logs"
    readonly page: Page
    readonly activityFilter: Locator
    readonly applyFiltersBtn: Locator
    readonly typeFilter: Locator
    readonly advancedScenariosBtn: Locator
    readonly clearBtn: Locator
    readonly searchField: Locator
    readonly firstTableCell: Locator


    constructor(page: Page) {
        selectors.setTestIdAttribute("test-data-id")
        this.page = page
        this.activityFilter = page.locator('[data-test-id="filter-bar"] #icon_')
        this.applyFiltersBtn = page.getByRole('button', { name: 'Apply Filters' })
        this.typeFilter = page.getByRole('main').getByText('Type')
        this.advancedScenariosBtn = page.getByRole('button', { name: 'Advanced Scenarios' })
        this.clearBtn = page.getByRole('button', { name: 'Clear', exact: true })
        this.searchField = page.locator('[data-test-id="search"]')
        this.firstTableCell = page.locator('[data-test-id="\\30 -0"]')
    }

    async navigateToActivityLogsPage() {
        await this.page.goto(this.activityLogsPageUrl)
        await expect(this.activityFilter).toBeVisible( {timeout: 30_000 })
    }

    async filterForAdvancedScenarios() {
        await this.activityFilter.click()
        await expect(this.applyFiltersBtn).toBeVisible()
        await this.typeFilter.click()
        await expect(this.advancedScenariosBtn).toBeVisible()
        await this.advancedScenariosBtn.click()
        await expect(this.clearBtn).toBeVisible()
        await this.applyFiltersBtn.click()
        await expect(this.firstTableCell).toBeVisible()
    }
    async searchForAssessmentIds(){
        await this.searchField.fill("Assessment")
        await this.page.waitForTimeout(1000)
        await expect(this.firstTableCell).toBeVisible()
    }


    async getAttackIds():Promise<Set<string>>{
        selectors.setTestIdAttribute("test-data-id")
        const attackIds = await this.page.locator('.MuiChip-root[test-data-id="assessmentID"] > span').allInnerTexts()
        return new Set(attackIds)
    }

    async printUniqueAttackIds() {
        const attackIdsSet :Set<string> = await this.getAttackIds()
        const attackIdsArr = Array.from(attackIdsSet).slice(0, 3)
        console.log(attackIdsArr)
    }

}