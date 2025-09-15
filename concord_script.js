// Concord of Unity - Site JavaScript

// Page load animations
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Animate elements on load
        const elements = document.querySelectorAll('.content-card, .floating-crest');
        elements.forEach((el, index) => {
            try {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    try {
                        el.style.transition = 'all 0.6s ease';
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    } catch (error) {
                        console.error('Error animating element:', error);
                    }
                }, index * 150);
            } catch (error) {
                console.error('Error setting up element animation:', error);
            }
        });
        
        // Mobile navigation if present
        initializeMobileNav();

        // Enable smooth scrolling for internal links
        const navLinkItems = document.querySelectorAll('a.nav-link[href^="#"], a.btn[href^="#"]');
        navLinkItems.forEach(link => {
            link.addEventListener('click', (e) => {
                try {
                    const href = link.getAttribute('href');
                    if (href && href.startsWith('#')) {
                        e.preventDefault();
                        smoothScrollTo(href);
                    }
                } catch (error) {
                    console.error('Error handling smooth scroll link:', error);
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
                try {
                    const href = a.getAttribute('href');
                    if (href === target || (pageKey === 'divisions' && a.classList.contains('dropdown-toggle'))) {
                        a.classList.add('active');
                        a.setAttribute('aria-current', 'page');
                    }
                } catch (error) {
                    console.error('Error highlighting active navigation:', error);
                }
            });
        }

        // Theme handling
        initTheme();
        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                try {
                    const current = getStoredTheme() || getPreferredTheme();
                    const next = current === 'light' ? 'dark' : 'light';
                    setStoredTheme(next);
                    applyTheme(next);
                    updateToggleIcon();

                    // Announce theme change to screen readers
                    const announcement = next === 'light' ? 'Switched to light theme' : 'Switched to dark theme';
                    announceToScreenReader(announcement);
                } catch (error) {
                    console.error('Error handling theme toggle:', error);
                }
            });
            updateToggleIcon();
        }
    } catch (error) {
        console.error('Error during page initialization:', error);
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
    try {
        if (getStoredTheme()) return getStoredTheme();
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    } catch (error) {
        console.error('Error getting preferred theme:', error);
        return 'light'; // fallback
    }
}

function applyTheme(theme) {
    try {
        const root = document.documentElement;
        if (theme === 'light') {
            root.classList.add('theme-light');
        } else {
            root.classList.remove('theme-light');
        }
    } catch (error) {
        console.error('Error applying theme:', error);
    }
}

function initTheme() {
    try {
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
    } catch (error) {
        console.error('Error initializing theme:', error);
    }
}

