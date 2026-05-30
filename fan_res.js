// ================= MENU (dropdown) =================
function toggleMenu(element, event) {
    event.stopPropagation();

    const isOpen = element.classList.contains("active");

    // hamma dropdownni yopadi
    document.querySelectorAll(".menu-item").forEach(item => {
        item.classList.remove("active");
    });

    // agar yopiq bo‘lsa ochadi
    if (!isOpen) {
        element.classList.add("active");
    }
}

// ================= OUTSIDE CLICK =================
document.addEventListener("click", function (e) {

    const isNavbar = e.target.closest(".navbar");
    const isMenuItem = e.target.closest(".menu-item");

    // dropdown yopish
    if (!isMenuItem) {
        document.querySelectorAll(".menu-item").forEach(item => {
            item.classList.remove("active");
        });
    }

    // mobile menu yopish
    if (!isNavbar) {
        const menu = document.querySelector(".menu");
        const toggle = document.querySelector(".menu-toggle");

        if (menu && toggle) {
            menu.classList.remove("active");
            toggle.classList.remove("active");
        }

        // 🔥 dropdownni majbur yopadi
        document.querySelectorAll(".menu-item").forEach(item => {
            item.classList.remove("active");
        });
    }
});

// ================= FILE SIZE =================
const fileSizes = document.querySelectorAll(".file-size");

if (fileSizes.length > 0) {
    fileSizes.forEach(el => {

        const file = el.dataset.file;

        if (!file) {
            el.textContent = "(no file)";
            return;
        }

        fetch(file)
            .then(res => {
                const sizeHeader = res.headers.get("content-length");

                if (!sizeHeader) {
                    el.textContent = "(unknown)";
                    return;
                }

                let size = sizeHeader / 1024;

                if (size > 1024) {
                    size = (size / 1024).toFixed(2) + " MB";
                } else {
                    size = size.toFixed(0) + " KB";
                }

                el.textContent = `(${size})`;
            })
            .catch(() => {
                el.textContent = "(error)";
            });

    });
}
// active
const links = document.querySelectorAll(".menu a");

links.forEach(link => {
    const href = link.getAttribute("href");

    if (window.location.pathname.includes(href)) {
        link.classList.add("active");

        // agar dropdown ichida bo‘lsa
        const parent = link.closest(".menu-item");
        if (parent) {
            parent.classList.add("active");
        }
    }
});