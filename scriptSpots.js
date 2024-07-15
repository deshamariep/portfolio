(function(){
    'use strict';
    console.log('running js');

    document.addEventListener("DOMContentLoaded", function() {
        const waitElement = document.getElementById('wait');
        const segments = waitElement.querySelectorAll("div");
    
        const windowHeight = window.innerHeight;
        const offset = -50; // Adjust offset as needed
    
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.bottom <= windowHeight + offset
            );
        }
    
        function handleScroll() {
            segments.forEach((segment, index) => {
                const svg = segment.querySelector("svg");
                if (isElementInViewport(segment)) {
                    svg.classList.add("animate");
                }
            });
        }
    
        window.addEventListener("scroll", handleScroll);
    });

    
    let slideIndex = 0; // Index of the current slide
    let timer; // Variable to hold the interval timer
    let isPlaying = true; // Flag to track whether slideshow is playing
    
    // Function to initialize the slideshow
    function initSlideshow() {
        showSlide(slideIndex); // Show the initial slide
        startSlideShow(); // Start the slideshow timer
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
        resetTimer(); // Reset the timer on manual slide change
    }
    
    // Function to start or pause the slideshow
    function togglePlayPause() {
        const playPauseButton = document.querySelector('.playPause');
        
        if (isPlaying) {
            clearInterval(timer); // Pause the slideshow
            playPauseButton.textContent = '⏵';
        } else {
            startSlideShow(); // Start the slideshow
            playPauseButton.textContent = '⏸';
        }
        
        isPlaying = !isPlaying; // Toggle the flag
    }
    
    // Function to start the slideshow timer
    function startSlideShow() {
        timer = setInterval(function() {
            slideIndex++;
            showSlide(slideIndex);
        }, 2500); // Change slide every 2.5 seconds (adjust as needed)
    }
    
    // Function to reset the timer
    function resetTimer() {
        clearInterval(timer); // Clear the existing timer
        startSlideShow(); // Restart the timer
    }
    
    // Initialize the slideshow when the page loads
    document.addEventListener('DOMContentLoaded', function() {
        initSlideshow();
        
        // Add event listeners to navigation buttons
        const prevButton = document.querySelector('.prev');
        const nextButton = document.querySelector('.next');
        const playPauseButton = document.querySelector('.playPause');
        
        prevButton.addEventListener('click', function() {
            changeSlide(-1);
        });
        
        nextButton.addEventListener('click', function() {
            changeSlide(1);
        });
        
        playPauseButton.addEventListener('click', function() {
            togglePlayPause();
        });
    });
    
}());