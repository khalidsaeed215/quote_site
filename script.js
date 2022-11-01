// get quotes from API
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//show loading 
function loading()
{
    loader.hidden = false;
    quoteContainer.hidden = true;
}


// hide loading
function complete()
{
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//show new quote
function newQuote()
{
    loading();
    //pick a random quote from apiQuotes array
    let quote_selector = Math.floor(Math.random() *  apiQuotes.length);
    const quote = apiQuotes[quote_selector];
    //console.log(quote);
    authorText.textContent = 'Unknown';
    if (quote.author) 
    {
        authorText.textContent = quote.author;
    }
    

    //Check quote length to determine styling

    if (quote.text.length > 90)
    {
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    // set quote, hide loader

    quoteText.textContent = quote.text;

    complete();


}

async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl); // await response gets filled when fetch is finished
        apiQuotes = await response.json();
        newQuote();
        //console.log(apiQuotes);
    }catch(error){
        //alert(error) for production UI element created.
        //handle catch error
    }

}

// on load

//tweet quote

function tweetQuote()
{
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`; // uses back ticks not signle quotes is because we are going to paste in this and we use template string because it allows us to pass in variable.
    window.open(twitterUrl, ' _blank');

}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click',tweetQuote);
getQuotes();
//loading();