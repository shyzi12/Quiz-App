let currentQuestion = 0;
let questions = [];
let correctAnswers = 0;
let incorrectAnswers = 0;

function fetchQuestions() {
  const apiUrl = 'https://opentdb.com/api.php?amount=10&type=multiple'; // Updated for 10 questions

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      questions = data.results;
      displayQuestion();
    })
    .catch(error => console.error('Error fetching questions:', error));
}

function displayQuestion() {
  const questionNumberElement = document.getElementById('questionNumber');
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const resultElement = document.getElementById('result');
  const currentQuestionData = questions[currentQuestion];

  if (currentQuestion < questions.length) {
    resultElement.style.display = 'none';

    questionNumberElement.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    questionElement.textContent = currentQuestionData.question;
    optionsElement.innerHTML = '';

    currentQuestionData.incorrect_answers.forEach(option => {
      optionsElement.innerHTML += `<button class="btn btn-light" onclick="checkAnswer(false, this)">${option}</button>`;
    });

    optionsElement.innerHTML += `<button class="btn btn-light" onclick="checkAnswer(true, this)">${currentQuestionData.correct_answer}</button>`;
  } else {
    showResults();
  }
}

function checkAnswer(isCorrect, selectedOption) {
  const options = document.querySelectorAll('.options button');

  if (isCorrect) {
    correctAnswers++;
    selectedOption.style.backgroundColor = '#007bff'; // Blue for correct answers
  } else {
    incorrectAnswers++;
    selectedOption.style.backgroundColor = '#dc3545'; // Red for incorrect answers
  }

  options.forEach(option => {
    option.disabled = true; // Disable all options after selecting one
  });

  currentQuestion++;

  if (currentQuestion < questions.length) {
    setTimeout(() => {
      resetOptions(options);
      displayQuestion();
    }, 1000);
  } else {
    showResults();
  }
}

function resetOptions(options) {
  options.forEach(option => {
    option.disabled = false;
    option.style.backgroundColor = '#fff'; // Reset background color
  });
}

function showResults() {
  const resultElement = document.getElementById('result');
  const correctAnswersElement = document.getElementById('correctAnswers');
  const incorrectAnswersElement = document.getElementById('incorrectAnswers');

  correctAnswersElement.textContent = `Correct Answers: ${correctAnswers}`;
  incorrectAnswersElement.textContent = `Incorrect Answers: ${incorrectAnswers}`;

  resultElement.style.display = 'block';
}

function resetQuiz() {
  currentQuestion = 0;
  questions = [];
  correctAnswers = 0;
  incorrectAnswers = 0;
  fetchQuestions();
}

// Initial fetch
fetchQuestions();
