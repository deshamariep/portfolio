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
      const obsessions = document.querySelectorAll(".obsessions");
    
      if (obsessions.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show"); // apply to the one that scrolled in
              obs.unobserve(entry.target);        // animate only once
            }
          });
        }, { threshold: 0.3 });
    
        // attach observer to each .obsessions element
        obsessions.forEach(section => observer.observe(section));
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


    const heroTop = document.querySelector('.hero-top');
  if (!heroTop) return;

  let lastY = window.scrollY;
  let ticking = false;
  let stickyActive = false;
  const enterAfter = 75;     
  const revealDelta = 5;     
  const hideDelta = 10;      

  // compute header height once (fallback)
  const headerH = heroTop.offsetHeight || 70;

  function onScroll() {
    const y = window.scrollY;
    const delta = y - lastY;

    // Enter sticky mode when user has scrolled beyond enterAfter
    if (!stickyActive && y > enterAfter) {
      heroTop.classList.add('sticky');
      // reserve top space to avoid content jump
      document.body.style.paddingTop = `${headerH}px`;
      stickyActive = true;
      heroTop.classList.remove('visible'); // keep hidden until reveal
    }

    if (stickyActive) {
      if (delta < -revealDelta) {
        // significant upward scroll -> reveal header
        heroTop.classList.add('visible');
      } else if (delta > hideDelta) {
        // downward scroll -> hide header
        heroTop.classList.remove('visible');
      }
      // if scrolled back to very top, remove sticky mode and restore layout
      if (y <= 0) {
        heroTop.classList.remove('sticky', 'visible');
        document.body.style.paddingTop = '';
        stickyActive = false;
      }
    } else {
      // keep hero-top as-is while not in sticky mode
      heroTop.classList.remove('visible');
    }

    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  // optional: reveal when pointer enters top area (desktop UX)
  window.addEventListener('pointermove', function (e) {
    if (stickyActive && e.clientY < 60) {
      heroTop.classList.add('visible');
    }
  });
  
}());