(function(){
    'use strict';
    console.log("reading js");


    // document.addEventListener("DOMContentLoaded", function() {
    //     const segments = document.querySelectorAll(".data > div");
    //     const windowHeight = window.innerHeight;
    //     const offset = -1000; // Adjust offset as needed
    
    //     function isElementInViewport(el) {
    //         const rect = el.getBoundingClientRect();
    //         return (
    //             rect.top >= offset &&
    //             rect.bottom <= windowHeight
    //         );
    //     }
    
    //     function handleScroll() {
    //         segments.forEach((segment, index) => {
    //             const svg = segment.querySelector("svg");
    //             if (svg) { // Check if svg element exists before manipulating classList
    //                 if (isElementInViewport(segment)) {
    //                     svg.classList.add("animate");
    //                     window.removeEventListener("scroll", handleScroll);
    //                 }
    //             }
    //         });
    //     }
    
    //     window.addEventListener("scroll", handleScroll);
    // });

    document.addEventListener("DOMContentLoaded", function() {
        const segments = document.querySelectorAll(".data > div");
        const windowHeight = window.innerHeight;
    
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= windowHeight && // Check if top of element is within viewport
                rect.bottom >= 0 // Check if bottom of element is above or at the top of viewport
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

    document.addEventListener("DOMContentLoaded", function() {
        const scrollThreshold = 50; // Pixels scrolled down to trigger the jump
        const jumpPosition = 800; // Pixels to jump to
    
        let allowNormalScroll = false;
    
        window.addEventListener("scroll", function() {
            if (!allowNormalScroll && window.scrollY >= scrollThreshold) {
                window.scrollTo({
                    top: jumpPosition,
                    behavior: "auto" 
                });
    
                // Allow normal scroll after the jump
                allowNormalScroll = true;
            } else if (allowNormalScroll && window.scrollY < jumpPosition) {
                // Restrict scrolling back above the jump position
                window.scrollTo({
                    top: 0,
                    behavior: "auto" 
                });
    
                // Prevent further normal scrolling above jump position
                allowNormalScroll = false;
            }
        });
    });
}());