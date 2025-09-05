// script.js

// Dynamic Breadcrumbs
document.addEventListener("DOMContentLoaded", () => {
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
