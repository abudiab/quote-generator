const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorName = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show loading
const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

// Hide loading
const complete = () => {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
};

// Get quote from API
const getQuote = async () => {
  // Show loader before doing anything.
  loading();
  const proxyUrl = "https://cors-anywhere.herokuapp.com/"; //this is proxy api, it's for development purposes only so use your own
  const apiUrl = "http://api.forismatic.com/api/1.0/";
  const queryString = "?method=getQuote&lang=en&format=json";
  const requestUrl = apiUrl + queryString;
  try {
    // we will use the proxy api to call the api we want to bypass the cors plicy error
    const response = await fetch(proxyUrl + requestUrl);
    const data = await response.json();
    // console.log(data);
    // If author is blank, add 'Unknown'
    if (data.quoteAuthor === "") {
      authorName.innerText = "Unknown";
    } else {
      authorName.innerText = data.quoteAuthor;
    }
    // Reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    // Stop loader, show quote
    complete();
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
