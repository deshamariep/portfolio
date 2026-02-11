(function(){
  'use strict';

  // hero cursor
  const mouseViewport = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };
  
  window.addEventListener("mousemove", (e) => {
    mouseViewport.x = e.clientX;
    mouseViewport.y = e.clientY;
  });
  
  const cursorCanvas = document.getElementById("cursor-canvas");
  const cursorCtx = cursorCanvas.getContext("2d");
  const heroEl = document.getElementById("hero");
  
  let cw, ch;
  function resizeCursor() {
    cw = cursorCanvas.width = heroEl.offsetWidth;
    ch = cursorCanvas.height = heroEl.offsetHeight;
  }
  resizeCursor();
  window.addEventListener("resize", resizeCursor);
  
  let cursorPos = { x: cw / 2, y: ch / 2 };
  let prevPos = { x: cursorPos.x, y: cursorPos.y };
  
  let cursorSpeed = 0;
  let motionStrength = 0;
  
  const TRAIL_LEN = 36;
  const trailPoints = [];
  
  for (let i = 0; i < TRAIL_LEN; i++) {
    trailPoints.push({ x: cursorPos.x, y: cursorPos.y });
  }
  
  const RIBBON_COUNT = 5;
  const BASE_RADIUS = 24;
  const SPIRAL_RADIUS = 26;
  
  const IDLE_SPIN = 0.0024;
  const MOVE_SPIN = 0.0056;
  
  const COLORS = [
    "70,138,255",
    "194,0,255",
    "120,90,255",
    "90,180,255",
    "170,100,255"
  ];
  
  function updateHeroCursor() {
    const rect = heroEl.getBoundingClientRect();
  
    cursorPos.x = mouseViewport.x - rect.left;
    cursorPos.y = mouseViewport.y - rect.top;
  }
  
  function drawRibbon(phase, color, time) {
    cursorCtx.beginPath();
  
    for (let i = 0; i < trailPoints.length; i++) {
      const p = trailPoints[i];
      const t = i / trailPoints.length;
  
      const radius =
        BASE_RADIUS + SPIRAL_RADIUS * t * motionStrength;
  
      const spin =
        IDLE_SPIN + (MOVE_SPIN - IDLE_SPIN) * motionStrength;
  
      const angle =
        time * spin +
        phase +
        t * Math.PI * 1.6;
  
      const x = p.x + Math.cos(angle) * radius;
      const y = p.y + Math.sin(angle) * radius;
  
      i === 0 ? cursorCtx.moveTo(x, y) : cursorCtx.lineTo(x, y);
    }
  
    const thickness = 2.4 + cursorSpeed * 0.08;
  
    cursorCtx.lineCap = "round";
    cursorCtx.lineJoin = "round";
    cursorCtx.globalCompositeOperation = "lighter";
  
    cursorCtx.strokeStyle = "rgba(255,255,255,0.95)";
    cursorCtx.lineWidth = thickness;
    cursorCtx.shadowBlur = 14;
    cursorCtx.shadowColor = "rgba(255,255,255,1)";
    cursorCtx.stroke();
  
    cursorCtx.strokeStyle = `rgba(${color},0.9)`;
    cursorCtx.lineWidth = thickness * 2.4;
    cursorCtx.shadowBlur = 56;
    cursorCtx.shadowColor = `rgba(${color},1)`;
    cursorCtx.stroke();
  
    cursorCtx.globalCompositeOperation = "source-over";
  }
  
  let tick = 0;
  
  function animateCursor() {
    cursorCtx.clearRect(0, 0, cw, ch);
  
    updateHeroCursor();
  
    const dx = cursorPos.x - prevPos.x;
    const dy = cursorPos.y - prevPos.y;
    cursorSpeed = Math.min(Math.hypot(dx, dy) * 0.45, 24);
  
    const targetMotion = cursorSpeed > 0.4 ? 1 : 0;
  
    motionStrength +=
      (targetMotion - motionStrength) *
      (targetMotion ? 0.06 : 0.12);
  
    motionStrength = Math.min(motionStrength, 1);
  
    prevPos.x = cursorPos.x;
    prevPos.y = cursorPos.y;
  
    trailPoints.unshift({
      x: trailPoints[0].x + (cursorPos.x - trailPoints[0].x) * 0.35,
      y: trailPoints[0].y + (cursorPos.y - trailPoints[0].y) * 0.35
    });
    trailPoints.pop();
  
    for (let i = 0; i < RIBBON_COUNT; i++) {
      drawRibbon(
        (Math.PI * 2 / RIBBON_COUNT) * i,
        COLORS[i % COLORS.length],
        tick
      );
    }
  
    tick++;
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  // body cursor
  const ambientCursor = document.getElementById("ambient-cursor");
  
  let haloPos = { x: mouseViewport.x, y: mouseViewport.y };
  
  function animateHalo() {
    haloPos.x += (mouseViewport.x - haloPos.x) * 0.18;
    haloPos.y += (mouseViewport.y - haloPos.y) * 0.18;
  
    ambientCursor.style.transform =
      `translate(${haloPos.x}px, ${haloPos.y}px) translate(-50%, -50%)`;
  
    requestAnimationFrame(animateHalo);
  }
  animateHalo();
  
  heroEl.addEventListener("mouseenter", () => {
    ambientCursor.style.opacity = "0";
  });
  heroEl.addEventListener("mouseleave", () => {
    ambientCursor.style.opacity = "1";
  });

  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "56px";
      cursor.style.height = "56px";
      cursor.style.opacity = "1";
    });
  
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "40px";
      cursor.style.height = "40px";
      cursor.style.opacity = "0.95";
    });
  });

  // Mouse Parallax for Avatar Rings (not the image)
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
  // WITH THIS NEW 3D PARALLAX FUNCTION:
  function handleStaggered3DCards() {
    const cards = document.querySelectorAll('.dataCS');
    const windowHeight = window.innerHeight;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardTop = rect.top;
      const cardBottom = rect.bottom;

      const progress = Math.max(0, Math.min(1, 
        (windowHeight - cardTop) / (windowHeight * 0.6)
      ));
  
      const direction = index % 2 === 0 ? 1 : -1;
  
      const translateX = (1 - progress) * 400 * direction;
      const translateY = (1 - progress) * 150;
      const translateZ = (1 - progress) * -500;
      const rotateY = (1 - progress) * 25 * direction;
      const rotateX = (1 - progress) * 10;
  
      const opacity = 0.2 + (progress * 0.8);
      const blur = (1 - progress) * 8;
  
      card.style.transform = `
        perspective(2000px)
        translateX(${translateX}px)
        translateY(${translateY}px)
        translateZ(${translateZ}px)
        rotateY(${rotateY}deg)
        rotateX(${rotateX}deg)
      `;
      card.style.opacity = opacity;
      card.style.filter = `blur(${blur}px)`;
    });
  }
  window.addEventListener('load', () => {
    handleStaggered3DCards();
    handleBackgroundTransition();
  });

  // nav
  window.addEventListener("load", () => {
    if (window.location.hash === "#aboutMeSec") {
        setTimeout(() => {
            const target = document.getElementById("aboutMeSec");
            if (target) {
                const yOffset = -32; 
                const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                
                window.scrollTo({
                    top: y,
                    behavior: "smooth"
                });
            }
        }, 1000);
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

  // exp
  const video = document.getElementById("expVideo");
  const source = document.getElementById("expVideoSource");
  const previewText = document.getElementById("previewText");
  const expVidCol = document.getElementById("ExpVidCol");
  const previews = {
    aeVids: "images/aeVids.mp4",
    amp: "images/ampPark.mp4",
    ume: "images/umeAnimation.mp4"
  };
  function playPreview(videoFile, maxWidth = 650) {
    source.src = videoFile;
    video.style.maxWidth = `${maxWidth}px`;
    video.load();
    video.play();

    previewText.classList.add("hidden");
    expVidCol.classList.add("video-active");
  }
  function resetPreview() {
    source.src = "";
    video.load();
    previewText.classList.remove("hidden");
    expVidCol.classList.remove("video-active");
  }

  document.getElementById("aeVids").addEventListener("mouseenter", () => {
    playPreview(previews.aeVids, 300);
  });
  document.getElementById("aeVids").addEventListener("mouseleave", resetPreview);
  
  document.getElementById("amp").addEventListener("mouseenter", () => {
    playPreview(previews.amp, 300);
  });
  document.getElementById("amp").addEventListener("mouseleave", resetPreview);
  
  document.getElementById("ume").addEventListener("mouseenter", () => {
    playPreview(previews.ume);
  });
  document.getElementById("ume").addEventListener("mouseleave", resetPreview);

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
        handleStaggered3DCards();
        bgTicking = false;
      });
      bgTicking = true;
    }
  });
  window.addEventListener('load', handleBackgroundTransition);

}());

