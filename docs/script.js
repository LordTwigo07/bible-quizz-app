const realVerses = [
  {
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    reference: "John 3:16",
  },
  {
    text: "The Lord is my shepherd, I lack nothing.",
    reference: "Psalm 23:1",
  },
  {
    text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    reference: "Joshua 1:9",
  },
  {
    text: "I can do all things through Christ who strengthens me.",
    reference: "Philippians 4:13",
  },
  {
    text: "Trust in the Lord with all your heart and lean not on your own understanding.",
    reference: "Proverbs 3:5",
  },
];

const fakeVerses = [
  {
    text: "Blessed are those who rise early to check their scrolls, for they shall receive wisdom from afar.",
    reference: "Proverbs 15:31",
  },
  {
    text: "He who delays his work until tomorrow bears the burden of two days, yet accomplishes the work of none.",
    reference: "Ecclesiastes 4:15",
  },
  {
    text: "As a lamp gives light to a dark room, so does knowledge flow through the networks of understanding.",
    reference: "Isaiah 29:24",
  },
  {
    text: "Let not thy heart be troubled by the opinions of others, for the approval of man is like morning dew.",
    reference: "James 2:19",
  },
  {
    text: "Better to share bread with a neighbor than to feast alone in abundance.",
    reference: "Proverbs 17:24",
  },
];
// Variables
let timeLeft = 15;
let timer = null;
let score = 0;
let currentVerse = null;
let usedVerses = [];
let questionCount = 0;
const TOTAL_QUESTIONS = 15;

function getRandomVerse() {
  // Keep track of real/fake verse counts
  const realCount = usedVerses.filter((verse) =>
    realVerses.includes(verse)
  ).length;
  const fakeCount = usedVerses.filter((verse) =>
    fakeVerses.includes(verse)
  ).length;

  // Determine if we should force a specific type to maintain balance
  let isReal;
  if (questionCount < TOTAL_QUESTIONS - 1) {
    if (realCount > questionCount / 2) {
      isReal = false;
    } else if (fakeCount > questionCount / 2) {
      isReal = true;
    } else {
      isReal = Math.random() >= 0.5;
    }
  } else {
    // For the last question, balance the distribution
    isReal = realCount < TOTAL_QUESTIONS / 2;
  }

  const verses = isReal ? realVerses : fakeVerses;
  const availableVerses = verses.filter((verse) => !usedVerses.includes(verse));

  if (availableVerses.length === 0) {
    usedVerses = usedVerses.filter(
      (verse) => verses !== (isReal ? realVerses : fakeVerses)
    );
    return getRandomVerse();
  }

  currentVerse =
    availableVerses[Math.floor(Math.random() * availableVerses.length)];
  usedVerses.push(currentVerse);
  displayVerse(currentVerse);
  startTimer();

  return isReal;
}

function checkAnswer(userGuessedReal) {
  clearInterval(timer);
  const isReal = realVerses.includes(currentVerse);
  const messageElement = document.getElementById("message");
  const scoreElement = document.getElementById("score");

  if (messageElement && scoreElement) {
    messageElement.style.opacity = "0";

    setTimeout(() => {
      if (userGuessedReal === isReal) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
        messageElement.textContent =
          "✅ Excellent! Your knowledge of Scripture is impressive!";
        messageElement.style.color = "#2ecc71";
      } else {
        messageElement.textContent =
          "❌ Not quite right. Keep studying the Word!";
        messageElement.style.color = "#e74c3c";
      }

      messageElement.style.opacity = "1";
      messageElement.style.transition = "opacity 0.5s ease-in-out";

      // Wait before showing next verse
      setTimeout(() => {
        messageElement.style.opacity = "0";
        setTimeout(() => {
          messageElement.textContent = "";
          if (questionCount < TOTAL_QUESTIONS) {
            getRandomVerse();
          }
        }, 500);
      }, 2500);
    }, 300);
  }

  questionCount++;
  if (questionCount >= TOTAL_QUESTIONS) {
    endGame();
    return;
  }
}

function endGame() {
  clearInterval(timer);
  document.getElementById("verse-text").textContent = `Quiz Complete!`;
  document.getElementById(
    "reference"
  ).textContent = `Final Score: ${score} out of ${TOTAL_QUESTIONS}`;
  document.getElementById("timer").style.display = "none";
  document.getElementById("true").style.display = "none";
  document.getElementById("false").style.display = "none";

  // Add retry button
  const retryButton = document.createElement("button");
  retryButton.textContent = "Play Again";
  retryButton.className = "btn";
  retryButton.style.backgroundColor = "#2ecc71";
  retryButton.onclick = resetGame;
  document.querySelector(".container-bottom").appendChild(retryButton);
}

// Add this new function to reset the game
function resetGame() {
  score = 0;
  questionCount = 0;
  usedVerses = [];
  document.getElementById("score").textContent = "Score: 0";
  document.getElementById("timer").style.display = "block";
  document.getElementById("true").style.display = "block";
  document.getElementById("false").style.display = "block";

  // Remove retry button
  const retryButton = document.querySelector(
    ".container-bottom button:last-child"
  );
  if (retryButton) {
    retryButton.remove();
  }

  getRandomVerse();
}

// Event listeners
document
  .getElementById("true")
  .addEventListener("click", () => checkAnswer(true));
document
  .getElementById("false")
  .addEventListener("click", () => checkAnswer(false));

// Start the game
// Add this event listener
document.getElementById("start-btn").addEventListener("click", startGame);

function displayVerse(verse) {
  if (!verse) return;

  const verseTextElement = document.getElementById("verse-text");
  const referenceElement = document.getElementById("reference");

  if (verseTextElement && referenceElement) {
    verseTextElement.textContent = verse.text;
    referenceElement.textContent = verse.reference;
  }
}

// Add this function for the timer
function startTimer() {
  clearInterval(timer);
  timeLeft = 15;
  document.getElementById("timer").textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      getRandomVerse();
    }
  }, 1000);
}

function startGame() {
  gameStarted = true;
  // Hide start button
  const startButton = document.getElementById("start-btn");
  startButton.classList.add("hidden");

  // Show quiz elements
  document.getElementById("quiz-content").style.display = "block";
  document.getElementById("true").style.display = "block";
  document.getElementById("false").style.display = "block";

  // Start the quiz
  score = 0;
  questionCount = 0;
  usedVerses = [];
  document.getElementById("score").textContent = "Score: 0";
  getRandomVerse();
}
