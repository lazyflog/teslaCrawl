/** @format */

import { Builder, By, Key, until } from "selenium-webdriver";

const teslaImageCrawl = async () => {
  let driver = await new Builder().forBrowser("chrome").build();
  const modelName = ["models", "model3", "modelx", "modely"];
  const carColor = ["PearlWhite", "SolidBlack", "MidnightSilver", "DeepBlue", "Red"];
  for (var model = 0; model < modelName.length; model++) {
    await driver.get(`https://www.tesla.com/ko_kr/${modelName[model]}/design#overview`);
    await driver.wait(until.elementsLocated(By.className("tds-text--caption")), 10000);
    let getImage = await driver.findElements(By.css("image"));
    for (var c = 1; c < 6; c++) {
      var findPaint = await driver.findElements(By.css("div"));
      for (var p = 0; p < findPaint.length; p++) {
        var getPain = await findPaint[p].getAttribute("data-group-id");
      }
      await driver.wait(until.elementsLocated(By.xpath(`//*[@id="root"]/div[2]/main/section/div[2]/div[1]/div[2]/div/fieldset/div[1]/div/div[${c}]`)), 10000);
      let colors = await driver.findElement(By.xpath(`//*[@id="root"]/div[2]/main/section/div[2]/div[1]/div[2]/div/fieldset/div[1]/div/div[${c}]`));
      await colors.click();
      await driver.sleep(1000);

      // 휠 선택
      for (var w = 1; w < 3; w++) {
        var findWheel1 = await driver.findElements(By.css("div"));
        for (var fw = 0; fw < findWheel1.length; fw++) {
          var findWheel2 = await findWheel1[fw].getAttribute("data-group-id");
          // console.log(findWheel2);
          if (findWheel2 == "WHEELS") {
            var wheelImage = await findWheel1[fw].findElement(By.xpath(`./fieldset/div[1]/div/div[${w}]`));
            await wheelImage.click();
          }
        }
        // 휠 크기
        var wheelInch = await driver.findElement(By.xpath('//*[@id="root"]/div[2]/main/section/div[2]/div[1]/div[3]/div/fieldset/div[2]/div/div[1]/p/span'));
        var getInch = (await wheelInch.getText()).split("인치")[0];
        await driver.sleep(1000);
        // 차량 이미지
        var count = 0;
        for (var i = 0; i < getImage.length; i++) {
          var href = await getImage[i].getAttribute("xlink:href");
          if (href.includes("https://static-assets.tesla.com/configurator/compositor") && count === 0) {
            console.log(modelName[model] + carColor[c - 1] + "wheel" + getInch + ": " + href);
            count = 1;
          }
        }
      }
    }
    await driver.sleep(2000);
  }
  await driver.quit();
};

teslaImageCrawl();
