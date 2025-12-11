(function(){
  'use strict';

  document.getElementById("aboutMe").addEventListener("click", (e) => {
    e.preventDefault();
    
    const target = document.getElementById("aboutMeSec");
    if (target) {
        const yOffset = -64; // header offset
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

  // compute header height once (fallback)
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
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  caseImgs.forEach(el => {
    observer.observe(el);
  });

  document.addEventListener("DOMContentLoaded", () => {
    const h2 = document.querySelector("#dataTitle h2");
    let animationCount = 0;
  
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
        h2.textContent = "a UI/UX Designer passionate about simplifying workflows, bridging communication, and creating engaging, user-first designs.";
        h2.style.opacity = 1;
      }, 5600);

      animationCount++;
      
      if (animationCount >= 2) {
        setTimeout(() => {
          resetHero();
        }, 30000); 
      }
    }

    function resetHero() {
      h2.textContent = "DAY-sha";
      h2.style.opacity = 0;
      
      const p = document.querySelector("#dataTitle p");
      if (p) {
        p.textContent = "";
        p.style.opacity = 0;
      }

      animationCount = 0;

      setTimeout(() => {
        runSequence();
        typeWriterParagraph();
      }, 1000);
    }
  
    runSequence();
  
    setTimeout(() => {
      runSequence();
    }, 30000);

    function typeWriterParagraph() {
      const p = document.querySelector("#dataTitle p");
      const text = "Previously UX Design @ BRIDGEGOOD | UX Production Assistant @ TAP Series";
    
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
    
    setTimeout(() => {
      typeWriterParagraph();
    }, 30000);
  });

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
  document.getElementById("ume").addEventListener("mouseenter", () => {
    playPreview(previews.ume);
  });
  document.getElementById("experiments").addEventListener("mouseleave", () => {
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
  // Call the function on page load
  updateGreeting();

}());
