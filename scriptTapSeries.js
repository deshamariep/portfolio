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

  // persona slide
  let personaSlideIndex = 1;
  function changePersonaSlide(n) {
    showPersonaSlide(personaSlideIndex += n);
  }
  function currentPersonaSlide(n) {
    showPersonaSlide(personaSlideIndex = n);
  }
  function showPersonaSlide(n) {
    let slides = document.getElementsByClassName("persona-slide");
    let dots = document.getElementsByClassName("persona-dot");

    if (n > slides.length) { personaSlideIndex = 1 }
    if (n < 1) { personaSlideIndex = slides.length }

    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }

    slides[personaSlideIndex - 1].classList.add("active");
    dots[personaSlideIndex - 1].classList.add("active");
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