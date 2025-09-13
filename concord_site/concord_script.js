// Concord of Unity - Enemy Territory JavaScript

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
    
    // Enemy territory warning effects
    initializeEnemyWarnings();
    
    // Mobile navigation if present
    initializeMobileNav();
});

// Enemy territory warning system
function initializeEnemyWarnings() {
    // Pulsing warning banner
    const warningBanner = document.querySelector('.enemy-warning');
    if (warningBanner) {
        let pulseCount = 0;
        setInterval(() => {
            pulseCount++;
            if (pulseCount % 10 === 0) { // Every 10 seconds
                warningBanner.style.animation = 'warningPulse 0.5s ease-in-out 3';
                setTimeout(() => {
                    warningBanner.style.animation = 'warningPulse 2s ease-in-out infinite alternate';
                }, 1500);
            }
        }, 1000);
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

// Territory transition warnings
function showTerritoryWarning(destination) {
    const warning = document.createElement('div');
    warning.className = 'territory-warning-popup';
    
    // Create content container
    const warningContent = document.createElement('div');
    warningContent.className = 'warning-content';
    
    // Create header
    const header = document.createElement('h3');
    header.textContent = '⚠️ TERRITORY TRANSITION WARNING ⚠️';
    
    // Create description paragraph
    const description = document.createElement('p');
    description.textContent = 'You are about to leave Concord of Unity space and enter:';
    
    // Create destination paragraph with safe text content
    const destinationPara = document.createElement('p');
    const destinationStrong = document.createElement('strong');
    destinationStrong.textContent = destination; // Safe: uses textContent instead of innerHTML
    destinationPara.appendChild(destinationStrong);
    
    // Create buttons container
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'warning-buttons';
    
    const proceedBtn = document.createElement('button');
    proceedBtn.onclick = proceedToTerritory;
    proceedBtn.className = 'btn proceed-btn';
    proceedBtn.textContent = 'Proceed';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.onclick = cancelTransition;
    cancelBtn.className = 'btn cancel-btn';
    cancelBtn.textContent = 'Stay in Concord Space';
    
    buttonsDiv.appendChild(proceedBtn);
    buttonsDiv.appendChild(cancelBtn);
    
    // Assemble the content
    warningContent.appendChild(header);
    warningContent.appendChild(description);
    warningContent.appendChild(destinationPara);
    warningContent.appendChild(buttonsDiv);
    
    warning.appendChild(warningContent);
    
    warning.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const content = warning.querySelector('.warning-content');
    content.style.cssText = `
        background: linear-gradient(135deg, rgba(26, 26, 10, 0.95), rgba(42, 42, 10, 0.9));
        border: 3px solid #daa520;
        border-radius: 15px;
        padding: 2rem;
        text-align: center;
        max-width: 400px;
        color: #daa520;
    `;
    
    document.body.appendChild(warning);
}

// Global functions for territory warnings
window.proceedToTerritory = function() {
    const popup = document.querySelector('.territory-warning-popup');
    if (popup) {
        popup.remove();
    }
    // Proceed with navigation
};

window.cancelTransition = function() {
    const popup = document.querySelector('.territory-warning-popup');
    if (popup) {
        popup.remove();
    }
};

// Console warning for enemy territory
console.log('%c⚠️ ENEMY TERRITORY DETECTED ⚠️', 'color: #daa520; font-size: 16px; font-weight: bold;');
console.log('%cYou are now in Concord of Unity space. Proceed with caution.', 'color: #daa520; font-size: 12px;');