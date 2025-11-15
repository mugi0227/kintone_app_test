/// <reference path="../../formbridge-javascript-customize.d.ts" />
/* global formBridge, Chart */
(function () {
  'use strict';

  /**
   * 基本設定
   */
  const DEBUG_SHOW_NATIVE_FORM = false; // true にすると標準フォームを表示（デバッグ用）
  const ALWAYS_VISIBLE_FIELD_CODES = ['name', 'diagnosis_date']; // 標準フォーム側で残すフィールドコード

  const FORM_BODY_SELECTORS = [
    '.fb-custom--fields-area',
    '[data-formbridge-role="form.body"]',
    '[data-formbridge-role="form-body"]',
    '[data-fb-form-body]',
    '.fb-custom--content--form',
    '.fb-custom--main form',
    '.fb-custom--form form',
    'form',
  ];

  const FAVORITE_FIELD_CODES = ['favorite_1', 'favorite_2', 'favorite_3'];
  const SCORE_FIELD_MAP = {
    tf: 'score_tf',
    gm: 'score_gm',
    au: 'score_au',
    se: 'score_se',
    ec: 'score_ec',
    sv: 'score_sv',
    ch: 'score_ch',
    ls: 'score_ls',
  };
  const RESULT_TEXT_FIELD_CODE = 'career_type_result';

  const CAREER_ANCHORS = {
    tf: {
      label: '専門・職能別能力 (TF)',
      description: '専門知識やスキルを磨き続け、その道の第一人者として評価されたいタイプです。',
    },
    gm: {
      label: '全般管理能力 (GM)',
      description: '組織全体を動かし、マネジメント視点で意思決定することに価値を感じます。',
    },
    au: {
      label: '自律・独立 (AU)',
      description: '自分の判断で働き方をデザインし、裁量が大きい環境を求めます。',
    },
    se: {
      label: '保障・安定 (SE)',
      description: '長期的な安定や福利厚生を重視し、安心できる環境で力を発揮します。',
    },
    ec: {
      label: '起業家的創造性 (EC)',
      description: 'ビジネスを創り出し、リスクを取って新たな価値を生み出すことに挑みます。',
    },
    sv: {
      label: '奉仕・社会貢献 (SV)',
      description: '社会課題の解決や他者支援を通じて貢献することに喜びを感じます。',
    },
    ch: {
      label: '純粋な挑戦 (CH)',
      description: '難易度の高い目標や激しい競争の中で自らを試すことを好みます。',
    },
    ls: {
      label: '生活様式 (LS)',
      description: '仕事と生活の調和を大切にし、自分らしいライフデザインを優先します。',
    },
  };

  const QUESTIONS = [
    { id: 1, code: 'q1', text: '専門分野で高い評価を得たい', anchor: 'tf' },
    { id: 2, code: 'q2', text: '組織全体を統括して意思決定したい', anchor: 'gm' },
    { id: 3, code: 'q3', text: '自分の判断で柔軟に仕事を進めたい', anchor: 'au' },
    { id: 4, code: 'q4', text: '安定した雇用と生活を最優先したい', anchor: 'se' },
    { id: 5, code: 'q5', text: '新しいビジネスを立ち上げたい', anchor: 'ec' },
    { id: 6, code: 'q6', text: '社会や人の役に立つ仕事をしたい', anchor: 'sv' },
    { id: 7, code: 'q7', text: '難題を解決することにやりがいを感じる', anchor: 'ch' },
    { id: 8, code: 'q8', text: '仕事と私生活のバランスを大切にしたい', anchor: 'ls' },
    { id: 9, code: 'q9', text: '専門知識を深める勉強を続けたい', anchor: 'tf' },
    { id: 10, code: 'q10', text: '大きなチームを率いる役割に挑戦したい', anchor: 'gm' },
    { id: 11, code: 'q11', text: '働く場所や時間を自分で選びたい', anchor: 'au' },
    { id: 12, code: 'q12', text: '長期的に安心できる会社で働きたい', anchor: 'se' },
    { id: 13, code: 'q13', text: 'アイデアを形にして価値を生みたい', anchor: 'ec' },
    { id: 14, code: 'q14', text: '困っている人を支えることにやりがいを感じる', anchor: 'sv' },
    { id: 15, code: 'q15', text: '競争が激しい環境で力を試したい', anchor: 'ch' },
    { id: 16, code: 'q16', text: '家族や趣味の時間を意識的に作りたい', anchor: 'ls' },
    { id: 17, code: 'q17', text: '専門家として周囲に頼られる存在になりたい', anchor: 'tf' },
    { id: 18, code: 'q18', text: '経営視点で組織の方向性を決めたい', anchor: 'gm' },
    { id: 19, code: 'q19', text: '裁量の大きい環境で働きたい', anchor: 'au' },
    { id: 20, code: 'q20', text: '福利厚生が充実した会社で働きたい', anchor: 'se' },
    { id: 21, code: 'q21', text: 'リスクを取って大きな成果を狙いたい', anchor: 'ec' },
    { id: 22, code: 'q22', text: '社会課題の解決に貢献したい', anchor: 'sv' },
    { id: 23, code: 'q23', text: '不可能と言われることにも挑みたい', anchor: 'ch' },
    { id: 24, code: 'q24', text: '趣味や学びの時間を意識的に確保したい', anchor: 'ls' },
    { id: 25, code: 'q25', text: '専門領域で実績を積み重ねたい', anchor: 'tf' },
    { id: 26, code: 'q26', text: '会社の戦略立案に深く関わりたい', anchor: 'gm' },
    { id: 27, code: 'q27', text: 'フリーランスのような働き方に憧れる', anchor: 'au' },
    { id: 28, code: 'q28', text: '定年まで同じ会社で安心して働きたい', anchor: 'se' },
    { id: 29, code: 'q29', text: '自分の企画でビジネスを成功させたい', anchor: 'ec' },
    { id: 30, code: 'q30', text: '次世代のために良い社会を残したい', anchor: 'sv' },
    { id: 31, code: 'q31', text: '高い目標に挑戦し続けたい', anchor: 'ch' },
    { id: 32, code: 'q32', text: '働く場所や時間を柔軟に選びたい', anchor: 'ls' },
    { id: 33, code: 'q33', text: '専門家として第一人者になりたい', anchor: 'tf' },
    { id: 34, code: 'q34', text: '複数部門をまとめるリーダーに挑戦したい', anchor: 'gm' },
    { id: 35, code: 'q35', text: '上司の指示より自分の判断を優先したい', anchor: 'au' },
    { id: 36, code: 'q36', text: '退職金や年金制度が整った会社で安心したい', anchor: 'se' },
    { id: 37, code: 'q37', text: '新しい市場や機会を開拓したい', anchor: 'ec' },
    { id: 38, code: 'q38', text: '弱い立場の人を支援したい', anchor: 'sv' },
    { id: 39, code: 'q39', text: '高いハードルを乗り越えることで成長したい', anchor: 'ch' },
    { id: 40, code: 'q40', text: '仕事以外の人間関係も大切にしたい', anchor: 'ls' },
  ];

  const TOTAL_QUESTIONS = QUESTIONS.length;
  const QUESTION_MAP = QUESTIONS.reduce((acc, q) => acc.set(q.code, q), new Map());

  /**
   * 状態
   */
  const state = {
    currentStep: 1,
    answers: {},
    favorites: [],
    lockedFavorites: new Set(),
    chart: null,
  };
  let fbContext = null;
  let isTransitioning = false;

  /**
   * イベント登録
   */
  formBridge.events.on('form.show', (context) => {
    fbContext = context;
    const record = formBridge.fn.getRecord();
    clearInitialRadioSelections(record);
    hydrateState(record);

    const mount = prepareMountPoint();
    if (!mount) {
      console.error('FormBridge のフォーム本体が見つからず、カスタムUIを描画できません。');
      return context;
    }

    mount.innerHTML = '';
    renderLayout(mount);
    syncQuestionUI();
    updateNavigationButtons();
    return context;
  });

  formBridge.events.on('form.submit', (context) => {
    if (state.favorites.length !== 3) {
      alert('お気に入りの質問を3つ選択してください。');
      context.preventDefault();
      return context;
    }

    const scores = calculateScores();
    persistScores(scores);
    fbContext.setFieldValue(RESULT_TEXT_FIELD_CODE, buildResultText(scores));
    return context;
  });

  /**
   * レイアウト
   */
  function renderLayout(mount) {
    const container = document.createElement('div');
    container.className = 'career-anchor-container';
    container.innerHTML = `
      <div class="rpg-banner">
        <div class="rpg-banner__title">CAREER ANCHOR QUEST</div>
        <p class="rpg-banner__subtitle">勇者よ、己の価値観を見つける旅へ出発しよう！</p>
      </div>
      <section id="question-stage">
        <div id="questions-wrapper"></div>
        <div class="navigation-controls">
          <button type="button" class="nav-btn" id="prev-btn">戻る</button>
          <button type="button" class="nav-btn" id="next-btn">次へ</button>
          <button type="button" class="nav-btn hidden" id="goto-favorite-btn">お気に入り選択へ</button>
        </div>
      </section>
      <section id="favorite-stage" class="hidden">
        <h2>お気に入りの質問を3つ選択</h2>
        <p class="favorite-stage__description">
          もっとも高い点数を付けた質問が優先的に選ばれます。選んだ質問には +4 点のボーナスが加算されます。
        </p>
        <div id="favorite-candidate-list" class="favorite-questions-grid"></div>
        <div class="favorite-stage__actions">
          <button type="button" class="nav-btn" id="back-to-questions-btn">質問に戻る</button>
          <button type="button" class="nav-btn primary" id="confirm-favorites-btn" disabled>結果を表示する</button>
        </div>
      </section>
      <section id="result-stage" class="hidden">
        <h2>診断結果</h2>
        <div class="results-columns">
          <div class="results-column" id="score-summary-column">
            <div class="result-highlight" id="career-type-highlight">
              <div class="result-highlight-title">あなたのキャリアタイプ</div>
              <div class="result-highlight-value">お気に入り選択後に表示します</div>
              <p class="result-highlight-description">質問に回答し、お気に入りを3つ選んでください。</p>
            </div>
            <div class="score-cards" id="score-cards-grid"></div>
          </div>
          <div class="results-column" id="score-chart-column">
            <div id="radar-chart-container">
              <canvas id="fbRadarChart"></canvas>
            </div>
          </div>
        </div>
      </section>
    `;

    mount.appendChild(container);
    injectQuestionCards(container.querySelector('#questions-wrapper'));

    document.getElementById('prev-btn').addEventListener('click', () => navigateStep(-1));
    document.getElementById('next-btn').addEventListener('click', () => navigateStep(1));
    document.getElementById('goto-favorite-btn').addEventListener('click', showFavoriteStage);
    document.getElementById('back-to-questions-btn').addEventListener('click', showQuestionStage);
    document
      .getElementById('confirm-favorites-btn')
      .addEventListener('click', confirmFavoritesAndShowResults);
  }

  function injectQuestionCards(wrapper) {
    const labels = [
      '1: 全く当てはまらない',
      '2: あまり当てはまらない',
      '3: どちらともいえない',
      '4: やや当てはまる',
      '5: 非常に当てはまる',
    ];

    const cards = QUESTIONS.map((question, index) => {
      const buttons = labels
        .map(
          (label, idx) => `
            <button type="button" class="answer-btn" data-q-code="${question.code}" data-value="${idx + 1}">
              ${idx + 1}
              <span class="answer-label">${label}</span>
            </button>
          `
        )
        .join('');

      return `
        <div class="question-card" id="card-${question.code}">
          <div class="question-step">質問 ${index + 1} / ${TOTAL_QUESTIONS}</div>
          <div class="question-text">${question.text}</div>
          <div class="answer-buttons">${buttons}</div>
        </div>
      `;
    });

    wrapper.innerHTML = cards.join('');
    wrapper.querySelectorAll('.answer-btn').forEach((btn) => btn.addEventListener('click', handleAnswerClick));
  }

  /**
   * ステージ制御
   */
  function showQuestionStage() {
    document.getElementById('question-stage').classList.remove('hidden');
    document.getElementById('favorite-stage').classList.add('hidden');
    document.getElementById('result-stage').classList.add('hidden');
    updateNavigationButtons();
  }

  function showFavoriteStage() {
    const missing = getUnansweredQuestionLabels();
    if (missing.length) {
      alert(`未回答の質問があります。\n${missing.join(', ')}`);
      return;
    }

    document.getElementById('question-stage').classList.add('hidden');
    document.getElementById('favorite-stage').classList.remove('hidden');
    document.getElementById('result-stage').classList.add('hidden');

    renderFavoriteCandidates();
    updateFavoriteFields();
    updateFavoriteConfirmState();
  }

  function confirmFavoritesAndShowResults() {
    if (state.favorites.length !== 3) {
      alert('お気に入りは3つ必要です。');
      return;
    }

    document.getElementById('question-stage').classList.add('hidden');
    document.getElementById('favorite-stage').classList.add('hidden');
    const resultStage = document.getElementById('result-stage');
    resultStage.classList.remove('hidden');
    resultStage.classList.add('result-stage-hidden');
    setTimeout(() => {
      resultStage.classList.remove('result-stage-hidden');
      resultStage.classList.add('result-stage-enter');
      setTimeout(() => resultStage.classList.remove('result-stage-enter'), 1800);
    }, 200);

    const scores = calculateScores();
    persistScores(scores);
    fbContext.setFieldValue(RESULT_TEXT_FIELD_CODE, buildResultText(scores));

    renderScoreCards(scores);
    renderRadarChart(scores);
    renderCareerTypeHighlight(scores);
  }

  /**
   * 質問操作
   */
  function handleAnswerClick(event) {
    const button = event.currentTarget;
    const qCode = button.dataset.qCode;
    const value = Number(button.dataset.value);

    state.answers[qCode] = value;
    fbContext.setFieldValue(qCode, String(value));

    const card = button.closest('.question-card');
    card.querySelectorAll('.answer-btn').forEach((btn) => btn.classList.remove('selected'));
    button.classList.add('selected');

    setTimeout(() => navigateStep(1), 200);
    updateNavigationButtons();
  }

  function navigateStep(direction) {
    if (isTransitioning) {
      return;
    }

    const next = state.currentStep + direction;
    if (next < 1 || next > TOTAL_QUESTIONS) {
      return;
    }

    const currentCard = document.getElementById(`card-q${state.currentStep}`);
    const targetCard = document.getElementById(`card-q${next}`);
    if (currentCard && targetCard) {
      isTransitioning = true;
      currentCard.classList.add('slide-out');
      targetCard.classList.add(direction > 0 ? 'slide-in-right' : 'slide-in-left');
      setTimeout(() => {
        currentCard.classList.remove('slide-out');
        targetCard.classList.remove('slide-in-right', 'slide-in-left');
        isTransitioning = false;
      }, 350);
    }
    if (!currentCard || !targetCard) {
      isTransitioning = false;
    }
    state.currentStep = next;
    syncQuestionUI();
    updateNavigationButtons();
  }

  function syncQuestionUI() {
    document.querySelectorAll('.question-card').forEach((card) => card.classList.remove('active'));
    const currentQuestion = document.getElementById(`card-q${state.currentStep}`);
    if (currentQuestion) {
      currentQuestion.classList.add('active');
    }

    Object.entries(state.answers).forEach(([code, value]) => {
      const card = document.getElementById(`card-${code}`);
      if (!card) return;
      card
        .querySelectorAll('.answer-btn')
        .forEach((btn) => btn.classList.toggle('selected', Number(btn.dataset.value) === value));
    });
  }

  function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const favoriteBtn = document.getElementById('goto-favorite-btn');

    if (!prevBtn || !nextBtn || !favoriteBtn) return;

    prevBtn.disabled = state.currentStep === 1;
    const answeredAll = Object.keys(state.answers).length === TOTAL_QUESTIONS;
    const missing = answeredAll ? [] : getUnansweredQuestionLabels();

    if (state.currentStep === TOTAL_QUESTIONS) {
      nextBtn.classList.add('hidden');
      favoriteBtn.classList.remove('hidden');
      favoriteBtn.disabled = !answeredAll;
      if (answeredAll) {
        favoriteBtn.textContent = 'お気に入り選択へ';
      } else {
        const preview = missing.slice(0, 6).join(', ');
        favoriteBtn.textContent = `未回答: ${preview}${missing.length > 6 ? '…' : ''}`;
      }
    } else {
      nextBtn.classList.remove('hidden');
      favoriteBtn.classList.add('hidden');
      favoriteBtn.disabled = true;
      favoriteBtn.textContent = 'お気に入り選択へ';
    }
  }

  /**
   * お気に入り選択
   */
  function renderFavoriteCandidates() {
    const wrapper = document.getElementById('favorite-candidate-list');
    if (!wrapper) return;

    const candidateResult = getFavoriteCandidates();
    const candidates = candidateResult.candidates;
    if (!candidates.length) {
      wrapper.innerHTML = '<p class="favorite-stage__notice">まだ回答が不足しているため候補を表示できません。</p>';
      return;
    }

    state.lockedFavorites.clear();
    if (candidateResult.highestCount < 3) {
      candidates.forEach((entry) => {
        if (entry.score === candidateResult.highestScore) {
          state.lockedFavorites.add(entry.code);
        }
      });
      state.favorites = Array.from(new Set([...state.lockedFavorites, ...state.favorites])).slice(0, 3);
    } else {
      const validCodes = new Set(candidates.map((entry) => entry.code));
      state.favorites = state.favorites.filter((code) => validCodes.has(code)).slice(0, 3);
    }
    updateFavoriteFields();

    const cards = candidates
      .map((entry) => {
        const isLocked = state.lockedFavorites.has(entry.code);
        const isSelected = state.favorites.includes(entry.code);
        const classes = [
          'favorite-question-card',
          isSelected ? 'favorite-question-card--selected' : '',
          isLocked ? 'favorite-question-card--locked' : '',
        ].join(' ');

        return `
          <button
            type="button"
            class="${classes}"
            data-code="${entry.code}"
            data-locked="${isLocked}"
          >
            <div class="favorite-question-card__meta">
              <span>Q${entry.id}</span>
              <span>${entry.score} 点</span>
            </div>
            <div class="favorite-question-card__text">${entry.text}</div>
            ${
              isLocked
                ? '<div class="favorite-question-card__badge">最高点のため固定</div>'
                : '<div class="favorite-question-card__badge">選択可能</div>'
            }
          </button>
        `;
      })
      .join('');

    wrapper.innerHTML = cards;
    wrapper.querySelectorAll('.favorite-question-card').forEach((card) => {
      card.addEventListener('click', handleFavoriteCardClick);
    });

    updateFavoriteConfirmState();
  }

  function handleFavoriteCardClick(event) {
    const card = event.currentTarget;
    const code = card.dataset.code;
    const locked = card.dataset.locked === 'true';
    if (locked) {
      return;
    }

    const index = state.favorites.indexOf(code);
    if (index > -1) {
      state.favorites.splice(index, 1);
    } else if (state.favorites.length < 3) {
      state.favorites.push(code);
    } else {
      alert('お気に入りは3つまでです。');
      return;
    }

    updateFavoriteFields();
    renderFavoriteCandidates();
  }

  function updateFavoriteFields() {
    FAVORITE_FIELD_CODES.forEach((fieldCode, idx) => {
      const qCode = state.favorites[idx];
      if (!qCode) {
        fbContext.setFieldValue(fieldCode, '');
        return;
      }
      const question = QUESTION_MAP.get(qCode);
      const label = question ? `Q${question.id}` : qCode;
      fbContext.setFieldValue(fieldCode, label);
    });
  }

  function updateFavoriteConfirmState() {
    const button = document.getElementById('confirm-favorites-btn');
    if (!button) return;
    button.disabled = state.favorites.length !== 3;
  }

  function getFavoriteCandidates() {
    const answered = QUESTIONS.map((question) => ({
      ...question,
      score: state.answers[question.code] || 0,
    })).filter((entry) => entry.score > 0);

    if (!answered.length) {
      return { candidates: [], highestScore: 0, highestCount: 0 };
    }

    answered.sort((a, b) => {
      if (b.score === a.score) {
        return a.id - b.id;
      }
      return b.score - a.score;
    });

    const highestScore = answered[0].score;
    let highestCount = 0;

    const candidates = [];
    let limitScore = null;

    for (const entry of answered) {
      if (entry.score === highestScore) {
        highestCount += 1;
      }

      if (candidates.length < 3) {
        candidates.push(entry);
        limitScore = entry.score;
        continue;
      }

      if (entry.score === limitScore) {
        candidates.push(entry);
      } else {
        break;
      }
    }

    return {
      candidates,
      highestScore,
      highestCount,
    };
  }

  /**
   * スコア計算・描画
   */
  function calculateScores() {
    const totals = Object.keys(CAREER_ANCHORS).reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {});

    QUESTIONS.forEach((question) => {
      totals[question.anchor] += state.answers[question.code] || 0;
    });

    state.favorites.forEach((code) => {
      const question = QUESTION_MAP.get(code);
      if (question) {
        totals[question.anchor] += 4;
      }
    });

    return totals;
  }

  function renderScoreCards(scores) {
    const grid = document.getElementById('score-cards-grid');
    if (!grid) return;
    grid.innerHTML = '';

    Object.entries(scores).forEach(([key, value]) => {
      const card = document.createElement('div');
      card.className = 'score-card';
      card.innerHTML = `
        <div class="score-card-title">${CAREER_ANCHORS[key].label}</div>
        <div class="score-card-value">${value}</div>
      `;
      grid.appendChild(card);
    });
  }

  function renderRadarChart(scores) {
    const canvas = document.getElementById('fbRadarChart');
    if (!canvas || typeof Chart === 'undefined') {
      if (typeof Chart === 'undefined') {
        console.error('Chart.js が読み込まれていません。');
      }
      return;
    }

    const ctx = canvas.getContext('2d');
    const labels = Object.values(CAREER_ANCHORS).map((anchor) => anchor.label);
    const data = Object.keys(CAREER_ANCHORS).map((key) => scores[key] || 0);

    if (state.chart) {
      state.chart.destroy();
    }

    state.chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels,
        datasets: [
          {
            label: '診断スコア',
            data,
            fill: true,
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            borderColor: '#007bff',
            pointBackgroundColor: '#007bff',
            pointBorderColor: '#fff',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            suggestedMin: 0,
            suggestedMax: 25,
            ticks: { stepSize: 5 },
          },
        },
        plugins: {
          legend: { display: false },
        },
      },
    });
  }

  function renderCareerTypeHighlight(scores) {
    const highlight = document.getElementById('career-type-highlight');
    if (!highlight) return;

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    if (!sorted.length) return;

    const [topKey, topScore] = sorted[0];
    const info = CAREER_ANCHORS[topKey];

    highlight.querySelector('.result-highlight-value').textContent = `${info.label}（${topScore}点）`;
    const description = highlight.querySelector('.result-highlight-description');
    if (description) {
      description.textContent = info.description;
    }
  }

  function persistScores(scores) {
    Object.entries(scores).forEach(([key, value]) => {
      const fieldCode = SCORE_FIELD_MAP[key];
      if (fieldCode) {
        fbContext.setFieldValue(fieldCode, value);
      }
    });
  }

  function buildResultText(scores) {
    const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a);
    if (!sorted.length) {
      return '';
    }
    const [topKey] = sorted[0];
    const info = CAREER_ANCHORS[topKey];
    return `${info.label}\n${info.description}`;
  }

  /**
   * 状態読み込み
   */
  function hydrateState(record) {
    state.currentStep = 1;
    state.answers = {};
    state.favorites = [];
    state.lockedFavorites.clear();

    QUESTIONS.forEach((question) => {
      const raw = record?.[question.code]?.value;
      const numeric = Number(raw);
      if (!Number.isNaN(numeric) && numeric > 0) {
        state.answers[question.code] = numeric;
      }
    });

    FAVORITE_FIELD_CODES.forEach((fieldCode) => {
      const raw = record?.[fieldCode]?.value;
      if (typeof raw !== 'string') return;
      const match = raw.match(/Q(\d{1,2})/);
      if (!match) return;
      const id = Number(match[1]);
      const question = QUESTIONS.find((q) => q.id === id);
      if (question) {
        state.favorites.push(question.code);
      }
    });

    state.favorites = state.favorites.slice(0, 3);
  }

  function clearInitialRadioSelections(record) {
    if (!isNewRecord(record)) {
      return;
    }
    QUESTIONS.forEach(({ code }) => {
      if (record?.[code]) {
        fbContext.setFieldValue(code, '');
        record[code].value = '';
      }
    });
  }

  function getUnansweredQuestionLabels() {
    return QUESTIONS.filter((question) => !state.answers[question.code])
      .map((question) => `Q${question.id}`);
  }

  function isNewRecord(record) {
    const idField = record?.$id;
    if (!idField) {
      return true;
    }
    const value = typeof idField.value === 'string' ? idField.value.trim() : idField.value;
    return !value;
  }

  /**
   * マウントポイント
   */
  function prepareMountPoint() {
    const nativeBody = findNativeFormBody();
    if (!nativeBody) {
      return null;
    }

    adjustNativeFormVisibility(nativeBody);

    let container = document.getElementById('career-anchor-formbridge-root');
    if (!container) {
      container = document.createElement('div');
      container.id = 'career-anchor-formbridge-root';
      container.className = 'career-anchor-host';
      if (nativeBody.nextSibling) {
        nativeBody.parentNode.insertBefore(container, nativeBody.nextSibling);
      } else {
        nativeBody.parentNode.appendChild(container);
      }
    }

    return container;
  }

  function findNativeFormBody() {
    for (const selector of FORM_BODY_SELECTORS) {
      const element = document.querySelector(selector);
      if (element) {
        return element;
      }
    }
    return null;
  }

  function adjustNativeFormVisibility(nativeBody) {
    if (DEBUG_SHOW_NATIVE_FORM) {
      nativeBody.style.display = '';
      nativeBody.querySelectorAll('.fb-custom--field').forEach((field) => {
        field.style.display = '';
      });
      return;
    }

    nativeBody.style.display = '';
    nativeBody.classList.add('career-anchor-native-wrapper');

    nativeBody.querySelectorAll('.fb-custom--field').forEach((field) => {
      const code = field.getAttribute('data-field-code');
      const keepVisible = ALWAYS_VISIBLE_FIELD_CODES.includes(code);
      field.style.display = keepVisible ? '' : 'none';
    });
  }
})();
