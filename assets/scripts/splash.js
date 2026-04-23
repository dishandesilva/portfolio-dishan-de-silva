(() => {
  const wallpaper = document.getElementById("wallpaper");
  const typedText = document.getElementById("typedText");
  const enterKey = document.getElementById("enterKey");
  const keys = Array.from(document.querySelectorAll(".key"));
  const preloader = document.getElementById("preloader");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  const keySound = document.getElementById("keypressAudio");

  /* ---------- Wallpaper Parallax ---------- */
  document.addEventListener("mousemove", (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    wallpaper.style.transform = `translate3d(${dx * 10}px, ${
      dy * 8
    }px, 0) rotate(${dx * 0.6}deg)`;
  });

  /* ---------- Typed Text Animation ---------- */
  const phrases = [
    "Software Engineer • Web Developer • Designer",
    "Building elegant web experiences",
    "Coding. Designing. Creating.",
  ];
  let pIndex = 0,
    chIndex = 0;

  function typeLoop() {
    const current = phrases[pIndex];
    if (chIndex <= current.length) {
      typedText.textContent = current.slice(0, chIndex++);
      setTimeout(typeLoop, 40 + Math.random() * 60);
    } else {
      setTimeout(() => {
        const del = setInterval(() => {
          chIndex--;
          typedText.textContent = current.slice(0, chIndex);
          if (chIndex <= 0) {
            clearInterval(del);
            pIndex = (pIndex + 1) % phrases.length;
            setTimeout(typeLoop, 200);
          }
        }, 24);
      }, 1200);
    }
  }
  typeLoop();

  /* ---------- Trigger Preloader ---------- */
  function pressAnimationSequence() {
    enterKey.classList.add("pressed");

    // Respect mute toggle
    if (window.soundControl?.isEnabled()) {
      window.soundControl.play();
    }

    setTimeout(() => enterKey.classList.remove("pressed"), 220);
    setTimeout(runPreloader, 300);
  }

  function onAnyKey() {
    document.removeEventListener("keydown", onAnyKey);
    pressAnimationSequence();
  }
  document.addEventListener("keydown", onAnyKey);
  enterKey.addEventListener("click", pressAnimationSequence);

  /* ---------- Preloader Simulation ---------- */
  function runPreloader() {
    preloader.classList.add("active");
    let progress = 0;
    const loader = setInterval(() => {
      progress += Math.random() * 12;
      if (progress > 98) progress += Math.random() * 2;
      if (progress > 100) progress = 100;
      progressBar.style.width = progress + "%";
      progressText.textContent = Math.floor(progress) + "%";
      if (progress >= 100) {
        clearInterval(loader);
        setTimeout(() => {
          document.body.style.transition = "opacity .5s ease";
          document.body.style.opacity = "0";
          setTimeout(() => (window.location.href = "home.php"), 500);
        }, 350);
      }
    }, 120);
  }
})();

keys.forEach((k) => {
  k.addEventListener("mouseenter", () => k.classList.add("hovered"));
  k.addEventListener("mouseleave", () => k.classList.remove("hovered"));

  k.addEventListener("mousedown", () => {
    k.classList.add("pressed");
    if (window.soundControl?.isEnabled()) window.soundControl.play();
  });

  k.addEventListener("mouseup", () => k.classList.remove("pressed"));

  k.addEventListener("click", () => {
    k.classList.add("pressed");
    if (window.soundControl?.isEnabled()) window.soundControl.play();
    setTimeout(() => k.classList.remove("pressed"), 180);

    if (k === enterKey) return;
    document.removeEventListener("keydown", onAnyKey);
    setTimeout(runPreloader, 220);
  });
});