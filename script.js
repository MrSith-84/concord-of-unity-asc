// script.js

// Page Transition System
class TransitionManager {
  constructor() {
    this.overlay = document.getElementById('transitionOverlay');
    this.message = document.getElementById('transitionMessage');
    this.status = document.getElementById('transitionStatus');
    this.isTransitioning = false;
    
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
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    
    // Randomize messages for variety
    this.message.textContent = this.messages[Math.floor(Math.random() * this.messages.length)];
    this.status.textContent = this.statusMessages[Math.floor(Math.random() * this.statusMessages.length)];
    
    this.overlay.classList.add('active');
  }
  
  hide() {
    setTimeout(() => {
      this.overlay.classList.remove('active');
      this.isTransitioning = false;
    }, 2200); // Match animation duration
  }
  
  transition(url) {
    this.show();
    setTimeout(() => {
      window.location.href = url;
    }, 2000);
  }
}

// Initialize transition manager
const transitionManager = new TransitionManager();

// Add transition to all internal links
function addTransitionToLinks() {
  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    const href = link.getAttribute('href');
    // Only add transitions to internal links (not external or auth links)
    if (href && !href.startsWith('http') && !href.startsWith('/access') && !href.startsWith('/logout') && !href.includes('google')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        transitionManager.transition(href);
      });
    }
  });
}

// Authentication functionality
async function checkAuthStatus() {
  try {
    const response = await fetch('/api/user');
    const data = await response.json();
    
    const authLoading = document.getElementById('authLoading');
    const authLogin = document.getElementById('authLogin');
    const authUser = document.getElementById('authUser');
    
    authLoading.style.display = 'none';
    
    if (data.authenticated) {
      // User is logged in
      document.getElementById('userName').textContent = data.user.name;
      if (data.user.picture) {
        document.getElementById('userAvatar').src = data.user.picture;
      } else {
        document.getElementById('userAvatar').style.display = 'none';
      }
      authUser.style.display = 'flex';
      authLogin.style.display = 'none';
    } else {
      // User is not logged in
      authLogin.style.display = 'block';
      authUser.style.display = 'none';
    }
  } catch (error) {
    console.error('Auth check failed:', error);
    // Show login on error
    document.getElementById('authLoading').style.display = 'none';
    document.getElementById('authLogin').style.display = 'block';
  }
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

// Dynamic Breadcrumbs
document.addEventListener("DOMContentLoaded", () => {
  // Check authentication status
  checkAuthStatus();
  
  // Initialize page transitions
  addTransitionToLinks();
  
  // Initialize tabs if they exist on this page
  initializeTabs();
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
        const name = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = name.includes(term) ? "block" : "none";
      });
    });
  }
});
