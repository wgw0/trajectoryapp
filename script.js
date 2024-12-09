document.addEventListener("DOMContentLoaded", () => {
    // Cache page sections
    const pages = {
        home: document.getElementById("homePage"),
        careerAI: document.getElementById("careerAIPage"),
        certifications: document.getElementById("certificationsPage"),
        training: document.getElementById("trainingPage"),
        profile: document.getElementById("profilePage"),
    };

    // Cache navigation links
    const navLinks = document.querySelectorAll(".nav-link");

    // Helper function to show the selected page and hide others
    function showPage(pageId) {
        Object.keys(pages).forEach((key) => {
            if (key === pageId) {
                pages[key].classList.remove("hidden");
            } else {
                pages[key].classList.add("hidden");
            }
        });

        // Update active class on navigation links
        navLinks.forEach((link) => {
            if (link.id === `nav${pageId.charAt(0).toUpperCase() + pageId.slice(1)}`) {
                link.classList.add("nav-active");
            } else {
                link.classList.remove("nav-active");
            }
        });
    }

    // Add click event listeners to navigation links
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const pageId = link.id.replace("nav", "").toLowerCase();
            showPage(pageId);
        });
    });

    // Show the home page by default on load
    showPage("home");
});


