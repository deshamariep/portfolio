let slideIndex = 0; // Index of the current slide

// Function to initialize the slideshow
function initSlideshow() {
    showSlide(slideIndex); // Show the initial slide
}

// Function to display a specific slide
function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    
    // Ensure index wraps around within the range of slides
    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    }
    
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show the slide at the specified index
    slides[slideIndex].classList.add('active');
}

// Function to change slide based on direction (1 for next, -1 for previous)
function changeSlide(direction) {
    slideIndex += direction;
    showSlide(slideIndex);
}

// Initialize the slideshow when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initSlideshow();
});