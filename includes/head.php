<!DOCTYPE html>
<html lang="en">

<head>
  <?php
  $pageTitle = isset($pageTitle) && $pageTitle !== ''
    ? $pageTitle
    : 'Dishan De Silva | Portfolio';
  $pageDescription = isset($pageDescription) && $pageDescription !== ''
    ? $pageDescription
    : 'Portfolio of Dishan De Silva, software engineer and full-stack developer.';

  $scriptDir = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/'));
  $normalizedBase = rtrim($scriptDir, '/');
  if ($normalizedBase === '') {
    $normalizedBase = '/';
  }
  $baseHref = $normalizedBase === '/' ? '/' : $normalizedBase . '/';

  ?>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') ?></title>
  <meta name="description" content="<?= htmlspecialchars($pageDescription, ENT_QUOTES, 'UTF-8') ?>">
  <meta name="author" content="Dishan De Silva">
  <base href="<?= htmlspecialchars($baseHref, ENT_QUOTES, 'UTF-8') ?>" />

  <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
  <link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
  <link rel="dns-prefetch" href="https://unpkg.com">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Bruno+Ace&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet">

  <script>
    (function () {
      var savedTheme = localStorage.getItem("portfolio-theme") || "light";
      var root = document.documentElement;
      root.classList.remove("dark-mode", "light-mode");
      root.classList.add(savedTheme === "dark" ? "dark-mode" : "light-mode");
    })();
  </script>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">

  <link rel="stylesheet" href="assets/styles/vars.css?v=30">
  <link rel="stylesheet" href="assets/styles/main.css?v=30">
  <link rel="stylesheet" href="assets/styles/base.css?v=30">
  <link rel="stylesheet" href="assets/styles/sections.css?v=30">
  <link rel="stylesheet" href="assets/styles/animations.css?v=30">
  <link rel="stylesheet" href="assets/styles/scrollbar.css?v=30">
  <link rel="stylesheet" href="assets/styles/navbar.css?v=30">
  <link rel="stylesheet" href="assets/styles/home.css?v=30">
</head>
