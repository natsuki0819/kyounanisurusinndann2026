// ======================
// 質問データ
// ======================

const questions = [
  {
    question: "今の体調や気分は？",
    choices: [
      "元気いっぱい",
      "少し疲れている",
      "完全にバテている",
      "やる気が全くない"
    ]
  },
  {
    question: "自由に使える時間は？",
    choices: [
      "5〜30分",
      "1時間以上",
      "半日以上"
    ]
  },
  {
    question: "今いる場所は？",
    choices: [
      "家の中",
      "外・外出先"
    ]
  }
];

// ======================
// 行動リスト
// ======================

const actions = {

  "元気いっぱい":{

    "5〜15分":{

      "家の中":[
        "スクワットを10回する",
        "ストレッチをする",
        "机の上を片付ける"
      ],

      "外・外出先":[
        "少し遠回りして歩く",
        "空を見上げて深呼吸する",
        "写真を1枚撮る"
      ]

    },

    "1時間以上":{

      "家の中":[
        "読書をする",
        "部屋を掃除する",
        "趣味に集中する"
      ],

      "外・外出先":[
        "カフェでゆっくり過ごす",
        "公園を散歩する",
        "買い物へ行く"
      ]

    },

    "半日以上":{

      "家の中":[
        "ゲーム",
        "料理を作る",
        "映画を見る"
      ],

      "外・外出先":[
        "小旅行に行く",
        "自然を見に行く",
        "ショッピングを楽しむ",
        "ご飯を食べに行く"
      ]

    }

  },

  "少し疲れている":{

    "5〜30分":{

      "家の中":[
        "温かい飲み物を飲む",
        "深呼吸をする",
        "好きな音楽を聴く"
      ],

      "外・外出先":[
        "ベンチで休憩する",
        "飲み物を買う",
        "景色を見る",
        "好きな音楽を聴く"
      ]

    },

    "1時間以上":{

      "家の中":[
        "動画を見ながら休む",
        "昼寝する",
        "好きな本を読む"
      ],

      "外・外出先":[
        "カフェで休憩",
        "静かな場所でのんびり"
      ]

    },

    "半日以上":{

      "家の中":[
        "ゆっくり休養する",
        "好きなドラマを見る"
      ],

      "外・外出先":[
        "温泉へ行く",
        "自然の多い場所へ行く"
      ]

    }

  },

  "完全にバテている":{

    "5〜30分":{

      "家の中":[
        "水を飲む",
        "横になる",
        "目を閉じて休む"
      ],

      "外・外出先":[
        "座って休憩する",
        "水分補給する",
        "静かな場所で休憩"
      ]

    },

    "1時間以上":{

      "家の中":[
        "仮眠をとる",
        "何もしない時間を作る",
        "携帯を触るのをやめる"
      ],

      "外・外出先":[
        "早めに帰宅する",
        "静かな場所で休む"
      ]

    },

    "半日以上":{

      "家の中":[
        "今日は休息日",
        "十分な睡眠をとる"
      ],

      "外・外出先":[
        "予定を減らす",
        "無理せず帰宅する"
      ]

    }

  },

  "やる気が全くない":{

    "5〜30分":{

      "家の中":[
        "好きなお菓子を食べる",
        "携帯を触るのをやめる",
        "好きな動画を見る"
      ],

      "外・外出先":[
        "深呼吸する",
        "音楽を聴く"
      ]

    },

    "1時間以上":{

      "家の中":[
        "好きな映画を見る",
        "ゆっくり過ごす"
      ],

      "外・外出先":[
        "カフェで甘いものや温かい飲み物を頼む",
        "本屋へ行く"
      ]

    },

    "半日以上":{

      "家の中":[
        "今日は自分を甘やかす",
        "何もしない日にする"
      ],

      "外・外出先":[
        "即帰宅、早く休んでください",
        "景色を見に行く",
         "音楽を聴く"
      ]

    }

  }

};

// ======================
// 変数
// ======================

let currentQuestion = 0;
let answers = [];

// 要素取得

const questionText = document.getElementById("questionText");
const choicesDiv = document.getElementById("choices");
const questionNumber = document.getElementById("questionNumber");
const progressBar = document.getElementById("progressBar");

