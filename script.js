// Floating white dots animation
const canvas = document.querySelector('.dots-bg');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let dots = [];
    const DOTS_COUNT = 40;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function randomDot() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: 2 + Math.random() * 3,
            speed: 0.2 + Math.random() * 0.5,
            drift: (Math.random() - 0.5) * 0.3
        };
    }

    function createDots() {
        dots = [];
        for (let i = 0; i < DOTS_COUNT; i++) {
            dots.push(randomDot());
        }
    }

    function animateDots() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let dot of dots) {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.shadowColor = '#fff';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
            dot.y += dot.speed;
            dot.x += dot.drift;
            if (dot.y - dot.r > canvas.height) {
                dot.y = -dot.r;
                dot.x = Math.random() * canvas.width;
            }
            if (dot.x < -dot.r) dot.x = canvas.width + dot.r;
            if (dot.x > canvas.width + dot.r) dot.x = -dot.r;
        }
        requestAnimationFrame(animateDots);
    }

    function initDots() {
        resizeCanvas();
        createDots();
        animateDots();
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        createDots();
    });

    window.addEventListener('DOMContentLoaded', initDots);
}