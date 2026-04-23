const heroCanvas = document.getElementById("hero-bg");
const heroOrbLayer = document.getElementById("heroTechOrbs");
const heroSection = document.getElementById("hero");

if (heroCanvas && heroOrbLayer && heroSection) {
  const heroCtx = heroCanvas.getContext("2d");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const heroMobilePerformanceMode = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
  const homeLowEndMobileMode = document.documentElement.classList.contains("home-low-end-mobile");
  const isUltraCompactMobile = () => heroMobilePerformanceMode && window.innerHeight <= 430;
  const lightThemeLogos = [
    "devicon-java-plain",
    "devicon-react-original",
    "devicon-vscode-plain",
    "devicon-tailwindcss-original",
    "devicon-bootstrap-plain",
    "devicon-nodejs-plain",
    "devicon-php-plain",
    "devicon-html5-plain",
    "devicon-css3-plain",
    "devicon-javascript-plain",
    "devicon-mysql-plain",
    "fa-solid fa-database",
    "devicon-reactnative-original",
    "devicon-git-plain",
    "devicon-github-original",
    "devicon-intellij-plain",
    "devicon-androidstudio-plain",
  ];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationFrameId = null;
  let lastTime = 0;
  let orbs = [];
  let floatingLogos = [];
  let mouseX = 0;
  let mouseY = 0;
  let mouseActive = false;
  const themeRoot = document.documentElement;
  const hasDarkTheme = () =>
    document.body.classList.contains("dark-mode") || themeRoot.classList.contains("dark-mode");
  let darkModeEnabled = hasDarkTheme();
  let themeObserver = null;
  let nextFloatingLogoIndex = 5;
  let heroVisible = true;
  let heroAnimationEnabled = true;
  const darkBubbleMarkup = heroOrbLayer.innerHTML;
  const darkBubbleFallbackMarkup = `
    <div class="bg-bubbles-container dark-only">
      <div class="glass-bubble"></div>
      <div class="glass-bubble"></div>
      <div class="glass-bubble"></div>
      <div class="glass-bubble"></div>
      <div class="glass-bubble"></div>
      <div class="glass-bubble"></div>
    </div>`;

  function getOrbCount() {
    if (isUltraCompactMobile()) return 1;
    if (window.innerWidth < 560) return 2;
    if (window.innerWidth < 768) return 3;
    if (window.innerWidth < 820) return 5;
    if (window.innerWidth < 1200) return 6;
    return 7;
  }

  function getSizeClass(index) {
    const pattern = ["size-md", "size-xl", "size-sm", "size-lg", "size-sm", "size-lg", "size-md"];
    return pattern[index % pattern.length];
  }

  function getShapeClass(index) {
    const pattern = ["shape-a", "shape-b", "shape-c", "shape-d"];
    return pattern[index % pattern.length];
  }

  function getOrbDimensions(sizeClass) {
    if (window.innerWidth < 768) {
      if (sizeClass === "size-sm") return { width: 98, height: 56 };
      if (sizeClass === "size-xl") return { width: 176, height: 96 };
      if (sizeClass === "size-lg") return { width: 148, height: 82 };
      return { width: 124, height: 70 };
    }
    if (window.innerWidth < 1024) {
      if (sizeClass === "size-sm") return { width: 126, height: 70 };
      if (sizeClass === "size-xl") return { width: 228, height: 122 };
      if (sizeClass === "size-lg") return { width: 194, height: 104 };
      return { width: 162, height: 88 };
    }
    if (sizeClass === "size-sm") return { width: 152, height: 82 };
    if (sizeClass === "size-xl") return { width: 286, height: 148 };
    if (sizeClass === "size-lg") return { width: 240, height: 126 };
    return { width: 192, height: 102 };
  }

  function resizeScene() {
    const maxDpr = heroMobilePerformanceMode ? 1 : 2;
    dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    width = window.innerWidth;
    height = window.innerHeight;
    heroCanvas.width = width * dpr;
    heroCanvas.height = height * dpr;
    heroCanvas.style.width = `${width}px`;
    heroCanvas.style.height = `${height}px`;
    heroCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildOrbs();
  }

  function stopAnimation() {
    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    lastTime = 0;
  }

  function startAnimation() {
    if (!animationFrameId && heroAnimationEnabled) {
      animationFrameId = window.requestAnimationFrame(animate);
    }
  }

  function syncHeroAnimationState() {
    heroAnimationEnabled = !heroMobilePerformanceMode || heroVisible;

    if (!heroAnimationEnabled) {
      stopAnimation();
      return;
    }

    startAnimation();
  }

  function getFloatingLogoCount() {
    if (isUltraCompactMobile()) return 1;
    if (window.innerWidth < 560) return 2;
    if (window.innerWidth < 768) return 3;
    return 5;
  }

  function getLogoSize(index) {
    if (isUltraCompactMobile()) {
      const pattern = [38, 42];
      return pattern[index % pattern.length];
    }
    if (window.innerWidth < 768) {
      const pattern = [44, 52, 48, 56, 46];
      return pattern[index % pattern.length];
    }
    if (window.innerWidth < 1200) {
      const pattern = [60, 76, 64, 82, 58];
      return pattern[index % pattern.length];
    }
    const pattern = [68, 88, 72, 96, 64];
    return pattern[index % pattern.length];
  }

  function getNextFloatingToken(index) {
    if (index < 5) {
      return { logoClass: lightThemeLogos[index] };
    }

    const logoClass = lightThemeLogos[nextFloatingLogoIndex % lightThemeLogos.length];
    nextFloatingLogoIndex += 1;
    return { logoClass };
  }

  function applyFloatingToken(element, token) {
    element.textContent = "";
    element.className = "hero-tech-float-logo";

    if (token.logoClass) {
      element.className = `hero-tech-float-logo ${token.logoClass}`;
    }
  }

  function buildFloatingLogos() {
    floatingLogos = [];
    nextFloatingLogoIndex = 5;
    const count = getFloatingLogoCount();
    const laneCount = Math.min(window.innerWidth < 768 ? 3 : 4, count);
    const topPadding = window.innerWidth < 768 ? 90 : 110;
    const bottomPadding = window.innerWidth < 768 ? 120 : 140;
    const usableWidth = Math.max(width - 120, 240);
    const slotWidth = usableWidth / count;

    Array.from({ length: count }, (_, index) => {
      const element = document.createElement("i");
      const token = getNextFloatingToken(index);
      applyFloatingToken(element, token);
      heroOrbLayer.appendChild(element);

      const laneIndex = index % laneCount;
      const minLaneGap = isUltraCompactMobile() ? 92 : 120;
      const laneGap = Math.max((height - topPadding - bottomPadding) / laneCount, minLaneGap);
      const baseX = 60 + slotWidth * index + slotWidth * 0.5 + (Math.random() - 0.5) * Math.min(110, slotWidth * 0.48);
      const startY = topPadding + ((height - topPadding - bottomPadding) / Math.max(count, 1)) * index + Math.random() * 80;

      floatingLogos.push({
        element,
        token,
        size: getLogoSize(index),
        x: baseX,
        y: startY,
        baseX,
        baseY: topPadding + laneGap * (laneIndex + 0.5) + (Math.random() - 0.5) * Math.min(54, laneGap * 0.26),
        speed: prefersReducedMotion.matches
          ? 0.007
          : heroMobilePerformanceMode
            ? isUltraCompactMobile()
              ? 0.004 + Math.random() * 0.002
              : 0.006 + Math.random() * 0.004
            : 0.01 + Math.random() * 0.008,
        driftX: heroMobilePerformanceMode
          ? isUltraCompactMobile()
            ? 5 + Math.random() * 8
            : 7 + Math.random() * 14
          : 10 + Math.random() * 24,
        phase: Math.random() * Math.PI * 2,
        mouseOffsetX: 0,
        mouseOffsetY: 0,
      });
    });
  }

  function buildOrbs() {
    floatingLogos = [];
    heroOrbLayer.classList.remove("dark-hero-orbs", "dark-bubble-mode");

    if (darkModeEnabled) {
      orbs = [];
      heroOrbLayer.innerHTML = darkBubbleMarkup.trim() ? darkBubbleMarkup : darkBubbleFallbackMarkup;
      if (heroMobilePerformanceMode) {
        Array.from(heroOrbLayer.querySelectorAll(".glass-bubble")).forEach((bubble, index) => {
          if (index > (isUltraCompactMobile() ? 1 : 2)) bubble.remove();
        });
      }
      heroOrbLayer.classList.add("dark-bubble-mode");
      heroOrbLayer.style.display = "block";
      return;
    }

    heroOrbLayer.innerHTML = "";
    heroOrbLayer.style.display = "block";

    const count = getOrbCount();
    const laneCount = Math.min(window.innerWidth < 768 ? 3 : 4, count);
    const topPadding = window.innerWidth < 768 ? 110 : 120;
    const bottomPadding = window.innerWidth < 768 ? 100 : 120;
    const usableHeight = Math.max(height - topPadding - bottomPadding, 260);
    const laneGap = usableHeight / Math.max(laneCount, 1);

    orbs = Array.from({ length: count }, (_, index) => {
      const laneIndex = index % laneCount;
      const sizeClass = getSizeClass(index);
      const shapeClass = getShapeClass(index);
      const dimensions = getOrbDimensions(sizeClass);
      const element = document.createElement("div");
      element.className = `hero-tech-orb ${sizeClass} ${shapeClass}`;

      const glow = document.createElement("div");
      glow.className = "hero-tech-orb-glow";

      const inner = document.createElement("div");
      inner.className = "hero-tech-orb-inner";

      element.appendChild(glow);
      element.appendChild(inner);
      heroOrbLayer.appendChild(element);

      const direction = index % 2 === 0 ? 1 : -1;
      const baseY = topPadding + laneGap * (laneIndex + 0.5) + (Math.random() - 0.5) * Math.min(44, laneGap * 0.24);
      const startX = direction > 0
        ? (width / count) * index - dimensions.width - Math.random() * 180
        : width - (width / count) * index + Math.random() * 180;
      const startY = baseY;
      const drift = prefersReducedMotion.matches
        ? 4
        : heroMobilePerformanceMode
          ? 5 + Math.random() * 5
          : 8 + Math.random() * 10;
      const speed = prefersReducedMotion.matches
        ? 0.02
        : heroMobilePerformanceMode
          ? 0.018 + Math.random() * 0.012
          : 0.03 + Math.random() * 0.025;

      return {
        element,
        x: startX,
        y: startY,
        baseX: startX,
        baseY,
        width: dimensions.width,
        height: dimensions.height,
        sizeClass,
        direction,
        speed,
        driftX: drift,
        driftY: Math.max(4, drift * 0.55),
        phase: Math.random() * Math.PI * 2,
        mouseOffsetX: 0,
        mouseOffsetY: 0,
      };
    });

    buildFloatingLogos();
  }

  function drawBackground() {
    heroCtx.clearRect(0, 0, width, height);
  }

  function updateMouseInfluence(orb) {
    if (!mouseActive || prefersReducedMotion.matches) {
      orb.mouseOffsetX *= 0.9;
      orb.mouseOffsetY *= 0.9;
      return;
    }

    const centerX = orb.x + orb.width * 0.5;
    const centerY = orb.y + orb.height * 0.5;
    const offsetX = mouseX - centerX;
    const offsetY = mouseY - centerY;
    const distance = Math.hypot(offsetX, offsetY);
    const radius = 180;

    if (distance < radius && distance > 0) {
      const force = (1 - distance / radius) * 14;
      orb.mouseOffsetX += (-offsetX / distance) * force * 0.16;
      orb.mouseOffsetY += (-offsetY / distance) * force * 0.1;
    }

    orb.mouseOffsetX *= 0.9;
    orb.mouseOffsetY *= 0.9;
  }

  function updateLogoMouseInfluence(logo) {
    if (!mouseActive || prefersReducedMotion.matches) {
      logo.mouseOffsetX *= 0.9;
      logo.mouseOffsetY *= 0.9;
      return;
    }

    const offsetX = mouseX - logo.x;
    const offsetY = mouseY - logo.y;
    const distance = Math.hypot(offsetX, offsetY);
    const radius = 140;

    if (distance < radius && distance > 0) {
      const force = (1 - distance / radius) * 10;
      logo.mouseOffsetX += (-offsetX / distance) * force * 0.08;
      logo.mouseOffsetY += (-offsetY / distance) * force * 0.12;
    }

    logo.mouseOffsetX *= 0.9;
    logo.mouseOffsetY *= 0.9;
  }

  function animate(time = 0) {
    if (!heroAnimationEnabled) {
      stopAnimation();
      return;
    }

    const frameInterval = homeLowEndMobileMode ? 50 : heroMobilePerformanceMode ? 33 : 16;

    if (lastTime && time - lastTime < frameInterval) {
      animationFrameId = window.requestAnimationFrame(animate);
      return;
    }

    const delta = Math.min(time - lastTime || 16, homeLowEndMobileMode ? 50 : heroMobilePerformanceMode ? 40 : 32);
    lastTime = time;

    drawBackground();

    orbs.forEach((orb) => {
      orb.baseX += orb.speed * delta * orb.direction;
      if (orb.direction > 0 && orb.baseX > width + orb.width + 80) {
        orb.baseX = -orb.width - 80;
      }
      if (orb.direction < 0 && orb.baseX < -orb.width - 80) {
        orb.baseX = width + 80;
      }

      orb.x = orb.baseX;
      orb.y = orb.baseY + Math.sin(time * 0.00065 + orb.phase) * orb.driftY;
      updateMouseInfluence(orb);

      orb.element.style.setProperty("--orb-x", `${orb.x}px`);
      orb.element.style.setProperty("--orb-y", `${orb.y}px`);
      orb.element.style.setProperty("--orb-mx", `${orb.mouseOffsetX}px`);
      orb.element.style.setProperty("--orb-my", `${orb.mouseOffsetY}px`);
      orb.element.style.opacity = "1";
    });

    floatingLogos.forEach((logo) => {
      logo.y -= logo.speed * delta * 6;
      if (logo.y < -140) {
        logo.y = height + 140 + Math.random() * 220;
        logo.token = getNextFloatingToken(999);
        applyFloatingToken(logo.element, logo.token);
      }

      logo.x = logo.baseX + Math.sin(time * 0.0006 + logo.phase) * logo.driftX;
      updateLogoMouseInfluence(logo);

      logo.element.style.setProperty("--logo-x", `${logo.x}px`);
      logo.element.style.setProperty("--logo-y", `${logo.y}px`);
      logo.element.style.setProperty("--logo-mx", `${logo.mouseOffsetX}px`);
      logo.element.style.setProperty("--logo-my", `${logo.mouseOffsetY}px`);
      logo.element.style.setProperty("--logo-size", `${logo.size}px`);
    });

    animationFrameId = window.requestAnimationFrame(animate);
  }

  function onPointerMove(event) {
    const rect = heroSection.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
    mouseActive = mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height;
  }

  function onPointerLeave() {
    mouseActive = false;
  }

  function handleMotionChange() {
    resizeScene();
  }

  function syncThemeMode() {
    const nextDarkMode = hasDarkTheme();
    if (nextDarkMode !== darkModeEnabled) {
      darkModeEnabled = nextDarkMode;
      resizeScene();
    }
  }

  window.addEventListener("resize", resizeScene);
  if (!heroMobilePerformanceMode) {
    window.addEventListener("mousemove", onPointerMove, { passive: true });
  }
  heroSection.addEventListener("mouseleave", onPointerLeave);
  prefersReducedMotion.addEventListener("change", handleMotionChange);
  themeObserver = new MutationObserver(syncThemeMode);
  themeObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });
  themeObserver.observe(themeRoot, { attributes: true, attributeFilter: ["class"] });

  if (heroMobilePerformanceMode && "IntersectionObserver" in window) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        heroVisible = entries.some((entry) => entry.isIntersecting);
        syncHeroAnimationState();
      },
      { threshold: 0.08, rootMargin: "12px 0px" }
    );

    heroObserver.observe(heroSection);
  }

  resizeScene();
  syncHeroAnimationState();

  window.addEventListener("beforeunload", () => {
    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId);
    }
    prefersReducedMotion.removeEventListener("change", handleMotionChange);
    if (themeObserver) {
      themeObserver.disconnect();
    }
  });
}
