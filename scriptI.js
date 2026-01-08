(function(){
  'use strict';

  // cursor 
  const canvas = document.getElementById("cursor-canvas");
  const ctx = canvas.getContext("2d");
  
  if (!canvas || !ctx) {
    console.error("Cursor canvas not found");
  }
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);
  
  const RIBBON_COUNT = 5;
  const POINTS = 40;
  
  const BASE_RADIUS = 24;
  const RADIUS_GROWTH = 22;
  
  const SPIN_SPEED = 0.0025; 
  const TAIL_ROTATE = 0.002;
  
  const OUTER_GLOW = 56;
  const INNER_GLOW = 14;
  
  let mouseX = canvas.width / 2;
  let mouseY = canvas.height / 2;
  
  let lastMouseX = mouseX;
  let lastMouseY = mouseY;
  
  let motion = 0;
  
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    motion = 1;
  });
  
  let time = 0;
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    const dx = mouseX - lastMouseX;
    const dy = mouseY - lastMouseY;
    const isMoving = Math.hypot(dx, dy) > 0.3;
  
    if (isMoving) {
      time += 1;
      motion = Math.min(motion + 0.02, 1);
    } else {
      motion *= 0.96;
    }
  
    for (let i = 0; i < RIBBON_COUNT; i++) {
      drawRibbon(i, time * motion);
    }
  
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  
    requestAnimationFrame(animate);
  }
  
  animate();
  
  function drawRibbon(index, t) {
    const phase = (Math.PI * 2 / RIBBON_COUNT) * index;
    const hue = (index * 72 + t * 0.25) % 360;
  
    ctx.beginPath();
  
    for (let i = 0; i < POINTS; i++) {
      const p = i / POINTS;
  
      const angle =
        phase +
        t * SPIN_SPEED +
        p * TAIL_ROTATE;
  
      const radius =
        BASE_RADIUS +
        p * RADIUS_GROWTH;
  
      const x = mouseX + Math.cos(angle) * radius;
      const y = mouseY + Math.sin(angle) * radius;
  
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
  
    ctx.strokeStyle = `hsla(${hue}, 95%, 60%, 0.7)`;
    ctx.lineWidth = 9;
    ctx.shadowBlur = OUTER_GLOW;
    ctx.shadowColor = `hsla(${hue}, 100%, 65%, 1)`;
    ctx.lineCap = "round";
    ctx.stroke();
  
    ctx.strokeStyle = "rgba(255,255,255,0.95)";
    ctx.lineWidth = 2.6;
    ctx.shadowBlur = INNER_GLOW;
    ctx.shadowColor = "rgba(255,255,255,1)";
    ctx.stroke();
  }


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

  // exp
  const video = document.getElementById("expVideo");
  const source = document.getElementById("expVideoSource");
  const previewText = document.getElementById("previewText");
  const expVidCol = document.getElementById("ExpVidCol");
  const previews = {
    spots: "images/spotsAnimation.mp4",
    amp: "images/ampPark.mp4",
    aeVids: "images/aeVids.mp4",
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
  document.getElementById("spots").addEventListener("mouseenter", () => {
    playPreview(previews.spots);
  });
  document.getElementById("spots").addEventListener("mouseleave", resetPreview);
  
  document.getElementById("amp").addEventListener("mouseenter", () => {
    playPreview(previews.amp, 300);
  });
  document.getElementById("amp").addEventListener("mouseleave", resetPreview);
  
  document.getElementById("aeVids").addEventListener("mouseenter", () => {
    playPreview(previews.aeVids, 300);
  });
  document.getElementById("aeVids").addEventListener("mouseleave", resetPreview);
  
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
