document.addEventListener("DOMContentLoaded", () => {
  const thumb = document.querySelector(".scrollbar-thumb");

  if (!thumb) {
    console.error("Scrollbar element not found!");
    return;
  }

  function updateScrollBar() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    const scrollPercent = (
      (scrollTop / (scrollHeight - clientHeight)) *
      100
    ).toFixed(2);
    thumb.style.width = scrollPercent + "%";
  }

  updateScrollBar(); // set initial
  window.addEventListener("scroll", updateScrollBar);
  window.addEventListener("resize", updateScrollBar);

  console.log("Scrollbar progress active");
});
