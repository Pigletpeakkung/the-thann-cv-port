/*
========================================
404 ERROR PAGE SCRIPT
========================================
*/

class ErrorPage404 {
    constructor() {
        this.spaceFacts = [
            "🌌 There are more stars in the universe than grains of sand on all Earth's beaches!",
            "🚀 One day on Venus equals 243 Earth days, but one year is only 225 Earth days!",
            "🌍 You could fit all the planets in our solar system in the space between Earth and the Moon!",
            "⭐ Neutron stars are so dense that a teaspoon would weigh about 6 billion tons!",
            "🌙 The Moon is moving away from Earth at about 3.8 cm per year!",
            "🔥 The Sun converts about 4 million tons of matter into energy every second!",
            "🌟 It would take 9 years to walk to the Moon if you could walk in space!",
            "🪐 Saturn's density is so low it would float in water if there was a bathtub big enough!",
            "🌌 Light from the nearest star (besides the Sun) takes 4.37 years to reach Earth!",
            "🚀 Astronauts grow up to 2 inches taller in space due to spine elongation!",
            "🌑 A black hole with the mass of our Sun would have a radius of about 3 km!",
            "🌍 Earth is the only planet in our solar system not named after a Roman or Greek god!",
            "☄️ Comets smell like rotten eggs due to hydrogen sulfide in their composition!",
            "🌟 The Milky Way galaxy is on a collision course with Andromeda galaxy!",
            "🚀 There's a planet made of diamond that's twice the size of Earth!"
        ];
        
        this.currentFactIndex = 0;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupThemeToggle();
        this.setupMobileMenu();
        this.setupSearchModal();
        this.setupScrollToTop();
        this.displayRandomFact();
        this.trackPageLoad();
        this.setupAccessibility();
        this.handleUrlError();
        setTimeout(() => this.hideLoadingScreen(), 1000);
    }

    setupEventListeners() {
        // Navigation buttons
        const homeButton = document.getElementById('homeButton');
        const backButton = document.getElementById('backButton');
        const searchButton = document.getElementById('searchButton');
        const refreshFactButton = document.getElementById('refreshFact');

        homeButton?.addEventListener('click', this.handleHomeClick.bind(this));
        backButton?.addEventListener('click', this.handleBackClick.bind(this));
        searchButton?.addEventListener('click', this.handleSearchClick.bind(this));
        refreshFactButton?.addEventListener('click', this.handleRefreshFact.bind(this));

        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeydown.bind(this));

