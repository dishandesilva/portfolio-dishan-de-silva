/**
 * Homepage interaction controller.
 *
 * Purpose:
 * - Handles section reveal timing, hero typing, and section-specific motion
 *   behaviors for focus, education, achievements, and timeline interactions.
 *
 * Advantage:
 * - Keeps homepage-only behavior isolated from the global scripts bundle.
 */
const homeMobilePerformanceMode = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
const homeUltraCompactMobile = homeMobilePerformanceMode && window.innerHeight <= 430;
const homeLowEndMobileMode =
  homeMobilePerformanceMode &&
  (homeUltraCompactMobile ||
    Boolean(navigator.connection?.saveData) ||
    (navigator.deviceMemory ? navigator.deviceMemory <= 4 : false) ||
    (navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false));

document.documentElement.classList.toggle("home-low-end-mobile", homeLowEndMobileMode);

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const revealThreshold = homeMobilePerformanceMode ? 0.08 : 0.2;
  const revealRootMargin = homeMobilePerformanceMode ? "0px 0px -8% 0px" : "0px";

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target;
          section.classList.add("visible");

          if (!homeMobilePerformanceMode) {
            // Keep richer stagger animation on larger screens.
            const children = section.querySelectorAll(
              "p, .skill, .project-showcase-card, .project-tab, .achievement-card, .education-card, .focus-card"
            );
            children.forEach((child, index) => {
              child.style.animationDelay = `${index * 0.15}s`;
            });
          }

          observer.unobserve(section);
        }
      });
    },
    { threshold: revealThreshold, rootMargin: revealRootMargin }
  );

  sections.forEach((sec) => {
    if (sec.classList.contains("hero")) {
      sec.classList.add("visible");
      return;
    }

    observer.observe(sec);
  });
});

/* Hero focus direction logic + typing effect
   Behavior:
   - Desktop only: track mouse x position over hero; if left half => focus-left
                   if right half => focus-right
   - Default: no focus classes (clear)
   - Tablet/mobile (<=1024px): logic disabled (iframe hidden)
*/

document.addEventListener("DOMContentLoaded", () => {
  const words = ["a Software Engineer", "a Web Developer", "a Tech Creator"];
  let wi = 0,
    ci = 0,
    deleting = false;
  const typingEl = document.querySelector(".typing");

  if (!typingEl) return;

  function type() {
    const word = words[wi];
    typingEl.textContent = deleting
      ? word.substring(0, ci--)
      : word.substring(0, ci++);
    if (!deleting && ci === word.length + 1) {
      deleting = true;
      setTimeout(type, 900);
      return;
    } else if (deleting && ci === 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
    }
    setTimeout(type, deleting ? 60 : 110);
  }
  type();
});

document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.querySelector(".about-section");
  const aboutName = aboutSection?.querySelector(".bg-name");

  if (!aboutSection || !aboutName) return;

  let aboutSectionVisible = !homeMobilePerformanceMode;
  let ticking = false;

  const updateAboutParallax = () => {
    const rect = aboutSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const progress = (viewportHeight - rect.top) / (rect.height + viewportHeight);
    const clamped = Math.max(0, Math.min(1, progress));
    const translateY = -rect.top * 0.38;
    const scale = 1.03 + clamped * 0.08;
    const opacity = 0.88 + clamped * 0.12;

    aboutName.style.setProperty("--about-name-shift", `${translateY}px`);
    aboutName.style.setProperty("--about-name-scale", scale.toFixed(3));
    aboutName.style.opacity = opacity.toFixed(3);
    ticking = false;
  };

  const onScroll = () => {
    if (!aboutSectionVisible || ticking) {
      return;
    }

    if (!ticking) {
      window.requestAnimationFrame(updateAboutParallax);
      ticking = true;
    }
  };

  if ("IntersectionObserver" in window && homeMobilePerformanceMode) {
    const aboutObserver = new IntersectionObserver(
      (entries) => {
        aboutSectionVisible = entries.some((entry) => entry.isIntersecting);
        if (aboutSectionVisible) {
          updateAboutParallax();
        }
      },
      { threshold: 0.08, rootMargin: "16px 0px" }
    );

    aboutObserver.observe(aboutSection);
  } else {
    aboutSectionVisible = true;
    updateAboutParallax();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
});

