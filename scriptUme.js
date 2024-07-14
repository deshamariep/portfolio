(function(){
    'use strict';
    console.log("reading js");

    document.addEventListener("DOMContentLoaded", function() {
        const scrollThreshold = 50; // Pixels scrolled down to trigger the jump
        const jumpPosition = 800; // Pixels to jump to
    
        let allowNormalScroll = false;
        let isScrolling = false; // Flag to track if a scroll event is currently being processed
    
        window.addEventListener("scroll", function() {
            if (!isScrolling) {
                // Set the flag to true to indicate that a scroll event is being processed
                isScrolling = true;
    
                if (!allowNormalScroll && window.scrollY >= scrollThreshold) {
                    // Jump to the desired position
                    window.scrollTo({
                        top: jumpPosition,
                        behavior: "smooth"
                    });
    
                    // Allow normal scroll after the jump
                    allowNormalScroll = true;
                } else if (allowNormalScroll && window.scrollY < jumpPosition) {
                    // Prevent scrolling back above the jump position
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
    
                    // Prevent further normal scrolling above jump position
                    allowNormalScroll = false;
                }
    
                // Reset the flag after a short delay to avoid rapid scroll event processing
                setTimeout(function() {
                    isScrolling = false;
                }, 100); // Adjust the delay as needed to fit your application
            }
        });
    });

    document.addEventListener("DOMContentLoaded", function() {
        const segments = document.querySelectorAll(".data > div");
        const windowHeight = window.innerHeight;
        const offset = -1000; // Adjust offset as needed
    
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= offset &&
                rect.bottom <= windowHeight
            );
        }
    
        function handleScroll() {
            segments.forEach((segment, index) => {
                const svg = segment.querySelector("svg");
                if (svg) { // Check if svg element exists before manipulating classList
                    if (isElementInViewport(segment)) {
                        svg.classList.add("animate");
                        window.removeEventListener("scroll", handleScroll);
                    }
                }
            });
        }
    
        window.addEventListener("scroll", handleScroll);
    });
}());