let typingTimer;
const doneTypingInterval = 3000; // Sakan uku (3 seconds)

function handleSearch(textbox) {
    let kalma = textbox.value.trim();
    const listContainer = document.getElementById('suggestionList'); 
    
    clearTimeout(typingTimer);

    if (kalma.length >= 2) {
        // Wannan shi ne babban jerin kayayyakin shafinka na Global Market
const samples = [
    "Woman Panties", "Woman Bra", "Woman Gown", "Woman Shoes",
    "Men Boxer", "Men Singlet", "Men Shirt", "Men Trousers",
    "Children Wears", "Baby Toys", "Diapers", "Baby Food",
    "Cosmetics", "Perfumes", "Body Cream", "Makeup Kit",
    "Electronics", "Smartphones", "Laptops", "Power Banks",
    "Kitchen Utensils", "Blenders", "Plates", "Spoons"
];
        
        const filtered = samples.filter(i => i.toLowerCase().includes(kalma.toLowerCase()));
        
        if(listContainer) {
            listContainer.parentElement.style.display = 'block';
            listContainer.innerHTML = filtered.map(item => 
                `<li onclick="selectItem('${item}')" style="padding:12px; border-bottom:1px solid #eee; cursor:pointer; color:#333; font-weight:bold;">${item}</li>`
            ).join('');
        }

        typingTimer = setTimeout(() => {
            showSearchOverlay(kalma);
        }, doneTypingInterval);
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



// 2. CAMERA FUNCTION (Kamar yadda yake a tsohon code dinka)
function openAICamera() {
    const existing = document.getElementById('ai-sheet');
    if(existing) existing.remove();

    const menuHTML = `
        <div id="ai-overlay" onclick="closeAIVision()" class="fixed inset-0 bg-black/40 z-[4999] opacity-0 transition-opacity duration-300"></div>
        <div id="ai-sheet" class="ai-bottom-sheet">
            <div style="width:40px; height:4px; background:rgba(0,0,0,0.1); border-radius:10px; margin: 12px auto 15px auto;"></div>
            
            <div class="flex-row-container" style="display:flex; justify-content:space-around; align-items:center; width:100%; padding:10px 0;">
                
                <div style="display:flex; flex-direction:column; align-items:center;">
                    <div class="silver-box" onclick="handleCamera()" style="cursor:pointer;">
                        <div class="icon-inner-bg"></div>
                        <i class="fa-solid fa-camera-retro" style="color:white; font-size:22px; position:relative; z-index:10;"></i>
                    </div>
                    <span style="color:#333; font-size:10px; font-weight:900; margin-top:10px;">CAMERA</span>
                </div>

                <div style="display:flex; flex-direction:column; align-items:center;">
    <div class="silver-box active-scan" onclick="handleScan()" style="cursor:pointer;">
        <div class="icon-inner-bg"></div>
        <i class="fa-solid fa-qrcode" style="color:#FFD700; font-size:22px; position:relative; z-index:10;"></i>
    </div>
    <span style="color:#8B6508; font-size:10px; font-weight:900; margin-top:10px;">SCAN</span>
</div>

                <div style="display:flex; flex-direction:column; align-items:center;">
                    <div class="silver-box" onclick="handleGallery()" style="cursor:pointer;">
                        <div class="icon-inner-bg"></div>
                        <i class="fa-solid fa-images" style="color:white; font-size:22px; position:relative; z-index:10;"></i>
                    </div>
                    <span style="color:#333; font-size:10px; font-weight:900; margin-top:10px;">GALLERY</span>
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
    const sheet = document.getElementById('ai-sheet');
    if(sheet) sheet.classList.remove('active');
    setTimeout(() => {
        if(document.getElementById('ai-overlay')) document.getElementById('ai-overlay').remove();
        if(sheet) sheet.remove();
    }, 400);
}

// 3. AUTO SCROLLING
let isPaused = false;
let direction = 1;
function startProfessionalScroll() {
    const searchBar = document.getElementById('market-search');
    // Idan mutum yana rubutu, ko ya danna search bar, mu dakatar da komai
    const isTyping = searchBar === document.activeElement || (searchBar && searchBar.value.length > 0);

    if (!isPaused && !isTyping) {
        window.scrollBy(0, direction * 0.6);
        if (direction === 1 && (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
            direction = -1; isPaused = true; setTimeout(() => isPaused = false, 5000);
        } else if (direction === -1 && window.pageYOffset <= 0) {
            direction = 1; isPaused = true; setTimeout(() => isPaused = false, 5000);
        }
    }
    requestAnimationFrame(startProfessionalScroll);
}
window.onload = () => setTimeout(startProfessionalScroll, 3000);

window.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('market-search');
    
    if (searchBar) {
        // Idan aka danna wurin rubutu
        searchBar.addEventListener('focus', () => {
            isPaused = true; 
        });

        // Idan aka daina rubutu (ko aka danna wani wuri daban)
        searchBar.addEventListener('blur', () => {
            // Jira sakan 5 kafin a ci gaba da scroll
            setTimeout(() => {
                isPaused = false;
            }, 5000);
        });

        // Wannan na ƙasa zai ƙara tabbatar da cewa ko ana typing ma ya tsaya
        searchBar.addEventListener('input', () => {
            isPaused = true;
        });
    }
});

// Wannan zai yi aiki idan an danna Icon din Search
function manualSearch() {
    const input = document.getElementById('market-search');
    if (!input) return;
    
    let kalma = input.value.trim();
    if (kalma.length >= 2) {
        clearTimeout(typingTimer); 
        
        // Wannan zai sa keyboard din wayar ya boyu
        input.blur(); 
        
        showSearchOverlay(kalma);
        
        const box = document.getElementById('suggestionBox');
        if(box) box.style.display = 'none';
    }
}

// Function na Camera
function handleGallery() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true; 
    
    input.onchange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        
        const reader = new FileReader();
        reader.onload = () => {
            showFuturisticActionBar(files.length, reader.result);
        };
        reader.readAsDataURL(files[0]);
    };
    input.click();
}

function handleScan() {
    closeAIVision();
    
    const scannerOverlay = document.createElement('div');
    scannerOverlay.id = 'scanner-full-container';
    // Style na zamani mai duhu (Futuristic Backdrop)
    scannerOverlay.style = "position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.9); z-index:999999; display:flex; flex-direction:column; align-items:center; justify-content:center; overflow:hidden;";

    // UI Elements: Laser da Border
scannerOverlay.innerHTML = `
    <div style="position:absolute; top:40px; color:white; font-family:sans-serif; text-align:center; z-index:1000002;">
        <p style="font-weight:bold; letter-spacing:2px; margin:0;">AI SCANNER READY</p>
        <div style="width:50px; height:2px; background:#FFD700; margin:5px auto;"></div>
    </div>
    
    <button id="close-scan-btn" style="position:absolute; top:30px; right:30px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.3); color:white; width:45px; height:45px; border-radius:50%; font-size:20px; z-index:1000005; cursor:pointer;">
        <i class="fa-solid fa-xmark"></i>
    </button>

    <div style="position:relative; width:280px; height:280px; border: 2px solid #FFD700; box-shadow: 0 0 20px rgba(255,215,0,0.4); overflow:hidden; border-radius:10px;">
        
        <div id="qr-reader" style="width:100%; height:100%; object-fit:cover;"></div>

        <div id="laser-line" style="position:absolute; width:100%; height:4px; background:linear-gradient(to bottom, transparent, #FFD700); box-shadow: 0 0 15px #FFD700; top:0; animation: laserMove 2s infinite linear; z-index:1000003;"></div>
        
        <div style="position:absolute; top:0; left:0; width:20px; height:20px; border-top:4px solid #FFD700; border-left:4px solid #FFD700;"></div>
        <div style="position:absolute; top:0; right:0; width:20px; height:20px; border-top:4px solid #FFD700; border-right:4px solid #FFD700;"></div>
        <div style="position:absolute; bottom:0; left:0; width:20px; height:20px; border-bottom:4px solid #FFD700; border-left:4px solid #FFD700;"></div>
        <div style="position:absolute; bottom:0; right:0; width:20px; height:20px; border-bottom:4px solid #FFD700; border-right:4px solid #FFD700;"></div>
    </div>

    <style>
    @keyframes laserMove {
        0% { top: -5%; }
        100% { top: 105%; }
    }

    /* Wannan zai share kowane irin border ko background da library din yake sakawa */
    #qr-reader, #qr-reader * {
        border: none !important;
        box-shadow: none !important;
        background: transparent !important;
    }

    /* Boye duk wani rubutu ko button na asali */
    #qr-reader__dashboard, 
    #qr-reader__status_span,
    #qr-reader__scan_region img { 
        display: none !important; 
    }

    /* Tabbatar kyamarar ta cika box dinmu kawai */
    video { 
        width: 100% !important; 
        height: 100% !important; 
        object-fit: cover !important;
        border-radius: 8px;
    }
</style>

`;

    document.body.appendChild(scannerOverlay);

    const html5QrCode = new Html5Qrcode("qr-reader");
    const stopScanner = () => {
        html5QrCode.stop().then(() => scannerOverlay.remove()).catch(() => scannerOverlay.remove());
    };

    document.getElementById('close-scan-btn').onclick = stopScanner;

    const qrCodeSuccessCallback = (decodedText) => {
        // Futuristic sound effect za mu iya sakawa anan gaba
        stopScanner();
        showSearchOverlay(decodedText);
    };

    // QRbox width da height na zamani
    const config = { fps: 20, qrbox: { width: 250, height: 250 } };

    html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback)
    .catch((err) => {
        alert("Kyamara ta ki budewa");
        scannerOverlay.remove();
    });
}

function showImagePreview(imageSrc) {
    // 1. Rufe AI menu na baya
    closeAIVision();

    const previewOverlay = document.createElement('div');
    previewOverlay.id = 'ai-image-preview';
    previewOverlay.style = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: #000; z-index: 1000000; display: flex; flex-direction: column;
    `;

    previewOverlay.innerHTML = `
        <div style="position: absolute; top: 20px; left: 20px; z-index: 10;">
            <i class="fa-solid fa-xmark" onclick="this.parentElement.parentElement.remove()" style="color: white; font-size: 24px; cursor: pointer; background: rgba(0,0,0,0.5); width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%;"></i>
        </div>

        <div style="flex: 1; display: flex; align-items: center; justify-content: center; position: relative; padding: 10px;">
            <img src="${imageSrc}" id="target-image" style="max-width: 100%; max-height: 70vh; object-fit: contain;">
            
            <div style="position: absolute; width: 250px; height: 250px; border: 2px solid rgba(255,255,255,0.5); pointer-events: none;">
                <div style="position: absolute; top: -2px; left: -2px; width: 20px; height: 20px; border-top: 4px solid white; border-left: 4px solid white;"></div>
                <div style="position: absolute; top: -2px; right: -2px; width: 20px; height: 20px; border-top: 4px solid white; border-right: 4px solid white;"></div>
                <div style="position: absolute; bottom: -2px; left: -2px; width: 20px; height: 20px; border-bottom: 4px solid white; border-left: 4px solid white;"></div>
                <div style="position: absolute; bottom: -2px; right: -2px; width: 20px; height: 20px; border-bottom: 4px solid white; border-right: 4px solid white;"></div>
            </div>
        </div>

        <div style="background: #111; padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 15px;">
            <div style="color: white; font-size: 14px;">1/1</div>
            
            <div style="width: 100%; display: flex; align-items: center; justify-content: space-between; background: #222; padding: 10px 20px; border-radius: 30px;">
                <span style="color: white; font-weight: bold; cursor: pointer;">Preview</span>
                
                <button onclick="proceedToAISearch('${imageSrc}')" style="background: #FFD700; color: black; border: none; padding: 10px 30px; border-radius: 20px; font-weight: 900; cursor: pointer;">
                    SELECT
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(previewOverlay);
}
// Wannan function din zai samar da Futuristic Bar din a kasan Gallery
function showFuturisticActionBar(count, imageSrc) {
    // Share tsohon bar idan akwai
    const oldBar = document.getElementById('futuristic-action-bar');
    if (oldBar) oldBar.remove();

    const actionBar = document.createElement('div');
    actionBar.id = 'futuristic-action-bar';
    
    // Style mai karfi don ya tsaya a inda kake (Fixed Position)
    actionBar.style = `
        position: fixed; 
        bottom: 20px; 
        left: 50%; 
        transform: translateX(-50%);
        width: 90%; 
        max-width: 400px; 
        height: 70px;
        background: #111; 
        border: 2px solid #FFD700; 
        border-radius: 20px;
        display: flex; 
        align-items: center; 
        justify-content: space-between;
        padding: 0 15px; 
        z-index: 10000000; /* Layer mafi girma */
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    `;

    actionBar.innerHTML = `
        <i class="fa-solid fa-xmark" onclick="this.parentElement.remove()" style="color: white; cursor: pointer;"></i>
        
        <div style="display: flex; align-items: center; gap: 10px; color: white;">
            <span style="background: #FFD700; color: black; padding: 2px 8px; border-radius: 5px; font-weight: bold;">${count}</span>
            <span style="font-weight: bold; font-size: 14px;">Preview</span>
        </div>

        <button onclick="alert('Select clicked!')" style="background: #FFD700; color: black; border: none; padding: 10px 20px; border-radius: 10px; font-weight: 900; cursor: pointer;">
            SELECT
        </button>
    `;

    document.body.appendChild(actionBar);
}
