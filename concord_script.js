// Concord of Unity - Site JavaScript

// Page load animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on load
    const elements = document.querySelectorAll('.content-card, .floating-crest');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
    // Mobile navigation if present
    initializeMobileNav();

    // Enable smooth scrolling for internal links
    const navLinkItems = document.querySelectorAll('a.nav-link[href^="#"], a.btn[href^="#"]');
    navLinkItems.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                smoothScrollTo(href);
            }
        });
    });
});

// Floating crest hover effects
const floatingCrest = document.querySelector('.floating-crest');
if (floatingCrest) {
    floatingCrest.addEventListener('mouseenter', () => {
        floatingCrest.style.transform = 'translateY(-3px) scale(1.05) rotateY(10deg)';
    });
    
    floatingCrest.addEventListener('mouseleave', () => {
        floatingCrest.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
    });
}

// Mobile navigation handling
function initializeMobileNav() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close mobile nav when clicking links
        const navLinkItems = document.querySelectorAll('.nav-link');
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

// Smooth scroll for anchor links
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Console greeting
console.log('%cWelcome to the Concord of Unity', 'color: #daa520; font-size: 16px; font-weight: bold;');
