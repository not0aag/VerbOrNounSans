class GameState {
    constructor() {
        this.words = [];
        this.currentWord = null;
        this.attempts = 3;
        this.score = 0;
        this.currentLevel = 1;
        this.maxLevel = 5;
        this.isGameOver = false;
        this.soundEnabled = true;
        this.streakCount = 0;
        this.highScore = parseInt(localStorage.getItem('hindiGameHighScore')) || 0;
    }

    reset() {
        this.attempts = 3;
        this.score = 0;
        this.currentLevel = 1;
        this.isGameOver = false;
        this.streakCount = 0;
        this.updateHighScore();
    }

    updateHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('hindiGameHighScore', this.score.toString());
        }
    }
}

class SoundManager {
    constructor() {
        this.sounds = {
            correct: new Audio('sounds/correct.mp3'),
            wrong: new Audio('sounds/wrong.mp3'),
            levelUp: new Audio('sounds/level-up.mp3'),
            gameOver: new Audio('sounds/game-over.mp3'),
            hint: new Audio('sounds/hint.mp3')
        };

        Object.values(this.sounds).forEach(sound => {
            sound.load();
            sound.volume = 0.5;
        });
    }

    play(soundName) {
        if (gameState.soundEnabled && this.sounds[soundName]) {
            this.sounds[soundName].currentTime = 0;
            this.sounds[soundName].play().catch(err => console.log('Audio play failed:', err));
        }
    }
}

class AnimationManager {
    static shake(element) {
        element.classList.add('shake');
        element.addEventListener('animationend', () => {
            element.classList.remove('shake');
        }, { once: true });
    }

    static pulse(element) {
        element.classList.add('pulse');
        element.addEventListener('animationend', () => {
            element.classList.remove('pulse');
        }, { once: true });
    }

    static fadeIn(element) {
        element.style.opacity = '0';
        element.style.display = 'block';
        setTimeout(() => {
            element.style.opacity = '1';
        }, 10);
    }

    static fadeOut(element) {
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.display = 'none';
        }, 300);
    }
}

const gameState = new GameState();
const soundManager = new SoundManager();

class APIService {
    static async fetchWords() {
        try {
            const response = await fetch('words.json');
            const data = await response.json();
            return data.words;
        } catch (error) {
            console.error('Error fetching words:', error);
            
            const words = [
                {
                    level: 1,
                    words: [
                        { word: "किताब", type: "noun", image: "images/book.jpg", explanation: "A noun - an object that we read", english: "book" },
                        { word: "खाना", type: "verb", image: "images/eat.jpg", explanation: "A verb - the action of consuming food", english: "eat" },
                        { word: "पानी", type: "noun", image: "images/water.jpg", explanation: "A noun - the clear liquid essential for life", english: "water" }
                    ]
                }
            ];
            return words;
        }
    }
}

class UIManager {
    static updateLevelDisplay() {
        const levelElement = document.getElementById('current-level');
        const progressBar = document.getElementById('level-progress');
        const progressPercentage = document.getElementById('progress-percentage');
        
        AnimationManager.pulse(levelElement);
        levelElement.textContent = gameState.currentLevel;
        
        const progress = (gameState.score % 5) * 20;
        progressBar.style.width = `${progress}%`;
        progressPercentage.textContent = `${progress}%`;
        
        document.getElementById('high-score').textContent = gameState.highScore;
    }

    static updateScore() {
        const scoreElement = document.getElementById('score');
        scoreElement.textContent = gameState.score;
        AnimationManager.pulse(scoreElement);
    }

    static updateAttempts() {
        const attemptsElement = document.getElementById('attempts');
        attemptsElement.textContent = gameState.attempts;
        if (gameState.attempts === 1) {
            attemptsElement.classList.add('last-attempt');
        } else {
            attemptsElement.classList.remove('last-attempt');
        }
    }

    static showWord() {
        const wordElement = document.getElementById('word-display');
        const imageElement = document.getElementById('word-image');
        
        AnimationManager.fadeIn(wordElement);
        imageElement.style.opacity = '0';
        wordElement.textContent = gameState.currentWord.word;
        
        imageElement.src = gameState.currentWord.image;
        imageElement.onload = () => {
            AnimationManager.fadeIn(imageElement);
        };
    }

    static showHint() {
        const hintElement = document.getElementById('english-hint');
        hintElement.textContent = gameState.currentWord.english;
        hintElement.classList.add('visible');
        soundManager.play('hint');
    }

