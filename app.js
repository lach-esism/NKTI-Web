const sampleQuestionsText = `---Q---
期末周到来时，你更像哪种人？
---A---
主动拉群、列清单、安排复习节奏
---B---
先自己消化，再悄悄推进计划
---C---
看心情，想到哪学到哪
---Q---
面对校园传说，你更愿意相信？
---A---
亲眼所见的细节和证据
---B---
氛围、象征和背后的隐喻
---C---
都可以，图一乐
---Q---
朋友找你倾诉时，你通常会？
---A---
先帮他分析问题和解决办法
---B---
先共情，照顾他的感受
---C---
边听边随机发挥
---Q---
准备一次展示汇报时，你更习惯？
---A---
提前规划流程和时间点
---B---
先搭大概框架，后面再调整
---C---
到时候灵感来了再说`;

const dimensionOrder = ["EI", "SN", "TF", "JP"];

const state = {
  questions: [],
  answers: [],
  currentIndex: 0
};

const progressText = document.getElementById("progressText");
const progressInner = document.getElementById("progressInner");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const tipText = document.getElementById("tipText");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

function parseQuestions(text) {
  const lines = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  const list = [];
  let current = { text: "", optA: "", optB: "", optC: "", dimension: "EI" };
  let stateFlag = 0;
  let qCount = 0;

  for (const line of lines) {
    if (line === "---Q---") {
      if (qCount > 0) {
        current.dimension = dimensionOrder[(qCount - 1) % 4];
        list.push(current);
      }
      current = { text: "", optA: "", optB: "", optC: "", dimension: "EI" };
      stateFlag = 1;
      qCount += 1;
      continue;
    }

    if (line === "---A---") {
      stateFlag = 2;
      continue;
    }
    if (line === "---B---") {
      stateFlag = 3;
      continue;
    }
    if (line === "---C---") {
      stateFlag = 4;
      continue;
    }

    if (stateFlag === 1) current.text = line;
    if (stateFlag === 2) current.optA = line;
    if (stateFlag === 3) current.optB = line;
    if (stateFlag === 4) current.optC = line;
  }

  if (qCount > 0) {
    current.dimension = dimensionOrder[(qCount - 1) % 4];
    list.push(current);
  }

  return list.filter(item => item.text && item.optA && item.optB && item.optC);
}

async function loadQuestions() {
  try {
    const response = await fetch("./questions.txt");
    if (!response.ok) throw new Error("题库读取失败");
    const text = await response.text();
    const parsed = parseQuestions(text);
    if (!parsed.length) throw new Error("题库格式为空");
    return parsed;
  } catch (error) {
    const sample = parseQuestions(sampleQuestionsText);
    const badge = document.createElement("p");
    badge.className = "tip-text";
    badge.textContent = "当前正在使用示例题库。把你 Qt 项目里的 questions.txt 覆盖到网页版同目录即可切换为正式题库。";
    document.querySelector(".quiz-card").insertBefore(badge, document.getElementById("questionSection"));
    return sample;
  }
}

function renderQuestion() {
  const question = state.questions[state.currentIndex];
  const total = state.questions.length;

  progressText.textContent = `第 ${state.currentIndex + 1} 题 / 共 ${total} 题`;
  questionText.textContent = question.text;
  progressInner.style.width = `${((state.currentIndex + 1) / total) * 100}%`;
  optionsContainer.innerHTML = "";

  [question.optA, question.optB, question.optC].forEach((option, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    if (state.answers[state.currentIndex] === index) {
      btn.classList.add("selected");
    }
    btn.textContent = option;
    btn.addEventListener("click", () => {
      state.answers[state.currentIndex] = index;
      tipText.classList.add("hidden");
      renderQuestion();
    });
    optionsContainer.appendChild(btn);
  });

  prevBtn.disabled = state.currentIndex === 0;
  nextBtn.textContent = state.currentIndex === total - 1 ? "查看结果" : "下一题";
}

function answerToScore(answer) {
  if (answer === 0) return 2;
  if (answer === 1) return -2;
  return 0;
}

function calculateResult() {
  let ei = 0;
  let sn = 0;
  let tf = 0;
  let jp = 0;

  state.questions.forEach((question, index) => {
    const answer = state.answers[index];
    if (answer === undefined || answer === null || answer < 0) return;
    const score = answerToScore(answer);
    if (question.dimension === "EI") ei += score;
    if (question.dimension === "SN") sn += score;
    if (question.dimension === "TF") tf += score;
    if (question.dimension === "JP") jp += score;
  });

  const code = `${ei >= 0 ? "E" : "I"}${sn >= 0 ? "S" : "N"}${tf >= 0 ? "T" : "F"}${jp >= 0 ? "J" : "P"}`;
  window.location.href = `./result.html?code=${encodeURIComponent(code)}&tf=${encodeURIComponent(tf)}`;
}

function resetQuiz() {
  state.answers = new Array(state.questions.length).fill(null);
  state.currentIndex = 0;
  tipText.classList.add("hidden");
  renderQuestion();
}

nextBtn.addEventListener("click", () => {
  if (state.answers[state.currentIndex] === null || state.answers[state.currentIndex] === undefined) {
    tipText.classList.remove("hidden");
    return;
  }

  if (state.currentIndex === state.questions.length - 1) {
    calculateResult();
    return;
  }

  state.currentIndex += 1;
  tipText.classList.add("hidden");
  renderQuestion();
});

prevBtn.addEventListener("click", () => {
  if (state.currentIndex === 0) return;
  state.currentIndex -= 1;
  tipText.classList.add("hidden");
  renderQuestion();
});

restartBtn.addEventListener("click", resetQuiz);

loadQuestions().then(questions => {
  state.questions = questions;
  state.answers = new Array(questions.length).fill(null);
  state.currentIndex = 0;
  renderQuestion();
});
