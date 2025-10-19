// Uydu animasyonu: ileri - bekle - geri - bekle döngüsü
document.addEventListener('DOMContentLoaded', () => {
  const satellite = document.querySelector('.satellite');
  if (!satellite) return;

  let direction = 1; // 1 = sol->sağ, -1 = sağ->sol
  let progress = 0;  // 0–1 arası
  let lastTime = null;
  let waiting = false;

  const DURATION = 6000; // 1 tam dönüş süresi (ms)
  const WAIT_TIME = 3000; // bekleme süresi (ms)
  
  function animate(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const delta = timestamp - lastTime;
    lastTime = timestamp;

    if (!waiting) {
      progress += (delta / DURATION) * direction;

      if (progress >= 1 || progress <= 0) {
        progress = Math.max(0, Math.min(1, progress));
        waiting = true;
        setTimeout(() => {
          direction *= -1;
          waiting = false;
          lastTime = null;
        }, WAIT_TIME);
      }
    }

    const x = progress * 100;
    const y = 100 - progress * 100;
    satellite.style.transform = `translate(${x}vw, ${y}vh) rotate(${progress * 360 * direction}deg)`;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});