function updateToggleIcon() {
    try {
        const btn = document.getElementById('themeToggle');
        if (!btn) return;
        const isLight = document.documentElement.classList.contains('theme-light');
        // Show next action: if currently light, show moon (switch to dark)
        btn.textContent = isLight ? '🌙' : '☀️';
        btn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
        btn.setAttribute('title', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    } catch (error) {
        console.error('Error updating toggle icon:', error);
    }
}

// Floating crest hover effects
const floatingCrest = document.querySelector('.floating-crest');
if (floatingCrest) {
    floatingCrest.addEventListener('mouseenter', () => {
        try {
            floatingCrest.style.transform = 'translateY(-3px) scale(1.05) rotateY(10deg)';
        } catch (error) {
            console.error('Error handling floating crest mouseenter:', error);
        }
    });
    
    floatingCrest.addEventListener('mouseleave', () => {
        try {
            floatingCrest.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
        } catch (error) {
            console.error('Error handling floating crest mouseleave:', error);
        }
    });
}

// Mobile navigation handling
function initializeMobileNav() {
    try {
        const mobileToggle = document.querySelector('.mobile-nav-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (mobileToggle && navLinks) {
            mobileToggle.addEventListener('click', () => {
                try {
                    navLinks.classList.toggle('active');
                    mobileToggle.classList.toggle('active');
                } catch (error) {
                    console.error('Error toggling mobile navigation:', error);
                }
            });

            // Close mobile nav when clicking links
            const navLinkItems = document.querySelectorAll('.nav-link');
            navLinkItems.forEach(link => {
                link.addEventListener('click', () => {
                    try {
                        navLinks.classList.remove('active');
                        mobileToggle.classList.remove('active');
                    } catch (error) {
                        console.error('Error closing mobile navigation:', error);
                    }
                });
            });
        }

        // Initialize dropdown menus
        initializeDropdowns();
    } catch (error) {
        console.error('Error initializing mobile navigation:', error);
    }
}

// Dropdown menu handling
function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (!toggle || !menu) {
            console.warn('Dropdown missing required elements:', dropdown);
            return;
        }

        // Handle click for mobile and accessibility
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            try {
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                toggle.setAttribute('aria-expanded', !isExpanded);
                dropdown.classList.toggle('active');

                // Announce to screen readers
                const announcement = isExpanded ? 'Divisions menu collapsed' : 'Divisions menu expanded';
                announceToScreenReader(announcement);
            } catch (error) {
                console.error('Error toggling dropdown:', error);
            }
        });

        // Handle keyboard navigation
        toggle.addEventListener('keydown', (e) => {
            try {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle.click();
                }
                // Arrow keys for navigation
                else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (toggle.getAttribute('aria-expanded') === 'true') {
                        const firstItem = dropdown.querySelector('.dropdown-item');
                        if (firstItem) firstItem.focus();
                    } else {
                        toggle.click();
                    }
                }
                else if (e.key === 'Escape') {
                    toggle.setAttribute('aria-expanded', 'false');
                    dropdown.classList.remove('active');
                    toggle.focus();
                    announceToScreenReader('Divisions menu collapsed');
                }
            } catch (error) {
                console.error('Error handling dropdown keyboard navigation:', error);
            }
        });

        // Handle keyboard navigation in dropdown items
        const items = dropdown.querySelectorAll('.dropdown-item');
        items.forEach((item, index) => {
            item.addEventListener('keydown', (e) => {
                try {
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        const nextItem = items[index + 1] || items[0];
                        nextItem.focus();
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        const prevItem = items[index - 1] || items[items.length - 1];
                        prevItem.focus();
                    } else if (e.key === 'Escape') {
                        const toggle = dropdown.querySelector('.dropdown-toggle');
                        if (toggle) {
                            toggle.setAttribute('aria-expanded', 'false');
                            dropdown.classList.remove('active');
                            toggle.focus();
                            announceToScreenReader('Divisions menu collapsed');
                        }
                    } else if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        item.click();
                    }
                } catch (error) {
                    console.error('Error handling dropdown item keyboard navigation:', error);
                }
            });
        });        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            try {
                if (!dropdown.contains(e.target)) {
                    const toggle = dropdown.querySelector('.dropdown-toggle');
                    if (toggle) toggle.setAttribute('aria-expanded', 'false');
                    dropdown.classList.remove('active');
                }
            } catch (error) {
                console.error('Error closing dropdown on outside click:', error);
            }
        });

        // Close dropdown when focus leaves
        dropdown.addEventListener('focusout', (e) => {
            try {
                setTimeout(() => {
                    if (!dropdown.contains(document.activeElement)) {
                        const toggle = dropdown.querySelector('.dropdown-toggle');
                        if (toggle) toggle.setAttribute('aria-expanded', 'false');
                        dropdown.classList.remove('active');
                    }
                }, 10);
            } catch (error) {
                console.error('Error handling dropdown focus out:', error);
            }
        });
    });
}

// Screen reader announcement function
function announceToScreenReader(message) {
    try {
        if (!message || typeof message !== 'string') {
            console.warn('Invalid message for screen reader announcement:', message);
            return;
        }

        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';

        document.body.appendChild(announcement);
        announcement.textContent = message;

        setTimeout(() => {
            try {
                if (announcement.parentNode) {
                    document.body.removeChild(announcement);
                }
            } catch (error) {
                console.error('Error removing announcement element:', error);
            }
        }, 1000);
    } catch (error) {
        console.error('Error creating screen reader announcement:', error);
    }
}

// Smooth scroll for anchor links
function smoothScrollTo(target) {
    try {
        if (!target || typeof target !== 'string') {
            console.warn('Invalid target for smooth scroll:', target);
            return;
        }

        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            console.warn('Element not found for smooth scroll target:', target);
        }
    } catch (error) {
        console.error('Error performing smooth scroll:', error);
    }
}

// Initiative card toggle functionality
function toggleInitiative(headerElement, event) {
    try {
        // Prevent any default behavior
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        // Find the parent card
        const card = headerElement.closest('.initiative-card');
        if (!card) {
            console.error('Could not find initiative card');
            return;
        }

        // Find the content and toggle elements
        const content = card.querySelector('.initiative-content');
        const toggle = headerElement.querySelector('.initiative-toggle');

        if (!content || !toggle) {
            console.error('Could not find required elements in card');
            return;
        }

        // Toggle the expanded class
        const isExpanded = card.classList.contains('expanded');

        if (isExpanded) {
            card.classList.remove('expanded');
        } else {
            card.classList.add('expanded');
        }

        // Force a reflow to ensure the transition works properly
        card.offsetHeight;

        console.log(`Toggled card: ${isExpanded ? 'collapsed' : 'expanded'}`);
    } catch (error) {
        console.error('Error toggling initiative card:', error);
    }
}

// Console greeting
console.log('%cWelcome to the Concord of Unity', 'color: #daa520; font-size: 16px; font-weight: bold;');