const questionScreen = document.getElementById("questionScreen");
const resultScreen = document.getElementById("resultScreen");

const resultText = document.getElementById("resultText");

// ======================
// 質問表示
// ======================

function showQuestion(){

    const q = questions[currentQuestion];

    questionText.textContent = q.question;

    questionNumber.textContent =
        `Question ${currentQuestion+1} / ${questions.length}`;

    progressBar.style.width =
        `${((currentQuestion+1)/questions.length)*100}%`;

    choicesDiv.innerHTML = "";

    q.choices.forEach(choice=>{

        const btn = document.createElement("button");

        btn.className = "choice-btn";

        btn.textContent = choice;

        btn.onclick = ()=>selectAnswer(choice);

        choicesDiv.appendChild(btn);

    });

}

showQuestion();
// ======================
// 回答選択
// ======================

function selectAnswer(answer) {

    answers.push(answer);

    const card = document.getElementById("card");
    card.classList.add("fade-out");

    setTimeout(() => {

        card.classList.remove("fade-out");
        card.classList.add("fade-in");

        setTimeout(() => {
            card.classList.remove("fade-in");
        }, 500);

        currentQuestion++;

        if (currentQuestion < questions.length) {

            showQuestion();

        } else {

            showResult();

        }

    }, 300);

}

// ======================
// 結果表示
// ======================

function showResult() {

    questionScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    const mood = answers[0];
    const time = answers[1];
    const place = answers[2];

    const list = actions[mood][time][place];

    const randomAction =
        list[Math.floor(Math.random() * list.length)];

    resultText.textContent = randomAction;

}

// ======================
// タイマー
// ======================

let timer;
let remainingSeconds = 1800;

const timerDisplay = document.getElementById("timerDisplay");
const minutesInput = document.getElementById("minutesInput");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

function updateTimerDisplay() {

    const min = Math.floor(remainingSeconds / 60);
    const sec = remainingSeconds % 60;

    timerDisplay.textContent =
        `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;

}

updateTimerDisplay();

// スタート

startBtn.addEventListener("click", () => {

    clearInterval(timer);

    if (remainingSeconds <= 0) {

        remainingSeconds = Number(minutesInput.value) * 60;

        updateTimerDisplay();

    }

    timer = setInterval(() => {

        remainingSeconds--;

        updateTimerDisplay();

        if (remainingSeconds <= 0) {

            clearInterval(timer);

            alert("🎉 お疲れさまでした！");

        }

    }, 1000);

});

// 一時停止

pauseBtn.addEventListener("click", () => {

    clearInterval(timer);

});

// リセット

resetBtn.addEventListener("click", () => {

    clearInterval(timer);

    remainingSeconds =
        Number(minutesInput.value) * 60;

    updateTimerDisplay();

});

// 入力時間変更

minutesInput.addEventListener("change", () => {

    clearInterval(timer);

    remainingSeconds =
        Number(minutesInput.value) * 60;

    updateTimerDisplay();

});

// ======================
// もう一度診断
// ======================

document
.getElementById("restartBtn")
.addEventListener("click", () => {

    clearInterval(timer);

    answers = [];

    currentQuestion = 0;

    questionScreen.classList.remove("hidden");
    resultScreen.classList.add("hidden");

    remainingSeconds =
        Number(minutesInput.value) * 60;

    updateTimerDisplay();

    showQuestion();

});
// ======================
// 行動履歴
// ======================

const saveBtn = document.getElementById("saveActionBtn");
const historyList = document.getElementById("historyList");

// 保存

saveBtn.addEventListener("click",()=>{

    const action = resultText.textContent;

    const today = new Date();

    const date =
        today.getFullYear() + "/" +
        (today.getMonth()+1) + "/" +
        today.getDate();

    const history =
        JSON.parse(localStorage.getItem("history")) || [];

    history.unshift({
        date:date,
        action:action
    });

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

    loadHistory();

});

// 表示

function loadHistory(){

    historyList.innerHTML="";

    const history =
        JSON.parse(localStorage.getItem("history")) || [];

    history.forEach(item=>{

        const li=document.createElement("li");

        li.innerHTML=
        `<strong>${item.date}</strong><br>${item.action}`;

        historyList.appendChild(li);

    });

