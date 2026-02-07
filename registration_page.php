<!DOCTYPE html>
<html lang="ha">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mafita Dubu | Smart Registration</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .step-hidden { display: none; }
        .glass-card { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(15px); }
        .progress-bar { transition: width 0.4s ease-in-out; }
    </style>
</head>
<body class="bg-gradient-to-br from-blue-50 to-gray-200 min-h-screen flex items-center justify-center p-4">

    <div class="glass-card w-full max-w-2xl rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 md:p-12 border border-white">
        <div class="w-full bg-gray-200 h-1.5 rounded-full mb-8 overflow-hidden">
            <div id="progress" class="progress-bar bg-blue-600 h-full w-1/3"></div>
        </div>

        <form id="mafitaForm">
            <div id="step1" class="space-y-6">
                <header class="text-center">
                    <h2 class="text-4xl font-black text-blue-900 tracking-tighter">Barka da Zuwa</h2>
                    <p class="text-gray-500 font-medium">Fara tafiyar ka a cikin Ecosystem din Mafita Dubu</p>
                </header>
                
                <div class="space-y-4">
                    <input type="text" placeholder="Cikakken Suna" class="w-full p-5 rounded-2xl bg-white border-2 border-transparent focus:border-blue-500 outline-none shadow-sm transition-all" required>
                    <select id="userRole" onchange="updateUI()" class="w-full p-5 rounded-2xl bg-white border-2 border-transparent focus:border-blue-500 outline-none shadow-sm font-bold text-gray-700">
                        <option value="">-- Zabi Matsayinka --</option>
                        <option value="vendor">Vendor (Mai Shago/Sana'a)</option>
                        <option value="expert">Kwararre (Service Provider)</option>
                        <option value="medical">Lafiya (Doctor/Clinic/Lab)</option>
                    </select>
                </div>
                <button type="button" onclick="goToStep(2)" class="w-full bg-blue-600 text-white font-black py-5 rounded-[2rem] text-lg shadow-xl hover:bg-blue-700 active:scale-95 transition-all">CI GABA</button>
            </div>

            <div id="step2" class="step-hidden space-y-6">
                <header>
                    <h3 class="text-2xl font-black text-gray-800">Tantance Gaskiya</h3>
                    <p class="text-sm text-gray-500">Muna amfani da GPS da AI don kare amana.</p>
                </header>

                <div class="space-y-4">
                    <div class="p-6 bg-blue-50 rounded-[2rem] border-2 border-blue-100 flex items-center justify-between">
                        <div>
                            <p class="font-black text-blue-900">GPS Location</p>
                            <p id="gps-text" class="text-[10px] text-blue-600 uppercase font-bold tracking-widest">Ba a tantance ba</p>
                        </div>
                        <button type="button" onclick="fetchGPS()" class="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700">
                            📍 Dauka
                        </button>
                    </div>

                    <div class="relative group cursor-pointer border-2 border-dashed border-gray-300 p-10 rounded-[2rem] text-center hover:border-blue-500 transition-all bg-white/50">
                        <div class="text-4xl mb-2">📸</div>
                        <p class="font-bold text-gray-700">AI LIVE SCANNER</p>
                        <p class="text-[10px] text-gray-400">Bude kyamara don nuna wurin aiki ko shago</p>
                    </div>
                </div>

                <div class="flex gap-4">
                    <button type="button" onclick="goToStep(1)" class="flex-1 bg-gray-100 text-gray-600 font-bold py-5 rounded-[2rem]">BAYA</button>
                    <button type="button" onclick="goToStep(3)" class="flex-1 bg-blue-600 text-white font-bold py-5 rounded-[2rem] shadow-lg">CI GABA</button>
                </div>
            </div>

            <div id="step3" class="step-hidden space-y-6">
                <header>
                    <h3 class="text-2xl font-black text-gray-800" id="step3-title">Shaidar Aiki</h3>
                    <p class="text-sm text-gray-500" id="step3-desc">Loda abubuwan da zasu tabbatar da sana'ar ka.</p>
                </header>

                <div id="dynamic-content" class="grid grid-cols-2 gap-3">
                    </div>

                <div class="flex gap-4 pt-4">
                    <button type="button" onclick="goToStep(2)" class="flex-1 bg-gray-100 text-gray-600 font-bold py-5 rounded-[2rem]">BAYA</button>
                    <button type="submit" class="flex-1 bg-green-600 text-white font-bold py-5 rounded-[2rem] shadow-xl hover:bg-green-700 transition-all">KAMMALA RAJISTA</button>
                </div>
            </div>
        </form>
    </div>

    <script>
        function goToStep(s) {
            for(let i=1; i<=3; i++) document.getElementById('step'+i).classList.add('step-hidden');
            document.getElementById('step'+s).classList.remove('step-hidden');
            document.getElementById('progress').style.width = (s === 1 ? '33%' : s === 2 ? '66%' : '100%');
            if(s === 3) loadDynamicFields();
        }

        function loadDynamicFields() {
            const role = document.getElementById('userRole').value;
            const container = document.getElementById('dynamic-content');
            const title = document.getElementById('step3-title');
            container.innerHTML = "";

            if(role === 'vendor') {
                title.innerText = "Inventory Shago";
                for(let i=1; i<=4; i++) container.innerHTML += `<div class='p-6 border-2 border-gray-100 rounded-3xl text-center text-[10px] font-bold bg-white'>+ HOTO ${i}</div>`;
            } else {
                title.innerText = "Kwarewa & Shaidu";
                container.innerHTML = `<div class='col-span-2 p-6 border-2 border-gray-100 rounded-3xl bg-white'>
                    <input type='text' placeholder='Wane Service kake bayarwa?' class='w-full mb-3 p-3 border rounded-xl'>
                    <p class='text-[10px] font-bold mb-2'>LODA CERTIFICATE / LICENSE</p>
                    <input type='file' class='text-[10px]'>
                </div>`;
            }
        }

        function fetchGPS() {
            const status = document.getElementById('gps-text');
            status.innerText = "TANTANCEWA: 55%...";
            setTimeout(() => { 
                status.innerText = "TANTANCE: SUCCESS 📍 (Lat: 12.002, Long: 8.591)";
                status.classList.replace('text-blue-600', 'text-green-600');
            }, 2000);
        }
    </script>
</body>
</html>
