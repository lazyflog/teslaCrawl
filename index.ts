/** @format */

import { Builder, By, Key, until } from "selenium-webdriver";

const teslaImageCrawl = async () => {
  let driver = await new Builder().forBrowser("chrome").build();
  const modelName = ["models", "model3", "modelx", "modely"];
  const carColor = ["PearlWhite", "SolidBlack", "MidnightSilver", "DeepBlue", "Red"];
  for (var model = 0; model < 4; model++) {
    await driver.get(`https://www.tesla.com/ko_kr/${modelName[model]}/design#overview`);
    await driver.sleep(2000);
    let getImage = await driver.findElements(By.css("image"));
    var findDiv = await driver.findElements(By.css("div"));
    var paintClick = [];
    var wheelClick = [];
    for (var p = 0; p < findDiv.length; p++) {
      var getPaint = await findDiv[p].getAttribute("data-group-id");
      if (getPaint == "PAINT") {
        var aa = await findDiv[p].findElements(By.xpath(`./fieldset/div[1]/div//div`));
        paintClick.push(aa);
      } else if (getPaint == "WHEELS") {
        var bb = await findDiv[p].findElements(By.xpath(`./fieldset/div[1]/div//div`));
        wheelClick.push(bb);
      }
      if (paintClick.length > 0 && wheelClick.length > 0) {
        break;
      }
    }
    for (var paint = 0; paint < 5; paint++) {
      await paintClick[0][paint].click();
      for (var wheel = 0; wheel < 2; wheel++) {
        await wheelClick[0][wheel].click();
        var wheelName = await wheelClick[0][wheel].findElement(By.xpath("./input")).getAttribute("aria-label");
        // 차량 이미지
        var count = 0;
        for (var i = 0; i < getImage.length; i++) {
          var href = await getImage[i].getAttribute("xlink:href");
          if (href.includes("https://static-assets.tesla.com/configurator/compositor") && count === 0) {
            console.log(modelName[model] + carColor[paint] + "wheel" + wheelName.split(" ")[0].replace(/\인치/gi, "") + ": " + href);
            count = 1;
          }
        }
      }
    }
  }
  await driver.quit();
};

teslaImageCrawl();
