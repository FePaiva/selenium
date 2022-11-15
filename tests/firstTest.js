const { Builder, By, Key } = require("selenium-webdriver");

async function exampleTest() {
  // launch the browser
  let driver = await new Builder().forBrowser("chrome").build();

  // navigate to app
  await driver.get("https://lambdatest.github.io/sample-todo-app/");

  // add todo to the list
  await driver
    .findElement(By.id("sampletodotext"))
    .sendKeys("Lern Selenium", Key.RETURN);
  // close the borwser
  await driver.quit();
}

exampleTest();
