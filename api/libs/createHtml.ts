type Option = {
  text: string
}

export const createHtml = (option: Option) => {
  const { text } = option
  return `
        <html>
            <head>
                <title>Generated Image</title>
                <style>
                  body {
                    margin: 0;
                    padding: 0;
                    background: #ffefa1;
                    border: 40px solid #6ddccf;
                    box-sizing: border-box;
                    font-size: 64px;
                    font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
                    font-weight: bold;
                  }
                  .flex {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                  }
                </style>
            </head>
            <body>
              <div class="flex">
                ${text}
              </div>
            </body> 
        </html>
    `
}
