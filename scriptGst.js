(function(){
    'use strict';
    console.log("running js");

    document.addEventListener("DOMContentLoaded", function() {
        const waitElement = document.getElementById('wait');
        const segments = waitElement.querySelectorAll("div");
    
        const windowHeight = window.innerHeight;
        const offset = -75; // Adjust offset as needed
    
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= offset &&
                rect.top <= windowHeight
            );
        }
    
        function handleScroll() {
            segments.forEach((segment, index) => {
                const svg = segment.querySelector("svg");
                if (isElementInViewport(segment)) {
                    svg.classList.add("animate");
                    startStrokeAnimation(svg); // Start the stroke animation
                }
            });
        }
    
        function startStrokeAnimation(svg) {
            const circles = svg.querySelectorAll("circle");
            circles.forEach(circle => {
                const id = circle.id;
                if (id) {
                    circle.style.animationPlayState = "running";
                }
            });
        }
    
        window.addEventListener("scroll", handleScroll);
    });

    document.addEventListener('DOMContentLoaded', function() {
        var pElement = document.querySelector('#center p');
        var text = pElement.textContent;
        var newText = text.replace(/(How might we)/, '<strong>$1</strong>');
        pElement.innerHTML = newText;
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Select all images with class 'popup-img'
        var images = document.querySelectorAll('.popup-img');
    
        // Loop through each image and add click event listener
        images.forEach(function(img) {
          img.addEventListener('click', function() {
            openImagePopup(img);
          });
        });
    
        // JavaScript function to open the image pop-up
        function openImagePopup(imgElement) {
          // Get the image source and set it to the pop-up image
          var imgSrc = imgElement.src;
          document.getElementById('popupImage').src = imgSrc;
    
          // Display the overlay
          document.querySelector('.overlay').style.display = 'flex';
        }
    
        // JavaScript function to close the image pop-up
        function closeImagePopup() {
          // Hide the overlay
          document.querySelector('.overlay').style.display = 'none';
        }
      });
    
}());