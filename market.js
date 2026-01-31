// 1. SEARCH & SUGGESTIONS LOGIC
let typingTimer;
const searchInput = document.getElementById('mainSearch');
const suggestionBox = document.getElementById('suggestionBox');
const suggestionList = document.getElementById('suggestionList');
const overlay = document.getElementById('search-overlay');

const sampleData = ["Panties", "Pants", "Pancakes", "Shoes", "Shirts", "Laptops"];

if (searchInput) {
    searchInput.addEventListener('keyup', () => {
        clearTimeout(typingTimer);
        const query = searchInput.value.trim();
        
        if (query.length >= 2) {
            const filtered = sampleData.filter(i => i.toLowerCase().includes(query.toLowerCase()));
            if (filtered.length > 0) {
                suggestionList.innerHTML = filtered.map(i => `<li onclick="selectSuggestion('${i}')">${i}</li>`).join('');
                suggestionBox.style.display = 'block';
            }
            
            typingTimer = setTimeout(() => {
                if(query) openSearchOverlay(query);
            }, 3000);
        } else {
            suggestionBox.style.display = 'none';
        }
    });
}

function selectSuggestion(word) {
    searchInput.value = word;
    suggestionBox.style.display = 'none';
    openSearchOverlay(word);
}

function openSearchOverlay(query) {
    const queryVal = document.getElementById('query-val');
    if (queryVal) queryVal.innerText = `"${query}"`;
    overlay.style.display = 'flex';
    setTimeout(() => overlay.classList.add('active'), 10);
}

function closeSearch() {
    overlay.classList.remove('active');
    setTimeout(() => overlay.style.display = 'none', 400);
}

// 2. CAMERA LOGIC
function openAICamera() {
    alert("Ana buɗe kyamara... (AI Vision)");
    // Zaka iya saka ainihin code din kyamarar ka anan nan gaba
}

// 3. SELECTION LOGIC (Daga Overlay)
document.getElementById('btn-global')?.addEventListener('click', () => {
    const q = searchInput.value;
    window.location.href = `selection-page.html?type=global&query=${encodeURIComponent(q)}`;
});

document.getElementById('btn-near')?.addEventListener('click', () => {
    const q = searchInput.value;
    window.location.href = `selection-page.html?type=near&query=${encodeURIComponent(q)}`;
});
