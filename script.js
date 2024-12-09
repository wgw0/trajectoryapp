// Page Switching and Career AI Initialization
document.addEventListener("DOMContentLoaded", () => {
    // Navigation Handler for Page Switching
    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            // Remove active state from all links
            document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("nav-active"));

            // Add active state to clicked link
            e.target.classList.add("nav-active");

            // Hide all pages
            const pages = ["homePage", "careeraiPage", "certificationsPage", "trainingPage", "profilePage", "signupPage"];
            pages.forEach((pageId) => {
                const page = document.getElementById(pageId);
                if (page) page.classList.add("hidden");  // Hide page
            });

            // Show selected page
            const pageId = e.target.id.replace("nav", "").toLowerCase() + "Page";  // Construct the pageId
            const selectedPage = document.getElementById(pageId);
            if (selectedPage) selectedPage.classList.remove("hidden");  // Show the selected page
        });
    });

    // Initialize Career AI chatbot if Career AI page is shown
    function initializeCareerAI() {
        const chatMessages = document.getElementById("chatMessages");
        const userInput = document.getElementById("userInput");
        const sendButton = document.getElementById("sendButton");

        // Display user and bot messages in the chat container
        function displayMessage(sender, message) {
            const messageDiv = document.createElement("div");
            messageDiv.classList.add(
                "p-4",
                "rounded-xl",
                "max-w-[80%]",
                sender === "user" ? "bg-blue-100 ml-auto" : "bg-gray-100 mr-auto"
            );
            messageDiv.innerHTML = `
                <div class="text-sm font-medium text-gray-600 mb-1">
                    ${sender === "user" ? "You" : "Trajectory AI"}
                </div>
                ${message}
            `;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Simulate bot response (Replace with actual API call for AI model integration)
        async function generateAIResponse(userMessage) {
            displayMessage("ai", "Thinking...");
            try {
                // Example: Using an API endpoint (Replace with your model integration logic)
                const response = await fetch("http://localhost:5000/chat", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ message: userMessage }),
                });
                const data = await response.json();
                const botReply = data.reply || "I'm sorry, I didn't understand that.";
                displayMessage("ai", botReply);
            } catch (error) {
                displayMessage("ai", "An error occurred. Please try again later.");
            }
        }

        // Handle sending user message
        function handleUserMessage() {
            const message = userInput.value.trim();
            if (message) {
                displayMessage("user", message);
                generateAIResponse(message);
                userInput.value = "";
            }
        }

        // Add event listeners
        sendButton.addEventListener("click", handleUserMessage);
        userInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handleUserMessage();
        });
    }
});

// Function to toggle the sidebar menu
function toggleMenu() {
    const sidebar = document.getElementById('sidebarMenu');
    const isOpen = !sidebar.classList.contains('-translate-x-full');
    
    if (isOpen) {
        sidebar.classList.add('-translate-x-full');  // Slide the menu out of view
    } else {
        sidebar.classList.remove('-translate-x-full');  // Slide the menu into view
    }
}

// Function to navigate to a specific page
function navigateToPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('[id$="Page"]');
    pages.forEach(page => page.classList.add('hidden'));

    // Show the selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.remove('hidden');
    }
}

// Add event listeners to hamburger menu links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();  // Prevent default link behavior
        const pageId = this.getAttribute('href').substring(1);  // Get the pageId from href (e.g. #homePage becomes homePage)
        navigateToPage(pageId);  // Navigate to the page
    });
});

// Add event listeners to hamburger menu links for mobile version
document.querySelectorAll('.nav-link-mobile').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();  // Prevent default link behavior
        const pageId = this.getAttribute('href').substring(1);  // Get the pageId from href (e.g. #homePage becomes homePage)
        navigateToPage(pageId);  // Navigate to the page
        toggleMenu();  // Close the menu after selection
    });
});

// Add specific event listener for the Sign-Up link
document.querySelector("#navSignup").addEventListener("click", function (e) {
    e.preventDefault();
    navigateToPage("signupPage");  // Show the Sign-Up page when the button is clicked
});
