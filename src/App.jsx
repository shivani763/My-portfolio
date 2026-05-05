import React, { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const header = document.getElementById("header");
    const navToggle = document.getElementById("nav-toggle");
    const navList = document.getElementById("nav-list");
    const navLinks = document.querySelectorAll(".nav__link");

    const handleScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 40);
      updateActiveNav();
      toggleBackToTop();
      countStats();
    };

    window.addEventListener("scroll", handleScroll);

    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("open");
      navList.classList.toggle("open");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("open");
        navList.classList.remove("open");
      });
    });

    const navHeightValue = 70;

    function updateActiveNav() {
      const sections = document.querySelectorAll("section[id]");
      let current = "hero";
      sections.forEach((section) => {
        const top = section.offsetTop - navHeightValue - 80;
        if (window.scrollY >= top) current = section.id;
      });
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.dataset.section === current);
      });
    }

    const phrases = [
      "creative interfaces.",
      "robust backends.",
      "interactive platforms.",
      "scalable web apps.",
      "Spring Boot services.",
      "modern React applications.",
    ];
    let phraseIdx = 0,
      charIdx = 0,
      deleting = false;
    const el = document.getElementById("typewriter");

    function type() {
      const current = phrases[phraseIdx];
      if (!deleting) {
        el.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
      } else {
        el.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
        }
      }
      setTimeout(type, deleting ? 50 : 90);
    }
    type();

    const revealEls = document.querySelectorAll(
      ".glass-card, .timeline__item, .cert-card, .edu-card, .stat-item, .section__header, .hero__text, .projects__label",
    );
    revealEls.forEach((el) => el.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), i * 60);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    revealEls.forEach((el) => observer.observe(el));

    let counted = false;
    function countStats() {
      if (counted) return;
      const aboutSection = document.getElementById("about");
      if (!aboutSection) return;
      const rect = aboutSection.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        counted = true;
        document.querySelectorAll(".stat-number").forEach((counter) => {
          const target = +counter.dataset.target;
          let current = 0;
          const step = target / 40;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else counter.textContent = Math.floor(current);
          }, 40);
        });
      }
    }

    const btt = document.getElementById("back-to-top");
    function toggleBackToTop() {
      btt.classList.toggle("visible", window.scrollY > 400);
    }
    btt.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );

    const form = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("contact-name").value.trim();
      const email = document.getElementById("contact-email-input").value.trim();
      const subject = document.getElementById("contact-subject").value.trim();
      const message = document.getElementById("contact-message").value.trim();

      if (!name || !email || !subject || !message) {
        showStatus("Please fill in all fields.", "error");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showStatus("Please enter a valid email address.", "error");
        return;
      }

      const submitBtn = document.getElementById("contact-submit");
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      setTimeout(() => {
        showStatus(
          "Message sent successfully! I'll get back to you soon.",
          "success",
        );
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      }, 1500);
    });

    function showStatus(msg, type) {
      formStatus.textContent = msg;
      formStatus.className = "form-status " + type;
      setTimeout(() => {
        formStatus.textContent = "";
        formStatus.className = "form-status";
      }, 5000);
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    updateActiveNav();
    countStats();

    const lightbox = document.getElementById("cert-lightbox");
    const lbImg = document.getElementById("lightbox-img");

    function openLightbox(url) {
      lbImg.src = url;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
      setTimeout(() => { lbImg.src = ""; }, 300);
    }

    document.querySelectorAll(".cert-view-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const url = btn.getAttribute("href");
        openLightbox(url);
      });
    });

    document.getElementById("lightbox-overlay").addEventListener("click", closeLightbox);
    document.getElementById("lightbox-close").addEventListener("click", closeLightbox);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/*  ===== PARTICLES BACKGROUND =====  */}
      <div id="particles-bg" className="particles-bg"></div>

      {/*  ===== NAVBAR =====  */}
      <header id="header" className="header">
        <nav className="nav container">
          <a href="#hero" className="logo">
            <span className="logo-bracket">&lt;</span>Shivani
            <span className="logo-bracket">/&gt;</span>
          </a>
          <ul className="nav__list" id="nav-list">
            <li>
              <a href="#hero" className="nav__link active" data-section="hero">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="nav__link" data-section="about">
                About
              </a>
            </li>
            <li>
              <a href="#skills" className="nav__link" data-section="skills">
                Skills
              </a>
            </li>
            <li>
              <a href="#projects" className="nav__link" data-section="projects">
                Projects
              </a>
            </li>
            <li>
              <a
                href="#experience"
                className="nav__link"
                data-section="experience"
              >
                Experience
              </a>
            </li>
            <li>
              <a
                href="#certifications"
                className="nav__link"
                data-section="certifications"
              >
                Certifications
              </a>
            </li>
            <li>
              <a
                href="#education"
                className="nav__link"
                data-section="education"
              >
                Education
              </a>
            </li>
            <li>
              <a href="#contact" className="nav__link" data-section="contact">
                Contact
              </a>
            </li>
          </ul>
          <button
            className="nav__toggle"
            id="nav-toggle"
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </header>

      {/*  ===== HERO =====  */}
      <section id="hero" className="hero section">
        <div className="hero__content container">
          <div className="hero__text">
            <p className="hero__greeting">👋 Hello, I'm</p>
            <h1 className="hero__title">
              <span className="gradient-text">Shivani</span>
            </h1>
            <div className="hero__typewriter">
              <span className="typewriter-prefix">I build </span>
              <span id="typewriter" className="typewriter-word"></span>
              <span className="typewriter-cursor">|</span>
            </div>
            <p className="hero__desc">
              Passionate Web Developer crafting performant, elegant web
              experiences with modern technologies. Turning ideas into impactful
              digital solutions.
            </p>
            <div className="hero__cta">
              <a
                href="#projects"
                className="btn btn--primary"
                id="hero-cta-projects"
              >
                <i className="fa-solid fa-rocket"></i> View Projects
              </a>
              <a
                href="/resume.pdf"
                className="btn btn--outline"
                id="hero-cta-resume"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-solid fa-file-download"></i> Download Resume
              </a>
            </div>
            <div className="hero__socials">
              <a
                href="https://github.com/shivani763"
                className="social-link"
                id="social-github"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/shivani258"
                className="social-link"
                id="social-linkedin"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="mailto:shivanigoswami077@gmail.com"
                className="social-link"
                id="social-email"
                aria-label="Email"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="hero__graphic">
            <div className="hero__avatar-ring">
              <div className="hero__avatar">
                <img src="/profile.png" alt="Shivani" className="avatar-img" />
              </div>
              <div className="orbit orbit-1">
                <div className="orbit-dot"></div>
              </div>
              <div className="orbit orbit-2">
                <div className="orbit-dot"></div>
              </div>
              <div className="orbit orbit-3">
                <div className="orbit-dot"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero__scroll-hint">
          <span>Scroll Down</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/*  ===== ABOUT =====  */}
      <section id="about" className="about section">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">Who I Am</span>
            <h2 className="section__title">
              About <span className="gradient-text">Me</span>
            </h2>
          </div>
          <div className="about__grid">
            <div className="about__card glass-card">
              <div className="about__icon">
                <i className="fas fa-code"></i>
              </div>
              <h3>Full Stack Development</h3>
              <p>
                Building seamless bridges between elegant frontends and robust
                Java-based backends. I love the logic of Spring Boot as much as
                the art of React.
              </p>
            </div>
            <div className="about__card glass-card">
              <div className="about__icon">
                <i className="fas fa-paint-brush"></i>
              </div>
              <h3>UI/UX Enthusiast</h3>
              <p>
                I believe that good design is invisible. I focus on creating
                intuitive user experiences that are clean, responsive, and
                delightful to use.
              </p>
            </div>
            <div className="about__card glass-card">
              <div className="about__icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Continuous Learner</h3>
              <p>
                The tech world moves fast, and I move with it. From Blockchain
                to AI integration, I'm always looking for the next challenge to
                solve.
              </p>
            </div>
          </div>
          <div className="about__stats">
            <div className="stat-item">
              <span className="stat-number" data-target="5">
                0
              </span>
              <span>+</span>
              <p>Projects Developed</p>
            </div>
            <div className="stat-item">
              <span className="stat-number" data-target="5">
                0
              </span>
              <span>+</span>
              <p>Certifications</p>
            </div>
            <div className="stat-item">
              <span className="stat-number" data-target="8">
                0
              </span>
              <span>+</span>
              <p>Months of Growth</p>
            </div>
            <div className="stat-item">
              <span className="stat-number" data-target="1">
                0
              </span>
              <span>+</span>
              <p>Industry Internships</p>
            </div>
          </div>
        </div>
      </section>

      {/*  ===== SKILLS =====  */}
      <section id="skills" className="skills section">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">What I Know</span>
            <h2 className="section__title">
              Technical <span className="gradient-text">Skills</span>
            </h2>
          </div>
          <div className="skills__grid">
            <div className="skills__category glass-card">
              <h3 className="skills__cat-title">
                <i className="fas fa-laptop-code"></i> Frontend
              </h3>
              <div className="skill-tags">
                <span className="skill-tag">HTML5</span>
                <span className="skill-tag">CSS3</span>
                <span className="skill-tag">JavaScript (ES6+)</span>
                <span className="skill-tag">Angular</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">Responsive Design</span>
                <span className="skill-tag">CSS Animations</span>
                <span className="skill-tag">ReactJs</span>
              </div>
            </div>

            <div className="skills__category glass-card">
              <h3 className="skills__cat-title">
                <i className="fas fa-server"></i> Backend
              </h3>
              <div className="skill-tags">
                <span className="skill-tag">Java</span>
                <span className="skill-tag">Spring Boot</span>
                <span className="skill-tag">REST APIs</span>
                <span className="skill-tag">API Integration</span>
                <span className="skill-tag">JSON</span>
              </div>
            </div>

            <div className="skills__category glass-card">
              <h3 className="skills__cat-title">
                <i className="fas fa-database"></i> Database & Tools
              </h3>
              <div className="skill-tags">
                <span className="skill-tag">MySQL</span>
                <span className="skill-tag">Git & GitHub</span>
                <span className="skill-tag">VS Code</span>
                <span className="skill-tag">Postman</span>
                
              </div>
            </div>

            <div className="skills__category glass-card">
              <h3 className="skills__cat-title">
                <i className="fas fa-brain"></i> Key Concepts
              </h3>
              <div className="skill-tags">
                <span className="skill-tag">OOPs</span>
                <span className="skill-tag">Data Structures</span>
                <span className="skill-tag">Real-time Data Fetching</span>
                <span className="skill-tag">State Management</span>
                <span className="skill-tag">UI/UX Design</span>
                <span className="skill-tag">Database Management</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  ===== PROJECTS =====  */}
      <section id="projects" className="projects section">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">What I've Built</span>
            <h2 className="section__title">
              My <span className="gradient-text">Projects</span>
            </h2>
          </div>
          <div className="projects__grid projects__grid--featured">
            {/*  Weather App  */}
            <article className="featured-card glass-card" id="project-weather">
              <div className="featured-card__visual">
                <img src="/projects/weather.png" alt="Weather Insights" className="project-preview" />
                <div className="visual-overlay"></div>
              </div>
              <div className="featured-card__info">
                <div className="featured-card__tag">Cloud & Data</div>
                <h3 className="featured-card__title">Weather Insights Platform</h3>
                <p className="featured-card__desc">
                  A high-precision meteorological dashboard that aggregates global weather data 
                  using RESTful APIs. Features real-time updates and interactive forecasts 
                  in a sleek, minimalist environment.
                </p>
                <div className="featured-card__tech">
                  <span>React</span>
                  <span>OpenWeather API</span>
                  <span>Modern CSS</span>
                </div>
                <div className="featured-card__footer">
                  <a href="https://weather-deploy-five.vercel.app/" className="btn btn--primary">
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </a>
                  <a href="https://github.com/shivani763/Weather-App.git" className="btn btn--ghost">
                    <i className="fab fa-github"></i> Source
                  </a>
                </div>
              </div>
            </article>

            {/*  Pro-Quiz  */}
            <article className="featured-card glass-card" id="project-quiz">
              <div className="featured-card__visual">
                <img src="/projects/quiz.png" alt="Pro-Quiz" className="project-preview" />
                <div className="visual-overlay"></div>
              </div>
              <div className="featured-card__info">
                <div className="featured-card__tag">EdTech & Logic</div>
                <h3 className="featured-card__title">Pro-Quiz Educational System</h3>
                <p className="featured-card__desc">
                  An advanced learning platform designed for dynamic knowledge assessment. 
                  Implements complex state management to provide seamless transitions, 
                  timed challenges, and detailed performance analytics.
                </p>
                <div className="featured-card__tech">
                  <span>JavaScript</span>
                  <span>React</span>
                  <span>State Logic</span>
                </div>
                <div className="featured-card__footer">
                  <a href="https://quiztaker-web-main.vercel.app/" className="btn btn--primary">
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </a>
                  <a href="https://github.com/shivani763/quiztaker-web-main.git" className="btn btn--ghost">
                    <i className="fab fa-github"></i> Source
                  </a>
                </div>
              </div>
            </article>

            {/*  TaskFlow  */}
            <article className="featured-card glass-card" id="project-todo">
              <div className="featured-card__visual">
                <img src="/projects/todo.png" alt="TaskFlow" className="project-preview" />
                <div className="visual-overlay"></div>
              </div>
              <div className="featured-card__info">
                <div className="featured-card__tag">Enterprise & SaaS</div>
                <h3 className="featured-card__title">TaskFlow Performance Suite</h3>
                <p className="featured-card__desc">
                  An enterprise-grade task orchestration tool optimized for performance and 
                  scalability. Built with Angular, it provides a reactive interface 
                  for complex workflow management and data persistence.
                </p>
                <div className="featured-card__tech">
                  <span>Angular</span>
                  <span>TypeScript</span>
                  <span>ReactiveX</span>
                </div>
                <div className="featured-card__footer">
                  <a href="https://to-do-list-tau-self-15.vercel.app" className="btn btn--primary">
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </a>
                  <a href="https://github.com/shivani763/To-Do-List.git" className="btn btn--ghost">
                    <i className="fab fa-github"></i> Source
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/*  ===== EXPERIENCE =====  */}
      <section id="experience" className="experience section">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">My Journey</span>
            <h2 className="section__title">
              Work <span className="gradient-text">Experience</span>
            </h2>
          </div>
          <div className="timeline">
            {/*  MPSEDC  */}
            <div className="timeline__item" id="exp-mpsedc">
              <div className="timeline__dot"></div>
              <div className="timeline__content glass-card">
                <div className="timeline__header">
                  <div>
                    <h3 className="timeline__title">Trainee Engineer</h3>
                    <p className="timeline__company">
                      <i className="fas fa-building"></i> MPSEDC, Bhopal
                    </p>
                  </div>
                  <div className="timeline__meta">
                    <span className="timeline__date">
                      <i className="fas fa-calendar-alt"></i> Nov 2025 – Present
                    </span>
                    <span className="timeline__type">
                      <i className="fas fa-map-marker-alt"></i> Bhopal
                    </span>
                  </div>
                </div>
                <ul className="timeline__bullets">
                  <li>
                    Assisted in the implementation and support of government IT
                    and <strong>e-governance systems</strong>, gaining exposure
                    to real-world public sector technology workflows.
                  </li>
                  <li>
                    Supported system operations, basic troubleshooting, and
                    <strong>technical documentation</strong> while following
                    standard government IT procedures and compliance guidelines.
                  </li>
                  <li>
                    Collaborated with cross-functional teams to ensure smooth
                    execution of <strong>technology-driven projects</strong> and
                    service delivery.
                  </li>
                  <li>
                    Enhanced skills in system analysis, problem-solving, and
                    professional communication within a structured
                    organizational environment.
                  </li>
                </ul>
                <div className="timeline__tags">
                  <span>e-Governance</span>
                  <span>IT Systems</span>
                  <span>Documentation</span>
                  <span>Team Collaboration</span>
                </div>
              </div>
            </div>

            {/*  AspireNex  */}
            <div className="timeline__item" id="exp-aspirenex">
              <div className="timeline__dot"></div>
              <div className="timeline__content glass-card">
                <div className="timeline__header">
                  <div>
                    <h3 className="timeline__title">Web Developer Intern</h3>
                    <p className="timeline__company">
                      <i className="fas fa-building"></i> AspireNex
                    </p>
                  </div>
                  <div className="timeline__meta">
                    <span className="timeline__date">
                      <i className="fas fa-calendar-alt"></i> July 2024 –
                      September 2024
                    </span>
                    <span className="timeline__type">
                      <i className="fas fa-map-marker-alt"></i> Remote
                    </span>
                  </div>
                </div>
                <ul className="timeline__bullets">
                  <li>
                    Developed a <strong>Quiz Taker Application</strong> using
                    HTML, CSS, and JavaScript, implementing interactive UI and
                    real-time score tracking.
                  </li>
                  <li>
                    Built a <strong>Weather Application</strong> that fetches
                    real-time weather data using APIs and displays dynamic
                    weather updates.
                  </li>
                  <li>
                    Enhanced frontend responsiveness and user experience using
                    <strong>CSS animations</strong> and JavaScript event
                    handling.
                  </li>
                  <li>
                    Gained hands-on experience in HTML, CSS, JavaScript, and API
                    integration for real-world applications.
                  </li>
                </ul>
                <div className="timeline__tags">
                  <span>HTML</span>
                  <span>CSS</span>
                  <span>JavaScript</span>
                  <span>REST API</span>
                </div>
              </div>
            </div>

            {/*  ESG  */}
            <div className="timeline__item" id="exp-esg">
              <div className="timeline__dot"></div>
              <div className="timeline__content glass-card">
                <div className="timeline__header">
                  <div>
                    <h3 className="timeline__title">Self Paced Internship</h3>
                    <p className="timeline__company">
                      <i className="fas fa-building"></i> ESG Virtual Experience
                      Program
                    </p>
                  </div>
                  <div className="timeline__meta">
                    <span className="timeline__date">
                      <i className="fas fa-calendar-alt"></i> June 2023 – June
                      2023
                    </span>
                    <span className="timeline__type">
                      <i className="fas fa-map-marker-alt"></i> Remote
                    </span>
                  </div>
                </div>
                <ul className="timeline__bullets">
                  <li>
                    Completed{" "}
                    <strong>TCS ESG Virtual Experience Program</strong>, gaining
                    insights into sustainability and business strategy.
                  </li>
                  <li>
                    Worked on client analysis and sustainability solution
                    assessment to address <strong>real-world challenges</strong>
                    .
                  </li>
                  <li>
                    Developed and presented <strong>fitment matrices</strong>{" "}
                    for evaluating sustainability solutions.
                  </li>
                </ul>
                <div className="timeline__tags">
                  <span>ESG</span>
                  <span>Sustainability</span>
                  <span>Business Strategy</span>
                  <span>TCS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  ===== CERTIFICATIONS =====  */}
      <section id="certifications" className="certifications section">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">Credentials</span>
            <h2 className="section__title">
              Certifications &{" "}
              <span className="gradient-text">Achievements</span>
            </h2>
          </div>
          <div className="certs__grid">
            {/*  Internship Certificate  */}
            <div className="cert-card glass-card" id="cert-internship">
              <div
                className="cert-card__icon"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                }}
              >
                <i className="fas fa-laptop-code"></i>
              </div>
              <div className="cert-card__body">
                <h3>Web Development Intern</h3>
                <p className="cert-issuer">AspireNex</p>
                <span className="cert-badge cert-badge--course">
                  📜 Certificate
                </span>
                <a
                  href="/certificates/AspireNxt.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-view-btn"
                >
                  <i className="fa-solid fa-eye"></i> View Certificate
                </a>
              </div>
            </div>

            {/*  Java & Spring Boot  */}
            <div className="cert-card glass-card" id="cert-java-spring">
              <div
                className="cert-card__icon"
                style={{
                  background: "linear-gradient(135deg, #f7971e, #ffd200)",
                }}
              >
                <i className="fab fa-java"></i>
              </div>
              <div className="cert-card__body">
                <h3>Java with Spring Boot</h3>
                <p className="cert-issuer">Tudip Learning</p>
                <span className="cert-badge cert-badge--course">
                  📜 Certificate
                </span>
                <a
                  href="/certificates/Springboot.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-view-btn"
                >
                  <i className="fa-solid fa-eye"></i> View Certificate
                </a>
              </div>
            </div>

            {/*  Blockchain  */}
            <div className="cert-card glass-card" id="cert-blockchain">
              <div
                className="cert-card__icon"
                style={{
                  background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                }}
              >
                <i className="fas fa-link"></i>
              </div>
              <div className="cert-card__body">
                <h3>Blockchain Path</h3>
                <p className="cert-issuer">CodeStudio</p>
                <span className="cert-badge cert-badge--course">
                  📜 Certificate
                </span>
                <a
                  href="/certificates/Blockchain_Certificate.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-view-btn"
                >
                  <i className="fa-solid fa-eye"></i> View Certificate
                </a>
              </div>
            </div>

            {/*  AI for India  */}
            <div className="cert-card glass-card" id="cert-ai">
              <div
                className="cert-card__icon"
                style={{
                  background: "linear-gradient(135deg, #11998e, #38ef7d)",
                }}
              >
                <i className="fa-solid fa-robot"></i>
              </div>
              <div className="cert-card__body">
                <h3>AI For India 2.0</h3>
                <p className="cert-issuer">Skill India Digital</p>
                <span className="cert-badge cert-badge--course">
                  📜 Certificate
                </span>
                <a
                  href="/certificates/ai_for_india.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-view-btn"
                >
                  <i className="fa-solid fa-eye"></i> View Certificate
                </a>
              </div>
            </div>

            {/*  ESG TCS  */}
            <div className="cert-card glass-card" id="cert-esg">
              <div
                className="cert-card__icon"
                style={{
                  background: "linear-gradient(135deg, #56ab2f, #a8e063)",
                }}
              >
                <i className="fa-solid fa-globe-americas"></i>
              </div>
              <div className="cert-card__body">
                <h3>ESG Experience Program</h3>
                <p className="cert-issuer">TCS / Forage</p>
                <span className="cert-badge cert-badge--course">
                  📜 Certificate
                </span>
                <a
                  href="/certificates/esg_tcs_forage.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-view-btn"
                >
                  <i className="fa-solid fa-eye"></i> View Certificate
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  ===== EDUCATION =====  */}
      <section id="education" className="education section">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">My Background</span>
            <h2 className="section__title">Education</h2>
          </div>
          <div className="education__grid">
            <div className="edu-card glass-card" id="edu-degree">
              <div className="edu-card__icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <div className="edu-card__body">
                <h3>Bachelor Of Technology</h3>
                <p className="edu-card__inst">Bansal College Of Engineering</p>
                <p className="edu-card__year">2021 – 2025</p>
                <p className="edu-card__score">7.87 CGPA</p>
              </div>
            </div>

            <div className="edu-card glass-card" id="edu-school">
              <div className="edu-card__icon">
                <i className="fas fa-school"></i>
              </div>
              <div className="edu-card__body">
                <h3>12th</h3>
                <p className="edu-card__inst">
                  Government Girls Higher Secondary School
                </p>
                <p className="edu-card__year">2020 – 2021</p>
                <p className="edu-card__score">93%</p>
              </div>
            </div>

            <div className="edu-card glass-card" id="edu-high">
              <div className="edu-card__icon">
                <i className="fas fa-book"></i>
              </div>
              <div className="edu-card__body">
                <h3>10th</h3>
                <p className="edu-card__inst">
                  Government Girls Higher Secondary School
                </p>
                <p className="edu-card__year">2018 – 2019</p>
                <p className="edu-card__score">92%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  ===== CONTACT =====  */}
      <section id="contact" className="contact section">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">Let's Talk</span>
            <h2 className="section__title">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="section__subtitle">
              Have a project in mind? I'd love to hear about it. Let's build
              something amazing together.
            </p>
          </div>
          <div className="contact__wrapper">
            <div className="contact__info">
              <div className="contact__info-item glass-card" id="contact-email">
                <div className="contact__info-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>shivanigoswami077@gmail.com</p>
                </div>
              </div>
              <div
                className="contact__info-item glass-card"
                id="contact-location"
              >
                <div className="contact__info-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4>Location</h4>
                  <p>Bhopal, India</p>
                </div>
              </div>
              <div
                className="contact__info-item glass-card"
                id="contact-availability"
              >
                <div className="contact__info-icon">
                  <i className="fas fa-circle" style={{ color: "#22c55e" }}></i>
                </div>
                <div>
                  <h4>Status</h4>
                  <p>Open to Opportunities</p>
                </div>
              </div>
            </div>
            <form
              className="contact__form glass-card"
              id="contact-form"
              noValidate
            >
              <div className="form-group">
                <label htmlFor="contact-name">Your Name</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  placeholder="Shri Sharma"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email-input">Your Email</label>
                <input
                  type="email"
                  id="contact-email-input"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  placeholder="Project Discussion"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  placeholder="Tell me about your project..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn--primary btn--full"
                id="contact-submit"
              >
                <i className="fas fa-paper-plane"></i> Send Message
              </button>
              <div id="form-status" className="form-status"></div>
            </form>
          </div>
        </div>
      </section>

      {/*  ===== FOOTER =====  */}
      <footer className="footer">
        <div className="container">
          <div className="footer__inner">
            <a href="#hero" className="logo">
              <span className="logo-bracket">&lt;</span>Shivani
              <span className="logo-bracket">/&gt;</span>
            </a>
            <p className="footer__copy">
              © 2026 Shivani. All rights reserved.
            </p>
            <div className="footer__socials">
              <a
                href="mailto:shivanigoswami077@gmail.com"
                aria-label="Email"
                id="footer-email"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
              <a
                href="https://github.com/shivani763"
                aria-label="GitHub"
                id="footer-github"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/shivani258"
                aria-label="LinkedIn"
                id="footer-linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <button className="back-to-top" id="back-to-top" aria-label="Back to top">
        <i className="fas fa-arrow-up"></i>
      </button>

      {/*  ===== LIGHTBOX =====  */}
      <div id="cert-lightbox" className="cert-lightbox">
        <div className="cert-lightbox__overlay" id="lightbox-overlay"></div>
        <div className="cert-lightbox__container">
          <button className="cert-lightbox__close" id="lightbox-close" aria-label="Close">
            <i className="fas fa-times"></i>
          </button>
          <div className="cert-lightbox__crop-box">
            <img id="lightbox-img" src="" alt="Certificate" className="cert-lightbox__img--cropped" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
