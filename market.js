let typingTimer;
const doneTypingInterval = 3000;
let sliderPos = 0; 
let isPaused = false;
let direction = 1;

// 1. GYARAN SLIDER (Auto Scroll)
function startProfessionalScroll() {
    const searchBar = document.getElementById('market-search');
    const isTyping = searchBar === document.activeElement || (searchBar && searchBar.value.length > 0);

    if (!isPaused && !isTyping) {
        window.scrollBy(0, direction * 0.2); 
        if (direction === 1 && (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
            direction = -1; 
            isPaused = true; 
            setTimeout(() => isPaused = false, 5000); 
        } else if (direction === -1 && window.pageYOffset <= 0) {
            direction = 1; 
            isPaused = true; 
            setTimeout(() => isPaused = false, 5000);
        }
    }
    requestAnimationFrame(startProfessionalScroll);
}
window.onload = () => setTimeout(startProfessionalScroll, 3000);

// 2. GYARAN ENTER KEY & SEARCH ICON
function manualSearch() {
    const input = document.getElementById('market-search');
    if (!input) return;
    let kalma = input.value.trim();
    if (kalma.length >= 2) {
        clearTimeout(typingTimer); 
        input.blur(); 
        showSearchOverlay(kalma);
        const box = document.getElementById('suggestionList');
        if(box) box.parentElement.style.display = 'none';
    }
}

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const searchBar = document.getElementById('market-search');
        if (document.activeElement === searchBar) {
            manualSearch();
        }
    }
});

// 3. SEARCH HANDLING
function handleSearch(textbox) {
    let kalma = textbox.value.trim();
    const listContainer = document.getElementById('suggestionList'); 
    clearTimeout(typingTimer);

    if (kalma.length >= 2) {
        const samples = ["Woman Panties", "Woman Bra", "Woman Gown", "Woman Shoes", "Men Boxer", "Men Singlet", "Men Shirt", "Men Trousers", "Children Wears", "Baby Toys", "Diapers", "Baby Food", "Cosmetics", "Perfumes", "Body Cream", "Makeup Kit", "Electronics", "Smartphones", "Laptops", "Power Banks", "Kitchen Utensils", "Blenders", "Plates", "Spoons"];
        const filtered = samples.filter(i => i.toLowerCase().includes(kalma.toLowerCase()));
        if(listContainer) {
            listContainer.parentElement.style.display = 'block';
            listContainer.innerHTML = filtered.map(item => `<li onclick="selectItem('${item}')" style="padding:12px;border-bottom:1px solid #eee;cursor:pointer;color:#333;font-weight:bold;">${item}</li>`).join('');
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
    const listContainer = document.getElementById('suggestionList');
    if(listContainer) listContainer.parentElement.style.display = 'none';
    if (display) display.innerText = `"${kalma}"`;
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

// 4. AI CAMERA & LOCATION (Sheet Fixed)
function openAICamera() {
    const existing = document.getElementById('ai-sheet');
    if(existing) existing.remove();

    const menuHTML = `
    <div id="ai-overlay" onclick="closeAIVision()" style="position:fixed; inset:0; background:rgba(0,0,0,0.4); z-index:4999; opacity:0; transition:opacity 0.3s;"></div>
    <div id="ai-sheet" style="position:fixed; bottom:-100%; left:0; right:0; background:white; border-radius:20px 20px 0 0; z-index:5000; transition:bottom 0.4s cubic-bezier(0.4, 0, 0.2, 1); padding-bottom:30px; box-shadow: 0 -5px 20px rgba(0,0,0,0.15);">
        <div style="width:40px; height:4px; background:rgba(0,0,0,0.1); border-radius:10px; margin: 12px auto 25px auto;"></div>
        <div style="display:flex; justify-content:space-around; align-items:flex-end; width:100%; padding:0 10px;">
            <div onclick="handleCamera()" style="display:flex; flex-direction:column; align-items:center; cursor:pointer; flex:1;">
                <div style="width:55px; height:55px; background:#e0e0e0; border-radius:15px; display:flex; align-items:center; justify-content:center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <i class="fa-solid fa-camera-retro" style="color:#444; font-size:24px;"></i>
                </div>
                <span style="color:#333; font-size:10px; font-weight:900; margin-top:12px;">CAMERA</span>
            </div>
            <div onclick="handleCamera()" style="display:flex; flex-direction:column; align-items:center; cursor:pointer; flex:1;">
                <div style="width:65px; height:65px; background:linear-gradient(145deg, #1a1a1a, #333); border-radius:18px; display:flex; align-items:center; justify-content:center; border:2.5px solid #FFD700; box-shadow: 0 6px 12px rgba(0,0,0,0.2); margin-top:-10px;">
                    <i class="fa-solid fa-qrcode" style="color:#FFD700; font-size:28px;"></i>
                </div>
                <span style="color:#8B6508; font-size:10px; font-weight:900; margin-top:12px;">SCAN</span>
            </div>
            <div onclick="handleGallery()" style="display:flex; flex-direction:column; align-items:center; cursor:pointer; flex:1;">
                <div style="width:55px; height:55px; background:#e0e0e0; border-radius:15px; display:flex; align-items:center; justify-content:center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <i class="fa-solid fa-images" style="color:#444; font-size:24px;"></i>
                </div>
                <span style="color:#333; font-size:10px; font-weight:900; margin-top:12px;">GALLERY</span>
            </div>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', menuHTML);
    setTimeout(() => { 
        const overlay = document.getElementById('ai-overlay');
        const sheet = document.getElementById('ai-sheet');
        if(overlay) overlay.style.opacity = "1";
        if(sheet) sheet.style.bottom = "0"; 
    }, 10);
}

function closeAIVision() {
    const overlay = document.getElementById('ai-overlay');
    const sheet = document.getElementById('ai-sheet');
    if(sheet) sheet.style.bottom = "-100%";
    if(overlay) overlay.style.opacity = "0";
    setTimeout(() => {
        overlay?.remove();
        sheet?.remove();
    }, 400);
}

function handleCamera() {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'image/*'; input.capture = 'environment';
    input.onchange = e => startAISimulation(e.target.files[0]);
    input.click();
}

function handleGallery() {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'image/*';
    input.onchange = e => startAISimulation(e.target.files[0]);
    input.click();
}

function startAISimulation(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        localStorage.setItem('user_captured_image', e.target.result);
        closeAIVision();
        showSearchOverlay('Scanned Item');
    };
    reader.readAsDataURL(file);
}

function globalSearchMotsi(mode) {
    document.getElementById('search-overlay').style.display = 'none';
    if (mode === 'near_me') {
        nearYouSearch();
    } else {
        document.getElementById('ai-loading-screen').style.display = 'flex';
        setTimeout(kammalaBincike, 3000);
    }
}

function nearYouSearch() {
    const loading = document.getElementById('ai-loading-screen');
    if (loading) loading.style.display = 'flex';
    if (!navigator.geolocation) {
        alert("Wayarka ba ta goyon bayan GPS");
        if (loading) loading.style.display = 'none';
        return;
    }
    navigator.geolocation.getCurrentPosition(
        (pos) => { setTimeout(kammalaBincike, 3000); },
        () => { if (loading) loading.style.display = 'none'; },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
}

function kammalaBincike() {
    document.getElementById('ai-loading-screen').style.display = 'none';
    localStorage.removeItem('user_captured_image');
        }
