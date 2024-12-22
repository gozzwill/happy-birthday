// Reveal Message
document.getElementById('revealButton').addEventListener('click', function () {
  const message = document.getElementById('message');
  message.classList.remove('hidden');

  // Add delay for animation
  const fadeElements = message.querySelectorAll('.fade-in');
  fadeElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.5}s`;
  });

  // Start Confetti
  startConfetti();
});

// Confetti Effect
function startConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confetti = Array.from({ length: 200 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 4 + 1,
    d: Math.random() * 100 + 10,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    tilt: Math.random() * 10 - 5,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((c) => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fillStyle = c.color;
      ctx.fill();
      ctx.closePath();
    });
  }

  function update() {
    confetti.forEach((c) => {
      c.y += Math.random() * 2 + 1;
      c.x += Math.random() * 2 - 1;
      c.tilt += Math.random() * 2 - 1;

      if (c.y > canvas.height) {
        c.y = -10;
        c.x = Math.random() * canvas.width;
      }
    });
  }

  function loop() {
    draw();
    update();
    requestAnimationFrame(loop);
  }

  loop();
}