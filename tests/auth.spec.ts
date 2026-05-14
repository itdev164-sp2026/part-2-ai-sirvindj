import { expect, test, type Page } from "@playwright/test";

const testUserEmail = process.env.TEST_USER_EMAIL;
const testUserPassword = process.env.TEST_USER_PASSWORD;
const hasTestCredentials = Boolean(testUserEmail && testUserPassword);

async function signIn(page: Page) {
  if (!testUserEmail || !testUserPassword) {
    throw new Error("TEST_USER_EMAIL and TEST_USER_PASSWORD must be set to run this test.");
  }

  await page.goto("/login");

  await page.getByLabel("Email").fill(testUserEmail);
  await page.getByLabel("Password").fill(testUserPassword);

  await Promise.all([
    page.waitForURL(/\/projects(?:\/)?$/),
    page.getByRole("button", { name: /sign in/i }).click(),
  ]);
}

test.describe("Login page", () => {
  test("LOGIN PAGE VISIBLE: shows the login form fields and submit button", async ({ page }) => {
    await page.goto("/login");

    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
  });
});

test.describe("Authenticated dashboard", () => {
  test.skip(!hasTestCredentials, "Set TEST_USER_EMAIL and TEST_USER_PASSWORD to run the credentialed auth tests.");

  test("REDIRECT AFTER LOGIN: successful login sends the user to the projects dashboard", async ({ page }) => {
    await signIn(page);

    await expect(page).toHaveURL(/\/projects(?:\/)?$/);
    await expect(page.getByRole("heading", { name: /projects/i })).toBeVisible();
  });

  test("SIDEBAR NAVIGATION: the signed-in sidebar exposes Overview, Projects, and Settings links", async ({ page }) => {
    await signIn(page);

    await expect(page.getByRole("link", { name: "Overview" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Projects" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Settings" }).first()).toBeVisible();
  });
});