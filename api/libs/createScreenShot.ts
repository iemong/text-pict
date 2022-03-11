import puppeteer from "puppeteer-core"
import chrome from "chrome-aws-lambda"

const isDev = !process.env.AWS_REGION

export const createScreenShotFromHtml = async (
  html: string,
  width = 1200,
  height = 630
) => {
  await chrome.font(
    "https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf"
  )

  await chrome.font(
    "https://rawcdn.githack.com/tanukifont/YuseiMagic/d4ef3481ebbd3d9be6389ca992427ae851cbd6db/fonts/ttf/YuseiMagic-Regular.ttf"
  )

  await chrome.font(
    "https://rawcdn.githack.com/googlefonts/noto-cjk/b4f6497749235331fdbfe349ae0c581185f5c28f/Sans/Variable/TTF/NotoSansCJKjp-VF.ttf"
  )

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
  return page.screenshot({ type: "jpeg" })
}
