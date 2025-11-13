(function() {
  'use strict';

  const FAVORITES_SPACE_ID = 'favorites_container';
  const RESULT_FIELD = 'career_type_result';
  const RESULT_PLACEHOLDER = '全40問に回答し、お気に入りを3つ選ぶと結果が表示されます。';
  const SCORE_SUMMARY_SPACE = 'score_summary';
  const RADAR_CHART_SPACE = 'score_radar';

  const QUESTIONS = [
    { id: 1, code: 'q1', text: '専門分野で高い評価を得たい', type: 'TF' },
    { id: 2, code: 'q2', text: '組織全体を統括して意思決定したい', type: 'GM' },
    { id: 3, code: 'q3', text: '自分の判断で柔軟に働きたい', type: 'AU' },
    { id: 4, code: 'q4', text: '安定した雇用と生活を最優先したい', type: 'SE' },
    { id: 5, code: 'q5', text: '新しいビジネスを生み出したい', type: 'EC' },
    { id: 6, code: 'q6', text: '社会や人の役に立つ仕事がしたい', type: 'SV' },
    { id: 7, code: 'q7', text: '難題を解決することにやりがいを感じる', type: 'CH' },
    { id: 8, code: 'q8', text: '仕事と私生活のバランスを重視したい', type: 'LS' },
    { id: 9, code: 'q9', text: '専門知識を深める勉強を続けたい', type: 'TF' },
    { id: 10, code: 'q10', text: '大きなチームを率いる役割に挑戦したい', type: 'GM' },
    { id: 11, code: 'q11', text: '働く場所や時間を自分で選びたい', type: 'AU' },
    { id: 12, code: 'q12', text: '長期的に安心できる会社で働きたい', type: 'SE' },
    { id: 13, code: 'q13', text: 'アイデアを形にして価値を生みたい', type: 'EC' },
    { id: 14, code: 'q14', text: '困っている人を支えることにやりがいを感じる', type: 'SV' },
    { id: 15, code: 'q15', text: '競争の激しい環境で力を試したい', type: 'CH' },
    { id: 16, code: 'q16', text: '家族や趣味の時間を十分に確保したい', type: 'LS' },
    { id: 17, code: 'q17', text: '技術や専門性で第一人者になりたい', type: 'TF' },
    { id: 18, code: 'q18', text: '経営視点で組織の方向性を決めたい', type: 'GM' },
    { id: 19, code: 'q19', text: '自分の裁量で仕事の進め方を決めたい', type: 'AU' },
    { id: 20, code: 'q20', text: '福利厚生が充実した会社で働きたい', type: 'SE' },
    { id: 21, code: 'q21', text: 'リスクを取って大きな成果を狙いたい', type: 'EC' },
    { id: 22, code: 'q22', text: '社会課題の解決に貢献したい', type: 'SV' },
    { id: 23, code: 'q23', text: '不可能と思うことにも挑みたい', type: 'CH' },
    { id: 24, code: 'q24', text: '趣味や学びの時間を意識的に作りたい', type: 'LS' },
    { id: 25, code: 'q25', text: '専門領域で実績を積み重ねたい', type: 'TF' },
    { id: 26, code: 'q26', text: '会社の戦略立案に深く関わりたい', type: 'GM' },
    { id: 27, code: 'q27', text: 'フリーランスのような働き方に憧れる', type: 'AU' },
    { id: 28, code: 'q28', text: '定年まで同じ会社で働き続けたい', type: 'SE' },
    { id: 29, code: 'q29', text: '自分の企画でビジネスを成功させたい', type: 'EC' },
    { id: 30, code: 'q30', text: '次世代のために良い社会を残したい', type: 'SV' },
    { id: 31, code: 'q31', text: '高い目標に挑戦し続けたい', type: 'CH' },
    { id: 32, code: 'q32', text: '働く場所や時間を柔軟に選びたい', type: 'LS' },
    { id: 33, code: 'q33', text: '専門家として周囲に頼られる存在になりたい', type: 'TF' },
    { id: 34, code: 'q34', text: '複数部門をまとめるリーダーに挑戦したい', type: 'GM' },
    { id: 35, code: 'q35', text: '上司の指示より自分の判断を優先したい', type: 'AU' },
    { id: 36, code: 'q36', text: '退職金や年金制度が整った会社で安心したい', type: 'SE' },
    { id: 37, code: 'q37', text: '新しい市場や機会を開拓したい', type: 'EC' },
    { id: 38, code: 'q38', text: '弱い立場の人を支援したい', type: 'SV' },
    { id: 39, code: 'q39', text: '高いハードルを乗り越えることで成長したい', type: 'CH' },
    { id: 40, code: 'q40', text: '仕事以外の人間関係も大切にしたい', type: 'LS' }
  ];

  const CAREER_TYPES = {
    TF: {
      name: '専門・職能別コンピテンシー',
      description: '特定分野の専門性を磨き続け、プロフェッショナルとして認められることを重視します。'
    },
    GM: {
      name: '全般管理コンピテンシー',
      description: '組織全体を統括し、経営視点で意思決定を行うことにやりがいを感じます。'
    },
    AU: {
      name: '自律・独立志向',
      description: '働き方や進め方を自分で決め、自由度の高い環境を求めます。'
    },
    SE: {
      name: '保障・安定志向',
      description: '長期的な安心感や生活の安定を最優先し、計画的なキャリアを望みます。'
    },
    EC: {
      name: '起業家・創造志向',
      description: '新しい価値を生み出し、リスクを取りながら事業をつくることに情熱を注ぎます。'
    },
    SV: {
      name: '奉仕・社会貢献志向',
      description: '社会や人の役に立つことを使命とし、貢献実感を大切にします。'
    },
    CH: {
      name: '純粋な挑戦志向',
      description: '困難な課題に挑み続けることで自分を成長させたいと考えます。'
    },
    LS: {
      name: '生活様式志向',
      description: '仕事と私生活の調和を最優先し、柔軟な働き方を大切にします。'
    }
  };

  const FAVORITE_FIELDS = ['favorite_1', 'favorite_2', 'favorite_3'];
  const SCORE_FIELDS = {
    TF: 'score_tf',
    GM: 'score_gm',
    AU: 'score_au',
    SE: 'score_se',
    EC: 'score_ec',
    SV: 'score_sv',
    CH: 'score_ch',
    LS: 'score_ls'
  };

  const QUESTION_MAP = QUESTIONS.reduce((map, question) => {
    map[question.id] = question;
    map[question.code] = question;
    return map;
  }, {});
  const TYPE_ORDER = ['TF', 'GM', 'AU', 'SE', 'EC', 'SV', 'CH', 'LS'];

  let radarChartInstance = null;
  let latestBaseScores = null;
  let latestFinalScores = null;
  let latestFavoriteIds = [];
  let resultVisible = false;

  function areAllQuestionsAnswered(record) {
    return QUESTIONS.every(question => record[question.code] && record[question.code].value);
  }

  function getQuestionScores(record) {
    return QUESTIONS.map(question => ({
      id: question.id,
      code: question.code,
      type: question.type,
      text: question.text,
      score: record[question.code] ? parseInt(record[question.code].value, 10) : 0
    }));
  }

  function buildFavoriteSelectionInfo(scores) {
    const sorted = scores.slice().sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.id - b.id;
    });

    const groups = [];
    sorted.forEach(entry => {
      if (!groups.length || groups[groups.length - 1].score !== entry.score) {
        groups.push({ score: entry.score, questions: [] });
      }
      groups[groups.length - 1].questions.push(entry);
    });

    const candidates = [];
    for (const group of groups) {
      candidates.push(...group.questions);
      if (candidates.length >= 3) {
        break;
      }
    }

    const forcedQuestionIds = groups[0].questions.length < 3
      ? groups[0].questions.map(q => q.id)
      : [];

    return {
      candidates,
      forcedQuestionIds,
      allowedIdSet: new Set(candidates.map(candidate => candidate.id))
    };
  }

  function parseFavoriteValue(value) {
    if (!value) {
      return null;
    }
    const match = value.match(/^Q(\d{1,2})$/i);
    return match ? parseInt(match[1], 10) : null;
  }

  function collectFavoriteSelections(record, selectionInfo) {
    const map = {};
    FAVORITE_FIELDS.forEach(fieldCode => {
      const value = record[fieldCode] ? record[fieldCode].value : '';
      const id = parseFavoriteValue(value);
      if (id && QUESTION_MAP[id] && (!selectionInfo || selectionInfo.allowedIdSet.has(id))) {
        map[fieldCode] = id;
      }
    });
    return map;
  }

  function collectFavoriteIds(record, selectionInfo) {
    const map = collectFavoriteSelections(record, selectionInfo);
    return Object.values(map).filter((id, index, arr) => arr.indexOf(id) === index);
  }

  function validateFavorites(record, selectionInfo) {
    const rawValues = FAVORITE_FIELDS.map(fieldCode => record[fieldCode] ? record[fieldCode].value : '');

    if (rawValues.some(value => !value)) {
      return { status: 'incomplete', message: 'お気に入りを3つすべて選択してください。' };
    }

    const ids = rawValues.map(value => parseFavoriteValue(value));
    if (ids.some(id => !id)) {
      return { status: 'invalid', message: 'お気に入りの形式が正しくありません。' };
    }

    if (new Set(ids).size !== ids.length) {
      return { status: 'invalid', message: '同じ質問を複数回選ぶことはできません。' };
    }

    const invalid = ids.filter(id => !selectionInfo.allowedIdSet.has(id));
    if (invalid.length) {
      return { status: 'invalid', message: '候補外の質問は選択できません。' };
    }

    const missingForced = selectionInfo.forcedQuestionIds.filter(id => !ids.includes(id));
    if (missingForced.length) {
      return { status: 'invalid', message: '最高点の質問は必ず含めてください。' };
    }

    return { status: 'valid', ids };
  }

  function calculateTypeScores(scores) {
    const typeScores = {
      TF: 0, GM: 0, AU: 0, SE: 0,
      EC: 0, SV: 0, CH: 0, LS: 0
    };

    scores.forEach(entry => {
      typeScores[entry.type] += entry.score;
    });

    return typeScores;
  }

  function applyFavoriteBonus(typeScores, favoriteIds) {
    const updated = Object.assign({}, typeScores);
    favoriteIds.forEach(id => {
      const question = QUESTION_MAP[id];
      if (question) {
        updated[question.type] += 4;
      }
    });
    return updated;
  }

  function determineCareerType(typeScores) {
    let winner = null;
    let maxScore = -Infinity;

    Object.entries(typeScores).forEach(([type, score]) => {
      if (score > maxScore) {
        maxScore = score;
        winner = type;
      }
    });

    if (!winner) {
      return '診断を完了させてください。';
    }

    const info = CAREER_TYPES[winner];
    return `【${info.name}】\nスコア: ${maxScore}点\n\n${info.description}`;
  }

  function resetScores(record) {
    Object.values(SCORE_FIELDS).forEach(fieldCode => {
      if (record[fieldCode]) {
        record[fieldCode].value = '';
      }
    });
    if (record[RESULT_FIELD]) {
      record[RESULT_FIELD].value = RESULT_PLACEHOLDER;
    }
    latestBaseScores = null;
    latestFinalScores = null;
    latestFavoriteIds = [];
    resultVisible = false;
    clearVisualizations();
  }

  function clearVisualizations() {
    renderScoreSummary(null, null, []);
    renderRadarChart(null);
  }

  function updateNumericField(record, fieldCode, value) {
    if (record[fieldCode]) {
      record[fieldCode].value = value;
    }
  }

  function updateScores(event, options = {}) {
    const record = event.record;

    if (!areAllQuestionsAnswered(record)) {
      resetScores(record);
      renderResultSection(record);
      return;
    }

    const scores = getQuestionScores(record);
    const selectionInfo = buildFavoriteSelectionInfo(scores);
    const favoriteIds = collectFavoriteIds(record, selectionInfo);
    const baseTypeScores = calculateTypeScores(scores);
    const finalTypeScores = applyFavoriteBonus(baseTypeScores, favoriteIds);

    if (options.enforceFavorites) {
      const validation = validateFavorites(record, selectionInfo);
      if (validation.status !== 'valid') {
        event.error = validation.message;
        return;
      }
    }

    updateNumericField(record, SCORE_FIELDS.TF, finalTypeScores.TF);
    updateNumericField(record, SCORE_FIELDS.GM, finalTypeScores.GM);
    updateNumericField(record, SCORE_FIELDS.AU, finalTypeScores.AU);
    updateNumericField(record, SCORE_FIELDS.SE, finalTypeScores.SE);
    updateNumericField(record, SCORE_FIELDS.EC, finalTypeScores.EC);
    updateNumericField(record, SCORE_FIELDS.SV, finalTypeScores.SV);
    updateNumericField(record, SCORE_FIELDS.CH, finalTypeScores.CH);
    updateNumericField(record, SCORE_FIELDS.LS, finalTypeScores.LS);

    if (record[RESULT_FIELD]) {
      record[RESULT_FIELD].value = determineCareerType(finalTypeScores);
    }

    latestBaseScores = baseTypeScores;
    latestFinalScores = finalTypeScores;
    latestFavoriteIds = favoriteIds;

    if (!resultVisible) {
      clearVisualizations();
    } else {
      renderScoreSummary(latestFinalScores, latestBaseScores, latestFavoriteIds);
      renderRadarChart(latestFinalScores);
    }

    renderResultSection(record);
  }

  function renderQuestions(record) {
    QUESTIONS.forEach(question => {
      const spaceId = `question_${question.id}`;
      const space = kintone.app.record.getSpaceElement(spaceId);
      if (space) {
        space.innerHTML = `
          <div class="question-text">
            <strong>Q${question.id}.</strong> ${question.text}
          </div>
        `;
      }
    });
  }

  function renderFavorites(record) {
    const container = kintone.app.record.getSpaceElement(FAVORITES_SPACE_ID);
    if (!container) {
      return;
    }

    if (!areAllQuestionsAnswered(record)) {
      container.innerHTML = `
        <div class="favorites-placeholder">
          <p>すべての質問に回答するとお気に入り選択が表示されます。</p>
        </div>
      `;
      FAVORITE_FIELDS.forEach(fieldCode => {
        if (record[fieldCode]) {
          record[fieldCode].value = '';
        }
      });
      return;
    }

    const scores = getQuestionScores(record);
    const selectionInfo = buildFavoriteSelectionInfo(scores);
    const candidates = selectionInfo.candidates;
    const currentSelections = collectFavoriteSelections(record, selectionInfo);

    container.innerHTML = `
      <div class="favorites-section">
        <h3>お気に入り選択</h3>
        <p class="favorites-instruction">
          最高点の質問から優先的に候補が表示されます。3つ選ぶと、それぞれに+4点のボーナスが加算されます。
        </p>
        <div class="favorites-note">
          <strong>選択可能な質問:</strong> ${candidates.map(candidate => `Q${candidate.id}`).join(', ')}
        </div>
        ${selectionInfo.forcedQuestionIds.length ? `<div class="favorites-note warning">最高点の ${selectionInfo.forcedQuestionIds.map(id => `Q${id}`).join(', ')} は必ず選択してください。</div>` : ''}
      </div>
    `;

    const selectsWrapper = document.createElement('div');
    selectsWrapper.className = 'favorites-dropdowns';
    container.appendChild(selectsWrapper);

    FAVORITE_FIELDS.forEach((fieldCode, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'favorite-dropdown-item';

      const label = document.createElement('label');
      label.className = 'favorite-dropdown-label';
      label.textContent = `お気に入り${index + 1}`;
      wrapper.appendChild(label);

      const select = document.createElement('select');
      select.className = 'favorite-dropdown-select';

      const emptyOption = document.createElement('option');
      emptyOption.value = '';
      emptyOption.textContent = '選択してください';
      select.appendChild(emptyOption);

      const usedIds = new Set(Object.entries(currentSelections)
        .filter(([key]) => key !== fieldCode)
        .map(([, id]) => id));

      candidates.forEach(candidate => {
        if (usedIds.has(candidate.id) && currentSelections[fieldCode] !== candidate.id) {
          return;
        }
        const option = document.createElement('option');
        option.value = `Q${candidate.id}`;
        option.textContent = `Q${candidate.id}: ${candidate.text} (${candidate.score}点)`;
        select.appendChild(option);
      });

      const currentValue = record[fieldCode] ? record[fieldCode].value : '';
      const currentId = parseFavoriteValue(currentValue);
      if (!currentId || !selectionInfo.allowedIdSet.has(currentId)) {
        if (record[fieldCode]) {
          record[fieldCode].value = '';
        }
      } else {
        select.value = currentValue;
      }

      select.addEventListener('change', () => {
        const appRecord = kintone.app.record.get();
        const latestRecord = appRecord.record;
        if (latestRecord[fieldCode]) {
          latestRecord[fieldCode].value = select.value;
        }
        updateScores({ record: latestRecord });
        kintone.app.record.set({ record: latestRecord });
        renderFavorites(latestRecord);
      });

      wrapper.appendChild(select);
      selectsWrapper.appendChild(wrapper);
    });
  }

  function getResultReadiness(record) {
    if (!areAllQuestionsAnswered(record)) {
      return { status: 'incomplete', message: '全40問に回答してください。' };
    }
    const scores = getQuestionScores(record);
    const selectionInfo = buildFavoriteSelectionInfo(scores);
    const validation = validateFavorites(record, selectionInfo);
    if (validation.status !== 'valid') {
      return { status: 'invalid', message: validation.message };
    }
    return { status: 'ready', message: 'お気に入りが確定しました。「結果を見る」を押してください。' };
  }

  function renderResultSection(record) {
    const summarySpace = kintone.app.record.getSpaceElement(SCORE_SUMMARY_SPACE);
    if (!summarySpace) {
      return;
    }

    const status = getResultReadiness(record);
    const buttonDisabled = status.status !== 'ready';

    summarySpace.innerHTML = `
      <div class="result-section">
        <div class="result-section__header">
          <h3>診断結果</h3>
          <p>お気に入りを3つ選んだら「結果を見る」を押してください。</p>
        </div>
        <button type="button" class="result-section__button" ${buttonDisabled ? 'disabled' : ''}>
          結果を見る
        </button>
        <p class="result-section__hint ${buttonDisabled ? 'is-warning' : 'is-info'}">
          ${status.message}
        </p>
        <div id="score-summary-cards"></div>
        <div id="score-radar-panel" class="radar-panel-container"></div>
      </div>
    `;

    const button = summarySpace.querySelector('.result-section__button');
    button.addEventListener('click', () => {
      if (buttonDisabled || !latestFinalScores) {
        return;
      }
      resultVisible = true;
      renderScoreSummary(latestFinalScores, latestBaseScores, latestFavoriteIds);
      renderRadarChart(latestFinalScores);
      summarySpace.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    if (resultVisible) {
      renderScoreSummary(latestFinalScores, latestBaseScores, latestFavoriteIds);
      renderRadarChart(latestFinalScores);
    } else {
      renderScoreSummary(null, null, []);
      renderRadarChart(null);
    }
  }

  function renderScoreSummary(finalScores, baseScores, favoriteIds) {
    const summarySpace = kintone.app.record.getSpaceElement(SCORE_SUMMARY_SPACE);
    if (!summarySpace) {
      return;
    }
    const cardsContainer = summarySpace.querySelector('#score-summary-cards');
    if (!cardsContainer) {
      return;
    }

    if (!resultVisible || !finalScores || !baseScores) {
      cardsContainer.innerHTML = '<div class="score-placeholder">結果を見るボタンで表示されます。</div>';
      return;
    }

    const bonusTypes = new Set(favoriteIds.map(id => QUESTION_MAP[id].type));
    const topType = TYPE_ORDER.reduce((best, type) => {
      const score = finalScores[type] || 0;
      if (!best || score > best.score) {
        return { type, score };
      }
      return best;
    }, null);

    const cards = TYPE_ORDER.map(type => {
      const base = baseScores[type] || 0;
      const total = finalScores[type] || 0;
      const gotBonus = bonusTypes.has(type);
      return `
        <div class="score-card ${topType && topType.type === type ? 'score-card--top' : ''}">
          <div class="score-card__header">
            <span class="score-card__type">${CAREER_TYPES[type].name}</span>
            ${gotBonus ? '<span class="score-card__badge">+4</span>' : ''}
          </div>
          <div class="score-card__body">
            <div class="score-card__value">${total}点</div>
            ${total !== base ? `<div class="score-card__base">基礎 ${base} 点</div>` : ''}
          </div>
        </div>
      `;
    }).join('');

    cardsContainer.innerHTML = `
      <div class="score-summary-grid">
        ${cards}
      </div>
    `;
  }

  function renderRadarChart(finalScores) {
    const radarSpace = document.getElementById('score-radar-panel');
    if (!radarSpace) {
      return;
    }

    if (!resultVisible || !finalScores) {
      radarSpace.innerHTML = '<div class="chart-placeholder">結果を見るボタンで表示されます。</div>';
      if (radarChartInstance) {
        radarChartInstance.destroy();
        radarChartInstance = null;
      }
      return;
    }

    if (!window.Chart) {
      radarSpace.innerHTML = '<div class="chart-warning">Chart.js が読み込まれていません。</div>';
      return;
    }

    const topType = TYPE_ORDER.reduce((best, type) => {
      const score = finalScores[type] || 0;
      if (!best || score > best.score) {
        return { type, score };
      }
      return best;
    }, null);

    const typeInfo = topType ? CAREER_TYPES[topType.type] : null;

    radarSpace.innerHTML = `
      <div class="radar-panel">
        <div class="radar-panel__chart">
          <canvas id="career-radar-chart" height="320"></canvas>
        </div>
        <div class="radar-panel__info">
          <div class="radar-panel__label">あなたのキャリアタイプ</div>
          <h4>${typeInfo ? typeInfo.name : '未判定'}</h4>
          <p>${typeInfo ? typeInfo.description : 'お気に入りを確定して「結果を見る」を押してください。'}</p>
        </div>
      </div>
    `;

    const ctx = radarSpace.querySelector('canvas').getContext('2d');
    const data = TYPE_ORDER.map(type => finalScores[type] || 0);

    if (radarChartInstance) {
      radarChartInstance.destroy();
    }

    radarChartInstance = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: TYPE_ORDER.map(type => CAREER_TYPES[type].name),
        datasets: [{
          label: 'スコア',
          data,
          backgroundColor: 'rgba(127, 143, 244, 0.2)',
          borderColor: '#7f8ff4',
          pointBackgroundColor: '#7f8ff4'
        }]
      },
      options: {
        responsive: true,
        scales: {
          r: {
            beginAtZero: true,
            ticks: { stepSize: 5 },
            suggestedMax: Math.max(...data, 10)
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  function handleQuestionChange(event) {
    const record = event.record;
    renderFavorites(record);
    renderResultSection(record);
    updateScores(event);
    return event;
  }

  function handleFavoriteFieldChange(event) {
    updateScores(event);
    renderResultSection(event.record);
    return event;
  }

  kintone.events.on(['app.record.create.show', 'app.record.edit.show'], function(event) {
    const record = event.record;

    FAVORITE_FIELDS.forEach(fieldCode => {
      kintone.app.record.setFieldShown(fieldCode, false);
    });

    Object.values(SCORE_FIELDS).forEach(fieldCode => {
      if (record[fieldCode]) {
        record[fieldCode].disabled = true;
      }
    });
    if (record[RESULT_FIELD]) {
      record[RESULT_FIELD].disabled = true;
    }
    kintone.app.record.setFieldShown('diagnosis_group', false);
    kintone.app.record.setFieldShown('score_radar', false);

    renderQuestions(record);
    renderFavorites(record);
    renderResultSection(record);
    updateScores(event);
    return event;
  });

  const questionChangeEvents = QUESTIONS.flatMap(question => [
    `app.record.create.change.${question.code}`,
    `app.record.edit.change.${question.code}`
  ]);
  kintone.events.on(questionChangeEvents, handleQuestionChange);

  const favoriteChangeEvents = FAVORITE_FIELDS.flatMap(fieldCode => [
    `app.record.create.change.${fieldCode}`,
    `app.record.edit.change.${fieldCode}`
  ]);
  kintone.events.on(favoriteChangeEvents, handleFavoriteFieldChange);

  kintone.events.on(['app.record.create.submit', 'app.record.edit.submit'], function(event) {
    updateScores(event, { enforceFavorites: true });
    return event;
  });
})();



