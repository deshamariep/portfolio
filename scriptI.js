(function () {
  'use strict';

  // ========== CURSOR ==========
  const cursor = document.getElementById("ambient-cursor");
  if (cursor) {
    let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let target = { x: pos.x, y: pos.y };

    window.addEventListener("mousemove", (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
    });

    function animate() {
      pos.x += (target.x - pos.x) * 0.16;
      pos.y += (target.y - pos.y) * 0.16;
      cursor.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      requestAnimationFrame(animate);
    }
    animate();

    document.querySelectorAll("a, button").forEach(el => {
      el.addEventListener("mouseenter", () => {
        cursor.style.width = "64px";
        cursor.style.height = "64px";
        cursor.style.opacity = "1";
      });
      el.addEventListener("mouseleave", () => {
        cursor.style.width = "32px";
        cursor.style.height = "32px";
        cursor.style.opacity = "0.95";
      });
    });
  }

  // ========== COPY EMAIL ==========
  window.copyEmail = function() {
    navigator.clipboard.writeText('deshapoindexter@gmail.com');
    alert('Email copied to clipboard!');
  };

  // ========== SPLINE LOAD & ANIMATIONS ==========
  document.addEventListener('DOMContentLoaded', () => {
    const splineViewer = document.querySelector('spline-viewer');
    const hero = document.querySelector('.hero');
    const hr = document.querySelector('hr');
    
    if (splineViewer && hero && hr) {
      splineViewer.addEventListener('load', () => {
        hero.classList.add('loaded');
        setTimeout(() => hr.classList.add('expand'), 1600);
      });
      
      // Fallback: if Spline takes too long (>3s), start anyway
      setTimeout(() => {
        if (!hero.classList.contains('loaded')) {
          hero.classList.add('loaded');
          hr.classList.add('expand');
        }
      }, 3000);
    } else if (hero && hr) {
      // No Spline viewer, start immediately
      hero.classList.add('loaded');
      setTimeout(() => hr.classList.add('expand'), 1600);
    }
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

  // ========== AVATAR PARALLAX ==========
  document.addEventListener('mousemove', (e) => {
    const avatar = document.querySelector('.avatar-container');
    if (!avatar) return;

    const rect = avatar.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;

    const rings = avatar.querySelectorAll('.ring');
    rings.forEach(ring => {
      ring.style.transform = `perspective(1000px) rotateY(${x / 20}deg) rotateX(${-y / 20}deg)`;
    });
  });

  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.addEventListener('mouseleave', () => {
      const avatar = document.querySelector('.avatar-container');
      if (avatar) {
        const rings = avatar.querySelectorAll('.ring');
        rings.forEach(ring => {
          ring.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        });
      }
    });
  }

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
    });
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
    aeVids.addEventListener("mouseenter", () => playPreview(previews.aeVids, 300));
    aeVids.addEventListener("mouseleave", resetPreview);
  }

  const amp = document.getElementById("amp");
  if (amp) {
    amp.addEventListener("mouseenter", () => playPreview(previews.amp, 300));
    amp.addEventListener("mouseleave", resetPreview);
  }

  const motion = document.getElementById("motion");
  if (motion) {
    motion.addEventListener("mouseenter", () => playPreview(previews.motion));
    motion.addEventListener("mouseleave", resetPreview);
  }

  const artWork = document.getElementById("artWork");
  if (artWork) {
    artWork.addEventListener("mouseenter", () => playPreview(previews.artWork));
    artWork.addEventListener("mouseleave", resetPreview);
  }

  // ========== SCRAMBLE TEXT ==========
  const scrambleText = document.getElementById("scrambleText");
  const sideQuest = document.getElementById("sideQuest");
  
  if (scrambleText && sideQuest) {
    const text = "Practice & Play";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    const transitionZone = 300;

    window.addEventListener("scroll", () => {
      const rect = sideQuest.getBoundingClientRect();
      let progress = 0;

      if (rect.top <= transitionZone && rect.top >= 0) {
        progress = 1 - (rect.top / transitionZone);
      } else if (rect.top < 0) {
        progress = 1;
      }

      progress = Math.max(0, Math.min(1, progress));
      const revealCount = Math.floor(progress * text.length);
      let output = "";

      for (let i = 0; i < text.length; i++) {
        if (i < revealCount) {
          output += text[i];
        } else if (text[i] === " ") {
          output += " ";
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      scrambleText.textContent = output;
    });
  }

  // ========== BACKGROUND COLOR TRANSITION ==========
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

    document.body.style.backgroundColor = bgColor;

    const match = bgColor.match(/\d+/);
    const colorValue = match ? parseInt(match[0]) : 255;
    const isBlack = colorValue < 127;
    const textColor = isBlack ? 'rgb(255, 255, 255)' : 'rgb(48, 48, 66)';

    const navLinks = document.querySelectorAll('#one nav ul li a');
    navLinks.forEach(link => link.style.color = textColor);

    const caseStudies = document.querySelector('#caseStudies');
    if (caseStudies) caseStudies.style.color = textColor;

    const aboutSection = document.querySelector('#aboutMeSec');
    if (aboutSection) aboutSection.style.color = textColor;
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