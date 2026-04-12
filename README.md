# kakeibo-entiry

Google Form を保存先として使い、その入力 UI だけをこのリポジトリ側で肩代わりするフロントエンド実装です。

ブラウザ上ではこの画面だけを操作し、送信時に Google Form の `formResponse` エンドポイントへ直接 `POST` します。

## 何をしているリポジトリか

- 家計簿入力用のシンプルな単一画面 UI を提供する
- 入力値を Google Form の各 `entry.*` パラメータに詰め替えて送信する
- Google Form の送信先 URL をクエリパラメータから受け取り、再訪時も使えるように保持する

言い換えると、UI はこのリポジトリ、保存先は Google Form です。

## 画面構成

画面では次の項目を入力します。

- 使った日
- 使った金額
- 分類
- メモ
- 使った人

`index.html` はフォーム本体とボタン群を持ち、各入力補助は別 JS に分けられています。

## 使い方

最初のアクセス時に、Google Form の送信先を `action` クエリで渡します。

例:

```text
index.html?action=https://docs.google.com/forms/d/e/.../formResponse
```

このクエリは `localStorage` と cookie に保存され、次回以降はクエリなしで開いても復元されます。

送信の流れは次の通りです。

1. 画面で各項目を入力する
2. 「確認して送信」を押す
3. 確認ダイアログの内容を確認する
4. Google Form に対して `POST` する

## 実装の要点

### 1. Google Form の項目 ID をそのまま使う

各 input の `name` 属性には Google Form 側の `entry.*` ID をそのまま埋めています。

例:

- `entry.502180998`: 使った日
- `entry.1644931895`: 使った金額
- `entry.1872975358`: 分類
- `entry.1263347079`: メモ
- `entry.1354928899`: 使った人

このため、Google Form 側の設問を変更した場合は、対応する `entry.*` をこの画面側でも更新する必要があります。

### 2. 日付だけは分解して送る

Google Form の日付項目は単純な 1 パラメータではなく、年・月・日に分解して送っています。

送信時には次のような形になります。

```text
entry.502180998_year=2026
entry.502180998_month=04
entry.502180998_day=12
```

一方で他の項目は通常通り `entry.xxx=value` の形式です。

### 3. 送信は fetch + no-cors

送信は `fetch()` で行い、`mode: "no-cors"` を指定しています。

そのため、ブラウザ側で成功レスポンスを厳密に判定する構成ではありません。実装としては「送信要求を投げる」ことに寄せています。

## ファイル構成

- `index.html`
  画面本体です。入力欄、日付ボタン、金額テンキー、分類ボタン、送信ボタンを持ちます。

- `query-params.js`
  URL のクエリパラメータを保存・復元します。主に `action` の維持が目的です。

- `input-date.js`
  日付入力を担当します。週送り、今日への移動、曜日表示、日付反映を行います。

- `input-amount.js`
  金額入力を担当します。テンキー風ボタンで数値を組み立てます。

- `input-account-item.js`
  分類ボタン押下時に、分類 input に値を設定します。

- `input-who-spent.js`
  「使った人」ボタン押下時に、対象 input に値を設定します。

- `send-form.js`
  バリデーション、確認ダイアログ、リクエストボディ生成、Google Form 送信を担当します。

- `common-utility.js`
  小さな共通関数 `range()` を持ちます。

- `manifest.json`
  PWA 風にホーム画面追加しやすくするための設定です。

## send-form.js の流れ

`send-form.js` では送信ボタン押下時に次の順で処理します。

1. `action` クエリがあるか確認する
2. 必須項目が埋まっているか確認する
3. 確認ダイアログを表示する
4. Google Form に `POST` する
5. 入力の一部を初期化する
6. 画面上部へスクロールする

初期化後も日付と「使った人」は残り、金額・分類・メモはクリアされます。

## 注意点

- `action` が無いと送信できません
- Google Form 側の設問 ID を変えると、この画面も追従が必要です
- `no-cors` のため、送信成功/失敗の厳密な検知はしていません
- HTML 内で `document.write()` を使ってボタンを描画しているため、構造は単純ですが現代的な書き方ではありません

## ローカル確認

静的ファイルだけなので、簡単な HTTP サーバで確認できます。

例:

```bash
python3 -m http.server 8000
```

その後、ブラウザで次のように開きます。

```text
http://localhost:8000/index.html?action=https://docs.google.com/forms/d/e/.../formResponse
```

## 今後のメモ

改善するなら次のあたりが候補です。

- `entry.*` とラベルの対応を定数としてまとめる
- 送信設定の持ち方を `action` 以外も含めて整理する
- 送信完了の手応えを UI 上でもう少し分かりやすくする
