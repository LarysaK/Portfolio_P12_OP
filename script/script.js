// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    let lastScrollTop = 0;

    window.addEventListener("scroll", () => {
        const top = window.scrollY;
        if (top >= 100) {
            if (!header.classList.contains("navbarDark")) {
                header.classList.add("navbarDark");
            }
        } else {
            if (header.classList.contains("navbarDark")) {
                header.classList.remove("navbarDark");
            }
        }
    });
}

// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() {
    const menuToggle = document.getElementById("navbarSupportedContent");
    const bsCollapse = new bootstrap.Collapse(menuToggle, {
        toggle: false
    });

    // Get all nav links
    const navLinks = document.querySelectorAll(".nav-link");
    
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            // Toggle collapse
            if (bsCollapse._isShown) {
                bsCollapse.hide();
            } else {
                bsCollapse.show();
            }
        });
    });
}

// Function to dynamically create HTML elements from the JSON file
function createSkillsFromJSON() {
    const container = document.querySelector("#skills .container");
    let row = document.createElement("div");
    row.classList.add("row");

    // Load the JSON file
    fetch("data/skills.json")
        .then((response) => response.json())
        .then((data) => {
            // Iterate through the JSON data and create HTML elements
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");
                card.innerHTML = `
                    <div class="card skillsText">
                        <div class="card-body">
                            <img src="./images/${item.image}" alt="${item.title || "No title available"}" />
                            <h3 class="card-title mt-3">${item.title || "No title available"}</h3>
                            <p class="card-text mt-3">${item.text || "No description available"}</p>
                        </div>
                    </div>
                `;

                // Append the card to the current row
                row.appendChild(card);

                // If the index is a multiple of 3 or it's the last element, create a new row
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        });
}

// Function to dynamically create HTML elements from the JSON file
function createPortfolioFromJSON() {
    const container = document.querySelector("#portfolio .container");
    if (!container) {
        console.error("Container for portfolio not found.");
        return;
    }

    let row = document.createElement("div");
    row.classList.add("row");

    // Load the JSON file
    fetch("data/portfolio.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            if (!Array.isArray(data)) {
                throw new Error('Invalid JSON format');
            }

            // Iterate through the JSON data and create HTML elements
            data.forEach((item, index) => {
                if (!item.image || !item.title || !item.text || !item.link) {
                    console.error("Invalid item data at index:", index);
                    return;
                }

                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");
                card.innerHTML = `
                    <div class="card portfolioContent">
                        <img class="card-img-top" src="images/${item.image}" style="width:100%" alt="${item.title}">
                        <div class="card-body">
                            <h4 class="card-title">${item.title}</h4>
                            <p class="card-text">${item.text}</p>
                            <div class="text-center">
                                <a href="${item.link}"  target="_blank" class="btn btn-success">Lien</a>
                            </div>
                        </div>
                    </div>
                `;

                // Append the card to the current row
                row.appendChild(card);

                // If the index is a multiple of 3 or it's the last element, create a new row
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        })
        .catch((error) => {
            console.error("Error fetching or processing data:", error);
        });
}

// Call the functions to execute the code
handleNavbarScroll();
handleNavbarCollapse();
createSkillsFromJSON();
createPortfolioFromJSON();
menuResponsiveClic();
