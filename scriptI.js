(function(){
    'use strict'
    console.log("reading js");

    document.addEventListener("DOMContentLoaded", function() {
        const caseStudies = document.querySelectorAll(".caseStudy");
    
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
    
        function handleScroll() {
            caseStudies.forEach(caseStudy => {
                if (isInViewport(caseStudy)) {
                    caseStudy.classList.add("active-case-study");
                } else {
                    caseStudy.classList.remove("active-case-study");
                }
            });
        }
    
        // Initial check on page load
        handleScroll();
    
        // Listen for scroll events
        window.addEventListener("scroll", handleScroll);
    });
}());