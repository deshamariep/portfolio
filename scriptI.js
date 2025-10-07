(function(){
  'use strict';

  let snapped = false;
  function smoothScrollTo(targetY, duration = 2500) {
    const rawStart = window.scrollY;
    const startY = Math.max(rawStart, 20); // force start at 17px or current position if already past 17
    const distance = targetY - startY;
    const startTime = performance.now();
  
    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
  
    function animateScroll(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutQuad(progress);
      window.scrollTo(0, Math.round(startY + distance * eased));
      if (progress < 1) requestAnimationFrame(animateScroll);
    }
  
    // If browser is currently below 17px, jump to 17 exactly before animating.
    // This avoids a tiny visual jump/glitch when the animation starts from a fractional value.
    if (rawStart < 17) {
      window.scrollTo(0, 20);
      // allow the browser a single frame to apply the change, then start the animation
      requestAnimationFrame(() => requestAnimationFrame(animateScroll));
    } else {
      requestAnimationFrame(animateScroll);
    }
  }
  
  document.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
  
    // Reset when back to top
    if (scrollY === 0) snapped = false;
  
    // Trigger smooth scroll only once when scrolled past 16px
    if (!snapped && scrollY > 16) {
      snapped = true;
      const targetSection = document.querySelector("#query");
      if (targetSection) {
        smoothScrollTo(targetSection.offsetTop, 3000); // duration in ms (3s)
      }
    }
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
  }, { threshold: 0.2 });

  caseImgs.forEach(el => {
    observer.observe(el);
  });

}());
