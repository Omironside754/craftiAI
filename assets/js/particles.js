document.addEventListener('DOMContentLoaded', () => {
    // Initialize both canvases with a function
    initCanvas('about-particle-canvas', 'two');
    initCanvas('products-particle-canvas', 'products');
    
    function initCanvas(canvasId, sectionId) {
        let canvas = document.querySelector(`#${canvasId}`);
        
        if (!canvas) {
            console.error(`Canvas element '#${canvasId}' not found!`);
            return;
        }
        
        let context = canvas.getContext('2d');
        if (!context) {
            console.error(`Failed to get 2D context for '#${canvasId}'!`);
            return;
        }
        
        let SCREEN_WIDTH = window.innerWidth;
        let SCREEN_HEIGHT = document.getElementById(sectionId).offsetHeight;
        
        canvas.width = SCREEN_WIDTH;
        canvas.height = SCREEN_HEIGHT;
        
        let RADIUS = 70;
        let RADIUS_SCALE = 1;
        let RADIUS_SCALE_MIN = 1;
        let RADIUS_SCALE_MAX = 1.5;
        let QUANTITY = 25;
        let particles = [];
        let mouseX = SCREEN_WIDTH / 2;
        let mouseY = SCREEN_HEIGHT / 2;
        let mouseIsDown = false;
        
        // Initialize particles
        initParticles();
        
        // Start animation
        animate();
        
        function initParticles() {
            particles = [];
            for (let i = 0; i < QUANTITY; i++) {
                particles.push({
                    size: 1,
                    position: { x: mouseX, y: mouseY },
                    offset: { x: 0, y: 0 },
                    shift: { x: mouseX, y: mouseY },
                    speed: 0.01 + Math.random() * 0.04,
                    targetSize: 1 + Math.random() * 7,
                    fillColor: '#' + (Math.random() * 0x404040 + 0xaaaaaa | 0).toString(16),
                    orbit: RADIUS * 0.5 + (RADIUS * 0.5 * Math.random())
                });
            }
        }
        
        function updateParticles() {
            context.fillStyle = 'rgba(6, 11, 64, 0.05)';
            context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
            
            particles.forEach((particle, i) => {
                let lp = { x: particle.position.x, y: particle.position.y };
                
                particle.offset.x += particle.speed;
                particle.offset.y += particle.speed;
                
                particle.shift.x += (mouseX - particle.shift.x) * (particle.speed);
                particle.shift.y += (mouseY - particle.shift.y) * (particle.speed);
                
                particle.position.x = particle.shift.x + Math.cos(i + particle.offset.x) * (particle.orbit * RADIUS_SCALE);
                particle.position.y = particle.shift.y + Math.sin(i + particle.offset.y) * (particle.orbit * RADIUS_SCALE);
                
                particle.position.x = Math.max(Math.min(particle.position.x, SCREEN_WIDTH), 0);
                particle.position.y = Math.max(Math.min(particle.position.y, SCREEN_HEIGHT), 0);
                
                particle.size += (particle.targetSize - particle.size) * 0.05;
                if (Math.round(particle.size) === Math.round(particle.targetSize)) {
                    particle.targetSize = 1 + Math.random() * 7;
                }
                
                context.beginPath();
                context.fillStyle = particle.fillColor;
                context.strokeStyle = particle.fillColor;
                context.lineWidth = particle.size / 2;
                context.moveTo(lp.x, lp.y);
                context.lineTo(particle.position.x, particle.position.y);
                context.stroke();
                context.arc(particle.position.x, particle.position.y, particle.size / 2, 0, Math.PI * 2, true);
                context.fill();
            });
        }
        
        function animate() {
            if (mouseIsDown) {
                RADIUS_SCALE += (RADIUS_SCALE_MAX - RADIUS_SCALE) * 0.02;
            } else {
                RADIUS_SCALE -= (RADIUS_SCALE - RADIUS_SCALE_MIN) * 0.02;
            }
            RADIUS_SCALE = Math.min(RADIUS_SCALE, RADIUS_SCALE_MAX);
            
            updateParticles();
            requestAnimationFrame(animate);
        }
        
        // Add event listeners specific to this canvas
        canvas.addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = event.clientX - rect.left;
            mouseY = event.clientY - rect.top;
        });
        
        canvas.addEventListener('mousedown', () => {
            mouseIsDown = true;
        });
        
        canvas.addEventListener('mouseup', () => {
            mouseIsDown = false;
        });
        
        // Handle window resize for this canvas
        window.addEventListener('resize', () => {
            SCREEN_WIDTH = window.innerWidth;
            SCREEN_HEIGHT = document.getElementById(sectionId).offsetHeight;
            canvas.width = SCREEN_WIDTH;
            canvas.height = SCREEN_HEIGHT;
        });
    }
});