# FormBridge フロントエンド資産

`formbridge/` 配下には FormBridge（v2 UI）で動かすための JS/CSS、参考ドキュメントをまとめています。kintone 側ではバックエンド（アプリやフィールド）だけを用意し、フロントは FormBridge のカスタマイズで完結させる想定です。

## ディレクトリ構成

- `js/customize.js`  
  40 問のキャリアアンカー診断、結果表示、レーダーチャート描画までを FormBridge のイベント API だけで完結させるメインスクリプト。  
  DOM 直接操作は HTML ブロックをフックにした安全な領域内に限定しています。
- `css/style.css`  
  カード UI／2 カラム結果表示／お気に入りボタンなど、`customize.js` が生成する要素一式のスタイル。
- `customize-doc.html`  
  FormBridge 公式のカスタマイズガイド（オフライン参照用）。

## 事前準備

1. **FormBridge フォームに HTML ブロックを追加（任意）**  
   - フィールドコード: `custom_ui_root`（`customize.js` の `APP_ROOT_FIELD_CODE` と一致させる）。  
   - ここに JS が診断 UI を丸ごと描画します。  
   - HTML ブロックを用意できない場合でも、スクリプトが `.fb-custom--fields-area`（help.txt 記載の標準 DOM）を自動で非表示にし、その直前へカスタム UI を差し込みます。
2. **必須ライブラリのアップロード**  
   - `js/customize.js`（JavaScript カスタマイズ）  
   - `css/style.css`（CSS カスタマイズ）  
   - `Chart.js`（公式 CDN からダウンロードした `chart.umd.js` 等）
3. **kintone フィールド**  
   - 質問: `q1`〜`q40`（数値 or ラジオ）。FormBridge 側では非表示だが値は受け取る。  
   - スコア: `score_tf` など 8 フィールド（数値フィールド推奨）。  
   - お気に入り: `favorite_1`〜`favorite_3`（文字列/ドロップダウンどちらでも可、JS 側がコード値をセット）。  
   - 結果サマリ: `career_type_result`（複数行文字列等）。

## 反映手順

1. FormBridge 設定 → カスタマイズタブで JS/CSS/Chart.js を追加。読み込み順は CSS → Chart.js → `customize.js` を推奨。
2. フォームプレビューで  
   - ラジオなどの標準 UI が非表示になり、カード型 UI が描画される  
   - 40 問回答後に「お気に入り選択へ」が出現し、そこで 3 つの質問を選ぶと +4 点が付与される  
   - 選んだ質問が `favorite_*` フィールド（`Q1` など）に保存される  
   - スコアが `score_*` に書き込まれる  
   ことを確認。

## 設計メモ

- DOM 取得は `custom_ui_root`（HTML ブロック）か、存在しない場合はフォームボディの先頭に `div#career-anchor-formbridge-root` を生成して行います。FormBridge のレイアウト更新による DOM 構造変化の影響を最小化する設計です。
- レーダーチャートは `Chart.js` v4 の `chart.umd.js` を想定。CDN からダウンロードして FormBridge にアップロードするだけで動きます。
- 参考資料や API 型定義はリポジトリ直下の `formbridge-javascript-customize.d.ts` と `help.txt` を参照してください。
