// ==============================================
// COMPLETE MAIN JAVASCRIPT FILE - PEGEARTS PORTFOLIO
// ==============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initializeApp();
    
    function initializeApp() {
        setupPreloader();
        setupNavigation();
        setupHeroEffects();
        setupDynamicStarField();      // ⭐ Dynamic Star System
        setupTypingEffect();
        setupVoiceDemo();             // 🎵 Complete Audio Player
        setupPortfolio();             // 📁 Portfolio with Filtering
        setupContactForm();           // 📧 Enhanced Contact Form
        setupScrollEffects();
        setupSparkleEffects();
        setupModalSystem();
        setupAccessibility();
        setupPerformanceOptimizations();
        initializeAOS();              // 🎨 AOS Animations
        setupStatsAnimation();
        setupBackToTop();             // ⬆️ Back to Top Button
        setupCookieBanner();          // 🍪 Cookie Consent
        setupParticleSystem();        // ⭐ Enhanced Particle Effects
        setupConstellations();        // ⭐ Dynamic Constellations
        setupShootingStars();         // ⭐ Shooting Stars
        setupNebulae();              // ⭐ Nebula Effects
        setupInteractiveElements();   // 🎯 Interactive Features
    }
    
    // ==============================================
    // PRELOADER SYSTEM
    // ==============================================
    
    function setupPreloader() {
        const preloader = document.getElementById('preloader');
        const loaderText = preloader?.querySelector('.loader-text');
        const progressBar = preloader?.querySelector('.preloader-progress-fill');
        
        if (!preloader) return;
        
        let progress = 0;
        const loadingMessages = [
            "Loading Amazing Experience...",
            "Preparing Interactive Elements...",
            "Initializing Star Field...",
            "Setting up Voice Demo...",
            "Loading Portfolio...",
            "Almost Ready..."
        ];
        
        // Animate loading progress
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15 + 5;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(progressInterval);
                setTimeout(hidePreloader, 800);
            }
            
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
            
            // Update loading message
            if (loaderText) {
                const messageIndex = Math.floor((progress / 100) * (loadingMessages.length - 1));
                loaderText.textContent = loadingMessages[messageIndex];
            }
        }, 200);
        
        // Backup timeout
        setTimeout(hidePreloader, 4000);
        
        function hidePreloader() {
            if (preloader) {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.remove();
                    document.body.classList.add('loaded');
                    startDynamicEffects(); // ⭐ Start all dynamic effects
                }, 500);
            }
        }
    }
    
    // ==============================================
    // NAVIGATION SYSTEM
    // ==============================================
    
    function setupNavigation() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (!navbar) return;
        
        // Navbar scroll effects
        let lastScrollTop = 0;
        window.addEventListener('scroll', throttle(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide navbar on scroll down, show on scroll up
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.classList.add('nav-hidden');
            } else {
                navbar.classList.remove('nav-hidden');
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            updateActiveNavLink();
        }, 100));
        
        // Enhanced smooth scrolling
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const navbarHeight = navbar.offsetHeight;
                    const offsetTop = targetSection.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (bsCollapse) bsCollapse.hide();
                    }
                    
                    // Add ripple effect
                    addRippleEffect(this);
                }
            });
        });
        
        function updateActiveNavLink() {
            let currentSection = '';
            const scrollPosition = window.scrollY + navbar.offsetHeight + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === currentSection) {
                    link.classList.add('active');
                }
            });
        }
        
        function addRippleEffect(element) {
            const ripple = document.createElement('span');
            ripple.className = 'nav-ripple';
            element.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
        
        // Enhanced mobile menu toggle
        navbarToggler?.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
    
    // ==============================================
    // TYPING EFFECT SYSTEM
    // ==============================================
    
    function setupTypingEffect() {
        const typedTextElement = document.querySelector('.typed-text');
        if (!typedTextElement) return;
        
        // Check if Typed.js library is loaded
        if (typeof Typed !== 'undefined') {
            new Typed('.typed-text', {
                strings: [
                    'AI Creative Designer',
                    'Voice Actor & Narrator',
                    'Full-Stack Developer',
                    'Machine Learning Expert',
                    'Creative Technologist',
                    'Innovation Enthusiast'
                ],
                typeSpeed: 80,
                backSpeed: 50,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|',
                smartBackspace: true
            });
        } else {
            // Fallback to custom typing effect
            const phrases = [
                'AI Creative Designer',
                'Voice Actor & Narrator',
                'Full-Stack Developer',
                'Machine Learning Expert',
                'Creative Technologist'
            ];
            
            let phraseIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let typingSpeed = 100;
            
            function typeText() {
                const currentPhrase = phrases[phraseIndex];
                
                if (!isDeleting) {
                    typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
                    charIndex++;
                    
                    if (charIndex === currentPhrase.length) {
                        isDeleting = true;
                        typingSpeed = 50;
                        setTimeout(typeText, 2000);
                        return;
                    }
                } else {
                    typedTextElement.textContent = currentPhrase.substring(0, charIndex);
                    charIndex--;
                    
                    if (charIndex === 0) {
                        isDeleting = false;
                        phraseIndex = (phraseIndex + 1) % phrases.length;
                        typingSpeed = 100;
                    }
                }
                
                setTimeout(typeText, typingSpeed);
            }
            
            typeText();
        }
    }
    
    // ==============================================
    // VOICE DEMO SYSTEM - COMPLETE AUDIO PLAYER
    // ==============================================
    
    function setupVoiceDemo() {
        const voiceDemoSection = document.getElementById('voice-demo');
        if (!voiceDemoSection) return;
        
        const audioElement = document.getElementById('mainVoiceDemo');
        const playBtn = voiceDemoSection.querySelector('.play-btn');
        const progressBar = voiceDemoSection.querySelector('.progress-fill');
        const progressHandle = voiceDemoSection.querySelector('.progress-handle');
        const progressTrack = voiceDemoSection.querySelector('.progress-track');
        const currentTimeSpan = voiceDemoSection.querySelector('.current-time');
        const durationSpan = voiceDemoSection.querySelector('.duration');
        const volumeSlider = voiceDemoSection.querySelector('.volume-slider');
        const volumeBtn = voiceDemoSection.querySelector('.volume-btn');
        const speedBtn = voiceDemoSection.querySelector('.speed-control');
        const downloadBtn = voiceDemoSection.querySelector('.download-btn');
        const waveformCanvas = voiceDemoSection.querySelector('.waveform-canvas');
        const frequencyBars = voiceDemoSection.querySelectorAll('.freq-bar');
        const durationTag = voiceDemoSection.querySelector('.auto-duration');
        
        if (!audioElement) return;
        
        let isPlaying = false;
        let currentSpeed = 1;
        let audioContext;
        let analyser;
        let dataArray;
        let previousVolume = 0.8;
        
        // Initialize audio player
        audioElement.addEventListener('loadedmetadata', () => {
            const duration = formatTime(audioElement.duration);
            if (durationSpan) durationSpan.textContent = duration;
            if (durationTag) durationTag.textContent = duration;
            drawWaveform();
        });
        
        audioElement.addEventListener('timeupdate', updateProgress);
        audioElement.addEventListener('ended', resetPlayer);
        audioElement.addEventListener('loadstart', () => {
            console.log('🎵 Audio loading started...');
        });
        
        // Play/Pause functionality
        if (playBtn) {
            playBtn.addEventListener('click', togglePlayback);
        }
        
        function togglePlayback() {
            if (isPlaying) {
                audioElement.pause();
                isPlaying = false;
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                playBtn.classList.remove('playing');
                stopVisualization();
            } else {
                const playPromise = audioElement.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        isPlaying = true;
                        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                        playBtn.classList.add('playing');
                        startVisualization();
                    }).catch(error => {
                        console.error('Audio play failed:', error);
                        showAudioError('Unable to play audio. Please try again.');
                    });
                }
            }
        }
        
        function updateProgress() {
            if (audioElement.duration) {
                const progress = (audioElement.currentTime / audioElement.duration) * 100;
                if (progressBar) progressBar.style.width = progress + '%';
                if (progressHandle) progressHandle.style.left = progress + '%';
                if (currentTimeSpan) currentTimeSpan.textContent = formatTime(audioElement.currentTime);
            }
        }
        
        // Progress bar interaction
        if (progressTrack) {
            progressTrack.addEventListener('click', (e) => {
                const rect = progressTrack.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percentage = Math.max(0, Math.min(1, clickX / rect.width));
                audioElement.currentTime = percentage * audioElement.duration;
            });
        }
        
        // Volume control
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                const volume = e.target.value / 100;
                audioElement.volume = volume;
                updateVolumeDisplay(volume);
            });
            
            // Set initial volume
            audioElement.volume = 0.8;
            volumeSlider.value = 80;
            updateVolumeDisplay(0.8);
        }
        
        if (volumeBtn) {
            volumeBtn.addEventListener('click', toggleMute);
        }
        
        function toggleMute() {
            if (audioElement.volume > 0) {
                previousVolume = audioElement.volume;
                audioElement.volume = 0;
                if (volumeSlider) volumeSlider.value = 0;
                volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                audioElement.volume = previousVolume;
                if (volumeSlider) volumeSlider.value = previousVolume * 100;
                volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
            updateVolumeDisplay(audioElement.volume);
        }
        
        function updateVolumeDisplay(volume) {
            const percentage = Math.round(volume * 100);
            const volumePercentage = voiceDemoSection.querySelector('.volume-percentage');
            if (volumePercentage) volumePercentage.textContent = percentage + '%';
            
            const volumeFill = voiceDemoSection.querySelector('.volume-fill');
            if (volumeFill) volumeFill.style.width = percentage + '%';
        }
        
        // Speed control
        if (speedBtn) {
            speedBtn.addEventListener('click', cycleSpeed);
        }
        
        function cycleSpeed() {
            const speeds = [0.75, 1, 1.25, 1.5];
            const currentIndex = speeds.indexOf(currentSpeed);
            const nextIndex = (currentIndex + 1) % speeds.length;
            currentSpeed = speeds[nextIndex];
            audioElement.playbackRate = currentSpeed;
            
            const speedText = speedBtn.querySelector('.speed-text');
            if (speedText) speedText.textContent = currentSpeed + 'x';
        }
        
        // Download functionality
        if (downloadBtn) {
            downloadBtn.addEventListener('click', downloadAudio);
        }
        
        function downloadAudio() {
            try {
                const link = document.createElement('a');
                link.href = audioElement.src;
                link.download = 'voice-demo-pegearts.m4a';
                
                // Show download progress animation
                const progressDiv = downloadBtn.querySelector('.download-progress');
                if (progressDiv) {
                    progressDiv.style.width = '0%';
                    progressDiv.style.display = 'block';
                    
                    // Simulate download progress
                    let progress = 0;
                    const progressInterval = setInterval(() => {
                        progress += 20;
                        progressDiv.style.width = progress + '%';
                        
                        if (progress >= 100) {
                            clearInterval(progressInterval);
                            setTimeout(() => {
                                progressDiv.style.display = 'none';
                                progressDiv.style.width = '0%';
                            }, 500);
                        }
                    }, 100);
                }
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Show success message
                showNotification('Download started successfully!', 'success');
                
            } catch (error) {
                console.error('Download failed:', error);
                showNotification('Download failed. Please try again.', 'error');
            }
        }
        
        // Audio visualization
        function startVisualization() {
            if (!audioContext) {
                setupAudioContext();
            }
            
            animateFrequencyBars();
            drawWaveformProgress();
        }
        
        function stopVisualization() {
            frequencyBars.forEach(bar => {
                bar.style.height = '4px';
            });
        }
        
        function setupAudioContext() {
            try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                analyser = audioContext.createAnalyser();
                const source = audioContext.createMediaElementSource(audioElement);
                
                source.connect(analyser);
                analyser.connect(audioContext.destination);
                
                analyser.fftSize = 256;
                const bufferLength = analyser.frequencyBinCount;
                dataArray = new Uint8Array(bufferLength);
            } catch (error) {
                console.warn('Web Audio API not supported:', error);
            }
        }
        
        function animateFrequencyBars() {
            if (!isPlaying || !analyser) return;
            
            analyser.getByteFrequencyData(dataArray);
            
            frequencyBars.forEach((bar, index) => {
                const value = dataArray[index * 8] || 0;
                const height = Math.max(4, (value / 255) * 40);
                bar.style.height = height + 'px';
                bar.style.opacity = 0.3 + (value / 255) * 0.7;
            });
            
            requestAnimationFrame(animateFrequencyBars);
        }
        
        function drawWaveform() {
            if (!waveformCanvas) return;
            
            const ctx = waveformCanvas.getContext('2d');
            const width = waveformCanvas.width = waveformCanvas.offsetWidth * 2;
            const height = waveformCanvas.height = waveformCanvas.offsetHeight * 2;
            ctx.scale(2, 2);
            
            // Clear canvas
            ctx.clearRect(0, 0, width, height);
            
            // Draw waveform (simulated)
            const gradient = ctx.createLinearGradient(0, 0, width, 0);
            gradient.addColorStop(0, 'rgba(167, 139, 250, 0.8)');
            gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.6)');
            gradient.addColorStop(1, 'rgba(167, 139, 250, 0.8)');
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            const segments = 200;
            const segmentWidth = (width / 2) / segments;
            
            for (let i = 0; i < segments; i++) {
                const x = i * segmentWidth;
                const amplitude = Math.sin(i * 0.02) * Math.random() * 0.8 + 0.2;
                const y = (height / 4) + (amplitude * (height / 8));
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.stroke();
        }
        
        function drawWaveformProgress() {
            if (!waveformCanvas || !isPlaying) return;
            
            const progress = audioElement.currentTime / audioElement.duration;
            const waveformProgress = voiceDemoSection.querySelector('.waveform-progress');
            
            if (waveformProgress) {
                waveformProgress.style.width = (progress * 100) + '%';
            }
            
            if (isPlaying) {
                requestAnimationFrame(drawWaveformProgress);
            }
        }
        
        function resetPlayer() {
            isPlaying = false;
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            playBtn.classList.remove('playing');
            stopVisualization();
        }
        
        function formatTime(seconds) {
            if (isNaN(seconds)) return '0:00';
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60);
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
        
        function showAudioError(message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'audio-error-message';
            errorDiv.textContent = message;
            errorDiv.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(239, 68, 68, 0.9);
                color: white;
                padding: 10px 20px;
                border-radius: 8px;
                font-size: 14px;
                z-index: 1000;
            `;
            
            voiceDemoSection.appendChild(errorDiv);
            
            setTimeout(() => {
                errorDiv.remove();
            }, 3000);
        }
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            // Only work when audio player is focused or visible
            const playerRect = voiceDemoSection.getBoundingClientRect();
            const isPlayerVisible = playerRect.top < window.innerHeight && playerRect.bottom > 0;
            
            if (!isPlayerVisible) return;
            
            switch(e.code) {
                case 'Space':
                    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                        e.preventDefault();
                        togglePlayback();
                    }
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    audioElement.currentTime = Math.max(0, audioElement.currentTime - 10);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    audioElement.currentTime = Math.min(audioElement.duration, audioElement.currentTime + 10);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    audioElement.volume = Math.min(1, audioElement.volume + 0.1);
                    if (volumeSlider) volumeSlider.value = audioElement.volume * 100;
                    updateVolumeDisplay(audioElement.volume);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    audioElement.volume = Math.max(0, audioElement.volume - 0.1);
                    if (volumeSlider) volumeSlider.value = audioElement.volume * 100;
                    updateVolumeDisplay(audioElement.volume);
                    break;
            }
        });
        
        // Initialize waveform when canvas is available
        if (waveformCanvas) {
            setTimeout(drawWaveform, 100);
        }
    }
    
    // ==============================================
    // PORTFOLIO SYSTEM - COMPLETE
    // ==============================================
    
    function setupPortfolio() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        const portfolioDetailsButtons = document.querySelectorAll('.portfolio-details-btn');
        let visibleItems = 6;
        
        if (portfolioItems.length === 0) return;
        
        // Initialize portfolio
        initializePortfolioItems();
        
        function initializePortfolioItems() {
            portfolioItems.forEach((item, index) => {
                if (index < visibleItems) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                } else {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                }
            });
            updateLoadMoreButton();
        }
        
        // Filter functionality
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Add loading effect
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                
                setTimeout(() => {
                    // Restore button text
                    const originalText = button.dataset.originalText || button.textContent.replace('Loading...', '').trim();
                    if (!button.dataset.originalText) {
                        button.dataset.originalText = originalText;
                    }
                    button.innerHTML = originalText;
                    
                    // Filter portfolio items
                    filterPortfolioItems(filter);
                }, 500);
            });
        });
        
        function filterPortfolioItems(filter) {
            let visibleCount = 0;
            
            portfolioItems.forEach((item, index) => {
                const categories = item.getAttribute('data-category') || '';
                const shouldShow = filter === 'all' || categories.includes(filter);
                
                if (shouldShow) {
                    if (visibleCount < visibleItems) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, visibleCount * 100);
                        visibleCount++;
                    } else {
                        item.style.display = 'none';
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                    }
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            updateLoadMoreButton();
        }
        
        // Load more functionality
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                const currentFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
                const hiddenItems = Array.from(portfolioItems).filter(item => {
                    const categories = item.getAttribute('data-category') || '';
                    const matchesFilter = currentFilter === 'all' || categories.includes(currentFilter);
                    return matchesFilter && item.style.display === 'none';
                });
                
                const itemsToShow = hiddenItems.slice(0, 3);
                
                itemsToShow.forEach((item, index) => {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                
                visibleItems += itemsToShow.length;
                updateLoadMoreButton();
            });
        }
        
        function updateLoadMoreButton() {
            if (!loadMoreBtn) return;
            
            const currentFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
            const filteredItems = Array.from(portfolioItems).filter(item => {
                const categories = item.getAttribute('data-category') || '';
                return currentFilter === 'all' || categories.includes(currentFilter);
            });
            
            const hiddenItems = filteredItems.filter(item => item.style.display === 'none');
            
            if (hiddenItems.length <= 0) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-flex';
                const buttonText = loadMoreBtn.querySelector('span');
                if (buttonText) {
                    buttonText.textContent = `Load More Projects (${hiddenItems.length} remaining)`;
                }
            }
        }
        
        // Portfolio details modal
        portfolioDetailsButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const portfolioCard = button.closest('.portfolio-card');
                if (portfolioCard) {
                    openPortfolioModal(portfolioCard);
                }
            });
        });
        
        function openPortfolioModal(portfolioCard) {
            const modal = document.getElementById('portfolioModal');
            const modalBody = document.getElementById('portfolioModalBody');
            const modalTitle = document.getElementById('portfolioModalLabel');
            
            if (!modal || !modalBody || !portfolioCard) return;
            
            // Extract project data
            const title = portfolioCard.querySelector('.portfolio-title')?.textContent || 'Project Details';
            const description = portfolioCard.querySelector('.portfolio-description')?.textContent || 'No description available.';
            const image = portfolioCard.querySelector('.portfolio-image img')?.src || '';
            const techTags = Array.from(portfolioCard.querySelectorAll('.tech-tag')).map(tag => tag.textContent);
            const projectUrl = portfolioCard.querySelector('.portfolio-details-btn')?.getAttribute('data-url') || '#';
            const githubUrl = portfolioCard.querySelector('.portfolio-details-btn')?.getAttribute('data-github') || '#';
            
            // Update modal content
            modalTitle.textContent = title;
            modalBody.innerHTML = `
                <div class="row">
                    <div class="col-lg-6">
                        <div class="project-modal-image">
                            <img src="${image}" alt="${title}" class="img-fluid rounded shadow-lg">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="project-modal-details">
                            <h4 class="mb-3">Project Overview</h4>
                            <p class="mb-4">${description}</p>
                            
                            ${techTags.length > 0 ? `
                                <h5 class="mb-3">Technologies Used</h5>
                                <div class="modal-tech-stack mb-4">
                                    ${techTags.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                                </div>
                            ` : ''}
                            
                            <div class="modal-actions">
                                <button class="btn btn-primary me-2" onclick="window.open('${projectUrl}', '_blank')">
                                    <i class="fas fa-external-link-alt me-2"></i>
                                    View Live Demo
                                </button>
                                <button class="btn btn-secondary" onclick="window.open('${githubUrl}', '_blank')">
                                    <i class="fab fa-github me-2"></i>
                                    View Code
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Show modal using Bootstrap
            const bootstrapModal = new bootstrap.Modal(modal);
            bootstrapModal.show();
        }
        
        // Portfolio hover effects
        portfolioItems.forEach(item => {
            const portfolioCard = item.querySelector('.portfolio-card');
            if (portfolioCard) {
                portfolioCard.addEventListener('mouseenter', () => {
                    portfolioCard.style.transform = 'translateY(-10px) scale(1.02)';
                    portfolioCard.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                });
                
                portfolioCard.addEventListener('mouseleave', () => {
                    portfolioCard.style.transform = 'translateY(0) scale(1)';
                    portfolioCard.style.boxShadow = '';
                });
            }
        });
    }
    
    // ==============================================
    // CONTACT FORM SYSTEM - COMPLETE
    // ==============================================
    
    function setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        const submitBtn = contactForm.querySelector('.form-submit-btn');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');
        const messageTextarea = contactForm.querySelector('#message');
        const charCount = document.getElementById('charCount');
        
        // Character counter
        if (messageTextarea && charCount) {
            messageTextarea.addEventListener('input', () => {
                const count = messageTextarea.value.length;
                charCount.textContent = count;
                
                const charCountContainer = charCount.parentElement;
                if (count > 1000) {
                    charCountContainer.classList.add('over-limit');
                } else {
                    charCountContainer.classList.remove('over-limit');
                }
                
                // Update color based on length
                if (count > 900) {
                    charCount.style.color = '#ef4444';
                } else if (count > 800) {
                    charCount.style.color = '#f59e0b';
                } else {
                    charCount.style.color = '#6b7280';
                }
            });
        }
        
        // Form validation
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
            
            // Add floating label effect
            if (input.value) {
                input.classList.add('has-content');
            }
            
            input.addEventListener('input', () => {
                if (input.value) {
                    input.classList.add('has-content');
                } else {
                    input.classList.remove('has-content');
                }
            });
        });
        
        function validateField(field) {
            const value = field.value.trim();
            const fieldName = field.name || field.id;
            let isValid = true;
            let errorMessage = '';
            
            // Clear previous errors
            clearFieldError(field);
            
            // Required field validation
            if (field.hasAttribute('required') && !value) {
                errorMessage = `${getFieldLabel(fieldName)} is required`;
                isValid = false;
            }
            
            // Specific field validation
            switch (fieldName) {
                case 'firstName':
                case 'lastName':
                    if (value && (value.length < 2 || value.length > 50)) {
                        errorMessage = `${getFieldLabel(fieldName)} must be between 2 and 50 characters`;
                        isValid = false;
                    }
                    if (value && !/^[a-zA-Z\s]*$/.test(value)) {
                        errorMessage = `${getFieldLabel(fieldName)} should only contain letters`;
                        isValid = false;
                    }
                    break;
                    
                case 'email':
                    if (value && !isValidEmail(value)) {
                        errorMessage = 'Please enter a valid email address';
                        isValid = false;
                    }
                    break;
                    
                case 'company':
                    if (value && value.length > 100) {
                        errorMessage = 'Company name is too long';
                        isValid = false;
                    }
                    break;
                    
                case 'message':
                    if (value && value.length < 10) {
                        errorMessage = 'Message must be at least 10 characters';
                        isValid = false;
                    }
                    if (value.length > 1000) {
                        errorMessage = 'Message cannot exceed 1000 characters';
                        isValid = false;
                    }
                    break;
                    
                case 'privacy':
                    if (field.type === 'checkbox' && !field.checked) {
                        errorMessage = 'You must agree to the privacy policy';
                        isValid = false;
                    }
                    break;
            }
            
            if (!isValid) {
                showFieldError(field, errorMessage);
            }
            
            return isValid;
        }
        
        function showFieldError(field, message) {
            field.classList.add('error');
            const errorElement = document.getElementById(`${field.name || field.id}-error`);
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.style.display = 'block';
            } else {
                // Create error element if it doesn't exist
                const errorDiv = document.createElement('div');
                errorDiv.id = `${field.name || field.id}-error`;
                errorDiv.className = 'invalid-feedback';
                errorDiv.textContent = message;
                errorDiv.style.display = 'block';
                field.parentNode.appendChild(errorDiv);
            }
        }
        
        function clearFieldError(field) {
            field.classList.remove('error');
            const errorElement = document.getElementById(`${field.name || field.id}-error`);
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
        }
        
        function getFieldLabel(fieldName) {
            const labels = {
                firstName: 'First Name',
                lastName: 'Last Name',
                email: 'Email Address',
                company: 'Company',
                subject: 'Project Type',
                message: 'Project Details',
                privacy: 'Privacy Agreement'
            };
            return labels[fieldName] || fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
        }
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        // Form submission
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validate all fields
            let isFormValid = true;
            formInputs.forEach(input => {
                if (!validateField(input)) {
                    isFormValid = false;
                }
            });
            
                        if (!isFormValid) {
                showMessage(errorMessage, 'Please correct the errors above and try again.', 'error');
                return;
            }
            
            // Show loading state
            setLoadingState(true);
            
            try {
                // Collect form data
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);
                
                // Add timestamp and additional data
                data.timestamp = new Date().toISOString();
                data.source = 'Portfolio Website';
                data.userAgent = navigator.userAgent;
                
                // Submit form
                await submitContactForm(data);
                
                // Show success message
                showMessage(successMessage, 'Thank you! Your message has been sent successfully. I\'ll get back to you within 24 hours.', 'success');
                
                // Reset form
                contactForm.reset();
                formInputs.forEach(input => {
                    input.classList.remove('has-content', 'error');
                    clearFieldError(input);
                });
                
                // Reset character counter
                if (charCount) {
                    charCount.textContent = '0';
                    charCount.style.color = '#6b7280';
                }
                
                // Send analytics event
                if (typeof gtag === 'function') {
                    gtag('event', 'form_submit', {
                        event_category: 'Contact',
                        event_label: 'Contact Form Submission'
                    });
                }
                
            } catch (error) {
                console.error('Form submission error:', error);
                showMessage(errorMessage, 'Sorry, there was an error sending your message. Please try again or contact me directly at hello@pegearts.com', 'error');
                
                // Send error analytics
                if (typeof gtag === 'function') {
                    gtag('event', 'form_error', {
                        event_category: 'Contact',
                        event_label: 'Form Submission Error'
                    });
                }
            } finally {
                setLoadingState(false);
            }
        });
        
        function setLoadingState(isLoading) {
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            if (isLoading) {
                submitBtn.disabled = true;
                submitBtn.classList.add('loading');
                if (btnText) btnText.style.display = 'none';
                if (btnLoading) btnLoading.style.display = 'inline-flex';
            } else {
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                if (btnText) btnText.style.display = 'inline-flex';
                if (btnLoading) btnLoading.style.display = 'none';
            }
        }
        
        function showMessage(messageElement, text, type) {
            if (!messageElement) return;
            
            const messageText = messageElement.querySelector('span') || messageElement;
            messageText.textContent = text;
            
            messageElement.className = `alert alert-${type === 'success' ? 'success' : 'danger'} d-flex align-items-center`;
            messageElement.style.display = 'flex';
            
            // Auto hide after 8 seconds
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 8000);
            
            // Scroll message into view
            messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        async function submitContactForm(data) {
            // Replace this with your actual form submission endpoint
            // For demonstration, using a mock API call
            
            const endpoint = 'https://formspree.io/f/your-form-id'; // Replace with your endpoint
            
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
            
            // Alternative: Simulate API call for testing
            /*
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Simulate 95% success rate
                    if (Math.random() > 0.05) {
                        resolve({ success: true, data });
                    } else {
                        reject(new Error('Network error'));
                    }
                }, 2000);
            });
            */
        }
        
        // Auto-save form data to localStorage
        const autoSaveKey = 'contact-form-draft';
        
        function saveFormDraft() {
            const formData = {};
            formInputs.forEach(input => {
                if (input.type !== 'checkbox') {
                    formData[input.name || input.id] = input.value;
                } else {
                    formData[input.name || input.id] = input.checked;
                }
            });
            localStorage.setItem(autoSaveKey, JSON.stringify(formData));
        }
        
        function loadFormDraft() {
            try {
                const savedData = localStorage.getItem(autoSaveKey);
                if (savedData) {
                    const formData = JSON.parse(savedData);
                    formInputs.forEach(input => {
                        const fieldName = input.name || input.id;
                        if (formData[fieldName] !== undefined) {
                            if (input.type !== 'checkbox') {
                                input.value = formData[fieldName];
                                if (input.value) input.classList.add('has-content');
                            } else {
                                input.checked = formData[fieldName];
                            }
                        }
                    });
                    
                    // Update character count if message was restored
                    if (messageTextarea && charCount) {
                        const count = messageTextarea.value.length;
                        charCount.textContent = count;
                    }
                }
            } catch (error) {
                console.warn('Could not load form draft:', error);
            }
        }
        
        function clearFormDraft() {
            localStorage.removeItem(autoSaveKey);
        }
        
        // Auto-save on input
        formInputs.forEach(input => {
            input.addEventListener('input', debounce(saveFormDraft, 1000));
        });
        
        // Load draft on page load
        loadFormDraft();
        
        // Clear draft on successful submission
        contactForm.addEventListener('submit', () => {
            setTimeout(clearFormDraft, 1000);
        });
        
        // Warn user about unsaved changes
        window.addEventListener('beforeunload', (e) => {
            const hasUnsavedData = localStorage.getItem(autoSaveKey);
            if (hasUnsavedData) {
                e.preventDefault();
                e.returnValue = '';
                return 'You have unsaved changes. Are you sure you want to leave?';
            }
        });
    }
    
    // ==============================================
    // DYNAMIC STAR FIELD SYSTEM ⭐
    // ==============================================
    
    function setupDynamicStarField() {
        const starFieldContainer = document.querySelector('.star-field');
        if (!starFieldContainer) return;
        
        const maxStars = 200;
        const stars = [];
        let animationId;
        
        createStarField();
        setupInteractiveStars();
        
        function createStarField() {
            for (let i = 0; i < maxStars; i++) {
                createStar();
            }
            
            for (let i = 0; i < 30; i++) {
                createTwinkleStar();
            }
        }
        
        function createStar() {
            const star = document.createElement('div');
            star.className = 'dynamic-star';
            
            const size = Math.random() * 3 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const opacity = Math.random() * 0.8 + 0.2;
            const twinkleDelay = Math.random() * 5;
            
            star.style.cssText = `
                position: absolute;
                left: ${x}%;
                top: ${y}%;
                width: ${size}px;
                height: ${size}px;
                background: #ffffff;
                border-radius: 50%;
                opacity: ${opacity};
                box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.5);
                animation: starTwinkle ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${twinkleDelay}s;
                pointer-events: none;
                z-index: 1;
            `;
            
            starFieldContainer.appendChild(star);
            stars.push({
                element: star,
                originalX: x,
                originalY: y,
                size: size,
                opacity: opacity,
                speed: Math.random() * 0.5 + 0.1
            });
        }
        
        function createTwinkleStar() {
            const star = document.createElement('div');
            star.className = 'twinkle-star';
            
            const size = Math.random() * 4 + 2;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            star.style.cssText = `
                position: absolute;
                left: ${x}%;
                top: ${y}%;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, rgba(167, 139, 250, 0.9) 0%, rgba(124, 58, 237, 0.6) 50%, transparent 100%);
                border-radius: 50%;
                animation: twinkleEffect ${2 + Math.random() * 3}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                pointer-events: none;
                z-index: 2;
            `;
            
            // Add sparkle effect
            const sparkle1 = document.createElement('div');
            sparkle1.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: ${size * 3}px;
                height: 2px;
                background: linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.8), transparent);
                transform: translate(-50%, -50%);
                border-radius: 2px;
            `;
            
            const sparkle2 = sparkle1.cloneNode();
            sparkle2.style.transform = 'translate(-50%, -50%) rotate(90deg)';
            
            star.appendChild(sparkle1);
            star.appendChild(sparkle2);
            starFieldContainer.appendChild(star);
        }
        
        function setupInteractiveStars() {
            document.addEventListener('mousemove', throttle((e) => {
                const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
                const mouseY = (e.clientY / window.innerHeight) * 2 - 1;
                
                stars.forEach((star, index) => {
                    const speed = star.speed * (index % 3 + 1);
                    const newX = star.originalX + mouseX * speed * 2;
                    const newY = star.originalY + mouseY * speed * 2;
                    
                    star.element.style.left = newX + '%';
                    star.element.style.top = newY + '%';
                });
            }, 50));
        }
    }
    
    // ==============================================
    // SHOOTING STARS SYSTEM ⭐
    // ==============================================
    
    function setupShootingStars() {
        const starField = document.querySelector('.star-field');
        if (!starField) return;
        
        function scheduleShootingStar() {
            const delay = Math.random() * 8000 + 5000; // 5-13 seconds
            setTimeout(() => {
                createShootingStar();
                scheduleShootingStar();
            }, delay);
        }
        
        function createShootingStar() {
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star-dynamic';
            
            const startFromTop = Math.random() > 0.5;
            const startX = startFromTop ? Math.random() * 100 : -10;
            const startY = startFromTop ? -10 : Math.random() * 50;
            const angle = Math.random() * 60 + 15;
            const duration = 2 + Math.random() * 3;
            const size = Math.random() * 3 + 1;
            
            shootingStar.style.cssText = `
                position: absolute;
                left: ${startX}%;
                top: ${startY}%;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(ellipse, #ffffff, rgba(167, 139, 250, 0.8), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 3;
                animation: shootingStarMove ${duration}s linear forwards;
                transform: rotate(${angle}deg);
                box-shadow: 0 0 ${size * 4}px rgba(167, 139, 250, 0.6);
            `;
            
            // Add trail effect
            const trail = document.createElement('div');
            trail.style.cssText = `
                position: absolute;
                left: -50px;
                top: 50%;
                width: 50px;
                height: 2px;
                background: linear-gradient(90deg, 
                    transparent, 
                    rgba(255, 255, 255, 0.8) 50%, 
                    rgba(167, 139, 250, 0.6));
                border-radius: 2px;
                transform: translateY(-50%);
                opacity: 0.8;
            `;
            
            shootingStar.appendChild(trail);
            starField.appendChild(shootingStar);
            
            // Add particles
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createShootingStarParticle(shootingStar);
                }, i * (duration * 200));
            }
            
            setTimeout(() => {
                shootingStar.remove();
            }, duration * 1000);
        }
        
        function createShootingStarParticle(parent) {
            if (!parent || !parent.parentNode) return;
            
            const particle = document.createElement('div');
            const size = Math.random() * 2 + 1;
            
            particle.style.cssText = `
                position: absolute;
                left: ${Math.random() * 20 - 10}px;
                top: ${Math.random() * 20 - 10}px;
                width: ${size}px;
                height: ${size}px;
                background: rgba(167, 139, 250, 0.8);
                border-radius: 50%;
                pointer-events: none;
                animation: shootingStarParticle 1s ease-out forwards;
                z-index: 2;
            `;
            
            parent.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
        
        scheduleShootingStar();
    }
    
    // ==============================================
    // CONSTELLATION SYSTEM ⭐
    // ==============================================
    
    function setupConstellations() {
        const starField = document.querySelector('.star-field');
        if (!starField) return;
        
        const constellations = [
            {
                name: 'big-dipper',
                stars: [
                    {x: 15, y: 25}, {x: 20, y: 20}, {x: 25, y: 18}, 
                    {x: 30, y: 20}, {x: 35, y: 15}, {x: 40, y: 22}, {x: 45, y: 28}
                ],
                connections: [[0,1], [1,2], [2,3], [3,4], [4,5], [5,6]]
            },
            {
                name: 'orion',
                stars: [
                    {x: 70, y: 35}, {x: 75, y: 30}, {x: 80, y: 40},
                    {x: 72, y: 45}, {x: 78, y: 50}, {x: 74, y: 55}, {x: 82, y: 60}
                ],
                connections: [[0,1], [1,2], [0,3], [3,4], [4,5], [4,6]]
            },
            {
                name: 'cassiopeia',
                stars: [
                    {x: 50, y: 15}, {x: 55, y: 12}, {x: 60, y: 18}, 
                    {x: 65, y: 10}, {x: 70, y: 16}
                ],
                connections: [[0,1], [1,2], [2,3], [3,4]]
            }
        ];
        
        constellations.forEach((constellation, index) => {
            setTimeout(() => {
                createConstellation(constellation);
            }, index * 3000);
        });
        
        function createConstellation(constellation) {
            const container = document.createElement('div');
            container.className = `constellation constellation-${constellation.name}`;
            container.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                opacity: 0;
                animation: constellationFadeIn 3s ease-in-out forwards;
                z-index: 2;
            `;
            
            constellation.stars.forEach((star, starIndex) => {
                setTimeout(() => {
                    const starElement = document.createElement('div');
                    starElement.className = 'constellation-star';
                    starElement.style.cssText = `
                        position: absolute;
                        top: ${star.y}%;
                        left: ${star.x}%;
                        width: 4px;
                        height: 4px;
                        background: radial-gradient(circle, #ffdd44, rgba(167, 139, 250, 0.8));
                        border-radius: 50%;
                        box-shadow: 0 0 12px rgba(255, 221, 68, 0.8);
                        opacity: 0;
                        animation: starAppear 1s ease-out ${starIndex * 0.3}s forwards;
                    `;
                    
                    starElement.title = `${constellation.name} - Star ${starIndex + 1}`;
                    container.appendChild(starElement);
                }, starIndex * 300);
            });
            
            setTimeout(() => {
                constellation.connections.forEach((connection, lineIndex) => {
                    setTimeout(() => {
                        const line = createConstellationLine(
                            constellation.stars[connection[0]], 
                            constellation.stars[connection[1]]
                        );
                        container.appendChild(line);
                    }, lineIndex * 200);
                });
            }, constellation.stars.length * 300);
            
            starField.appendChild(container);
        }
        
        function createConstellationLine(star1, star2) {
            const line = document.createElement('div');
            const deltaX = star2.x - star1.x;
            const deltaY = star2.y - star1.y;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
            
            line.className = 'constellation-line';
            line.style.cssText = `
                position: absolute;
                top: ${star1.y}%;
                left: ${star1.x}%;
                width: 0%;
                height: 1px;
                background: linear-gradient(90deg, 
                    rgba(255, 221, 68, 0.6) 0%, 
                    rgba(255, 221, 68, 0.3) 50%, 
                    rgba(255, 221, 68, 0.6) 100%);
                transform: rotate(${angle}deg);
                transform-origin: 0 0;
                opacity: 0.7;
                animation: lineGrow 1s ease-in-out forwards;
                z-index: 1;
            `;
            
            setTimeout(() => {
                line.style.width = distance + '%';
            }, 50);
            
            return line;
        }
    }
    
    // ==============================================
    // NEBULA EFFECTS SYSTEM ⭐
    // ==============================================
    
    function setupNebulae() {
        const heroSection = document.getElementById('hero');
        if (!heroSection) return;
        
        const nebulae = [
            {
                color: 'rgba(167, 139, 250, 0.15)',
                size: { min: 200, max: 400 },
                position: { x: 20, y: 30 },
                animation: 'nebulaFloat1'
            },
            {
                color: 'rgba(59, 130, 246, 0.12)',
                size: { min: 150, max: 350 },
                position: { x: 70, y: 20 },
                animation: 'nebulaFloat2'
            },
            {
                color: 'rgba(236, 72, 153, 0.1)',
                size: { min: 180, max: 320 },
                position: { x: 50, y: 60 },
                animation: 'nebulaFloat3'
            }
        ];
        
        nebulae.forEach((nebula, index) => {
            setTimeout(() => {
                createNebula(nebula, index);
            }, index * 1500);
        });
        
        function createNebula(config, index) {
            const nebula = document.createElement('div');
            const size = config.size.min + Math.random() * (config.size.max - config.size.min);
            
            nebula.className = `dynamic-nebula nebula-${index}`;
            nebula.style.cssText = `
                position: absolute;
                left: ${config.position.x}%;
                top: ${config.position.y}%;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(ellipse at center,
                    ${config.color} 0%,
                    ${config.color.replace(/0\.1/, '0.05')} 30%,
                    transparent 70%);
                border-radius: 50%;
                filter: blur(40px);
                opacity: 0;
                animation: ${config.animation} ${15 + Math.random() * 10}s ease-in-out infinite,
                          nebulaFadeIn 3s ease-in-out forwards;
                pointer-events: none;
                z-index: 1;
                mix-blend-mode: screen;
            `;
            
            heroSection.appendChild(nebula);
        }
    }
    
    // ==============================================
    // PARTICLE SYSTEM ⭐
    // ==============================================
    
    function setupParticleSystem() {
        const heroSection = document.getElementById('hero');
        if (!heroSection) return;
        
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-system';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            z-index: 1;
        `;
        
        heroSection.appendChild(particleContainer);
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createFloatingParticle(particleContainer);
            }, i * 300);
        }
        
        function createFloatingParticle(container) {
            const particle = document.createElement('div');
            const size = Math.random() * 4 + 2;
            const x = Math.random() * 100;
            const y = 100 + Math.random() * 20;
            const duration = 20 + Math.random() * 15;
            const colors = [
                'rgba(167, 139, 250, 0.6)',
                'rgba(59, 130, 246, 0.5)',
                'rgba(236, 72, 153, 0.4)',
                'rgba(255, 255, 255, 0.7)'
            ];
            
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                left: ${x}%;
                top: ${y}%;
                width: ${size}px;
                height: ${size}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                opacity: 0;
                animation: particleFloat ${duration}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
                box-shadow: 0 0 ${size * 2}px ${colors[Math.floor(Math.random() * colors.length)]};
                z-index: 1;
            `;
            
            container.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
                createFloatingParticle(container);
            }, (duration + 5) * 1000);
        }
    }
    
    // ==============================================
    // ADDITIONAL SYSTEMS
    // ==============================================
    
    function setupHeroEffects() {
        const heroSection = document.getElementById('hero');
        if (!heroSection) return;
        
        // Add floating orbs
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createFloatingOrb(heroSection, i);
            }, i * 2000);
        }
        
        function createFloatingOrb(container, index) {
            const orb = document.createElement('div');
            orb.className = `floating-orb orb-${index}`;
            
            const size = 100 + Math.random() * 100;
            const x = 20 + Math.random() * 60;
            const y = 20 + Math.random() * 60;
            const colors = [
                'rgba(167, 139, 250, 0.1)',
                'rgba(59, 130, 246, 0.08)',
                'rgba(236, 72, 153, 0.06)'
            ];
            
            orb.style.cssText = `
                position: absolute;
                left: ${x}%;
                top: ${y}%;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, ${colors[index]} 0%, transparent 70%);
                border-radius: 50%;
                animation: orbFloat ${20 + index * 5}s ease-in-out infinite;
                pointer-events: none;
                z-index: 1;
                filter: blur(20px);
            `;
            
            container.appendChild(orb);
        }
    }
    
    function setupScrollEffects() {
        // Parallax scrolling for hero elements
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const heroSection = document.getElementById('hero');
            
            if (heroSection && scrolled < window.innerHeight) {
                const parallaxElements = heroSection.querySelectorAll('.parallax-element');
                parallaxElements.forEach((element, index) => {
                    const speed = 0.5 + (index * 0.2);
                    const yPos = -(scrolled * speed);
                    element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                });
            }
        }, 16));
    }
    
    function setupSparkleEffects() {
        // Add sparkle effects to buttons
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                createSparkle(button);
            });
        });
        
        function createSparkle(element) {
            const sparkle = document.createElement('span');
            sparkle.className = 'button-sparkle';
            
            const x = Math.random() * element.offsetWidth;
            const y = Math.random() * element.offsetHeight;
            
            sparkle.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                pointer-events: none;
                animation: sparkleAnimation 1s ease-out forwards;
                z-index: 10;
            `;
            
            element.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }
    }
    
    function setupModalSystem() {
        // Enhanced modal functionality
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.addEventListener('show.bs.modal', (e) => {
                document.body.style.overflow = 'hidden';
                e.target.classList.add('modal-opening');
            });
            
            modal.addEventListener('hide.bs.modal', (e) => {
                document.body.style.overflow = '';
                e.target.classList.remove('modal-opening');
            });
        });
    }
    
    function setupAccessibility() {
        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
        
        // Skip to content link
        const skipLink = document.querySelector('.skip-to-content');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(skipLink.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }
    
    function setupPerformanceOptimizations() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-lazy]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.lazy;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
        
        // Preload critical resources
        const criticalResources = [
            '/assets/audio/voice-demo.m4a',
            '/assets/images/hero-bg.webp'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = resource.includes('.m4a') ? 'audio' : 'image';
            link.href = resource;
            document.head.appendChild(link);
        });
    }
    
    function initializeAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out-cubic',
                once: true,
                offset: 100,
                disable: window.innerWidth < 768 ? true : false
            });
        }
    }
    
    function setupStatsAnimation() {
        const statsNumbers = document.querySelectorAll('.stat-number');
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumber(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        });
        
        statsNumbers.forEach(stat => statsObserver.observe(stat));
        
        function animateNumber(element) {
            const finalNumber = parseInt(element.textContent);
            const duration = 2000;
            const increment = finalNumber / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= finalNumber) {
                    current = finalNumber;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 16);
        }
    }
    
    function setupBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        if (!backToTopBtn) return;
        
        window.addEventListener('scroll', throttle(() => {
            if (window.scrollY > 600) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, 100));
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    function setupCookieBanner() {
        const cookieBanner = document.getElementById('cookieBanner');
        const acceptBtn = document.getElementById('cookieAccept');
        const declineBtn = document.getElementById('cookieDecline');
        
        if (!cookieBanner) return;
        
        const cookieConsent = localStorage.getItem('cookieConsent');
        
        if (!cookieConsent) {
            setTimeout(() => {
                cookieBanner.style.display = 'block';
                cookieBanner.classList.add('show');
            }, 3000);
        }
        
        acceptBtn?.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            hideCookieBanner();
        });
        
        declineBtn?.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            hideCookieBanner();
        });
        
        function hideCookieBanner() {
            cookieBanner.classList.remove('show');
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 300);
        }
    }
    
    function setupInteractiveElements() {
        // Add interactive cursor effects
        const interactiveElements = document.querySelectorAll('a, button, .interactive');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }
    
    function startDynamicEffects() {
        console.log('🌟 All dynamic effects started successfully!');
        
        // Performance monitoring
        if ('performance' in window) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`⚡ Page loaded in ${loadTime}ms`);
        }
    }
    
    // ==============================================
    // UTILITY FUNCTIONS
    // ==============================================
    
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }
    
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: notificationSlideIn 0.3s ease-out;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
    
    // Add dynamic styles
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes starTwinkle {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.2); }
            }
            
            @keyframes twinkleEffect {
                            @keyframes twinkleEffect {
                0%, 100% { opacity: 0.6; transform: scale(1) rotate(0deg); }
                25% { opacity: 1; transform: scale(1.3) rotate(90deg); }
                50% { opacity: 0.8; transform: scale(1.1) rotate(180deg); }
                75% { opacity: 1; transform: scale(1.2) rotate(270deg); }
            }
            
            @keyframes shootingStarMove {
                0% { transform: translateX(0) translateY(0); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 0.8; }
                100% { transform: translateX(150vw) translateY(50vh); opacity: 0; }
            }
            
            @keyframes shootingStarParticle {
                0% { opacity: 1; transform: scale(1); }
                100% { 
                    opacity: 0; 
                    transform: scale(0) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); 
                }
            }
            
            @keyframes constellationFadeIn {
                0% { opacity: 0; transform: scale(0.8); }
                100% { opacity: 1; transform: scale(1); }
            }
            
            @keyframes starAppear {
                0% { opacity: 0; transform: scale(0); }
                50% { opacity: 1; transform: scale(1.3); }
                100% { opacity: 0.9; transform: scale(1); }
            }
            
            @keyframes lineGrow {
                0% { width: 0%; opacity: 0; }
                100% { opacity: 0.7; }
            }
            
            @keyframes nebulaFloat1 {
                0%, 100% { transform: translate(0, 0) scale(1); }
                25% { transform: translate(20px, -30px) scale(1.1); }
                50% { transform: translate(-10px, -20px) scale(0.9); }
                75% { transform: translate(15px, 10px) scale(1.05); }
            }
            
            @keyframes nebulaFloat2 {
                0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
                33% { transform: translate(-25px, 20px) scale(1.2) rotate(120deg); }
                66% { transform: translate(30px, -15px) scale(0.8) rotate(240deg); }
            }
            
            @keyframes nebulaFloat3 {
                0%, 100% { transform: translate(0, 0) scale(1); }
                50% { transform: translate(-40px, 30px) scale(1.15); }
            }
            
            @keyframes nebulaFadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
            
            @keyframes particleFloat {
                0% { transform: translateY(0) scale(0); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 0.8; }
                100% { transform: translateY(-100vh) scale(1); opacity: 0; }
            }
            
            @keyframes orbFloat {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                33% { transform: translateY(-20px) rotate(120deg); }
                66% { transform: translateY(10px) rotate(240deg); }
            }
            
            @keyframes sparkleAnimation {
                0% { opacity: 0; transform: scale(0) rotate(0deg); }
                50% { opacity: 1; transform: scale(1) rotate(180deg); }
                100% { opacity: 0; transform: scale(0) rotate(360deg); }
            }
            
            @keyframes notificationSlideIn {
                0% { transform: translateX(100%); opacity: 0; }
                100% { transform: translateX(0); opacity: 1; }
            }
            
            /* Enhanced form styles */
            .form-floating > label {
                transition: all 0.2s ease;
            }
            
            .form-control:focus ~ label,
            .form-control.has-content ~ label {
                transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
                color: var(--primary-color);
            }
            
            .form-control.error {
                border-color: #ef4444;
                box-shadow: 0 0 0 0.2rem rgba(239, 68, 68, 0.25);
            }
            
            .invalid-feedback {
                color: #ef4444;
                font-size: 0.875rem;
                margin-top: 0.25rem;
            }
            
            /* Audio player enhancements */
            .progress-track {
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .progress-track:hover .progress-handle {
                transform: translateX(-50%) scale(1.2);
                box-shadow: 0 0 15px rgba(167, 139, 250, 0.8);
            }
            
            .volume-slider {
                transition: all 0.2s ease;
            }
            
            .volume-slider:hover {
                transform: scaleY(1.1);
            }
            
            /* Portfolio enhancements */
            .portfolio-card {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                cursor: pointer;
            }
            
            .portfolio-card:hover {
                transform: translateY(-8px);
                box-shadow: 0 20px 40px rgba(0,0,0,0.15);
            }
            
            .portfolio-card:hover .portfolio-image img {
                transform: scale(1.05);
            }
            
            .filter-btn {
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            
            .filter-btn.active {
                background: var(--primary-gradient);
                color: white;
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(167, 139, 250, 0.4);
            }
            
            /* Navigation enhancements */
            .navbar {
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
            }
            
            .navbar.scrolled {
                background: rgba(0, 0, 0, 0.95);
                box-shadow: 0 2px 20px rgba(0,0,0,0.3);
            }
            
            .navbar.nav-hidden {
                transform: translateY(-100%);
            }
            
            .nav-link {
                position: relative;
                transition: all 0.3s ease;
            }
            
            .nav-link::after {
                content: '';
                position: absolute;
                bottom: -5px;
                left: 50%;
                width: 0;
                height: 2px;
                background: var(--primary-gradient);
                transition: all 0.3s ease;
                transform: translateX(-50%);
            }
            
            .nav-link.active::after,
            .nav-link:hover::after {
                width: 100%;
            }
            
            .nav-ripple {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: rgba(167, 139, 250, 0.3);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
            }
            
            @keyframes ripple {
                0% { width: 0; height: 0; opacity: 1; }
                100% { width: 100px; height: 100px; opacity: 0; }
            }
            
            /* Modal enhancements */
            .modal.modal-opening .modal-dialog {
                animation: modalZoomIn 0.3s ease-out;
            }
            
            @keyframes modalZoomIn {
                0% { transform: scale(0.7); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
            
            .modal-tech-stack .tech-tag {
                display: inline-block;
                background: var(--primary-gradient);
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: 20px;
                font-size: 0.875rem;
                margin: 0.25rem;
                transition: all 0.2s ease;
            }
            
            .tech-tag:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(167, 139, 250, 0.4);
            }
            
            /* Back to top button */
            #backToTop {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: var(--primary-gradient);
                color: white;
                border: none;
                border-radius: 50%;
                font-size: 20px;
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px);
                transition: all 0.3s ease;
                z-index: 1000;
                box-shadow: 0 4px 20px rgba(167, 139, 250, 0.4);
            }
            
            #backToTop.visible {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            
            #backToTop:hover {
                transform: translateY(-5px) scale(1.1);
                box-shadow: 0 8px 30px rgba(167, 139, 250, 0.6);
            }
            
            /* Cookie banner */
            #cookieBanner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(0, 0, 0, 0.95);
                color: white;
                padding: 20px;
                transform: translateY(100%);
                transition: all 0.3s ease;
                z-index: 10000;
                backdrop-filter: blur(10px);
            }
            
            #cookieBanner.show {
                transform: translateY(0);
            }
            
            /* Accessibility enhancements */
            .keyboard-navigation *:focus {
                outline: 2px solid var(--primary-color);
                outline-offset: 2px;
            }
            
            .skip-to-content {
                position: absolute;
                top: -40px;
                left: 6px;
                background: var(--primary-color);
                color: white;
                padding: 8px;
                text-decoration: none;
                z-index: 10000;
                border-radius: 4px;
                transition: all 0.2s ease;
            }
            
            .skip-to-content:focus {
                top: 6px;
            }
            
            /* Loading states */
            .loading {
                position: relative;
                pointer-events: none;
                opacity: 0.7;
            }
            
            .btn-loading {
                display: none;
                align-items: center;
                gap: 0.5rem;
            }
            
            .loading .btn-loading {
                display: flex;
            }
            
            .loading .btn-text {
                display: none;
            }
            
            /* Waveform visualization */
            .waveform-canvas {
                width: 100%;
                height: 60px;
                border-radius: 8px;
                background: rgba(167, 139, 250, 0.1);
            }
            
            .waveform-progress {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                background: rgba(167, 139, 250, 0.3);
                border-radius: 8px;
                width: 0%;
                transition: width 0.1s ease;
            }
            
            /* Frequency bars */
            .freq-bar {
                width: 3px;
                height: 4px;
                background: var(--primary-gradient);
                margin: 0 1px;
                border-radius: 2px;
                transition: all 0.1s ease;
            }
            
            /* Responsive adjustments */
            @media (max-width: 768px) {
                .dynamic-star,
                .twinkle-star,
                .shooting-star-dynamic {
                    animation-duration: 8s;
                }
                
                .floating-particle {
                    animation-duration: 25s;
                }
                
                .dynamic-nebula {
                    filter: blur(20px);
                }
                
                #backToTop {
                    bottom: 20px;
                    right: 20px;
                    width: 45px;
                    height: 45px;
                    font-size: 18px;
                }
                
                .notification {
                    max-width: 280px;
                    top: 10px;
                    right: 10px;
                    font-size: 14px;
                }
            }
            
            @media (prefers-reduced-motion: reduce) {
                .dynamic-star,
                .twinkle-star,
                .shooting-star-dynamic,
                .floating-particle,
                .dynamic-nebula,
                .floating-orb {
                    animation-duration: 20s;
                    animation-iteration-count: 3;
                }
                
                .portfolio-card,
                .nav-link,
                .btn {
                    transition-duration: 0.1s;
                }
            }
            
            /* High contrast mode */
            @media (prefers-contrast: high) {
                .dynamic-star {
                    background: #ffffff;
                    box-shadow: 0 0 8px #ffffff;
                }
                
                .constellation-star {
                    background: #ffff00;
                    box-shadow: 0 0 15px #ffff00;
                }
                
                .twinkle-star {
                    background: radial-gradient(circle, #ffffff 0%, #ffffff 100%);
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Initialize dynamic styles
    addDynamicStyles();
    
    // Performance monitoring
    function setupPerformanceMonitoring() {
        if ('PerformanceObserver' in window) {
            const perfObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'navigation') {
                        console.log(`🚀 Page Load Time: ${entry.loadEventEnd - entry.loadEventStart}ms`);
                        console.log(`⚡ DOM Content Loaded: ${entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart}ms`);
                        console.log(`🎨 First Paint: ${entry.loadEventEnd - entry.fetchStart}ms`);
                    }
                });
            });
            
            try {
                perfObserver.observe({ entryTypes: ['navigation'] });
            } catch (error) {
                console.warn('Performance Observer not supported:', error);
            }
        }
        
        // Memory usage monitoring (if available)
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                const usedSize = (memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
                const totalSize = (memory.totalJSHeapSize / 1024 / 1024).toFixed(2);
                const limit = (memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2);
                
                if (usedSize > 50) { // Alert if using more than 50MB
                    console.warn(`⚠️ High memory usage: ${usedSize}MB of ${limit}MB limit`);
                }
            }, 30000); // Check every 30 seconds
        }
    }
    
    // Error handling and reporting
    function setupErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('🚨 JavaScript Error:', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error
            });
            
            // Send error to analytics if available
            if (typeof gtag === 'function') {
                gtag('event', 'exception', {
                    description: event.message,
                    fatal: false
                });
            }
        });
        
        window.addEventListener('unhandledrejection', (event) => {
            console.error('🚨 Unhandled Promise Rejection:', event.reason);
            
            // Send error to analytics if available
            if (typeof gtag === 'function') {
                gtag('event', 'exception', {
                    description: `Unhandled Promise: ${event.reason}`,
                    fatal: false
                });
            }
        });
    }
    
    // Initialize error handling and performance monitoring
    setupPerformanceMonitoring();
    setupErrorHandling();
    
    // Service Worker registration (if available)
    function setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                        console.log('✅ ServiceWorker registration successful:', registration.scope);
                    })
                    .catch((error) => {
                        console.log('❌ ServiceWorker registration failed:', error);
                    });
            });
        }
    }
    
    // Initialize service worker
    setupServiceWorker();
    
    // Final initialization
    console.log('🎉 PEGEARTS Portfolio - All systems initialized successfully!');
    console.log('⭐ Dynamic star field active');
    console.log('🎵 Voice demo player ready');
    console.log('📁 Portfolio system loaded');
    console.log('📧 Contact form enhanced');
    console.log('🌟 All visual effects running');
    
    // Analytics initialization
    if (typeof gtag === 'function') {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href
        });
        
        gtag('event', 'app_initialized', {
            event_category: 'Portfolio',
            event_label: 'Main Application'
        });
    }
    
}); // End of DOMContentLoaded

// ==============================================
// GLOBAL FUNCTIONS (Available outside DOMContentLoaded)
// ==============================================

// Global notification function
window.showNotification = function(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: notificationSlideIn 0.3s ease-out;
        max-width: 300px;
        font-size: 14px;
    `;
    
    document.body.appendChild(notification);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'notificationSlideOut 0.3s ease-in forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'notificationSlideOut 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
};

