const { By, Key, Builder, until } = require('selenium-webdriver');
const assert = require('assert');

let driver;

describe('GitHub Sign In', () => {
  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();

    await driver.get('https://github.com/');
  });
  // after(async () => {
  //   await driver.quit();
  // });

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

  it('should not allow user to sign in with invalid credentials', async () => {
    // await driver.findElement(By.name('login')).sendKeys('FeTeste');
    await driver.findElement(By.name('login')).sendKeys('FeTest');
    await driver
      .findElement(By.id('password'))
      .sendKeys('Yasmim2901', Key.RETURN);

    await driver.wait(until.urlIs('https://github.com/session'), 5000);
    const alertMessage = await driver.findElement(
      By.className('js-flash-alert')
    );

    assert.ok(alertMessage.isDisplayed());
  });

  it('should allow user to sign in with valid credentials', async () => {
    // await driver.findElement(By.name('login')).sendKeys('FeTeste');
    await driver.findElement(By.name('login')).sendKeys('FeTeste');
    await driver
      .findElement(By.id('password'))
      .sendKeys('Yasmim2901@', Key.RETURN);

    await driver.wait(until.urlIs('https://github.com/'), 5000);
    const importRepoBtn = await driver.findElement(By.className('no-wrap'));

    assert.ok(importRepoBtn.isDisplayed());
  });
});
