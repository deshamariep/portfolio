(function(){
    'use strict';
    console.log("reading js");

    const topBG = document.getElementById('topBG');
    document.addEventListener("DOMContentLoaded", function() {
        const scrollThreshold = 50; // Pixels scrolled down to trigger the jump
        const jumpPosition = 800; // Pixels to jump to

        window.addEventListener('scroll', function() {
            // Calculate the scroll percentage
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

            // Calculate the new background position
            const newBackgroundPosition = `center ${scrollPercentage}%`;

            // Set the background position dynamically
            topBG.style.backgroundPositionY = newBackgroundPosition;
            window.addEventListener("scroll", function() {
                if (window.scrollY >= scrollThreshold) {
                    window.scrollTo({
                        top: jumpPosition,
                        behavior: "smooth" // Smooth scrolling to the jump position
                    });

                    // Optional: Remove the event listener after triggering the jump
                    window.removeEventListener("scroll", arguments.callee);
                }
            });
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