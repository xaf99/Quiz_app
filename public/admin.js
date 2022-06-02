let q={}
let quizData= [];
fetch('http://localhost:3000/questions')
.then(response => response.text())
.then(data => {
    q = JSON.parse(data);
    quizData= q.questions;
    let length= quizData.length;
    document.getElementById("submitForm").addEventListener("click", function(event){
        let valElem = document.getElementById("correct").value;
        console.log(valElem)
        if (valElem == 'blank') {
            event.preventDefault();
            alert('Please Choose the Option Value');
        }
        if(length >= 5) {
        event.preventDefault();
        alert('You have exceed the limit as you can only add 5 QUESTIONS.');
    }
});
//Getting Questions
quizData.forEach(questions => {
    document.getElementById("question").innerHTML+= `<li>${ questions.question } </li>`;
});
});