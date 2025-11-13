/*
 * キャリアアンカー診断アプリ - メインスクリプト
 *
 * 機能:
 * 1. 40問の質問を表示
 * 2. 全回答後、最高点の問題から3つのお気に入りを選択
 * 3. 8つのキャリアタイプ別にスコアを計算
 * 4. 最も高いタイプを判定
 */

(function() {
  'use strict';

  // お気に入り選択用のドロップダウン（UI Component）
  let favoriteDropdowns = [];

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

  // ID から素早く設問情報を引けるようマップ化
  const QUESTION_MAP = QUESTIONS.reduce((map, question) => {
    map[question.id] = question;
    return map;
  }, {});

  // お気に入り選択フィールドの一覧
  const FAVORITE_FIELDS = ['favorite_1', 'favorite_2', 'favorite_3'];

  // スコアフィールド一覧
  const SCORE_FIELDS = [
    'score_tf',
    'score_gm',
    'score_au',
    'score_se',
    'score_ec',
    'score_sv',
    'score_ch',
    'score_ls'
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
   * お気に入り選択に必要な候補情報を取得
   */
  function getFavoriteSelectionInfo(scores) {
    const sortedQuestions = getTopScoredQuestions(scores);
    const questionsByScore = sortedQuestions.reduce((acc, question) => {
      if (!acc[question.score]) {
        acc[question.score] = [];
      }
      acc[question.score].push(question);
      return acc;
    }, {});

    const sortedScores = Object.keys(questionsByScore)
      .map(score => parseInt(score, 10))
      .sort((a, b) => b - a);

    const candidates = [];
    for (const score of sortedScores) {
      candidates.push(...questionsByScore[score]);
      if (candidates.length >= 3) {
        break;
      }
    }

    const highestScore = sortedScores[0] || 0;
    const highestQuestions = questionsByScore[highestScore] || [];
    const forcedQuestionIds = highestQuestions.length < 3
      ? highestQuestions.map(q => q.id)
      : [];

    return {
      candidates,
      forcedQuestionIds
    };
  }

  /**
   * 質問番号のリストを「Q1、Q2」のような文字列に整形
   */
  function formatQuestionLabels(questionIds) {
    return questionIds
      .map(id => `Q${id}`)
      .join('、');
  }

  /**
   * お気に入りボーナスを含めた各タイプのスコアを計算
   */
  function calculateTypeScores(scores, favoriteQuestionIds) {
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
    favoriteQuestionIds.forEach(questionId => {
      const question = QUESTION_MAP[questionId];
      if (question) {
        typeScores[question.type] += 4;
      }
    });

    return typeScores;
  }

  /**
   * お気に入り選択の妥当性をチェック
   */
  function validateFavoriteSelections(record, selectionInfo) {
    const favoriteValues = FAVORITE_FIELDS.map(fieldCode => {
      return record[fieldCode] ? record[fieldCode].value : '';
    });

    if (favoriteValues.some(value => !value)) {
      return {
        status: 'incomplete',
        message: 'お気に入りの質問を3つすべて選択してください。'
      };
    }

    const questionIds = favoriteValues.map(value => parseInt(value.replace('Q', ''), 10));
    if (questionIds.some(id => Number.isNaN(id))) {
      return {
        status: 'invalid',
        message: 'お気に入り選択の値が不正です。画面を更新して再度選択してください。'
      };
    }

    const uniqueIds = Array.from(new Set(questionIds));
    if (uniqueIds.length !== favoriteValues.length) {
      return {
        status: 'invalid',
        message: '同じ質問を複数回選択することはできません。'
      };
    }

    const allowedIds = new Set(selectionInfo.candidates.map(candidate => candidate.id));
    const invalidIds = questionIds.filter(id => !allowedIds.has(id));
    if (invalidIds.length) {
      return {
        status: 'invalid',
        message: `候補外の ${formatQuestionLabels(invalidIds)} は選択できません。`
      };
    }

    const forcedIds = selectionInfo.forcedQuestionIds;
    if (forcedIds.length) {
      const missingForced = forcedIds.filter(id => !uniqueIds.includes(id));
      if (missingForced.length) {
        return {
          status: 'invalid',
          message: `最高点の ${formatQuestionLabels(missingForced)} は必ず選択してください。`
        };
      }
    }

    return {
      status: 'valid',
      selectedIds: questionIds
    };
  }

  /**
   * 利用可能な kintone UI Component の Dropdown クラスを取得
   */
  function resolveKucDropdown() {
    if (window.Kucs && typeof window.Kucs === 'object') {
      const versions = Object.keys(window.Kucs)
        .filter(key => window.Kucs[key] && typeof window.Kucs[key].Dropdown === 'function')
        .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
      if (versions.length > 0) {
        return window.Kucs[versions[0]].Dropdown;
      }
    }

    if (window.Kuc && typeof window.Kuc.Dropdown === 'function') {
      return window.Kuc.Dropdown;
    }

    return null;
  }

  /**
   * kintone UI Componentを使ってお気に入りドロップダウンを描画
   */
  function renderFavoriteDropdowns(record, optionList, container) {
    const KucDropdown = resolveKucDropdown();
    if (!KucDropdown) {
      container.innerHTML = '<p class="favorites-error">kintone UI Component v1（kuc.min.js）が読み込まれていません。</p>';
      return;
    }

    favoriteDropdowns = [];

    const dropdownItems = [
      { label: '選択してください', value: '' },
      ...optionList
    ];

    FAVORITE_FIELDS.forEach((fieldCode, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'favorite-dropdown-item';

      const label = document.createElement('label');
      label.className = 'favorite-dropdown-label';
      label.textContent = `お気に入り${index + 1}`;
      wrapper.appendChild(label);

      const initialValue = dropdownItems.some(item => item.value === (record[fieldCode] ? record[fieldCode].value : ''))
        ? record[fieldCode].value
        : '';

      const dropdown = new KucDropdown({
        items: dropdownItems,
        value: initialValue
      });

      const handleChange = eventOrValue => {
        const value = eventOrValue && eventOrValue.detail && eventOrValue.detail.value !== undefined
          ? eventOrValue.detail.value
          : (eventOrValue !== undefined ? eventOrValue : '');
        const appRecord = kintone.app.record.get();
        const latestRecord = appRecord.record;
        latestRecord[fieldCode].value = value;
        updateScores({ record: latestRecord });
        setTimeout(() => {
          kintone.app.record.set({ record: latestRecord });
        }, 0);
      };

      if (typeof dropdown.on === 'function') {
        dropdown.on('change', handleChange);
      } else if (typeof dropdown.addEventListener === 'function') {
        dropdown.addEventListener('change', handleChange);
      } else {
        console.warn('KUC Dropdown イベント API が見つかりません', dropdown);
      }

      if (dropdown instanceof Node) {
        wrapper.appendChild(dropdown);
      } else if (typeof dropdown.render === 'function') {
        const rendered = dropdown.render();
        if (rendered instanceof Node) {
          wrapper.appendChild(rendered);
        } else if (typeof dropdown.appendTo === 'function') {
          dropdown.appendTo(wrapper);
        } else {
          console.error('KUC Dropdown を DOM に追加できませんでした', dropdown);
        }
      } else if (typeof dropdown.appendTo === 'function') {
        dropdown.appendTo(wrapper);
      } else {
        console.error('KUC Dropdown を DOM に追加できませんでした', dropdown);
      }
      container.appendChild(wrapper);

      favoriteDropdowns.push({
        fieldCode,
        dropdown
      });
    });
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

    // 標準のドロップダウンフィールドは非表示にしてカスタムUIを使用
    FAVORITE_FIELDS.forEach(fieldCode => {
      kintone.app.record.setFieldShown(fieldCode, false);
    });

    // スコアフィールドはユーザー編集不可にする
    SCORE_FIELDS.forEach(fieldCode => {
      if (record[fieldCode]) {
        record[fieldCode].disabled = true;
      }
    });

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
  kintone.events.on('app.record.create.change.q1', handleQuestionChange);
  kintone.events.on('app.record.edit.change.q1', handleQuestionChange);

  // Q2〜Q40の変更イベントを一括登録
  for (let i = 2; i <= 40; i++) {
    const fieldCode = 'q' + i;
    kintone.events.on('app.record.create.change.' + fieldCode, handleQuestionChange);
    kintone.events.on('app.record.edit.change.' + fieldCode, handleQuestionChange);
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
        updateScores({ record });
        // 画面を更新して選択肢を反映
        kintone.app.record.set(event);
      }
    }

    return event;
  }

  /**
   * お気に入り選択セクションを表示
   */
  function showFavoritesSection(record, container) {
    const scores = getQuestionScores(record);
    const selectionInfo = getFavoriteSelectionInfo(scores);
    const candidates = selectionInfo.candidates;

    // 選択肢を作成
    const options = candidates.map(q => {
      const question = QUESTION_MAP[q.id];
      return {
        label: `Q${q.id}: ${question.text} (${q.score}点)`,
        value: 'Q' + q.id
      };
    });

    const forcedNotice = selectionInfo.forcedQuestionIds.length
      ? `
        <div class="favorites-note warning">
          最高点の ${formatQuestionLabels(selectionInfo.forcedQuestionIds)} は必ず選択してください。
        </div>
      `
      : '';

    container.innerHTML = `
      <div class="favorites-section">
        <h3>お気に入り選択</h3>
        <p class="favorites-instruction">
          最高点の質問から順に候補が表示されます。3つすべて選ぶと、選択した質問に+4点のボーナスが付与されます。
        </p>
        <div class="favorites-note">
          <strong>選択可能な質問:</strong> 最高点の質問（不足分があれば次点まで）に限定されます。
        </div>
        ${forcedNotice}
      </div>
    `;

    const allowedValues = new Set(options.map(opt => opt.value));
    const dropdownOptionMap = options.reduce((map, opt) => {
      map[opt.value] = { label: opt.label, value: opt.value };
      return map;
    }, { '': { label: '選択してください', value: '' } });

    FAVORITE_FIELDS.forEach(fieldCode => {
      const field = record[fieldCode];
      if (!field) {
        return;
      }

      if (field.options) {
        field.options = dropdownOptionMap;
      }

      if (field.value && !allowedValues.has(field.value)) {
        field.value = '';
      }
    });

    const dropdownContainer = document.createElement('div');
    dropdownContainer.className = 'favorites-dropdowns';
    container.appendChild(dropdownContainer);

    renderFavoriteDropdowns(record, options, dropdownContainer);
  }

  /**
   * お気に入り選択変更時
   */
  kintone.events.on([
    'app.record.create.change.favorite_1',
    'app.record.create.change.favorite_2',
    'app.record.create.change.favorite_3',
    'app.record.edit.change.favorite_1',
    'app.record.edit.change.favorite_2',
    'app.record.edit.change.favorite_3'
  ], function(event) {
    updateScores(event);
    return event;
  });

  /**
   * 保存前処理（スコア計算と判定）
   */
  kintone.events.on(['app.record.create.submit', 'app.record.edit.submit'], function(event) {
    updateScores(event, { enforceFavorites: true });
    return event;
  });

  /**
   * スコア更新処理
   */
  function updateScores(event, options = {}) {
    const record = event.record;

    // すべて回答済みでない場合はスキップ
    if (!areAllQuestionsAnswered(record)) {
      return;
    }

    const scores = getQuestionScores(record);
    const selectionInfo = getFavoriteSelectionInfo(scores);
    const validation = validateFavoriteSelections(record, selectionInfo);
    const baseTypeScores = calculateTypeScores(scores, []);
    let finalTypeScores = baseTypeScores;

    if (validation.status === 'valid') {
      finalTypeScores = calculateTypeScores(scores, validation.selectedIds);
    } else if (options.enforceFavorites) {
      event.error = validation.message;
    }

    // スコアフィールドを更新
    updateNumericField(record, 'score_tf', finalTypeScores.TF);
    updateNumericField(record, 'score_gm', finalTypeScores.GM);
    updateNumericField(record, 'score_au', finalTypeScores.AU);
    updateNumericField(record, 'score_se', finalTypeScores.SE);
    updateNumericField(record, 'score_ec', finalTypeScores.EC);
    updateNumericField(record, 'score_sv', finalTypeScores.SV);
    updateNumericField(record, 'score_ch', finalTypeScores.CH);
    updateNumericField(record, 'score_ls', finalTypeScores.LS);

    // キャリアタイプ判定
    const careerTypeResult = determineCareerType(finalTypeScores);
    record.career_type_result.value = careerTypeResult;
  }

  /**
   * スコアフィールドに安全に値を設定
   */
  function updateNumericField(record, fieldCode, value) {
    const field = record[fieldCode];
    if (!field) {
      return;
    }
    field.value = value;
  }

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
