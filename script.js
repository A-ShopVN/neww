// Lấy phần tử cần thiết từ HTML
const addButton = document.getElementById('add-button');
const englishWordInput = document.getElementById('english-word');
const meaningInput = document.getElementById('meaning');
const wordsList = document.getElementById('words');
const quizSection = document.getElementById('quiz');
const quizQuestion = document.getElementById('quiz-question');
const quizOptions = document.getElementById('quiz-options');
const nextButton = document.getElementById('next-question');
const quizScore = document.getElementById('quiz-score');

// Lấy từ vựng đã lưu trong localStorage (nếu có)
let words = JSON.parse(localStorage.getItem('words')) || [];
let quizIndex = 0;
let score = parseInt(localStorage.getItem('score')) || 0;
const maxScore = 100;

// Hiển thị danh sách từ vựng
function displayWords() {
    wordsList.innerHTML = '';
    words.forEach(word => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${word.english}</strong>: ${word.meaning}`;
        wordsList.appendChild(li);
    });
}

// Thêm từ vựng mới
function addWord() {
    const englishWord = englishWordInput.value.trim();
    const meaning = meaningInput.value.trim();

    if (englishWord && meaning) {
        words.push({ english: englishWord, meaning });
        localStorage.setItem('words', JSON.stringify(words));
        displayWords();
        englishWordInput.value = '';
        meaningInput.value = '';
    } else {
        alert('Vui lòng nhập đầy đủ từ vựng và nghĩa!');
    }
}

// Khởi tạo quiz
function startQuiz() {
    if (score >= maxScore) {
        alert("Bạn đã đạt tối đa 100 điểm hôm nay. Không thể làm quiz nữa.");
        return;
    }

    quizSection.style.display = 'block';
    nextButton.style.display = 'none';
    score = 0;
    quizScore.textContent = `Điểm: ${score}`;
    quizIndex = 0;
    displayNextQuestion();
}

// Hiển thị câu hỏi trắc nghiệm tiếp theo
function displayNextQuestion() {
    if (quizIndex >= words.length) {
        alert("Bạn đã làm xong tất cả các câu hỏi!");
        quizSection.style.display = 'none';
        return;
    }

    const currentWord = words[quizIndex];
    quizQuestion.textContent = `Nghĩa của từ "${currentWord.english}" là gì?`;

    const correctAnswer = currentWord.meaning;
    const randomAnswers = [correctAnswer, currentWord.meaning].sort(() => Math.random() - 0.5); // Trộn các đáp án

    quizOptions.innerHTML = '';
    randomAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.onclick = () => checkAnswer(answer, correctAnswer);
        quizOptions.appendChild(button);
    });

    nextButton.style.display = 'none';
}

// Kiểm tra câu trả lời
function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        score += 10;
        localStorage.setItem('score', score);
        quizScore.textContent = `Điểm: ${score}`;
    }
    quizIndex++;
    nextButton.style.display = 'inline-block';
}

// Gắn sự kiện click cho các nút
addButton.addEventListener('click', addWord);
nextButton.addEventListener('click', displayNextQuestion);

// Hiển thị lại từ vựng khi trang tải lại
displayWords();
