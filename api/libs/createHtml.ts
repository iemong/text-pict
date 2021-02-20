type Option = {
  text: string
}

export const createHtml = (option: Option) => {
  const { text } = option
  return `
        <html lang="ja">
            <head>
                <meta charset="utf-8">
                <title>Generated Image</title>
                <style>
                  body {
                    margin: 0;
                    padding: 0;
                    background: #ffefa1;
                    border: 40px solid #6ddccf;
                    box-sizing: border-box;
                    font-size: 64px;
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
                    padding: 50px;
                    box-sizing: border-box;
                  }
                </style>
                <link rel="preconnect" href="https://fonts.gstatic.com">
                <link href="https://fonts.googleapis.com/css2?family=Roboto&family=Yusei+Magic&display=swap" rel="stylesheet">

            </head>
            <body>
              <div class="flex">
                ${text}
              </div>
            </body> 
        </html>
    `
}
