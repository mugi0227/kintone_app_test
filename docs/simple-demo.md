# Simple Demo: 2 Questions + Dynamic Dropdown

このデモでは以下の構成で動作確認できます。詳細な手順:

1. フォームに次のフィールドを追加（`data/simple-demo-form.csv` を読み込むとラジオ・文字列・数値フィールドを一括作成できます）
   - ラジオボタン `simple_q1` (選択肢 1〜5)
   - ラジオボタン `simple_q2` (選択肢 1〜5)
   - 文字列 (1行) `simple_choice` (選択した設問コードを保存。JSで自動的に非表示)
   - 数値 `simple_score` (結果表示。JSで編集不可にする)
   - スペースフィールド (要素ID: `simple_dropdown_space`)

2. `simple_score` と `simple_choice` は JS 側で `disabled` / 非表示にするため、フォーム上では通常のフィールドとして配置しておくだけでOKです。

3. `src/simple-demo.js` をアップロードし、アプリを更新します。

4. レコード作成画面で Q1/Q2 に回答すると、`simple_dropdown_space` にドロップダウンが現れ、より高いスコアの設問だけが候補として表示されます。選択すると `simple_choice` にコードが保存され、`simple_score` には `Q1 + Q2` に加え、お気に入りとして選んだ設問があれば +4 点が自動加算されます（スコア欄は編集不可）。
