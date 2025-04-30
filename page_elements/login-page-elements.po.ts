import {Page, Locator, expect} from "playwright/test";

export class LoginPageElements{
    public baseUrl: string = "https://app.cymulate.com/login"
    readonly userEmail = "candidate_user@cymulate1.com"
    readonly userPassword = "ZzAa!@#$43212"
    readonly page: Page
    readonly loginPageText: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly signInBtn: Locator
    readonly dashboardsBtn: Locator


    constructor(page: Page) {
        this.page = page
        this.loginPageText = page.getByRole('heading', { name: 'Log in to your account' })
        this.emailInput = page.getByRole('textbox', { name: 'Email address' })
        this.passwordInput = page.getByRole('textbox', { name: 'Password' })
        this.signInBtn = page.getByRole('button', { name: 'Sign in', exact: true })
        this.dashboardsBtn = page.getByTestId('link-button-Dashboards')

    }

    async navigateToLoginPage() {
        await this.page.goto(this.baseUrl)
        await expect(this.loginPageText).toBeVisible({timeout: 10_000 })
    }
    async loginUser(){
        await this.emailInput.fill(this.userEmail)
        await this.passwordInput.fill(this.userPassword)
        await this.signInBtn.click()
        await expect(this.dashboardsBtn).toBeVisible()
    }

}