document.addEventListener("DOMContentLoaded", () => {
  const focusShell = document.querySelector(".focus-scroll-shell");
  if (!focusShell) return;

  const focusSection = document.querySelector(".focus-section");
  const focusStage = focusShell.querySelector(".focus-scroll-stage");
  const focusGrid = focusShell.querySelector(".focus-grid");
  const focusPrevBtn = focusShell.querySelector(".focus-carousel-btn-prev");
  const focusToggleBtn = focusShell.querySelector(".focus-carousel-toggle");
  const focusNextBtn = focusShell.querySelector(".focus-carousel-btn-next");
  const focusCards = focusGrid ? Array.from(focusGrid.querySelectorAll(".focus-card")) : [];

  if (!focusSection || !focusStage || !focusGrid) return;

  const desktopMedia = window.matchMedia("(min-width: 1025px)");

  const ensureLoopClones = () => {
    if (focusGrid.dataset.loopEnhanced) return;

    const cards = Array.from(focusGrid.children);
    if (cards.length <= 1) return;

    const firstClone = cards[0].cloneNode(true);
    const lastClone = cards[cards.length - 1].cloneNode(true);
    firstClone.dataset.clone = "end";
    lastClone.dataset.clone = "start";
    focusGrid.prepend(lastClone);
    focusGrid.append(firstClone);
    focusGrid.dataset.loopEnhanced = "true";
  };

  let travel = 0;
  let currentX = 0;
  let targetX = 0;
  const ease = 0.12;
  let rafId = null;
  let enabled = desktopMedia.matches;
  let startOffset = 0;
  let focusEngaged = false;
  let minX = 0;
  let maxX = 0;
  let snapLocked = false;
  let hasInitializedFocusStart = false;
  let lastScrollY = window.scrollY;
  let mobilePaused = false;
  let mobileDirection = 1;
  let lastTime = 0;
  const mobileSpeed = homeUltraCompactMobile ? 10 : homeMobilePerformanceMode ? 14 : 24;
  let mobileAutoPlayEnabled = !homeMobilePerformanceMode;

  const syncAutoToggle = (button, isOn, label) => {
    if (!button) return;

    const icon = button.querySelector("i");
    const text = button.querySelector(".control-label");
    button.setAttribute("aria-pressed", isOn ? "true" : "false");
    button.setAttribute("aria-label", `${isOn ? "Turn off" : "Turn on"} ${label} auto slide`);

    if (icon) {
      icon.className = isOn ? "fas fa-pause" : "fas fa-play";
    }

    if (text) {
      text.textContent = isOn ? "Auto Slide On" : "Auto Slide Off";
    }
  };

  const getFocusStep = () => {
    const firstCard = focusGrid.querySelector(".focus-card:not([data-clone])") || focusGrid.querySelector(".focus-card");
    const gap = parseFloat(getComputedStyle(focusGrid).gap || "22") || 22;
    return firstCard ? firstCard.getBoundingClientRect().width + gap : 320;
  };

  const updateDimensions = () => {
    enabled = desktopMedia.matches;

    if (!enabled) {
      focusSection.classList.add("focus-mobile-carousel");
      focusSection.classList.remove("focus-scroll-active");
      travel = Math.max(0, focusGrid.scrollWidth - focusStage.clientWidth);
      minX = 0;
      maxX = travel;
      currentX = Math.max(minX, Math.min(currentX, maxX));
      targetX = currentX;
      focusEngaged = false;
      snapLocked = false;
      focusGrid.style.setProperty("--focus-track-x", `${-currentX}px`);
      syncAutoToggle(focusToggleBtn, mobileAutoPlayEnabled, "focus");
      return;
    }

    ensureLoopClones();
    focusSection.classList.add("focus-scroll-active");
    focusSection.classList.remove("focus-mobile-carousel");

    const firstCard = focusGrid.children[0];
    const gap = parseFloat(getComputedStyle(focusGrid).gap || "22") || 22;
    startOffset = firstCard ? firstCard.getBoundingClientRect().width + gap : 0;
    travel = Math.max(0, focusGrid.scrollWidth - focusStage.clientWidth);
    minX = 0;
    maxX = travel;
    if (!hasInitializedFocusStart) {
      currentX = Math.max(minX, Math.min(startOffset, maxX));
      targetX = currentX;
      hasInitializedFocusStart = true;
    } else {
      currentX = Math.max(minX, Math.min(currentX, maxX));
      targetX = Math.max(minX, Math.min(targetX, maxX));
    }
    focusGrid.style.setProperty("--focus-track-x", `${-currentX}px`);
    syncAutoToggle(focusToggleBtn, mobileAutoPlayEnabled, "focus");
  };

  const getStageRect = () => focusStage.getBoundingClientRect();

  const isFocusCentered = () => {
    const rect = getStageRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const centerY = viewportHeight / 2;
    const band = Math.max(48, viewportHeight * 0.12);
    return rect.top <= centerY + band && rect.bottom >= centerY - band;
  };

  const onWheel = (event) => {
    if (!enabled || travel <= 0) return;

    const goingDown = event.deltaY > 0;
    const goingUp = event.deltaY < 0;
    const atStart = targetX <= minX + 0.5;
    const atEnd = targetX >= maxX - 0.5;
    const centered = isFocusCentered();

    if (!focusEngaged && centered && ((goingDown && !atEnd) || (goingUp && !atStart))) {
      focusEngaged = true;
    }

    if (!focusEngaged) return;

    if ((goingDown && !atEnd) || (goingUp && !atStart)) {
      event.preventDefault();
      targetX += event.deltaY * 1.45;
      targetX = Math.max(minX, Math.min(maxX, targetX));
      return;
    }

    if ((goingDown && atEnd) || (goingUp && atStart)) {
      focusEngaged = false;
    }
  };

  const maybeSnapFocusIntoView = () => {
    if (!enabled || snapLocked || focusEngaged) return;

    const scrollingDown = window.scrollY > lastScrollY;
    if (!scrollingDown) return;

    const rect = focusSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const intro = focusSection.querySelector(".section-intro");
    const introRect = intro?.getBoundingClientRect();
    const partiallyVisible =
      rect.top < viewportHeight * 0.88 &&
      rect.bottom > viewportHeight * 0.18;
    const introVisible = introRect
      ? introRect.bottom <= viewportHeight * 0.92 && introRect.top >= -40
      : true;
    const centeredEnough = isFocusCentered();

    if (partiallyVisible && introVisible && !centeredEnough) {
      snapLocked = true;
      focusSection.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => {
        snapLocked = false;
      }, 700);
    }
  };

  const animate = () => {
    if (!enabled) {
      const tick = (time) => {
        if (desktopMedia.matches) {
          rafId = null;
          lastTime = 0;
          return;
        }

        if (!mobileAutoPlayEnabled) {
          rafId = null;
          lastTime = 0;
          return;
        }

        if (!lastTime) {
          lastTime = time;
        }

        const delta = (time - lastTime) / 1000;
        lastTime = time;

        if (mobileAutoPlayEnabled && !mobilePaused && maxX > 0) {
          currentX += mobileDirection * mobileSpeed * delta;

          if (currentX >= maxX) {
            currentX = maxX;
            mobileDirection = -1;
          } else if (currentX <= minX) {
            currentX = minX;
            mobileDirection = 1;
          }

          focusGrid.style.setProperty("--focus-track-x", `${-currentX}px`);
        }

        rafId = window.requestAnimationFrame(tick);
      };

      rafId = window.requestAnimationFrame(tick);
      return;
    }

    lastTime = 0;
    currentX += (targetX - currentX) * ease;
    if (Math.abs(targetX - currentX) < 0.2) currentX = targetX;
    focusGrid.style.setProperty("--focus-track-x", `${-currentX}px`);
    rafId = requestAnimationFrame(animate);
  };

  const stepMobileFocus = (direction) => {
    if (desktopMedia.matches || maxX <= 0) return;

    mobileDirection = direction >= 0 ? 1 : -1;
    currentX += getFocusStep() * mobileDirection;
    currentX = Math.max(minX, Math.min(maxX, currentX));
    targetX = currentX;
    focusGrid.style.setProperty("--focus-track-x", `${-currentX}px`);
  };

  const refresh = () => {
    updateDimensions();

    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
      lastTime = 0;
    }

    if (enabled) {
      mobilePaused = false;
      mobileDirection = 1;
    }

    animate();
  };

  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("scroll", () => {
    if (!enabled) return;
    if (!isFocusCentered() && Math.abs(targetX - currentX) < 0.5) {
      focusEngaged = false;
    }
    maybeSnapFocusIntoView();
    lastScrollY = window.scrollY;
  }, { passive: true });
  window.addEventListener("resize", refresh);
  if (typeof desktopMedia.addEventListener === "function") {
    desktopMedia.addEventListener("change", refresh);
  } else if (typeof desktopMedia.addListener === "function") {
    desktopMedia.addListener(refresh);
  }
  window.addEventListener("load", refresh);
  focusToggleBtn?.addEventListener("click", () => {
    if (desktopMedia.matches) return;
    mobileAutoPlayEnabled = !mobileAutoPlayEnabled;
    mobilePaused = false;
    syncAutoToggle(focusToggleBtn, mobileAutoPlayEnabled, "focus");

    if (mobileAutoPlayEnabled && !rafId) {
      animate();
    }

    if (!mobileAutoPlayEnabled && rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
      lastTime = 0;
    }
  });
  focusPrevBtn?.addEventListener("click", () => {
    stepMobileFocus(-1);
  });
  focusNextBtn?.addEventListener("click", () => {
    stepMobileFocus(1);
  });

  focusCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      if (!enabled) return;

      const rect = card.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
      const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

      card.style.setProperty("--focus-card-tilt-x", `${offsetX * 12}px`);
      card.style.setProperty("--focus-card-tilt-y", `${offsetY * 10}px`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--focus-card-tilt-x", "0px");
      card.style.setProperty("--focus-card-tilt-y", "0px");
    });
  });

  refresh();
});

