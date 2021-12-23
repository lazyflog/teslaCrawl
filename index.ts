/** @format */

import { Builder, By, until } from "selenium-webdriver";

const teslaImageCrawl = async () => {
  let driver = await new Builder().forBrowser("chrome").build();
  const modelName = ["models", "model3", "modelx", "modely"];
  for (var model = 0; model > modelName.length; model++) {
    await driver.get(`https://www.tesla.com/ko_kr/${modelName[model]}/design#overview`);
    await driver.sleep(2000);
    console.log("qwd");
  }
  await driver.quit();
};

teslaImageCrawl();
