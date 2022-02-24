import type { NowRequest, NowResponse } from "@vercel/node"
import { createHtml } from "./libs/createHtml"
import { createScreenShotFromHtml } from "./libs/createScreenShot"

export default async (req: NowRequest, res: NowResponse) => {
  const { text = "ここにテキストが入ります", w = "1200", h = "630", f = "64" } = req.query

  try {
    const width = Number.parseInt(Array.isArray(w) ? w[0] : w, 10)
    const height = Number.parseInt(Array.isArray(h) ? h[0] : h, 10)
    const fontSize = Number.parseInt(Array.isArray(f) ? f[0] : f, 10)

    const joinedText = Array.isArray(text) ? text.join("") : text
    const templateHtml = createHtml({ text: joinedText, width, fontSize })
    const file = await createScreenShotFromHtml(templateHtml, width, height)

    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.statusCode = 200
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')

    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    res.setHeader("Content-Type", "image/jpeg")
    /* Cache-Controlの内訳(MDNより[https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Cache-Control])
     * public: レスポンスが通常はキャッシュ可能でなくても、レスポンスをどのキャッシュにも格納することができます。
     * immutable: 時間が経ってもレスポンスの本文が変化しないことを示します。リソースは、期限切れでない限り、サーバー上で変化していないため、クライアントは、たとえユーザーが明示的にページを更新した場合でも、更新をチェックするために条件付きの再検証 (If-None-Match や If-Modified-Since など) を送ってはいけません。
     * no-transform: 中間キャッシュやプロキシが、レスポンスの本文、 Content-Encoding, Content-Range, Content-Type を変更してはいけません。したがって、 Google’s Web Light のようなプロキシやブラウザーの機能を使用して、キャッシュの格納や遅いコネクションにおいてデータを最小化するために画像を変換してはいけません。
     * max-age=<seconds>: リソースが新しいとみなされる最長の時間です。 Expires とは異なり、このディレクティブはリクエスト時刻からの相対時間です。
     * s-maxage=<seconds>: max-age または Expires ヘッダーを上書きしますが、共有キャッシュ (プロキシなど) だけのためのものです。プライベートキャッシュでは無視されます。
     * */
    res.setHeader(
      "Cache-Control",
      "public, immutable, no-transform, s-maxage=31536000, max-age=31536000"
    )
    res.end(file)
  } catch (e) {
    res.statusCode = 500
    res.setHeader("Content-Type", "text/html")
    res.end("<h1>Internal Server Error</h1><p>Sorry, there was a problem.</p>")
    console.error(e)
  }
}
