(function () {
  // Theme toggle with localStorage
  const root = document.documentElement;
  const key = "holonet-theme";
  const btn = document.getElementById("themeToggle");
  const saved = localStorage.getItem(key);
  if (saved) root.setAttribute("data-theme", saved);
  btn?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem(key, next);
  });

  // Smooth anchor navigation
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    });
  });

  // Breadcrumbs update on section intersection
  const crumb = document.getElementById("crumbSection");
  const sections = document.querySelectorAll("main section");
  const idToName = {
    "council": "Council",
    "diplomatic-corps": "Diplomatic Corps",
    "peace-keepers": "Peace Keepers",
    "charters": "Charters"
  };
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        crumb.textContent = idToName[id] || "Overview";
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 });
  sections.forEach(s => io.observe(s));

  // Minimal table renderer
  function renderTable(el, rows) {
    if (!rows || !rows.length) { el.innerHTML = "<div class='empty'>No data.</div>"; return; }
    const keys = Object.keys(rows[0]);
    const thead = "<thead><tr>" + keys.map(k => `<th>${k}</th>`).join("") + "</tr></thead>";
    const tbody = "<tbody>" + rows.map(r => "<tr>" + keys.map(k => `<td>${r[k] ?? ""}</td>`).join("") + "</tr>").join("") + "</tbody>";
    el.innerHTML = `<table>${thead}${tbody}</table>`;
  }

  // Fetch and render rosters
  fetch("data/diplomatic_roster.json").then(r => r.json()).then(d => {
    renderTable(document.getElementById("diplomaticRoster"), d);
  }).catch(() => {
    document.getElementById("diplomaticRoster").innerHTML = "<div class='empty'>Unable to load diplomatic roster data.</div>";
  });
  fetch("data/peacekeepers_roster.json").then(r => r.json()).then(d => {
    renderTable(document.getElementById("peaceRoster"), d);
  }).catch(() => {
    document.getElementById("peaceRoster").innerHTML = "<div class='empty'>Unable to load peacekeepers roster data.</div>";
  });

  // Inline MD previews (simple, no markdown parsing—preformatted quick view)
  function mdPreview(id, path) {
    fetch(path).then(r => r.text()).then(t => {
      document.getElementById(id).textContent = t;
    }).catch(() => {
      document.getElementById(id).textContent = "Failed to load charter content.";
    });
  }
  mdPreview("md-council", "data/Unity_Council_Charter.md");
  mdPreview("md-corps",   "data/Diplomatic_Corps_Charter.md");
  mdPreview("md-peace",   "data/Peace_Keepers_Charter.md");
})();
