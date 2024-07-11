(function(){
    'use strict'
    console.log("reading js");

    document.addEventListener("DOMContentLoaded", function() {
        const caseStudySpots = document.getElementById("caseStudySpots");
        const caseStudyGst = document.getElementById("caseStudyGst");
        const caseStudyUme = document.getElementById("caseStudyUme");
    
        function handleScroll() {
            let scrollPosition = window.scrollY;
    
            if (scrollPosition >= 450) {
                caseStudySpots.classList.add("active-case-study");
            } else {
                caseStudySpots.classList.remove("active-case-study");
            }
    
            if (scrollPosition >= 1250) {
                caseStudyGst.classList.add("active-case-study");
            } else {
                caseStudyGst.classList.remove("active-case-study");
            }
    
            if (scrollPosition >= 2050) {
                caseStudyUme.classList.add("active-case-study");
            } else {
                caseStudyUme.classList.remove("active-case-study");
            }
        }
    
        // Initial check on page load
        handleScroll();
    
        // Listen for scroll events
        window.addEventListener("scroll", handleScroll);
    });
}());