(function(){
    'use strict';
    console.log("reading js");


    document.addEventListener("DOMContentLoaded", function() {
        const svgOne = document.getElementById('sOne');
        const svgTwo = document.getElementById('sTwo');
        const svgThree = document.getElementById('sThree');
        const svgFour = document.getElementById('sFour');

        function handleScroll() {
            let scrollPosition = window.scrollY;
            
            if (scrollPosition >= 3600) {
                animateCircle(svgOne, 'sOne', '#GradientColor1', 420); // Adjust parameters as needed
                animateCircle(svgTwo, 'sTwo', '#GradientColor2', 434); // Adjust parameters as needed
                animateCircle(svgThree, 'sThree', '#GradientColor3', 293); // Adjust parameters as needed
                animateCircle(svgFour, 'sFour', '#GradientColor4', 274); // Adjust parameters as needed
            }
        }

        function animateCircle(svgElement, id, gradientId, strokeDashOffset) {
            svgElement.style.animation = `${id} 2s linear forwards`;
            svgElement.style.stroke = `url(${gradientId})`;
            svgElement.style.strokeDashoffset = strokeDashOffset;
        }

        // Initial check on page load
        handleScroll();

        // Listen for scroll events
        window.addEventListener("scroll", handleScroll);
    });
}());