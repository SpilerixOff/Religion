document.addEventListener('DOMContentLoaded', () => {
    
    // --- LOGIQUE INTRO ---
    document.body.classList.add('intro-active'); // Bloque le scroll

    window.enterSite = function() {
        const overlay = document.getElementById('intro-overlay');
        overlay.classList.add('warp-out'); // Animation de sortie
        
        setTimeout(() => {
            overlay.style.display = 'none';
            document.body.classList.remove('intro-active');
        }, 800);
    }

    window.toggleCredits = function() {
        const card = document.getElementById('intro-card');
        card.classList.toggle('flipped');
    }

    // --- GESTION DES THÈMES ---
    const themeBtn = document.getElementById('theme-btn');
    const themeMenu = document.getElementById('theme-menu');
    
    themeBtn.addEventListener('click', () => {
        themeMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if(!themeBtn.contains(e.target) && !themeMenu.contains(e.target)) {
            themeMenu.classList.remove('active');
        }
    });

    let weatherInterval;

    window.setTheme = function(themeName) {
        document.body.className = ''; // Reset classes
        if(themeName !== 'default') {
            document.body.classList.add('theme-' + themeName);
        }
        
        themeBtn.style.transform = "rotate(360deg) scale(1.2)";
        setTimeout(() => themeBtn.style.transform = "rotate(0) scale(1)", 500);
        
        themeMenu.classList.remove('active');

        const weatherContainer = document.getElementById('weather-container');
        if(weatherContainer) weatherContainer.innerHTML = ''; 
        clearInterval(weatherInterval);

        if(themeName === 'countryside') {
            spawnWeather(); 
            weatherInterval = setInterval(spawnWeather, 15000); 
        }
        
        // Relancer animations canvas si besoin (géré par la boucle requestAnimationFrame)
        if(themeName === 'rain' && window.initRain) window.initRain();
        if(themeName === 'galaxy' && window.initGalaxy) window.initGalaxy();
    }

    // --- MOTEUR MÉTÉO INFINI (JS) ---
    function spawnWeather() {
        const container = document.getElementById('weather-container');
        if(!container) return;

        const types = ['sun', 'cloud-rain', 'cloud-storm', 'rainbow'];
        const type = types[Math.floor(Math.random() * types.length)];

        const el = document.createElement('div');
        el.classList.add('weather-obj');
        el.style.left = '-200px'; 
        
        if(type === 'sun') {
            el.textContent = '☀️';
            el.classList.add('w-sun');
        } else if(type === 'cloud-rain') {
            el.textContent = '🌧️';
            el.classList.add('w-cloud');
        } else if(type === 'cloud-storm') {
            el.textContent = '⛈️';
            el.classList.add('w-storm');
            setTimeout(() => {
                const flash = document.createElement('div');
                flash.classList.add('lightning', 'flash');
                document.body.appendChild(flash);
                setTimeout(() => flash.remove(), 600);
            }, 5000); 
        } else if(type === 'rainbow') {
            el.textContent = '🌈';
            el.classList.add('w-rainbow');
        }

        container.appendChild(el);

        let pos = -10;
        const speed = 0.05; 
        const anim = setInterval(() => {
            if(!document.body.classList.contains('theme-countryside')) {
                clearInterval(anim);
                el.remove();
                return;
            }
            pos += speed;
            el.style.left = pos + '%';

            if(pos > 110) { 
                clearInterval(anim);
                el.remove();
            }
        }, 10);
    }


    // --- 1. Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- 2. 3D TILT EFFECT (Désactivé sur Mobile) ---
    const isMobile = window.innerWidth <= 768;
    
    if(!isMobile) {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; 
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
            });
        });
    }

    // --- 3. ANIMATIONS SCROLL ---
    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if(entry.target.id === 'arbre') animateTreeSequence();
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-panel, .base').forEach(el => observer.observe(el));
    const treeSection = document.querySelector('#arbre');
    if(treeSection) observer.observe(treeSection);

    function animateTreeSequence() {
        const c1 = document.querySelector('.c1');
        const c2 = document.querySelector('.c2');
        const c3 = document.querySelector('.c3');
        const center = document.querySelector('.center-intersection');
        const trunk = document.querySelector('.trunk');
        const base = document.querySelector('.base');
        const svgContainer = document.querySelector('.circles-group');

        setTimeout(() => c1.classList.add('active'), 100);
        setTimeout(() => c3.classList.add('active'), 300);
        setTimeout(() => c2.classList.add('active'), 600);
        setTimeout(() => svgContainer.classList.add('draw-active'), 1000);
        setTimeout(() => center.classList.add('active'), 1800);
        setTimeout(() => trunk.classList.add('active'), 2400);
        setTimeout(() => base.classList.add('active'), 3000);
    }

    showQuestion();
});

