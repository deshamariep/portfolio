(function(){
    'use strict';
    console.log("reading js");


    document.addEventListener("DOMContentLoaded", function() {
        const segments = document.querySelectorAll(".data > div");
        const windowHeight = window.innerHeight;
        const offset = -500; // Adjust this value to change the trigger point
    
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= -offset &&  // Adjusted to include an offset
                rect.bottom <= windowHeight
            );
        }
    
        function handleScroll() {
            segments.forEach((segment, index) => {
                const svg = segment.querySelector("svg");
                if (isElementInViewport(segment)) {
                    svg.classList.add("animate");
                    window.removeEventListener("scroll", handleScroll); // Remove scroll listener once animation is triggered
                }
            });
        }
    
        window.addEventListener("scroll", handleScroll);
    });
}());