const { By, Key, Builder } = require('selenium-webdriver');
// require('chromedriver');

describe('check search functionability', function () {
  it('runs a basic search', async function () {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.google.com/');

    await driver
      .findElement(By.name('q'))
      .sendKeys('Felippe Paiva', Key.RETURN);

    await driver.quit();
  });
});
