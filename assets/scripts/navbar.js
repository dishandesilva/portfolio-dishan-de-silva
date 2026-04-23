document.addEventListener("DOMContentLoaded", () => {
  const navItems = [...document.querySelectorAll(".nav-right li")];
  const sections = navItems
    .map((item) => {
      const section = document.getElementById(item.dataset.section);
      if (!section) return null;

      return {
        item,
        section,
      };
    })
    .filter(Boolean);

  if (!sections.length) return;

  function setActiveItem(sectionId) {
    navItems.forEach((item) => {
      item.classList.toggle("active", item.dataset.section === sectionId);
    });
  }

  function getActiveSectionId() {
    const viewportMarker = window.innerHeight * 0.35;
    let activeSectionId = sections[0].section.id;

    for (const entry of sections) {
      const rect = entry.section.getBoundingClientRect();

      if (rect.top <= viewportMarker && rect.bottom > viewportMarker) {
        activeSectionId = entry.section.id;
        break;
      }

      if (rect.top <= viewportMarker) {
        activeSectionId = entry.section.id;
      }
    }

    const nearPageBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;

    if (nearPageBottom) {
      activeSectionId = sections[sections.length - 1].section.id;
    }

    return activeSectionId;
  }

  function syncActiveSection() {
    setActiveItem(getActiveSectionId());
  }

  syncActiveSection();
  window.addEventListener("scroll", syncActiveSection, { passive: true });
  window.addEventListener("resize", syncActiveSection);
  window.addEventListener("load", syncActiveSection);

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const target = document.getElementById(item.dataset.section);
      if (!target) return;

      setActiveItem(item.dataset.section);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
