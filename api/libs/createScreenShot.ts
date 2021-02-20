import puppeteer from "puppeteer"

export const createScreenShotFromHtml = async (
  html: string,
  width = 1200,
  height = 630
) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width, height })
  await page.setContent(html)
  return await page.screenshot({ type: "jpeg" })
}
