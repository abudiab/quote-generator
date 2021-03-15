const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorName = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show loading spinner
const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

// Hide loading spinner
const removeLoadingSpinner = () => {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
};

// Get quotes from API
const getQuote = async () => {
  // Show loader before doing anything.
  showLoadingSpinner();
  // const proxyUrl = "https://cors-anywhere.herokuapp.com/"; //this is proxy api, it's for development purposes only
  const apiUrl = "https://type.fit/api/quotes";
  try {
    // we will use the proxy api to call the api we want to bypass the cors plicy error
    const response = await fetch(apiUrl);
    const data = await response.json();
    const apiQuotes = await data;
    const quote = await apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // If author is blank, add 'Unknown'
    if (!quote.author) {
      authorName.innerText = "Unknown";
    } else {
      authorName.innerText = quote.author;
    }
    // Reduce font size for long quotes
    if (quote.text.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = quote.text;
    // Stop loader, show quote
    removeLoadingSpinner();
  } catch (error) {
    // getQuote(); //in case an error happens, we want to try and fetch another quote
    console.log("Opsy dops, something went wrong..", error);
  }
};

// Tweet quote
const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorName.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
};

// Event listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();
