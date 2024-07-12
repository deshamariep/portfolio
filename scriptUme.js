(function(){
    'use strict';
    console.log("reading js");

    document.addEventListener("DOMContentLoaded", function() {
        const arrow = document.getElementById("arrow");
        let moveDirection = 1; // 1 for down, -1 for up
        let currentPosition = 0; // Current position relative to initial position

        function moveArrow() {
            // Adjust position by 5px up or down
            currentPosition += 5 * moveDirection;
            arrow.style.transform = `translateY(${currentPosition}px)`;

            // Reverse direction when reaching bounds
            if (currentPosition <= -5 || currentPosition >= 5) {
                moveDirection *= -1;
            }
        }

        // Move arrow every 300 milliseconds
        setInterval(moveArrow, 300);
    });

    document.addEventListener("DOMContentLoaded", function() {
        const circles = document.querySelectorAll('.segmentation-circle');

        // Options for the IntersectionObserver
        const options = {
            threshold: 0.5 // Trigger animation when 50% of the circle is visible
        };

        // IntersectionObserver callback function
        const callback = function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const circleId = entry.target.getAttribute('data-id');
                    const circle = document.getElementById(circleId);

                    // Trigger animation based on circle id
                    switch (circleId) {
                        case 'sOne':
                            circle.style.animation = 'sOne 2s linear forwards';
                            break;
                        case 'sTwo':
                            circle.style.animation = 'sTwo 2s linear forwards';
                            break;
                        case 'sThree':
                            circle.style.animation = 'sThree 2s linear forwards';
                            break;
                        case 'sFour':
                            circle.style.animation = 'sFour 2s linear forwards';
                            break;
                        default:
                            break;
                    }

                    // Unobserve the target after animation starts to save resources
                    observer.unobserve(entry.target);
                }
            });
        };

        // Create a new IntersectionObserver
        const observer = new IntersectionObserver(callback, options);

        // Observe each circle
        circles.forEach(circle => {
            observer.observe(circle);
        });
    });
}());