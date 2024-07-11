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
    (function(){
        'use strict';
    
        document.addEventListener("DOMContentLoaded", function() {
            const titles = ["UX Research", "UI Design", "Visual Communication", "Product Design"];
            const titleElement = document.getElementById("titleChange");
            let currentIndex = 0;
    
            function changeTitle() {
                // Animate the current title moving up
                titleElement.style.transform = "translateY(-100%)";
    
                setTimeout(() => {
                    // Change the title content
                    titleElement.textContent = titles[currentIndex];
    
                    // Reset transform to animate back to original position
                    titleElement.style.transform = "translateY(0)";
                }, 500); // Ensure this matches the transition duration in CSS
    
                // Update currentIndex for the next title
                currentIndex = (currentIndex + 1) % titles.length;
            }
    
            // Call changeTitle initially
            changeTitle();
    
            // Set interval to change title every 3 seconds (adjust as needed)
            setInterval(changeTitle, 3000); // Change every 3 seconds
        });
    }());
}());