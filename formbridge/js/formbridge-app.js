/// <reference path="../formbridge-javascript-customize.d.ts" />
(function() {
  'use strict';

  const QUESTIONS = [
    { id: 1, code: 'q1', text: '専門分野で高い評価を得たい', type: 'TF' },
    { id: 2, code: 'q2', text: '組織全体を統括して意思決定したい', type: 'GM' },
    { id: 3, code: 'q3', text: '自分の判断で柔軟に仕事を進めたい', type: 'AU' },
    { id: 4, code: 'q4', text: '安定した雇用と生活を最優先したい', type: 'SE' },
    { id: 5, code: 'q5', text: '新しいビジネスを立ち上げたい', type: 'EC' },
    { id: 6, code: 'q6', text: '社会や人の役に立つ仕事をしたい', type: 'SV' },
    { id: 7, code: 'q7', text: '難題を解決することにやりがいを感じる', type: 'CH' },
    { id: 8, code: 'q8', text: '仕事と私生活のバランスを大切にしたい', type: 'LS' },
    { id: 9, code: 'q9', text: '専門知識を深める勉強を続けたい', type: 'TF' },
    { id: 10, code: 'q10', text: '大きなチームを率いる役割に挑戦したい', type: 'GM' },
    { id: 11, code: 'q11', text: '働く場所や時間を自分で選びたい', type: 'AU' },
    { id: 12, code: 'q12', text: '長期的に安心できる会社で働きたい', type: 'SE' },
    { id: 13, code: 'q13', text: 'アイデアを形にして価値を生みたい', type: 'EC' },
    { id: 14, code: 'q14', text: '困っている人を支えることにやりがいを感じる', type: 'SV' },
    { id: 15, code: 'q15', text: '競争が激しい環境で力を試したい', type: 'CH' },
    { id: 16, code: 'q16', text: '家族や趣味の時間を意識的に作りたい', type: 'LS' },
    { id: 17, code: 'q17', text: '専門家として周囲に頼られる存在になりたい', type: 'TF' },
    { id: 18, code: 'q18', text: '経営視点で組織の方向性を決めたい', type: 'GM' },
    { id: 19, code: 'q19', text: '裁量の大きい環境で働きたい', type: 'AU' },
    { id: 20, code: 'q20', text: '福利厚生が充実した会社で働きたい', type: 'SE' },
    { id: 21, code: 'q21', text: 'リスクを取って大きな成果を狙いたい', type: 'EC' },
    { id: 22, code: 'q22', text: '社会課題の解決に貢献したい', type: 'SV' },
    { id: 23, code: 'q23', text: '不可能と言われることにも挑みたい', type: 'CH' },
    { id: 24, code: 'q24', text: '趣味や学びの時間を意識的に確保したい', type: 'LS' },
    { id: 25, code: 'q25', text: '専門領域で実績を積み重ねたい', type: 'TF' },
    { id: 26, code: 'q26', text: '会社の戦略立案に深く関わりたい', type: 'GM' },
    { id: 27, code: 'q27', text: 'フリーランスのような働き方に憧れる', type: 'AU' },
    { id: 28, code: 'q28', text: '定年まで同じ会社で安心して働きたい', type: 'SE' },
    { id: 29, code: 'q29', text: '自分の企画でビジネスを成功させたい', type: 'EC' },
    { id: 30, code: 'q30', text: '次世代のために良い社会を残したい', type: 'SV' },
    { id: 31, code: 'q31', text: '高い目標に挑戦し続けたい', type: 'CH' },
    { id: 32, code: 'q32', text: '働く場所や時間を柔軟に選びたい', type: 'LS' },
    { id: 33, code: 'q33', text: '専門家として第一人者になりたい', type: 'TF' },
    { id: 34, code: 'q34', text: '複数部門をまとめるリーダーに挑戦したい', type: 'GM' },
    { id: 35, code: 'q35', text: '上司の指示より自分の判断を優先したい', type: 'AU' },
    { id: 36, code: 'q36', text: '退職金や年金制度が整った会社で安心したい', type: 'SE' },
    { id: 37, code: 'q37', text: '新しい市場や機会を開拓したい', type: 'EC' },
    { id: 38, code: 'q38', text: '弱い立場の人を支援したい', type: 'SV' },
    { id: 39, code: 'q39', text: '高いハードルを乗り越えることで成長したい', type: 'CH' },
    { id: 40, code: 'q40', text: '仕事以外の人間関係も大切にしたい', type: 'LS' }
  ];

  const TYPE_LABELS = {
    TF: '専門・職能別コンピテンシー',
    GM: '全般管理コンピテンシー',
    AU: '自律・独立志向',
    SE: '保障・安定志向',
    EC: '起業家・創造志向',
    SV: '奉仕・社会貢献志向',
    CH: '純粋な挑戦志向',
    LS: '生活様式志向'
  };

  const FAVORITE_FIELDS = ['favorite_1', 'favorite_2', 'favorite_3'];
  const SCORE_FIELD_MAP = {
    TF: 'score_tf',
    GM: 'score_gm',
    AU: 'score_au',
    SE: 'score_se',
    EC: 'score_ec',
    SV: 'score_sv',
    CH: 'score_ch',
    LS: 'score_ls'
  };

  const FORM_BODY_SELECTORS = [
    '[data-fb-form-body]',
    '.fb-form__body',
    'form'
  ];

  const STATE = { index: 0, answers: {}, favorites: [] };
  let context = null;

  function waitForFormBridge() {
    if (window.formBridge && window.formBridge.events) {
      formBridge.events.on('form.show', event => {
        context = event;
        renderQuiz();
        return event;
      });
      return;
    }
    setTimeout(waitForFormBridge, 50);
  }

  function renderQuiz() {
    const host = ensureContainer();
    if (!host) {
      return;
    }

    STATE.index = 0;
    STATE.answers = {};
    STATE.favorites = [];

    QUESTIONS.forEach(question => setFieldValue(question.code, ''));
    FAVORITE_FIELDS.forEach(field => setFieldValue(field, ''));
    Object.values(SCORE_FIELD_MAP).forEach(field => setFieldValue(field, 0));
    setFieldValue('career_type_result', '');

    host.innerHTML = '';
    const card = buildQuestionCard();
    card.id = 'fb-card';
    host.appendChild(card);
    updateQuestionCard(card);
  }

  function ensureContainer() {
    hideNativeForm();
    let body = null;
    for (const selector of FORM_BODY_SELECTORS) {
      body = document.querySelector(selector);
      if (body) {
        break;
      }
    }
    if (!body) {
      return null;
    }

    body.style.display = 'none';

    let container = document.getElementById('formbridge-app');
    if (!container) {
      container = document.createElement('div');
      container.id = 'formbridge-app';
      body.parentNode.insertBefore(container, body);
    }
    return container;
  }

  function hideNativeForm() {
    const selectors = [
      '[data-fb-field-code]',
      '.fb-form__item',
      '.fb-field'
    ];
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(node => {
        node.style.display = 'none';
      });
    });
  }

  function buildQuestionCard() {
    const card = document.createElement('div');
    card.className = 'fb-card';
    card.innerHTML = `
      <div class="fb-card__progress">
        <span class="fb-card__step"></span>
        <div class="fb-card__bar"><div class="fb-card__bar-inner"></div></div>
      </div>
      <div class="fb-card__question"></div>
      <div class="fb-card__scale" role="group"></div>
      <div class="fb-card__legend"><span>あまりそう思わない</span><span>とてもそう思う</span></div>
      <div class="fb-card__nav">
        <button type="button" class="fb-nav fb-nav--prev">前へ戻る</button>
        <button type="button" class="fb-nav fb-nav--next">次へ進む</button>
      </div>
    `;
    return card;
  }

  function updateQuestionCard(card) {
    const question = QUESTIONS[STATE.index];
    const questionEl = card.querySelector('.fb-card__question');
    const stepEl = card.querySelector('.fb-card__step');
    const barInner = card.querySelector('.fb-card__bar-inner');
    const progress = Math.round(((STATE.index + 1) / QUESTIONS.length) * 100);

    if (!questionEl || !stepEl || !barInner) {
      return;
    }

    questionEl.textContent = `Q${question.id}. ${question.text}`;
    stepEl.textContent = `質問 ${STATE.index + 1} / ${QUESTIONS.length}`;
    barInner.style.width = `${progress}%`;

    const scaleEl = card.querySelector('.fb-card__scale');
    scaleEl.innerHTML = '';
    for (let value = 1; value <= 5; value++) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'fb-scale__btn';
      button.textContent = String(value);
      if (STATE.answers[question.code] === value) {
        button.classList.add('is-selected');
      }
      button.addEventListener('click', () => {
        STATE.answers[question.code] = value;
        setFieldValue(question.code, value);
        updateQuestionCard(card);
        setTimeout(() => nextQuestion(card), 120);
      });
      scaleEl.appendChild(button);
    }

    const prevBtn = card.querySelector('.fb-nav--prev');
    const nextBtn = card.querySelector('.fb-nav--next');
    if (prevBtn) {
      prevBtn.disabled = STATE.index === 0;
      prevBtn.onclick = () => {
        if (STATE.index === 0) {
          return;
        }
        STATE.index -= 1;
        updateQuestionCard(card);
      };
    }
    if (nextBtn) {
      nextBtn.textContent = STATE.index === QUESTIONS.length - 1 ? 'お気に入り選択へ' : '次へ進む';
      nextBtn.onclick = () => {
        if (!STATE.answers[question.code]) {
          alert('1〜5のいずれかを選択してください。');
          return;
        }
        nextQuestion(card);
      };
    }
  }

  function nextQuestion(card) {
    if (STATE.index < QUESTIONS.length - 1) {
      STATE.index += 1;
      updateQuestionCard(card);
      return;
    }
    showFavoriteStage();
  }

  function showFavoriteStage() {
    const host = document.getElementById('formbridge-app');
    if (!host) {
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'favorite-stage';
    wrapper.innerHTML = `
      <div class="favorite-stage__title">お気に入りの質問を3つ選んでください</div>
      <div class="favorite-stage__list"></div>
      <p class="favorite-stage__hint">最高点の質問が複数ある場合は自動的に優先されます。</p>
      <button type="button" class="favorite-stage__next">結果を見る</button>
    `;

    const list = wrapper.querySelector('.favorite-stage__list');
    getFavoriteCandidates().forEach(candidate => {
      const item = document.createElement('div');
      item.className = 'favorite-stage__item';
      item.dataset.code = candidate.code;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'favorite-stage__button';
      button.innerHTML = `
        <div class="favorite-stage__question">Q${candidate.id}. ${candidate.text}</div>
        <div class="favorite-stage__score">${candidate.score} 点</div>
      `;
      button.addEventListener('click', () => {
        toggleFavorite(candidate.code);
        renderFavoriteSelection(list);
      });
      item.appendChild(button);
      list.appendChild(item);
    });

    renderFavoriteSelection(list);

    const submit = wrapper.querySelector('.favorite-stage__next');
    submit.addEventListener('click', () => {
      if (STATE.favorites.length !== 3) {
        alert('お気に入りを3つ選択してください。');
        return;
      }
      renderResult(host);
    });

    host.innerHTML = '';
    host.appendChild(wrapper);
  }

  function renderFavoriteSelection(list) {
    if (!list) {
      return;
    }
    list.querySelectorAll('.favorite-stage__item').forEach(item => {
      const button = item.querySelector('button');
      if (!button) {
        return;
      }
      const code = item.dataset.code;
      if (STATE.favorites.includes(code)) {
        button.classList.add('is-selected');
      } else {
        button.classList.remove('is-selected');
      }
    });
  }

  function toggleFavorite(code) {
    const index = STATE.favorites.indexOf(code);
    if (index > -1) {
      STATE.favorites.splice(index, 1);
    } else {
      if (STATE.favorites.length >= 3) {
        STATE.favorites.shift();
      }
      STATE.favorites.push(code);
    }
    FAVORITE_FIELDS.forEach((fieldCode, idx) => {
      const selectedCode = STATE.favorites[idx];
      const question = QUESTIONS.find(q => q.code === selectedCode);
      setFieldValue(fieldCode, question ? `Q${question.id}` : '');
    });
  }

  function getFavoriteCandidates() {
    const scores = getScores();
    const max = Math.max(...scores.map(item => item.score));
    const top = scores.filter(item => item.score === max);
    if (top.length >= 3) {
      return top;
    }
    const rest = scores.filter(item => item.score < max).sort((a, b) => b.score - a.score);
    return top.concat(rest).slice(0, 6);
  }

  function getScores() {
    return QUESTIONS.map(q => ({
      id: q.id,
      code: q.code,
      type: q.type,
      text: q.text,
      score: STATE.answers[q.code] || 0
    }));
  }

  function calculateTypeScores() {
    const scores = getScores();
    const totals = {
      TF: 0, GM: 0, AU: 0, SE: 0,
      EC: 0, SV: 0, CH: 0, LS: 0
    };
    scores.forEach(entry => {
      totals[entry.type] += entry.score;
    });
    STATE.favorites.forEach(code => {
      const question = QUESTIONS.find(q => q.code === code);
      if (question) {
        totals[question.type] += 4;
      }
    });
    return totals;
  }

  function determineTopType(typeScores) {
    return Object.entries(typeScores).reduce((best, [type, score]) => {
      if (!best || score > best.score) {
        return { type, score };
      }
      return best;
    }, null);
  }

  function renderResult(host) {
    const typeScores = calculateTypeScores();
    const top = determineTopType(typeScores);
    applyTypeScores(typeScores, top);

    const stage = document.createElement('div');
    stage.className = 'result-stage';
    stage.innerHTML = `
      <h2>診断結果</h2>
      <p>お気に入りに追加した設問には +4 点のボーナスが加算されます。</p>
      <div class="result-cards"></div>
      <button type="button" class="result-stage__restart">最初からやり直す</button>
    `;

    const cards = stage.querySelector('.result-cards');
    Object.entries(typeScores).forEach(([type, score]) => {
      const card = document.createElement('div');
      card.className = 'result-card';
      if (top && top.type === type) {
        card.classList.add('result-card--top');
      }
      card.innerHTML = `
        <div class="result-card__title">${TYPE_LABELS[type]}</div>
        <div class="result-card__score">${score} 点</div>
      `;
      cards.appendChild(card);
    });

    stage.querySelector('.result-stage__restart').addEventListener('click', () => renderQuiz());

    host.innerHTML = '';
    host.appendChild(stage);
  }

  function applyTypeScores(typeScores, top) {
    Object.entries(SCORE_FIELD_MAP).forEach(([type, fieldCode]) => {
      setFieldValue(fieldCode, typeScores[type] || 0);
    });
    if (top) {
      setFieldValue('career_type_result', `【${TYPE_LABELS[top.type]}】\nスコア: ${top.score}点`);
    } else {
      setFieldValue('career_type_result', '');
    }
  }

  function setFieldValue(fieldCode, value) {
    if (!context || typeof context.setFieldValue !== 'function') {
      return;
    }
    context.setFieldValue(fieldCode, value);
  }

  waitForFormBridge();
})();
