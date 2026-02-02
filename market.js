let typingTimer;
const doneTypingInterval = 3000;
let sliderPos = 0; // Mun saka wannan a nan don kada komai ya tsaya

function handleSearch(textbox) {
    let kalma = textbox.value.trim();
    const listContainer = document.getElementById('suggestionList'); 
    clearTimeout(typingTimer);

    if (kalma.length >= 2) {
        const samples = ["Woman Panties", "Woman Bra", "Woman Gown", "Woman Shoes", "Men Boxer", "Men Singlet", "Men Shirt", "Men Trousers", "Children Wears", "Baby Toys", "Diapers", "Baby Food", "Cosmetics", "Perfumes", "Body Cream", "Makeup Kit", "Electronics", "Smartphones", "Laptops", "Power Banks", "Kitchen Utensils", "Blenders", "Plates", "Spoons"];
        const filtered = samples.filter(i => i.toLowerCase().includes(kalma.toLowerCase()));
        if(listContainer) {
            listContainer.parentElement.style.display = 'block';
            listContainer.innerHTML = filtered.map(item => `<li onclick="selectItem('${item}')" style="padding:12px; border-bottom:1px solid #eee; cursor:pointer; color:#333; font-weight:bold;">${item}</li>`).join('');
        }
        typingTimer = setTimeout(() => { showSearchOverlay(kalma); }, doneTypingInterval);
    } else {
        if(listContainer) listContainer.parentElement.style.display = 'none';
    }
}

function selectItem(word) {
    const input = document.getElementById('market-search');
    if(input) input.value = word;
    const box = document.getElementById('suggestionList');
    if(box) box.parentElement.style.display = 'none';
    showSearchOverlay(word);
}

function showSearchOverlay(kalma) {
    const overlay = document.getElementById('search-overlay');
    const display = document.getElementById('query-val');
    if (display) display.innerText = '"' + kalma + '"';
    if (overlay) {
        overlay.style.display = 'flex';
        setTimeout(() => overlay.classList.add('active'), 50);
    }
}

function closeSearch() {
    const overlay = document.getElementById('search-overlay');
    if(overlay) {
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.style.display = 'none';
            const input = document.getElementById('market-search');
            if(input) input.value = '';
        }, 500);
    }
}

function openAICamera() {
    const existing = document.getElementById('ai-sheet');
    if(existing) existing.remove();
    const menuHTML = `<div id="ai-overlay" onclick="closeAIVision()" class="fixed inset-0 bg-black/40 z-[4999] opacity-0 transition-opacity duration-300"></div><div id="ai-sheet" class="ai-bottom-sheet"><div style="width:40px; height:4px; background:rgba(0,0,0,0.1); border-radius:10px; margin: 12px auto 15px auto;"></div><div class="flex-row-container" style="display:flex; justify-content:space-around; align-items:center; width:100%; padding:10px 0;"><div style="display:flex; flex-direction:column; align-items:center;"><div class="silver-box" onclick="handleCamera()" style="cursor:pointer;"><i class="fa-solid fa-camera-retro" style="color:white; font-size:22px;"></i></div><span style="color:#333; font-size:10px; font-weight:900; margin-top:10px;">CAMERA</span></div><div style="display:flex; flex-direction:column; align-items:center;"><div class="silver-box active-scan" onclick="handleCamera()" style="cursor:pointer;"><i class="fa-solid fa-qrcode" style="color:#FFD700; font-size:22px;"></i></div><span style="color:#8B6508; font-size:10px; font-weight:900; margin-top:10px;">SCAN</span></div><div style="display:flex; flex-direction:column; align-items:center;"><div class="silver-box" onclick="handleGallery()" style="cursor:pointer;"><i class="fa-solid fa-images" style="color:white; font-size:22px;"></i></div><span style="color:#333; font-size:10px; font-weight:900; margin-top:10px;">GALLERY</span></div></div></div>`;
    document.body.insertAdjacentHTML('beforeend', menuHTML);
    setTimeout(() => { document.getElementById('ai-overlay')?.classList.add('opacity-100'); document.getElementById('ai-sheet')?.classList.add('active'); }, 10);
}

function closeAIVision() {
    const sheet = document.getElementById('ai-sheet');
    if(sheet) sheet.classList.remove('active');
    setTimeout(() => { if(document.getElementById('ai-overlay')) document.getElementById('ai-overlay').remove(); if(sheet) sheet.remove(); }, 400);
}

// --- AUTO PAGE SCROLL ---
let isPaused = false;
let direction = 1;

function startProfessionalScroll() {
    const searchBar = document.getElementById('market-search');
    // Idan mutum yana rubutu, mu dakatar da gudu
    const isTyping = searchBar === document.activeElement || (searchBar && searchBar.value.length > 0);

    if (!isPaused && !isTyping) {
        // Wannan zai sa duka shafin (Page) ya rika scrolling
        window.scrollBy(0, direction * 0.2); // 0.6 ne gudun, mun maida shi 0.2 don sanyi

        // Idan ya kai karshen kasa, ya dawo sama
        if (direction === 1 && (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
            direction = -1; 
            isPaused = true; 
            setTimeout(() => isPaused = false, 5000); // Tsaya na sakan 5 kafin komawa
        } else if (direction === -1 && window.pageYOffset <= 0) {
            direction = 1; 
            isPaused = true; 
            setTimeout(() => isPaused = false, 5000);
        }
    }
    requestAnimationFrame(startProfessionalScroll);
}
window.onload = () => setTimeout(startProfessionalScroll, 3000);
// Saka wannan a duk inda kake so a cikin JS din
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const searchBar = document.getElementById('market-search');
        if (document.activeElement === searchBar) {
            manualSearch();
        }
    }
});

function handleCamera() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            closeAIVision();
            showSearchOverlay("Hoton Kyamara");
            // Anan ne zamu sa AI ya karanta hoton nan gaba
        }
    };
    input.click();
}

function handleGallery() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            closeAIVision();
            showSearchOverlay("Hoton Gallery");
        }
    };
    input.click();
        }
function manualSearch() {
    const input = document.getElementById('market-search');
    if (!input) return;
    
    let kalma = input.value.trim();
    if (kalma.length >= 2) {
        clearTimeout(typingTimer); 
        input.blur(); // Wannan zai sa keyboard din ya boyu
        showSearchOverlay(kalma);
        
        const box = document.getElementById('suggestionList');
        if(box) box.parentElement.style.display = 'none';
    }
}
