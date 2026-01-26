/**
 * ==========================================
 * PORTFÓLIO SCI-FI - JavaScript
 * ==========================================
 */

(function () {
    'use strict';

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
