(function(){
    'use strict';
    console.log("reading js");

    const csInfo = document.getElementById('caseStudy');
    // const garden = document.getElementById('garden');

    // Amplfy
    document.getElementById('bridgegood').addEventListener('mouseover', function() {
        csInfo.innerHTML = '<div><h1>Amplfy</h1><p>A living network that turns opportunities into results</p></div><div><img src="images/amplfyImages.png" alt="Frame from Amplfy application" height="437px" width="916px"></div>';
        // garden.style.animationPlayState = 'paused';
    });
    // document.getElementById('bridgegood').addEventListener('mouseout', function() {
    //   csInfo.innerHTML = '<div><h1></h1><p></p></div><div><img src="" alt="" height="" width=""></div>';
    //     // garden.style.animationPlayState = 'running';
    // });

    // TAP Series
    document.getElementById('tapSeries').addEventListener('mouseover', function() {
      csInfo.innerHTML = '<div><h1>TAP Series</h1><p>Designing better interfaces and streamlining 50K+ weekly marketing lead workflow</p></div><div><img src="images/tapSeriesImages.png" alt="Frames from TAP Series website projects" height="475px" width="870px"></div>';
    });

    // GSt
    document.getElementById('gSt').addEventListener('mouseover', function() {
      csInfo.innerHTML = '<div><h1>G Street UX</h1><p>Creating inclusive community spaces from downtown revitalization to vibrant public experiences</p></div><div><img src="images/gStreetImages.png" alt="Images from Davis California G Street, historical arch, team image, current G Street" height="481px" width="939px"></div>';
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
          { threshold: 0.2 } // you can adjust this
        );
    
        observer.observe(footer);
    });
}());