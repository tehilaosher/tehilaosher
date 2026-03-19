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
            min-height: 100vh; text-align: center; padding: 20px;
        }
        .main-nav { 
            display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; 
            max-width: 900px; width: 100%; margin-top: 40px;
        }
        
        /* התאמה לנייד - כפתורי דף הבית */
        @media (max-width: 600px) {
            .main-nav { grid-template-columns: 1fr; gap: 10px; }
            h1 { font-size: 2.5rem !important; }
            .category-card { padding: 40px 15px !important; font-size: 1.5rem !important; }
        }

        .category-card { 
            background: var(--white); border: 1px solid #eee; padding: 60px 20px; 
            font-family: 'Playfair Display', serif; font-size: 1.8rem; cursor: pointer;
            transition: 0.4s ease;
        }
        .category-card:hover { transform: translateY(-5px); border-color: var(--gold); color: var(--gold); }

        /* ממשק העריכה - מותאם לנייד */
        #editor-screen { 
            display: none; padding: 20px; max-width: 1300px; margin: 0 auto; 
            grid-template-columns: 400px 1fr; gap: 30px; 
        }
        
        @media (max-width: 950px) {
            #editor-screen { grid-template-columns: 1fr; padding: 15px; padding-top: 80px; }
            #viz-box { order: -1; height: 350px !important; position: relative !important; top: 0 !important; }
            .back-fixed { left: 15px; top: 15px; padding: 10px 15px; font-size: 0.9rem; }
        }

        .back-fixed { 
            position: fixed; left: 30px; top: 30px; background: var(--white); 
            border: 1px solid var(--text); padding: 12px 25px; cursor: pointer;
            font-weight: 600; z-index: 100; transition: 0.3s;
        }

        #viz-box { width: 100%; height: 550px; background: #fff; border-radius: 4px; position: sticky; top: 30px; }
        
        .section-title { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: #aaa; margin: 20px 0 10px; display: block; }
        .options-grid { display: flex; flex-wrap: wrap; gap: 8px; }
        .options-grid label { cursor: pointer; flex: 1; min-width: 80px; }
        .options-grid input { display: none; }
        .opt-card { border: 1px solid #eee; padding: 12px; text-align: center; background: #fff; font-size: 0.9rem; display: block; }
        .options-grid input:checked + .opt-card { border-color: var(--gold); color: var(--gold); background: #fdfbf8; }

        .price-area { margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; }
        .final-price { font-size: 2.8rem; font-family: 'Playfair Display'; margin-bottom: 15px; }
        .btn-order { background: var(--text); color: #fff; width: 100%; padding: 18px; border: none; font-size: 1rem; cursor: pointer; }
    </style>
</head>
<body>

    <div id="home-screen">
        <h1 style="font-family: 'Playfair Display'; font-size: 3.5rem; margin: 0;">תהלה אושר</h1>
        <p style="letter-spacing: 3px; opacity: 0.5; font-size: 0.8rem;">STUDIO DE DESIGN AI</p>
        <div class="main-nav">
            <div class="category-card" onclick="startDesign('ring')">טבעות</div>
            <div class="category-card" onclick="startDesign('earrings')">עגילים</div>
            <div class="category-card" onclick="startDesign('necklace')">שרשראות</div>
            <div class="category-card" onclick="startDesign('bracelet')">צמידים</div>
        </div>
    </div>

    <div id="editor-screen">
        <button class="back-fixed" onclick="resetToHome()">← חזרה</button>

        <div class="ui-panel">
            <h2 id="display-title" style="font-family: 'Playfair Display'; font-size: 2rem;">עיצוב</h2>
            
            <div id="dynamic-fields"></div>

            <span class="section-title">חומר (זהב)</span>
            <div class="options-grid">
                <label><input type="radio" name="gold" value="9" checked onchange="refresh()"><span class="opt-card">9K</span></label>
                <label><input type="radio" name="gold" value="14" onchange="refresh()"><span class="opt-card">14K</span></label>
                <label><input type="radio" name="gold" value="18" onchange="refresh()"><span class="opt-card">18K</span></label>
            </div>

            <span class="section-title">הנחיות AI מיוחדות</span>
            <textarea id="ai-text" style="width:100%; height:70px; border:1px solid #eee; padding:12px; box-sizing: border-box;" placeholder="למשל: 'זהב לבן', 'חריטה'..."></textarea>
            <button onclick="refresh()" style="margin-top:10px; width:100%; padding:10px; background:#f0f0f0; border:none; cursor:pointer;">עדכן הדמיה</button>

            <div class="price-area">
                <div class="final-price" id="total-val">₪ 0</div>
                <button class="btn-order">הזמנה לייצור</button>
            </div>
        </div>

        <div id="viz-box"></div>
    </div>

<script>
    let activeType = '';
    const GOLD_PPG = { "9": 190, "14": 300, "18": 410 };

    function startDesign(type) {
        activeType = type;
        document.getElementById('home-screen').style.display = 'none';
        document.getElementById('editor-screen').style.display = 'grid';
        window.scrollTo(0, 0);
        
        const fields = document.getElementById('dynamic-fields');
        const titles = { ring: 'טבעת', earrings: 'עגילים', necklace: 'שרשרת', bracelet: 'צמיד' };
        document.getElementById('display-title').innerText = "עיצוב " + titles[type];

        let html = '';
        if(type === 'earrings') {
            html += `<span class="section-title">סוג סגירה</span>
                     <div class="options-grid">
                        <label><input type="radio" name="sub" checked><span class="opt-card">פרפר</span></label>
                        <label><input type="radio" name="sub"><span class="opt-card">הברגה</span></label>
                     </div>`;
        } else if(type === 'necklace') {
            html += `<span class="section-title">אורך שרשרת</span>
                     <div class="options-grid">
                        <label><input type="radio" name="sub" checked><span class="opt-card">40 ס"מ</span></label>
                        <label><input type="radio" name="sub"><span class="opt-card">50 ס"מ</span></label>
                     </div>`;
        } else {
            html += `<span class="section-title">סגנון עיצוב</span>
                     <div class="options-grid">
                        <label><input type="radio" name="sub" checked><span class="opt-card">קלאסי</span></label>
                        <label><input type="radio" name="sub"><span class="opt-card">מודרני</span></label>
                     </div>`;
        }
        fields.innerHTML = html;
        refresh();
    }

    function resetToHome() {
        document.getElementById('home-screen').style.display = 'flex';
        document.getElementById('editor-screen').style.display = 'none';
    }

    function refresh() {
        const goldVal = document.querySelector('input[name="gold"]:checked').value;
        const weights = { ring: 3.5, earrings: 5.5, necklace: 8, bracelet: 12 };
        let matPrice = weights[activeType] * GOLD_PPG[goldVal] + 1000;
        let total = matPrice * 3;
        document.getElementById('total-val').innerText = `₪${Math.round(total).toLocaleString()}`;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    const vizBox = document.getElementById('viz-box');
    renderer.setSize(vizBox.clientWidth, vizBox.clientWidth); 
    vizBox.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.1, 16, 100), new THREE.MeshStandardMaterial({color: 0xc5a059, metalness:0.9, roughness:0.1}));
    scene.add(ring); camera.position.z = 4;
    
    function animate() { 
        requestAnimationFrame(animate); 
        ring.rotation.y += 0.01; 
        renderer.render(scene, camera); 
    }
    animate();

    window.addEventListener('resize', () => {
        const width = vizBox.clientWidth;
        renderer.setSize(width, width);
    });
</script>
</body>
</html>
