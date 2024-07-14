(function(){
    'use strict';
    console.log("reading js");


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

    // document.addEventListener("DOMContentLoaded", function() {
    //     const scrollThreshold = 50; // Pixels scrolled down to trigger the jump
    //     const jumpPosition = 800; // Pixels to jump to
    
    //     let allowNormalScroll = false;
    
    //     window.addEventListener("scroll", function() {
    //         if (!allowNormalScroll && window.scrollY >= scrollThreshold) {
    //             window.scrollTo({
    //                 top: jumpPosition,
    //                 behavior: "smooth" 
    //             });
    
    //             // Allow normal scroll after the jump
    //             allowNormalScroll = true;
    //         } else if (allowNormalScroll && window.scrollY < jumpPosition) {
    //             // Restrict scrolling back above the jump position
    //             window.scrollTo({
    //                 top: 0,
    //                 behavior: "smooth" 
    //             });
    
    //             // Prevent further normal scrolling above jump position
    //             allowNormalScroll = false;
    //         }
    //     });
    // });

    document.addEventListener("DOMContentLoaded", function() {
        const scrollThreshold = 50; // Pixels scrolled down to trigger the jump
        const jumpPosition = 800; // Pixels to jump to
    
        let allowNormalScroll = false;
        let lastScrollY = window.scrollY;
    
        window.addEventListener("scroll", function() {
            const currentScrollY = window.scrollY;
    
            if (!allowNormalScroll && currentScrollY >= scrollThreshold) {
                // Jump to the desired position
                window.scrollTo({
                    top: jumpPosition,
                    behavior: "smooth"
                });
    
                // Allow normal scroll after the jump
                allowNormalScroll = true;
            } else if (allowNormalScroll && currentScrollY < jumpPosition) {
                // Prevent scrolling back above the jump position
                if (currentScrollY !== lastScrollY) {
                    window.scrollTo({
                        top: 0,
                        behavior: "auto" // Immediate jump to top
                    });
                }
    
                // Reset allowNormalScroll only when close to the jump position
                if (currentScrollY < jumpPosition - scrollThreshold) {
                    allowNormalScroll = false;
                }
            }
    
            // Update last scroll position
            lastScrollY = currentScrollY;
        });
    });
}());