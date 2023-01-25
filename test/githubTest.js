const { By, Key, Builder, until } = require('selenium-webdriver');

let driver;

describe('GitHub Sign In', () => {
  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();

    await driver.get('https://github.com/');
  });
  after(async () => {
    await driver.quit();
  });

  it('should allow user to go to sign in page', async () => {
    await driver.findElement(By.partialLinkText('Sign in')).click();

    console.log(await driver.getTitle());

    if ((await driver.getTitle()) === 'Sign in to GitHub · GitHub') {
      console.log('We got the title right.');
    } else {
      console.log('The test failed.');
      return;
    }
  });

  it('should allow user to sign in with valid credentials', async () => {
    await driver.findElement(By.name('login')).sendKeys('FeTeste');
    await driver
      .findElement(By.name('password'))
      .sendKeys('Yasmim2901@', Key.RETURN);

    await driver.wait(until.urlIs('https://github.com/'), 5000);
    const createRepoBtn = await driver.findElement(
      By.partialLinkText('Create repository')
    );

    assert.ok(createRepoBtn.isDisplayed());
  });
});