// --- LOGIQUE QUIZ SARCASTIQUE ---
const quizData = [
    { q: "Je me base sur des dogmes et la foi.", a: "religion", f: "Oui, c'est la base." },
    { q: "Je suis une recherche rationnelle.", a: "philo", f: "Bien joué Einstein." },
    { q: "Religare veut dire...", a: "religion", f: "Exact : Relier." },
    { q: "Ma réponse n'est jamais fermée.", a: "philo", f: "Correct, on cherche toujours." },
    { q: "Je cherche à comprendre le monde par la raison.", a: "philo", f: "C'est ça." },
    { q: "Je propose des vérités révélées.", a: "religion", f: "Amen." }
];

const sarcasticComments = [
    "Non... essaie encore.",
    "Toujours pas. Relis le cours.",
    "Tu le fais exprès ?",
    "Sérieusement ? C'est une chance sur deux !",
    "Je commence à perdre patience...",
    "Tu cliques au hasard là, avoue.",
    "J'ai pas toute la journée...",
    "Arrête de me faire perdre mon temps."
];

let currentQ = 0;
let isBusy = false;
let wrongAttempts = 0;

window.checkAnswer = function(choice) {
    if(isBusy) return;
    
    const data = quizData[currentQ];
    const feedback = document.getElementById('feedback');
    const card = document.getElementById('quiz-card');
    const btns = document.querySelectorAll('.btn-option');

    if(choice === data.a) {
        isBusy = true;
        feedback.innerHTML = `<span style="color:#27ae60">✅ ${data.f}</span>`;
        card.style.transform = "scale(1.02)";
        wrongAttempts = 0; 
        
        btns.forEach(b => {
            b.classList.remove('force-highlight');
            if(b.textContent.includes("CLIQUE")) {
                 b.textContent = b.textContent.includes("Philo") ? "C'est la Philo 🧠" : "C'est la Religion 🙏";
            }
        });

        setTimeout(() => {
            card.style.transform = "scale(1)";
            currentQ++;
            if(currentQ < quizData.length) showQuestion();
            else showEnd();
        }, 1500);

    } else {
        wrongAttempts++;
        let commentIndex = Math.min(wrongAttempts - 1, sarcasticComments.length - 1);
        let comment = sarcasticComments[commentIndex];
        feedback.innerHTML = `<span style="color:#c0392b">❌ ${comment}</span>`;
        
        if(wrongAttempts > 6) {
            feedback.innerHTML += "<br><strong>J'ABANDONNE. TIENS :</strong>";
            const realCorrectBtn = (data.a === 'philo') 
                ? document.querySelector("button[onclick*='philo']") 
                : document.querySelector("button[onclick*='religion']");
            if(realCorrectBtn) {
                realCorrectBtn.classList.add('force-highlight');
                realCorrectBtn.textContent = "CLIQUE ICI... 😤";
            }
        }
    }
}

function showQuestion() {
    isBusy = false;
    wrongAttempts = 0; 
    const qText = document.getElementById('q-text');
    if(!qText) return;
    
    document.querySelectorAll('.btn-option').forEach(b => {
        b.classList.remove('force-highlight');
        if(b.textContent.includes("CLIQUE")) {
             b.textContent = b.textContent.includes("Philo") ? "C'est la Philo 🧠" : "C'est la Religion 🙏";
        }
    });

    qText.style.opacity = 0;
    setTimeout(() => {
        qText.textContent = `"${quizData[currentQ].q}"`;
        qText.style.opacity = 1;
        document.getElementById('q-current').textContent = currentQ + 1;
        document.getElementById('feedback').textContent = "";
    }, 300);
}

function showEnd() {
    document.getElementById('quiz-card').innerHTML = `
        <div style="font-size: 5rem; animation: bounce 1s infinite;">🏆</div>
        <h3>ENFIN !</h3>
        <p>Tu as survécu à mes questions.</p>
        <button class="btn" onclick="location.reload()">Recommencer (à tes risques)</button>
    `;
}