document.addEventListener("DOMContentLoaded", () => {
  const experienceSection = document.querySelector(".experience-section");
  const timelineList = experienceSection?.querySelector(".timeline-list");
  const timelineItems = timelineList ? Array.from(timelineList.querySelectorAll(".timeline-item")) : [];

  if (!experienceSection || !timelineList || !timelineItems.length) return;

  let experienceSectionVisible = !homeMobilePerformanceMode;
  let ticking = false;

  const updateExperienceTimeline = () => {
    const sectionRect = experienceSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const progress = (viewportHeight * 0.72 - sectionRect.top) / (sectionRect.height + viewportHeight * 0.16);
    const clamped = Math.max(0, Math.min(1, progress));

    timelineList.style.setProperty("--experience-progress", `${clamped * 100}%`);

    timelineItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const visible = rect.top < viewportHeight * 0.82 && rect.bottom > viewportHeight * 0.18;
      item.classList.toggle("is-visible", visible);
    });

    ticking = false;
  };

  const onExperienceScroll = () => {
    if (!experienceSectionVisible || ticking) {
      return;
    }

    if (!ticking) {
      window.requestAnimationFrame(updateExperienceTimeline);
      ticking = true;
    }
  };

  if ("IntersectionObserver" in window && homeMobilePerformanceMode) {
    const experienceObserver = new IntersectionObserver(
      (entries) => {
        experienceSectionVisible = entries.some((entry) => entry.isIntersecting);
        if (experienceSectionVisible) {
          updateExperienceTimeline();
        }
      },
      { threshold: 0.08, rootMargin: "16px 0px" }
    );

    experienceObserver.observe(experienceSection);
  } else {
    experienceSectionVisible = true;
    updateExperienceTimeline();
  }

  window.addEventListener("scroll", onExperienceScroll, { passive: true });
  window.addEventListener("resize", onExperienceScroll);
});

