(function(){
  'use strict';

  window.addEventListener("load", () => {
    if (window.location.hash === "#aboutMeSec") {
        setTimeout(() => {
            const target = document.getElementById("aboutMeSec");
            if (target) {
                const yOffset = 64;
                const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                
                window.scrollTo({
                    top: y,
                    behavior: "smooth"
                });
            }
        }, 500);
    }
  });

  // let snapped = false;
  //       document.addEventListener("scroll", function () {
  //           // if user is at the very top, reset snapped
  //           if (window.scrollY === 0) {
  //               snapped = false;
  //           }
  
  //           // only snap if user starts at top and scrolls past 8px
  //           if (!snapped && window.scrollY > 16) {
  //               snapped = true;
  //               window.scrollTo({
  //               top: 876,
  //               behavior: "smooth"
  //               });
  //           }
  //       });


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

  // HERO
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
  
    const CYCLE_DURATION = 30000; 
    let timers = [];
  
    function clearTimers() {
      timers.forEach(t => clearTimeout(t));
      timers = [];
    }
  
    function addTimer(fn, ms) {
      const t = setTimeout(fn, ms);
      timers.push(t);
    }
  
    function runTypewriter() {
      const text = "Previously UX Design @ BRIDGEGOOD | Production Assistant @ TAP Series";
      p.textContent = "";
      p.style.opacity = 1;
  
      let i = 0;
      function type() {
        if (i < text.length) {
          p.textContent += text.charAt(i);
          i++;
          addTimer(type, 25); 
        }
      }
      type();
    }
  
    function startHeroCycle() {
      clearTimers();
  
      h2.textContent = "DAY-sha";
      h2.style.opacity = 0;
      p.textContent = "";
      p.style.opacity = 0;
  
      addTimer(() => {
        h2.style.opacity = 1;
      }, 0);
  
      addTimer(() => {
        h2.style.opacity = 0;
      }, 2000);
  
      addTimer(() => {
        h2.textContent =
          "a UI/UX Designer passionate about simplifying workflows, bridging communication, and creating engaging, user-first designs.";
        h2.style.opacity = 1;
      }, 2600);
  
      addTimer(() => {
        runTypewriter();
      }, 3000);
  
      addTimer(() => {
        startHeroCycle();
      }, CYCLE_DURATION);
    }
  
    startHeroCycle();
  });
  
  // arrow
  setTimeout(() => {
    const desktop = document.getElementById("desktop");
    const arrow = document.getElementById("desktopArrow");
    const arrowImg = arrow.querySelector("img");
  
    desktop.style.transition = "opacity 0.5s ease";
    desktop.style.opacity = 0;
  
    setTimeout(() => {
      desktop.style.display = "none";
      arrow.style.display = "block";
  
      setTimeout(() => {
        arrowImg.style.opacity = 1;
      }, 50);
  
    }, 500);
  
  }, 10000);

  // exp
  const video = document.getElementById("expVideo");
  const source = document.getElementById("expVideoSource");
  const previews = {
    spots: "images/spotsAnimation.mp4",
    amp: "images/ampPark.mp4",
    ume: "images/umeAnimation.mp4"
  };
  function playPreview(videoFile, maxWidth = 650) {
    source.src = videoFile;
    video.style.maxWidth = `${maxWidth}px`;
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
  document.getElementById("amp").addEventListener("mouseenter", () => {
    playPreview(previews.amp, 350); 
  });
  document.getElementById("amp").addEventListener("mouseleave", () => {
    source.src = "";
    video.style.maxWidth = '650px'; 
    video.load();
  });
  document.getElementById("ume").addEventListener("mouseenter", () => {
    playPreview(previews.ume);
  });
  document.getElementById("ume").addEventListener("mouseleave", () => {
    source.src = "";
    video.load();
  });

  // greeting
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

  // BACKGROUND COLOR
  function handleBackgroundTransition() {
    const experiments = document.querySelector('#experiments');
    
    if (!experiments) return;
    
    const rect = experiments.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const transitionZone = 300; 
    
    let bgColor = 'rgb(255, 255, 255)'; 
    if (rect.top > 0 && rect.top < transitionZone) {
      const progress = 1 - (rect.top / transitionZone);
      const colorValue = Math.round(255 * (1 - progress));
      bgColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
    }
    else if (rect.top <= 0 && rect.bottom > windowHeight) {
      bgColor = 'rgb(0, 0, 0)';
    }
    else if (rect.bottom > windowHeight - transitionZone && rect.bottom < windowHeight) {
      const progress = (windowHeight - rect.bottom) / transitionZone;
      const colorValue = Math.round(255 * progress);
      bgColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
    }
    else if (rect.bottom <= 0) {
      bgColor = 'rgb(255, 255, 255)';
    }

    document.body.style.backgroundColor = bgColor;
    
    const match = bgColor.match(/\d+/);
    const colorValue = match ? parseInt(match[0]) : 255;
    const isBlack = colorValue < 127;
    const textColor = isBlack ? 'rgb(255, 255, 255)' : 'rgb(48, 48, 66)';
    const navLinks = document.querySelectorAll('#one nav ul li a');
    navLinks.forEach(link => {
      link.style.color = textColor;
    });

    const caseStudies = document.querySelector('#caseStudies');
    if (caseStudies) {
      caseStudies.style.color = textColor;
    }
    
    const aboutSection = document.querySelector('#aboutMeSec');
    if (aboutSection) {
      aboutSection.style.color = textColor;
    }
  }
  let bgTicking = false;
  window.addEventListener('scroll', () => {
    if (!bgTicking) {
      window.requestAnimationFrame(() => {
        handleBackgroundTransition();
        bgTicking = false;
      });
      bgTicking = true;
    }
  });
  window.addEventListener('load', handleBackgroundTransition);

}());
