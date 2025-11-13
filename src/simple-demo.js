(function() {
  'use strict';

  const SIMPLE_QUESTIONS = [
    { id: 1, code: 'simple_q1', text: 'Q1: 自分で工夫する仕事が好きだ' },
    { id: 2, code: 'simple_q2', text: 'Q2: チームで成果を出す仕事が好きだ' }
  ];

  const DROPDOWN_SPACE = 'simple_dropdown_space';
  const CHOICE_FIELD = 'simple_choice';
  const SCORE_FIELD = 'simple_score';

  function areQuestionsAnswered(record) {
    return SIMPLE_QUESTIONS.every(q => record[q.code] && record[q.code].value);
  }

  function getScores(record) {
    return SIMPLE_QUESTIONS.map(q => ({
      id: q.id,
      code: q.code,
      text: q.text,
      score: record[q.code] ? parseInt(record[q.code].value, 10) : 0
    }));
  }

  function calculateBaseScore(record) {
    return SIMPLE_QUESTIONS.reduce((sum, q) => {
      const value = record[q.code] ? parseInt(record[q.code].value, 10) : 0;
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
  }

  function updateScoreField(record, value) {
    if (!record[SCORE_FIELD]) {
      return;
    }
    record[SCORE_FIELD].value = value !== null && value !== undefined ? value : '';
  }

  function renderDropdown(record) {
    const container = kintone.app.record.getSpaceElement(DROPDOWN_SPACE);
    if (!container) {
      return;
    }

    container.innerHTML = '';

    if (!areQuestionsAnswered(record)) {
      container.innerHTML = '<p class="simple-placeholder">Q1とQ2に回答するとドロップダウンが表示されます。</p>';
      updateScoreField(record, null);
      if (record[CHOICE_FIELD]) {
        record[CHOICE_FIELD].value = '';
      }
      return;
    }

    const scores = getScores(record);
    const maxScore = Math.max.apply(null, scores.map(item => item.score));
    const candidates = scores.filter(item => item.score === maxScore);
    const baseScore = calculateBaseScore(record);

    const label = document.createElement('label');
    label.textContent = '高得点の設問を選択:';
    label.className = 'simple-dropdown-label';
    container.appendChild(label);

    const select = document.createElement('select');
    select.className = 'simple-dropdown-select';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '選択してください';
    select.appendChild(defaultOption);

    candidates.forEach(candidate => {
      const option = document.createElement('option');
      option.value = candidate.code;
      option.textContent = `${candidate.text}（${candidate.score}点）`;
      select.appendChild(option);
    });

    const currentChoice = record[CHOICE_FIELD] ? record[CHOICE_FIELD].value : '';
    let selected = null;
    if (currentChoice) {
      selected = candidates.find(candidate => candidate.code === currentChoice) || null;
      if (selected) {
        select.value = currentChoice;
      } else if (record[CHOICE_FIELD]) {
        record[CHOICE_FIELD].value = '';
      }
    }

    updateScoreField(record, baseScore + (selected ? 4 : 0));

    select.addEventListener('change', () => {
      if (record[CHOICE_FIELD]) {
        record[CHOICE_FIELD].value = select.value;
      }

      const newestScores = getScores(record);
      const updatedBase = newestScores.reduce((sum, item) => sum + item.score, 0);
      const latestCandidates = newestScores.filter(item => item.score === Math.max.apply(null, newestScores.map(entry => entry.score)));
      const chosen = latestCandidates.find(candidate => candidate.code === select.value);

      updateScoreField(record, updatedBase + (chosen ? 4 : 0));

      kintone.app.record.set({ record });
    });

    container.appendChild(select);
  }

  function handleChange(event) {
    const record = event.record;
    renderDropdown(record);
    return event;
  }

  const showEvents = ['app.record.create.show', 'app.record.edit.show'];
  kintone.events.on(showEvents, function(event) {
    const record = event.record;

    if (record[SCORE_FIELD]) {
      record[SCORE_FIELD].disabled = true;
    }
    kintone.app.record.setFieldShown(CHOICE_FIELD, false);

    renderDropdown(record);
    return event;
  });

  const changeEvents = SIMPLE_QUESTIONS.flatMap(q => [
    `app.record.create.change.${q.code}`,
    `app.record.edit.change.${q.code}`
  ]);

  kintone.events.on(changeEvents, handleChange);
})();
