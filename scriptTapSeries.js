(function(){
    'use strict';
    console.log("reading js");

    window.addEventListener("load", () => {
      const hash = window.location.hash;
      if (hash) {
        [100, 300, 500, 1000].forEach(delay => {
          setTimeout(() => {
            const target = document.querySelector(hash);
            if (target) {
              const headerOffset = 0;   
              const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        
              window.scrollTo({
                top: y,
                behavior: "smooth"
              });
            }
          }, delay);
        });
      }
    });
  document.addEventListener("DOMContentLoaded", () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const target = document.querySelector(hash);
          if (target) {
            const headerOffset = 0;
            const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      
            window.scrollTo({
              top: y,
              behavior: "smooth"
            });
          }
        }, 500);
      }
  });

    document.addEventListener("DOMContentLoaded", () => {
      const faders = document.querySelectorAll(".spaceBtwn");
    
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 }); 
    
      faders.forEach(el => observer.observe(el));
    });

    document.addEventListener("DOMContentLoaded", () => {
      const faders = document.querySelectorAll(".spaceBtwnLine");
    
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.8 }); 
    
      faders.forEach(el => observer.observe(el));
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
    const enterAfter = 75;      // px scrolled down before we enter sticky mode
    const revealDelta = 5;      // px upward scroll needed to reveal
    const hideDelta = 10;        // px downward scroll to hide

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

  let personaSlideIndex = 1;
  function changePersonaSlide(n) {
    showPersonaSlide(personaSlideIndex += n);
  }
  function currentPersonaSlide(n) {
    showPersonaSlide(personaSlideIndex = n);
  }
  function showPersonaSlide(n) {
    let slides = document.getElementsByClassName("persona-slide");
    let dots = document.getElementsByClassName("persona-dot");
  
    if (n > slides.length) { personaSlideIndex = 1 }
    if (n < 1) { personaSlideIndex = slides.length }
  
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
    }
  
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }
  
    slides[personaSlideIndex - 1].classList.add("active");
    dots[personaSlideIndex - 1].classList.add("active");
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

  const passfailImage = document.getElementById("passfailImage");
  const hoverRules = {
    pfh1: {
      passfail: "passfail1.svg"
    },
    pfh2: {
      passfail: "passfail2.svg"
    },
    pfh3: {
      passfail: "passfail3.svg"
    },
    pfh4: {
      passfail: "passfail4.svg"
    }
  };
  const items = document.querySelectorAll(".diagramData p[id]");
  items.forEach(p => {
    p.addEventListener("mouseover", () => {
      const rule = hoverRules[p.id];
      if (!rule) return;
  
      passfailImage.src = `images/${rule.passfail}`;
    });
  });
  p.addEventListener("mouseout", () => {
    passfailImage.src = "images/passfail.svg";
  });
  
}());