document.addEventListener("DOMContentLoaded", () => {
  const educationShell = document.querySelector(".education-scroll-shell");
  if (!educationShell) return;

  const educationStage = educationShell.querySelector(".education-scroll-stage");
  const educationGrid = educationShell.querySelector(".education-grid");
  const educationPrevBtn = educationShell.querySelector(".education-carousel-btn-prev");
  const educationToggleBtn = educationShell.querySelector(".education-carousel-toggle");
  const educationNextBtn = educationShell.querySelector(".education-carousel-btn-next");
  const originalCards = educationGrid
    ? Array.from(educationGrid.querySelectorAll(".education-card"))
    : [];

  if (!educationStage || !educationGrid || !originalCards.length) return;

  if (!educationGrid.dataset.carouselReady) {
    originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.dataset.clone = "true";
      educationGrid.appendChild(clone);
    });
    educationGrid.dataset.carouselReady = "true";
  }

  let enabled = false;
  let maxOffset = 0;
  let currentX = 0;
  let direction = 1;
  let rafId = null;
  let lastTime = 0;
  let hoverPaused = false;
  let autoPlayEnabled = !homeMobilePerformanceMode;
  let hoverCard = null;

  const speed = 28;

  const setEnabled = () => {
    enabled = true;
  };

  const getStep = () => {
    const firstCard = educationGrid.querySelector(".education-card");
    const gap = parseFloat(getComputedStyle(educationGrid).gap || "22") || 22;
    return firstCard ? firstCard.getBoundingClientRect().width + gap : 320;
  };

  const updateToggle = () => {
    const icon = educationToggleBtn?.querySelector("i");
    const label = educationToggleBtn?.querySelector(".control-label");
    educationToggleBtn?.setAttribute("aria-pressed", autoPlayEnabled ? "true" : "false");
    educationToggleBtn?.setAttribute("aria-label", `${autoPlayEnabled ? "Turn off" : "Turn on"} education auto slide`);
    if (icon) icon.className = autoPlayEnabled ? "fas fa-pause" : "fas fa-play";
    if (label) label.textContent = autoPlayEnabled ? "Auto Slide On" : "Auto Slide Off";
  };

  const updateDimensions = () => {
    setEnabled();

    if (!enabled) {
      educationGrid.style.removeProperty("--education-track-x");
      currentX = 0;
      maxOffset = 0;
      return;
    }

    const cards = Array.from(educationGrid.querySelectorAll(".education-card"));
    const uniqueCount = Math.max(1, cards.length / 2);
    const firstSet = cards.slice(0, uniqueCount);
    const firstSetWidth = firstSet.reduce((total, card) => total + card.offsetWidth, 0);
    const gap = parseFloat(getComputedStyle(educationGrid).gap || "22") || 22;
    maxOffset = Math.max(0, firstSetWidth + gap * Math.max(0, uniqueCount - 1));
    currentX = Math.max(0, Math.min(currentX, maxOffset));
    educationGrid.style.setProperty("--education-track-x", `${-currentX}px`);
    updateToggle();
  };

  const animate = (time) => {
    if (!enabled) {
      rafId = null;
      lastTime = 0;
      return;
    }

    if (!lastTime) {
      lastTime = time;
    }

    const delta = (time - lastTime) / 1000;
    lastTime = time;

    if (autoPlayEnabled && !hoverPaused && maxOffset > 0) {
      currentX += direction * speed * delta;

      if (currentX >= maxOffset) {
        currentX = maxOffset;
        direction = -1;
      } else if (currentX <= 0) {
        currentX = 0;
        direction = 1;
      }

      educationGrid.style.setProperty("--education-track-x", `${-currentX}px`);
    }

    if (hoverCard) {
      const glowShift = direction > 0 ? 1 : -1;
      hoverCard.style.setProperty("--education-glow-shift", `${glowShift * 12}px`);
    }

    rafId = window.requestAnimationFrame(animate);
  };

  const refresh = () => {
    updateDimensions();

    if (enabled) {
      if (!rafId && autoPlayEnabled) {
        rafId = window.requestAnimationFrame(animate);
      }
    } else if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
      lastTime = 0;
    }
  };

  educationStage.addEventListener("mouseenter", () => {
    hoverPaused = true;
  });

  educationStage.addEventListener("mouseleave", () => {
    hoverPaused = false;
  });

  Array.from(educationGrid.querySelectorAll(".education-card")).forEach((card) => {
    card.addEventListener("mouseenter", () => {
      hoverPaused = true;
      hoverCard = card;
    });

    card.addEventListener("mouseleave", () => {
      hoverCard = null;
      hoverPaused = false;
      card.style.removeProperty("--education-glow-shift");
    });
  });

  educationToggleBtn?.addEventListener("click", () => {
    autoPlayEnabled = !autoPlayEnabled;
    updateToggle();

    if (autoPlayEnabled && enabled && !rafId) {
      rafId = window.requestAnimationFrame(animate);
    }

    if (!autoPlayEnabled && rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
      lastTime = 0;
    }
  });

  educationPrevBtn?.addEventListener("click", () => {
    currentX = Math.max(0, currentX - getStep());
    direction = -1;
    educationGrid.style.setProperty("--education-track-x", `${-currentX}px`);
  });

  educationNextBtn?.addEventListener("click", () => {
    currentX = Math.min(maxOffset, currentX + getStep());
    direction = 1;
    educationGrid.style.setProperty("--education-track-x", `${-currentX}px`);
  });

  window.addEventListener("resize", refresh);
  window.addEventListener("load", refresh);

  refresh();
});

