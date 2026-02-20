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
        // Wannan layin shi ne zai saka hoton a loading screen din
        const preview = document.getElementById('scanned-image-preview');
        if (preview) {
            preview.src = e.target.result;
        }
        
        localStorage.setItem('user_captured_image', e.target.result);
        closeAIVision();
        showSearchOverlay('Scanned Item');
    };
    reader.readAsDataURL(file);
}

function globalSearchMotsi(mode) {
    const overlay = document.getElementById('search-overlay');
    
    if (mode === 'near_me') {
        if(overlay) overlay.style.display = 'none';

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // IDAN GPS A KUNNE YAKE: Wuce da lat/lon
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    window.location.href = `results.html?view=nearme&lat=${lat}&lon=${lon}`;
                },
                (error) => {
                    // IDAN GPS A KULLE YAKE (Koda an danna Allow):
                    // Maimakon mu bar shi a Global Market, mu kai shi results kawai
                    console.log("GPS is off, redirecting to general results...");
                    
                    if (typeof showGpsToast === "function") {
                        showGpsToast(); // Nuna masa cewa zai ga results amma ba na kusa ba
                    }
                    
                    // Bayan sakan 2, mu tura shi results page ko da bai kunna GPS ba
                    setTimeout(() => {
                        window.location.href = "results.html?view=nearme&gps=off";
                    }, 2500);
                },
                { enableHighAccuracy: true, timeout: 5000 }
            );
        }
    } else {
        if(overlay) overlay.style.display = 'none';
        window.location.href = 'atamfa.html';
    }
}




 let watchID = null; // Wannan zai rike tracking din

