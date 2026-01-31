let typingTimer;
const searchInput = document.getElementById('mainSearch');
const suggestionBox = document.getElementById('suggestionBox');
const suggestionList = document.getElementById('suggestionList');
const overlay = document.getElementById('search-overlay');

const sampleData = ["Panties", "Pants", "Pancakes", "Shoes", "Shirts", "Laptops"];

searchInput.addEventListener('keyup', () => {
    clearTimeout(typingTimer);
    const query = searchInput.value.trim();
    
    if (query.length >= 2) {
        // Nuna Suggestions
        const filtered = sampleData.filter(i => i.toLowerCase().includes(query.toLowerCase()));
        suggestionList.innerHTML = filtered.map(i => `<li onclick="selectSuggestion('${i}')">${i}</li>`).join('');
        suggestionBox.style.display = 'block';

        // Fara lissafin sakan 3 don nuna Global/Near Me Overlay
        typingTimer = setTimeout(() => {
            if(query) {
                document.getElementById('query-val').innerText = `"${query}"`;
                overlay.style.display = 'flex';
                overlay.classList.add('active');
            }
        }, 3000);
    } else {
        suggestionBox.style.display = 'none';
    }
});

function selectSuggestion(word) {
    searchInput.value = word;
    suggestionBox.style.display = 'none';
    document.getElementById('query-val').innerText = `"${word}"`;
    overlay.style.display = 'flex';
    overlay.classList.add('active');
}

function closeSearch() {
    overlay.style.display = 'none';
    overlay.classList.remove('active');
}
