import { test } from '@playwright/test';
import {LoginPageElements} from "../page_elements/login-page-elements.po";
import {ActivityLogsPageElements} from "../page_elements/activity-logs-page-elements.po";


test('attack id validation test', async ({ page }) => {
  let loginPageElements = new LoginPageElements(page)
  let activityLogsPageElements = new ActivityLogsPageElements(page)

  await loginPageElements.navigateToLoginPage()
  await loginPageElements.loginUser()
  await activityLogsPageElements.navigateToActivityLogsPage()
  await activityLogsPageElements.filterForAdvancedScenarios()
  await activityLogsPageElements.searchForAssessmentIds()
  await activityLogsPageElements.printUniqueAttackIds()
})
