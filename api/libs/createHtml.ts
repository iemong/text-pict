import { defaultHtml } from "api/templates/default"
import sanitizeHtml from "sanitize-html"

type Option = {
  text: string
  width: number
  fontSize: number
}

export type templateOptions = {
  text: string
  borderSize: string
  actualFontSize: string
  paddingSize: string
}

export const createHtml = (option: Option) => {
  const { text, width, fontSize } = option

  const calcVW = (size: number) => `${(size / width) * 100}vw`
  const actualFontSize = calcVW(fontSize)
  const borderSize = calcVW(40)
  const paddingSize = calcVW(50)

  return defaultHtml({
    text,
    borderSize,
    actualFontSize,
    paddingSize,
  })
}
