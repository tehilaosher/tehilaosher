<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tehila Osher | Digital Atelier</title>
    <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@200;400;600&family=Playfair+Display:wght@500;700&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <style>
        :root { --gold: #c5a059; --bg: #faf8f5; --text: #1a1a1a; --white: #ffffff; }
        body { margin: 0; background: var(--bg); color: var(--text); font-family: 'Assistant', sans-serif; overflow-x: hidden; }

        /* דף הבית */
        #home-screen { 
            display: flex; flex-direction: column; align-items: center; justify-content: center; 
            min-height: 100vh; text-align: center; background: var(--bg);
        }
        .main-nav { 
            display: grid; grid-template-columns: repeat(2, 1fr); gap: 25px; 
            max-width: 900px; width: 90%; margin-top: 50px;
        }
        .category-card { 
            background: var(--white); border: 1px solid #eee; padding: 80px 20px; 
            font-family: 'Playfair Display', serif; font-size: 2rem; cursor: pointer;
            transition: 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .category-card:hover { transform: translateY(-8px); border-color: var(--gold); color: var(--gold); }

        /* ממשק העריכה */
        #editor-screen { display: none; padding: 40px; max-width: 1300px; margin: 0 auto; grid-template-columns: 450px 1fr; gap: 50px; }
        
        .back-fixed { 
            position: fixed; left: 30px; top: 30px; background: var(--white); 
            border: 1px solid var(--text); padding: 12px 25px; cursor: pointer;
            font-weight: 600; z-index: 100; transition: 0.3s;
        }
        .back-fixed:hover { background: var(--text); color: #fff; }

        #viz-box { width: 100%; height: 600px; background: #fff; border-radius: 4px; position: sticky; top: 30px; display: flex; justify-content: center; align-items: center; }
        
        .section-title { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; color: #aaa; margin: 25px 0 10px; display: block; }
        .options-grid { display: flex; flex-wrap: wrap; gap: 10px; }
        .options-grid label { cursor: pointer; flex: 1; min-width: 100px; }
        .options-grid input { display: none; }
        .opt-card { border: 1px solid #eee; padding: 15px; text-align: center; background: #fff; transition: 0.3s; display: block; }
        .options-grid input:checked + .opt-card { border-color: var(--gold); color: var(--gold); background: #fdfbf8; }

        .price-area { margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px; text-align: center; }
        .final-price { font-size: 3.5rem; font-family: 'Playfair Display'; margin-bottom: 20px; }
        .btn-order { background: var(--text); color: #fff; width: 100%; padding: 20px; border: none; font-size: 1.1rem; cursor: pointer; font-weight: 600; }
        
        .loading-overlay { opacity: 0.4; pointer-events: none; transition: 0.5s; }
    </style>
</head>
<body>

    <div id="home-screen">
        <h1 style="font-family: 'Playfair Display'; font-size: 4rem; margin: 0;">תהלה אושר</h1>
        <p style="letter-spacing: 5px; opacity: 0.5;">AI JEWELRY STUDIO</p>
        <div class="main-nav">
            <div class="category-card" onclick="startDesign('ring')">טבעות</div>
            <div class="category-card" onclick="startDesign('earrings')">עגילים</div>
            <div class="category-card" onclick="startDesign('necklace')">שרשראות</div>
            <div class="category-card" onclick="startDesign('bracelet')">צמידים</div>
        </div>
    </div>

    <div id="editor-screen">
        <button class="back-fixed" onclick="resetToHome()">← חזרה לתפריט</button>

        <div class="ui-panel">
            <h2 id="display-title" style="font-family: 'Playfair Display'; font-size: 2.5rem;">עיצוב</h2>
            
            <div id="dynamic-fields"></div>

            <span class="section-title">חומר (זהב)</span>
            <div class="options-grid">
                <label><input type="radio" name="gold" value="9" checked onchange="refresh()"><span class="opt-card">9K</span></label>
                <label><input type="radio" name="gold" value="14" onchange="refresh()"><span class="opt-card">14K</span></label>
                <label><input type="radio" name="gold" value="18" onchange="refresh()"><span class="opt-card">18K</span></label>
            </div>

            <span class="section-title">הנחיות AI (שינוי צבע או עובי)</span>
            <textarea id="ai-text" style="width:100%; height:80px; border:1px solid #eee; padding:15px; font-family:inherit;" placeholder="למשל: 'זהב אדום', 'לעבות את הטבעת'..."></textarea>
            <button onclick="applyAI()" style="margin-top:10px; width:100%; padding:15px; background:var(--gold); color:white; border:none; cursor:pointer; font-weight:600; width:100%;">עדכן עיצוב חכם</button>

            <div class="price-area">
                <div style="font-size:0.8rem; opacity:0.5; margin-bottom:5px;">מחיר משוער לעיצוב אישי</div>
                <div class="final-price" id="total-val">₪ 0</div>
                <button class="btn-order">המשך להזמנה לייצור</button>
            </div>
        </div>

        <div id="viz-box"></div>
    </div>

<script>
    let activeType = '';
    let weightModifier = 1.0;
    const GOLD_PPG = { "9": 195, "14": 305, "18": 415 };

    // Three.js Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(600, 600);
    document.getElementById('viz-box').appendChild(renderer.domElement);
    
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    let currentGeo = new THREE.TorusGeometry(0.7, 0.1, 16, 100);
    let ringMat = new THREE.MeshStandardMaterial({color: 0xd4af37, metalness:0.9, roughness:0.1});
    let jewelry = new THREE.Mesh(currentGeo, ringMat);
    scene.add(jewelry);
    camera.position.z = 4;

    function animate() { 
        requestAnimationFrame(animate); 
        jewelry.rotation.y += 0.01; 
        renderer.render(scene, camera); 
    }
    animate();

    function startDesign(type) {
        activeType = type;
        weightModifier = 1.0;
        document.getElementById('home-screen').style.display = 'none';
        document.getElementById('editor-screen').style.display = 'grid';
        
        const titles = { ring: 'טבעת', earrings: 'עגילים', necklace: 'שרשרת', bracelet: 'צמיד' };
        document.getElementById('display-title').innerText = "עיצוב " + titles[type];

        // התאמת צורת המודל
        if(type === 'necklace' || type === 'bracelet') {
            jewelry.geometry = new THREE.TorusGeometry(1.2, 0.05, 16, 100);
        } else {
            jewelry.geometry = new THREE.TorusGeometry(0.7, 0.1, 16, 100);
        }
        
        ringMat.color.setHex(0xd4af37);
        jewelry.scale.set(1, 1, 1);
        refresh();
    }

    function resetToHome() {
        document.getElementById('home-screen').style.display = 'flex';
        document.getElementById('editor-screen').style.display = 'none';
    }

    function applyAI() {
        const text = document.getElementById('ai-text').value.toLowerCase();
        const viz = document.getElementById('viz-box');
        viz.classList.add('loading-overlay');

        setTimeout(() => {
            if(text.includes("אדום") || text.includes("רוז")) ringMat.color.setHex(0xb76e79);
            else if(text.includes("לבן") || text.includes("כסף")) ringMat.color.setHex(0xe5e4e2);
            else ringMat.color.setHex(0xd4af37);

            if(text.includes("עבה") || text.includes("גדול")) {
                jewelry.scale.set(1.4, 1.4, 1.4);
                weightModifier = 1.6;
            } else if(text.includes("דק") || text.includes("עדין")) {
                jewelry.scale.set(0.7, 0.7, 0.7);
                weightModifier = 0.7;
            } else {
                jewelry.scale.set(1, 1, 1);
                weightModifier = 1.0;
            }

            viz.classList.remove('loading-overlay');
            refresh();
        }, 600);
    }

    function refresh() {
        const goldVal = document.querySelector('input[name="gold"]:checked').value;
        const baseWeights = { ring: 3.5, earrings: 5.2, necklace: 8.5, bracelet: 13 };
        
        // מחיר חומר גלם + בסיס אבן
        let rawCost = (baseWeights[activeType] * weightModifier * GOLD_PPG[goldVal]) + 1400;
        
        // מחיר עבודה פי 2 (סה"כ פי 3 מחומר)
        let total = rawCost * 3;
        
        document.getElementById('total-val').innerText = `₪${Math.round(total).toLocaleString()}`;
    }
</script>
</body>
</html>
