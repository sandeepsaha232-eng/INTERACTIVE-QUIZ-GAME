const startScreen = document.getElementById('startScreen')
const quizScreen = document.getElementById('quizScreen')
const resultsScreen = document.getElementById('resultsScreen')
const startBtn = document.getElementById('startBtn')
const nextBtn = document.getElementById('nextBtn')
const retakeBtn = document.getElementById('retakeBtn')
const homeBtn = document.getElementById('homeBtn')
const questionNumber = document.getElementById('questionNumber')
const currentScore = document.getElementById('currentScore')
const questionText = document.getElementById('questionText')
const feedbackMessage = document.getElementById('feedbackMessage')
const optionsContainer = document.getElementById('optionsContainer')
const progressFill = document.getElementById('progressFill')
const finalScore = document.getElementById('finalScore')
const resultMessage = document.getElementById('resultMessage')
const correctCountEl = document.getElementById('correctCount')
const totalCountEl = document.getElementById('totalCount')
const scorePercentageEl = document.getElementById('scorePercentage')

const quizData = [
    {
        question: 'What is the capital of France?',
        answers: ['Madrid', 'Berlin', 'Paris', 'Rome'],
        correctAnswer: 'Paris'
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: ['Earth', 'Mars', 'Jupiter', 'Venus'],
        correctAnswer: 'Mars'
    },
    {
        question: 'Which language is used for styling web pages?',
        answers: ['HTML', 'Python', 'CSS', 'Java'],
        correctAnswer: 'CSS'
    },
    {
        question: 'What is the largest ocean on Earth?',
        answers: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        correctAnswer: 'Pacific Ocean'
    },
    {
        question: 'Which element has the chemical symbol O?',
        answers: ['Gold', 'Oxygen', 'Silver', 'Neon'],
        correctAnswer: 'Oxygen'
    }
]

let currentIndex = 0
let score = 0
let correctCount = 0

startBtn.addEventListener('click', startQuiz)
nextBtn.addEventListener('click', moveToNext)
retakeBtn.addEventListener('click', startQuiz)
homeBtn.addEventListener('click', goHome)

function startQuiz() {
    currentIndex = 0
    score = 0
    correctCount = 0
    startScreen.style.display = 'none'
    quizScreen.style.display = 'block'
    resultsScreen.style.display = 'none'
    showQuestion()
    updateScore()
}

function showQuestion() {
    const current = quizData[currentIndex]
    questionNumber.textContent = `Question ${currentIndex + 1} of ${quizData.length}`
    questionText.textContent = current.question
    optionsContainer.innerHTML = ''
    feedbackMessage.className = 'feedback-message'
    feedbackMessage.textContent = ''
    current.answers.forEach(answer => {
        const button = document.createElement('button')
        button.type = 'button'
        button.className = 'option-btn'
        button.textContent = answer
        button.addEventListener('click', () => pickAnswer(button, answer))
        optionsContainer.appendChild(button)
    })
    nextBtn.disabled = true
    progressFill.style.width = `${Math.round((currentIndex / quizData.length) * 100)}%`
}

function pickAnswer(button, answer) {
    const current = quizData[currentIndex]
    const buttons = Array.from(optionsContainer.children)
    buttons.forEach(btn => btn.disabled = true)
    if (answer === current.correctAnswer) {
        score += 10
        correctCount += 1
        feedbackMessage.classList.add('show', 'correct-feedback')
        feedbackMessage.textContent = 'Correct!'
        button.classList.add('correct')
    } else {
        feedbackMessage.classList.add('show', 'incorrect-feedback')
        feedbackMessage.textContent = `Wrong answer. Correct answer: ${current.correctAnswer}`
        button.classList.add('incorrect')
        const correctButton = buttons.find(btn => btn.textContent === current.correctAnswer)
        if (correctButton) correctButton.classList.add('correct')
    }
    nextBtn.disabled = false
    updateScore()
}

function moveToNext() {
    currentIndex += 1
    if (currentIndex < quizData.length) {
        showQuestion()
    } else {
        showResults()
    }
}

function showResults() {
    quizScreen.style.display = 'none'
    resultsScreen.style.display = 'block'
    const percentage = Math.round((correctCount / quizData.length) * 100)
    finalScore.textContent = `${percentage}%`
    resultMessage.textContent = correctCount === quizData.length ? 'Perfect score! 🎉' : correctCount >= 3 ? 'Great job!' : 'Nice try!'
    correctCountEl.textContent = correctCount
    totalCountEl.textContent = quizData.length
    scorePercentageEl.textContent = percentage
}

function updateScore() {
    currentScore.textContent = `Score: ${score}`
}

function goHome() {
    startScreen.style.display = 'block'
    quizScreen.style.display = 'none'
    resultsScreen.style.display = 'none'
    currentIndex = 0
    score = 0
    correctCount = 0
    updateScore()
}
