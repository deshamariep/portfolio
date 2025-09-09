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
      csInfo.innerHTML = '<div id="csText"><h1>Amplfy</h1><p>A living network that turns opportunities into results</p></div><div id="csImage"><img src="images/amplfyImages.svg" alt="Frame from Amplfy application" height="398px" width="828px"></div>';
      // garden.style.animationPlayState = 'paused';
  });
  // document.getElementById('bridgegood').addEventListener('mouseout', function() {
  //   csInfo.innerHTML = '<div><h1></h1><p></p></div><div><img src="" alt="" height="" width=""></div>';
  //     // garden.style.animationPlayState = 'running';
  // });

  // TAP Series
  document.getElementById('tapSeries').addEventListener('mouseover', function() {
    csInfo.innerHTML = '<div id="csText"><h1>TAP Series</h1><p>Designing better interfaces and streamlining 50K+ weekly marketing lead workflow</p></div><div id="csImage"><img src="images/tapSeriesImages.svg" alt="Frames from TAP Series website projects" height="475px" width="867px"></div>';
  });

  // GSt
  document.getElementById('gSt').addEventListener('mouseover', function() {
    csInfo.innerHTML = '<div id="csText"><h1>G Street UX</h1><p>Creating inclusive community spaces from downtown revitalization to vibrant public experiences</p></div><div id="csImage"><img src="images/gStreetImages.svg" alt="Images from Davis California G Street, historical arch, team image, current G Street" height="475px" width="927px"></div>';
  });

   // Spots
   document.getElementById('spotsCS').addEventListener('mouseover', function() {
    csInfo.innerHTML = '<div id="csText"><h1>Spots</h1><p>A centralized hub connecting students with housing, roommates, and community.</p></div><div id="csImage"><img src="images/spotsImages.svg" alt="Frames from Spots website application" height="475px" width="811px"></div>';
  });

  // Ume
  document.getElementById('umeCS').addEventListener('mouseover', function() {
    csInfo.innerHTML = '<div id="csText"><h1>UME Tea</h1><p>Transforming marketing strategy through comprehensive analysis and targeted campaign development</p></div><div id="csImage"><img src="images/umeTeaImages.svg" alt="Images from UME Tea Marketing Case Study, pie chart segmentation, graph chart customer values, user persona" height="475px" width="712px"></div>';
  });

  // pre-load images
  const preloadImages = [
    "images/amplfyImages.svg",
    "images/tapSeriesImages.svg",
    "images/gStreetImages.svg",
    "images/spotsImages.svg",
    "images/umeTeaImages.svg"
  ];
  
  preloadImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // logo and h3 stay without hover
  const logos = document.querySelectorAll('.logo');

  logos.forEach(logo => {
    logo.addEventListener('mouseenter', () => {
      // Remove active class from all logos
      logos.forEach(l => l.classList.remove('active'));
      // Add it to the one being hovered
      logo.classList.add('active');
    });
  });

  // garden.addEventListener('mouseout', function() {
  //     plantInfo.innerHTML = '<h3> <- hover for info</h3>';
  // });

  // pop-up
  const bridgegoodLogo = document.getElementById("bridgegood");
  const popup = document.getElementById("popup");
  
  bridgegoodLogo.addEventListener("click", (e) => {
    e.preventDefault(); // prevent navigation
  
    popup.classList.add("show");
  
    // Hide after 2 seconds
    setTimeout(() => {
      popup.classList.add("hide");
      setTimeout(() => {
        popup.classList.remove("show", "hide");
        popup.style.display = "none";
      }, 500); // wait for fade-out transition
    }, 1500);
  
    // Reset display for fade-in
    popup.style.display = "flex";
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
        { threshold: 0.1 } // you can adjust this
      );
  
      observer.observe(footer);
  });
}());
