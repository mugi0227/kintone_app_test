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
      label: '専門・職能別',
      color: '#e65454',
      description:  `「専門・職能別」は自分の得意な分野において、
さらに能力を伸ばしていきたいと考える人たちです。
次項で紹介する「全般管理」と異なり、マネジャーになるのは避けようとします。
専門性を重んじるのが特徴です。

▼ 報酬についての考え方
報酬についての考え方は、給料が高いかどうかより公平であることが重要です。
自分と同程度の能力を持った人と同じだけの報酬を得たいと考えています。

▼ 望むこと
自分の専門能力を成長させる仕事の機会を望んでいます。
自分の専門領域でどんどん挑戦していきたいと考えます。
上司から認められるよりも同じ専門分野の人々から評価されたいと思っています。`,
    },
    gm: {
      label: '全般管理',
      color: '#f28c48',
      description: `「全般管理」は、ゼネラル・マネジャー（社内を統括する立場）に
なりたいと考える人たちです。
どれだけ昇進できるかということによって、自分自身を評価しています。
自分の裁量権が増していくことを望み、部下を何人抱えているかということで、
自分を評価しています。

▼ 報酬についての考え方
自分の部下よりもどれだけ多くもらっているかを重視します。
どれだけの給与を得るかが成功を測る目安です。

▼ 望むこと
たくさんの部下を持ち多くの予算を与えられる、責任の重い仕事を望んでいます。`,
    },
    au: {
      label: '自律・独立',
      color: '#f6c74a',
      description: `「自律・独立」は、できる限り自由を得たいと考える人たちです。
次項の「保障・安定」とは真逆のタイプになります。
仕事上で縛られることをとにかく嫌い、できるなら自営業、
そうでなくてもできるだけ自由を得られる仕事を求めます。

▼ 報酬についての考え方
自由を得るためなら、不安定な給与や福利厚生も受け入れます。
業務委託やパートタイムという働き方も気にしません。

▼ 望むこと
組織のルールから自由でいることを非常に強く望みます。誰しもある程度は自由を求める気持ちを持っていますが、このアンカーの人たちが求める度合いは、他のアンカーの人たちよりも突出しています。`,
    },
    se: {
      label: '保障・安定',
      color: '#a8d750',
      description:  `「保障・安定」は、保障と安定を維持したいと考える人たちです。
キャリア・アンカーが生まれたアメリカでは比較的少数派である一方、
日本のような集団主義の文化のなかではよく見られます。

▼ 報酬についての考え方
安定した給与や報酬、福利厚生の充実などを望んでいます。
年功序列・終身雇用を好みます。

▼ 望むこと
保障と安定を望むと同時に、会社に対して忠誠心が高く、
会社にも誠実な対応を求めます。`,
    },
    ec: {
      label: '起業家的創造性',
      color: '#4fb36a',
      description: `「起業家的創造性」は、自分の会社を立ち上げたいと考える人たちです。
最初から他のアンカーとはまったく違ったタイプで、
学生時代からすでに起業したりしています。
失敗することも少なくありませんが、何度失敗しても成功を目指して
邁進する特徴があります。

▼ 報酬についての考え方
自分の立ち上げた組織の規模で成功を測る傾向にあります。
自分と自分の会社を同一視しており、自分を大きくするために
会社を大きくするという感覚を持っています。

▼ 望むこと
幼い頃から何かを作り上げるのが好きです。
新しい製品や今までとは異なる仕組みなどを作り上げたいと考えています。
いつも何かを作り上げることに夢中です。`,
    },
    sv: {
      label: '奉仕・社会貢献',
      color: '#5cc0e6',
      description: `「奉仕・社会貢献」は、自分のキャリアは何か高い価値のあることに
貢献しなければ意味がないと考える人たちです。
医療、看護、社会福祉事業、教育の職業で多く見受けられますが、
企業内の典型的な職種としては人事部門で人を援助する仕事があります。

▼ 報酬についての考え方
金額そのものに重きを置いているわけではありません。
貢献の度合いによって支払われる、公正な給与を望みます。

▼ 望むこと
給与や昇進よりも、自分にとって意味のある奉仕や
社会のためになる仕事を続けて行くことを望みます。`,
    },
    ch: {
      label: '純粋な挑戦',
      color: '#4a7ae2',
      description: `「純粋な挑戦」は、非常に困難な状況を乗り越えたいと考える人たちです。
「今までに誰も成し遂げることができなかったことに挑戦すること」
それ自体がモチベーションになっています。
エンジニアや、スポーツ選手、米軍の海軍パイロットなどに多く存在するタイプです。
ほとんどの人がある程度は挑戦を求めているといえますが、「純粋な挑戦」タイプの
人にとっては、挑戦こそが唯一の人生テーマであるといえます。

▼ 報酬についての考え方
「挑戦できるかどうか」ということに比べれば、報酬は二の次と考えています。

▼ 望むこと
常に新しくて意義のある挑戦を与えてくれる仕事や、
解決するのがほとんど不可能であるような難しい問題を求めています。`,
    },
    ls: {
      label: 'ライフスタイル',
      color: '#a06be1',
      description: `ライフスタイル全体のバランスと調和を重視したいと考える人たちです。
「ワークライフバランス」という言葉がありますが、
まさにワークライフバランスを大切にした生き方を望みます。
単にプライベートと仕事のバランスを取るだけでなく、キャリア・家族・自分自身
のニーズをうまく統合させる方法を見いだしたいと考えているのが特徴です。

▼ 報酬についての考え方
給与そのものよりも、自分の時間の都合に合わせた働き方が選択できることを
重視します。

▼ 望むこと
何よりも柔軟であることを望んでいます。
組織に対しては特別な勤務形態というよりも、
それぞれの個人の状況に合わせて柔軟な対応を話し合える姿勢を求めています。`,
    },
  };

  const QUESTIONS = [
    { id: 1, code: 'q_1', text: '専門分野で高い評価を得たい', anchor: 'tf' },
    { id: 2, code: 'q_2', text: '組織全体を統括して意思決定したい', anchor: 'gm' },
    { id: 3, code: 'q_3', text: '自分の判断で柔軟に仕事を進めたい', anchor: 'au' },
    { id: 4, code: 'q_4', text: '安定した雇用と生活を最優先したい', anchor: 'se' },
    { id: 5, code: 'q_5', text: '新しいビジネスを立ち上げたい', anchor: 'ec' },
    { id: 6, code: 'q_6', text: '社会や人の役に立つ仕事をしたい', anchor: 'sv' },
    { id: 7, code: 'q_7', text: '難題を解決することにやりがいを感じる', anchor: 'ch' },
    { id: 8, code: 'q_8', text: '仕事と私生活のバランスを大切にしたい', anchor: 'ls' },
    { id: 9, code: 'q_9', text: '専門知識を深める勉強を続けたい', anchor: 'tf' },
    { id: 10, code: 'q_10', text: '大きなチームを率いる役割に挑戦したい', anchor: 'gm' },
    { id: 11, code: 'q_11', text: '働く場所や時間を自分で選びたい', anchor: 'au' },
    { id: 12, code: 'q_12', text: '長期的に安心できる会社で働きたい', anchor: 'se' },
    { id: 13, code: 'q_13', text: 'アイデアを形にして価値を生みたい', anchor: 'ec' },
    { id: 14, code: 'q_14', text: '困っている人を支えることにやりがいを感じる', anchor: 'sv' },
    { id: 15, code: 'q_15', text: '競争が激しい環境で力を試したい', anchor: 'ch' },
    { id: 16, code: 'q_16', text: '家族や趣味の時間を意識的に作りたい', anchor: 'ls' },
    { id: 17, code: 'q_17', text: '専門家として周囲に頼られる存在になりたい', anchor: 'tf' },
    { id: 18, code: 'q_18', text: '経営視点で組織の方向性を決めたい', anchor: 'gm' },
    { id: 19, code: 'q_19', text: '裁量の大きい環境で働きたい', anchor: 'au' },
    { id: 20, code: 'q_20', text: '福利厚生が充実した会社で働きたい', anchor: 'se' },
    { id: 21, code: 'q_21', text: 'リスクを取って大きな成果を狙いたい', anchor: 'ec' },
    { id: 22, code: 'q_22', text: '社会課題の解決に貢献したい', anchor: 'sv' },
    { id: 23, code: 'q_23', text: '不可能と言われることにも挑みたい', anchor: 'ch' },
    { id: 24, code: 'q_24', text: '趣味や学びの時間を意識的に確保したい', anchor: 'ls' },
    { id: 25, code: 'q_25', text: '専門領域で実績を積み重ねたい', anchor: 'tf' },
    { id: 26, code: 'q_26', text: '会社の戦略立案に深く関わりたい', anchor: 'gm' },
    { id: 27, code: 'q_27', text: 'フリーランスのような働き方に憧れる', anchor: 'au' },
    { id: 28, code: 'q_28', text: '定年まで同じ会社で安心して働きたい', anchor: 'se' },
    { id: 29, code: 'q_29', text: '自分の企画でビジネスを成功させたい', anchor: 'ec' },
    { id: 30, code: 'q_30', text: '次世代のために良い社会を残したい', anchor: 'sv' },
    { id: 31, code: 'q_31', text: '高い目標に挑戦し続けたい', anchor: 'ch' },
    { id: 32, code: 'q_32', text: '働く場所や時間を柔軟に選びたい', anchor: 'ls' },
    { id: 33, code: 'q_33', text: '専門家として第一人者になりたい', anchor: 'tf' },
    { id: 34, code: 'q_34', text: '複数部門をまとめるリーダーに挑戦したい', anchor: 'gm' },
    { id: 35, code: 'q_35', text: '上司の指示より自分の判断を優先したい', anchor: 'au' },
    { id: 36, code: 'q_36', text: '退職金や年金制度が整った会社で安心したい', anchor: 'se' },
    { id: 37, code: 'q_37', text: '新しい市場や機会を開拓したい', anchor: 'ec' },
    { id: 38, code: 'q_38', text: '弱い立場の人を支援したい', anchor: 'sv' },
    { id: 39, code: 'q_39', text: '高いハードルを乗り越えることで成長したい', anchor: 'ch' },
    { id: 40, code: 'q_40', text: '仕事以外の人間関係も大切にしたい', anchor: 'ls' },
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
        <div id="career-type-highlight" class="result-type-cards"></div>
        <div class="results-grid">
          <div class="results-column results-column--scores">
            <h3 class="results-section-title">スコア内訳</h3>
            <div class="score-cards" id="score-cards-grid"></div>
          </div>
          <div class="results-column results-column--chart">
            <h3 class="results-section-title">バランスチャート</h3>
            <div id="radar-chart-container">
              <canvas id="fbRadarChart"></canvas>
            </div>
          </div>
        </div>
        <div class="favorites-result-section">
          <h3 class="results-section-title">選択したお気に入り（+4点ボーナス）</h3>
          <div id="favorites-result-list" class="favorites-result-list"></div>
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
    renderFavoritesResult();
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

    const currentCard = document.getElementById(`card-q_${state.currentStep}`);
    const targetCard = document.getElementById(`card-q_${next}`);
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
    const currentQuestion = document.getElementById(`card-q_${state.currentStep}`);
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
            ${isLocked
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

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const maxScore = sorted[0][1];

    Object.entries(scores).forEach(([key, value]) => {
      const info = CAREER_ANCHORS[key];
      const isTop = value === maxScore;
      const grade = getScoreGrade(value);
      const titleHtml = info.label.replace('（', '<br>（');
      const card = document.createElement('div');
      card.className = `score-card type-${key} ${isTop ? 'is-top' : ''}`;
      card.innerHTML = `
        <div class="score-card-badge grade-${grade.toLowerCase()}">${grade}</div>
        <div class="score-card-title">${titleHtml}</div>
        <div class="score-card-value">${value}点</div>
        <div class="score-card-tooltip">${info.description}</div>
      `;
      grid.appendChild(card);
    });
  }

  function getScoreGrade(score) {
    if (score >= 25) return 'S';
    if (score >= 20) return 'A';
    if (score >= 10) return 'B';
    return 'C';
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
            label: 'スコア',
            data,
            fill: true,
            backgroundColor: 'rgba(247, 183, 41, 0.3)',
            borderColor: '#f7b729',
            borderWidth: 2,
            pointBackgroundColor: '#f7b729',
            pointBorderColor: '#fff',
            pointRadius: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#f7b729'
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: 18 },
        scales: {
          r: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 25,
            ticks: { stepSize: 5 },
            pointLabels: {
              font: { size: 13, family: '"Noto Sans JP", sans-serif' },
              color: '#2c3e50'
            },
            grid: {
              color: 'rgba(44, 62, 80, 0.18)',
              lineWidth: 1.2
            },
            angleLines: {
              color: 'rgba(44, 62, 80, 0.25)',
              lineWidth: 1.2
            }
          },
        },
        plugins: {
          legend: { display: false },
        },
      },
    });
  }

  function renderCareerTypeHighlight(scores) {
    const container = document.getElementById('career-type-highlight');
    if (!container) return;

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    if (!sorted.length) return;

    const maxScore = sorted[0][1];
    const topTypes = sorted.filter(([, score]) => score === maxScore);

    container.innerHTML = '';

    topTypes.forEach(([key, score], index) => {
      const info = CAREER_ANCHORS[key];
      const card = document.createElement('div');
      card.className = `result-type-card type-${key}`;
      card.innerHTML = `
        ${index === 0 ? '<div class="result-type-card__label">あなたのキャリアアンカー</div>' : ''}
        <div class="result-type-card__title">${info.label}</div>
        <div class="result-type-card__score">${score}点</div>
        <div class="result-type-card__desc-box">
          <div class="result-type-card__description">${info.description}</div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function renderFavoritesResult() {
    const list = document.getElementById('favorites-result-list');
    if (!list) return;
    list.innerHTML = '';

    state.favorites.forEach((code) => {
      const question = QUESTION_MAP.get(code);
      if (!question) return;
      const item = document.createElement('div');
      item.className = 'favorite-result-item';
      item.innerHTML = `<span class="favorite-result-icon">★</span> Q${question.id}: ${question.text}`;
      list.appendChild(item);
    });
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
    const maxScore = sorted[0][1];
    const topTypes = sorted.filter(([, score]) => score === maxScore);
    const topLabels = topTypes.map(([key]) => CAREER_ANCHORS[key].label).join('、');
    return topLabels;
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
