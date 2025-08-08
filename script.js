
// ✅ Main Functional Script for Quiz App

const questions = [
  { q: "What is the capital of India?", options: ["Delhi", "Mumbai", "Kolkata", "Chennai"], answer: 0 },
  { q: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: 1 },
  { q: "What is 5 + 3?", options: ["5", "10", "8", "15"], answer: 2 },
  { q: "What is the boiling point of water?", options: ["50°C", "100°C", "150°C", "200°C"], answer: 1 },
  { q: "Which language is used for web development?", options: ["HTML", "Python", "C++", "Java"], answer: 0 },
  { q: "What color is the sky?", options: ["Green", "Yellow", "Red", "Blue"], answer: 3 },
  { q: "Which animal is known as the king of jungle?", options: ["Tiger", "Elephant", "Lion", "Bear"], answer: 2 },
  { q: "Which device is used to type?", options: ["Monitor", "Keyboard", "Mouse", "Speaker"], answer: 1 },
  { q: "Which device is output device?", options: ["Keyboard", "Mouse", "Monitor", "lightpen"], answer: 2 },
  { q: "Which Windows version is latest?", options: ["Windows XP", "Windows 10", "Windows 8", "Windows 10"], answer: 3 }
];

let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);
let timerInterval;
let timeLeft = 300; // 5 minutes
let anssave = document.getElementById('anssave')

const qsEl = document.getElementById("qs");
const optionEl = document.getElementById("option");
const inputEl = document.querySelector("#questions input");
const timerEl = document.getElementById("timer");

function ShowQuestions() {
  document.getElementById("startPage").style.display = "none";
  document.getElementById("examPortel").style.display = "flex";
  document.getElementById("nextPrev").style.display = "block";
  loadQuestion(currentQuestionIndex);
  startTimer();
}

function loadQuestion(index) {
  const q = questions[index];
  qsEl.textContent = `Q${index + 1}. ${q.q}`;
  optionEl.innerHTML = q.options
    .map((opt, i) => `<h3>${i + 1}. ${opt}</h3>`)
    .join("");
  inputEl.value = userAnswers[index] !== null ? userAnswers[index] + 1 : "";
  anssave.innerHTML = ''
}

function ChangeQuestion(n) {
  if (n >= 1 && n <= questions.length) {
    saveAnswer();
    currentQuestionIndex = n - 1;
    loadQuestion(currentQuestionIndex);
  }
}

function saveAnswer() {
  const userInput = parseInt(inputEl.value);
  if (!isNaN(userInput) && userInput >= 1 && userInput <= 4) {
    userAnswers[currentQuestionIndex] = userInput - 1;
  }
}

function fun() {
  if(inputEl.value == ''){
    alert('please enter your answer first')
 }else if(inputEl.value < 1 || inputEl.value > 4){
    alert('ENTER NUMBER FROM 1 TO 4 OPTION')
  }else{
    saveAnswer();
    anssave.innerHTML = 'Answer Saved !!!'
  }
}

document.getElementById("next").addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    saveAnswer();
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
  }
});

document.getElementById("prev").addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    saveAnswer();
    currentQuestionIndex--;
    loadQuestion(currentQuestionIndex);
  }
});

function startTimer() {
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      closeTest(true);
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerEl.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function closeTest(auto = false) {
  if (auto || confirm("Are you sure you want to submit the exam?")) {
    saveAnswer();
    clearInterval(timerInterval);
    document.getElementById("startPage").style.display = "none";
    document.getElementById("examPortel").style.display = "none";
    document.getElementById("nextPrev").style.display = "none";
    document.getElementById("closeTestBro").style.display = "block";
    showResult();
  }
}

function showResult() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  const resultHeading = document.querySelector("#closeTestBro h1:nth-of-type(2)");
  if (resultHeading) {
    resultHeading.textContent = `YOUR RESULT IS : ${score}`;
  }

  const messageEl = document.getElementById('resultMessage');
  if (messageEl) {
    if (score >= 8) {
      messageEl.textContent = 'Amazing !! You are merit in quiz test';
    } else if (score >= 5 && score < 8) {
      messageEl.textContent = 'You are pass in quiz exam';
    } else {
      messageEl.textContent = 'Better luck next time';
    }
  }
}



document.querySelectorAll(".btn3").forEach((btn, idx) => {
  btn.addEventListener("click", () => ChangeQuestion(idx + 1));
});

window.ShowQuestions = ShowQuestions;
window.closeTest = closeTest;
window.fun = fun;
