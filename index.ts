import path from "path";
import fs from "fs";

import arg from "arg";
import puppeteer from "puppeteer-core";

const args = arg({
  "--out": String,
  "--width": Number,
  "--height": Number,
  "-o": "--out",
  "-w": "--width",
  "-h": "--height",
});

type Options = {
  width: number;
  height?: number;
  input: string;
};

const capture = async (options: Options) => {
  console.log(options);
  const { width, height, input } = options;
  const filePath = path.join(__dirname, input);
  const fileName = path.basename(filePath, ".html");
  if (!fs.existsSync(filePath)) {
    throw new Error("File is not found");
  }

  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const page = await browser.newPage();
  await page.goto(path.join("file:", filePath));

  if (height) {
    await page.setViewport({ width, height });
  } else {
    let pageHeight = await page.evaluate(
      () => document.documentElement.offsetHeight
    );
    await page.setViewport({ width, height: pageHeight });
  }

  await page.screenshot({ path: `${fileName}.png`, fullPage: !height });

  await browser.close();
};

(async () => {
  const input = args._[0];
  if (!input) return;

  await capture({
    width: args["--width"] || 1080,
    height: args["--height"],
    input,
  });
})();