function nearYouSearch() {
    const loading = document.getElementById('ai-loading-screen');
    const errorState = document.getElementById('gps-error-state');
    const listContainer = document.getElementById('vendors-list');
    const resultsPage = document.getElementById('near-me-results');

    if (loading) loading.style.display = 'flex';
    
    // Idan an riga an fara tracking, a tsayar da shi a sake sabo
    if (watchID) navigator.geolocation.clearWatch(watchID);

    watchID = navigator.geolocation.watchPosition((pos) => {
        const userLat = pos.coords.latitude;
        const userLon = pos.coords.longitude;

        let nearbyVendors = vendorsDatabase.map(vendor => {
            const distance = lissafaNisa(userLat, userLon, vendor.lat, vendor.lon);
            return { ...vendor, distance: distance };
        }).sort((a, b) => a.distance - b.distance);

        // Nuna sakamako
        if (loading) loading.style.display = 'none';
        resultsPage.style.display = 'flex';
        listContainer.style.display = 'block';
        errorState.style.display = 'none';

        displayNearbyVendors(nearbyVendors);
        
    }, (err) => {
        if (loading) loading.style.display = 'none';
        resultsPage.style.display = 'flex';
        listContainer.style.display = 'none';
        errorState.style.display = 'flex';
    }, { 
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000 
    });
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

// Wannan jerin (List) ne na Vendors da suka riga sun yi registration
let vendorsDatabase = [
    { name: "Al-Amin Pharmacy", lat: 10.5105, lon: 7.4165, items: ["medicine", "paracetamol"] },
    { name: "Musa Bread & Butter", lat: 10.5200, lon: 7.4200, items: ["bread", "butter", "milk"] },
    { name: "Fatima Fashion Home", lat: 10.4900, lon: 7.4000, items: ["gown", "bra", "shoes"] }
];

function displayNearbyVendors(nearbyVendors) {
    const resultsPage = document.getElementById('near-me-results');
    const listContainer = document.getElementById('vendors-list');
    listContainer.innerHTML = '';

    nearbyVendors.forEach(v => {
        // --- JINIYA DA SAUTI ---
        if (v.distance <= 0.02) {
            if ("vibrate" in navigator) navigator.vibrate([200, 100, 200]);
            const sound = document.getElementById('arrival-sound'); // Layin sauti
            if (sound) sound.play().catch(() => {}); 
        }

        const card = `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:15px; border-bottom:1px solid #eee; background: white; border-radius: 12px; margin-bottom: 10px; border-left: ${v.distance <= 0.02 ? '5px solid #28a745' : 'none'};">
                <div style="display:flex; align-items:center; gap: 15px;">
                    <div style="width:50px; height:50px; background:#e9ecef; border-radius:50%; display:flex; align-items:center; justify-content:center;">
                        <i class="fa-solid fa-shop" style="color:${v.distance <= 0.02 ? '#28a745' : '#007bff'};"></i>
                    </div>
                    <div>
                        <h4 style="margin:0; font-size:16px; font-weight:bold;">${v.name}</h4>
                        <p style="margin:0; font-size:12px; color:${v.distance <= 0.02 ? '#28a745' : '#666'}; font-weight:600;">
                            ${v.distance <= 0.02 ? 'Ka Iso! (Arrived)' : v.distance.toFixed(2) + ' km away'}
                        </p>
                    </div>
                </div>
                <button style="padding:8px 15px; background:${v.distance <= 0.02 ? '#28a745' : '#007bff'}; color:white; border:none; border-radius:20px; font-size:12px; font-weight:bold;">Visit</button>
            </div>`;
        listContainer.innerHTML += card;
    });
    resultsPage.style.display = 'flex';
}


function closeResults() {
    document.getElementById('near-me-results').style.display = 'none';
}

// Saka wannan a can kasa don lissafa tazara tsakanin mutum da shago
function lissafaNisa(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius na duniya a km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
        }

function startRegistration(type) {
    closePortal();
    // Nan gaba zamu sa code din da zai bude babban registration form din da AI scanner
    console.log("Starting registration for:", type);
    
    if(type === 'vendor') {
        alert("Preparing AI-Integrated Vendor Registration...");
        // openVendorRegistrationForm(); // Zamu hada wannan a mataki na gaba
    }
}

function openPortal() {
    const portal = document.getElementById('portal-sheet');
    const content = document.getElementById('portal-content');
    portal.classList.remove('hidden');
    setTimeout(() => content.style.transform = "translateY(0)", 10);
}

function closePortal() {
    const portal = document.getElementById('portal-sheet');
    const content = document.getElementById('portal-content');
    content.style.transform = "translateY(100%)";
    setTimeout(() => portal.classList.add('hidden'), 300);
}


function kammalaBincike() {
    // 1. Kashe loading screen
    const loading = document.getElementById('ai-loading-screen');
    if (loading) loading.style.display = 'none';

    // 2. Nemo sunan abin da mutum ya bincika (daga search bar)
    const searchInput = document.getElementById('market-search');
    const bincike = searchInput ? searchInput.value : "Abinda ka nema";

    // 3. Nuna sakamako (A nan zaka iya sa logic na fitar da kaya daga database)
    alert("AI Search Completed: Mun nemo maka " + bincike + " a shaguna 5 dake kusa da kai.");
    
    // Zaka iya kiran nearYouSearch() anan don nuna shagunan da suke da kayan
    nearYouSearch();
}

function openPortal() {
    const portal = document.getElementById('portal-sheet');
    const content = document.getElementById('portal-content');
    if(portal && content) {
        portal.classList.remove('hidden');
        setTimeout(() => {
            content.style.transform = "translateY(0)";
        }, 10);
    }
}

function closePortal() {
    const portal = document.getElementById('portal-sheet');
    const content = document.getElementById('portal-content');
    if(portal && content) {
        content.style.transform = "translateY(100%)";
        setTimeout(() => {
            portal.classList.add('hidden');
        }, 300);
    }
}

function openVendorForm() {
    closePortal();
    const form = document.getElementById('vendor-form-overlay');
    if(form) form.classList.remove('hidden');
}

function closeVendorForm() {
    const form = document.getElementById('vendor-form-overlay');
    if(form) form.classList.add('hidden');
}

function startRegistration(type) {
    alert("Kayi nasarar fara registration a matsayin: " + type);
    closePortal();
}

function showGpsToast() {
    const toast = document.getElementById('gps-toast');
    const sound = document.getElementById('toast-sound');
    
    if (!toast) return;

    // Kunna Sauti
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(() => {});
    }

    // Nuna shi da kyau (Slide down)
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(10px)'; 
    }, 10);
    
    // Bace bayan sakan 6
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 500);
    }, 6000);
      }
