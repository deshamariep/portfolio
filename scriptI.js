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
      top: 805,
      behavior: "smooth"
      });
    }

    // 🔥 Activate Tap Series automatically after snapping
    const csInfo = document.getElementById('caseStudy');
    csInfo.innerHTML = `
      <div id="csText">
        <h1>TAP Series</h1>
        <p>User Interface | UI/UX Designer | 2025</p>
        <p>Designing better interfaces and streamlining 50K+ weekly marketing lead workflow</p>
        <br>
        <a href="tapSeries.html">Read</a>
      </div>
    `;
    setMainBackground("images/tapbg.svg"); // update background
    document.querySelectorAll('.logo').forEach(l => l.classList.remove('active'));
    document.getElementById('tapSeries').classList.add('active'); // highlight logo
  });

  const mainSec = document.querySelector("main");

  // Reset background when user scrolls up past 805px
  window.addEventListener("scroll", () => {
    if (window.scrollY < 805) {
      mainSec.style.background = "none"; 
      
      csInfo.innerHTML = `
        <div id="csText">
          <h1></h1>
          <p></p>
          <p></p>
        </div>
        <div id="csImage">
          <img src="" alt="" height="" width="">
        </div>
      `;
      logos.forEach(l => l.classList.remove('active'));
    }
  });


  const csInfo = document.getElementById('caseStudy');
  // Amplfy
  document.getElementById('bridgegood').addEventListener('mouseover', function() {
      csInfo.innerHTML = '<div id="csText"><h1>Amplfy</h1><p>Product Design | Product Lead | 2025</p><p>A living network that turns opportunities into results</p><br><a href="#" id="amplfyLink" class="noHover">Coming Soon</a></div>';
  });
  // <div id="csImage"><img src="images/amplfyImages.svg" alt="Frame from Amplfy application" height="398px" width="828px"></div>

  // TAP Series
  document.getElementById('tapSeries').addEventListener('mouseover', function() {
    csInfo.innerHTML = '<div id="csText"><h1>TAP Series</h1><p>User Interface | UI/UX Designer | 2025</p><p>Designing better interfaces and streamlining 50K+ weekly marketing lead workflow</p><br><a href="tapSeries.html">Read</a></div>';
  });
  // <div id="csImage"><img src="images/tapSeriesImages.svg" alt="Frames from TAP Series website projects" height="475px" width="867px"></div>

  // GSt
  document.getElementById('gSt').addEventListener('mouseover', function() {
    csInfo.innerHTML = '<div id="csText"><h1>G Street</h1><p>User Research | UX Designer | 2024</p><p>Creating inclusive community spaces from downtown revitalization to vibrant public experiences</p><br><a href="gStreet.html">Read</a></div>';
  });
  // <div id="csImage"><img src="images/gStreetImages.svg" alt="Images from Davis California G Street, historical arch, team image, current G Street" height="475px" width="927px"></div>

   // Spots
   document.getElementById('spotsCS').addEventListener('mouseover', function() {
    csInfo.innerHTML = '<div id="csText"><h1>Spots</h1><p>Product Design | Associate Designer | 2024</p><p>Case Study: A centralized hub connecting students with housing, roommates, and community.</p><br><a href="spots.html">Read</a></div>';
  });
  // <div id="csImage"><img src="images/spotsImages.svg" alt="Frames from Spots website application" height="475px" width="811px"></div>

  // Ume
  document.getElementById('umeCS').addEventListener('mouseover', function() {
    csInfo.innerHTML = '<div id="csText"><h1>UME Tea</h1><p>Marketing Strategy | Market Analyst | 2023</p><p>Case Study: Transforming marketing strategy through comprehensive analysis and targeted campaign development</p><br><a href="ume.html">Read</a></div>';
  });
  // <div id="csImage"><img src="images/umeTeaImages.svg" alt="Images from UME Tea Marketing Case Study, pie chart segmentation, graph chart customer values, user persona" height="475px" width="712px"></div>
  // pre-load images
  const preloadImages = [
    "images/amplfybg.svg",
    "images/tapSeriesbg.svg",
    "images/gStreetbg.svg",
    "images/spotsbg.svg",
    "images/umeTeabg.svg"
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

  const mainSection = document.querySelector("main");


  // Swap background of MAIN only
  function setMainBackground(image) {
    mainSection.style.background = image
      ? `url("${image}") center/cover no-repeat`
      : "none";   // fallback = transparent, so body gradient shows through
  }
  document.getElementById("bridgegood").addEventListener("mouseenter", () => {
    setMainBackground("images/amplfybg.svg");
  });
  document.getElementById("tapSeries").addEventListener("mouseenter", () => {
    setMainBackground("images/tapbg.svg");
  });
  document.getElementById("gSt").addEventListener("mouseenter", () => {
    setMainBackground("images/gstbg.svg");
  });
  document.getElementById("spotsCS").addEventListener("mouseenter", () => {
    setMainBackground("images/spotsbg.svg");
  });
  document.getElementById("umeCS").addEventListener("mouseenter", () => {
    setMainBackground("images/umebg.svg");
  });


  // pop-up
  const bridgegoodLogo = document.getElementById("bridgegood");
  const popup = document.getElementById("popup");

  function showPopup(e) {
    e.preventDefault();
  
    popup.classList.add("show");
  
    setTimeout(() => {
      popup.classList.add("hide");
      setTimeout(() => {
        popup.classList.remove("show", "hide");
        popup.style.display = "none";
      }, 500);
    }, 1000);
  
    popup.style.display = "flex";
  }

  // Attach popup to logo
  bridgegoodLogo.addEventListener("click", showPopup);

  // Amplfy hover (with link)
  document.getElementById("bridgegood").addEventListener("mouseover", function () {
    csInfo.innerHTML = `
      <div id="csText">
        <h1>Amplfy</h1>
        <p>Product Design | Product Lead | 2025</p>
        <p>A living network that turns opportunities into results</p>
        <br>
        <a href="#" id="amplfyLink" class="noHover">Coming Soon</a>
      </div>
    `;
  
    // add click handler for the <a>
    const amplfyLink = document.getElementById("amplfyLink");
    if (amplfyLink) {
      amplfyLink.addEventListener("click", showPopup);
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
        { threshold: 0.1 }
      );
  
      observer.observe(footer);
  });
}());
