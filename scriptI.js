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
            const gstOffset = 1130;
            const umeOffset = 1730;

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
    
    document.addEventListener("DOMContentLoaded", function() {
        const titles = ["UX Research", "UI Design", "Visual Communication", "Product Design"];
        const titleElement = document.getElementById("titleChange");
        let currentIndex = 0;

        function changeTitle() {
            titleElement.textContent = titles[currentIndex];
            currentIndex = (currentIndex + 1) % titles.length; // Cycle through titles
        }

        // Initial call to change title
        changeTitle();

        // Set interval to change title every 3 seconds
        const intervalId = setInterval(changeTitle, 3000);

        // Stop interval when title reaches "Product Design"
        function stopInterval() {
            if (titleElement.textContent === "Product Design") {
                clearInterval(intervalId);
            }
        }

        // Check if title reaches "Product Design" on scroll
        window.addEventListener("scroll", stopInterval);
    });
}());