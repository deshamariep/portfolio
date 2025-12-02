(function(){
  'use strict';

  let snapped = false; document.addEventListener("scroll", function () { if (window.scrollY === 0) { snapped = false; } if (!snapped && window.scrollY > 16) { snapped = true; const targetSection = document.querySelector("#query"); if (targetSection) { window.scrollTo({ top: targetSection.offsetTop, behavior: "smooth" }); } } });


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
        { threshold: 0.1 }
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

  window.addEventListener("load", () => {
    document.querySelector(".dataHero").classList.add("loaded");
    document.querySelector("#dataDesktopBar").classList.add("loaded");
  });
  const caseImgs = document.querySelectorAll('.dataCaseImg, .dataCS');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // run once per element
      }
    });
  }, { threshold: 0.05 });

  caseImgs.forEach(el => {
    observer.observe(el);
  });

  document.addEventListener("DOMContentLoaded", () => {
    const h2 = document.querySelector("#dataTitle h2");
  
    function runSequence() {
      h2.textContent = "DAY-sha";
      h2.style.opacity = 0;
  
      setTimeout(() => {
        h2.style.opacity = 1;
      }, 3000);
  
      setTimeout(() => {
        h2.style.opacity = 0;
      }, 5000);
  
      setTimeout(() => {
        h2.textContent = "TRANSLATING BETWEEN DESIGN AND DEVELOPMENT";
        h2.style.opacity = 1;
      }, 5600);
    }
  
    runSequence();
  
    setInterval(runSequence, 30000);

    function typeWriterParagraph() {
      const p = document.querySelector("#dataTitle p");
      const text = "Previously UX Design @ BRIDGEGOOD | Executive Assistant (Production) @ TAP Series";
    
      if (!p) return;
    
      p.textContent = "";
      p.style.opacity = 1;
    
      let i = 0;
    
      setTimeout(() => {
        function type() {
          if (i < text.length) {
            p.textContent += text.charAt(i);
            i++;
            setTimeout(type, 25);
          }
        }
        type();
      }, 6000);
    }
    
    typeWriterParagraph();
    
    setInterval(typeWriterParagraph, 30000);
  });
  

}());
