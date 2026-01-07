(function(){
  'use strict';

  // cursor 
  const canvas = document.getElementById("cursor-canvas");
  const ctx = canvas.getContext("2d");
  const hero = document.getElementById("hero");
  
  function resize() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize);
  
  // mouse state
  const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
  const last = { x: mouse.x, y: mouse.y };
  
  // trail
  const points = [];
  const maxPoints = 100;
  
  // helpers
  const lerp = (a, b, n) => a + (b - a) * n;
  
  // idle fade
  let idleOpacity = 0;
  let lastMoveTime = Date.now();
  
  // mouse tracking (hero only)
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    lastMoveTime = Date.now();
  });
  
  hero.addEventListener("mouseleave", () => {
    points.length = 0;
    idleOpacity = 0;
  });
  
  // animation time
  let t = 0;
  
  function drawHelix(offset, inner = false, speed = 0) {
    if (points.length < 2) return;
  
    ctx.beginPath();
    points.forEach((p, i) => {
      const phase = i * 0.35 + offset;
      const ox = Math.cos(phase) * 6;
      const oy = Math.sin(phase) * 6;
  
      const x = p.x + ox;
      const y = p.y + oy;
  
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
  
    // slow color breathing
    const pulse = (Math.sin(t * 0.02) + 1) / 2;
  
    if (inner) {
      ctx.strokeStyle = `rgba(255,255,255,${(0.45 + pulse * 0.2) * idleOpacity})`;
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(255,255,255,0.9)";
    } else {
      const gradient = ctx.createLinearGradient(
        points[0].x,
        points[0].y,
        points[points.length - 1].x,
        points[points.length - 1].y
      );
  
      gradient.addColorStop(0, "rgb(70, 138, 255)");
      gradient.addColorStop(1, "rgb(194, 0, 255)");
  
      ctx.strokeStyle = gradient;
      ctx.lineWidth = (8 + speed * 0.35);
      ctx.shadowBlur = 36;
      ctx.shadowColor = `rgba(194, 0, 255, ${0.6 + pulse * 0.3})`;
      ctx.globalAlpha = idleOpacity;
    }
  
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    t++;
  
    // smooth follow
    const prevX = last.x;
    const prevY = last.y;
  
    last.x = lerp(last.x, mouse.x, 0.45);
    last.y = lerp(last.y, mouse.y, 0.45);
  
    // speed
    const dx = last.x - prevX;
    const dy = last.y - prevY;
    const speed = Math.sqrt(dx * dx + dy * dy);
  
    points.push({ x: last.x, y: last.y });
    if (points.length > maxPoints) points.shift();
  
    // idle fade logic
    const idleTime = Date.now() - lastMoveTime;
    const targetOpacity = idleTime > 600 ? 0 : 1;
    idleOpacity = lerp(idleOpacity, targetOpacity, 0.06);
  
    // triple helix (120° phase offsets)
    drawHelix(0, false, speed);
    drawHelix(Math.PI * 2 / 3, false, speed);
    drawHelix(Math.PI * 4 / 3, false, speed);
  
    // inner glow (single core for cleanliness)
    drawHelix(0, true, speed);
  
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
