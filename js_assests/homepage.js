// HERBS CONNECT - HOMEPAGE JAVASCRIPT

document.addEventListener("DOMContentLoaded", function () {

    // Highlight current page in the navigation menu
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll("header nav ul a").forEach(function (link) {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.setAttribute("aria-current", "page");
        }
    });

    //  Create a Back to Top button
    const backToTop = document.createElement("button");

    backToTop.type = "button";
    backToTop.textContent = "↑ Back to Top";
    backToTop.setAttribute("aria-label", "Back to top of page");

    Object.assign(backToTop.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "12px 16px",
        backgroundColor: "#284b36",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        display: "none",
        zIndex: "1000"
    });

    document.body.appendChild(backToTop);

    // Show the button when the visitor scrolls down
    window.addEventListener("scroll", function () {
        backToTop.style.display =
            window.scrollY > 300 ? "block" : "none";
    });

    // Return to the top when clicked
    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

});