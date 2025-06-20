(function(){
    'use strict';
    console.log('reading js');

    function updateGreeting() {
        const now = new Date();
        const hours = now.getHours();
        const greetingElement = document.getElementById('greeting');

        let greetingText = "👋 Hey there, good morning!";

        if (hours >= 12 && hours < 18) {
            greetingText = "👋 Hey there, good afternoon!";
        } else if (hours >= 18) {
            greetingText = "👋 Hey there, good evening!";
        }

        greetingElement.textContent = greetingText;
    }

    // Call the function on page load
    updateGreeting();

    document.addEventListener("DOMContentLoaded", () => {
        const footer = document.querySelector("footer");
        const footTitle = document.getElementById("footTitle");
    
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                footTitle.style.animationPlayState = "running";
              }
            });
          },
          { threshold: 0.2 } // you can adjust this
        );
    
        observer.observe(footer);
    });

}());