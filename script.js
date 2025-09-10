// script.js

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

// Dynamic Breadcrumbs
document.addEventListener("DOMContentLoaded", () => {
  // Check authentication status
  checkAuthStatus();
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
      breadcrumbNav.innerHTML += " › <span>Codex</span>";
    } else if (path.includes("factions")) {
      breadcrumbNav.innerHTML += " › <a href=\"/codex.html\">Codex</a>";

      const pageName = path[path.length - 1].replace(".html", "").replace("_", " ");
      breadcrumbNav.innerHTML += " › <span>" + pageName.replace(/\b\w/g, c => c.toUpperCase()) + "</span>";
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
