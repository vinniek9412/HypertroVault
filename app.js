// Array of motivational quotes
const quotes = [
  "Train insane or remain the same!",
  "Pain is temporary, pride is forever.",
  "Push yourself because no one else is going to do it for you.",
  "Sweat is fat crying.",
  "No excuses, just results.",
  "Go hard or go home.",
  "You don't get the ass you want by sitting on it.",
  "Be stronger than your strongest excuse.",
  "Lift heavy, live happy.",
  "The only bad workout is the one you didn’t do."
];

// Select the quote display element and refresh button
const quoteDisplay = document.getElementById("dailyQuote");
const refreshBtn = document.getElementById("refreshQuote");

// Function to get a random quote
function getRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

// Display a random quote on page load
quoteDisplay.textContent = getRandomQuote();

// Update quote when refresh button is clicked
refreshBtn.addEventListener("click", () => {
  let newQuote = getRandomQuote();
  
  // Ensure new quote is different from current one
  while (newQuote === quoteDisplay.textContent && quotes.length > 1) {
    newQuote = getRandomQuote();
  }
  
  quoteDisplay.textContent = newQuote;
});
