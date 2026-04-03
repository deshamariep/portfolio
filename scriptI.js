(function () {
  'use strict';

  // ========== CURSOR (Optimized) ==========
  const cursor = document.getElementById("ambient-cursor");
  if (cursor) {
    let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let target = { x: pos.x, y: pos.y };
    let animating = false;

    window.addEventListener("mousemove", (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      
      if (!animating) {
        animating = true;
        animate();
      }
    }, { passive: true });

    function animate() {
      const dx = target.x - pos.x;
      const dy = target.y - pos.y;
      
      // Stop animating if cursor hasn't moved significantly
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        animating = false;
        return;
      }
      
      pos.x += dx * 0.22;
      pos.y += dy * 0.22;
      cursor.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      
      requestAnimationFrame(animate);
    }

    document.querySelectorAll("a, button").forEach(el => {
      el.addEventListener("mouseenter", () => {
        cursor.style.width = "44px";
        cursor.style.height = "44px";
        cursor.style.opacity = "0.35";  /* dims on hover */
      }, { passive: true });
    
      el.addEventListener("mouseleave", () => {
        cursor.style.width = "28px";
        cursor.style.height = "28px";
        cursor.style.opacity = "0.85";  /* back to full */
      }, { passive: true });
    });
  }

  // ========== COPY EMAIL ==========
  window.copyEmail = function() {
    navigator.clipboard.writeText('deshapoindexter@gmail.com');
    
    const wrapper = document.querySelector('.email-wrapper');
    const notification = document.querySelector('.copy-notification');
    
    if (notification && wrapper) {
        // Add clicked class to hide hover label
        wrapper.classList.add('clicked');
        
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            // Remove clicked class after notification fades
            setTimeout(() => {
                wrapper.classList.remove('clicked');
            }, 200);
        }, 2000);
    }
  };

  // ========== SPLINE LOAD & ANIMATIONS ==========
  document.addEventListener('DOMContentLoaded', () => {
    const splineViewer = document.querySelector('spline-viewer');
    const hero = document.querySelector('.hero');
    
    if (splineViewer && hero) {
      splineViewer.addEventListener('load', () => {
        hero.classList.add('loaded');
      });
      
      // Fallback: if Spline takes too long (>3s), start anyway
      setTimeout(() => {
        if (!hero.classList.contains('loaded')) {
          hero.classList.add('loaded');
        }
      }, 3000);
    } else if (hero) {
      // No Spline viewer, start immediately
      hero.classList.add('loaded');
    }
  });

  // ========== CASE STUDY SCROLL ANIMATIONS ==========
  window.addEventListener('load', () => {
    const caseStudies = document.querySelectorAll('.dataCS');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    
    // Observe all case studies except first two
    caseStudies.forEach((cs, index) => {
        if (index > 1) {  // Skip first two
            observer.observe(cs);
        }
    });
  });

  // ========== WINDOW LOAD EVENTS ==========
  window.addEventListener("load", () => {
    // Query slide up
    const query = document.getElementById("query");
    if (query) {
      setTimeout(() => query.classList.add("slide-up"), 100);
    }
    
    // DataHero loaded
    const dataHero = document.querySelector(".dataHero");
    const dataDesktopBar = document.querySelector("#dataDesktopBar");
    if (dataHero) dataHero.classList.add("loaded");
    if (dataDesktopBar) dataDesktopBar.classList.add("loaded");
    
    // Handle background transition
    handleBackgroundTransition();
    
    // Update greeting
    updateGreeting();
    
    // Hash navigation
    if (window.location.hash === "#aboutMeSec") {
      setTimeout(() => {
        const target = document.getElementById("aboutMeSec");
        if (target) {
          const yOffset = -32;
          const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 1000);
    }
  });
  

  // ========== WINDOW LOAD EVENTS ==========
  window.addEventListener("load", () => {
    // Query slide up
    const query = document.getElementById("query");
    if (query) setTimeout(() => query.classList.add("slide-up"), 100);
    
    // DataHero loaded
    const dataHero = document.querySelector(".dataHero");
    const dataDesktopBar = document.querySelector("#dataDesktopBar");
    if (dataHero) dataHero.classList.add("loaded");
    if (dataDesktopBar) dataDesktopBar.classList.add("loaded");
    
    // Handle background transition
    handleBackgroundTransition();
    
    // Update greeting
    updateGreeting();
    
    // Hash navigation for initial page load
    if (window.location.hash === "#aboutMeSec") {
      setTimeout(() => {
        const target = document.getElementById("aboutMeSec");
        if (target) {
          const yOffset = -72;
          const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 1000);
    }
  });

  // ========== NAV CLICK HANDLERS ==========
  document.addEventListener('DOMContentLoaded', () => {
    // WORK link
    const workLink = document.getElementById('home');
    if (workLink) {
      workLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById('query');
        if (target) {
          const yOffset = -72; // Sticky nav height
          const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    }
  
    // ABOUT link
    const aboutLink = document.getElementById('aboutMe');
    if (aboutLink) {
      aboutLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById('aboutMeSec');
        if (target) {
          const yOffset = -72; // Sticky nav height
          const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    }
  });

  // ========== FOOTER ANIMATION ==========
  const footer = document.querySelector("footer");
  const footTitle = document.getElementById("footTitle");
  
  if (footer && footTitle) {
    const startAnimation = () => {
      footTitle.style.animationPlayState = "running";
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) startAnimation();
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(footer);

    if (footer.getBoundingClientRect().top < window.innerHeight) {
      startAnimation();
    }
  }

  // ========== STICKY NAV ==========
  const heroTop = document.querySelector('.hero-top');
  if (heroTop) {
    let lastY = window.scrollY;
    let ticking = false;
    let stickyActive = false;
    const enterAfter = 75;
    const revealDelta = 5;
    const hideDelta = 10;
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

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });

    window.addEventListener('pointermove', (e) => {
      if (stickyActive && e.clientY < 60) {
        heroTop.classList.add('visible');
      }
    }, { passive: true });
  }

  // ========== EXPERIMENT VIDEOS ==========
  const video = document.getElementById("expVideo");
  const source = document.getElementById("expVideoSource");
  const expVidCol = document.getElementById("ExpVidCol");
  const expImage = document.getElementById("expImage");
  
  const previews = {
    aeVids: "images/aeVids.mp4",
    amp: "images/ampPark.mp4",
    motion: "images/motionDesign.mp4",
    artWork: "images/artWork.svg"
  };

  function playPreview(file, maxWidth = 530) {
    if (!video || !source || !expImage || !expVidCol) return;
    
    const isVideo = file.endsWith(".mp4") || file.endsWith(".webm");

    if (isVideo) {
      expImage.style.display = "none";
      video.style.display = "block";
      source.src = file;
      video.style.maxWidth = `${maxWidth}px`;
      video.load();
      video.play();
    } else {
      video.pause();
      video.style.display = "none";
      expImage.style.display = "block";
      expImage.src = file;
      expImage.style.maxWidth = `${maxWidth}px`;
    }

    expVidCol.classList.add("video-active");
  }

  function resetPreview() {
    if (!video || !source || !expImage || !expVidCol) return;
    
    video.pause();
    source.src = "";
    video.load();
    expImage.src = "";
    expImage.style.display = "none";
    video.style.display = "block";
    expVidCol.classList.remove("video-active");
  }

  const aeVids = document.getElementById("aeVids");
  if (aeVids) {
    aeVids.addEventListener("mouseenter", () => playPreview(previews.aeVids, 300), { passive: true });
    aeVids.addEventListener("mouseleave", resetPreview, { passive: true });
  }

  const amp = document.getElementById("amp");
  if (amp) {
    amp.addEventListener("mouseenter", () => playPreview(previews.amp, 300), { passive: true });
    amp.addEventListener("mouseleave", resetPreview, { passive: true });
  }

  const motion = document.getElementById("motion");
  if (motion) {
    motion.addEventListener("mouseenter", () => playPreview(previews.motion), { passive: true });
    motion.addEventListener("mouseleave", resetPreview, { passive: true });
  }

  const artWork = document.getElementById("artWork");
  if (artWork) {
    artWork.addEventListener("mouseenter", () => playPreview(previews.artWork), { passive: true });
    artWork.addEventListener("mouseleave", resetPreview, { passive: true });
  }

  // ========== BACKGROUND COLOR TRANSITION (Optimized) ==========
  function handleBackgroundTransition() {
    const sideQuest = document.querySelector('#sideQuest');
    if (!sideQuest) return;

    const rect = sideQuest.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const transitionZone = 300;
    let bgColor = 'rgb(255, 255, 255)';

    if (rect.top > 0 && rect.top < transitionZone) {
      const progress = 1 - (rect.top / transitionZone);
      const colorValue = Math.round(255 * (1 - progress));
      bgColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
    } else if (rect.top <= 0 && rect.bottom > windowHeight) {
      bgColor = 'rgb(0, 0, 0)';
    } else if (rect.bottom > windowHeight - transitionZone && rect.bottom < windowHeight) {
      const progress = (windowHeight - rect.bottom) / transitionZone;
      const colorValue = Math.round(255 * progress);
      bgColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
    } else if (rect.bottom <= 0) {
      bgColor = 'rgb(255, 255, 255)';
    }

    // Use CSS variables for better performance
    document.documentElement.style.setProperty('--bg-color', bgColor);

    const match = bgColor.match(/\d+/);
    const colorValue = match ? parseInt(match[0]) : 255;
    const isBlack = colorValue < 127;
    const textColor = isBlack ? 'rgb(255, 255, 255)' : 'rgb(48, 48, 66)';
    
    document.documentElement.style.setProperty('--text-color', textColor);
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
  }, { passive: true });

  // ========== GREETING ==========
  function updateGreeting() {
    const greetingElement = document.getElementById('greeting');
    if (!greetingElement) return;

    const now = new Date();
    const hours = now.getHours();
    let greetingText = "Good morning, here's more on me...";

    if (hours >= 12 && hours < 18) {
      greetingText = "Good afternoon, here's more on me...";
    } else if (hours >= 18) {
      greetingText = "Good evening, here's more on me...";
    }

    greetingElement.textContent = greetingText;
  }

}());