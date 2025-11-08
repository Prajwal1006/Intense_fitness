// ===== Mobile Navigation Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== Hero Slider =====
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Wrap around if index is out of bounds
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    // Add active class to current slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Auto-slide functionality
function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

// Event listeners for slider controls
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideShow();
        startSlideShow();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideShow();
        startSlideShow();
    });
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        stopSlideShow();
        startSlideShow();
    });
});

// Start auto-slide on page load
if (slides.length > 0) {
    startSlideShow();
}

// Pause slider on hover
const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopSlideShow);
    sliderContainer.addEventListener('mouseleave', startSlideShow);
}

// ===== Counter Animation for Stats =====
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    counterObserver.observe(stat);
});

// ===== Gallery Filter =====
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                // Fade out
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';

                setTimeout(() => {
                    if (filter === 'all' || category === filter) {
                        item.classList.remove('hide');
                        item.style.display = 'block';
                        // Fade in
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.classList.add('hide');
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });
}

// ===== Gallery Modal =====
const viewBtns = document.querySelectorAll('.view-btn');
const modal = document.getElementById('imageModal');
const modelimg = document.getElementById('modelimg');
const closeModal = document.querySelector('.close-modal');

if (viewBtns.length > 0) {
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('active');
            
            document.body.style.overflow = 'hidden';
        });
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Simulate form submission
        formMessage.textContent = 'Sending message...';
        formMessage.className = 'form-message';
        formMessage.style.display = 'block';

        // Simulate API call
        setTimeout(() => {
            formMessage.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
            formMessage.classList.add('success');
            contactForm.reset();

            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }, 1500);
    });
}

// ===== FAQ Accordion =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== Scroll Animations =====
const animateElements = document.querySelectorAll('.feature-card, .class-card, .value-card, .trainer-card, .gallery-item');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
            setTimeout(() => {
                entry.target.classList.add('animated');
            }, 100);
            scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

animateElements.forEach(element => {
    scrollObserver.observe(element);
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.8)';
    }

    lastScroll = currentScroll;
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== Parallax Effect for Background =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-slider, .page-header');
    
    parallaxElements.forEach(element => {
        if (element) {
            const speed = 0.5;
            element.style.backgroundPositionY = -(scrolled * speed) + 'px';
        }
    });
});

// ===== Loading Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Cursor Effect (Optional Enhancement) =====
const createCursorEffect = () => {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(255, 69, 0, 0.5);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        display: none;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Scale cursor on clickable elements
    const clickableElements = document.querySelectorAll('a, button, .cta-btn, .filter-btn');
    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
};

// Only enable cursor effect on desktop
if (window.innerWidth > 768) {
    createCursorEffect();
}

// ===== Lazy Loading for Images (if you add real images later) =====
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

// ===== Add Hover Sound Effect (Optional - commented out) =====
/*
const hoverSound = new Audio('path/to/hover-sound.mp3');
document.querySelectorAll('.cta-btn, .filter-btn, .submit-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });
});
*/

// ===== Page Transition Effect =====
const pageLinks = document.querySelectorAll('a[href$=".html"]');

pageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Don't prevent default for external links
        if (href.startsWith('http')) return;
        
        e.preventDefault();
        
        document.body.style.transition = 'opacity 0.3s ease-out';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            window.location.href = href;
        }, 300);
    });
});

// ===== Add Active State to Current Page Navigation =====
const currentLocation = window.location.pathname;
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentLocation.includes(linkPath) || (currentLocation.endsWith('/') && linkPath === 'index.html')) {
        link.classList.add('active');
    }
});

// ===== Performance: Debounce Scroll Events =====
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedScroll = debounce(() => {
    // Your scroll functions here
});

window.addEventListener('scroll', debouncedScroll);

// ===== Console Welcome Message =====
console.log('%c🏋️ Welcome to Intense Fitness! 🏋️', 'color: #ff4500; font-size: 20px; font-weight: bold;');
console.log('%cTransform Your Body, Transform Your Life', 'color: #ffa500; font-size: 14px;');

// ===== Feature: Add to Home Screen Prompt (for iOS/Android) =====
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // You can show a custom install button here
});

// ===== Accessibility: Keyboard Navigation Enhancement =====
document.addEventListener('keydown', (e) => {
    // ESC key closes modal
    if (e.key === 'Escape') {
        if (modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // Arrow keys for slider
    if (slides.length > 0) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopSlideShow();
            startSlideShow();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopSlideShow();
            startSlideShow();
        }
    }
});

// ===== Add Ripple Effect to Buttons =====
const buttons = document.querySelectorAll('.cta-btn, .submit-btn, .filter-btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Browser Support Detection =====
const checkBrowserSupport = () => {
    const features = {
        intersectionObserver: 'IntersectionObserver' in window,
        requestAnimationFrame: 'requestAnimationFrame' in window,
        flexbox: CSS.supports('display', 'flex'),
        grid: CSS.supports('display', 'grid')
    };

    const unsupportedFeatures = Object.entries(features)
        .filter(([key, value]) => !value)
        .map(([key]) => key);

    if (unsupportedFeatures.length > 0) {
        console.warn('Some features may not work properly:', unsupportedFeatures);
    }
};

checkBrowserSupport();

