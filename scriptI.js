(function(){
  'use strict';

  // cursor 
  const canvas = document.getElementById("cursor-canvas");
  const ctx = canvas.getContext("2d");
  const hero = document.getElementById("hero");
  
  let w, h;
  function resize() {
    w = canvas.width = hero.offsetWidth;
    h = canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize);
  
  let mouse = { x: w / 2, y: h / 2 };
  let last = { x: mouse.x, y: mouse.y };
  let speed = 0;
  
  hero.addEventListener("mousemove", e => {
    const rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  
  const TRAIL_LENGTH = 28;
  const trail = [];
  
  for (let i = 0; i < TRAIL_LENGTH; i++) {
    trail.push({ x: mouse.x, y: mouse.y });
  }
  
  const RIBBONS = 5;
  const BASE_RADIUS = 24;
  const SPIN_SPEED = 0.025;
  
  const COLORS = [
    "70,138,255",
    "194,0,255",
    "120,80,255",
    "90,180,255",
    "160,100,255"
  ];
  
  function drawRibbon(phase, color, time) {
    ctx.beginPath();
  
    for (let i = 0; i < trail.length; i++) {
      const p = trail[i];
      const t = i / trail.length;
  
      const orbit = BASE_RADIUS + t * 18;
      const angle = time * SPIN_SPEED + phase + t * 2.2;
  
      const cx = p.x + Math.cos(time * SPIN_SPEED + phase) * BASE_RADIUS;
      const cy = p.y + Math.sin(time * SPIN_SPEED + phase) * BASE_RADIUS;
  
      const x = cx + Math.cos(angle) * orbit;
      const y = cy + Math.sin(angle) * orbit;
  
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
  
    const thickness = 4.2 + speed * 0.15;
  
    ctx.strokeStyle = "rgba(255,255,255,0.95)";
    ctx.lineWidth = thickness;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(255,255,255,0.9)";
    ctx.stroke();
  
    ctx.strokeStyle = `rgba(${color},0.85)`;
    ctx.lineWidth = thickness * 2.6;
    ctx.shadowBlur = 42;
    ctx.shadowColor = `rgba(${color},1)`;
    ctx.stroke();
  }
  
  let time = 0;
  
  function animate() {
    ctx.clearRect(0, 0, w, h);
  
    const dx = mouse.x - last.x;
    const dy = mouse.y - last.y;
    speed = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.4, 30);
  
    last.x = mouse.x;
    last.y = mouse.y;
  
    trail.unshift({ x: mouse.x, y: mouse.y });
    trail.pop();
  
    for (let i = 0; i < RIBBONS; i++) {
      drawRibbon((Math.PI * 2 / RIBBONS) * i, COLORS[i % COLORS.length], time);
    }
  
    time++;
    requestAnimationFrame(animate);
  }
  
  animate();

  window.addEventListener("load", () => {
    if (window.location.hash === "#aboutMeSec") {
        setTimeout(() => {
            const target = document.getElementById("aboutMeSec");
            if (target) {
                const yOffset = 32; 
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
