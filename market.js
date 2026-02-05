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

// 4. AI CAMERA (ASALIN TSOHON CODE DINKA 100%)
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
                                 
// Wannan function din zai zauna a kasa, baya taba kyan buttons dinka
function lissafaNisa(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius na duniya (km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Nisan a Kilomita
}

function nearYouSearch() {
    const loading = document.getElementById('ai-loading-screen');
    if (loading) loading.style.display = 'flex';

    if (!navigator.geolocation) {
        alert("GPS dinka a kashe yake.");
        if (loading) loading.style.display = 'none';
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const userLat = pos.coords.latitude;
            const userLon = pos.coords.longitude;

            // NAN NE ZAKA SAKA DATA NA VENDORS DIN KA NAN GABA
            // Misali:
            console.log("Inda kake: " + userLat + ", " + userLon);
            
            // Bayan sakan 3 na "Scanning", sai mu nuna sakamako
            setTimeout(() => {
                if (loading) loading.style.display = 'none';
                alert("An gano inda kake! Yanzu AI zai jero maka shagunan da ke kusa da kai.");
                kammalaBincike();
            }, 3000);
        },
        (error) => {
            if (loading) loading.style.display = 'none';
            alert("Tabbatar ka kunna GPS na wayarka.");
        }
    );
}

function fetchStoreLocation() {
    const coordsInput = document.getElementById('shop-coords');
    
    if (!navigator.geolocation) {
        alert("Wayarka ba ta tallafawa GPS. Amfani da tsohuwar hanya.");
        return;
    }

    // Nuna wa vendor cewa ana kokarin daukar location
    coordsInput.value = "Ana daukar location...";

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            // Adana shi a cikin input yadda Vendor zai gani
            coordsInput.value = `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
            coordsInput.style.color = "green";
            coordsInput.style.fontWeight = "bold";
        },
        (error) => {
            coordsInput.value = "";
            alert("Kuskure: Tabbatar ka kunna GPS kuma ka bada izini (Permission).");
        },
        { enableHighAccuracy: true }
    );
}

function saveVendor() {
    const name = document.getElementById('store-name').value;
    const coords = document.getElementById('shop-coords').value;

    if (!name || !coords) {
        alert("Don Allah cika duka bayanan.");
        return;
    }

    // A matsayin Senior Developer, nan ne zaka tura data zuwa Database dinka
    console.log("Saving Vendor:", { storeName: name, location: coords });
    alert("An yi rijistar shagonka cikin nasara tare da authentic GPS location!");
}
