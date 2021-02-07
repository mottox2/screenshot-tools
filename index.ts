import path from "path";
import puppeteer from "puppeteer-core";

const capture = async () => {
  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const page = await browser.newPage();
  await page.goto(path.join("file:", __dirname, "index.html"));
  await page.screenshot({ path: "example.png" });

  await browser.close();
};

(async () => {
  await capture();
})();
