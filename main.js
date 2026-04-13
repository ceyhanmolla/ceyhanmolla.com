        /**
         * Ceyhan Molla Portfolio - Main JavaScript
         * Constants and Configuration
         */
        const CONFIG = {
            ANIMATION: {
                DURATION_FAST: 300,
                DURATION_NORMAL: 400,
                DURATION_SLOW: 800,
                COUNTER_DURATION: 2000,
                STAGGER_DELAY: 150,
                EASING: 'cubic-bezier(0.25, 1, 0.5, 1)'
            },
            CANVAS: {
                PARTICLE_COUNT: 100,
                CONNECTION_DISTANCE: 100
            },
            THRESHOLD: {
                STATS: 0.3,
                TEXT_REVEAL: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
            },
            SCROLL: {
                PROGRESS_UPDATE: true,
                PARALLAX_UPDATE: true,
                NAVBAR_UPDATE: true
            }
        };

        /**
         * Mobile Navigation Module
         */
        const MobileNav = (() => {
            const hamburger = document.querySelector('.hamburger');
            const mobileNav = document.getElementById('mobileNav');
            const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
            const body = document.body;
            
            let isOpen = false;

            const toggle = () => {
                isOpen = !isOpen;
                hamburger.setAttribute('aria-expanded', isOpen);
                mobileNav.classList.toggle('active', isOpen);
                body.classList.toggle('nav-open', isOpen);
                
                // Focus management
                if (isOpen) {
                    setTimeout(() => mobileNavLinks[0]?.focus(), 100);
                } else {
                    hamburger.focus();
                }
            };

            const close = () => {
                if (isOpen) toggle();
            };

            const init = () => {
                if (!hamburger || !mobileNav) return;

                hamburger.addEventListener('click', toggle);
                
                mobileNavLinks.forEach(link => {
                    link.addEventListener('click', close);
                });

                // Close on Escape key
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && isOpen) close();
                });

                // Close on click outside
                mobileNav.addEventListener('click', (e) => {
                    if (e.target === mobileNav) close();
                });

                // Close on window resize to desktop
                window.addEventListener('resize', () => {
                    if (window.innerWidth > 768 && isOpen) close();
                });
            };

            return { init, close };
        })();

        /**
         * Scroll Progress Bar Module
         */
        const ScrollProgress = (() => {
            const progressBar = document.getElementById('scrollProgress');
            
            const update = () => {
                if (!progressBar) return;
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = docHeight > 0 ? scrollTop / docHeight : 0;
                progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
            };

            return { update };
        })();

        /**
         * Text Reveal Animation Module
         */
        const TextReveal = (() => {
            const revealText = document.getElementById('revealText');
            if (!revealText) return null;

            const textContent = revealText.innerText;
            revealText.innerHTML = textContent.split(' ').map(word => `<span>${word}</span>`).join(' ');
            const words = revealText.querySelectorAll('span');

            let ticking = false;

            const update = () => {
                const rect = revealText.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                const start = windowHeight * 0.8;
                const end = windowHeight * 0.2;
                let progress = (start - rect.top) / (start - end);
                progress = Math.max(0, Math.min(1, progress));
                
                const activeCount = Math.floor(progress * words.length);
                
                words.forEach((word, index) => {
                    word.classList.toggle('active', index < activeCount);
                });
                
                ticking = false;
            };

            const requestTick = () => {
                if (ticking) return;
                requestAnimationFrame(update);
                ticking = true;
            };

            const init = () => {
                window.addEventListener('scroll', requestTick, { passive: true });
                update(); // Initial check
            };

            return { init };
        })();

        /**
         * Accordion Module
         */
        const Accordion = (() => {
            const items = document.querySelectorAll('.accordion-item');

            const toggle = (item, header) => {
                const isActive = item.classList.contains('active');
                
                // Close all siblings
                const siblings = item.parentElement?.querySelectorAll('.accordion-item') || [];
                siblings.forEach(sibling => {
                    sibling.classList.remove('active');
                    const siblingHeader = sibling.querySelector('.accordion-header');
                    if (siblingHeader) siblingHeader.setAttribute('aria-expanded', 'false');
                });
                
                // Open clicked if wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    header.setAttribute('aria-expanded', 'true');
                }
            };

            const init = () => {
                items.forEach(item => {
                    const header = item.querySelector('.accordion-header');
                    if (!header) return;

                    header.addEventListener('click', () => toggle(item, header));

                    header.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggle(item, header);
                        }
                    });
                });
            };

            return { init };
        })();

        /**
         * Stats Counter Animation Module - DÜZELTİLDİ
         */
        const StatsCounter = (() => {
            const statRows = document.querySelectorAll('.stat-row');

            const animate = (numElement, finalValue, suffix) => {
                const startTime = performance.now();
                const duration = CONFIG.ANIMATION.COUNTER_DURATION;

                const step = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Ease out quart easing function
                    const easeOut = 1 - Math.pow(1 - progress, 4);
                    
                    // Calculate current value
                    let current;
                    if (finalValue % 1 !== 0) {
                        // Decimal number (like 99.9)
                        current = (easeOut * finalValue).toFixed(1);
                    } else {
                        // Integer
                        current = Math.floor(easeOut * finalValue);
                    }
                    
                    // Update DOM
                    numElement.textContent = current + suffix;
                    
                    // Continue animation or finalize
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        // Ensure final value is exact
                        numElement.textContent = finalValue + suffix;
                    }
                };

                requestAnimationFrame(step);
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (!entry.isIntersecting) return;

                    // Staggered animation delay
                    const delay = index * CONFIG.ANIMATION.STAGGER_DELAY;
                    
                    setTimeout(() => {
                        // Add visible class for CSS transition
                        entry.target.classList.add('visible');
                        
                        // Get number element
                        const numElement = entry.target.querySelector('.stat-number');
                        if (!numElement) return;

                        // Parse target value and suffix
                        const finalValue = parseFloat(numElement.dataset.target);
                        const suffix = numElement.dataset.suffix || '';
                        
                        // Start counter animation
                        animate(numElement, finalValue, suffix);
                        
                    }, delay);

                    // Unobserve after triggering
                    observer.unobserve(entry.target);
                });
            }, { 
                threshold: CONFIG.THRESHOLD.STATS,
                rootMargin: '0px 0px -50px 0px' // Trigger slightly before fully visible
            });

            const init = () => {
                statRows.forEach(row => observer.observe(row));
            };

            return { init };
        })();

        /**
         * Parallax Effect Module
         */
        const Parallax = (() => {
            const root = document.documentElement;
            let ticking = false;

            const update = () => {
                const section = document.getElementById('statsSection');
                if (!section) return;
                
                const rect = section.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (rect.top >= windowHeight || rect.bottom <= 0) return;
                
                const centerOffset = (rect.top + rect.height / 2) - (windowHeight / 2);
                const offset = centerOffset * 0.05;
                root.style.setProperty('--parallax-offset', `${offset}px`);
                
                ticking = false;
            };

            const requestTick = () => {
                if (ticking) return;
                requestAnimationFrame(update);
                ticking = true;
            };

            return { requestTick };
        })();

        /**
         * Navbar Scroll Behavior Module
         */
        const NavbarScroll = (() => {
            const navbar = document.querySelector('.navbar');
            let lastScroll = 0;

            const update = () => {
                if (window.innerWidth > 768 || !navbar) return;
                
                const currentScroll = window.scrollY;
                
                if (currentScroll > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                lastScroll = currentScroll;
            };

            return { update };
        })();

        /**
         * Canvas Animation Module
         */
        const CanvasAnimation = (() => {
            const canvas = document.getElementById('dotCanvas');
            if (!canvas) return null;

            const ctx = canvas.getContext('2d');
            const section = document.getElementById('statsSection');
            if (!section) return null;

            let width, height;
            let particles = [];
            let animationId = null;
            let isVisible = true;

            const init = () => {
                width = section.offsetWidth;
                height = section.offsetHeight;
                canvas.width = width;
                canvas.height = height;

                particles = [];
                for (let i = 0; i < CONFIG.CANVAS.PARTICLE_COUNT; i++) {
                    particles.push({
                        x: Math.random() * width,
                        y: Math.random() * height,
                        radius: Math.random() * 1.2 + 0.3,
                        vx: (Math.random() - 0.5) * 0.5,
                        vy: (Math.random() - 0.5) * 0.5
                    });
                }
            };

            const animate = () => {
                if (!isVisible) return;
                
                ctx.clearRect(0, 0, width, height);
                ctx.fillStyle = 'rgba(10, 10, 10, 0.4)';

                particles.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;

                    if (p.x < 0) p.x = width;
                    if (p.x > width) p.x = 0;
                    if (p.y < 0) p.y = height;
                    if (p.y > height) p.y = 0;

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fill();
                });

                animationId = requestAnimationFrame(animate);
            };

            const handleVisibility = () => {
                if (document.hidden) {
                    isVisible = false;
                    if (animationId) cancelAnimationFrame(animationId);
                } else {
                    isVisible = true;
                    animate();
                }
            };

            const resizeObserver = new ResizeObserver(() => {
                init();
            });

            const initModule = () => {
                init();
                animate();
                resizeObserver.observe(section);
                document.addEventListener('visibilitychange', handleVisibility);
            };

            const destroy = () => {
                if (animationId) cancelAnimationFrame(animationId);
                resizeObserver.disconnect();
                document.removeEventListener('visibilitychange', handleVisibility);
            };

            return { init: initModule, destroy };
        })();

        /**
         * Main Initialization
         */
        const App = (() => {
            const init = () => {
                // Initialize all modules
                MobileNav.init();
                TextReveal?.init();
                Accordion.init();
                StatsCounter.init();
                CanvasAnimation?.init();

                // Scroll event handler with passive listener
                window.addEventListener('scroll', () => {
                    if (CONFIG.SCROLL.PROGRESS_UPDATE) ScrollProgress.update();
                    if (CONFIG.SCROLL.PARALLAX_UPDATE) Parallax.requestTick();
                    if (CONFIG.SCROLL.NAVBAR_UPDATE) NavbarScroll.update();
                }, { passive: true });
            };

            // Cleanup on page unload
            window.addEventListener('beforeunload', () => {
                CanvasAnimation?.destroy();
            });

            return { init };
        })();

        // Update copyright year
        const updateCopyrightYear = () => {
            const yearElement = document.getElementById('copyright-year');
            if (yearElement) {
                const currentYear = new Date().getFullYear();
                yearElement.innerHTML = yearElement.innerHTML.replace(/\d{4}/, currentYear);
            }
        };

        // Start the application when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                updateCopyrightYear();
                App.init();
            });
        } else {
            updateCopyrightYear();
            App.init();
        }
