// setting up JS variables for DOM manipulation
var quizBody = document.querySelector("#quiz");
var resultEl = document.querySelector("#result");
var finalScoreEl = document.querySelector("#finalScore");
var gameoverDiv = document.querySelector("#gameover");
var questionsEl = document.querySelector("#questions");
var quizTimer = document.querySelector("#timer");
var startQuizbtn = document.querySelector("#startbtn");
var startQuizDiv = document.querySelector("#startpage");
var highscoreContainer = document.querySelector("#highscoreContainer");
var highScoreDiv = document.querySelector("#highscorePage");
var highscoreInputName = document.querySelector("#initials");
var highscoreDisplayName = document.querySelector("#highscore-initials");
var endGamebtns = document.querySelector("#endGameBtn");
var submitScoreBtn = document.querySelector("#submitScore");
var displayHighscore = document.querySelector("#highscore-score");
var btnA = document.querySelector("#choiceA");
var btnB = document.querySelector("#choiceB");
var btnC = document.querySelector("#choiceC");
var btnD = document.querySelector("#choiceD");

// Storing questions in an array of objects to loop through later
var questions = [{
    question: "Where is the correct place to insert Javascript files?",
    choiceA: "Both the <head> and <body> sections",
    choiceB: "the <body> section only",
    choiceC: "the <head> section only",
    choiceD:"the <title> section only",
    correctAnswer: "b"},
    {
    question: "How do you create a function?",
    choiceA: "function:myFunction()",
    choiceB: "function=myFunction()",
    choiceC: "function myFunction()", 
    choiceD: "myFunction():function",
    correctAnswer: "c"},
    {
    question: "How do you call a function named myFunction()?",
    choiceA: "call myFunction()",
    choiceB: "myFunction()",
    choiceC: "call function myFunction",
    choiceD: "Call.myFunction()",
    correctAnswer: "b"},
    {
    question:"How do you write a conditional statement for executing some statements only if i is equal to 5?",
    choiceA: "if i==5 then",
    choiceB: "if (i==5){",
    choiceC: "if i=5 then",
    choiceD: "if i=5",
    correctAnswer: "b"},
    {
    question:"How does a for loop start?",
choiceA: "for (i = 0; i <= 5)",
choiceB: "for (i = 0; i <= 5; i++)",
choiceC: "for i = 1 to 5",
choiceD: "for (i <= 5; i++)",
correctAnswer: "b",},
];

//More variables for later DOM manipulation
var finalQuestionIndex = questions.length;
var currentQuentionIndex = 0;
var timeLeft = 65;
var timerInterval;
var score = 0;
var correct;
var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];

// funtion generating quiz questions and answers
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if(currentQuentionIndex === finalQuestionIndex){
        return showScore();
    }
    var currentQuestion = questions[currentQuentionIndex];
    questionsEl.textContent = currentQuestion.question 
    btnA.textContent = currentQuestion.choiceA;
    btnB.textContent = currentQuestion.choiceB;
    btnC.textContent = currentQuestion.choiceC;
    btnD.textContent = currentQuestion.choiceD;
};

//Hitting start quiz button starts the timer and the generates the questions
function startQuiz(){
    gameoverDiv.style.display="none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    // timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}

// Shows user's score after completing the quiz or when timer runs out
function showScore(){
    quizBody.style.display = "none";
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.textContent = "You got " + score + " out of " + questions.length + " correct!";
}


// hitting the submit highscore button lets us store the high score and user name into local storage
submitScoreBtn.addEventListener("click", function highscore(){
    if (highscoreInputName.value === "") {
        alert("initials cannot be empty, please enter a value")
        return false;
    }else{
        // var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score: score,
        };
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highScoreDiv.style.display = "block";
        endGamebtns.style.display= "flex";
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighScores", JSON.stringify(savedHighscores));
        generateHighscores();
    }
});
// generates high score list from local storage
function generateHighscores(){
    highscoreDisplayName.textContent = "";
    displayHighscore.textContent = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighScores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("p");
        var newScoreSpan = document.createElement("p");
        newNameSpan.textContent = "Name: " + highscores[i].name;
        newScoreSpan.textContent ="Score: " + highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        displayHighscore.appendChild(newScoreSpan);
    }
}
// function shows the high scores page and hides other sections of the page
function showHighscore(){
    startQuizDiv.style.display="none";
    gameoverDiv.style.display="none";
    highscoreContainer.style.display="flex";
    highScoreDiv.style.display = "block";
    endGamebtns.style.display = "flex";
    generateHighscores();
}

// clears local storage of previously stored high scores and clearing the text from the high score board
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    displayHighscore.textContent = "";
}

// allows user to replay quiz by setting all the variables to their original values
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 65;
    score = 0;
    currentQuentionIndex = 0;
}
// function checks the answers for each question
function checkAnswer(answer){
    correct = questions[currentQuentionIndex].correctAnswer;
    if (answer === correct && currentQuentionIndex !== finalQuestionIndex){
        score ++;
        alert("That is correct!")
        currentQuentionIndex++;
        generateQuizQuestion();
    }else if (answer !== correct && currentQuentionIndex !== finalQuestionIndex){
        alert("That is incorrect!")
        currentQuentionIndex++;
        timeLeft -=5;
        generateQuizQuestion();
    }else{
        showScore();
    }
}
// hitting the start quiz button starts the quiz
startQuizbtn.addEventListener("click",startQuiz);