// Global smooth scroll function
window.smoothScrollTo = function(target, offset = 0) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (element) {
        const elementTop = element.offsetTop - offset;
        window.scrollTo({
            top: elementTop,
            behavior: 'smooth'
        });
    }
};

// Global function to trigger sparkle effect
window.createSparkleEffect = function(element) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('span');
            sparkle.className = 'sparkle-effect';
            
            const x = Math.random() * element.offsetWidth;
            const y = Math.random() * element.offsetHeight;
            
            sparkle.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(167,139,250,0.8) 100%);
                border-radius: 50%;
                pointer-events: none;
                animation: sparkleAnimation 1s ease-out forwards;
                z-index: 1000;
            `;
            
            element.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }, i * 100);
    }
};

// Add slideOut animation for notifications
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes notificationSlideOut {
            0% { transform: translateX(0); opacity: 1; }
            100% { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Console art and information
console.log(`
    ██████╗ ███████╗ ██████╗ ███████╗ █████╗ ██████╗ ████████╗███████╗
    ██╔══██╗██╔════╝██╔════╝ ██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔════╝
    ██████╔╝█████╗  ██║  ███╗█████╗  ███████║██████╔╝   ██║   ███████╗
    ██╔═══╝ ██╔══╝  ██║   ██║██╔══╝  ██╔══██║██╔══██╗   ██║   ╚════██║
    ██║     ███████╗╚██████╔╝███████╗██║  ██║██║  ██║   ██║   ███████║
    ╚═╝     ╚══════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝
    
    🎨 AI Creative Designer & Voice Actor Portfolio
    🚀 Enhanced with Dynamic Effects & Interactive Features
    ⭐ Version 2.0 - Complete System
    
    📧 Contact: hello@pegearts.com
    🌐 Website: https://pegearts.com
    
    Features Loaded:
    ✅ Dynamic Star Field System
    ✅ Complete Audio Player
    ✅ Portfolio with Filtering
    ✅ Enhanced Contact Form
    ✅ Shooting Stars & Constellations  
    ✅ Nebula & Particle Effects
    ✅ Performance Optimization
    ✅ Accessibility Features
    ✅ Error Handling
    ✅ Analytics Integration
`);

// Expose main functions to global scope for debugging
window.PegeartsPortfolio = {
    version: '2.0.0',
    showNotification: window.showNotification,
    smoothScrollTo: window.smoothScrollTo,
    createSparkleEffect: window.createSparkleEffect
};

console.log('🎯 All systems ready! PEGEARTS Portfolio v2.0 fully loaded.');
