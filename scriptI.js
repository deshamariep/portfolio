
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
  const csTextH1 = document.querySelector('#csText h1');
  const csTextP = document.querySelector('#csText p');
  const csImage = document.querySelector('#csImage img');
  const csLink = document.querySelector('#caseStudy a');
  
  // helper function to update case study content
  function updateCaseStudy(title, text, imgSrc, imgAlt, imgWidth, imgHeight, linkHref = "#") {
    csTextH1.textContent = title;
    csTextP.textContent = text;
    csImage.src = imgSrc;
    csImage.alt = imgAlt;
    csImage.width = imgWidth;
    csImage.height = imgHeight;
    csLink.href = linkHref;
  }
  
  // Amplify
  document.getElementById('bridgegood').addEventListener('mouseover', function() {
    updateCaseStudy(
      "Amplify",
      "A living network that turns opportunities into results",
      "images/amplfyImages.svg",
      "Frames from Amplify mobile application",
      954,
      475
    );
  });
  
  // TAP Series
  document.getElementById('tapSeries').addEventListener('mouseover', function() {
    updateCaseStudy(
      "TAP Series",
      "Designing better interfaces and streamlining 50K+ weekly marketing lead workflow",
      "images/tapSeriesImages.svg",
      "Frames from TAP Series website projects",
      867,
      475,
      "tapSeries.html"
    );
  });
  
  // G Street
  document.getElementById('gSt').addEventListener('mouseover', function() {
    updateCaseStudy(
      "G Street UX",
      "Creating inclusive community spaces from downtown revitalization to vibrant public experiences",
      "images/gStreetImages.svg",
      "Images from Davis California G Street, historical arch, team image, current G Street",
      927,
      475,
      "gStreet.html"
    );
  });
  
  // Spots
  document.getElementById('spotsCS').addEventListener('mouseover', function() {
    updateCaseStudy(
      "Spots",
      "A centralized hub connecting students with housing, roommates, and community.",
      "images/spotsImages.svg",
      "Frames from Spots website application",
      811,
      475,
      "spots.html"
    );
  });
  
  // UME Tea
  document.getElementById('umeCS').addEventListener('mouseover', function() {
    updateCaseStudy(
      "UME Tea",
      "Transforming marketing strategy through comprehensive analysis and targeted campaign development",
      "images/umeTeaImages.svg",
      "Images from UME Tea Marketing Case Study, pie chart segmentation, graph chart customer values, user persona",
      712,
      475,
      "ume.html"
    );
  });


  // const csInfo = document.getElementById('caseStudy');
  // // const garden = document.getElementById('garden');

  // // Amplfy
  // document.getElementById('bridgegood').addEventListener('mouseover', function() {
  //     csInfo.innerHTML = '<div><h1>Amplfy</h1><p>A living network that turns opportunities into results</p></div><div><img src="images/amplfyImages.png" alt="Frame from Amplfy application" height="475px" width="954px"></div>';
  //     // garden.style.animationPlayState = 'paused';
  // });
  // // document.getElementById('bridgegood').addEventListener('mouseout', function() {
  // //   csInfo.innerHTML = '<div><h1></h1><p></p></div><div><img src="" alt="" height="" width=""></div>';
  // //     // garden.style.animationPlayState = 'running';
  // // });

  // // TAP Series
  // document.getElementById('tapSeries').addEventListener('mouseover', function() {
  //   csInfo.innerHTML = '<div><h1>TAP Series</h1><p>Designing better interfaces and streamlining 50K+ weekly marketing lead workflow</p></div><div><img src="images/tapSeriesImages.png" alt="Frames from TAP Series website projects" height="475px" width="867px"></div>';
  // });

  // // GSt
  // document.getElementById('gSt').addEventListener('mouseover', function() {
  //   csInfo.innerHTML = '<div><h1>G Street UX</h1><p>Creating inclusive community spaces from downtown revitalization to vibrant public experiences</p></div><div><img src="images/gStreetImages.png" alt="Images from Davis California G Street, historical arch, team image, current G Street" height="475px" width="927px"></div>';
  // });

  //  // Spots
  //  document.getElementById('spotsCS').addEventListener('mouseover', function() {
  //   csInfo.innerHTML = '<div><h1>Spots</h1><p>A centralized hub connecting students with housing, roommates, and community.</p></div><div><img src="images/spotsImages.png" alt="Frames from Spots website application" height="475px" width="811px"></div>';
  // });

  // // Ume
  // document.getElementById('umeCS').addEventListener('mouseover', function() {
  //   csInfo.innerHTML = '<div><h1>UME Tea</h1><p>Transforming marketing strategy through comprehensive analysis and targeted campaign development</p></div><div><img src="images/umeTeaImages.png" alt="Images from UME Tea Marketing Case Study, pie chart segmentation, graph chart customer values, user persona" height="475px" width="712px"></div>';
  // });

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
