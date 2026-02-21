let typingTimer;
const doneTypingInterval = 3000;
let sliderPos = 0; 
let isPaused = false;
let direction = 1;
let watchID = null;

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

function showSearchOverlay(kalma, isImage = false) {
    const overlay = document.getElementById('search-overlay');
    const display = document.getElementById('query-val');
    const listContainer = document.getElementById('suggestionList');
    const imageBox = document.querySelector('.scanned-image-container'); // Box din hoton

    if(listContainer) listContainer.parentElement.style.display = 'none';
    if (display) display.innerText = `"${kalma}"`;
    
    // IDAN BINCIKEN RUBUTU NE (Kamar "Panties")
    if (!isImage) {
        if (imageBox) imageBox.style.display = 'none'; // Boye box din hoton gaba daya
    } else {
        // IDAN NA HOTO NE
        if (imageBox) imageBox.style.display = 'block'; // Nuna box din hoton
    }

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

// 4. AI CAMERA & SIMULATION
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
        const preview = document.getElementById('scanned-image-preview');
        if (preview) {
            preview.src = e.target.result;
        }
        
        localStorage.setItem('user_captured_image', e.target.result);
        closeAIVision();
        // Mun kara 'true' anan don ya san hoto ne aka yi uploading
        showSearchOverlay('Scanned Item', true);
    };
    reader.readAsDataURL(file);
}


// 5. GLOBAL SEARCH MOTSI (GYARARREN INSTANT VERSION)
function globalSearchMotsi(mode) {
    const overlay = document.getElementById('search-overlay');
    const loading = document.getElementById('ai-loading-screen'); // Wannan ne scanning screen dinka

    if (mode === 'near_me') {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // 1. AN SAMU LOCATION: Nan take mu nuna loading screen don ya rufe komai
                    if(loading) {
                        loading.style.display = 'flex';
                        loading.style.background = '#ffffff'; // Fari sol don kar a ga komai na baya
                    }
                    
                    // 2. Rufe overlay a hankali a karkashin loading screen din
                    if(overlay) overlay.style.display = 'none';
                    
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    
                    // 3. Wucewa zuwa results
                    window.location.href = `results.html?view=nearme&lat=${lat}&lon=${lon}`;
                },
                (error) => {
                    // Idan an samu matsala, kar mu rufe komai
                    if (typeof showGpsToast === "function") { showGpsToast(); }
                },
                { enableHighAccuracy: true, timeout: 5000 }
            );
        }
    } else {
        if(overlay) overlay.style.display = 'none';
        window.location.href = 'atamfa.html';
    }
}

// 6. NEAR YOU SEARCH (INSTANT RESULTS)
function nearYouSearch() {
    const loading = document.getElementById('ai-loading-screen');
    const resultsPage = document.getElementById('near-me-results');
    const listContainer = document.getElementById('vendors-list');
    const errorState = document.getElementById('gps-error-state');

    // Cire scanning screen gaba daya
    if (loading) loading.style.display = 'none';
    
    if (watchID) navigator.geolocation.clearWatch(watchID);

    watchID = navigator.geolocation.watchPosition((pos) => {
        const userLat = pos.coords.latitude;
        const userLon = pos.coords.longitude;

        let nearbyVendors = vendorsDatabase.map(vendor => {
            const distance = lissafaNisa(userLat, userLon, vendor.lat, vendor.lon);
            return { ...vendor, distance: distance };
        }).sort((a, b) => a.distance - b.distance);

        if (resultsPage) resultsPage.style.display = 'flex';
        if (listContainer) {
            listContainer.style.display = 'block';
            displayNearbyVendors(nearbyVendors);
        }
        if (errorState) errorState.style.display = 'none';
        
    }, (err) => {
        if (resultsPage) resultsPage.style.display = 'flex';
        if (listContainer) listContainer.style.display = 'none';
        if (errorState) errorState.style.display = 'flex';
    }, { enableHighAccuracy: true, timeout: 5000 });
}

// 7. VENDOR & LOCATION UTILS
function fetchStoreLocation() {
    const coordsInput = document.getElementById('shop-coords');
    if (!navigator.geolocation) { alert("Wayarka ba ta tallafawa GPS."); return; }
    coordsInput.value = "Ana daukar location...";
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            coordsInput.value = `${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`;
            coordsInput.style.color = "green";
        },
        (error) => { alert("Kuskure: Tabbatar ka kunna GPS."); },
        { enableHighAccuracy: true }
    );
}

function lissafaNisa(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
}

// 8. VENDORS DATABASE & DISPLAY
let vendorsDatabase = [
    { name: "Al-Amin Pharmacy", lat: 10.5105, lon: 7.4165, items: ["medicine"] },
    { name: "Musa Bread & Butter", lat: 10.5200, lon: 7.4200, items: ["bread"] },
    { name: "Fatima Fashion Home", lat: 10.4900, lon: 7.4000, items: ["gown"] }
];

function displayNearbyVendors(nearbyVendors) {
    const listContainer = document.getElementById('vendors-list');
    if(!listContainer) return;
    listContainer.innerHTML = '';
    nearbyVendors.forEach(v => {
        if (v.distance <= 0.02) {
            if ("vibrate" in navigator) navigator.vibrate([200, 100, 200]);
            const sound = document.getElementById('arrival-sound');
            if (sound) sound.play().catch(() => {}); 
        }
        const card = `<div style="display:flex; justify-content:space-between; align-items:center; padding:15px; border-bottom:1px solid #eee; background: white; border-radius: 12px; margin-bottom: 10px;">
                <div style="display:flex; align-items:center; gap: 15px;">
                    <div style="width:50px; height:50px; background:#e9ecef; border-radius:50%; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-shop"></i></div>
                    <div><h4 style="margin:0;">${v.name}</h4><p style="margin:0; font-size:12px;">${v.distance.toFixed(2)} km away</p></div>
                </div>
                <button style="padding:8px 15px; background:#007bff; color:white; border:none; border-radius:20px;">Visit</button>
            </div>`;
        listContainer.innerHTML += card;
    });
}

function closeResults() {
    const res = document.getElementById('near-me-results');
    if(res) res.style.display = 'none';
}

function showGpsToast() {
    const toast = document.getElementById('gps-toast');
    if (!toast) return;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.opacity = '1'; toast.style.transform = 'translateX(-50%) translateY(10px)'; }, 10);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => { toast.style.display = 'none'; }, 500);
    }, 6000);
    }
