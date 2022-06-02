let q={}
let quizData= [];
fetch('http://localhost:3000/questions')
.then(response => response.text())
.then(data => {
    q = JSON.parse(data);
    quizData= q.questions;
    
    // Getting where to insert the questions
    
    const quiz = document.getElementById("quiz");
    const answerEls = document.querySelectorAll(".answer");
    const questionEl = document.getElementById("question");
    const a_text = document.getElementById("a_text");
    const b_text = document.getElementById("b_text");
    const c_text = document.getElementById("c_text");
    const nextButton = document.getElementById("submit");
    
    
    let currentQuiz = 0;
    var score= 0;
    
    loadQuiz();
    
    // Function that loads question
    function loadQuiz() {
        // First Deselect Default Option
        deselectAnswer();
        const currentQuizData = quizData[currentQuiz];
        questionEl.innerText = currentQuizData.question; // Main Question
        a_text.innerText = currentQuizData.a; // Option a
        b_text.innerText = currentQuizData.b; // Option b
        c_text.innerText = currentQuizData.c; // Option c
    }
    
    // Deselection Default Option
    function deselectAnswer() {
        answerEls.forEach((answerEl) => {
            answerEl.checked = false;
    });
}

// Get Selected Option
const getSelected = () => {
    let answer;
    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
};

nextButton.addEventListener("click", () => {
    // Check to see the answer
    const answer = getSelected();

    if (answer === quizData[currentQuiz].correct) {
        score++;
        alert('Your answer is CORRECT');
      } else {
          alert('Your answer is INCORRECT. \nThe correct Option is: '+ quizData[currentQuiz].correct);
        }
    // Increment Upon Click
    currentQuiz++;
    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        quiz.innerHTML = `
        <h2>You answered ${score} out of ${quizData.length} correctly.</h2>
         <button onclick="location.reload()">Retake Quiz!</button>
         <a href="http://localhost:3000/" class="button">Back to Home Page</a>
         `;
        }
    });
})
.catch(error => {
    // handle the error
    console.log(error)
});