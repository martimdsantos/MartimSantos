/**
 * ==========================================
 * PORTFÓLIO PESSOAL - JavaScript
 * ==========================================
 * Animações e interatividade do site
 */

(function () {
    'use strict';

    /**
     * ==========================================
     * ANIMAÇÃO DE SCROLL (Intersection Observer)
     * ==========================================
     * Anima elementos quando entram no viewport
     */
    function initScrollAnimations() {
        // Seleciona todos os elementos que devem ser animados
        const animatedElements = document.querySelectorAll(
            '.section-title, .about-content, .project-card, .skills-container'
        );

        // Adiciona a classe base de animação
        animatedElements.forEach((element) => {
            element.classList.add('animate-on-scroll');
        });

        // Configuração do observer
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.1 // 10% do elemento visível
        };

        // Callback quando elemento entra/sai do viewport
        const observerCallback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Adiciona classe para mostrar o elemento
                    entry.target.classList.add('visible');
                    // Para de observar após a animação
                    observer.unobserve(entry.target);
                }
            });
        };

        // Cria e inicia o observer
        const observer = new IntersectionObserver(
            observerCallback,
            observerOptions
        );

        animatedElements.forEach((element) => {
            observer.observe(element);
        });
    }

    /**
     * ==========================================
     * EFEITO DE TYPING NO HEADER (opcional)
     * ==========================================
     * Descomente para activar efeito de escrita
     */
    /*
    function initTypingEffect() {
        const tagline = document.querySelector('.header-tagline');
        if (!tagline) return;

        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.style.borderRight = '2px solid var(--accent-primary)';

        let index = 0;
        const typeSpeed = 50;

        function type() {
            if (index < text.length) {
                tagline.textContent += text.charAt(index);
                index++;
                setTimeout(type, typeSpeed);
            } else {
                // Remove cursor após terminar
                setTimeout(() => {
                    tagline.style.borderRight = 'none';
                }, 1000);
            }
        }

        // Inicia após um pequeno delay
        setTimeout(type, 500);
    }
    */

    /**
     * ==========================================
     * SMOOTH SCROLL PARA LINKS INTERNOS
     * ==========================================
     * Navegação suave para âncoras
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * ==========================================
     * ANO DINÂMICO NO COPYRIGHT
     * ==========================================
     * Actualiza o ano automaticamente
     */
    function updateCopyrightYear() {
        const copyrightElement = document.querySelector('.footer-copyright');
        if (copyrightElement) {
            const currentYear = new Date().getFullYear();
            copyrightElement.textContent = copyrightElement.textContent.replace(
                /\d{4}/,
                currentYear
            );
        }
    }

    /**
     * ==========================================
     * INICIALIZAÇÃO
     * ==========================================
     * Executa quando o DOM está pronto
     */
    function init() {
        initScrollAnimations();
        initSmoothScroll();
        updateCopyrightYear();
        // initTypingEffect(); // Descomente para activar
    }

    // Aguarda o DOM carregar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
