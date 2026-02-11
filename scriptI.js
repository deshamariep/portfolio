(function () {
  'use strict';

  const cursor = document.getElementById("ambient-cursor");
  if (!cursor) return;

  let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let target = { x: pos.x, y: pos.y };

  window.addEventListener("mousemove", (e) => {
    target.x = e.clientX;
    target.y = e.clientY;
  });

  function animate() {
    pos.x += (target.x - pos.x) * 0.16;
    pos.y += (target.y - pos.y) * 0.16;

    cursor.style.transform =
      `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;

    requestAnimationFrame(animate);
  }
  animate();

  // Subtle emphasis on interactive elements
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

})();

(function(){
  'use strict';

  window.addEventListener("load", () => {
    const query = document.getElementById("query");
    
    setTimeout(() => {
      query.classList.add("slide-up");
    }, 100); 
  });

  window.addEventListener("load", () => {
    const line = document.querySelector("hr");
    
    setTimeout(() => {
      line.classList.add("expand");
    }, 300); // slight delay so transition runs
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
        bgTicking = false;
      });
      bgTicking = true;
    }
  });
  window.addEventListener('load', handleBackgroundTransition);

}());

