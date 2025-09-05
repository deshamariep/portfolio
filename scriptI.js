(function(){
    'use strict';
    console.log("reading js");
    
    let snapped = false;
    document.addEventListener("scroll", function () {
      // if user is at the very top, reset snapped
      if (window.scrollY === 0) {
        snapped = false;
      }

      // only snap if user starts at top and scrolls past 8px
      if (!snapped && window.scrollY > 8) {
        snapped = true;
        window.scrollTo({
        top: 800,
        behavior: "smooth"
        });
      }
    });


    const csInfo = document.getElementById('caseStudy');
    // const garden = document.getElementById('garden');

    // Amplfy
    document.getElementById('bridgegood').addEventListener('mouseover', function() {
        csInfo.innerHTML = '<div><h1>Amplfy</h1><p>A living network that turns opportunities into results</p></div><div><img src="images/amplfyImages.png" alt="Frame from Amplfy application" height="475px" width="954px"></div>';
        // garden.style.animationPlayState = 'paused';
    });
    // document.getElementById('bridgegood').addEventListener('mouseout', function() {
    //   csInfo.innerHTML = '<div><h1></h1><p></p></div><div><img src="" alt="" height="" width=""></div>';
    //     // garden.style.animationPlayState = 'running';
    // });

    // TAP Series
    document.getElementById('tapSeries').addEventListener('mouseover', function() {
      csInfo.innerHTML = '<div><h1>TAP Series</h1><p>Designing better interfaces and streamlining 50K+ weekly marketing lead workflow</p></div><div><img src="images/tapSeriesImages.png" alt="Frames from TAP Series website projects" height="475px" width="867px"></div>';
    });

    // GSt
    document.getElementById('gSt').addEventListener('mouseover', function() {
      csInfo.innerHTML = '<div><h1>G Street UX</h1><p>Creating inclusive community spaces from downtown revitalization to vibrant public experiences</p></div><div><img src="images/gStreetImages.png" alt="Images from Davis California G Street, historical arch, team image, current G Street" height="475px" width="927px"></div>';
    });

     // Spots
     document.getElementById('spotsCS').addEventListener('mouseover', function() {
      csInfo.innerHTML = '<div><h1>Spots</h1><p>A centralized hub connecting students with housing, roommates, and community.</p></div><div><img src="images/spotsImages.png" alt="Frames from Spots website application" height="475px" width="811px"></div>';
    });

    // Ume
    document.getElementById('umeCS').addEventListener('mouseover', function() {
      csInfo.innerHTML = '<div><h1>UME Tea</h1><p>Transforming marketing strategy through comprehensive analysis and targeted campaign development</p></div><div><img src="images/umeTeaImages.png" alt="Images from UME Tea Marketing Case Study, pie chart segmentation, graph chart customer values, user persona" height="475px" width="712px"></div>';
    });

    // h3s slide and logo scales
    const logos = document.querySelectorAll('.logo');

    logos.forEach(logo => {
      const img = logo.querySelector('img');
      const h3 = logo.querySelector('h3');
    
      logo.addEventListener('mouseenter', () => {
        // Reset all
        logos.forEach(l => {
          const lImg = l.querySelector('img');
          const lH3 = l.querySelector('h3');
          lImg.style.width = "108px";
          lH3.style.opacity = "0";
          lH3.style.transform = "translateX(-50%) translateY(20px)";
        });
    
        // Current logo enlarges and shows h3
        img.style.width = "150px";
        h3.style.opacity = "1";
        h3.style.transform = "translateX(-50%) translateY(0)";
      });
    });

    // garden.addEventListener('mouseout', function() {
    //     plantInfo.innerHTML = '<h3> <- hover for info</h3>';
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
          { threshold: 0.1 } // you can adjust this
        );
    
        observer.observe(footer);
    });
}());