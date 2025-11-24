# FormBridge DOMカスタマイズ設計指針

## 方針
1. **依存する要素の限定**  
   - FormBridge 標準で生成される `fb-question`, `fb-section`, `fb-button` など、公式がバージョン互換を維持しているクラス／data属性のみをターゲットにする。  
   - `document.querySelector('[data-fb-question="q_1"]')` のように data 属性で取得することで、フロントエンドの構造変化に強くする。  
   - 任意のラッパー要素が必要な場合は カスタムHTMLブロックで自前の `data-role` を付与し、その要素だけを参照する。

2. **スタイル適用**  
   - 親要素を侵食せず、カスタムCSSは `formbridge-root .custom-card` のように自作クラスに対して適用する。標準UIのクラス名を書き換えたり display:none で大量に隠すのは避ける。  
   - 5段階ボタン等も自前の `<div class="scale-button" data-value="5">5</div>` を追加し、クリック時に hidden value を更新する。

3. **JS実装**  
   - イベントハンドラは `addEventListener` で登録し、jQuery 等の外部依存を避ける。  
   - DOM 構造へ干渉する操作（append/remove等）は自身で追加した要素の範囲内で完結させ、FormBridgeが生成する既定の質問ブロックは基本的に hidden 切り替えのみ。  
   - 1問ずつのページングは `currentQuestionIndex` を state 管理し、`display: none` / `flex` の切り替えで実現可能。

## 運用上のリスク軽減
- **バージョン影響**: data属性ベースのDOM参照＋自前クラスへのスタイリングに限定することで、FormBridge側がレイアウトをアップデートしても影響を受けにくい。DOM構造が変わっても data 属性が維持される限り DOM 操作は安定。  
- **セキュリティ**: 外部ライブラリや eval を使用せず、フォーム内に XSS を発生させるコードを書かない。ユーザー入力をHTMLへ挿入する場合は `textContent` を使いエスケープを徹底する。  
- **アップデート対応**: カスタムJS/CSSは Git 管理し、バージョンアップ時には staging 環境で DOM 変化を確認するフローを定義する。

## 期待されるUX
この指針の範囲でも以下のようなリッチUIが実現可能:
- Q1〜Q40 のカード表示、選択肢のタイル化、前へ/次へボタンによるページング
- 進捗バー、フェードアニメーション、回答済みのハイライト
- 結果表示（Chart.js やカスタムカード）を同ページ内に描画

FormBridge 標準DOMを壊さず、自前のラッパー要素内でリッチなUIを組み立てることで、リスクを抑えた実装が可能である。
