// Reference elements
const quoteInput = document.getElementById('quote');
const authorInput = document.getElementById('author');
const addBtn = document.getElementById('addQuote');
const quoteList = document.getElementById('quoteList');

// Load quotes on page load
document.addEventListener('DOMContentLoaded', loadQuotes);

// Add quote button listener
addBtn.addEventListener('click', addQuote);

// Add quote function
function addQuote() {
  const quoteText = quoteInput.value.trim();
  const authorText = authorInput.value.trim();

  if (quoteText && authorText) {
    const quoteObj = {
      id: Date.now(), // Unique key
      text: quoteText,
      author: authorText
    };

    // Save to localStorage
    localStorage.setItem(quoteObj.id, JSON.stringify(quoteObj));

    // Clear input fields
    quoteInput.value = '';
    authorInput.value = '';

    // Update UI
    displayQuote(quoteObj);
  } else {
    alert('Please fill out both fields!');
  }
}

// Load and display all quotes
function loadQuotes() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    try {
      const quote = JSON.parse(localStorage.getItem(key));
      if (quote && quote.text && quote.author && quote.id) {
        displayQuote(quote);
      }
    } catch (e) {
      // Skip non-quote entries
    }
  }
}

// Display a single quote in UI
function displayQuote(quote) {
  const quoteCard = document.createElement('div');
  quoteCard.className = 'quote-card';
  quoteCard.innerHTML = `
    <p>"${quote.text}"</p>
    <p><strong>- ${quote.author}</strong></p>
    <button class="remove-btn" onclick="removeQuote(${quote.id})">Remove</button>
  `;
  quoteCard.setAttribute('data-id', quote.id);
  quoteList.appendChild(quoteCard);
}

// Remove quote
function removeQuote(id) {
  localStorage.removeItem(id);
  const card = document.querySelector(`[data-id="${id}"]`);
  if (card) card.remove();
}
