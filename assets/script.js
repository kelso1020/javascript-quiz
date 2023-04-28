// setting variables for ids and classes in index
var quizInstructions = document.querySelector("#quiz-instructions")
var startButton = document.querySelector("#start");
var quizContainer = document.querySelector(".quiz-container")
var currentQuestion = document.querySelector("#display-question")

// this make the quiz container invisible when page loads
quizContainer.style.display = "none";

// when the start button is clicked,
// a timer starts at 60 seconds and counts down to zero
startButton.addEventListener("click", function() {

    var secondsLeft = 60;

    var quizTimer = setInterval(function(){
        if(secondsLeft <= 0){
            clearInterval(quizTimer);
            // when the timer is up finished will display
            document.getElementById("countdown").textContent = "Finished";
            scoreBoard();
         } else {
           document.getElementById("countdown").textContent = secondsLeft + " seconds remaining";
        }
  secondsLeft -= 1;
}, 1000);
// when the start button is clicked, the showquiz function is called
showQuiz();
});

// this function will make the quiz container visible
function showQuiz() {    
    quizContainer.style.display = "flex";
}

//this would be the object shape for storing the questions  
 //you can change the questions to your own taste or even add more questions..
 const questions = [
    {
        question: "Which is not a primitive type in javascript?",
        optionA: "number",
        optionB: "boolean",
        optionC: "5 string",
        optionD: "element",
        correctOption: "optionD"
    },

    {
        question: "Which set of characters is used in a logical AND statement?",
        optionA: "++",
        optionB: "&&",
        optionC: "||",
        optionD: "//",
        correctOption: "optionB"
    },

    {
        question: "Which set of characters is used in a logical OR statement?",
        optionA: "><",
        optionB: "<=",
        optionC: "--",
        optionD: "||",
        correctOption: "optionD"
    },

    {
        question: "Boolean logic uses which set of characters?",
        optionA: "( ) { }",
        optionB: "+ - * / ",
        optionC: "< > <= >=",
        optionD: "@ # % ?",
        correctOption: "optionC"
    },

    {
        question: "In the sentence 'Hi, my name is Jack?', which character is at the index of 5?",
        optionA: "p",
        optionB: "z",
        optionC: "h",
        optionD: "m",
        correctOption: "optionD"
    },

    {
        question: "When added to the end of a string, method .length will result in?",
        optionA: "amount of characters in string",
        optionB: "string index",
        optionC: "font size of string",
        optionD: "line height of string",
        correctOption: "optionA"
    },

    {
        question: "if/else statements contain:",
        optionA: "only one if and one else statement each",
        optionB: "one if statement and multiple else statements",
        optionC: "one if statement followed by else if statements, followed by a final else statement",
        optionD: "multiple if statements and one else statement",
        correctOption: "optionC"
    },

    {
        question: "How long will a while loop run for?",
        optionA: "as long as the conditional is true",
        optionB: "forever",
        optionC: "only once",
        optionD: "ten times",
        correctOption: "optionA"
    },

    {
        question: "Which of the following is considered a number in javascript?",
        optionA: "positive numbers",
        optionB: "whole numbers",
        optionC: "decimals",
        optionD: "all of the above",
        correctOption: "optionD"
    },

    {
        question: "Which of the following is the inequality operator?",
        optionA: "notEqual()",
        optionB: "-=",
        optionC: "--",
        optionD: "!=",
        correctOption: "optionD"
    },
]

// empty array that eill hold the quiz questions
let randomQuestion = []

// there are 10 questions, so as long as the question number is less
// than or equal to 9, another random question will be pushed to replace it
function handleQuestions() { 
    
    while (randomQuestion.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!randomQuestion.includes(random)) {
            randomQuestion.push(random)
        }
    }
}


let playerScore = 0
let indexNumber = 0 //will be used in displaying next question

// when next question function is called, a random question is displayed
// along with its corresponding multiple choice answers
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = randomQuestion[index]
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}

function checkForAnswer() {
    const currentQuestion = randomQuestion[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++ //adding 1 to index so has to display next question..
            //set to delay question number till when next question loads
            setTimeout(() => {
                
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
             // when chosen answer is incorrect, answer button background will display red
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            // and the correct answer will be revealed with a green background display
            document.getElementById(correctOption).style.backgroundColor = "green"
            indexNumber++
            secondsLeft = (-2)
            //set to delay question number till when next question loads
            setTimeout(() => {
            }, 1000)
        }
    })
}


var finalScore = document.querySelector("#score")


//called when the next button is called
function handleNextQuestion() {
    checkForAnswer() //check if player picked right or wrong option
    unCheckRadioButtons()
    //delays next question displaying for a second just for some effects so questions don't rush in on player
    setTimeout(() => {
        if (indexNumber <= 9) {
//displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
            NextQuestion(indexNumber)
        }
        else {
            document.getElementById('scoreboard-modal').style.display = "flex";
            finalScore.textContent = playerScore;
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// when all of the questions have been answered or the timer has run out, the scoreboard will display
function scoreBoard() {
    document.getElementById('scoreboard-modal').style.display = "flex"
     // injecting the number of correctly answered questions to the scoreboard
    finalScore.textContent = playerScore;
}

// when the enterhighscore button is clicked, user's initials will be saved and printed with quiz score
var enterHighScore = document.querySelector("#enter-highscore");

enterHighScore.addEventListener("click", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
        localStorage.setItem("text", username); 
        localStorage.setItem("score", playerScore);
    var scoreList = document.querySelector("#high-score-list")
    scoreList.textContent = localStorage.getItem("text") + ': ' + localStorage.getItem("score");

});

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}