<?php
/**
 * Header top partial.
 *
 * Purpose:
 * - Displays the fixed brand bar with logo, social links, and theme toggle.
 *
 * Advantage:
 * - Keeps the reusable top navigation shell separate from page templates.
 */
?>
<header class="header-top">
  <div class="left">
    <div class="logo">
      <img src="assets/img/logo/ds-logo.png" alt="DS Badge" loading="eager" decoding="async" fetchpriority="high" />
    </div>
    <span class="brand-name"><b>Dishan De Silva</b></span>
  </div>

  <div class="right">
    <div class="socials">
      <a href="https://www.linkedin.com/in/dishan-de-silva-lk" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-linkedin-in"></i></a>
      <a href="https://github.com/dishandesilva" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i></a>
      <a href="https://www.instagram.com/dishan.de.silva" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-instagram"></i></a>
      <a href="https://www.facebook.com/dishan.de.silva.fb" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-facebook-f"></i></a>
      <a href="https://www.youtube.com/@DishanDeSEEKER" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-youtube"></i></a>
    </div>

    <!-- Theme Toggle Button -->
    <div class="theme-toggle" id="theme-toggle">
      <div class="toggle-switch">
        <div class="toggle-circle">
          <i class="fa-solid fa-moon"></i>
        </div>
      </div>
    </div>
  </div>
</header>
