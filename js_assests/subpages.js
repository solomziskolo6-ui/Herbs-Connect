// HERBS CONNECT - SUBPAGES JAVASCRIPT

document.addEventListener("DOMContentLoaded", function () {

    // 1. Highlight the current page in the navigation menu
    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll("header nav ul a").forEach(function (link) {
        if (link.getAttribute("href") === currentPage) {
            link.setAttribute("aria-current", "page");
        }
    });

    // 2. Create a Back to Top button
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

    window.addEventListener("scroll", function () {
        backToTop.style.display =
            window.scrollY > 300 ? "block" : "none";
    });

    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // 3. Automatically select the product being enquired about
    const productSelect = document.getElementById("product");

    if (productSelect) {
        const selectedProduct =
            new URLSearchParams(window.location.search).get("product");

        if (selectedProduct) {
            productSelect.value = selectedProduct;
        }
    }

    // 4. Connect each product enquiry link to the correct product
    if (currentPage === "products.html") {
        document.querySelectorAll("main article").forEach(function (article) {

            const heading = article.querySelector("h3");
            if (!heading) return;

            const productName = heading.textContent.trim().toLowerCase();

            let productCategory = "";

            if (productName.includes("tea") ||
                productName.includes("rooibos")) {
                productCategory = "herbal-tea";
            } else if (productName.includes("dried") ||
                       productName.includes("moringa") ||
                       productName.includes("mint")) {
                productCategory = "dried-herbs";
            } else if (productName.includes("balm")) {
                productCategory = "herbal-balms";
            } else if (productName.includes("bath")) {
                productCategory = "herbal-bath-blend";
            }

            article.querySelectorAll('a[href="enquiry.html"]').forEach(
                function (link) {
                    if (productCategory) {
                        link.href = "enquiry.html?product=" +
                            encodeURIComponent(productCategory);
                    }
                }
            );
        });
    }

    // 5. Validate and handle the enquiry form
    const enquiryForm = document.querySelector("form");

    if (enquiryForm && productSelect) {

        // Add an accessible area for feedback
        const feedback = document.createElement("p");
        feedback.setAttribute("role", "status");
        feedback.setAttribute("aria-live", "polite");
        enquiryForm.appendChild(feedback);

        enquiryForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const message = document.getElementById("message");

            // Check that required fields are completed
            if (!enquiryForm.checkValidity()) {
                enquiryForm.reportValidity();
                return;
            }

            // Prevent blank spaces from being accepted as answers
            if (!name.value.trim() || !message.value.trim()) {
                feedback.textContent =
                    "Please enter your name and enquiry message.";
                feedback.style.color = "#b00020";
                return;
            }

            // Display a confirmation for this front-end demonstration
            feedback.textContent =
                "Thank you, " + name.value.trim() +
                ". Your enquiry form is complete. " +
                "This demo does not send enquiries to a business yet.";

            feedback.style.color = "#284b36";

            console.log("Enquiry form validated:", {
                name: name.value.trim(),
                email: email.value.trim(),
                phone: document.getElementById("phone").value.trim(),
                product: productSelect.value,
                message: message.value.trim()
            });
        });

        // Clear the feedback when the form is reset
        enquiryForm.addEventListener("reset", function () {
            feedback.textContent = "";
        });
    }

});