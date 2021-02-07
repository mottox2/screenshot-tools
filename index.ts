import path from "path";
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
  height: number;
  out: string;
};

const capture = async (options: Options) => {
  console.log(options);
  const { width, height, out } = options;
  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto(path.join("file:", __dirname, out));
  await page.screenshot({ path: "example.png" });

  await browser.close();
};

(async () => {
  const out = args._[0];
  if (!out) return;

  await capture({
    width: args["--width"] || 1080,
    height: args["--height"] || 740,
    out,
  });
})();
