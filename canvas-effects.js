/**
 * MOTEUR GRAPHIQUE V2 (EAU RÉALISTE & GALAXIE)
 */

const rainCanvas = document.getElementById('rain-canvas');
const galaxyCanvas = document.getElementById('galaxy-canvas');

// --- MOTEUR PLUIE (WATER EFFECT) ---
let rainCtx, rainW, rainH;
let raindrops = [];

function initRain() {
    if(!rainCanvas) return;
    rainCtx = rainCanvas.getContext('2d');
    resizeRain();
    window.addEventListener('resize', resizeRain);
    
    for(let i=0; i<600; i++) {
        raindrops.push(new RainDrop());
    }
    animateRain();
}

function resizeRain() {
    rainW = rainCanvas.width = window.innerWidth;
    rainH = rainCanvas.height = window.innerHeight;
}

class RainDrop {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * rainW;
        this.y = Math.random() * -rainH;
        this.z = Math.random() * 20 + 5; 
        this.len = Math.random() * 30 + 15;
        this.vel = Math.random() * 15 + 10;
        this.opacity = this.z / 25; 
    }
    
    update() {
        this.y += this.vel;
        this.x -= 1; 
        
        if(this.y > rainH) {
            this.reset();
        }
    }
    
    draw() {
        const grad = rainCtx.createLinearGradient(this.x, this.y, this.x - 1, this.y + this.len);
        grad.addColorStop(0, `rgba(255, 255, 255, 0)`);
        grad.addColorStop(0.5, `rgba(174, 194, 224, ${this.opacity * 0.5})`);
        grad.addColorStop(1, `rgba(200, 220, 255, ${this.opacity})`);

        rainCtx.beginPath();
        rainCtx.strokeStyle = grad;
        rainCtx.lineWidth = this.z / 10;
        rainCtx.lineCap = 'round';
        rainCtx.moveTo(this.x, this.y);
        rainCtx.lineTo(this.x - 1, this.y + this.len);
        rainCtx.stroke();
    }
}

function animateRain() {
    if(!document.body.classList.contains('theme-rain')) {
        requestAnimationFrame(animateRain);
        return; 
    }

    rainCtx.clearRect(0, 0, rainW, rainH);
    for(let drop of raindrops) {
        drop.update();
        drop.draw();
    }
    requestAnimationFrame(animateRain);
}


// --- MOTEUR GALAXIE (CORRIGÉ) ---
let galCtx, galW, galH;
let stars = [];

function initGalaxy() {
    if(!galaxyCanvas) return;
    galCtx = galaxyCanvas.getContext('2d');
    resizeGalaxy();
    window.addEventListener('resize', resizeGalaxy);

    for(let i=0; i<800; i++) {
        stars.push(new Star());
    }
    animateGalaxy();
}

function resizeGalaxy() {
    galW = galaxyCanvas.width = window.innerWidth;
    galH = galaxyCanvas.height = window.innerHeight;
}

class Star {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * galW;
        this.y = Math.random() * galH;
        this.size = Math.random() * 2.5;
        // Vitesse de clignotement RALENTIE (divisé par 10)
        this.blinkSpeed = Math.random() * 0.005 + 0.0005;
        this.alpha = Math.random();
        this.alphaDir = 1;
        this.speed = Math.random() * 0.5 + 0.1;
    }
    
    update() {
        // Scintillement lent
        this.alpha += this.blinkSpeed * this.alphaDir;
        if(this.alpha > 1) { this.alpha = 1; this.alphaDir = -1; }
        if(this.alpha < 0.2) { this.alpha = 0.2; this.alphaDir = 1; }
        
        this.y += this.speed; 
        if(this.y > galH) {
            this.y = 0;
            this.x = Math.random() * galW;
        }
    }
    
    draw() {
        galCtx.beginPath();
        galCtx.fillStyle = `rgba(${200 + Math.random()*55}, ${200 + Math.random()*55}, 255, ${this.alpha})`;
        galCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        galCtx.fill();
        
        if(Math.random() > 0.99) {
            galCtx.shadowBlur = 15;
            galCtx.shadowColor = "white";
        } else {
            galCtx.shadowBlur = 0;
        }
    }
}

function animateGalaxy() {
    if(!document.body.classList.contains('theme-galaxy')) {
        requestAnimationFrame(animateGalaxy);
        return;
    }

    // Utilisation de clearRect pour éviter l'effet stroboscopique de la traînée
    galCtx.clearRect(0, 0, galW, galH);
    
    for(let star of stars) {
        star.update();
        star.draw();
    }
    requestAnimationFrame(animateGalaxy);
}

document.addEventListener('DOMContentLoaded', () => {
    initRain();
    initGalaxy();
});