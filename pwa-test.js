const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
	await driver.get('http://localhost:8000/scope/demo.html');
    let resultNode = await driver.wait(until.elementLocated(By.id('result')), 5000);
	let result = await resultNode.getAttribute('value');
    console.log('Test result:', result);
  } finally {
	setTimeout(() => {
	  driver.quit();
    }, 10000);
  }
})();