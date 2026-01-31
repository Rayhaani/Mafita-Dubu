// Wannan zai tabbatar code din ya fara aiki bayan komai ya yi loading
document.addEventListener('DOMContentLoaded', () => {
    
    const searchInput = document.getElementById('mainSearch');
    const suggestionBox = document.getElementById('suggestionBox');
    const suggestionList = document.getElementById('suggestionList');
    const overlay = document.getElementById('search-overlay');
    const queryVal = document.getElementById('query-val');

    const sampleData = ["Panties", "Pants", "Pancakes", "Shoes", "Shirts", "Laptops"];

    if (searchInput) {
        searchInput.addEventListener('keyup', () => {
            clearTimeout(window.typingTimer);
            const query = searchInput.value.trim();
            
            if (query.length >= 2) {
                // Tace kalmomin bincike
                const filtered = sampleData.filter(i => i.toLowerCase().includes(query.toLowerCase()));
                if (filtered.length > 0) {
                    suggestionList.innerHTML = filtered.map(i => `<li style="padding:10px; border-bottom:1px solid #eee; cursor:pointer" onclick="selectSuggestion('${i}')">${i}</li>`).join('');
                    suggestionBox.style.display = 'block';
                }

                // Sakan 3 kafin overlay ya fito
                window.typingTimer = setTimeout(() => {
                    if(query) {
                        if(queryVal) queryVal.innerText = `"${query}"`;
                        overlay.style.display = 'flex';
                    }
                }, 3000);
            } else {
                suggestionBox.style.display = 'none';
            }
        });
    }
});

// Wadannan functions din dole su tsaya a waje (Global Scope)
function selectSuggestion(word) {
    const searchInput = document.getElementById('mainSearch');
    const suggestionBox = document.getElementById('suggestionBox');
    const overlay = document.getElementById('search-overlay');
    const queryVal = document.getElementById('query-val');

    searchInput.value = word;
    suggestionBox.style.display = 'none';
    if(queryVal) queryVal.innerText = `"${word}"`;
    overlay.style.display = 'flex';
}

function openAICamera() {
    // Wannan ne kake gani yanzu, zan baka code din kyamarar anan gaba
    alert("Kyamara tana shirin budewa..."); 
}

function closeSearch() {
    document.getElementById('search-overlay').style.display = 'none';
        }
