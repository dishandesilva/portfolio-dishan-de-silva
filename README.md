# Dishan De Silva Portfolio

Live Demo: https://dishandesilva.kesug.com/

A modern, experience-driven personal portfolio built to showcase technical skills, design thinking, and real-world project work. This project emphasizes performance, interaction quality, and a structured presentation of professional capabilities.

## Overview

This portfolio is a PHP-based, section-oriented website designed to present:

* Professional profile and technical identity
* Core services and areas of expertise
* Skills, education, and background
* A structured projects showcase with filtering and spotlight features
* Direct communication channels and social presence

The implementation focuses on maintainability, modular design, and scalable frontend architecture.

## Key Features

* Interactive hero section with layered visual effects
* Light and dark theme support with persistent user preference
* Structured projects showcase with category filtering
* Real project integration with live preview access
* Placeholder states for upcoming work (no dummy content)
* Refined micro-interactions across UI components
* Responsive design optimized for mobile, tablet, and desktop
* Lazy loading and optimized media delivery
* SEO-ready metadata and structured data integration

## Preview

![Preview](preview/splash.png)
![Preview](preview/home.png)

## Technology Stack

* PHP (template composition using includes)
* HTML5
* CSS3 (modular architecture)
* JavaScript (Vanilla)
* Font Awesome
* Devicon
* Spline Viewer (used in enhanced desktop experience)

## Project Structure

```text
portfolio/
├── index.php
├── home.php
├── includes/
│   ├── head.php
│   ├── header-top.php
│   ├── navbar.php
│   └── footer.php
├── assets/
│   ├── audio/
│   ├── img/
│   ├── scripts/
│   └── styles/
└── data/
    └── projects.json
```

## Frontend Architecture

### CSS

* `vars.css` — design tokens and shared variables
* `base.css` — layout foundation and structure
* `main.css` — global styling
* `home.css` — homepage-specific components and sections
* `sections.css` — shared section behavior and responsiveness
* `animations.css` — motion and transitions
* `navbar.css` — navigation styling
* `scrollbar.css` — custom scrollbar and progress indicator

### JavaScript

* `main.js` — global application logic
* `home.js` — homepage interactions
* `hero-2d.js` — canvas-based hero effects
* `portfolio-features.js` — projects filtering, rendering, and state handling
* `navbar.js` — navigation behavior
* `scrollbar.js` — scroll progress logic
* `home-sound.js` — audio interaction control
* `cursor.js` — custom cursor system

## Projects Module

The projects section is managed through `portfolio-features.js`.

* Supports category-based filtering
* Displays real project data with metadata
* Includes live preview links
* Uses structured placeholder states for upcoming content
* Implements lazy loading and responsive rendering

## Local Development

To run locally using XAMPP:

1. Start Apache
2. Place the project inside `htdocs`
3. Open in browser:

   * `http://localhost/<project-folder>/`

## Deployment

1. Upload files to your hosting root (e.g., `public_html`)
2. Configure domain to point to the project directory
3. Enable HTTPS and enforce redirection
4. Use versioned assets to manage caching
5. Verify all entry points after deployment

## Performance and SEO

This project includes:

* Structured metadata and canonical URLs
* Open Graph and social sharing configuration
* Deferred JavaScript loading
* Optimized asset delivery
* Lazy loading strategies for media
* Responsive design with mobile-first considerations

## Maintenance

* Update project data in `portfolio-features.js` or `projects.json`
* Extend styles within modular CSS files
* Maintain consistency in interaction design and motion
* Ensure responsiveness remains stable across breakpoints

## License

This project is provided for portfolio and demonstration purposes.
All design, branding, and implementation are the intellectual property of the author.

## Author

Dishan De Silva
Software Engineer
Founder, Azureline
