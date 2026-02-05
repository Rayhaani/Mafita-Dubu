let typingTimer;
const doneTypingInterval = 3000;
let sliderPos = 0;

// ================= SEARCH HANDLING =================
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

// ================= AI CAMERA =================
function openAICamera() {
    const existing = document.getElementById('ai-sheet');
    if(existing) existing.remove();

    const menuHTML = `
    <div id="ai-overlay" onclick="closeAIVision()" class="fixed inset-0 bg-black/40 z-[4999] opacity-0 transition-opacity duration-300"></div>
    <div id="ai-sheet" class="ai-bottom-sheet">
        <div style="width:40px;height:4px;background:rgba(0,0,0,0.1);border-radius:10px;margin:12px auto 15px;"></div>
        <div style="display:flex;justify-content:space-around;padding:10px 0;">
            <div onclick="handleCamera()" style="cursor:pointer;text-align:center">
                <div class="silver-box"><i class="fa-solid fa-camera-retro" style="color:white"></i></div>
                <small>CAMERA</small>
            </div>
            <div onclick="handleCamera()" style="cursor:pointer;text-align:center">
                <div class="silver-box active-scan"><i class="fa-solid fa-qrcode" style="color:#FFD700"></i></div>
                <small>SCAN</small>
            </div>
            <div onclick="handleGallery()" style="cursor:pointer;text-align:center">
                <div class="silver-box"><i class="fa-solid fa-images" style="color:white"></i></div>
                <small>GALLERY</small>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', menuHTML);
    setTimeout(() => {
        document.getElementById('ai-overlay')?.classList.add('opacity-100');
        document.getElementById('ai-sheet')?.classList.add('active');
    }, 10);
}

function closeAIVision() {
    document.getElementById('ai-sheet')?.classList.remove('active');
    setTimeout(() => {
        document.getElementById('ai-overlay')?.remove();
        document.getElementById('ai-sheet')?.remove();
    }, 400);
}

function handleCamera() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = e => startAISimulation(e.target.files[0]);
    input.click();
}

function handleGallery() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = e => startAISimulation(e.target.files[0]);
    input.click();
}

function startAISimulation(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        localStorage.setItem('user_captured_image', e.target.result);
        document.getElementById('search-overlay')?.classList.add('active');
        document.getElementById('search-overlay').style.display = 'flex';
    };
    reader.readAsDataURL(file);
}

// ================= GLOBAL / NEAR YOU SEARCH =================
function globalSearchMotsi(mode) {
    localStorage.removeItem('user_captured_image');

    if (mode === 'near_me') {
        nearYouSearch(); // ⚠️ DIRECT USER GESTURE
        return;
    }

    document.getElementById('ai-loading-screen').style.display = 'flex';
    setTimeout(kammalaBincike, 3000);
}

// ================= LOCATION (FIXED) =================
function nearYouSearch() {
    const loading = document.getElementById('ai-loading-screen');
    if (loading) loading.style.display = 'flex';

    if (!navigator.geolocation) {
        if (loading) loading.style.display = 'none';
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            console.log("📍 Location:", pos.coords.latitude, pos.coords.longitude);
            setTimeout(kammalaBincike, 3000);
        },
        () => {
            // ❗ KAR KA SAKA ALERT NAN
            if (loading) loading.style.display = 'none';
            // browser permission zai riga ya fito
        },
        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        }
    );
}
