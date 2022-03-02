import { defaultHtml } from "../templates/default"
import { ticketGeneratorHtml } from "../templates/ticketGenerator"

type Option = {
  text: string
  width: number
  fontSize: number
  type: string
}

export type templateOptions = {
  text: string
  borderSize: string
  actualFontSize: string
  paddingSize: string
}

export const createHtml = (option: Option) => {
  const { text, width, fontSize, type } = option

  const calcVW = (size: number) => `${(size / width) * 100}vw`
  const actualFontSize = calcVW(fontSize)
  const borderSize = calcVW(40)
  const paddingSize = calcVW(50)

  switch (type) {
    case "ticket":
      return ticketGeneratorHtml({
        text,
        borderSize,
        actualFontSize,
        paddingSize,
      })
    default:
      return defaultHtml({
        text,
        borderSize,
        actualFontSize,
        paddingSize,
      })
  }
}
