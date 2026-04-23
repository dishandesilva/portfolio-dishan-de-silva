<?php

/**
 * Homepage template.
 *
 * Purpose:
 * - Renders the main portfolio experience, including hero, profile, services,
 *   credentials, projects, and contact call-to-action sections.
 *
 * Advantage:
 * - Keeps the portfolio content in one maintainable PHP view while still
 *   reusing shared includes for the head, navbar, and footer.
 */
$pageTitle = 'Dishan De Silva - Portfolio | Home';
$pageDescription = 'A clean and reusable portfolio template homepage.';
include 'includes/head.php';
?>

<body>
  <div class="scrollbar-top" aria-hidden="true">
    <div class="scrollbar-thumb"></div>
  </div>

  <?php include 'includes/header-top.php'; ?>
  <?php include 'includes/navbar.php'; ?>

  <main class="main-content">
    <!-- Hero: establishes the brand message and primary call-to-action. -->

    <section class="hero" id="hero">
      <canvas id="hero-bg"></canvas>
      <div class="hero-tech-orbs" id="heroTechOrbs" aria-hidden="true">
        <div class="bg-bubbles-container dark-only">
          <div class="glass-bubble"></div>
          <div class="glass-bubble"></div>
          <div class="glass-bubble"></div>
          <div class="glass-bubble"></div>
          <div class="glass-bubble"></div>
          <div class="glass-bubble"></div>
        </div>
      </div>

      <div class="hero-overlay" id="heroOverlay">
        <h1>Hello, it's <span>Dishan</span></h1>
        <h2>I'm <span class="typing"></span><span class="cursor" aria-hidden="true"></span></h2>
        <a
          class="aqua-glass-btn magnetic"
          href="#projects"
          onclick="event.preventDefault(); document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });">
          <span>Explore my work</span>
        </a>
      </div>
    </section>

    <!-- About: founder profile, product principles, and high-level background. -->
    <section class="about-section" id="about">
      <div class="section-heading about-heading">
        <p class="section-kicker">About</p>
        <h2>Founder mindset. Engineer's discipline. Creator's curiosity.</h2>
      </div>

      <div class="bg-name">
        <h1>Dishan</h1>
        <h2>De Silva</h2>
      </div>

      <div class="about-layout">
        <aside class="about-sidebar">
          <article class="about-visual-card about-profile-card">
            <div class="dp-wrapper">
              <div class="profile-dp" aria-label="Profile placeholder"></div>
              <div class="dp-glow"></div>
            </div>

            <div class="about-profile-copy">
              <span class="about-eyebrow">Full-Stack Engineer</span>
              <h3>Building polished products with equal care for logic, interface, and experience.</h3>
              <p>
                I blend engineering structure, visual clarity, and business thinking to create
                digital work that feels premium, practical, and dependable.
              </p>
            </div>
          </article>

          <article class="about-side-card">
            <div class="about-card-header">
              <p><i class="fas fa-chart-line"></i> Snapshot</p>
              <span>Quick overview</span>
            </div>
            <div class="about-stat-grid">
              <div class="about-stat">
                <i class="fas fa-building"></i>
                <span class="stat-value">2024</span>
                <span class="stat-label">Founded Azureline</span>
              </div>
              <div class="about-stat">
                <i class="fas fa-layer-group"></i>
                <span class="stat-value">Full Stack</span>
                <span class="stat-label">End-to-end product builder</span>
              </div>
            </div>
          </article>
        </aside>

        <div class="about-main">
          <article class="about-copy about-copy-card">
            <p>
              This section is intentionally generic so the template can be published safely and customized with your own profile details later.
            </p>
            <p>
              I approach interface and application work with the same energy, so full-stack product
              development is where I feel strongest. Using PHP, JavaScript, Java, MySQL, and modern
              frontend tooling, I care deeply about clean structure, maintainable code, and turning
              ideas into practical products.
            </p>
            <p>
              Fun fact: I share my birthday with World Environment Day, which maybe explains why I
              value clarity, precision, and elegance in both code and design.
            </p>
            <p>
              Beyond engineering, I bring leadership, communication, and strategic thinking shaped by
              startup work, academic discipline, and a constant drive to improve how digital systems
              are planned and delivered.
            </p>

            <div class="about-tags">
              <span>Full-Stack Delivery</span>
              <span>Product Strategy</span>
              <span>System Architecture</span>
              <span>Design Precision</span>
              <span>Clean Code</span>
              <span>Scalable Builds</span>
              <span>Business Thinking</span>
              <span>Interface Craft</span>
            </div>
          </article>

          <div class="about-dashboard-grid">
            <article class="about-info-card">
              <div class="about-card-header">
                <p><i class="fas fa-diagram-project"></i> How I build</p>
                <span>Principles</span>
              </div>
              <div class="about-highlight-list">
                <div class="about-highlight-item">
                  <span class="about-highlight-icon"><i class="fas fa-sitemap"></i></span>
                  <strong>Structure first</strong>
                  <p>I prefer strong architecture and maintainable foundations before adding complexity.</p>
                </div>
                <div class="about-highlight-item">
                  <span class="about-highlight-icon"><i class="fas fa-eye"></i></span>
                  <strong>Clarity over noise</strong>
                  <p>Good software should communicate purpose clearly, both in code and in interface.</p>
                </div>
                <div class="about-highlight-item">
                  <span class="about-highlight-icon"><i class="fas fa-shield-heart"></i></span>
                  <strong>Value that lasts</strong>
                  <p>I focus on solutions that solve practical problems and stay useful as they grow.</p>
                </div>
              </div>
            </article>

            <article class="about-info-card">
              <div class="about-card-header">
                <p><i class="fas fa-hand-holding-heart"></i> What I bring</p>
                <span>Core strengths</span>
              </div>
              <div class="about-highlight-list">
                <div class="about-highlight-item">
                  <span class="about-highlight-icon"><i class="fas fa-cubes"></i></span>
                  <strong>Product thinking</strong>
                  <p>Connecting interface, system logic, and business goals into one clear direction.</p>
                </div>
                <div class="about-highlight-item">
                  <span class="about-highlight-icon"><i class="fas fa-gem"></i></span>
                  <strong>Design sensitivity</strong>
                  <p>Crafting experiences that feel refined, intentional, and easy to trust.</p>
                </div>
                <div class="about-highlight-item">
                  <span class="about-highlight-icon"><i class="fas fa-bolt"></i></span>
                  <strong>Execution mindset</strong>
                  <p>Moving from idea to delivery with structure, consistency, and attention to detail.</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Focus: service directions that map directly to the projects showcase tabs. -->
    <section class="focus-section" id="focus">
      <div class="section-heading">
        <p class="section-kicker">Focus</p>
        <h2>Turning websites, web apps, software tools, and digital strategy into growth.</h2>
      </div>

      <p class="section-intro">
        I help clients and businesses grow through premium digital experiences, practical systems,
        and technology solutions designed to look sharp, work smoothly, and create measurable value.
      </p>

      <div class="focus-scroll-shell">
        <div class="focus-scroll-stage">
          <div class="focus-grid">
            <article class="focus-card">
              <div class="focus-card-media"><i class="fas fa-briefcase"></i></div>
              <h3>Business & Technology Consultation</h3>
              <p>Expert guidance, strategy, and technical insight for scalable, maintainable digital growth.</p>
            </article>
            <article class="focus-card">
              <div class="focus-card-media"><i class="fas fa-bullseye"></i></div>
              <h3>Landing Pages</h3>
              <p>High-converting, fast, and focused pages built to capture attention and deliver measurable results.</p>
            </article>
            <article class="focus-card">
              <div class="focus-card-media"><i class="fas fa-id-badge"></i></div>
              <h3>Personal Portfolios</h3>
              <p>Modern, stylish portfolios that showcase skills and create a lasting impression.</p>
            </article>
            <article class="focus-card">
              <div class="focus-card-media"><i class="fas fa-building"></i></div>
              <h3>Business Websites</h3>
              <p>Sleek, responsive websites designed to build credibility, attract customers, and grow your business.</p>
            </article>
            <article class="focus-card">
              <div class="focus-card-media"><i class="fas fa-cart-shopping"></i></div>
              <h3>E-Commerce Solutions</h3>
              <p>Powerful, secure online stores optimized to boost sales and streamline operations.</p>
            </article>
            <article class="focus-card">
              <div class="focus-card-media"><i class="fas fa-window-restore"></i></div>
              <h3>Web Applications</h3>
              <p>Interactive and efficient web apps tailored to solve real business problems and enhance user experience.</p>
            </article>
            <article class="focus-card">
              <div class="focus-card-media"><i class="fas fa-sliders"></i></div>
              <h3>Software Tools</h3>
              <p>Custom software solutions to automate processes, improve workflows, and increase productivity.</p>
            </article>
            <article class="focus-card">
              <div class="focus-card-media"><i class="fas fa-mobile-screen-button"></i></div>
              <h3>Mobile Applications</h3>
              <p>User-friendly apps for iOS and Android to expand reach and engagement.</p>
              <span class="focus-card-note">Coming Soon</span>
            </article>
          </div>
        </div>
        <div class="focus-carousel-controls" aria-label="Focus section navigation">
          <button class="project-carousel-btn focus-carousel-btn focus-carousel-btn-prev" type="button" aria-label="Previous focus card">
            <i class="fas fa-arrow-left"></i>
          </button>
          <button class="project-carousel-btn section-carousel-toggle focus-carousel-toggle" type="button" aria-pressed="true" aria-label="Turn off focus auto slide">
            <i class="fas fa-pause"></i>
            <span class="control-label">Auto Slide On</span>
          </button>
          <button class="project-carousel-btn focus-carousel-btn focus-carousel-btn-next" type="button" aria-label="Next focus card">
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <div class="focus-cta">
        <a class="aqua-glass-btn magnetic" href="#contact" onclick="event.preventDefault(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth', block: 'start' });">
          <span>Let&rsquo;s Talk</span>
        </a>
      </div>
    </section>

    <!-- Experience: leadership and execution history presented as a compact timeline. -->
    <section class="experience-section" id="experience">
      <div class="section-heading">
        <p class="section-kicker">Experience</p>
        <h2>Leading, building, and learning in parallel.</h2>
      </div>

      <div class="timeline-list">
        <article class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <div class="timeline-topline">
              <h3>Founder & CEO</h3>
              <span>Jun 2024 - Present</span>
            </div>
            <p class="timeline-company">Your Company</p>
            <p>
              Steering a startup that delivers full-stack web and software solutions while defining strategic vision, client engagement, and product innovation.
            </p>
            <ul>
              <li>Lead end-to-end planning, execution, and delivery of digital projects.</li>
              <li>Integrate hands-on technical development with high-level business decision-making.</li>
              <li>Ensure solutions align with clean architecture, optimal usability, and tangible business value.</li>
            </ul>
          </div>
        </article>

        <article class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <div class="timeline-topline">
              <h3>Managing Director</h3>
              <span>Jun 2024 - Present</span>
            </div>
            <p class="timeline-company">Your Company</p>
            <p>
              Direct daily operations, streamline project workflows, and uphold standards that foster team efficiency, quality delivery, and sustainable growth.
            </p>
          </div>
        </article>

        <article class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <div class="timeline-topline">
              <h3>Software Engineer</h3>
              <span>Jun 2024 - Present</span>
            </div>
            <p class="timeline-company">Your Company</p>
            <p>
              Architect and implement frontend, backend, and database systems for web and software projects, focusing on scalable, maintainable, and practical engineering solutions.
            </p>
          </div>
        </article>
      </div>
    </section>

    <!-- Credentials cluster: one shared parallax background for skills, education, and recognition. -->
    <div class="credentials-cluster" aria-label="Skills, education, and recognition">
      <section class="skills-section" id="skills">
        <div class="section-heading">
          <p class="section-kicker">Skills</p>
          <h2>A practical toolset shaped by engineering, design, and product delivery.</h2>
        </div>

        <p class="section-intro">
          I work across frontend engineering, full-stack development, design tooling, and modern
          delivery workflows with a stack chosen for clarity, speed, and maintainability.
        </p>

        <div class="skills-grid">
          <article class="skill-category skill-featured-card">
            <div class="skill-category-header">
              <span class="skill-category-icon"><i class="fas fa-satellite-dish"></i></span>
              <div>
                <h3>Core Build Stack</h3>
                <p>Frontend, backend, and product execution working together.</p>
              </div>
            </div>
            <div class="skill-list">
              <span class="skill"><i class="fab fa-html5"></i> HTML</span>
              <span class="skill"><i class="fab fa-css3-alt"></i> CSS</span>
              <span class="skill"><i class="fab fa-js"></i> JavaScript</span>
              <span class="skill"><i class="fab fa-react"></i> React</span>
              <span class="skill"><i class="fab fa-bootstrap"></i> Bootstrap</span>
              <span class="skill"><i class="fab fa-php"></i> PHP</span>
              <span class="skill"><i class="fab fa-python"></i> Python</span>
              <span class="skill"><i class="fas fa-code"></i> C++</span>
              <span class="skill"><i class="fab fa-java"></i> Java</span>
              <span class="skill"><i class="fab fa-node-js"></i> Node.js</span>
              <span class="skill"><i class="fas fa-database"></i> MySQL</span>
              <span class="skill"><i class="fas fa-table"></i> SQL</span>
              <span class="skill"><i class="fas fa-mobile-screen-button"></i> React Native</span>
            </div>
          </article>

          <article class="skill-category">
            <div class="skill-category-header">
              <span class="skill-category-icon"><i class="fas fa-code"></i></span>
              <div>
                <h3>Code & IDEs</h3>
                <p>Development environments used to build, debug, and ship.</p>
              </div>
            </div>
            <div class="skill-list">
              <span class="skill"><i class="fas fa-code"></i> Visual Studio Code</span>
              <span class="skill"><i class="fas fa-laptop-code"></i> IntelliJ IDEA</span>
              <span class="skill"><i class="fas fa-cubes"></i> NetBeans</span>
              <span class="skill"><i class="fas fa-wand-magic-sparkles"></i> Google Antigravity</span>
              <span class="skill"><i class="fas fa-mobile-alt"></i> Android Studio</span>
              <span class="skill"><i class="fas fa-microchip"></i> Arduino IDE</span>
            </div>
          </article>

          <article class="skill-category">
            <div class="skill-category-header">
              <span class="skill-category-icon"><i class="fas fa-code-branch"></i></span>
              <div>
                <h3>Version Control</h3>
                <p>Clean collaboration, versioning, and project continuity.</p>
              </div>
            </div>
            <div class="skill-list">
              <span class="skill"><i class="fab fa-git-alt"></i> Git</span>
              <span class="skill"><i class="fab fa-github"></i> GitHub</span>
            </div>
          </article>

          <article class="skill-category">
            <div class="skill-category-header">
              <span class="skill-category-icon"><i class="fas fa-wand-magic-sparkles"></i></span>
              <div>
                <h3>Design & Multimedia</h3>
                <p>Visual tools that support brand clarity and presentation quality.</p>
              </div>
            </div>
            <div class="skill-list">
              <span class="skill"><i class="fas fa-image"></i> Adobe Photoshop</span>
              <span class="skill"><i class="fas fa-camera-retro"></i> Lightroom</span>
              <span class="skill"><i class="fas fa-pen-ruler"></i> Canva</span>
              <span class="skill"><i class="fas fa-video"></i> CapCut</span>
            </div>
          </article>

          <article class="skill-category">
            <div class="skill-category-header">
              <span class="skill-category-icon"><i class="fas fa-cube"></i></span>
              <div>
                <h3>Additional Exposure</h3>
                <p>Tools and platforms that extend my technical and creative range.</p>
              </div>
            </div>
            <div class="skill-list">
              <span class="skill"><i class="fas fa-drafting-compass"></i> SolidWorks</span>
              <span class="skill"><i class="fas fa-gamepad"></i> Unity</span>
            </div>
          </article>
        </div>
      </section>

      <section class="education-section" id="education">
        <div class="section-heading">
          <p class="section-kicker">Education</p>
          <h2>Academic depth supported by leadership, performance, and practical learning.</h2>
        </div>

        <div class="education-scroll-shell">
          <div class="education-scroll-stage">
            <div class="education-grid">
              <article class="education-card">
                <div class="education-icon"><i class="fas fa-graduation-cap"></i></div>
                <div>
                  <h3>BSc (Hons) Software Engineering</h3>
                  <p class="education-place">BCU</p>
                  <span class="education-date">Feb 2024 - Dec 2027</span>
                </div>
              </article>

              <article class="education-card">
                <div class="education-icon"><i class="fas fa-award"></i></div>
                <div>
                  <h3>Diploma in Information and Communication Technology</h3>
                  <p class="education-place">ESOFT Metro Campus</p>
                  <span class="education-date">2021 - 2022</span>
                  <p class="education-grade">Batch Topper - DiTec 129</p>
                  <p class="education-note">Awarded a Medal of High Achievement after building strong foundations in ICT, networking, databases, programming, web design, and core software engineering concepts.</p>
                </div>
              </article>

              <article class="education-card">
                <div class="education-icon"><i class="fas fa-comments"></i></div>
                <div>
                  <h3>Diploma in English Language and Communication</h3>
                  <p class="education-place">ESOFT Metro Campus</p>
                  <span class="education-date">2021 - 2022</span>
                  <p class="education-grade">Batch Topper - DiE 100</p>
                  <p class="education-note">Strengthened public speaking, presentation, professional writing, and communication skills that now support leadership, teamwork, and client-facing work.</p>
                </div>
              </article>

              <article class="education-card">
                <div class="education-icon"><i class="fas fa-school"></i></div>
                <div>
                  <h3>G.C.E. O/L & A/L</h3>
                  <p class="education-place">Holy Cross College, Kalutara</p>
                  <span class="education-date">Jan 2010 - Dec 2023</span>
                  <p class="education-grade">Head Prefect (2022 - 2023)</p>
                  <p class="education-note">Completed school education while building leadership and communication through service as Head Prefect, Patron of the Science Society, and active involvement in the English Literature Union, Chess Club, and Drama Club.</p>
                </div>
              </article>
            </div>
          </div>
          <div class="section-carousel-controls education-carousel-controls" aria-label="Education section navigation">
            <button class="project-carousel-btn section-carousel-btn education-carousel-btn-prev" type="button" aria-label="Previous education card">
              <i class="fas fa-arrow-left"></i>
            </button>
            <button class="project-carousel-btn section-carousel-toggle education-carousel-toggle" type="button" aria-pressed="true" aria-label="Turn off education auto slide">
              <i class="fas fa-pause"></i>
              <span class="control-label">Auto Slide On</span>
            </button>
            <button class="project-carousel-btn section-carousel-btn education-carousel-btn-next" type="button" aria-label="Next education card">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>

      <section class="achievements-section" id="achievements">
        <div class="section-heading">
          <p class="section-kicker">Recognition</p>
          <h2>Achievements that show technical promise, discipline, and leadership.</h2>
        </div>

        <div class="achievements-scroll-shell">
          <div class="achievements-scroll-stage">
            <div class="achievements-grid">
              <article class="achievement-card">
                <div class="achievement-icon"><i class="fas fa-laptop-code"></i></div>
                <div>
                  <h3>First Runners-Up - HackX Junior</h3>
                  <p class="achievement-place">Team WAVE</p>
                  <span class="achievement-date">2019</span>
                  <p class="achievement-note">
                    Achieved second place in the all-island inter-school hackathon for the DocTello
                    healthcare app concept, reflecting early innovation, collaboration, and
                    problem-solving ability.
                  </p>
                </div>
              </article>

              <article class="achievement-card">
                <div class="achievement-icon"><i class="fas fa-medal"></i></div>
                <div>
                  <h3>Batch Top - DITEC 129</h3>
                  <p class="achievement-place">ESOFT Metro Campus</p>
                  <span class="achievement-date">2022</span>
                  <p class="achievement-note">
                    Graduated as the batch top performer of DITEC 129, demonstrating outstanding
                    academic consistency and strong capability across core ICT, software, and
                    problem-solving disciplines.
                  </p>
                </div>
              </article>

              <article class="achievement-card">
                <div class="achievement-icon"><i class="fas fa-comments"></i></div>
                <div>
                  <h3>Batch Top - DiE 100</h3>
                  <p class="achievement-place">ESOFT Metro Campus</p>
                  <span class="achievement-date">2022</span>
                  <p class="achievement-note">
                    Achieved batch top status in DiE 100 for excellence in English Language and
                    Communication, reinforcing high-value strengths in presentation, professional
                    writing, and confident communication.
                  </p>
                </div>
              </article>

              <article class="achievement-card">
                <div class="achievement-icon"><i class="fas fa-user-tie"></i></div>
                <div>
                  <h3>Head Prefect</h3>
                  <p class="achievement-place">Holy Cross College, Kalutara</p>
                  <span class="achievement-date">2022 - 2023</span>
                  <p class="achievement-note">
                    Served in the highest student leadership role, guiding initiatives, representing
                    the student body, and strengthening discipline, responsibility, and decision-making
                    under a high-trust leadership position.
                  </p>
                </div>
              </article>
            </div>
          </div>
          <div class="section-carousel-controls achievements-carousel-controls" aria-label="Achievements section navigation">
            <button class="project-carousel-btn section-carousel-btn achievements-carousel-btn-prev" type="button" aria-label="Previous achievement card">
              <i class="fas fa-arrow-left"></i>
            </button>
            <button class="project-carousel-btn section-carousel-toggle achievements-carousel-toggle" type="button" aria-pressed="true" aria-label="Turn off achievements auto slide">
              <i class="fas fa-pause"></i>
              <span class="control-label">Auto Slide On</span>
            </button>
            <button class="project-carousel-btn section-carousel-btn achievements-carousel-btn-next" type="button" aria-label="Next achievement card">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>
    </div>

    <!-- Projects: streamlined category tabs with concise SEO-friendly project metadata. -->
    <section class="projects-section" id="projects">
      <div class="section-heading">
        <p class="section-kicker">Projects</p>
        <h2>Project showcase placeholders ready for future work.</h2>
      </div>

      <p class="section-intro">
        Real project data has been removed.
      </p>

      <div class="projects-showcase-shell projects-command-shell">
        <div class="projects-showcase-orb projects-showcase-orb-one" aria-hidden="true"></div>
        <div class="projects-showcase-orb projects-showcase-orb-two" aria-hidden="true"></div>

        <div class="projects-spotlight">
          <article class="project-spotlight-card">
            <div class="project-spotlight-grid">
              <div class="project-video-stage">
                <div class="project-video-frame">
                  <div class="project-coming-soon-stage" aria-hidden="true">
                    <div class="project-coming-soon-grid">
                      <div class="project-coming-soon-badge"></div>
                      <div class="project-coming-soon-line project-coming-soon-line-lg"></div>
                      <div class="project-coming-soon-line"></div>
                      <div class="project-coming-soon-line project-coming-soon-line-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="project-copy-stage">
                <div class="project-copy-topline">
                  <span class="project-category-badge"><i class="fas fa-folder-open" aria-hidden="true"></i> Showcase</span>
                  <span class="project-short-tag">Coming Soon</span>
                </div>
                <h3>Project Card Placeholder</h3>
                <p>Project summary, stack, and links here when ready to publish real work.</p>
                <div class="project-stack-bar">
                  <span class="project-stack-token">HTML</span>
                  <span class="project-stack-token">CSS</span>
                  <span class="project-stack-token">JavaScript</span>
                </div>
                <div class="project-action-row">
                  <span class="project-live-btn project-live-btn-disabled" aria-disabled="true">
                    <span>Details Coming Soon</span>
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Contact: primary conversion path with direct communication options. -->
    <section class="contact-section" id="contact">
      <div class="section-heading">
        <p class="section-kicker">Contact</p>
        <h2>Ready to turn an idea into a polished digital product?</h2>
      </div>

      <div class="contact-cta-shell">
        <div class="contact-cta-glow contact-cta-glow-one" aria-hidden="true"></div>
        <div class="contact-cta-glow contact-cta-glow-two" aria-hidden="true"></div>

        <div class="contact-layout">
          <div class="contact-copy">
            <div class="contact-availability">
              <span class="contact-status-dot"></span>
              Available for projects, collaborations, and strategic conversations
            </div>

            <h3>Let&apos;s discuss your website, web app, software tool, or digital idea directly.</h3>
            <p>
              Replace this section with your preferred contact channels and response expectations.
            </p>

            <div class="contact-value-points">
              <article class="contact-value-card">
                <span class="contact-value-icon"><i class="fas fa-bolt"></i></span>
                <div>
                  <h4>Fast first response</h4>
                  <p>Reach out directly and start the conversation without waiting through a form flow.</p>
                </div>
              </article>

              <article class="contact-value-card">
                <span class="contact-value-icon"><i class="fas fa-layer-group"></i></span>
                <div>
                  <h4>Clear project thinking</h4>
                  <p>From design direction to system planning, we can discuss the right path quickly.</p>
                </div>
              </article>

              <article class="contact-value-card">
                <span class="contact-value-icon"><i class="fas fa-shield-halved"></i></span>
                <div>
                  <h4>Professional delivery mindset</h4>
                  <p>Built for people who want quality, clarity, and dependable execution.</p>
                </div>
              </article>
            </div>
          </div>

          <div class="contact-cta-card">
            <div class="contact-cta-topline">
              <p class="contact-card-kicker">Primary CTA</p>
              <h3>Message me on WhatsApp</h3>
              <p>
                Start with a professional pre-filled message so we can move straight into your
                project requirements, timeline, or collaboration goals.
              </p>
            </div>

            <a
              class="contact-whatsapp-btn magnetic"
              href="#"
              target="_blank"
              rel="noreferrer">
              <span class="contact-whatsapp-icon"><i class="fab fa-whatsapp"></i></span>
              <span class="contact-whatsapp-copy">
                <strong>Open WhatsApp</strong>
                <small></small>
              </span>
              <span class="contact-whatsapp-arrow"><i class="fas fa-arrow-up-right-from-square"></i></span>
            </a>

            <div class="contact-direct-grid">
              <a class="contact-direct-card" href="mailto:hello@example.com">
                <span class="contact-direct-icon"><i class="fas fa-envelope"></i></span>
                <div>
                  <strong>Email</strong>
                  <small>hello@example.com</small>
                </div>
              </a>

              <a class="contact-direct-card" href="mailto:business@example.com">
                <span class="contact-direct-icon"><i class="fas fa-briefcase"></i></span>
                <div>
                  <strong>Business Email</strong>
                  <small>business@example.com</small>
                </div>
              </a>

              <a class="contact-direct-card" href="#" target="_blank" rel="noreferrer">
                <span class="contact-direct-icon"><i class="fas fa-globe"></i></span>
                <div>
                  <strong>Website</strong>
                  <small>my-domain.com</small>
                </div>
              </a>
            </div>

            <div class="contact-socials-block">
              <p class="contact-card-kicker">Social Accounts</p>
              <div class="contact-social-grid">
                <a class="contact-social-link contact-social-link-linkedin" href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <i class="fa-brands fa-linkedin-in"></i>
                  <span>LinkedIn</span>
                </a>
                <a class="contact-social-link contact-social-link-github" href="#" target="_blank" rel="noreferrer" aria-label="GitHub">
                  <i class="fa-brands fa-github"></i>
                  <span>GitHub</span>
                </a>
                <a class="contact-social-link contact-social-link-instagram" href="#" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <i class="fa-brands fa-instagram"></i>
                  <span>Instagram</span>
                </a>
                <a class="contact-social-link contact-social-link-facebook" href="#" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <i class="fa-brands fa-facebook-f"></i>
                  <span>Facebook</span>
                </a>
                <a class="contact-social-link contact-social-link-x" href="#" target="_blank" rel="noreferrer" aria-label="X">
                  <i class="fa-brands fa-x-twitter"></i>
                  <span>X</span>
                </a>
                <a class="contact-social-link contact-social-link-threads" href="#" target="_blank" rel="noreferrer" aria-label="Threads">
                  <i class="fa-solid fa-at"></i>
                  <span>Threads</span>
                </a>
                <a class="contact-social-link contact-social-link-youtube" href="#" target="_blank" rel="noreferrer" aria-label="YouTube">
                  <i class="fa-brands fa-youtube"></i>
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <?php include 'includes/footer.php'; ?>

  <button id="pageup-btn" class="floating-btn"><i class="fa fa-caret-up"></i></button>

  <script src="assets/scripts/main.js?v=30" defer></script>
  <script src="assets/scripts/home.js?v=30" defer></script>
  <script src="assets/scripts/hero-2d.js?v=30" defer></script>
  <script src="assets/scripts/navbar.js?v=30" defer></script>
  <script src="assets/scripts/scrollbar.js?v=30" defer></script>
</body>

</html>