        // Fun fact auto-refresh
        setInterval(() => {
            this.displayRandomFact();
        }, 10000); // Change fact every 10 seconds
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const currentTheme = localStorage.getItem('theme') || 'dark';
        
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        themeToggle?.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            
            // Add transition effect
            document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }

    setupMobileMenu() {
        const menuToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.getElementById('navMenu');
        const navOverlay = document.getElementById('navOverlay');

        const toggleMenu = () => {
            const isOpen = navMenu.classList.contains('active');
            
            if (isOpen) {
                navMenu.classList.remove('active');
                navOverlay.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            } else {
                navMenu.classList.add('active');
                navOverlay.classList.add('active');
                menuToggle.classList.add('active');
                menuToggle.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
            }
        };

        menuToggle?.addEventListener('click', toggleMenu);
        navOverlay?.addEventListener('click', toggleMenu);

        // Close menu on navigation link click
        document.querySelectorAll('.nav-menu__link').forEach(link => {
            link.addEventListener('click', toggleMenu);
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    setupSearchModal() {
        const searchButton = document.getElementById('searchButton');
        const searchModal = document.getElementById('searchModal');
        const searchInput = document.getElementById('searchInput');
        const modalClose = searchModal?.querySelector('.modal__close');
        const modalBackdrop = searchModal?.querySelector('.modal__backdrop');

        const openModal = () => {
            searchModal.classList.add('active');
            searchModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            setTimeout(() => searchInput?.focus(), 100);
        };

        const closeModal = () => {
            searchModal.classList.remove('active');
            searchModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        searchButton?.addEventListener('click', openModal);
        modalClose?.addEventListener('click', closeModal);
        modalBackdrop?.addEventListener('click', closeModal);

        // Handle search form submission
        const searchForm = searchModal?.querySelector('.search-form');
        searchForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                this.handleSearch(query);
                closeModal();
            }
        });

        // Handle search suggestions
        document.querySelectorAll('.search-suggestion').forEach(suggestion => {
            suggestion.addEventListener('click', closeModal);
        });
    }

    setupScrollToTop() {
        const scrollButton = document.getElementById('scrollTopButton');
        
        const updateScrollButton = () => {
            if (window.pageYOffset > 300) {
                scrollButton?.classList.add('visible');
            } else {
                scrollButton?.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', updateScrollButton);
        
        scrollButton?.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        updateScrollButton();
    }
    displayRandomFact() {
        const funFactElement = document.getElementById('funFact');
        const funFactText = funFactElement?.querySelector('.fun-fact-text');
        
        if (!funFactText) return;

        // Get a random fact different from the current one
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.spaceFacts.length);
        } while (newIndex === this.currentFactIndex && this.spaceFacts.length > 1);
        
        this.currentFactIndex = newIndex;
        
        // Animate fact change
        funFactText.style.opacity = '0';
        funFactText.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            funFactText.textContent = this.spaceFacts[this.currentFactIndex];
            funFactText.style.opacity = '1';
            funFactText.style.transform = 'translateY(0)';
        }, 200);
    }

    handleHomeClick(e) {
        e.preventDefault();
        
        // Add click animation
        const button = e.currentTarget;
        button.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            button.style.transform = '';
            window.location.href = '/';
        }, 150);
        
        // Track analytics
        this.trackEvent('navigation', 'home_from_404');
    }

    handleBackClick(e) {
        e.preventDefault();
        
        const button = e.currentTarget;
        button.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            button.style.transform = '';
            
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = '/';
            }
        }, 150);
        
        this.trackEvent('navigation', 'back_from_404');
    }

    handleSearchClick(e) {
        e.preventDefault();
        this.trackEvent('interaction', 'search_opened_from_404');
    }

    handleRefreshFact() {
        this.displayRandomFact();
        
        // Add rotation animation to button
        const button = document.getElementById('refreshFact');
        button.style.transform = 'rotate(180deg)';
        
        setTimeout(() => {
            button.style.transform = '';
        }, 300);
        
        this.trackEvent('interaction', 'fact_refreshed');
    }

    handleSearch(query) {
        // Simple search functionality - in a real app, this would query your search API
        const searchTerms = {
            'about': '/#about',
            'projects': '/#projects',
            'contact': '/#contact',
            'skills': '/#skills',
            'resume': '/assets/documents/resume.pdf',
            'cv': '/assets/documents/resume.pdf',
            'portfolio': '/',
            'home': '/',
            'work': '/#projects',
            'experience': '/#about',
            'education': '/#about',
            'github': '#', // Replace with actual GitHub URL
            'linkedin': '#', // Replace with actual LinkedIn URL
            'email': '/#contact',
            'blog': '/blog', // If you have a blog
            'articles': '/blog'
        };

        const normalizedQuery = query.toLowerCase().trim();
        
        // Check for exact matches
        if (searchTerms[normalizedQuery]) {
            window.location.href = searchTerms[normalizedQuery];
            return;
        }
        
        // Check for partial matches
        for (const [term, url] of Object.entries(searchTerms)) {
            if (normalizedQuery.includes(term) || term.includes(normalizedQuery)) {
                window.location.href = url;
                return;
            }
        }
        
        // If no matches found, show notification
        this.showNotification('No results found. Try searching for "about", "projects", "contact", or "skills".', 'info');
        
        this.trackEvent('search', 'no_results', query);
    }

    handleKeydown(e) {
        // Global keyboard shortcuts
        switch(e.key) {
            case 'Escape':
                // Close any open modals
                document.querySelectorAll('.modal.active').forEach(modal => {
                    modal.classList.remove('active');
                    modal.setAttribute('aria-hidden', 'true');
                    document.body.style.overflow = '';
                });
                break;
                
            case '/':
                // Open search (like GitHub)
                if (!e.target.matches('input, textarea')) {
                    e.preventDefault();
                    document.getElementById('searchButton')?.click();
                }
                break;
                
            case 'h':
                // Go home
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    window.location.href = '/';
                }
                break;
        }
    }

    setupAccessibility() {
        // Announce page load to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = 'Error 404 page loaded. The requested page was not found.';
        document.body.appendChild(announcement);

        // Remove announcement after screen reader has time to announce it
        setTimeout(() => {
            announcement.remove();
        }, 2000);

        // Setup focus trap for modals
        this.setupFocusTrap();

        // Improve keyboard navigation
        this.setupKeyboardNavigation();
    }

    setupFocusTrap() {
        const modals = document.querySelectorAll('.modal');
        
        modals.forEach(modal => {
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableElements.length === 0) return;
            
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];
            
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusable) {
                            e.preventDefault();
                            lastFocusable.focus();
                        }
                    } else {
                        if (document.activeElement === lastFocusable) {
                            e.preventDefault();
                            firstFocusable.focus();
                        }
                    }
                }
            });
        });
    }

    setupKeyboardNavigation() {
        // Add visible focus indicators for keyboard users
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Skip link functionality
        const skipLink = document.querySelector('.skip-link');
        skipLink?.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById('main-content');
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    handleUrlError() {
        // Extract the attempted URL from referrer or current path
        const attemptedPath = window.location.pathname;
        const referrer = document.referrer;
        
        // Try to suggest similar pages based on the URL
        const suggestions = this.getSimilarPages(attemptedPath);
        
        if (suggestions.length > 0) {
            this.showSuggestionsBanner(suggestions);
        }

        // Log the 404 error for analytics
        this.trackEvent('error', '404_page_view', attemptedPath);
    }

    getSimilarPages(path) {
        const pages = [
            { path: '/', title: 'Home', description: 'Main portfolio page' },
            { path: '/#about', title: 'About', description: 'Learn about me' },
            { path: '/#projects', title: 'Projects', description: 'View my work' },
            { path: '/#contact', title: 'Contact', description: 'Get in touch' },
            { path: '/blog', title: 'Blog', description: 'Read my articles' }
        ];

        // Simple similarity check based on path segments
        const pathSegments = path.toLowerCase().split('/').filter(Boolean);
        
        return pages.filter(page => {
            const pageSegments = page.path.toLowerCase().split('/').filter(Boolean);
            return pathSegments.some(segment => 
                pageSegments.some(pageSegment => 
                    pageSegment.includes(segment) || segment.includes(pageSegment)
                )
            );
        }).slice(0, 3); // Return max 3 suggestions
    }

    showSuggestionsBanner(suggestions) {
        const banner = document.createElement('div');
        banner.className = 'error-suggestions-banner';
        banner.innerHTML = `
            <div class="banner-content">
                <h3>🤔 Looking for something similar?</h3>
                <div class="banner-suggestions">
                    ${suggestions.map(suggestion => `
                        <a href="${suggestion.path}" class="banner-suggestion">
                            ${suggestion.title}
                        </a>
                    `).join('')}
                </div>
                <button class="banner-close" aria-label="Close suggestions">×</button>
            </div>
        `;

        // Insert banner before main content
        const main = document.querySelector('.error-main');
        main?.parentNode.insertBefore(banner, main);

        // Close banner functionality
        const closeBtn = banner.querySelector('.banner-close');
        closeBtn?.addEventListener('click', () => {
            banner.style.opacity = '0';
            banner.style.transform = 'translateY(-20px)';
            setTimeout(() => banner.remove(), 300);
        });

        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (banner.parentNode) {
                closeBtn?.click();
            }
        }, 10000);
    }

    showNotification(message, type = 'info') {
        // Create notification container if it doesn't exist
        let container = document.querySelector('.notification-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'notification-container';
            document.body.appendChild(container);
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <div class="notification__icon">${this.getNotificationIcon(type)}</div>
                <div class="notification__message">${message}</div>
                <button class="notification__close" aria-label="Close notification">×</button>
            </div>
        `;

        container.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('notification--visible'), 10);

        // Close functionality
        const closeBtn = notification.querySelector('.notification__close');
        closeBtn?.addEventListener('click', () => this.hideNotification(notification));

        // Auto-hide after 5 seconds
        setTimeout(() => this.hideNotification(notification), 5000);
    }

    hideNotification(notification) {
        if (notification && notification.parentNode) {
            notification.classList.remove('notification--visible');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }

    getNotificationIcon(type) {
        const icons = {
            'success': '✅',
            'error': '❌',
            'warning': '⚠️',
            'info': 'ℹ️'
        };
        return icons[type] || icons.info;
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 300);
        }
    }

    trackPageLoad() {
        const loadTime = performance.now();
        this.trackEvent('performance', '404_page_load_time', Math.round(loadTime));
        
        // Track user agent for debugging
        this.trackEvent('system', '404_user_agent', navigator.userAgent.substring(0, 50));
        
        // Track screen size for responsive debugging
        this.trackEvent('system', '404_screen_size', `${screen.width}x${screen.height}`);
    }

    trackEvent(category, action, label = null, value = null) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            const eventData = {
                event_category: category,
                event_label: label
            };
            
            if (value !== null) {
                eventData.value = value;
            }
            
            gtag('event', action, eventData);
        }

        // Console log for debugging
        console.log('Event tracked:', { category, action, label, value });
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Service Worker registration for offline functionality
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered:', registration);
                })
                .catch(error => {
                    console.log('SW registration failed:', error);
                });
        }
    }

    // Progressive Web App install prompt
    setupPWAInstall() {
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Show install button
            const installButton = document.createElement('button');
            installButton.className = 'pwa-install-button';
            installButton.innerHTML = `
                <span class="install-icon">📱</span>
                <span class="install-text">Install App</span>
            `;
            
            document.body.appendChild(installButton);
            
            installButton.addEventListener('click', async () => {
                if (deferredPrompt) {
                    deferredPrompt.prompt();
                    const result = await deferredPrompt.userChoice;
                    this.trackEvent('pwa', 'install_prompt_result', result.outcome);
                    deferredPrompt = null;
                    installButton.remove();
                }
            });
        });
    }

    // Initialize performance monitoring
    setupPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('web-vital' in window) {
            import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(this.sendToAnalytics.bind(this));
                getFID(this.sendToAnalytics.bind(this));
                getFCP(this.sendToAnalytics.bind(this));
                getLCP(this.sendToAnalytics.bind(this));
                getTTFB(this.sendToAnalytics.bind(this));
            });
        }
    }

    sendToAnalytics(metric) {
        this.trackEvent('performance', metric.name, metric.id, Math.round(metric.value));
    }

    // Handle offline/online states
    setupNetworkMonitoring() {
        const updateNetworkStatus = () => {
            const status = navigator.onLine ? 'online' : 'offline';
            document.body.classList.toggle('offline', !navigator.onLine);
            
            if (!navigator.onLine) {
                this.showNotification('You are currently offline. Some features may not work.', 'warning');
            }
            
            this.trackEvent('network', 'status_change', status);
        };

        window.addEventListener('online', updateNetworkStatus);
        window.addEventListener('offline', updateNetworkStatus);
        updateNetworkStatus(); // Check initial status
    }

    // Update copyright year automatically
    updateCopyrightYear() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // Initialize all advanced features
    initAdvancedFeatures() {
        this.registerServiceWorker();
        this.setupPWAInstall();
        this.setupPerformanceMonitoring();
        this.setupNetworkMonitoring();
        this.updateCopyrightYear();
    }
}

// Additional CSS for notification system and suggestions banner
const additionalCSS = `
/* Notification System */
.notification-container {
    position: fixed;
    top: var(--spacing-lg);
    right: var(--spacing-lg);
    z-index: var(--z-notification, 1000);
    max-width: 400px;
}

.notification {
    background: var(--glass-bg-dark);
    border: 1px solid var(--glass-border-dark);
    border-radius: var(--radius-lg);
    margin-bottom: var(--spacing-sm);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    backdrop-filter: blur(10px);
}

.notification--visible {
    transform: translateX(0);
}

.notification--success { border-left: 4px solid var(--error-success); }
.notification--error { border-left: 4px solid var(--error-danger); }
.notification--warning { border-left: 4px solid var(--error-warning); }
.notification--info { border-left: 4px solid var(--error-info); }

.notification__content {
    display: flex;
    align-items: center;
    padding: var(--spacing-md);
    gap: var(--spacing-sm);
}

.notification__icon {
    font-size: var(--font-size-lg);
    flex-shrink: 0;
}

.notification__message {
    color: var(--text-light);
    font-size: var(--font-size-sm);
    flex-grow: 1;
}

.notification__close {
    background: none;
    border: none;
    color: var(--text-medium);
    cursor: pointer;
    font-size: var(--font-size-lg);
    padding: var(--spacing-xs);
    border-radius: var(--radius-sm);
    flex-shrink: 0;
}

.notification__close:hover {
    color: var(--text-light);
    background: rgba(255, 255, 255, 0.1);
}

/* Suggestions Banner */
.error-suggestions-banner {
    background: linear-gradient(135deg, var(--error-info), var(--error-primary));
    color: white;
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
    border-radius: var(--radius-lg);
    position: relative;
    transform: translateY(20px);
    opacity: 0;
    animation: slideInBanner 0.3s ease forwards;
}

@keyframes slideInBanner {
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.banner-content h3 {
    margin-bottom: var(--spacing-md);
    font-size: var(--font-size-lg);
}

.banner-suggestions {
    display: flex;
    gap: var(--spacing-md);
    flex-wrap: wrap;
}

.banner-suggestion {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-full);
    text-decoration: none;
    font-size: var(--font-size-sm);
    font-weight: 500;
    transition: background-color 0.2s ease;
}

.banner-suggestion:hover {
    background: rgba(255, 255, 255, 0.3);
}

.banner-close {
    position: absolute;
    top: var(--spacing-sm);
    right: var(--spacing-sm);
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    font-size: var(--font-size-lg);
    display: flex;
    align-items: center;
    justify-content: center;
}

.banner-close:hover {
    background: rgba(255, 255, 255, 0.3);
}

/* PWA Install Button */
.pwa-install-button {
    position: fixed;
    bottom: var(--spacing-lg);
    left: var(--spacing-lg);
    background: var(--error-primary);
    color: white;
    border: none;
    border-radius: var(--radius-full);
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--font-size-sm);
    font-weight: 600;
    cursor: pointer;
    box-shadow: var(--shadow-lg);
    transition: transform 0.2s ease;
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    z-index: var(--z-notification, 1000);
}

.pwa-install-button:hover {
    transform: translateY(-2px);
}

/* Offline indicator */
.offline .error-main::before {
    content: 'You are currently offline';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: var(--error-warning);
    color: white;
    text-align: center;
    padding: var(--spacing-sm);
    font-size: var(--font-size-sm);
    font-weight: 600;
    z-index: var(--z-notification, 1000);
}

/* Keyboard navigation styles */
.keyboard-navigation *:focus-visible {
    outline: 3px solid var(--error-primary);
    outline-offset: 2px;
}

/* Screen reader only content */
.sr-only {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
}

/* Mobile responsiveness for notifications */
@media (max-width: 767.98px) {
    .notification-container {
        top: var(--spacing-md);
        right: var(--spacing-md);
        left: var(--spacing-md);
        max-width: none;
    }
    
    .error-suggestions-banner {
        margin: 0 calc(var(--spacing-md) * -1) var(--spacing-xl);
        border-radius: 0;
    }
    
    .banner-suggestions {
        justify-content: center;
    }
    
    .pwa-install-button {
        bottom: var(--spacing-md);
        left: var(--spacing-md);
        right: var(--spacing-md);
        justify-content: center;
    }
}
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

// Initialize the 404 page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const errorPage = new ErrorPage404();
    
    // Initialize advanced features after a short delay
    setTimeout(() => {
        errorPage.initAdvancedFeatures();
    }, 1000);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        console.log('404 page became visible');
        // Could refresh space facts or check for updates
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ErrorPage404;
}
