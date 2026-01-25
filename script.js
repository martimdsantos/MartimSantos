/**
 * ==========================================
 * PORTFÓLIO SCI-FI - JavaScript
 * ==========================================
 */

(function () {
    'use strict';

    /**
     * ==========================================
     * STARS BACKGROUND - Canvas Animation
     * ==========================================
     */
    function initStarsCanvas() {
        const canvas = document.getElementById('stars-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let stars = [];
        let animationId;

        // Configurações
        const config = {
            starCount: 150,
            starColor: '#66fcf1',
            starMinSize: 0.5,
            starMaxSize: 2,
            speed: 0.3
        };

        // Redimensionar canvas
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        }

        // Criar estrelas
        function initStars() {
            stars = [];
            for (let i = 0; i < config.starCount; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * (config.starMaxSize - config.starMinSize) + config.starMinSize,
                    opacity: Math.random(),
                    speed: Math.random() * config.speed + 0.1,
                    twinkleSpeed: Math.random() * 0.02 + 0.005,
                    twinkleDirection: Math.random() > 0.5 ? 1 : -1
                });
            }
        }

        // Desenhar estrelas
        function drawStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {
                // Efeito twinkle
                star.opacity += star.twinkleSpeed * star.twinkleDirection;
                if (star.opacity >= 1 || star.opacity <= 0.2) {
                    star.twinkleDirection *= -1;
                }

                // Movimento lento para baixo
                star.y += star.speed;
                if (star.y > canvas.height) {
                    star.y = 0;
                    star.x = Math.random() * canvas.width;
                }

                // Desenhar
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(102, 252, 241, ${star.opacity})`;
                ctx.fill();

                // Glow effect para estrelas maiores
                if (star.size > 1.5) {
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(102, 252, 241, ${star.opacity * 0.2})`;
                    ctx.fill();
                }
            });
        }

        // Loop de animação
        function animate() {
            drawStars();
            animationId = requestAnimationFrame(animate);
        }

        // Inicializar
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();

        // Cleanup para reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            cancelAnimationFrame(animationId);
            drawStars(); // Desenha uma vez só
        }
    }

    /**
     * ==========================================
     * SCROLL ANIMATIONS
     * ==========================================
     */
    function initScrollAnimations() {
        const elements = document.querySelectorAll(
            '.section-title, .about-content, .about-image, .project-card, .skills-container'
        );

        elements.forEach(el => el.classList.add('animate-on-scroll'));

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        elements.forEach(el => observer.observe(el));
    }

    /**
     * ==========================================
     * SMOOTH SCROLL
     * ==========================================
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    /**
     * ==========================================
     * TYPING EFFECT (Optional)
     * ==========================================
     */
    function initTypingEffect() {
        const tagline = document.querySelector('.header-tagline');
        if (!tagline) return;

        const text = tagline.textContent;
        tagline.textContent = '';

        let i = 0;
        function type() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(type, 80);
            }
        }

        // Iniciar após a animação do header
        setTimeout(type, 800);
    }

    /**
     * ==========================================
     * COPYRIGHT YEAR
     * ==========================================
     */
    function updateCopyrightYear() {
        const copyright = document.querySelector('.footer-copyright');
        if (copyright) {
            const year = new Date().getFullYear();
            copyright.innerHTML = copyright.innerHTML.replace(/\d{4}/, year);
        }
    }

    /**
     * ==========================================
     * PARALLAX EFFECT (subtle)
     * ==========================================
     */
    function initParallax() {
        const header = document.querySelector('.header-content');
        if (!header) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            header.style.transform = `translateY(${rate}px)`;
            header.style.opacity = 1 - (scrolled * 0.002);
        });
    }

    /**
     * ==========================================
     * INIT
     * ==========================================
     */
    function init() {
        initStarsCanvas();
        initScrollAnimations();
        initSmoothScroll();
        initTypingEffect();
        updateCopyrightYear();
        initParallax();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
