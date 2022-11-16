const { Builder, By, Key } = require("selenium-webdriver");
const assert = require("assert");

// no need to add .assert() or .expect(), only if want to use should()
var should = require("chai").should();

async function exampleTest() {
  // launch the browser
  let driver = await new Builder().forBrowser("chrome").build();

  // navigate to app
  await driver.get("https://lambdatest.github.io/sample-todo-app/");

  // add todo to the list
  await driver
    .findElement(By.id("sampletodotext"))
    .sendKeys("Learn Selenium", Key.RETURN);

  // assert
  // xpath -> finding the list of "li", and retrieve the last one as "Learn Selenium" was added last.
  let todoText = await driver
    .findElement(By.xpath("//li[last()]"))
    .getText()
    .then(function (value) {
      return value;
    });
  // assert using node assertion
  // assert.strictEqual(todoText, "Learn Selenium");

  // assert using chai should
  todoText.should.equal("Learn Selenium");

  // close the borwser
  await driver.quit();
}

exampleTest();
