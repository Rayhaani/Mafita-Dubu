// ==========================================
// 1. AI CAMERA & SEARCH FUNCTIONS
// ==========================================
function openAICamera() {
    console.log("Kamara tana budewa...");
    const loadingScreen = document.getElementById('ai-loading-screen');
    if(loadingScreen) loadingScreen.style.display = 'flex';
    // Nan zaka iya sauran code din bude kamara
}

function handleSearch(input) {
    const query = input.value.toLowerCase();
    console.log("Searching for: " + query);
    // Nan zaka saka code din tace kayayyaki (Filtering)
}

function manualSearch() {
    alert("Ana binciken abinda ka rubuta...");
}

// ==========================================
// 2. LOCATION & DISTANCE LOGIC (The Engine)
// ==========================================
function lissafaNisa(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
}

function samunLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const uLat = position.coords.latitude;
                const uLon = position.coords.longitude;
                updateVendorDistances(uLat, uLon);
            },
            (error) => {
                alert("Don Allah ka kunna GPS dinka don ganin na kusa.");
            }
        );
    }
}

// ==========================================
// 3. GLOBAL VS NEAR ME (The Brain)
// ==========================================
function bincikaKasuwa(tsari) {
    console.log("Tsarin da aka zaba: " + tsari);
    
    // Rufe Overlay idan an danna kowane button
    const overlay = document.getElementById('search-overlay');
    if(overlay) overlay.style.display = 'none';

    if (tsari === 'near_me') {
        samunLocation();
    } else {
        // Global Search: Jera Premium a sama
        displayGlobalMarket();
    }
}

function displayGlobalMarket() {
    console.log("Ana nuna Global Market (Premium First)");
    // Code din jera sponsored items zai shigo nan
}

function updateVendorDistances(uLat, uLon) {
    // Wannan zai duba duka akwatunan vendors ya saka musu KM
    const vendors = document.querySelectorAll('.vendor-card');
    vendors.forEach(v => {
        const vLat = v.getAttribute('data-lat');
        const vLon = v.getAttribute('data-lon');
        if(vLat && vLon) {
            const nisa = lissafaNisa(uLat, uLon, vLat, vLon);
            const badge = v.querySelector('.km-badge');
            if(badge) badge.innerText = nisa + " km";
        }
    });
}

function closeSearch() {
    document.getElementById('search-overlay').style.display = 'none';
}

// ==========================================
// 4. ANIMATIONS & UI EFFECTS
// ==========================================
function globalSearchMotsi() {
    // Wannan zai iya zama animation din da kake dashi na baya
    console.log("Motsi yana farawa...");
}

window.onload = () => {
    console.log("Global Market Engine is Ready!");
};
