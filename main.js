/* ============================================================
   JU. — Digital Architect | Portfolio Main JS
   Vanilla ES6+ | No Dependencies
   ============================================================ */

(() => {
  'use strict';

  /* ----------------------------------------------------------
     UTILITIES
  ---------------------------------------------------------- */
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
  const isTouchDevice = () =>
    'ontouchstart' in window || navigator.maxTouchPoints > 0;

  /* ----------------------------------------------------------
     1. CUSTOM CURSOR SYSTEM
  ---------------------------------------------------------- */
  const Cursor = {
    el: null,
    glow: null,
    mouse: { x: 0, y: 0 },
    pos: { x: 0, y: 0 },
    glowPos: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    prev: { x: 0, y: 0 },
    hovering: false,
    raf: null,

    visible: true,

    init() {
      if (isTouchDevice()) return;

      this.el = document.querySelector('.cursor');
      this.glow = document.querySelector('.cursor-glow');
      if (!this.el) return;

      document.addEventListener('mousemove', (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      });

      document.addEventListener('mouseleave', () => {
        this.visible = false;
        if (this.el) this.el.style.opacity = '0';
        if (this.glow) this.glow.style.opacity = '0';
      });

      document.addEventListener('mouseenter', (e) => {
        this.visible = true;
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        this.glowPos.x = e.clientX;
        this.glowPos.y = e.clientY;
        this.pos.x = e.clientX;
        this.pos.y = e.clientY;
        if (this.el) this.el.style.opacity = '1';
        if (this.glow) this.glow.style.opacity = '1';
      });

      const interactiveSelector =
        'a, button, .card, .glass-card, [data-hover], input, textarea';

      document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveSelector)) {
          this.hovering = true;
          this.el.classList.add('hovering');
          if (this.glow) this.glow.classList.add('hovering');
        }
      });

      document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactiveSelector)) {
          this.hovering = false;
          this.el.classList.remove('hovering');
          if (this.glow) this.glow.classList.remove('hovering');
        }
      });

      this.loop();
    },

    loop() {
      this.velocity.x = this.mouse.x - this.prev.x;
      this.velocity.y = this.mouse.y - this.prev.y;
      this.prev.x = this.mouse.x;
      this.prev.y = this.mouse.y;

      this.pos.x = lerp(this.pos.x, this.mouse.x, 0.18);
      this.pos.y = lerp(this.pos.y, this.mouse.y, 0.18);

      if (this.el) {
        this.el.style.transform =
          `translate3d(${this.pos.x}px, ${this.pos.y}px, 0)`;
      }

      if (this.glow) {
        this.glowPos.x = lerp(this.glowPos.x, this.mouse.x, 0.1);
        this.glowPos.y = lerp(this.glowPos.y, this.mouse.y, 0.1);
        this.glow.style.transform =
          `translate3d(${this.glowPos.x}px, ${this.glowPos.y}px, 0)`;
      }

      this.raf = requestAnimationFrame(() => this.loop());
    },

    destroy() {
      if (this.raf) cancelAnimationFrame(this.raf);
    }
  };

  /* ----------------------------------------------------------
     2. SCROLL-TRIGGERED REVEAL ANIMATIONS
  ---------------------------------------------------------- */
  const Reveals = {
    observer: null,

    init() {
      const targets = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-scale'
      );
      if (!targets.length) return;

      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            el.classList.add('visible');

            // Stagger children that have .stagger-child
            const children = el.querySelectorAll('.stagger-child');
            children.forEach((child, i) => {
              child.style.transitionDelay = `${i * 0.08}s`;
              child.classList.add('visible');
            });

            this.observer.unobserve(el);
          });
        },
        { threshold: 0.15 }
      );

      targets.forEach((el) => this.observer.observe(el));
    },

    destroy() {
      if (this.observer) this.observer.disconnect();
    }
  };

  /* ----------------------------------------------------------
     3. SMOOTH SCROLL FOR ANCHOR LINKS
  ---------------------------------------------------------- */
  const SmoothScroll = {
    headerOffset: 80,

    init() {
      document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;

        const id = link.getAttribute('href');
        if (id === '#') return;

        const target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();
        const top =
          target.getBoundingClientRect().top +
          window.scrollY -
          this.headerOffset;

        window.scrollTo({ top, behavior: 'smooth' });

        // Close mobile menu if open
        document.body.classList.remove('menu-open');
      });
    }
  };

  /* ----------------------------------------------------------
     4. PARALLAX EFFECTS
  ---------------------------------------------------------- */
  const Parallax = {
    elements: [],
    raf: null,
    ticking: false,

    init() {
      this.elements = [...document.querySelectorAll('[data-parallax]')];
      if (!this.elements.length) return;

      window.addEventListener('scroll', () => {
        if (!this.ticking) {
          this.ticking = true;
          requestAnimationFrame(() => this.update());
        }
      }, { passive: true });

      this.update();
    },

    update() {
      const scrollY = window.scrollY;

      this.elements.forEach((el) => {
        const rate = parseFloat(el.dataset.parallax) || 0.1;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const viewCenter = window.innerHeight / 2;
        const offset = (center - viewCenter) * rate;

        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      });

      this.ticking = false;
    }
  };

  /* ----------------------------------------------------------
     5. MAGNETIC HOVER EFFECT
  ---------------------------------------------------------- */
  const Magnetic = {
    elements: [],
    radius: 150,

    init() {
      this.elements = [...document.querySelectorAll('.magnetic')];
      if (!this.elements.length || isTouchDevice()) return;

      this.elements.forEach((el) => {
        el.addEventListener('mousemove', (e) => this.onMove(e, el));
        el.addEventListener('mouseleave', () => this.onLeave(el));
      });
    },

    onMove(e, el) {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.radius) {
        const pull = 1 - dist / this.radius;
        const moveX = dx * pull * 0.35;
        const moveY = dy * pull * 0.35;
        el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        el.style.transition = 'transform 0.15s ease-out';
      }
    },

    onLeave(el) {
      el.style.transform = 'translate3d(0, 0, 0)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    }
  };

  /* ----------------------------------------------------------
     6. TEXT SPLIT ANIMATION
  ---------------------------------------------------------- */
  const SplitText = {
    observer: null,

    init() {
      const targets = document.querySelectorAll('.split-text');
      if (!targets.length) return;

      targets.forEach((el) => {
        const text = el.textContent;
        el.innerHTML = '';
        el.setAttribute('aria-label', text);

        [...text].forEach((char, i) => {
          const span = document.createElement('span');
          span.classList.add('split-char');
          span.style.transitionDelay = `${i * 0.03}s`;
          span.textContent = char === ' ' ? '\u00A0' : char;
          el.appendChild(span);
        });
      });

      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            this.observer.unobserve(entry.target);
          });
        },
        { threshold: 0.15 }
      );

      targets.forEach((el) => this.observer.observe(el));
    },

    destroy() {
      if (this.observer) this.observer.disconnect();
    }
  };

  /* ----------------------------------------------------------
     7. COUNTER ANIMATION
  ---------------------------------------------------------- */
  const Counters = {
    observer: null,
    duration: 2000,

    init() {
      const targets = document.querySelectorAll('.counter[data-target]');
      if (!targets.length) return;

      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            this.animate(entry.target);
            this.observer.unobserve(entry.target);
          });
        },
        { threshold: 0.15 }
      );

      targets.forEach((el) => this.observer.observe(el));
    },

    animate(el) {
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const start = performance.now();

      const easeOutExpo = (t) =>
        t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / this.duration, 1);
        const eased = easeOutExpo(progress);
        const current = Math.round(eased * target);

        el.textContent = current.toLocaleString() + suffix;

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    },

    destroy() {
      if (this.observer) this.observer.disconnect();
    }
  };

  /* ----------------------------------------------------------
     8. HEADER BEHAVIOR
  ---------------------------------------------------------- */
  const Header = {
    el: null,
    lastScroll: 0,
    scrollThreshold: 80,
    delta: 5,

    init() {
      this.el = document.querySelector('header, .site-header, [data-header]');
      if (!this.el) return;

      window.addEventListener('scroll', () => this.onScroll(), {
        passive: true
      });
      this.onScroll();
    },

    onScroll() {
      const scrollY = window.scrollY;

      // Shrink state
      if (scrollY > this.scrollThreshold) {
        this.el.classList.add('scrolled');
      } else {
        this.el.classList.remove('scrolled');
      }

      // Show / hide based on direction
      if (Math.abs(scrollY - this.lastScroll) < this.delta) return;

      if (scrollY > this.lastScroll && scrollY > this.scrollThreshold) {
        this.el.classList.add('header-hidden');
      } else {
        this.el.classList.remove('header-hidden');
      }

      this.lastScroll = scrollY;
    }
  };

  /* ----------------------------------------------------------
     9. MOBILE MENU TOGGLE
  ---------------------------------------------------------- */
  const MobileMenu = {
    toggle: null,
    overlay: null,

    init() {
      this.toggle = document.querySelector('.mobile-menu-toggle');
      this.overlay = document.querySelector('.mobile-menu-overlay');
      if (!this.toggle || !this.overlay) return;

      this.toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle.classList.toggle('active');
        this.overlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
      });

      // Close on nav link click
      this.overlay.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          this.close();
        });
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (
          document.body.classList.contains('menu-open') &&
          !e.target.closest('.mobile-menu-overlay, .mobile-menu-toggle')
        ) {
          this.close();
        }
      });

      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
          this.close();
        }
      });

      // Prevent body scroll when menu is open
      document.addEventListener('touchmove', (e) => {
        if (
          document.body.classList.contains('menu-open') &&
          !e.target.closest('.mobile-menu-overlay')
        ) {
          e.preventDefault();
        }
      }, { passive: false });
    },

    close() {
      if (this.toggle) this.toggle.classList.remove('active');
      if (this.overlay) this.overlay.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  };

  /* ----------------------------------------------------------
     10. PAGE TRANSITION SETUP
  ---------------------------------------------------------- */
  const PageTransition = {
    init() {
      // Wait for fonts, then reveal page
      const reveal = () => {
        requestAnimationFrame(() => {
          document.body.classList.add('page-loaded');
        });

        // Stagger section reveals
        const sections = document.querySelectorAll('section');
        sections.forEach((section, i) => {
          section.style.transitionDelay = `${0.1 + i * 0.12}s`;
        });
      };

      // Use font loading API if available, fallback to load event
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(reveal);
      } else {
        window.addEventListener('load', reveal);
      }

      // Safety net: reveal after 1.2s no matter what
      setTimeout(reveal, 1200);
    }
  };

  /* ----------------------------------------------------------
     11. TILT CARD EFFECT
  ---------------------------------------------------------- */
  const TiltCards = {
    maxRotation: 8,

    init() {
      const cards = document.querySelectorAll('.tilt-card');
      if (!cards.length || isTouchDevice()) return;

      cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => this.onMove(e, card));
        card.addEventListener('mouseleave', () => this.onLeave(card));
      });
    },

    onMove(e, card) {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * this.maxRotation * 2;
      const rotateX = (0.5 - y) * this.maxRotation * 2;

      card.style.transform =
        `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
      card.style.transition = 'transform 0.1s ease-out';

      // Move inner highlight
      const shine = card.querySelector('.tilt-shine');
      if (shine) {
        shine.style.background =
          `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.12) 0%, transparent 60%)`;
      }
    },

    onLeave(card) {
      card.style.transform =
        'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition =
        'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';

      const shine = card.querySelector('.tilt-shine');
      if (shine) shine.style.background = 'none';
    }
  };

  /* ----------------------------------------------------------
     12. PARTICLE BACKGROUND
  ---------------------------------------------------------- */
  const Particles = {
    canvas: null,
    ctx: null,
    particles: [],
    count: 100,
    mouse: { x: -9999, y: -9999 },
    raf: null,

    init() {
      this.canvas = document.getElementById('particles');
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.resize();

      window.addEventListener('resize', () => this.resize());
      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      });

      this.spawn();
      this.loop();
    },

    resize() {
      if (!this.canvas) return;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    },

    spawn() {
      this.particles = [];
      for (let i = 0; i < this.count; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.4 + 0.1
        });
      }
    },

    loop() {
      if (!this.ctx) return;
      const { width, height } = this.canvas;
      this.ctx.clearRect(0, 0, width, height);

      this.particles.forEach((p) => {
        // Mouse repulsion
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx += (dx / dist) * force * 0.15;
          p.vy += (dy / dist) * force * 0.15;
        }

        // Damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Base drift
        p.vx += (Math.random() - 0.5) * 0.01;
        p.vy += (Math.random() - 0.5) * 0.01;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        this.ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const a = this.particles[i];
          const b = this.particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.12;
            this.ctx.beginPath();
            this.ctx.moveTo(a.x, a.y);
            this.ctx.lineTo(b.x, b.y);
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.stroke();
          }
        }
      }

      this.raf = requestAnimationFrame(() => this.loop());
    },

    destroy() {
      if (this.raf) cancelAnimationFrame(this.raf);
    }
  };

  /* ----------------------------------------------------------
     INITIALIZATION
  ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    const touch = isTouchDevice();

    // Always init
    Header.init();
    MobileMenu.init();
    SmoothScroll.init();
    Counters.init();
    PageTransition.init();

    if (touch) {
      // Mobile: skip heavy effects, just show content
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
        .forEach((el) => el.classList.add('visible'));
    } else {
      // Desktop: full experience
      Cursor.init();
      Reveals.init();
      Parallax.init();
      Magnetic.init();
      SplitText.init();
      TiltCards.init();
      Particles.init();
    }
  });
})();
