const questions = {
  Java: [
    { q: 'What is JVM?', a: ['Java Virtual Machine', 'Java Visual Machine', 'Just Virtual Memory', 'None'], correct: 0 },
    { q: 'Which keyword is used to inherit a class in Java?', a: ['implement', 'inherits', 'extends', 'import'], correct: 2 },
    { q: 'Which method is the entry point of a Java program?', a: ['start()', 'main()', 'run()', 'init()'], correct: 1 },
    { q: 'What is the size of int in Java?', a: ['2 bytes', '4 bytes', '8 bytes', 'Depends on system'], correct: 1 },
    { q: 'Which of these is not a Java primitive type?', a: ['int', 'float', 'String', 'boolean'], correct: 2 },
    { q: 'What is the default value of a boolean variable in Java?', a: ['true', 'false', '0', 'null'], correct: 1 },
    { q: 'Which of the following is used to create an object in Java?', a: ['new', 'alloc', 'create', 'malloc'], correct: 0 },
    { q: 'Which of these is a valid access modifier in Java?', a: ['package', 'sealed', 'protected', 'internal'], correct: 2 },
    { q: 'What is method overloading?', a: ['Same method name, different parameters', 'Same method name, different return types', 'Same method name, same parameters', 'Different method names'], correct: 0 },
    { q: 'Which exception is thrown when a required file is not found?', a: ['IOException', 'FileNotFoundException', 'NullPointerException', 'RuntimeException'], correct: 1 }
  ],
  HTML: [
    { q: 'What does HTML stand for?', a: ['Hyper Text Markup Language', 'HighText Machine Language', 'Hyperlink Text Markup Language', 'None'], correct: 0 },
    { q: 'Choose correct HTML element for largest heading?', a: ['<h6>', '<heading>', '<h1>', '<head>'], correct: 2 },
    { q: 'Which HTML tag is used to define an internal style sheet?', a: ['<style>', '<script>', '<css>', '<link>'], correct: 0 },
    { q: 'What is the correct HTML element for inserting a line break?', a: ['<break>', '<br>', '<lb>', '<line>'], correct: 1 },
    { q: 'Which tag is used to create a hyperlink in HTML?', a: ['<a>', '<link>', '<href>', '<hyperlink>'], correct: 0 },
    { q: 'Which attribute is used to open a link in a new tab?', a: ['target="_blank"', 'newtab="true"', 'open="new"', 'window="_blank"'], correct: 0 },
    { q: 'What is the correct way to add a background color in HTML?', a: ['<body style="background-color:yellow;">', '<background>yellow</background>', '<bg>yellow</bg>', '<body bg="yellow">'], correct: 0 },
    { q: 'Which of the following is the correct HTML element for inserting an image?', a: ['<img src="image.jpg" alt="MyImage">', '<image src="image.jpg">', '<img>image.jpg</img>', '<pic src="image.jpg">'], correct: 0 },
    { q: 'Which HTML tag is used to define a table row?', a: ['<tr>', '<td>', '<th>', '<row>'], correct: 0 },
    { q: 'What is the purpose of the <alt> attribute in the <img> tag?', a: ['Specifies image size', 'Provides alternate text', 'Adds styling', 'Links image'], correct: 1 }
  ],
  CSS: [
    { q: 'What does CSS stand for?', a: ['Cascading Style Sheets', 'Colorful Style Sheets', 'Computer Style Sheets', 'Creative Style Sheets'], correct: 0 },
    { q: 'Which CSS property changes the text color?', a: ['fgcolor', 'color', 'text-color', 'font-color'], correct: 1 },
    { q: 'Which property is used to change the background color?', a: ['color', 'bgcolor', 'background-color', 'background'], correct: 2 },
    { q: 'Which CSS property controls the text size?', a: ['font-style', 'text-size', 'font-size', 'text-style'], correct: 2 },
    { q: 'How do you select an element with id "header"?', a: ['#header', '.header', 'header', '*header'], correct: 0 },
    { q: 'How do you make text bold in CSS?', a: ['font-weight: bold;', 'text-bold: true;', 'font: bold;', 'weight: bold;'], correct: 0 },
    { q: 'What is the default position value of an HTML element?', a: ['static', 'absolute', 'fixed', 'relative'], correct: 0 },
    { q: 'Which property is used to change the font of an element?', a: ['font-family', 'font-style', 'font-weight', 'text-font'], correct: 0 },
    { q: 'Which symbol is used for class selectors in CSS?', a: ['.', '#', '*', '@'], correct: 0 },
    { q: 'How do you add a comment in CSS?', a: ['/* this is a comment */', '// this is a comment', '<!-- this is a comment -->', '# this is a comment'], correct: 0 }
  ]
};

let currentSection = 'Java';
let currentQuestion = 0;
let userAnswers = { Java: [], HTML: [], CSS: [] };
let timerSeconds = 30 * 60;

const timerDisplay = document.getElementById('timer');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const sectionSelect = document.getElementById('sectionSelect');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const resultsEl = document.getElementById('results');
const scoreEl = document.getElementById('score');
const reviewEl = document.getElementById('answersReview');

function startTimer() {
  setInterval(() => {
    if (timerSeconds > 0) {
      timerSeconds--;
      const minutes = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
      const seconds = String(timerSeconds % 60).padStart(2, '0');
      timerDisplay.textContent = `${minutes}:${seconds}`;
    } else {
      submitQuiz();
    }
  }, 1000);
}

function loadQuestion() {
  const q = questions[currentSection][currentQuestion];
  userAnswers[currentSection][currentQuestion] ??= null;
  questionEl.textContent = `${currentQuestion + 1}. ${q.q}`;
  optionsEl.innerHTML = '';
  q.a.forEach((option, index) => {
    const checked = userAnswers[currentSection][currentQuestion] === index ? 'checked' : '';
    const safeOption = option.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    optionsEl.innerHTML += `
      <div class="form-check option">
        <input class="form-check-input" type="radio" name="option" id="option${index}" value="${index}" ${checked}>
        <label class="form-check-label" for="option${index}">${safeOption}</label>
      </div>`;
  });
}

optionsEl.addEventListener('change', (e) => {
  userAnswers[currentSection][currentQuestion] = parseInt(e.target.value);
});

sectionSelect.addEventListener('change', () => {
  currentSection = sectionSelect.value;
  currentQuestion = 0;
  loadQuestion();
});

prevBtn.onclick = () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
};

nextBtn.onclick = () => {
  if (currentQuestion < questions[currentSection].length - 1) {
    currentQuestion++;
    loadQuestion();
  }
};

submitBtn.onclick = submitQuiz;

function submitQuiz() {
  document.getElementById('quizBox').style.display = 'none';
  resultsEl.style.display = 'block';
  let totalScore = 0;
  reviewEl.innerHTML = '';
  for (const section in questions) {
    reviewEl.innerHTML += `<h5>${section} Section:</h5>`;
    questions[section].forEach((q, index) => {
      const userAns = userAnswers[section][index];
      const correct = q.correct;
      const correctText = q.a[correct];
      const userText = q.a[userAns] || 'No Answer';
      if (userAns === correct) totalScore++;
      reviewEl.innerHTML += `
        <p><strong>Q:</strong> ${q.q}<br>
        <strong>Your Answer:</strong> ${userText}<br>
        <strong>Correct Answer:</strong> ${correctText}</p><hr>`;
    });
  }
  scoreEl.textContent = totalScore;
}

startTimer();
loadQuestion();
