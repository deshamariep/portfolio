
   (function () {
    'use strict';
  
    const isMobile = () => window.innerWidth < 1024;
  
    const slides = [
      {
        id: 'aeVids',
        category: 'Content Creation',
        title: 'After Effects & Premiere Pro',
        type: 'video',
        src: 'images/aeVids.mp4',
      },
      {
        id: 'amp',
        category: 'Campus Parking App Redesign',
        title: 'AMP Park: Student Parking Frustration',
        type: 'video',
        src: 'images/ampPark.mp4',
      },
      {
        id: 'motion',
        category: 'Visual & Multimedia',
        title: 'AI Generation and Motion Graphics',
        type: 'video',
        src: 'images/motionDesign.mp4',
      },
      {
        id: 'artWork',
        category: 'Art Work',
        title: 'Illustrations: traditional, digital, and fashion',
        type: 'image',
        src: 'images/artWork.svg',
      },
    ];
  
    function buildCarousel() {
      if (!isMobile()) return;
  
      const sideQuest = document.getElementById('sideQuest');
      if (!sideQuest) return;
  
      const existingExp = document.getElementById('experiments');
      const existingPracticeSection = document.getElementById('practiceSection');
      if (existingExp) existingExp.style.display = 'none';
      if (existingPracticeSection) existingPracticeSection.style.display = 'none';
  
      if (document.getElementById('mobileCarousel')) return;
  
      const wrapper = document.createElement('div');
      wrapper.id = 'mobileCarousel';
      wrapper.innerHTML = `
        <div id="mcHeader">
          <h2 id="mcSectionTitle">Practice &amp; Play</h2>
          <div id="mcMeta">
            <p id="mcCategory" class="smolP"></p>
            <h3 id="mcTitle"></h3>
          </div>
          <div id="mcDots"></div>
        </div>
        <div id="mcTrackWrap">
          <div id="mcTrack"></div>
        </div>
        <div id="mcArrows">
          <button id="mcPrev" aria-label="Previous">&#8592;</button>
          <button id="mcNext" aria-label="Next">&#8594;</button>
        </div>
      `;
      sideQuest.appendChild(wrapper);
  
      const track   = document.getElementById('mcTrack');
      const dotsEl  = document.getElementById('mcDots');
      const catEl   = document.getElementById('mcCategory');
      const titleEl = document.getElementById('mcTitle');
      const prevBtn = document.getElementById('mcPrev');
      const nextBtn = document.getElementById('mcNext');
  
      slides.forEach((s, i) => {
        const slide = document.createElement('div');
        slide.className = 'mcSlide';
        slide.dataset.index = i;
  
        if (s.type === 'video') {
          slide.innerHTML = `
            <video class="mcMedia" autoplay muted loop playsinline>
              <source src="${s.src}" type="video/mp4">
            </video>`;
        } else {
          slide.innerHTML = `<img class="mcMedia" src="${s.src}" alt="${s.title}">`;
        }
  
        track.appendChild(slide);
  
        const dot = document.createElement('button');
        dot.className = 'mcDot';
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsEl.appendChild(dot);
      });
  
      let current = 0;
  
      function goTo(index) {
        const prevSlide = track.querySelectorAll('.mcSlide')[current];
        const prevVideo = prevSlide && prevSlide.querySelector('video');
        if (prevVideo) prevVideo.pause();
  
        current = (index + slides.length) % slides.length;
  
        const slideWidth = track.parentElement.offsetWidth;
        track.style.transform = `translateX(-${current * slideWidth}px)`;
  
        catEl.textContent  = slides[current].category;
        titleEl.textContent = slides[current].title;
  
        document.querySelectorAll('.mcDot').forEach((d, i) => {
          d.classList.toggle('active', i === current);
        });
  
        prevBtn.style.opacity = current === 0 ? '0.3' : '1';
        nextBtn.style.opacity = current === slides.length - 1 ? '0.3' : '1';
  
        const nextSlide = track.querySelectorAll('.mcSlide')[current];
        const nextVideo = nextSlide && nextSlide.querySelector('video');
        if (nextVideo) {
          nextVideo.currentTime = 0;
          nextVideo.play().catch(() => {});
        }
      }
  
      goTo(0);
  
      prevBtn.addEventListener('click', () => goTo(current - 1));
      nextBtn.addEventListener('click', () => goTo(current + 1));
  
      let touchStartX = 0;
      let touchStartY = 0;
      let isDragging  = false;
  
      track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isDragging  = false;
      }, { passive: true });
  
      track.addEventListener('touchmove', (e) => {
        const dx = e.touches[0].clientX - touchStartX;
        const dy = e.touches[0].clientY - touchStartY;
        if (!isDragging && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
          isDragging = true;
        }
      }, { passive: true });
  
      track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) {
          goTo(dx < 0 ? current + 1 : current - 1);
        }
        isDragging = false;
      }, { passive: true });
  
      window.addEventListener('resize', () => {
        if (!isMobile()) {
          if (existingExp) existingExp.style.display = '';
          if (existingPracticeSection) existingPracticeSection.style.display = '';
          wrapper.style.display = 'none';
        } else {
          wrapper.style.display = '';
          if (existingExp) existingExp.style.display = 'none';
          if (existingPracticeSection) existingPracticeSection.style.display = 'none';
          requestAnimationFrame(() => goTo(current));
        }
      });
    }
  
    function disableCursor() {
      if (!isMobile()) return;
      const cursor = document.getElementById('ambient-cursor');
      if (cursor) cursor.style.display = 'none';
      document.documentElement.style.cursor = 'auto';
      document.body.style.cursor = 'auto';
    }
  
    function ensureCardsVisible() {
      if (!isMobile()) return;
      document.querySelectorAll('.dataCS').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.animation = 'none';
      });
    }
  
    document.addEventListener('DOMContentLoaded', () => {
      disableCursor();
      ensureCardsVisible();
      buildCarousel();
    });
  
  }());