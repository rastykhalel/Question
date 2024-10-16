let words = [];
let correctwords = [];
let wrongwords = [];
let score = 0;
let questionIndex = 0;
const totalQuestions = 10;
let currentQuestion = null;
let correctAnswer = null;
let usedIndices = []; // Array to store used indices


// Use fetch() to load the JSON file in a browser environment
fetch('./assets/new.json')
  .then(response => response.json())
  .then(data => {
    words = data.words;
    generateQuestion(); // Start the game after loading the words
  })
  .catch(error => {
    console.error('Error loading JSON file:', error);
  });

// Function to transform the word by swapping 'ح' and 'ع'
function transformWord(word) {
  if (word.includes('ح')) {
    return word.replace(/ح/g, 'ع');
  } else if (word.includes('ع')) {
    return word.replace(/ع/g, 'ح');
  }
  return word;
}

// Function to generate a question
function generateQuestion() {
  if (words.length === 0) {
    console.error('No words available');
    return;
  }
  
 
  let randomIndex;

  // Generate a new random index that hasn't been used yet
  do {
    randomIndex = Math.floor(Math.random() * words.length);
    
  } while (usedIndices.includes(randomIndex)); // Keep looping if the index is already used

  // Mark this index as used
  usedIndices.push(randomIndex);

  currentQuestion = words[randomIndex];


  const wrongAnswer = transformWord(currentQuestion);
  correctAnswer = currentQuestion;

  const options = [correctAnswer, wrongAnswer].sort(() => Math.random() - 0.5);

  document.getElementById('options-container').innerHTML = `
    <button class="btn btn-outline-dark" onclick="checkAnswer('${options[0]}')">${options[0]}</button>
    <button class="btn btn-outline-dark" onclick="checkAnswer('${options[1]}')">${options[1]}</button>
  `;
}

// Function to check the answer and update score
function checkAnswer(selectedAnswer) {
  if (selectedAnswer === correctAnswer) {
    score++;
    correctwords.push(selectedAnswer);
  }else{
    wrongwords.push(selectedAnswer);
  }
  document.getElementById('score-container').innerText = `وەڵام ڕاست ${score}`;
  document.getElementById('score-containerf').innerText = `وەڵام هەڵە ${questionIndex+1-score}`;
  document.getElementById('prsyarnum').innerText = ` پرسیاری ${questionIndex + 2}`;
  
  nextQuestion();
}

// Function to load the next question or end the game
function nextQuestion() {
  questionIndex++;
  if (questionIndex < totalQuestions) {
    generateQuestion();
  } else {
    document.getElementById('question-container').innerHTML = 
    `خاڵی بەدەستهاتوو بریتیە لە <span class="bg-body-secondary rounded-3 p-2 mb-3" style="font-size: small;">${score}</span>`;
    document.getElementById('options-container').innerHTML = '<button class="btn btn-outline-dark" onClick="window.location.reload();">دووبارەکردنەوە</button>';
    document.getElementById('prsyarnum').style.display = 'none';
    document.getElementById('score-container').innerText = `وەڵامە ڕاستەکان \n ${correctwords.join( '\n')}`;
  document.getElementById('score-containerf').innerText = `وەڵامە هەڵەکان \n ${wrongwords.join(  '\n')}`;
 
  }
}
