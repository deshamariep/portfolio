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
    //             const cusSeg = document.getElementById('wait');
    //             const svg = segment.querySelector("svg");
    //             if (cusSeg) { // Check if svg element exists before manipulating classList
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
        const waitContainer = document.getElementById('wait');
        const svgElements = waitContainer.querySelectorAll("svg");
    
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            );
        }
    
        function handleScroll() {
            if (isElementInViewport(waitContainer)) {
                svgElements.forEach(svg => {
                    svg.classList.add("animate");
                });
                window.removeEventListener("scroll", handleScroll);
            }
        }
    
        window.addEventListener("scroll", handleScroll);
    });
}());