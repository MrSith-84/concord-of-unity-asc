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

    // Footer year
    const yr = document.getElementById('year');
    if (yr) yr.textContent = new Date().getFullYear();

    // Highlight active nav by page key
    const pageKey = (document.body.dataset.page || '').trim();
    const map = {
        home: 'index.html',
        mission: 'mission.html',
        operations: 'operations.html',
        divisions: 'divisions.html',
        contact: 'contact.html'
    };
    const target = map[pageKey];
    if (target) {
        document.querySelectorAll('.nav-link').forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === target);
        });
    }

    // Theme handling
    initTheme();
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const current = getStoredTheme() || getPreferredTheme();
            const next = current === 'light' ? 'dark' : 'light';
            setStoredTheme(next);
            applyTheme(next);
            updateToggleIcon();
        });
        updateToggleIcon();
    }
});

// Theme utilities
const THEME_KEY = 'theme';

function getStoredTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch { return null; }
}

function setStoredTheme(v) {
    try { localStorage.setItem(THEME_KEY, v); } catch {}
}

function getPreferredTheme() {
    if (getStoredTheme()) return getStoredTheme();
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
}

function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'light') {
        root.classList.add('theme-light');
    } else {
        root.classList.remove('theme-light');
    }
}

function initTheme() {
    applyTheme(getPreferredTheme());
    // React to OS theme changes when no explicit choice stored
    if (!getStoredTheme() && window.matchMedia) {
        try {
            const mq = window.matchMedia('(prefers-color-scheme: dark)');
            mq.addEventListener('change', () => applyTheme(getPreferredTheme()));
        } catch {
            // Safari <14 fallback
            try { window.matchMedia('(prefers-color-scheme: dark)').addListener(() => applyTheme(getPreferredTheme())); } catch {}
        }
    }
}

function updateToggleIcon() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    const isLight = document.documentElement.classList.contains('theme-light');
    // Show next action: if currently light, show moon (switch to dark)
    btn.textContent = isLight ? '🌙' : '☀️';
    btn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    btn.setAttribute('title', isLight ? 'Switch to dark theme' : 'Switch to light theme');
}

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
