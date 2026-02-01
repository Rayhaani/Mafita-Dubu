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

// B. Gyararren Camera Function
function handleCamera(event) {
    if (event) event.preventDefault();
    closeAIVision();
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const itemName = identifyImage(file);
            showSearchOverlay(itemName);
        }
    };
    input.click();
}

// C. Gyararren Gallery Function
function handleGallery(event) {
    if (event) event.preventDefault();
    closeAIVision();
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const itemName = identifyImage(file);
            showSearchOverlay(itemName);
        }
    };
    input.click();
}
// 1. Wannan zai gano sunan kaya
function identifyImage(file) {
    let name = file.name.toLowerCase();
    if (name.includes("pant")) return "Panties";
    if (name.includes("bra")) return "Bra";
    if (name.includes("shoe")) return "Takalmi";
    if (name.includes("shirt")) return "Riga";
    return "kayan nan"; // Idan bai gane ba, zai ce 'kayan nan'
}

// 2. Wannan zai nuna rubutu guda daya tilo
function showSearchOverlay(kalma) {
    const overlay = document.getElementById('search-overlay');
    if (overlay) {
        overlay.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; height: 100vh; padding: 40px 20px;">
                
                <div class="world-box" style="margin-bottom: 20px;">
                    <div class="sphere"></div>
                    <div class="ring"></div>
                </div>

                <h3 style="color:#5D4037; font-size:18px; font-weight:900; text-align:center; margin-bottom: 20px;">
                    Ina kake son bincika "${kalma}"?
                </h3>

                <button class="pearl-btn" onclick="closeSearch()" style="width: 280px !important; margin-bottom: 12px;">
                    <i class="fa-solid fa-earth-africa"></i> GLOBAL SEARCH
                </button>
                <button class="pearl-btn" onclick="closeSearch()" style="width: 280px !important;">
                    <i class="fa-solid fa-location-crosshairs"></i> NEAR YOU
                </button>

                <p onclick="closeSearch()" style="margin-top: auto; color: #A68A64; font-weight: bold; font-size: 11px; cursor: pointer; padding-bottom: 30px;">
                    <i class="fa-solid fa-xmark"></i> SOKE BINCIKE (CANCEL)
                </p>
            </div>
        `;
        overlay.style.display = 'flex';
        setTimeout(() => overlay.classList.add('active'), 50);
    }
}

function showTemuStyleBar(count, imageSrc) {
    // 1. Cire duk wani tsohon bar idan akwai
    const existingBar = document.getElementById('temu-bar');
    if (existingBar) existingBar.remove();

    // 2. Samar da babban akwati (Container)
    const temuBar = document.createElement('div');
    temuBar.id = 'temu-bar';
    
    // Professional Style: Baki, Gold, da Shadows masu kyau
    temuBar.style = `
        position: fixed; bottom: 40px; left: 50%; transform: translateX(-50%);
        width: 90%; max-width: 420px; height: 75px;
        background: #1a1a1a; border-radius: 40px;
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 10px 0 20px; z-index: 2147483647; /* Highest possible z-index */
        box-shadow: 0 15px 35px rgba(0,0,0,0.6);
        border: 1px solid rgba(255,215,0,0.3);
        animation: fadeInUp 0.4s ease-out;
    `;

    temuBar.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <i class="fa-solid fa-xmark" onclick="this.parentElement.parentElement.remove()" style="color: #888; cursor: pointer; font-size: 20px;"></i>
            
            <div onclick="showImagePreview('${imageSrc}')" style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                <div style="background: #FFD700; color: #000; width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 15px;">
                    ${count}
                </div>
                <span style="color: white; font-weight: 600; font-size: 14px; letter-spacing: 0.5px;">Preview</span>
            </div>
        </div>

        <button onclick="handleSelectClick('${imageSrc}')" style="background: #FFD700; color: #000; border: none; height: 55px; padding: 0 40px; border-radius: 30px; font-weight: 900; font-size: 15px; cursor: pointer; transition: 0.2s active;">
            SELECT
        </button>

        <style>
            @keyframes fadeInUp {
                from { opacity: 0; transform: translate(-50%, 50px); }
                to { opacity: 1; transform: translate(-50%, 0); }
            }
            #temu-bar button:active { transform: scale(0.95); }
        </style>
    `;

    document.body.appendChild(temuBar);
}

// Wannan shine zai gyara matsalar Select dinka
function handleSelectClick(img) {
    // Rufe bar din
    document.getElementById('temu-bar').remove();
    // Kira Overlay dinka anan (Tabbatar sunan function din ya dace da naka)
    if (typeof showSearchOverlay === 'function') {
        showSearchOverlay(img);
    } else {
        alert("Overlay function not found! Check your code.");
    }
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
