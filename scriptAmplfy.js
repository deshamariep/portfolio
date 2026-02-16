(function(){
    'use strict';
    console.log("reading js");

     window.addEventListener("load", () => {
        const hash = window.location.hash;
        if (hash) {
          [100, 300, 500, 1000].forEach(delay => {
            setTimeout(() => {
              const target = document.querySelector(hash);
              if (target) {
                const headerOffset = 0;   
                const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          
                window.scrollTo({
                  top: y,
                  behavior: "smooth"
                });
              }
            }, delay);
          });
        }
      });
    document.addEventListener("DOMContentLoaded", () => {
        const hash = window.location.hash;
        if (hash) {
          setTimeout(() => {
            const target = document.querySelector(hash);
            if (target) {
              const headerOffset = 0;
              const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        
              window.scrollTo({
                top: y,
                behavior: "smooth"
              });
            }
          }, 500);
        }
    });

        // let snapped = false;
        // document.addEventListener("scroll", function () {
        //     // if user is at the very top, reset snapped
        //     if (window.scrollY === 0) {
        //         snapped = false;
        //     }
  
        //     // only snap if user starts at top and scrolls past 8px
        //     if (!snapped && window.scrollY > 8) {
        //         snapped = true;
        //         window.scrollTo({
        //         top: 800,
        //         behavior: "smooth"
        //         });
        //     }
        // });

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
            { threshold: 0.2 } // you can adjust this
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

        // Enter sticky mode when user has scrolled beyond enterAfter
        if (!stickyActive && y > enterAfter) {
        heroTop.classList.add('sticky');
        // reserve top space to avoid content jump
        document.body.style.paddingTop = `${headerH}px`;
        stickyActive = true;
        heroTop.classList.remove('visible'); // keep hidden until reveal
        }

        if (stickyActive) {
        if (delta < -revealDelta) {
            // significant upward scroll -> reveal header
            heroTop.classList.add('visible');
        } else if (delta > hideDelta) {
            // downward scroll -> hide header
            heroTop.classList.remove('visible');
        }
        // if scrolled back to very top, remove sticky mode and restore layout
        if (y <= 0) {
            heroTop.classList.remove('sticky', 'visible');
            document.body.style.paddingTop = '';
            stickyActive = false;
        }
        } else {
        // keep hero-top as-is while not in sticky mode
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

    document.addEventListener("DOMContentLoaded", function () {

        const videos = document.querySelectorAll("video");

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            const video = entry.target;
            if (entry.isIntersecting) {
              video.play();
            } else {
              video.pause();
            }
          });
        }, { threshold: 0.5 });
      
        videos.forEach((video) => {
          video.autoplay = false;
          video.pause();
          observer.observe(video);
        });
    });
  
}());
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