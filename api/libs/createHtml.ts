import sanitizeHtml from "sanitize-html"

type Option = {
  text: string
  width: number
  fontSize: number
}

export const createHtml = (option: Option) => {
  const { text, width, fontSize } = option

  const calcVW = (size:number) => `${size / width * 100}vw`
  const actualFontSize = calcVW(fontSize)
  const borderSize = calcVW(40)
  const paddingSize = calcVW(50)

  return `
        <html lang="ja">
            <head>
                <meta charset="utf-8">
                <title>Generated Image</title>
                <style>
                  @import url('https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap');
                </style>
                <style>
                  body {
                    margin: 0;
                    padding: 0;
                    background: #ffefa1;
                    border: ${borderSize} solid #6ddccf;
                    box-sizing: border-box;
                    font-size: ${actualFontSize};
                    font-family: "Yusei Magic", "Roboto", sans-serif;
                    font-weight: bold;
                    color: #555;
                  }
                  .flex {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    padding: ${paddingSize};
                    box-sizing: border-box;
                  }
                </style>
            </head>
            <body>
              <div class="flex">
                ${sanitizeHtml(text)}
              </div>
            </body> 
        </html>
    `
}
