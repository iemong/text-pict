import puppeteer from "puppeteer-core"
import chrome from "chrome-aws-lambda"

const isDev = !process.env.AWS_REGION

export const createScreenShotFromHtml = async (
  html: string,
  width = 1200,
  height = 630
) => {
  const browser = await puppeteer.launch(
    isDev
      ? {
          args: [],
          executablePath:
            "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
          headless: true,
        }
      : {
          args: chrome.args,
          executablePath: await chrome.executablePath,
          headless: chrome.headless,
        }
  )
  const page = await browser.newPage()
  await page.setViewport({ width, height })
  await page.setContent(html, { waitUntil: "load" })
  return await page.screenshot({ type: "jpeg" })
}
