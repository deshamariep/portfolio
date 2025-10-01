(function(){
    'use strict';
    console.log('reading js');

    function updateGreeting() {
        const now = new Date();
        const hours = now.getHours();
        const greetingElement = document.getElementById('greeting');

        let greetingText = "Good morning, I'm Desha Poindexter!";

        if (hours >= 12 && hours < 18) {
            greetingText = "Good afternoon, I'm Desha Poindexter!";
        } else if (hours >= 18) {
            greetingText = "Good evening, I'm Desha Poindexter!";
        }

        greetingElement.textContent = greetingText;
    }

    // Call the function on page load
    updateGreeting();

    document.addEventListener("DOMContentLoaded", () => {
      const obsessions = document.querySelector(".obsessions");
    
      if (obsessions) {
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              obsessions.classList.add("show");
              obs.unobserve(entry.target); // animate only once
            }
          });
        }, { threshold: 0.3 });
    
        observer.observe(obsessions);
      }
    });

    // exp fade in
    document.addEventListener("DOMContentLoaded", () => {
      const faders = document.querySelectorAll(".fade-in");
    
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // get index of the element among all fade-in elements
            const index = [...faders].indexOf(entry.target);
            // apply a delay based on index
            entry.target.style.transitionDelay = `${index * 0.15}s`;
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // optional, prevents re-trigger
          }
        });
      }, { threshold: 0.1 });
    
      faders.forEach((el) => observer.observe(el));
    });

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