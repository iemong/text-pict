import type { templateOptions } from "api/libs/createHtml"
import sanitizeHtml from "sanitize-html"

export const ticketGeneratorHtml = ({
  text,
  borderSize,
  actualFontSize,
  paddingSize,
}: templateOptions) => {
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
                    background: #fff;
                    border: ${borderSize} solid #111;
                    box-sizing: border-box;
                    font-size: ${actualFontSize};
                    font-family: "Yusei Magic", "Roboto", sans-serif;
                    color: #111;
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
