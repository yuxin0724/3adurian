// Interactive Features for 3Adurian Website
(function() {
    'use strict';

    // Smooth Scroll Behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.addEventListener('DOMContentLoaded', function() {
        // Animate on scroll elements
        const animateElements = document.querySelectorAll('.animate-on-scroll, .card, .feature-item, .process-step, .product-card');
        animateElements.forEach(el => {
            el.classList.add('fade-in-up');
            observer.observe(el);
        });

        // Stagger animation for multiple items
        const staggerElements = document.querySelectorAll('.stagger-item');
        staggerElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
            observer.observe(el);
        });

        // Initialize interactive features
        initInteractiveFeatures();
    });

    // Interactive Features Initialization
    function initInteractiveFeatures() {
        initProductCards();
        initHoverEffects();
        initParallax();
        initCounters();
        initButtonRipples();
        initImageZoom();
        initNavbarScroll();
    }

    // Product Cards Interactive Effects
    function initProductCards() {
        // Exclude cards in Taste Profile section
        const productCards = document.querySelectorAll('.card, .product-card');
        
        productCards.forEach(card => {
            // Skip cards in Taste Profile section
            const tasteProfileSection = document.querySelector('[data-translate="products.taste.title"]');
            if (tasteProfileSection && card.closest('.row') === tasteProfileSection.closest('.row')) {
                return; // Skip this card
            }
            
            // 3D Tilt Effect
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            card.addEventListener('mouseleave', function() {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });

            // Click ripple effect
            card.addEventListener('click', function(e) {
                createRipple(e, card);
            });
        });
    }

    // Hover Effects
    function initHoverEffects() {
        // Feature icons hover
        const featureIcons = document.querySelectorAll('.feature-item i, .icon-check-circle');
        featureIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2) rotate(5deg)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.button, .btn, a.button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 5px 15px rgba(244, 208, 63, 0.4)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
        });
    }

    // Parallax Effect
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-bg, .hero-video-section');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        });
    }

    // Animated Counters
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => counterObserver.observe(counter));
    }

    // Button Ripple Effect
    function initButtonRipples() {
        const buttons = document.querySelectorAll('.button, .btn, .contact-bubble');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                createRipple(e, button);
            });
        });
    }

    // Create Ripple Effect
    function createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Image Zoom on Hover
    function initImageZoom() {
        const images = document.querySelectorAll('.card-img-top, .product-thumb, .gallery-item img');
        
        images.forEach(img => {
            // Skip images in Taste Profile section
            const tasteProfileSection = document.querySelector('[data-translate="products.taste.title"]');
            if (tasteProfileSection && img.closest('.row') === tasteProfileSection.closest('.row')) {
                return; // Skip this image
            }
            
            img.addEventListener('mouseenter', function() {
                if (!this.style.transform || !this.style.transform.includes('none')) {
                    this.style.transform = 'scale(1.1)';
                    this.style.transition = 'transform 0.3s ease';
                }
            });
            
            img.addEventListener('mouseleave', function() {
                if (!this.style.transform || !this.style.transform.includes('none')) {
                    this.style.transform = 'scale(1)';
                }
            });
        });
    }

    // Navbar Scroll Effect
    function initNavbarScroll() {
        const header = document.getElementById('header');
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (currentScroll > lastScroll && currentScroll > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // Floating Animation for Contact Bubbles
    function initFloatingAnimation() {
        const bubbles = document.querySelectorAll('.contact-bubble');
        bubbles.forEach((bubble, index) => {
            bubble.style.animation = `float 3s ease-in-out infinite`;
            bubble.style.animationDelay = `${index * 0.5}s`;
        });
    }

    // Video Play on Hover (optional)
    function initVideoHover() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.addEventListener('mouseenter', function() {
                if (this.paused) {
                    this.play();
                }
            });
        });
    }

    // Initialize floating animation
    document.addEventListener('DOMContentLoaded', function() {
        initFloatingAnimation();
        initVideoHover();
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

})();

