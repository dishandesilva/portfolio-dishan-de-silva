<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Dishan De Silva | Portfolio Entry</title>
  <meta name="description" content="Interactive splash entry to Dishan De Silva's software engineering portfolio and product showcase.">
  <meta name="author" content="Dishan De Silva">
  <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
  <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
  <link rel="icon" type="image/png" href="assets/img/logo/ds-logo.png" sizes="96x96">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
  <link rel="stylesheet" href="assets/styles/splash.css?v=31">
</head>

<body class="splash-body">
  <div id="customCursor" class="cursor-arrow"></div>

  <!-- Preloader: communicates loading progress before the splash scene is ready. -->
  <div id="preloader" class="preloader" aria-hidden="true">
    <div class="preloader-card" role="status" aria-live="polite">
      <h3>Loading Portfolio...</h3>
      <div class="progress">
        <div id="progressBar" class="bar"></div>
      </div>
      <div id="progressText" class="progress-text">0%</div>
    </div>
  </div>

  <main class="splash-wrap" id="splashWrap" role="main">
    <!-- Visual centerpiece: desktop-inspired branded intro scene. -->
    <div class="imac-wrap" aria-hidden="true">
      <div class="imac-frame" id="imacFrame" aria-hidden="true">
        <div class="screen-inner">
          <div class="screen-wallpaper" id="wallpaper">
            <div class="screen-content">
              <div class="welcome-top">
                <div class="ds-badge"><img src="assets/img/logo/ds-logo.png" alt="DS Badge" loading="eager" decoding="async" fetchpriority="high"></div>
                <div class="title-wrap">
                  <h1 class="title">Welcome to Dishan De Silva's Portfolio</h1>
                  <div class="line">
                    <span class="typed" id="typedText">Software Engineer • Designer • Creator</span>
                    <span class="cursor" aria-hidden="true">|</span>
                  </div>
                  <p class="hint">Press any key or click <strong>Enter</strong> to explore</p>
                </div>
              </div>
            </div>
          </div>
          <div class="screen-reflection"></div>
        </div>
      </div>
    </div>

    <!-- Keyboard interaction area: mirrors the "press enter" invitation. -->
    <div class="keyboard-wrap" id="keyboardWrap" aria-hidden="true">
      <div class="kbd-base"></div>
      <div class="kbd-keys">
        <div class="kbd-row">
          <button class="key small">Esc</button>
          <button class="key sm">F1</button>
          <button class="key sm">F2</button>
          <button class="key sm">F3</button>
        </div>
        <div class="kbd-row">
          <button class="key k-p">Q</button>
          <button class="key k-p">W</button>
          <button class="key k-p">E</button>
          <button class="key k-p">R</button>
          <button class="key k-p">T</button>
          <button class="key k-p">Y</button>
        </div>
        <div class="kbd-row">
          <button class="key k-p">A</button>
          <button class="key k-p">S</button>
          <button class="key k-p">D</button>
          <button class="key k-p">F</button>
          <button class="key k-p">G</button>
        </div>
        <div class="kbd-row last">
          <button class="key small">Ctrl</button>
          <div class="key space" aria-hidden="true"></div>
          <button id="enterKey" class="key enter" title="Enter Portfolio">Enter</button>
        </div>
      </div>
    </div>

    <footer class="splash-footer">
      © 2026 Dishan De Silva • Press <b>Enter</b> to explore
    </footer>
  </main>

  <audio id="keypress-audio" src="assets/audio/key-press.mp3" preload="metadata"></audio>

  <button id="sound-toggle" class="sound-btn" aria-label="Toggle sound">
    <i id="sound-icon" class="fa-solid fa-volume-high"></i>
  </button>

  <script src="assets/scripts/sound.js?v=30" defer></script>
  <script src="assets/scripts/splash.js?v=30" defer></script>
  <script src="assets/scripts/cursor.js?v=30" defer></script>
</body>

</html>
