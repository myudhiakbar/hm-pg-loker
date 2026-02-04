document.getElementById("year").textContent = new Date().getFullYear();

    // Dark Mode
    const toggleBtn = document.getElementById("darkToggle");
    const body = document.body;
    if (localStorage.getItem("darkMode") === "true") {
        body.classList.add("dark");
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
    toggleBtn.addEventListener("click", () => {
        body.classList.toggle("dark");
        const isDark = body.classList.contains("dark");
        localStorage.setItem("darkMode", isDark);
        toggleBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // === Ambil data dari GAS ===
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyqJ4u8maNKM97iqKl511Q9K8pY5_SnJQajA6Gtt7I6-RrZfq2ZT79zbmYsmYT8Sq28/exec?site=B"; // ganti dengan URL Web App kamu

    fetch(WEB_APP_URL)
    .then(response => response.json())
    .then(data => renderLinks(data))
    .catch(err => {
        document.getElementById("linksContainer").textContent = "Gagal memuat data.";
        console.error("Error:", err);
    });

    function renderLinks(links) {
        const container = document.getElementById("linksContainer");
        container.innerHTML = "";
        
        const validLinks = links.filter(link =>
            link.url && link.url.trim() !== "" &&
            link.label && link.label.trim() !== ""
        );

        if (validLinks.length === 0) {
            container.textContent = "Tidak ada data link untuk ditampilkan.";
            return;
        }

    // Render hanya link yang valid
    validLinks.forEach(link => {
        const a = document.createElement("a");
        a.href = link.url;
        a.className = `btn ${link.color || "btn-default"}`;
        a.innerHTML = `
        ${link.icon ? `<i class="${link.icon}"></i>` : ""}
        ${link.label}
        `;
        a.target = "_blank";
        container.appendChild(a);
    });
    }