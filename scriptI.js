(function(){
    'use strict';
    console.log("reading js");

    document.addEventListener("DOMContentLoaded", function() {
        const caseStudySpots = document.getElementById("caseStudySpots");
        const caseStudyGst = document.getElementById("caseStudyGst");
        const caseStudyUme = document.getElementById("caseStudyUme");

        function handleScroll() {
            let scrollPosition = window.scrollY;
            const spotsOffset = 450;
            const gstOffset = 1250;
            const umeOffset = 2050;

            // Reset all case studies to their normal state
            caseStudySpots.classList.remove("active-case-study");
            caseStudyGst.classList.remove("active-case-study");
            caseStudyUme.classList.remove("active-case-study");

            // Determine which case study to activate based on scroll position
            if (scrollPosition >= spotsOffset && scrollPosition < gstOffset) {
                caseStudySpots.classList.add("active-case-study");
            } else if (scrollPosition >= gstOffset && scrollPosition < umeOffset) {
                caseStudyGst.classList.add("active-case-study");
            } else if (scrollPosition >= umeOffset) {
                caseStudyUme.classList.add("active-case-study");
            }
        }

        // Initial check on page load
        handleScroll();

        // Listen for scroll events
        window.addEventListener("scroll", handleScroll);
    });
}());