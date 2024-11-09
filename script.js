// Toggle hamburger menu
document.getElementById('hamburger-menu').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav-links').classList.toggle('active');
});

// Handle section switching between Academic and Extracurricular
function showSection(section) {
    const academicSection = document.getElementById("academic-section");
    const extracurricularSection = document.getElementById("extracurricular-section");
    const academicBtn = document.getElementById("academic-btn");
    const extracurricularBtn = document.getElementById("extracurricular-btn");

    // Hide both sections and show the selected one
    academicSection.classList.toggle("hidden", section !== "academic");
    extracurricularSection.classList.toggle("hidden", section !== "extracurricular");

    // Update active tab button styling
    academicBtn.classList.toggle("active-tab", section === "academic");
    extracurricularBtn.classList.toggle("active-tab", section === "extracurricular");
}

// Carousel scroll functionality for experience section
document.querySelectorAll('.scroll-arrow').forEach(button => {
    button.addEventListener('click', function () {
        const activeSection = document.querySelector('.experience-section:not(.hidden)');
        const container = activeSection.querySelector('.carousel-container');
        const scrollAmount = button.id === 'scroll-left' ? -350 : 350;

        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
});

// Drop-in animation for About Me section
document.addEventListener("DOMContentLoaded", function() {
    const aboutSection = document.querySelector("#about p");
    if (aboutSection) {
        let index = 0;
        aboutSection.innerHTML = aboutSection.innerHTML.replace(/([^<>\s])(?=[^<>]*(<|$))/g, (letter) => {
            return `<span class="animated-letter" style="animation-delay: ${index++ * 0.05}s">${letter}</span>`;
        });
    }
});

// Filter Projects by Category
function filterProjects(category, event) {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach((project) => {
        // If category is 'all' or the project matches the selected category
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });

    // Update the active filter button
    document.querySelectorAll('.filter-btn').forEach((btn) => {
        btn.classList.remove('active-filter');
    });
    if (event) {
        event.target.classList.add('active-filter');
    }
}

// Optional contact form hover functionality for About Me section
const contactForm = document.querySelector('.contact-form');
const aboutMe = document.querySelector('.about-me');

if (contactForm && aboutMe) {
    contactForm.addEventListener('mouseenter', () => {
        contactForm.classList.add('show');
        aboutMe.classList.add('show');
    });

    contactForm.addEventListener('mouseleave', () => {
        setTimeout(() => {
            contactForm.classList.remove('show');
            aboutMe.classList.remove('show');
        }, 2000); // Adjust delay as needed
    });

    document.addEventListener('click', (event) => {
        if (!contactForm.contains(event.target) && !aboutMe.contains(event.target)) {
            contactForm.classList.remove('show');
            aboutMe.classList.remove('show');
        }
    });
}

// Contact form submission and reset functionality
// Get the form and thank you message popup
const form = document.getElementById('contact-form');
const thankYouMessage = document.getElementById('thank-you-message');
const closePopupButton = document.getElementById('close-popup');

// Submit form handler
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent actual form submission

    // Send the form data to Formspree
    fetch("https://formspree.io/f/mqakbzod", {
        method: "POST",
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            displayThankYouPopup();
            form.reset(); // Reset form fields
        } else {
            alert("There was an issue submitting the form. Please try again.");
        }
    }).catch(error => {
        alert("There was an error: " + error.message);
    });
});

// Function to display the thank-you popup
function displayThankYouPopup() {
    document.getElementById("form-container").style.display = 'none';
    thankYouMessage.style.display = 'flex';
}

// Close the popup when the "Close" button is clicked
closePopupButton.addEventListener('click', function() {
    thankYouMessage.style.display = 'none';
    document.getElementById('form-container').style.display = 'block';
});