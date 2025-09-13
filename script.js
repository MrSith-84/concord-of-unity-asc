// script.js

// Page Transition System
class TransitionManager {
  constructor() {
    this.overlay = document.getElementById('transitionOverlay');
    this.message = document.getElementById('transitionMessage');
    this.status = document.getElementById('transitionStatus');
    this.isTransitioning = false;
    
    // Check if required elements exist
    this.hasRequiredElements = this.overlay && this.message && this.status;
    
    this.messages = [
      'Establishing link to data stream...',
      'Accessing faction networks...',
      'Decrypting classified data...',
      'Initializing secure connection...',
      'Synchronizing with command center...',
      'Loading faction intelligence...',
      'Authenticating access protocols...'
    ];
    
    this.statusMessages = [
      '// SECURE CONNECTION ESTABLISHED',
      '// DATA STREAM ACTIVE',
      '// NETWORK ACCESS GRANTED',
      '// ENCRYPTION PROTOCOL VERIFIED',
      '// FACTION DATABASE ONLINE'
    ];
  }
  
  show() {
    if (this.isTransitioning || !this.hasRequiredElements) return;
    this.isTransitioning = true;
    
    // Randomize messages for variety
    if (this.message) {
      this.message.textContent = this.messages[Math.floor(Math.random() * this.messages.length)];
    }
    if (this.status) {
      this.status.textContent = this.statusMessages[Math.floor(Math.random() * this.statusMessages.length)];
    }
    
    if (this.overlay) {
      this.overlay.classList.add('active');
    }
  }
  
  hide() {
    setTimeout(() => {
      if (this.overlay) {
        this.overlay.classList.remove('active', 'warning-transition');
      }
      this.isTransitioning = false;
    }, 2200); // Match animation duration
  }
  
  transition(url) {
    // Check if transitioning to Concord of Unity (enemy territory)
    if (url.includes('concord_unity')) {
      this.showConcordWarning();
    } else if (this.isReturningToConsortium(url)) {
      this.showReturnTransition();
    } else {
      this.show();
    }
    setTimeout(() => {
      window.location.href = url;
    }, 2000);
  }
  
  isReturningToConsortium(url) {
    // Check if we're currently on a Concord page and going back to consortium
    const currentPath = window.location.pathname;
    const isOnConcordPage = currentPath.includes('concord_unity') || currentPath.includes('intel_');
    const goingToConsortium = url.includes('index.html') || url.includes('factions/') && !url.includes('concord_unity') && !url.includes('intel_');
    return isOnConcordPage && goingToConsortium;
  }
  
  showReturnTransition() {
    if (this.isTransitioning || !this.hasRequiredElements) return;
    this.isTransitioning = true;
    
    // Special messages for returning to Consortium
    const returnMessages = [
      'Leaving enemy territory...',
      'Reconnecting to Consortium network...',
      'Establishing secure connection...',
      'Returning to allied systems...',
      'Re-entering protected space...'
    ];
    
    const returnStatus = [
      '// LEAVING CONCORD TERRITORY',
      '// CONSORTIUM NETWORK RECONNECTED', 
      '// SECURE CONNECTION RESTORED',
      '// RETURNING TO PROTECTED NETWORK',
      '// HOSTILE NETWORK DISCONNECTED'
    ];
    
    if (this.message) {
      this.message.textContent = returnMessages[Math.floor(Math.random() * returnMessages.length)];
    }
    if (this.status) {
      this.status.textContent = returnStatus[Math.floor(Math.random() * returnStatus.length)];
    }
    
    // Use regular transition styling (no warning class)
    if (this.overlay) {
      this.overlay.classList.add('active');
    }
  }
  
  showConcordWarning() {
    if (this.isTransitioning || !this.hasRequiredElements) return;
    this.isTransitioning = true;
    
    // Special warning messages for leaving Consortium network
    const warningMessages = [
      'WARNING: Leaving Consortium network...',
      'ALERT: Connecting to hostile territory...',
      'CAUTION: Entering enemy communications...',
      'DANGER: Breaching secured perimeter...',
      'NOTICE: Consortium protection ending...'
    ];
    
    const warningStatus = [
      '// CONSORTIUM NETWORK DISCONNECTED',
      '// ENTERING CONCORD TERRITORY',
      '// HOSTILE NETWORK DETECTED',
      '// SECURITY PROTOCOLS DISABLED',
      '// CONNECTION NOT SECURE'
    ];
    
    if (this.message) {
      this.message.textContent = warningMessages[Math.floor(Math.random() * warningMessages.length)];
    }
    if (this.status) {
      this.status.textContent = warningStatus[Math.floor(Math.random() * warningStatus.length)];
    }
    
    // Change overlay styling for warning
    if (this.overlay) {
      this.overlay.classList.add('active', 'warning-transition');
    }
  }
}

// Initialize transition manager
const transitionManager = new TransitionManager();

