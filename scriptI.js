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

            caseStudySpots.classList.remove("active-case-study");
            caseStudyGst.classList.remove("active-case-study");
            caseStudyUme.classList.remove("active-case-study");

            if (scrollPosition >= spotsOffset && scrollPosition < gstOffset) {
                caseStudySpots.classList.add("active-case-study");
            } else if (scrollPosition >= gstOffset && scrollPosition < umeOffset) {
                caseStudyGst.classList.add("active-case-study");
            } else if (scrollPosition >= umeOffset) {
                caseStudyUme.classList.add("active-case-study");
            }
        }

        handleScroll();
        
        window.addEventListener("scroll", handleScroll);
    });
    
    document.addEventListener("DOMContentLoaded", function() {
        const titles = ["UX Researcher", "UI Designer", "Visual Communicator", "Product Designer"];
        const titleElement = document.getElementById("titleChange");
        let currentIndex = 0;

        function changeTitle() {
            titleElement.textContent = titles[currentIndex];
            currentIndex = (currentIndex + 1) % titles.length;
        }

        changeTitle();

        const intervalId = setInterval(changeTitle, 2000);

        function stopInterval() {
            if (titleElement.textContent === "Product Designer") {
                clearInterval(intervalId);
            }
        }

        window.addEventListener("scroll", stopInterval);
    });
}());