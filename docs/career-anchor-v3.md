# Career Anchor v3

最新バージョン（`src/career-anchor-v3.js`）は kintone UI Component へ依存せず、標準の DOM だけで以下を実現します。

## 必須フィールド
- ラジオボタン `q_1`〜`q_40`（選択肢 1〜5）
- 文字列（1行） `favorite_1`, `favorite_2`, `favorite_3`
- 数値 `score_tf`, `score_gm`, `score_au`, `score_se`, `score_ec`, `score_sv`, `score_ch`, `score_ls`
- 文字列（複数行） `career_type_result`
- スペース `question_1`〜`question_40`
- スペース `favorites_container`
- スペース `score_summary`（結果ボタン＋スコアカード・レーダーチャート表示用）
- スペース `score_radar`（フォームレイアウト調整の都合で配置しますが、JSが自動で非表示にします）

## 設定手順
1. フォームに上記フィールドを配置（ラジオ・スコアは必須設定、favorite_* は空のままで OK）。
2. 「JavaScript / CSSでカスタマイズ」で次の順にアップロード  
   1. `chart.umd.js`（[Chart.js v4 UMD 版](https://www.chartjs.org/dist/latest/chart.umd.js) をダウンロードして利用）  
   2. `src/style.css`  
   3. `src/career-anchor-v3.js`
3. アプリを更新してレコード画面を開くと、質問文・お気に入り UI・結果ボタンが描画されます。

## 挙動
- 40問すべてに回答すると、お気に入り選択（3枠）が表示されます。
- 最高点の設問が2件以下の場合は自動的に必須扱いになり、残りは次点から選択します。
- お気に入り1件につき +4 点を加算し、スコア欄は常に最新の合計で更新されます。
- `favorite_*` フィールドは非表示、スコア欄は `disabled` に設定されるためユーザーが直接編集する必要はありません。
- お気に入りが3件揃った状態で「結果を見る」ボタンを押すと、同じページ内でスコアカードとレーダーチャート＋タイプ説明カードが展開されます。Chart.js が読み込まれていない場合は注意メッセージを表示します。
- 保存時にお気に入りが未選択・重複・候補外の場合はエラーメッセージを表示してブロックします。

## 既存バージョンからの移行
- 旧 `career-anchor.js`（kintone UI Component 使用）とは排他利用を推奨します。
- 既存レコードを保持したままでもフィールド構成が同じであれば v3 を適用できます。
- `data/simple-demo-form.csv` を使って小規模テストを済ませてから本番へ適用することも可能です。
