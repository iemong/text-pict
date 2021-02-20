import type { NowRequest, NowResponse } from "@vercel/node"
import { createHtml } from "./libs/createHtml"
import { createScreenShotFromHtml } from "./libs/createScreenShot"

export default async (req: NowRequest, res: NowResponse) => {
  const { text = "ここにテキストが入ります" } = req.query

  try {
    const joinedText = Array.isArray(text) ? text.join("") : text
    const templateHtml = createHtml({ text: joinedText })

    const file = await createScreenShotFromHtml(templateHtml)

    res.statusCode = 200
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
