// ==============================================
// PEGEARTS PORTFOLIO - MAIN JAVASCRIPT
//= ============================================//

// GSAP animations
gsap.fromTo('.hero-title', 
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1 }
);


class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.initializePlugins();
        this.setupScrollEffects();
        this.setupPreloader();
        this.setupContactForm();
        this.setupPortfolioFilter();
    }

    setupEventListeners() {
        // Navigation scroll effects
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Back to top button
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            backToTop.addEventListener('click', this.scrollToTop.bind(this));
        }

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.smoothScroll.bind(this));
        });

        // Interactive moon
        const interactiveMoon = document.getElementById('interactiveMoon');
        if (interactiveMoon) {
            interactiveMoon.addEventListener('click', this.moonClick.bind(this));
        }

        // Navigation active states
        this.setupNavigationActiveStates();
    }

    handleScroll() {
        const navbar = document.getElementById('mainNavbar');
        const backToTop = document.getElementById('backToTop');
        const scrollPosition = window.pageYOffset;

        // Navbar scroll effects
        if (scrollPosition > 100) {
            navbar.classList.add('scrolled');
            if (backToTop) backToTop.classList.add('show');
        } else {
            navbar.classList.remove('scrolled');
            if (backToTop) backToTop.classList.remove('show');
        }

        // Auto-hide navbar on scroll down
        if (scrollPosition > this.lastScrollTop && scrollPosition > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        this.lastScrollTop = scrollPosition;

        // Statistics counter animation
        this.animateCounters();
    }

    lastScrollTop = 0;

    setupPreloader() {
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                setTimeout(() => {
                    preloader.classList.add('hidden');
                    setTimeout(() => {
                        preloader.remove();
                    }, 500);
                }, 1000);
            }
        });
    }

    initializeAnimations() {
        // Initialize AOS
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                easing: 'ease-out-cubic',
                once: true,
                offset: 100,
                delay: 0,
            });
        }

        // Initialize Typed.js for hero text
        if (typeof Typed !== 'undefined') {
            const typedElement = document.getElementById('typed-text');
            if (typedElement) {
                new Typed('#typed-text', {
                    strings: [
                        'AI Content Developer',
                        'Creative Technologist',
                        'Voice Artist',
                        'Prompt Engineer',
                        'Multilingual Creator',
                        'SEO Strategist',
                        'React Developer'
                    ],
                    typeSpeed: 50,
                    backSpeed: 30,
                    backDelay: 2000,
                    loop: true,
                    smartBackspace: true,
                    showCursor: true,
                    cursorChar: '|',
                });
            }
        }

        // Initialize GSAP animations
        this.initializeGSAP();
    }

    initializeGSAP() {
        if (typeof gsap !== 'undefined') {
            // Register ScrollTrigger plugin
            gsap.registerPlugin(ScrollTrigger);

            // Hero elements animation
            const tl = gsap.timeline();
            tl.from('.hero-title', { 
                opacity: 0, 
                y: 50, 
                duration: 1, 
                ease: 'power3.out' 
            })
            .from('.hero-description', { 
                opacity: 0, 
                y: 30, 
                duration: 0.8, 
                ease: 'power2.out' 
            }, '-=0.5')
            .from('.hero-buttons', { 
                opacity: 0, 
                y: 30, 
                duration: 0.8, 
                ease: 'power2.out' 
            }, '-=0.3')
            .from('.hero-social', { 
                opacity: 0, 
                y: 20, 
                duration: 0.6, 
                ease: 'power2.out' 
            }, '-=0.2');

            // Service cards animation
            gsap.fromTo('.service-card', 
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.services-section',
                        start: 'top 80%'
                    }
                }
            );

            // Portfolio items animation
            gsap.fromTo('.portfolio-item',
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: '.portfolio-grid',
                        start: 'top 80%'
                    }
                }
            );
        }
    }

    initializePlugins() {
        // Initialize Particles.js
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 50, density: { enable: true, value_area: 800 } },
                    color: { value: ['#A78BFA', '#F9A8D4', '#6EE7B7'] },
                    shape: { type: 'circle' },
                    opacity: { value: 0.3, random: true },
                    size: { value: 3, random: true },
                    line_linked: { 
                        enable: true, 
                        distance: 150, 
                        color: '#A78BFA', 
                        opacity: 0.2, 
                        width: 1 
                    },
                    move: { 
                        enable: true, 
                        speed: 2, 
                        direction: 'none', 
                        random: false, 
                        straight: false, 
                        out_mode: 'out', 
                        bounce: false 
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: { 
                        onhover: { enable: true, mode: 'grab' }, 
                        onclick: { enable: true, mode: 'push' }, 
                        resize: true 
                    },
                    modes: { 
                        grab: { distance: 140, line_linked: { opacity: 0.5 } }, 
                        push: { particles_nb: 4 } 
                    }
                },
                retina_detect: true
            });
        }

        // Initialize Vanilla Tilt for cards
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(document.querySelectorAll('.service-card, .statistics-card'), {
                max: 15,
                speed: 400,
                glare: true,
                'max-glare': 0.2,
            });
        }
    }

    setupScrollEffects() {
        // Parallax effect for hero elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            const heroElements = document.querySelectorAll('.gradient-blob');
            heroElements.forEach((element, index) => {
                const speed = (index + 1) * 0.3;
                element.style.transform = `translateY(${parallax * speed}px)`;
            });
        });
    }

    animateCounters() {
        const counters = document.querySelectorAll('.statistics-counter');
        
        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
            
            if (isVisible && !counter.classList.contains('animated')) {
                counter.classList.add('animated');
                this.animateCounter(counter);
            }
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }, 16);

        element.classList.add('animate');
    }

    setupNavigationActiveStates() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }

    smoothScroll(e) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    moonClick() {
        // Easter egg: Moon click effect
        const moon = document.getElementById('interactiveMoon');
        moon.style.animation = 'none';
        moon.offsetHeight; // Trigger reflow
        moon.style.animation = 'moonFloat 2s ease-in-out';
        
        // Show a fun message
        this.showToast('🌙 Thanks for clicking the moon! You found an Easter egg!');
    }

    showToast(message) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = message;
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--primary-gradient);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: var(--shadow-medium);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleContactSubmit.bind(this));
        }
    }

    async handleContactSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const submitButton = e.target.querySelector('button[type="submit"]');
        
        // Show loading state
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        submitButton.disabled = true;

        try {
            // Simulate form submission (replace with actual API call)
            await this.simulateFormSubmission(formData);
            
            this.showToast('✅ Message sent successfully! I\'ll get back to you soon.');
            e.target.reset();
        } catch (error) {
            this.showToast('❌ Failed to send message. Please try again.');
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    }

    simulateFormSubmission(formData) {
        // Replace this with actual form submission logic
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form data:', Object.fromEntries(formData));
                resolve();
            }, 2000);
        });
    }

    setupPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');

                const filterValue = e.target.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                        item.style.display = 'block';
                        // Animate in
                        gsap.fromTo(item, 
                            { opacity: 0, scale: 0.8 },
                            { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
                        );
                    } else {
                        // Animate out
                        gsap.to(item, {
                            opacity: 0,
                            scale: 0.8,
                            duration: 0.3,
                            ease: 'power2.in',
                            onComplete: () => {
                                item.style.display = 'none';
                            }
                        });
                    }
                });
            });
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Performance monitoring
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});
