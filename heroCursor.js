document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero");
  const canvas = document.getElementById("hero-canvas");

  if (!hero || !canvas) {
    console.error("Hero or canvas not found");
    return;
  }

  const ctx = canvas.getContext("2d");

  let width, height;
  let mouse = { x: 0, y: 0 };
  let points = [];

  function resize() {
    width = canvas.width = hero.offsetWidth;
    height = canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;

    points.push({ x: mouse.x, y: mouse.y, life: 1 });
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);

    points.forEach(p => {
      p.life -= 0.02;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 18, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(120,140,255,${p.life})`;
      ctx.shadowColor = "rgba(120,140,255,0.6)";
      ctx.shadowBlur = 25;
      ctx.fill();
    });

    points = points.filter(p => p.life > 0);
    requestAnimationFrame(draw);
  }

  draw();
});