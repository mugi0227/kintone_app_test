(function () {
    'use strict';

    // --- 定数定義 ---
    const CAREER_TYPES = {
        tf: {
            name: '専門・職能別',
            color: '#e65454',
            description: `「専門・職能別」は自分の得意な分野において、
さらに能力を伸ばしていきたいと考える人たちです。
次項で紹介する「全般管理」と異なり、マネジャーになるのは避けようとします。
専門性を重んじるのが特徴です。

▼ 報酬についての考え方
報酬についての考え方は、給料が高いかどうかより公平であることが重要です。
自分と同程度の能力を持った人と同じだけの報酬を得たいと考えています。

▼ 望むこと
自分の専門能力を成長させる仕事の機会を望んでいます。
自分の専門領域でどんどん挑戦していきたいと考えます。
上司から認められるよりも同じ専門分野の人々から評価されたいと思っています。`
        },
        gm: {
            name: '全般管理',
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
たくさんの部下を持ち多くの予算を与えられる、責任の重い仕事を望んでいます。`
        },
        au: {
            name: '自律・独立',
            color: '#f6c74a',
            description: `「自律・独立」は、できる限り自由を得たいと考える人たちです。
次項の「保障・安定」とは真逆のタイプになります。
仕事上で縛られることをとにかく嫌い、できるなら自営業、
そうでなくてもできるだけ自由を得られる仕事を求めます。

▼ 報酬についての考え方
自由を得るためなら、不安定な給与や福利厚生も受け入れます。
業務委託やパートタイムという働き方も気にしません。

▼ 望むこと
組織のルールから自由でいることを非常に強く望みます。誰しもある程度は自由を求める気持ちを持っていますが、このアンカーの人たちが求める度合いは、他のアンカーの人たちよりも突出しています。`
        },
        se: {
            name: '保障・安定',
            color: '#a8d750',
            description: `「保障・安定」は、保障と安定を維持したいと考える人たちです。
キャリア・アンカーが生まれたアメリカでは比較的少数派である一方、
日本のような集団主義の文化のなかではよく見られます。

▼ 報酬についての考え方
安定した給与や報酬、福利厚生の充実などを望んでいます。
年功序列・終身雇用を好みます。

▼ 望むこと
保障と安定を望むと同時に、会社に対して忠誠心が高く、
会社にも誠実な対応を求めます。`
        },
        ec: {
            name: '起業家的創造性',
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
いつも何かを作り上げることに夢中です。`
        },
        sv: {
            name: '奉仕・社会貢献',
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
社会のためになる仕事を続けて行くことを望みます。`
        },
        ch: {
            name: '純粋な挑戦',
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
解決するのがほとんど不可能であるような難しい問題を求めています。`
        },
        ls: {
            name: 'ライフスタイル',
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
それぞれの個人の状況に合わせて柔軟な対応を話し合える姿勢を求めています。`
        }
    };

    const QUESTIONS = [
        { id: 1, code: 'q_1', text: '専門分野で高い評価を得たい', type: 'tf' },
        { id: 2, code: 'q_2', text: '組織全体を統括して意思決定したい', type: 'gm' },
        { id: 3, code: 'q_3', text: '自分の判断で柔軟に働きたい', type: 'au' },
        { id: 4, code: 'q_4', text: '安定した雇用と生活を最優先したい', type: 'se' },
        { id: 5, code: 'q_5', text: '新しいビジネスを生み出したい', type: 'ec' },
        { id: 6, code: 'q_6', text: '社会や人の役に立つ仕事がしたい', type: 'sv' },
        { id: 7, code: 'q_7', text: '難題を解決することにやりがいを感じる', type: 'ch' },
        { id: 8, code: 'q_8', text: '仕事と私生活のバランスを重視したい', type: 'ls' },
        { id: 9, code: 'q_9', text: '専門知識を深める勉強を続けたい', type: 'tf' },
        { id: 10, code: 'q_10', text: '大きなチームを率いる役割に挑戦したい', type: 'gm' },
        { id: 11, code: 'q_11', text: '働く場所や時間を自分で選びたい', type: 'au' },
        { id: 12, code: 'q_12', text: '長期的に安心できる会社で働きたい', type: 'se' },
        { id: 13, code: 'q_13', text: 'アイデアを形にして価値を生みたい', type: 'ec' },
        { id: 14, code: 'q_14', text: '困っている人を支えることにやりがいを感じる', type: 'sv' },
        { id: 15, code: 'q_15', text: '競争の激しい環境で力を試したい', type: 'ch' },
        { id: 16, code: 'q_16', text: '家族や趣味の時間を十分に確保したい', type: 'ls' },
        { id: 17, code: 'q_17', text: '技術や専門性で第一人者になりたい', type: 'tf' },
        { id: 18, code: 'q_18', text: '経営視点で組織の方向性を決めたい', type: 'gm' },
        { id: 19, code: 'q_19', text: '自分の裁量で仕事の進め方を決めたい', type: 'au' },
        { id: 20, code: 'q_20', text: '福利厚生が充実した会社で働きたい', type: 'se' },
        { id: 21, code: 'q_21', text: 'リスクを取って大きな成果を狙いたい', type: 'ec' },
        { id: 22, code: 'q_22', text: '社会課題の解決に貢献したい', type: 'sv' },
        { id: 23, code: 'q_23', text: '不可能と思うことにも挑みたい', type: 'ch' },
        { id: 24, code: 'q_24', text: '趣味や学びの時間を意識的に作りたい', type: 'ls' },
        { id: 25, code: 'q_25', text: '専門領域で実績を積み重ねたい', type: 'tf' },
        { id: 26, code: 'q_26', text: '会社の戦略立案に深く関わりたい', type: 'gm' },
        { id: 27, code: 'q_27', text: 'フリーランスのような働き方に憧れる', type: 'au' },
        { id: 28, code: 'q_28', text: '定年まで同じ会社で働き続けたい', type: 'se' },
        { id: 29, code: 'q_29', text: '自分の企画でビジネスを成功させたい', type: 'ec' },
        { id: 30, code: 'q_30', text: '次世代のために良い社会を残したい', type: 'sv' },
        { id: 31, code: 'q_31', text: '高い目標に挑戦し続けたい', type: 'ch' },
        { id: 32, code: 'q_32', text: '働く場所や時間を柔軟に選びたい', type: 'ls' },
        { id: 33, code: 'q_33', text: '専門家として周囲に頼られる存在になりたい', type: 'tf' },
        { id: 34, code: 'q_34', text: '複数部門をまとめるリーダーに挑戦したい', type: 'gm' },
        { id: 35, code: 'q_35', text: '上司の指示より自分の判断を優先したい', type: 'au' },
        { id: 36, code: 'q_36', text: '退職金や年金制度が整った会社で安心したい', type: 'se' },
        { id: 37, code: 'q_37', text: '自分の会社を興して経営者になりたい', type: 'ec' },
        { id: 38, code: 'q_38', text: '他者の役に立つことで満足感を得たい', type: 'sv' },
        { id: 39, code: 'q_39', text: '解決困難な問題に立ち向かいたい', type: 'ch' },
        { id: 40, code: 'q_40', text: 'キャリアと家庭の両立を最優先したい', type: 'ls' }
    ];

    const SCORE_FIELDS = {
        tf: 'score_tf',
        gm: 'score_gm',
        au: 'score_au',
        se: 'score_se',
        ec: 'score_ec',
        sv: 'score_sv',
        ch: 'score_ch',
        ls: 'score_ls'
    };
    const FAVORITE_FIELDS = ['favorite_1', 'favorite_2', 'favorite_3'];
    const TYPE_ORDER = ['tf', 'gm', 'au', 'se', 'ec', 'sv', 'ch', 'ls'];

    // --- ユーティリティ ---
    function getFieldValue(record, fieldCode) {
        if (!record) return null;
        const field = record[fieldCode];
        if (field === undefined || field === null) return null;
        // kViewerのバージョンや設定によって { value: ... } 形式か直接の値かが異なる場合に対応
        if (typeof field === 'object' && field !== null && 'value' in field) {
            return field.value;
        }
        return field;
    }

    function getQuestionText(questionId) {
        const q = QUESTIONS.find(q => q.id === parseInt(questionId, 10));
        return q ? q.text : `質問${questionId}`;
    }

    function createEl(tag, className, text) {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (text) el.textContent = text;
        return el;
    }

    // --- メイン処理 ---
    // record.show と view.detail.show の両方を監視 (念のため)
    const eventHandler = function (context) {
        // kViewer context may have record.record or data.record; normalize here
        const record = resolveRecord(context);
        if (!record) {
            console.warn('[kViewer Customization] Record object is missing in context.');
            return context;
        }

        // 必須フィールドの存在チェック
        const missingFields = [];
        const requiredFields = [...Object.values(SCORE_FIELDS), ...FAVORITE_FIELDS, 'career_type_result'];
        requiredFields.forEach(field => {
            const v = getFieldValue(record, field);
            if (v === null || v === undefined) {
                missingFields.push(field);
            }
        });
        if (missingFields.length > 0) {
            console.warn('[kViewer Customization] Missing fields in record:', missingFields);
            console.warn('kViewerのビュー設定で、これらのフィールドが表示対象（メインコンテンツ）に含まれているか確認してください。');

            // 画面上にも警告を表示
            const mainContent = document.querySelector('.kv-main-content') || document.querySelector('.kv-container');
            if (mainContent) {
                // 既存の警告があれば削除
                if (existingWarning) existingWarning.remove();

                const warning = document.createElement('div');
                warning.style.color = 'red';
                warning.style.padding = '10px';
                warning.style.border = '1px solid red';
                warning.style.margin = '10px 0';
                warning.style.background = '#fff0f0';
                warning.textContent = `【設定エラー】以下のフィールドがレコードデータに見つかりません: ${missingFields.join(', ')}。kViewerのビュー設定を確認してください。フィールドコードが一致しているかも確認してください。`;
                mainContent.prepend(warning);
            }
        }

        // 既存のメインコンテンツをクリアまたは非表示にする
        const mainContent = document.querySelector('.kv-main-content') || document.querySelector('.kv-container');
        if (!mainContent) return;

        // 既存のコンテンツを非表示にする
        const existingDetails = mainContent.querySelectorAll('.kv-detail, .kv-record-container');
        existingDetails.forEach(el => el.style.display = 'none');

        // カスタムビューコンテナの作成
        let container = document.getElementById('kv-career-anchor-detail');
        if (container) {
            container.remove(); // 再描画のために一度削除
        }
        container = createEl('div', 'kv-custom-view');
        container.id = 'kv-career-anchor-detail';

        // --- 1. ヘッダーセクション ---
        const headerSection = createEl('div', 'kv-header-section');

        // 日付
        const dateField = record['diagnosis_date'] !== undefined ? 'diagnosis_date' : (record['作成日時'] !== undefined ? '作成日時' : null);
        const dateVal = dateField ? getFieldValue(record, dateField) : null;
        const dateStr = dateVal ? new Date(dateVal).toLocaleDateString('ja-JP') : '-';

        // スコア計算とトップタイプ判定
        const scores = {};
        TYPE_ORDER.forEach(type => {
            const val = getFieldValue(record, SCORE_FIELDS[type]);
            const numVal = val ? parseInt(val, 10) : 0;
            scores[type] = isNaN(numVal) ? 0 : numVal;
        });

        const maxScore = Math.max(...Object.values(scores));
        const topTypes = TYPE_ORDER.filter(type => scores[type] === maxScore);

        // トップタイプカードを縦積み表示
        topTypes.forEach((type, index) => {
            const info = CAREER_TYPES[type];
            const card = createEl('div', `kv-type-card type-${type}`);

            let cardHTML = '';
            if (index === 0) {
                cardHTML += `
                    <div class="kv-type-card__header">
                        <div class="kv-type-card__label">あなたのキャリアアンカー</div>
                        <div class="kv-type-card__date"><span class="kv-label">診断日</span><span class="kv-date-value">${dateStr}</span></div>
                    </div>
                `;
            }
            cardHTML += `
                <h2 class="kv-type-card__title">${info.name}</h2>
                <div class="kv-type-card__score">${scores[type]}点</div>
                <div class="kv-type-card__desc-box">
                    <p class="kv-type-card__desc">${info.description}</p>
                </div>
            `;
            card.innerHTML = cardHTML;
            headerSection.appendChild(card);
        });

        container.appendChild(headerSection);

        // --- 2. グリッドレイアウト (スコアカード & チャート) ---
        const grid = createEl('div', 'kv-result-grid');

        // 左カラム: スコアカード
        const leftCol = createEl('div', 'kv-left-column');
        leftCol.appendChild(createEl('h3', 'kv-section-title', 'スコア内訳'));
        const cardsContainer = createEl('div', 'kv-score-cards-grid');

        TYPE_ORDER.forEach(type => {
            const score = scores[type];
            const info = CAREER_TYPES[type];
            const isTop = topTypes.includes(type);
            const titleHtml = info.name.replace('（', '<br>（');
            const grade = getScoreGrade(score);

            const card = createEl('div', `kv-score-card ${isTop ? 'is-top' : ''}`);
            card.innerHTML = `
        <div class="kv-card-left">
          <div class="kv-card-badge grade-${grade.toLowerCase()}">${grade}</div>
          <div class="kv-card-title">${titleHtml}</div>
        </div>
        <div class="kv-card-score">${score}点</div>
        <div class="kv-card-tooltip">${info.description}</div>
      `;
            cardsContainer.appendChild(card);
        });
        leftCol.appendChild(cardsContainer);
        grid.appendChild(leftCol);

        // 右カラム: チャート
        const rightCol = createEl('div', 'kv-right-column');
        rightCol.appendChild(createEl('h3', 'kv-section-title', 'バランスチャート'));
        const chartWrapper = createEl('div', 'kv-chart-wrapper');
        const canvas = createEl('canvas');
        canvas.id = 'kv-radar-chart';
        chartWrapper.appendChild(canvas);
        rightCol.appendChild(chartWrapper);
        grid.appendChild(rightCol);

        container.appendChild(grid);

        // --- 3. お気に入りセクション ---
        const favSection = createEl('div', 'kv-favorites-section');
        favSection.appendChild(createEl('h3', 'kv-section-title', '選択したお気に入り（+4点ボーナス）'));
        const favList = createEl('div', 'kv-favorites-list');

        FAVORITE_FIELDS.forEach(fieldCode => {
            const val = getFieldValue(record, fieldCode);
            if (val) {
                const match = val.match(/Q(\d+)/i);
                if (match) {
                    const qId = match[1];
                    const text = getQuestionText(qId);
                    const item = createEl('div', 'kv-favorite-item');
                    item.innerHTML = `<span class="kv-favorite-icon">★</span> Q${qId}: ${text}`;
                    favList.appendChild(item);
                } else {
                    const item = createEl('div', 'kv-favorite-item');
                    item.textContent = val;
                    favList.appendChild(item);
                }
            }
        });
        favSection.appendChild(favList);
        container.appendChild(favSection);

        // コンテナをメインコンテンツに追加
        mainContent.appendChild(container);

        // --- 4. チャート描画 (DOM追加後) ---
        if (window.Chart) {
            new Chart(canvas, {
                type: 'radar',
                data: {
                    labels: TYPE_ORDER.map(type => CAREER_TYPES[type].name),
                    datasets: [{
                        label: 'スコア',
                        data: TYPE_ORDER.map(type => scores[type]),
                        backgroundColor: 'rgba(247, 183, 41, 0.3)',
                        borderColor: '#f7b729',
                        borderWidth: 2,
                        pointBackgroundColor: '#f7b729',
                        pointBorderColor: '#fff',
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#f7b729'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: { padding: 18 },
                    scales: {
                        r: {
                            beginAtZero: true,
                            ticks: { stepSize: 5 },
                            suggestedMax: Math.max(...Object.values(scores), 15),
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
                        }
                    },
                    plugins: {
                        legend: { display: false }
                    }
                }
            });
        } else {
            chartWrapper.textContent = 'チャートを表示するには Chart.js を読み込んでください。';
            chartWrapper.style.display = 'flex';
            chartWrapper.style.alignItems = 'center';
            chartWrapper.style.justifyContent = 'center';
            chartWrapper.style.color = '#999';
        }

        return context;
    };


    function getScoreGrade(score) {
        if (score >= 25) return 'S';
        if (score >= 20) return 'A';
        if (score >= 10) return 'B';
        return 'C';
    }

    // --- ヘルパー ---
    function resolveRecord(context) {
        if (!context) return null;
        // kViewer v2: record.record もしくは data.record に kintoneRecord を含むケースがある
        if (context.record && context.record.kintoneRecord) return context.record.kintoneRecord;
        if (context.data && context.data.record && context.data.record.kintoneRecord) return context.data.record.kintoneRecord;
        if (context.record && context.record.record) return context.record.record;
        if (context.record) return context.record;
        if (context.data && context.data.record) return context.data.record;
        return null;
    }

    // --- 一覧ビュー: カードビュー実装 ---

    /**
     * レコードからスコアを計算
     */
    function calculateScoresFromRecord(record) {
        const scores = {};
        TYPE_ORDER.forEach(type => {
            scores[type] = parseInt(record['score_' + type]?.value || 0, 10);
        });
        return scores;
    }

    /**
     * ミニレーダーチャートを描画
     */
    function renderMiniRadarChart(canvas, scores) {
        if (!window.Chart) return;

        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: TYPE_ORDER.map(type => CAREER_TYPES[type].name),
                datasets: [{
                    label: 'スコア',
                    data: TYPE_ORDER.map(type => scores[type]),
                    backgroundColor: 'rgba(247, 183, 41, 0.3)',
                    borderColor: '#f7b729',
                    borderWidth: 2,
                    pointBackgroundColor: '#f7b729',
                    pointBorderColor: '#fff',
                    pointRadius: 2,
                    pointHoverRadius: 4,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#f7b729'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                layout: { padding: 10 },
                scales: {
                    r: {
                        beginAtZero: true,
                        suggestedMax: Math.max(...Object.values(scores), 15),
                        ticks: {
                            stepSize: 5,
                            display: false
                        },
                        pointLabels: {
                            font: { size: 10, family: '"Noto Sans JP", sans-serif' },
                            color: '#2c3e50'
                        },
                        grid: {
                            color: 'rgba(44, 62, 80, 0.15)',
                            lineWidth: 1
                        },
                        angleLines: {
                            color: 'rgba(44, 62, 80, 0.2)',
                            lineWidth: 1
                        }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                }
            }
        });
    }

    /**
     * 一覧ビューのカード表示ハンドラ
     */
    function listViewHandler(context) {
        if (!context.records || context.records.length === 0) return context;

        // 一覧の親コンテナを取得
        const listContainer = document.querySelector('.kv-list');
        if (!listContainer) return context;

        // デバッグ: リストコンテナの内容を確認
        console.log('=== リストコンテナのデバッグ ===');
        console.log('listContainer:', listContainer);
        console.log('listContainer.innerHTML (最初の500文字):', listContainer.innerHTML.substring(0, 500));
        console.log('listContainer内の全要素:', listContainer.children.length);
        console.log('listContainer内の全aタグ:', listContainer.querySelectorAll('a').length);

        // 2秒後にも確認
        setTimeout(() => {
            console.log('=== 2秒後のリストコンテナ ===');
            console.log('listContainer.innerHTML (最初の500文字):', listContainer.innerHTML.substring(0, 500));
            console.log('listContainer内の全aタグ:', listContainer.querySelectorAll('a').length);
            const allLinks = listContainer.querySelectorAll('a');
            allLinks.forEach((link, i) => {
                console.log(`リンク${i}:`, link.textContent.trim(), link.href);
            });
        }, 2000);

        // 既存のカードグリッドがあれば削除
        const existingGrid = document.querySelector('.kv-card-grid-wrapper');
        if (existingGrid) {
            existingGrid.remove();
        }

        // カードグリッドラッパーを作成（リストの外に配置）
        const cardGridWrapper = document.createElement('div');
        cardGridWrapper.className = 'kv-card-grid-wrapper';

        const cardGrid = document.createElement('div');
        cardGrid.className = 'kv-card-grid';

        // リンクを探して追加する関数
        function tryAddLinks() {
            const allLinks = Array.from(document.querySelectorAll('a'));
            const allDetailLinks = allLinks.filter(a => a.textContent.includes('詳細'));

            console.log(`[${Date.now()}] 詳細リンク数:`, allDetailLinks.length);

            if (allDetailLinks.length > 0) {
                const cards = cardGrid.querySelectorAll('.kv-card');
                let addedCount = 0;

                cards.forEach((card, index) => {
                    // 既にリンクが追加されているかチェック
                    if (card.querySelector('.kv-card-detail-link')) return;

                    const detailLinkElement = allDetailLinks[index];
                    if (detailLinkElement) {
                        const infoDiv = card.querySelector('.kv-card-info');
                        const detailLink = detailLinkElement.cloneNode(true);
                        detailLink.className = 'kv-card-detail-link';
                        if (!detailLink.textContent || detailLink.textContent.trim() === '') {
                            detailLink.textContent = '詳細 >';
                        }
                        infoDiv.appendChild(detailLink);
                        addedCount++;
                    }
                });

                if (addedCount > 0) {
                    console.log(`${addedCount}個のカードにリンクを追加しました`);
                    return true;
                }
            }
            return false;
        }

        // 複数のタイミングで試す
        const delays = [100, 300, 500, 1000, 2000];
        delays.forEach(delay => {
            setTimeout(() => {
                if (tryAddLinks()) {
                    console.log(`${delay}ms後にリンク追加成功`);
                }
            }, delay);
        });

        // MutationObserverでリンクが追加されたら即座に検知
        const observer = new MutationObserver((mutations) => {
            for (let mutation of mutations) {
                if (mutation.addedNodes.length > 0) {
                    // 新しいノードが追加された
                    const hasLinks = Array.from(mutation.addedNodes).some(node => {
                        return node.tagName === 'A' || (node.querySelectorAll && node.querySelectorAll('a').length > 0);
                    });

                    if (hasLinks) {
                        console.log('MutationObserver: リンクが追加されました');
                        if (tryAddLinks()) {
                            observer.disconnect(); // 成功したら監視を停止
                        }
                    }
                }
            }
        });

        // リストコンテナを監視
        observer.observe(listContainer, {
            childList: true,
            subtree: true
        });

        context.records.forEach((recordData, index) => {
            // レコードオブジェクトを取得
            const record = recordData.kintoneRecord || recordData.record || recordData;
            if (!record) return;

            const scores = calculateScoresFromRecord(record);
            const maxScore = Math.max(...Object.values(scores));
            const topTypes = TYPE_ORDER.filter(type => scores[type] === maxScore);

            // キャリアタイプテキストを生成
            const typeText = topTypes.map(type => CAREER_TYPES[type].name).join('・');

            // 診断日時を取得
            const diagnosisDate = record.diagnosis_date?.value || record.作成日時?.value || '';
            const dateText = diagnosisDate ? new Date(diagnosisDate).toLocaleDateString('ja-JP') : '';

            // カード要素を作成
            const card = document.createElement('div');
            card.className = 'kv-card';

            // チャートラッパーを作成
            const chartWrapper = document.createElement('div');
            chartWrapper.className = 'kv-card-chart-wrapper';

            const canvas = document.createElement('canvas');
            canvas.className = 'kv-card-chart';
            chartWrapper.appendChild(canvas);

            // 情報エリアを作成
            const infoDiv = document.createElement('div');
            infoDiv.className = 'kv-card-info';

            const typeDiv = document.createElement('div');
            typeDiv.className = 'kv-card-type';
            typeDiv.textContent = typeText;

            const dateDiv = document.createElement('div');
            dateDiv.className = 'kv-card-date';
            dateDiv.textContent = dateText;

            infoDiv.appendChild(typeDiv);
            infoDiv.appendChild(dateDiv);

            card.appendChild(chartWrapper);
            card.appendChild(infoDiv);

            // カードのクリックイベント: テーブルの対応する行をクリック
            card.addEventListener('click', function() {
                // テーブルのtbody内のtr要素を取得
                const tableRows = listContainer.querySelectorAll('tbody tr');
                console.log(`カード${index}クリック: テーブル行数=${tableRows.length}`);

                if (tableRows[index]) {
                    console.log(`テーブルの${index}行目をクリックします`);
                    // 行をクリック
                    tableRows[index].click();
                } else {
                    console.warn(`テーブルの${index}行目が見つかりません`);
                }
            });

            cardGrid.appendChild(card);

            // チャート描画
            setTimeout(() => {
                renderMiniRadarChart(canvas, scores);
            }, 0);
        });

        cardGridWrapper.appendChild(cardGrid);

        // カードグリッドをリストの親要素に追加
        listContainer.parentNode.insertBefore(cardGridWrapper, listContainer);

        return context;
    }

    // イベント登録
    kviewer.events.on('record.show', eventHandler);
    kviewer.events.on('view.detail.show', eventHandler);
    kviewer.events.on('records.show', listViewHandler);

})();