// Add transition to all internal links
function addTransitionToLinks() {
  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    const href = link.getAttribute('href');
    // Only add transitions to internal links (not external links)
    if (href && !href.startsWith('http')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        transitionManager.transition(href);
      });
    }
  });
}


// Tab functionality for faction pages
function initializeTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  if (tabButtons.length === 0) return; // No tabs on this page
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');
      
      // Remove active class from all buttons and panels
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));
      
      // Add active class to clicked button and corresponding panel
      button.classList.add('active');
      const targetPanel = document.getElementById(targetTab);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

// Mobile Navigation functionality
function initializeMobileNavigation() {
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileMenu = document.querySelector('.mobile-nav-menu');
  const mobileClose = document.querySelector('.mobile-close-button');
  const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
  
  // Only initialize if mobile elements exist
  if (mobileToggle && mobileMenu) {
    
    // Hamburger menu toggle
    function toggleMobileMenu() {
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    // Event listeners
    mobileToggle.addEventListener('click', toggleMobileMenu);
    
    if (mobileClose) {
      mobileClose.addEventListener('click', toggleMobileMenu);
    }
    
    // Close menu when clicking on menu links
    const mobileNavLinks = mobileMenu.querySelectorAll('.nav-link:not(.mobile-dropdown-toggle)');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMobileMenu();
      });
    });
    
    // Handle mobile dropdowns
    mobileDropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.mobile-dropdown-toggle');
      if (toggle) {
        toggle.addEventListener('click', (e) => {
          e.preventDefault();
          dropdown.classList.toggle('active');
        });
      }
    });
    
    // Close mobile menu on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        mobileMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  }
}

// Enhanced Tab functionality for mobile
function initializeTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  if (tabButtons.length === 0) return; // No tabs on this page
  
  tabButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      // Prevent default for mobile touch handling
      e.preventDefault();
      
      const targetTab = button.getAttribute('data-tab');
      
      // Remove active class from all buttons and panels
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));
      
      // Add active class to clicked button and corresponding panel
      button.classList.add('active');
      const targetPanel = document.getElementById(targetTab);
      if (targetPanel) {
        targetPanel.classList.add('active');
        
        // Smooth scroll to tab panel on mobile
        if (window.innerWidth <= 768) {
          targetPanel.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest' 
          });
        }
      }
    });
    
    // Add touch feedback for mobile
    if ('ontouchstart' in window) {
      button.addEventListener('touchstart', () => {
        button.style.transform = 'scale(0.95)';
      });
      
      button.addEventListener('touchend', () => {
        button.style.transform = '';
      });
    }
  });
}

// Improved mobile image loading
function optimizeImagesForMobile() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    // Add loading optimization
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    
    // Handle image load errors gracefully
    img.addEventListener('error', () => {
      img.style.display = 'none';
      console.warn('Failed to load image:', img.src);
    });
  });
}

// Dynamic Breadcrumbs
document.addEventListener("DOMContentLoaded", () => {
  // No authentication needed
  
  // Initialize page transitions
  addTransitionToLinks();
  
  // Initialize mobile navigation
  initializeMobileNavigation();
  
  // Initialize tabs if they exist on this page
  initializeTabs();
  
  // Optimize images for mobile
  optimizeImagesForMobile();
  const breadcrumbNav = document.querySelector(".breadcrumb");
  if (breadcrumbNav) {
    breadcrumbNav.innerHTML = ""; // Clear existing content
    const path = window.location.pathname.split("/").filter(Boolean);

    // Always start with Home
    const homeLink = document.createElement("a");
    homeLink.href = "/index.html";
    homeLink.textContent = "Home";
    breadcrumbNav.appendChild(homeLink);

    // If in factions or codex
    if (path.includes("codex.html")) {
      const separator1 = document.createTextNode(" › ");
      const codexSpan = document.createElement("span");
      codexSpan.textContent = "Codex";
      breadcrumbNav.appendChild(separator1);
      breadcrumbNav.appendChild(codexSpan);
    } else if (path.includes("factions")) {
      const separator1 = document.createTextNode(" › ");
      const codexLink = document.createElement("a");
      codexLink.href = "/codex.html";
      codexLink.textContent = "Codex";
      breadcrumbNav.appendChild(separator1);
      breadcrumbNav.appendChild(codexLink);

      const pageName = path[path.length - 1].replace(".html", "").replace("_", " ");
      const separator2 = document.createTextNode(" › ");
      const pageSpan = document.createElement("span");
      pageSpan.textContent = pageName.replace(/\b\w/g, c => c.toUpperCase());
      breadcrumbNav.appendChild(separator2);
      breadcrumbNav.appendChild(pageSpan);
    }
  }

  // Codex Search/Filter
  const searchInput = document.querySelector("#codexSearch");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      document.querySelectorAll(".faction-card").forEach(card => {
        const nameElement = card.querySelector("h3");
        if (nameElement) {
          const name = nameElement.textContent.toLowerCase();
          card.style.display = name.includes(term) ? "block" : "none";
        }
      });
    });
  }
});
