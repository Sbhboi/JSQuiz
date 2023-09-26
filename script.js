const questions = [
    {
        question: "What company makes the Xperia model of smartphone?",
        answers: [
            { text: "Samsung", correct: false},
            { text: "Sony", correct: true},
            { text: "Nokia", correct: false},
            { text: "Alcatel", correct: false},
        ]
    },
    {
        question: "In which Italian city can you find the Colosseum?",
        answers: [
            { text: "Venice", correct: false},
            { text: "Rome", correct: true},
            { text: "Naples", correct: false},
            { text: "Milan", correct: false},
        ]
    },
    {
        question: "What is the largest canyon in the world?",
        answers: [
            { text: "Verdon Gorge, France", correct: false},
            { text: "King's Canyon, Australia", correct: false},
            { text: "Kali Gandaki, Nepal", correct: true},
            { text: "Fjaðrárgljúfur Canyon, Iceland", correct: false},
        ]
    },
    {
        question: "What is the largest active volcano in the world?",
        answers: [
            { text: "Mount Etna", correct: false},
            { text: "Mount Vesuvius", correct: false},
            { text: "Mouna Loa", correct: true},
            { text: "Mount Batur", correct: false},
        ]
    },
    {
        question: "What is the largest continent in size?",
        answers: [
            { text: "Asia", correct: true},
            { text: "Africa", correct: false},
            { text: "Europe", correct: false},
            { text: "North America", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

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
        selectedBtn.classList.add("Correct");
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

