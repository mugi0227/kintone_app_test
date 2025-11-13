/*
 * キャリアアンカー診断アプリ - メインスクリプト (V2)
 *
 * 機能:
 * 1. 40問の質問を表示
 * 2. 全回答後、最高点の問題から3つのお気に入りを選択
 * 3. 8つのキャリアタイプ別にスコアを計算
 * 4. 最も高いタイプを判定
 *
 * V2の変更点:
 * - お気に入り選択を独自のHTML要素で実装（kintoneのフィールドに依存しない）
 * - より確実に動作する
 */

(function() {
  'use strict';

  // ========================================
  // 定数定義
  // ========================================

  // 質問データ（40問）
  const QUESTIONS = [
    { id: 1, text: '自分の専門分野で認められるような仕事をしたい', type: 'TF' },
    { id: 2, text: '組織全体を統括し、意思決定をする立場になりたい', type: 'GM' },
    { id: 3, text: '自分のペースで、自分のやり方で仕事を進めたい', type: 'AU' },
    { id: 4, text: '安定した収入と雇用の保証がある仕事が良い', type: 'SE' },
    { id: 5, text: '自分で起業したり、新しいビジネスを立ち上げたい', type: 'EC' },
    { id: 6, text: '社会や人々の役に立つ仕事をしたい', type: 'SV' },
    { id: 7, text: '困難な問題を解決することにやりがいを感じる', type: 'CH' },
    { id: 8, text: '仕事と私生活のバランスを大切にしたい', type: 'LS' },
    { id: 9, text: '専門知識やスキルを深めることに情熱を感じる', type: 'TF' },
    { id: 10, text: 'リーダーシップを発揮して、チームを率いたい', type: 'GM' },
    { id: 11, text: '組織のルールに縛られない働き方をしたい', type: 'AU' },
    { id: 12, text: '長期的に安定したキャリアを築きたい', type: 'SE' },
    { id: 13, text: '革新的なアイデアを形にしたい', type: 'EC' },
    { id: 14, text: '困っている人を助けることに喜びを感じる', type: 'SV' },
    { id: 15, text: '競争が激しい環境で自分の力を試したい', type: 'CH' },
    { id: 16, text: '家族との時間を優先できる仕事が良い', type: 'LS' },
    { id: 17, text: '技術や専門分野のエキスパートとして認識されたい', type: 'TF' },
    { id: 18, text: '経営的な視点で物事を考えるのが好きだ', type: 'GM' },
    { id: 19, text: '自分の判断で仕事の進め方を決めたい', type: 'AU' },
    { id: 20, text: '福利厚生が充実した会社で働きたい', type: 'SE' },
    { id: 21, text: 'リスクを取ってでも、大きな成功を掴みたい', type: 'EC' },
    { id: 22, text: '社会問題の解決に貢献したい', type: 'SV' },
    { id: 23, text: '不可能と思われることを成し遂げたい', type: 'CH' },
    { id: 24, text: '趣味や自己啓発の時間を確保したい', type: 'LS' },
    { id: 25, text: '専門分野での実績を積み重ねたい', type: 'TF' },
    { id: 26, text: '組織の戦略立案に関わりたい', type: 'GM' },
    { id: 27, text: 'フリーランスや独立した働き方に魅力を感じる', type: 'AU' },
    { id: 28, text: '定年まで同じ会社で働き続けたい', type: 'SE' },
    { id: 29, text: '自分のアイデアでビジネスを成功させたい', type: 'EC' },
    { id: 30, text: '次世代のために良い社会を残したい', type: 'SV' },
    { id: 31, text: '難しい目標にチャレンジすることが好きだ', type: 'CH' },
    { id: 32, text: '柔軟な勤務時間や働く場所を選びたい', type: 'LS' },
    { id: 33, text: '専門分野で第一人者になりたい', type: 'TF' },
    { id: 34, text: '複数の部門を統括する役職に就きたい', type: 'GM' },
    { id: 35, text: '上司の指示よりも、自分の判断を優先したい', type: 'AU' },
    { id: 36, text: '退職金や年金制度が整っている会社が良い', type: 'SE' },
    { id: 37, text: '新しい市場や機会を開拓したい', type: 'EC' },
    { id: 38, text: '弱い立場の人々をサポートしたい', type: 'SV' },
    { id: 39, text: '高い目標を達成することで自己実現したい', type: 'CH' },
    { id: 40, text: '仕事以外の人間関係も大切にしたい', type: 'LS' }
  ];

  // キャリアタイプの定義
  const CAREER_TYPES = {
    TF: { name: '専門・職能別コンピタンス', description: '特定分野の専門性を追求し、エキスパートとして認められることを重視します。' },
    GM: { name: '全般管理コンピタンス', description: '組織全体を管理・運営し、経営的な視点で意思決定することを重視します。' },
    AU: { name: '自律・独立', description: '自分のやり方で仕事を進め、組織の制約から自由でいることを重視します。' },
    SE: { name: '保障・安定', description: '安定した雇用と収入、長期的なキャリアの安全性を重視します。' },
    EC: { name: '起業家的創造性', description: '新しいビジネスやアイデアを創造し、リスクを取って成功を目指します。' },
    SV: { name: '奉仕・社会貢献', description: '社会や他者への貢献、人々の役に立つことを重視します。' },
    CH: { name: '純粋な挑戦', description: '困難な課題や高い目標に挑戦し、それを達成することを重視します。' },
    LS: { name: '生活様式', description: '仕事と私生活のバランス、柔軟な働き方を重視します。' }
  };

  // お気に入り選択を保存する変数
  let selectedFavorites = ['', '', ''];

  // ========================================
  // ユーティリティ関数
  // ========================================

  /**
   * 全質問が回答済みかチェック
   */
  function areAllQuestionsAnswered(record) {
    for (let i = 1; i <= 40; i++) {
      const fieldCode = 'q' + i;
      if (!record[fieldCode] || !record[fieldCode].value) {
        return false;
      }
    }
    return true;
  }

  /**
   * 各問題のスコアを取得（1-5）
   */
  function getQuestionScores(record) {
    const scores = {};
    for (let i = 1; i <= 40; i++) {
      const fieldCode = 'q' + i;
      const value = record[fieldCode] ? record[fieldCode].value : null;
      scores[i] = value ? parseInt(value, 10) : 0;
    }
    return scores;
  }

  /**
   * 最高スコアの問題を取得
   */
  function getTopScoredQuestions(scores) {
    const questionScoreList = [];
    for (let i = 1; i <= 40; i++) {
      questionScoreList.push({ id: i, score: scores[i] });
    }

    // スコアでソート（降順）
    questionScoreList.sort((a, b) => b.score - a.score);

    return questionScoreList;
  }

  /**
   * お気に入り選択候補を取得（最高点から順に、3つ選べるようにする）
   */
  function getFavoriteCandidates(scores) {
    const sortedQuestions = getTopScoredQuestions(scores);
    const maxScore = sortedQuestions[0].score;

    // 最高スコアの問題を取得
    const topQuestions = sortedQuestions.filter(q => q.score === maxScore);

    // 最高スコアが3つ以上なら、その中から選ぶ
    if (topQuestions.length >= 3) {
      return topQuestions;
    }

    // 最高スコアが3つ未満なら、次点も含める
    const candidates = [...topQuestions];
    let currentScore = maxScore - 1;

    while (candidates.length < 10 && currentScore > 0) {
      const nextQuestions = sortedQuestions.filter(q => q.score === currentScore);
      candidates.push(...nextQuestions);
      currentScore--;
    }

    return candidates.slice(0, 15); // 最大15個まで
  }

  /**
   * お気に入りボーナスを含めた各タイプのスコアを計算
   */
  function calculateTypeScores(record, scores) {
    const typeScores = {
      TF: 0, GM: 0, AU: 0, SE: 0,
      EC: 0, SV: 0, CH: 0, LS: 0
    };

    // 基本スコアを計算
    QUESTIONS.forEach(q => {
      const score = scores[q.id];
      typeScores[q.type] += score;
    });

    // お気に入りボーナス（+4点）を追加
    selectedFavorites.forEach(favoriteValue => {
      if (favoriteValue && favoriteValue.startsWith('Q')) {
        const questionId = parseInt(favoriteValue.replace('Q', ''), 10);
        const question = QUESTIONS.find(q => q.id === questionId);
        if (question) {
          typeScores[question.type] += 4;
        }
      }
    });

    return typeScores;
  }

  /**
   * 最も高いキャリアタイプを判定
   */
  function determineCareerType(typeScores) {
    let maxScore = 0;
    let topType = null;

    for (const [type, score] of Object.entries(typeScores)) {
      if (score > maxScore) {
        maxScore = score;
        topType = type;
      }
    }

    if (topType) {
      const careerType = CAREER_TYPES[topType];
      return `【${careerType.name}】\n\nスコア: ${maxScore}点\n\n${careerType.description}`;
    }

    return '診断を完了してください';
  }

  // ========================================
  // イベントハンドラ
  // ========================================

  /**
   * レコード追加/編集画面表示時
   */
  kintone.events.on(['app.record.create.show', 'app.record.edit.show'], function(event) {
    const record = event.record;

    // 質問文をスペースフィールドに表示
    QUESTIONS.forEach(q => {
      const spaceId = 'question_' + q.id;
      const spaceElement = kintone.app.record.getSpaceElement(spaceId);

      if (spaceElement) {
        spaceElement.innerHTML = `
          <div class="question-text">
            <strong>Q${q.id}.</strong> ${q.text}
          </div>
        `;
      }
    });

    // お気に入り選択エリアの初期表示
    const favoritesContainer = kintone.app.record.getSpaceElement('favorites_container');
    if (favoritesContainer) {
      if (areAllQuestionsAnswered(record)) {
        showFavoritesSection(record, favoritesContainer);
      } else {
        favoritesContainer.innerHTML = `
          <div class="favorites-placeholder">
            <p>すべての質問に回答すると、お気に入り選択が表示されます。</p>
          </div>
        `;
      }
    }

    return event;
  });

  /**
   * フィールド変更時（質問への回答）
   */
  for (let i = 1; i <= 40; i++) {
    const fieldCode = 'q' + i;
    kintone.events.on(['app.record.create.change.' + fieldCode, 'app.record.edit.change.' + fieldCode], handleQuestionChange);
  }

  /**
   * 質問変更時の処理
   */
  function handleQuestionChange(event) {
    const record = event.record;

    // すべて回答済みかチェック
    if (areAllQuestionsAnswered(record)) {
      const favoritesContainer = kintone.app.record.getSpaceElement('favorites_container');
      if (favoritesContainer) {
        showFavoritesSection(record, favoritesContainer);
      }
    }

    return event;
  }

  /**
   * お気に入り選択セクションを表示
   */
  function showFavoritesSection(record, container) {
    const scores = getQuestionScores(record);
    const candidates = getFavoriteCandidates(scores);

    // HTMLでドロップダウンを作成
    let html = `
      <div class="favorites-section">
        <h3>お気に入り選択</h3>
        <p class="favorites-instruction">
          最も共感した質問を3つ選んでください。選択した質問には+4点のボーナスが付与されます。
        </p>
        <div class="favorites-note">
          <strong>選択可能な質問:</strong> 高得点の質問から選べます
        </div>
        <div class="favorites-dropdowns">
    `;

    // 3つのドロップダウンを作成
    for (let i = 1; i <= 3; i++) {
      html += `
        <div class="favorite-item">
          <label for="favorite-select-${i}">お気に入り${i}:</label>
          <select id="favorite-select-${i}" class="favorite-select" data-index="${i - 1}">
            <option value="">選択してください</option>
      `;

      // 選択肢を追加
      candidates.forEach(q => {
        const question = QUESTIONS.find(quest => quest.id === q.id);
        const selected = selectedFavorites[i - 1] === ('Q' + q.id) ? ' selected' : '';
        html += `<option value="Q${q.id}"${selected}>Q${q.id}: ${question.text} (${q.score}点)</option>`;
      });

      html += `
          </select>
        </div>
      `;
    }

    html += `
        </div>
      </div>
    `;

    container.innerHTML = html;

    // イベントリスナーを設定
    for (let i = 1; i <= 3; i++) {
      const selectElement = document.getElementById('favorite-select-' + i);
      if (selectElement) {
        selectElement.addEventListener('change', function(e) {
          const index = parseInt(e.target.getAttribute('data-index'), 10);
          selectedFavorites[index] = e.target.value;

          // スコアを再計算
          updateScoresImmediate(record);
        });
      }
    }
  }

  /**
   * スコア即時更新
   */
  function updateScoresImmediate(record) {
    if (!areAllQuestionsAnswered(record)) {
      return;
    }

    const scores = getQuestionScores(record);
    const typeScores = calculateTypeScores(record, scores);

    // スコアフィールドを更新
    record.score_tf.value = typeScores.TF;
    record.score_gm.value = typeScores.GM;
    record.score_au.value = typeScores.AU;
    record.score_se.value = typeScores.SE;
    record.score_ec.value = typeScores.EC;
    record.score_sv.value = typeScores.SV;
    record.score_ch.value = typeScores.CH;
    record.score_ls.value = typeScores.LS;

    // キャリアタイプ判定
    const careerTypeResult = determineCareerType(typeScores);
    record.career_type_result.value = careerTypeResult;

    // 画面を更新
    kintone.app.record.set({ record: record });
  }

  /**
   * 保存前処理（スコア計算と判定）
   */
  kintone.events.on(['app.record.create.submit', 'app.record.edit.submit'], function(event) {
    const record = event.record;

    if (areAllQuestionsAnswered(record)) {
      const scores = getQuestionScores(record);
      const typeScores = calculateTypeScores(record, scores);

      // スコアフィールドを更新
      record.score_tf.value = typeScores.TF;
      record.score_gm.value = typeScores.GM;
      record.score_au.value = typeScores.AU;
      record.score_se.value = typeScores.SE;
      record.score_ec.value = typeScores.EC;
      record.score_sv.value = typeScores.SV;
      record.score_ch.value = typeScores.CH;
      record.score_ls.value = typeScores.LS;

      // キャリアタイプ判定
      const careerTypeResult = determineCareerType(typeScores);
      record.career_type_result.value = careerTypeResult;
    }

    return event;
  });

  /**
   * レコード詳細表示時
   */
  kintone.events.on(['app.record.detail.show'], function(event) {
    const record = event.record;

    // 質問文を表示
    QUESTIONS.forEach(q => {
      const spaceId = 'question_' + q.id;
      const spaceElement = kintone.app.record.getSpaceElement(spaceId);

      if (spaceElement) {
        const answer = record['q' + q.id] ? record['q' + q.id].value : '未回答';
        spaceElement.innerHTML = `
          <div class="question-text">
            <strong>Q${q.id}.</strong> ${q.text}
            <span class="answer-badge">回答: ${answer}</span>
          </div>
        `;
      }
    });

    return event;
  });

})();
