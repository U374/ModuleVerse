const searchBar = document.getElementById('search-bar');
const suggestionsContainer = document.getElementById('suggestions');

// Fetch articles from the JSON file
let articles = [];

fetch('../pages/data.json')
  .then(response => response.json())
  .then(data => {
    articles = data; // Assign the fetched data to the articles array
  })
  .catch(error => {
    console.error('Error loading articles:', error);
  });

// Position suggestions dynamically
const positionSuggestions = () => {
  const rect = searchBar.getBoundingClientRect();
  suggestionsContainer.style.top = `${rect.bottom + window.scrollY}px`;
  suggestionsContainer.style.left = `${rect.left + window.scrollX}px`;
  suggestionsContainer.style.width = `${rect.width}px`;
};

searchBar.addEventListener('input', () => {
  const query = searchBar.value.trim().toLowerCase();
  suggestionsContainer.innerHTML = ''; 

  if (query) {
    const filteredArticles = articles.filter(article =>
      article.title.toLowerCase().includes(query)
    );

    if (filteredArticles.length > 0) {
      filteredArticles.forEach(article => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion-item');

        // Add the text and arrow
        suggestionItem.innerHTML = `
          <span>${article.title}</span>
          <span class="suggestion-arrow">&#8594;</span>
        `;

        // Handle item click (navigate to URL)
        suggestionItem.addEventListener('click', () => {
          window.location.href = article.url;
        });

        // Handle arrow click (fill search bar)
        suggestionItem.querySelector('.suggestion-arrow').addEventListener('click', (e) => {
          e.stopPropagation(); // Prevent triggering parent click event
          searchBar.value = article.title;
        });

        suggestionsContainer.appendChild(suggestionItem);
      });

      suggestionsContainer.style.display = 'block'; // Show suggestions
      positionSuggestions(); // Recalculate position
    } else {
      suggestionsContainer.style.display = 'none'; // Hide if no matches
    }
  } else {
    suggestionsContainer.style.display = 'none'; // Hide if query is empty
  }
});

// Reposition suggestions on window resize or scroll
window.addEventListener('resize', positionSuggestions);
window.addEventListener('scroll', positionSuggestions);

// Hide suggestions if clicking outside
document.addEventListener('click', (e) => {
  if (!suggestionsContainer.contains(e.target) && e.target !== searchBar) {
    suggestionsContainer.style.display = 'none';
  }
});

// Show suggestions when the search bar is clicked
searchBar.addEventListener('focus', () => {
  if (suggestionsContainer.innerHTML.trim()) {
    suggestionsContainer.style.display = 'block';
    positionSuggestions();
  }
});