(function(){
  'use strict';

  document.getElementById("aboutMe").addEventListener("click", (e) => {
    e.preventDefault();
    
    const target = document.getElementById("aboutMeSec");
    if (target) {
        const yOffset = -64; 
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
            top: y,
            behavior: "smooth"
        });
    }
  });

  const aboutLink = document.getElementById("aboutMe");
  if (aboutLink) {
    aboutLink.addEventListener("click", (e) => {
        const isHomePage = window.location.pathname === "/" || 
                          window.location.pathname === "/index.html" ||
                          window.location.pathname.endsWith("deshapoindexter.com/");
        if (isHomePage) {
            e.preventDefault();
            const target = document.getElementById("aboutMeSec");
            if (target) {
                const targetPosition = target.offsetTop;
                window.scrollTo({
                    top: targetPosition - 80,
                    behavior: "smooth"
                });
            }
        }
    });
  }

  let snapped = false;
        document.addEventListener("scroll", function () {
            // if user is at the very top, reset snapped
            if (window.scrollY === 0) {
                snapped = false;
            }
  
            // only snap if user starts at top and scrolls past 8px
            if (!snapped && window.scrollY > 16) {
                snapped = true;
                window.scrollTo({
                top: 876,
                behavior: "smooth"
                });
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

  const headerH = heroTop.offsetHeight || 70;

  function onScroll() {
    const y = window.scrollY;
    const delta = y - lastY;

    if (!stickyActive && y > enterAfter) {
      heroTop.classList.add('sticky');
      document.body.style.paddingTop = `${headerH}px`;
      stickyActive = true;
      heroTop.classList.remove('visible'); 
    }

    if (stickyActive) {
      if (delta < -revealDelta) {
        heroTop.classList.add('visible');
      } else if (delta > hideDelta) {
        heroTop.classList.remove('visible');
      }
      if (y <= 0) {
        heroTop.classList.remove('sticky', 'visible');
        document.body.style.paddingTop = '';
        stickyActive = false;
      }
    } else {
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
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  caseImgs.forEach(el => {
    observer.observe(el);
  });

  document.addEventListener("DOMContentLoaded", () => {
    const h2 = document.querySelector("#dataTitle h2");
    const p = document.querySelector("#dataTitle p");
  
    const CYCLE_DURATION = 30000; // 30s – matches your hero video length
    let timers = [];
  
    // Clear all active timeouts
    function clearTimers() {
      timers.forEach(t => clearTimeout(t));
      timers = [];
    }
  
    // Helper to store timers
    function addTimer(fn, ms) {
      const t = setTimeout(fn, ms);
      timers.push(t);
    }
  
    // --- TYPEWRITER FOR PARAGRAPH ---
    function runTypewriter() {
      const text = "Previously UX Design @ BRIDGEGOOD | Production Assistant @ TAP Series";
      p.textContent = "";
      p.style.opacity = 1;
  
      let i = 0;
      function type() {
        if (i < text.length) {
          p.textContent += text.charAt(i);
          i++;
          addTimer(type, 25); // ~1s total for 40 chars = adjust if needed
        }
      }
      type();
    }
  
    // --- FULL HERO SEQUENCE (must equal 30s total) ---
    function startHeroCycle() {
      clearTimers();
  
      // Reset hero text immediately
      h2.textContent = "DAY-sha";
      h2.style.opacity = 0;
      p.textContent = "";
      p.style.opacity = 0;
  
      // TIMELINE (aligned with video)
      // 0s – Start “DAY-sha”
      addTimer(() => {
        h2.style.opacity = 1;
      }, 3000); // fade in at 3s
  
      // 5s – Fade out DAY-sha
      addTimer(() => {
        h2.style.opacity = 0;
      }, 5000);
  
      // 5.6s – Show the long sentence
      addTimer(() => {
        h2.textContent =
          "a UI/UX Designer passionate about simplifying workflows, bridging communication, and creating engaging, user-first designs.";
        h2.style.opacity = 1;
      }, 5600);
  
      // 5.6s – Start typewriter slightly after the title begins
      addTimer(() => {
        runTypewriter();
      }, 6000);
  
      // 30s — FULL RESET and start again
      addTimer(() => {
        startHeroCycle();
      }, CYCLE_DURATION);
    }
  
    // Start infinite 30-second loop
    startHeroCycle();
  });

  const video = document.getElementById("expVideo");
  const source = document.getElementById("expVideoSource");
  const previews = {
    spots: "images/spotsAnimation.mp4",
    ume: "images/umeAnimation.mp4"
  };
  function playPreview(videoFile) {
    source.src = videoFile;
    video.load();
    video.play();
  }
  document.getElementById("spots").addEventListener("mouseenter", () => {
    playPreview(previews.spots);
  });
  document.getElementById("spots").addEventListener("mouseleave", () => {
    source.src = "";
    video.load();
  });
  document.getElementById("ume").addEventListener("mouseenter", () => {
    playPreview(previews.ume);
  });
  document.getElementById("ume").addEventListener("mouseleave", () => {
    source.src = "";
    video.load();
  });

  function updateGreeting() {
    const now = new Date();
    const hours = now.getHours();
    const greetingElement = document.getElementById('greeting');

    let greetingText = "Good morning, here's more on me...";

    if (hours >= 12 && hours < 18) {
        greetingText = "Good afternoon, here's more on me...";
    } else if (hours >= 18) {
        greetingText = "Good evening, here's more on me...";
    }

    greetingElement.textContent = greetingText;
  }
  updateGreeting();

}());
