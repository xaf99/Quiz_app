const adminBtn = document.getElementById('admin-btn');
const startQuizBtn = document.getElementById('startQuiz-btn');

startQuizBtn.addEventListener('click', function () {
    location.href="/static/quiz.html";
});

adminBtn.addEventListener('click', function () {
    location.href="/static/admin.html";
});