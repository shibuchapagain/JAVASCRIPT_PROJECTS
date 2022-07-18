const quizData = [
  {
    question: "Which programming language is best in 2021?",
    a: "Python",
    b: "Java",
    c: "Javascript",
    d: "Flutter",
    correct: "c",
  },
  {
    question: "Capital city of Nepal?",
    a: "Pokhara",
    b: "Kathmandu",
    c: "Bhaktapur",
    d: "Chitwan",
    correct: "b",
  },
  {
    question: "Where is my home town?",
    a: "Parbat",
    b: "Kathmandu",
    c: "Pokhara",
    d: "Jhapa",
    correct: "a",
  },
];

const quiz = document.getElementById("quiz");

const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

const answerEls = document.querySelectorAll(".answer");

let currentQuiz = 0;
let score = 0;

loadQuiz();
function loadQuiz() {
  deselectAnswer();

  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function getSelected() {
  let answer = undefined;

  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

function deselectAnswer() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `<h2>Your score is ${score} out of ${quizData.length} questions.</h2>`;
    }
  }
});
