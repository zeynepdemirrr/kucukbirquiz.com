const questions = [
  {
    question: "Benim adım nedir?",
    answers: [
        { text: "Aylin", correct: false},
        { text: "Cansu", correct: false},
        { text: "Zeynep", correct: true},
        { text: "Banu", correct: false},
      
    ]
  },
  {
      question: "Doğum tarihim ve burcum nedir?",
      answers: [
          { text: "10 mayıs 2002, oğlak", correct: false},
          { text: "10 mayıs 2002, boğa", correct: false},
          { text: "11 mayıs 2001, aslan", correct: false},
          { text: "11 mayıs 2001, boğa", correct: true},
        
      ]
  },

  {
    question: "Hangisi en sevdiğim şarkıcılardan değildir?",
    answers: [
        { text: "Zeynep Bastık", correct: true},
        { text: "Tarkan", correct: false},
        { text: "Serdar Ortaç", correct: false},
        { text: "Gülşen", correct: false},
      
    ]
  },

  {
    question: "En sevdiğim meyve hangisidir?",
    answers: [
        { text: "Muz", correct: false},
        { text: "Karpuz", correct: true},
        { text: "Portakal", correct: false},
        { text: "Kayısı", correct: false},
      
    ]
  },

  {
    question: "En sevdiğim mevsim hangisidir?",
    answers: [
        { text: "Yaz", correct: false},
        { text: "Kış", correct: false},
        { text: "Sonbahar", correct: true},
        { text: "İlkbahar", correct: false},
      
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionsIndex =0;
let score = 0;

function startQuiz(){
  currentQuestionsIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionsIndex];
  let questionNo = currentQuestionsIndex + 1;
  questionElement.innerHTML = questionNo + " . " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);

  });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }
  else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  })
  nextButton.style.display = "block";  
}

function showScore(){
  resetState();
  questionElement.innerHTML = `${questions.length} sorudan ${score} tane bildiniz!`;
  nextButton.innerHTML = "Yeniden Oyna";
  nextButton.style.display = "block";
}


function handleNextButton(){
  currentQuestionsIndex++;
  if(currentQuestionsIndex < questions.length){
    showQuestion();
  }
  else{
    showScore();
  }
}

nextButton.addEventListener("click",()=>{
  if(currentQuestionsIndex < questions.length){
    handleNextButton();
  }
  else{
    startQuiz();
  }
})
startQuiz();



