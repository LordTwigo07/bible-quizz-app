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
let score = 0;
let currentVerse = null;
function displayVerse(verse) {
  document.getElementById("verse-text").textContent = verse.text;
  document.getElementById("reference").textContent = verse.reference;
}
console.log("real verse : ", realVerses[0].text + realVerses[0].reference);
console.log("fake verse :", fakeVerses[0].text + realVerses[0].reference);
function getRandomVerse() {
  const isReal = Math.random() < 0.5;
  const verses = isReal ? realVerses : fakeVerses;
  currentVerse = verses[Math.floor(Math.random() * verses.length)];
  displayVerse(currentVerse); // Add this line back
  return verses === realVerses;
}

function checkAnswer(userGuessedReal) {
  const isReal = realVerses.includes(currentVerse);
  const messageElement = document.getElementById("message");
  const scoreElement = document.getElementById("score");

  if (messageElement && scoreElement) {
    // Check if elements exist
    if (userGuessedReal === isReal) {
      score++;
      scoreElement.textContent = `Score: ${score}`;
      messageElement.textContent = "✅ Correct! Well done!";
      messageElement.style.color = "#2ecc71";
    } else {
      messageElement.textContent = "❌ Incorrect! Try again!";
      messageElement.style.color = "#e74c3c";
    }

    setTimeout(() => {
      messageElement.textContent = "";
    }, 2000);
  }

  getRandomVerse();
}

// Add event listeners (move outside the checkAnswer function)
document
  .getElementById("true")
  .addEventListener("click", () => checkAnswer(true));
document
  .getElementById("false")
  .addEventListener("click", () => checkAnswer(false));

// Start game (call the function properly)
getRandomVerse();
