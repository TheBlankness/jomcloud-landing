// ===================================
// Modern JomCloud - Enhanced JavaScript
// ===================================

// Auto-update year in footer
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

// ===================================
// Smooth Scrolling for anchor links
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
});

// ===================================
// Scroll Animation Observer
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Optional: Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animateElements = document.querySelectorAll(
        '.service_section .box, ' +
        '.price_section .box, ' +
        '.about_section .detail-box, ' +
        '.about_section .img-box, ' +
        '.server_section .img-box, ' +
        '.server_section .detail-box, ' +
        '.client_section .box, ' +
        '.contact_section .form_container, ' +
        '.heading_container'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add CSS for animated state
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Initialize scroll animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}

// ===================================
// Navbar scroll effect (if needed in future)
// ===================================
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    const header = document.querySelector('.header_section');
    
    if (header) {
        if (currentScroll > 100) {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            header.style.transition = 'all 0.3s ease';
        } else {
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = 'none';
        }
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Enhanced Card Hover Effects
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Add parallax effect to service cards
    const serviceCards = document.querySelectorAll('.service_section .box');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            // Only apply on desktop
            if (window.innerWidth > 992) {
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

// ===================================
// Pricing Card Highlight Effect
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const pricingCards = document.querySelectorAll('.price_section .box');
    
    // Add "Most Popular" badge to middle card (optional enhancement)
    if (pricingCards.length >= 2) {
        const middleCard = pricingCards[1];
        const badge = document.createElement('div');
        badge.style.cssText = `
            position: absolute;
            top: 15px;
            right: 15px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
            z-index: 10;
        `;
        badge.textContent = 'Popular';
        middleCard.querySelector('.detail-box').style.position = 'relative';
        middleCard.querySelector('.detail-box').appendChild(badge);
    }
});

// ===================================
// Form Input Animations
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.contact_section input, .info_section input');
    
    formInputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.01)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// ===================================
// Button Ripple Effect
// ===================================
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    const rect = button.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll(
        '.slider_section .btn-1, ' +
        '.slider_section .btn-2, ' +
        '.about_section .detail-box a, ' +
        '.server_section .detail-box a, ' +
        '.price_section .btn-box a, ' +
        '.contact_section button, ' +
        '.info_section button'
    );
    
    buttons.forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.addEventListener('click', createRipple);
    });
    
    // Add ripple CSS
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// ===================================
// Counter Animation for Pricing
// ===================================
function animateCounter(element, target, duration = 1000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

document.addEventListener('DOMContentLoaded', function() {
    const priceElements = document.querySelectorAll('.price_section .box .detail-box h2 span');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const targetValue = parseInt(entry.target.textContent);
                entry.target.textContent = '0';
                animateCounter(entry.target, targetValue);
                entry.target.dataset.animated = 'true';
            }
        });
    }, { threshold: 0.5 });
    
    priceElements.forEach(el => observer.observe(el));
});

// ===================================
// Carousel Enhancement
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation for carousels
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        carousel.setAttribute('tabindex', '0');
        
        carousel.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                $(this).carousel('prev');
            } else if (e.key === 'ArrowRight') {
                $(this).carousel('next');
            }
        });
    });
});

// ===================================
// Image Lazy Loading Enhancement
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Add loading="lazy" to images if not already present
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
});

// ===================================
// jQuery Plugins Initialization
// ===================================
$(document).ready(function () {
    // Nice select initialization (if select elements exist)
    if (typeof $.fn.niceSelect !== 'undefined' && $('select').length) {
        $('select').niceSelect();
    }
    
    // Date picker initialization (if date input exists)
    if (typeof $.fn.datepicker !== 'undefined' && $("#inputDate").length) {
        $("#inputDate").datepicker({
            autoclose: true,
            todayHighlight: true
        }).datepicker('update', new Date());
    }
    
    // Owl carousel initialization (if team carousel exists)
    if (typeof $.fn.owlCarousel !== 'undefined' && $('.team_carousel').length) {
        $('.team_carousel').owlCarousel({
            loop: true,
            margin: 15,
            dots: true,
            autoplay: true,
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1,
                    margin: 0
                },
                576: {
                    items: 2,
                },
                992: {
                    items: 3
                }
            }
        });
    }
});

// ===================================
// Performance: Debounce Function
// ===================================
function debounce(func, wait) {
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

// Apply debounce to scroll event
const debouncedScroll = debounce(function() {
    // Any scroll-based calculations can go here
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ===================================
// Console Message (Optional branding)
// ===================================
console.log(
    '%c🚀 JomCloud - Modern Web Hosting %c\n' +
    '%cBuilt with modern design principles\n' +
    'Featuring glassmorphism, gradients, and smooth animations',
    'font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; border-radius: 5px;',
    '',
    'font-size: 12px; color: #64748b;'
);