document.addEventListener("DOMContentLoaded", () => {
  const achievementsShell = document.querySelector(".achievements-scroll-shell");
  if (!achievementsShell) return;

  const achievementsStage = achievementsShell.querySelector(".achievements-scroll-stage");
  const achievementsGrid = achievementsShell.querySelector(".achievements-grid");
  const achievementsPrevBtn = achievementsShell.querySelector(".achievements-carousel-btn-prev");
  const achievementsToggleBtn = achievementsShell.querySelector(".achievements-carousel-toggle");
  const achievementsNextBtn = achievementsShell.querySelector(".achievements-carousel-btn-next");
  const originalCards = achievementsGrid
    ? Array.from(achievementsGrid.querySelectorAll(".achievement-card"))
    : [];

  if (!achievementsStage || !achievementsGrid || !originalCards.length) return;

  if (!achievementsGrid.dataset.carouselReady) {
    originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.dataset.clone = "true";
      achievementsGrid.appendChild(clone);
    });
    achievementsGrid.dataset.carouselReady = "true";
  }

  let enabled = false;
  let maxOffset = 0;
  let currentX = 0;
  let direction = 1;
  let rafId = null;
  let lastTime = 0;
  let hoverPaused = false;
  let autoPlayEnabled = !homeMobilePerformanceMode;

  const speed = 26;

  const setEnabled = () => {
    enabled = true;
  };

  const getStep = () => {
    const firstCard = achievementsGrid.querySelector(".achievement-card");
    const gap = parseFloat(getComputedStyle(achievementsGrid).gap || "22") || 22;
    return firstCard ? firstCard.getBoundingClientRect().width + gap : 320;
  };

  const updateToggle = () => {
    const icon = achievementsToggleBtn?.querySelector("i");
    const label = achievementsToggleBtn?.querySelector(".control-label");
    achievementsToggleBtn?.setAttribute("aria-pressed", autoPlayEnabled ? "true" : "false");
    achievementsToggleBtn?.setAttribute("aria-label", `${autoPlayEnabled ? "Turn off" : "Turn on"} achievements auto slide`);
    if (icon) icon.className = autoPlayEnabled ? "fas fa-pause" : "fas fa-play";
    if (label) label.textContent = autoPlayEnabled ? "Auto Slide On" : "Auto Slide Off";
  };

  const updateDimensions = () => {
    setEnabled();

    if (!enabled) {
      achievementsGrid.style.removeProperty("--achievement-track-x");
      currentX = 0;
      maxOffset = 0;
      return;
    }

    const cards = Array.from(achievementsGrid.querySelectorAll(".achievement-card"));
    const uniqueCount = Math.max(1, cards.length / 2);
    const firstSet = cards.slice(0, uniqueCount);
    const firstSetWidth = firstSet.reduce((total, card) => total + card.offsetWidth, 0);
    const gap = parseFloat(getComputedStyle(achievementsGrid).gap || "22") || 22;
    maxOffset = Math.max(0, firstSetWidth + gap * Math.max(0, uniqueCount - 1));
    currentX = Math.max(0, Math.min(currentX, maxOffset));
    achievementsGrid.style.setProperty("--achievement-track-x", `${-currentX}px`);
    updateToggle();
  };

  const animate = (time) => {
    if (!enabled) {
      rafId = null;
      lastTime = 0;
      return;
    }

    if (!lastTime) {
      lastTime = time;
    }

    const delta = (time - lastTime) / 1000;
    lastTime = time;

    if (autoPlayEnabled && !hoverPaused && maxOffset > 0) {
      currentX += direction * speed * delta;

      if (currentX >= maxOffset) {
        currentX = maxOffset;
        direction = -1;
      } else if (currentX <= 0) {
        currentX = 0;
        direction = 1;
      }

      achievementsGrid.style.setProperty("--achievement-track-x", `${-currentX}px`);
    }

    rafId = window.requestAnimationFrame(animate);
  };

  const refresh = () => {
    updateDimensions();

    if (enabled) {
      if (!rafId && autoPlayEnabled) {
        rafId = window.requestAnimationFrame(animate);
      }
    } else if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
      lastTime = 0;
    }
  };

  achievementsStage.addEventListener("mouseenter", () => {
    hoverPaused = true;
  });

  achievementsStage.addEventListener("mouseleave", () => {
    hoverPaused = false;
  });

  Array.from(achievementsGrid.querySelectorAll(".achievement-card")).forEach((card) => {
    card.addEventListener("mouseenter", () => {
      hoverPaused = true;
    });

    card.addEventListener("mouseleave", () => {
      hoverPaused = false;
    });
  });

  achievementsToggleBtn?.addEventListener("click", () => {
    autoPlayEnabled = !autoPlayEnabled;
    updateToggle();

    if (autoPlayEnabled && enabled && !rafId) {
      rafId = window.requestAnimationFrame(animate);
    }

    if (!autoPlayEnabled && rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
      lastTime = 0;
    }
  });

  achievementsPrevBtn?.addEventListener("click", () => {
    currentX = Math.max(0, currentX - getStep());
    direction = -1;
    achievementsGrid.style.setProperty("--achievement-track-x", `${-currentX}px`);
  });

  achievementsNextBtn?.addEventListener("click", () => {
    currentX = Math.min(maxOffset, currentX + getStep());
    direction = 1;
    achievementsGrid.style.setProperty("--achievement-track-x", `${-currentX}px`);
  });

  window.addEventListener("resize", refresh);
  window.addEventListener("load", refresh);

  refresh();
});