    static showExplanation(isCorrect) {
        const explanationElement = document.getElementById('explanation');
        explanationElement.className = `explanation ${isCorrect ? 'correct' : 'incorrect'}`;
        explanationElement.textContent = isCorrect ? 
            `Correct! Great job!` :
            `Incorrect! "${gameState.currentWord.word}" is ${gameState.currentWord.type === 'noun' ? 'a noun' : 'a verb'}. ${gameState.currentWord.explanation}`;
        AnimationManager.fadeIn(explanationElement);
    }
}

function startGame() {
    const landingScreen = document.getElementById('landing-screen');
    const gameScreen = document.getElementById('game-screen');
    
    landingScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    
    initializeGame();
}

async function initializeGame() {
    gameState.words = await APIService.fetchWords();
    UIManager.updateLevelDisplay();
    showNextWord();
    document.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress(event) {
    if (gameState.isGameOver) return;
    
    switch(event.key.toLowerCase()) {
        case 'n': checkAnswer('noun'); break;
        case 'v': checkAnswer('verb'); break;
        case 'h': showHint(); break;
    }
}

function showNextWord() {
    if (gameState.words.length === 0) return;
    
    const levelWords = gameState.words.find(w => w.level === gameState.currentLevel).words;
    const unusedWords = levelWords.filter(w => w !== gameState.currentWord);
    gameState.currentWord = unusedWords[Math.floor(Math.random() * unusedWords.length)];
    
    document.getElementById('explanation').style.display = 'none';
    document.getElementById('english-hint').classList.remove('visible');
    
    UIManager.showWord();
    UIManager.updateAttempts();
}

function checkAnswer(type) {
    if (gameState.isGameOver || !gameState.currentWord) return;

    if (gameState.currentWord.type === type) {
        handleCorrectAnswer();
    } else {
        handleIncorrectAnswer();
    }
}

function handleCorrectAnswer() {
    soundManager.play('correct');
    gameState.score++;
    gameState.streakCount++;
    
    UIManager.updateScore();
    UIManager.showExplanation(true);
    
    if (gameState.score % 5 === 0) {
        handleLevelUp();
    } else {
        setTimeout(showNextWord, 1500);
    }
}

function handleIncorrectAnswer() {
    soundManager.play('wrong');
    gameState.attempts--;
    gameState.streakCount = 0;
    
    UIManager.updateAttempts();
    UIManager.showExplanation(false);
    AnimationManager.shake(document.querySelector('.word-card'));
    
    if (gameState.attempts === 0) {
        setTimeout(() => showGameOver(false), 1500);
    }
}

function handleLevelUp() {
    if (gameState.currentLevel === gameState.maxLevel) {
        showGameOver(true);
    } else {
        gameState.currentLevel++;
        soundManager.play('levelUp');
        UIManager.updateLevelDisplay();
        showNextWord();
    }
}

function showHint() {
    if (gameState.isGameOver || !gameState.currentWord) return;
    
    gameState.attempts--;
    UIManager.showHint();
    UIManager.updateAttempts();
    
    if (gameState.attempts === 0) {
        setTimeout(() => showGameOver(false), 1500);
    }
}

function showGameOver(isWin) {
    gameState.isGameOver = true;
    gameState.updateHighScore();
    
    const gameOverScreen = document.getElementById('game-over-screen');
    const gameOverTitle = document.getElementById('game-over-title');
    const gameOverScore = document.getElementById('game-over-score');
    const gameOverLevel = document.getElementById('game-over-level');
    
    soundManager.play(isWin ? 'levelUp' : 'gameOver');
    
    gameOverTitle.textContent = isWin ? 'Congratulations!' : 'Game Over!';
    gameOverScore.textContent = gameState.score;
    gameOverLevel.textContent = gameState.currentLevel;
    
    AnimationManager.fadeIn(gameOverScreen);
    gameOverScreen.style.display = 'flex';
    
    if (isWin) createConfetti();
}

function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    confettiContainer.innerHTML = '';
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.setProperty('--fall-duration', `${Math.random() * 3 + 2}s`);
        confetti.style.setProperty('--fall-delay', `${Math.random() * 5}s`);
        confetti.style.setProperty('--left-pos', `${Math.random() * 100}%`);
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confettiContainer.appendChild(confetti);
    }
}

function restartGame() {
    gameState.reset();
    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('explanation').style.display = 'none';
    document.getElementById('english-hint').classList.remove('visible');
    initializeGame();
}

function toggleSound() {
    gameState.soundEnabled = !gameState.soundEnabled;
    const soundButton = document.getElementById('sound-toggle');
    soundButton.className = gameState.soundEnabled ? 'sound-on' : 'sound-off';
}

document.addEventListener('DOMContentLoaded', () => {
    const startGameBtn = document.querySelector('.play-btn');
    if (startGameBtn) {
        startGameBtn.addEventListener('click', startGame);
    }
});