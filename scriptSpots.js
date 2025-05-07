(function(){
    'use strict';
    console.log('running js');

    const sections = document.querySelectorAll('.spaceBtwn');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          entry.target.classList.toggle('active', entry.isIntersecting);
        });
    }, { threshold: 0.5 });
    sections.forEach(section => observer.observe(section));
    
    document.addEventListener("DOMContentLoaded", function() {
        const waitElement = document.getElementById('wait');
        const segments = waitElement.querySelectorAll("div");
    
        const windowHeight = window.innerHeight;
        const offset = -75; // Adjust offset as needed
    
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= offset &&
                rect.top <= windowHeight
            );
        }
    
        function handleScroll() {
            segments.forEach((segment, index) => {
                const svg = segment.querySelector("svg");
                if (isElementInViewport(segment)) {
                    svg.classList.add("animate");
                }
            });
        }
    
        window.addEventListener("scroll", handleScroll);
    });

    
    document.addEventListener('DOMContentLoaded', function() {
        var pElement = document.querySelector('#center p');
        var text = pElement.textContent;
        var newText = text.replace(/(How might we)/, '<strong>$1</strong>');
        pElement.innerHTML = newText;
    });

    
    let slideIndex = 0; 
    let timer;
    let isPlaying = true; 
    
    function initSlideshow() {
        showSlide(slideIndex); 
        startSlideShow();
    }
    
    function showSlide(index) {
        const slides = document.querySelectorAll('.slide');
        
        if (index >= slides.length) {
            slideIndex = 0;
        } else if (index < 0) {
            slideIndex = slides.length - 1;
        }
        
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        slides[slideIndex].classList.add('active');
    }
    
    function changeSlide(direction) {
        slideIndex += direction;
        showSlide(slideIndex);
        resetTimer(); 
    }
    
    function togglePlayPause() {
        const playPauseButton = document.querySelector('.playPause');
        
        if (isPlaying) {
            clearInterval(timer); 
            playPauseButton.textContent = '⏵';
        } else {
            startSlideShow(); 
            playPauseButton.textContent = '⏸';
        }
        
        isPlaying = !isPlaying;
    }
    
    function startSlideShow() {
        timer = setInterval(function() {
            slideIndex++;
            showSlide(slideIndex);
        }, 2500); 
    }
    
    function resetTimer() {
        clearInterval(timer);
        startSlideShow();
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        initSlideshow();
        
        const prevButton = document.querySelector('.prev');
        const nextButton = document.querySelector('.next');
        const playPauseButton = document.querySelector('.playPause');
        
        prevButton.addEventListener('click', function() {
            changeSlide(-1);
        });
        
        nextButton.addEventListener('click', function() {
            changeSlide(1);
        });
        
        playPauseButton.addEventListener('click', function() {
            togglePlayPause();
        });
    });
    
    document.addEventListener('DOMContentLoaded', function() {
        const images = document.querySelectorAll('.popup-img');
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
    
        images.forEach(function(img, index) {
            img.addEventListener('click', function() {
                overlay.style.display = 'flex';
                img.classList.add('selected');
    
                // Apply centering and scaling transform
                img.style.transform = 'translate(-50%, -50%) scale(' + (index === 5 ? 1.5 : 2) + ')';
            });
    
            overlay.addEventListener('click', function() {
                overlay.style.display = 'none';
                img.classList.remove('selected');
    
                // Reset transform on click outside
                img.style.transform = '';
            });
        });
    });
    
    
}());