/**
 * AHMED KHALED® — Portfolio Main Controller
 * Modular Vanilla ES6+ Architecture
 */
(() => {
  'use strict';

  const CONFIG = {
    recipientEmail: 'ahmedjulhaji@gmail.com',
    backToTopThreshold: 320,
    emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  };

  /**
   * 1. Dynamic Footer Copyright Year
   */
  const initFooterYear = () => {
    const yearEl = document.getElementById('footerYear');
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  };

  /**
   * 2. Mobile Navigation Drawer
   */
  const initMobileNav = () => {
    const toggleBtn = document.getElementById('mobileToggle');
    const drawer = document.getElementById('mobileDrawer');
    const iconOpen = document.getElementById('menuIconOpen');
    const iconClose = document.getElementById('menuIconClose');

    if (!toggleBtn || !drawer) return;

    const setMenuState = (isOpen) => {
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
      drawer.classList.toggle('open', isOpen);
      if (iconOpen && iconClose) {
        iconOpen.hidden = isOpen;
        iconClose.hidden = !isOpen;
      }
    };

    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      setMenuState(!isExpanded);
    });

    drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuState(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
        setMenuState(false);
        toggleBtn.focus();
      }
    });
  };

  /**
   * 3. Top Scroll Progress Bar & Back-to-Top Button
   */
  const initScrollControls = () => {
    const progressBar = document.getElementById('scrollProgressBar');
    const backToTopBtn = document.getElementById('backToTopBtn');
    let isTicking = false;

    const renderScrollState = () => {
      isTicking = false;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollableHeight > 0 ? Math.min(1, Math.max(0, scrollY / scrollableHeight)) : 0;

      if (progressBar) {
        progressBar.style.transform = `scaleX(${ratio.toFixed(4)})`;
      }

      if (backToTopBtn) {
        backToTopBtn.classList.toggle('visible', scrollY > CONFIG.backToTopThreshold);
      }
    };

    const requestTick = () => {
      if (!isTicking) {
        window.requestAnimationFrame(renderScrollState);
        isTicking = true;
      }
    };

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: CONFIG.prefersReducedMotion ? 'auto' : 'smooth',
        });
      });
    }

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });
    renderScrollState();
  };

  /**
   * 4. Interactive Project Category Filtering
   */
  const initProjectFilter = () => {
    const filterButtons = document.querySelectorAll('.filter-pill');
    const projectCards = document.querySelectorAll('.work-card');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const selectedCategory = button.dataset.filter;

        filterButtons.forEach((btn) => {
          const isActive = btn === button;
          btn.classList.toggle('active', isActive);
          btn.setAttribute('aria-selected', String(isActive));
        });

        projectCards.forEach((card) => {
          const cardCategories = (card.dataset.categories || '').split(' ');
          const isVisible = selectedCategory === 'all' || cardCategories.includes(selectedCategory);

          card.classList.toggle('is-hidden', !isVisible);
          if (isVisible) {
            card.classList.add('is-visible');
          }
        });
      });
    });
  };

  /**
   * 5. IntersectionObserver Scroll-Spy & Reveal Animations
   */
  const initObservers = () => {
    const navLinks = document.querySelectorAll('.nav-link[data-nav]');
    const sections = document.querySelectorAll('main section[id]');
    const revealTargets = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      revealTargets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    if (sections.length && navLinks.length) {
      const spyObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const currentId = entry.target.id;
              navLinks.forEach((link) => {
                link.classList.toggle('active', link.dataset.nav === currentId);
              });
            }
          });
        },
        { rootMargin: '-35% 0px -50% 0px', threshold: 0 }
      );

      sections.forEach((section) => spyObserver.observe(section));
    }

    if (revealTargets.length) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -24px 0px' }
      );

      revealTargets.forEach((target) => revealObserver.observe(target));
    }
  };

  /**
   * 6. Contact Form Validation & Mailto Dispatch
   */
  const initContactForm = () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const fields = {
      name: {
        input: document.getElementById('contactName'),
        error: document.getElementById('nameError'),
        validate: (val) => (!val ? 'Please enter your name.' : val.length < 2 ? 'Name must be at least 2 characters.' : ''),
      },
      email: {
        input: document.getElementById('contactEmail'),
        error: document.getElementById('emailError'),
        validate: (val) => (!val ? 'Please enter your email address.' : !CONFIG.emailPattern.test(val) ? 'Please enter a valid email address.' : ''),
      },
      message: {
        input: document.getElementById('contactMessage'),
        error: document.getElementById('messageError'),
        validate: (val) => (!val ? 'Please enter a message.' : val.length < 10 ? 'Message must be at least 10 characters.' : ''),
      },
    };

    const banner = document.getElementById('confirmationBanner');
    const bannerText = document.getElementById('confirmationText');
    const mailtoLink = document.getElementById('mailtoDispatch');

    const validateField = ({ input, error, validate }) => {
      const message = validate(input.value.trim());
      error.textContent = message;

      if (message) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        input.setAttribute('aria-invalid', 'true');
        return false;
      }

      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      input.removeAttribute('aria-invalid');
      return true;
    };

    Object.values(fields).forEach((field) => {
      field.input.addEventListener('input', () => validateField(field));
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const results = Object.values(fields).map((field) => ({
        field,
        isValid: validateField(field),
      }));

      const firstInvalid = results.find((item) => !item.isValid);
      if (firstInvalid) {
        firstInvalid.field.input.focus();
        return;
      }

      const name = fields.name.input.value.trim();
      const email = fields.email.input.value.trim();
      const message = fields.message.input.value.trim();

      const subject = encodeURIComponent(`Engineering Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

      if (mailtoLink) {
        mailtoLink.href = `mailto:${CONFIG.recipientEmail}?subject=${subject}&body=${body}`;
      }

      if (banner && bannerText) {
        bannerText.textContent = `Thank you, ${name}. Your message is validated and ready to send.`;
        banner.classList.add('visible');
      }

      form.reset();
      Object.values(fields).forEach(({ input }) => input.classList.remove('is-valid', 'is-invalid'));
    });
  };

  /**
   * Bootstrap Application
   */
  document.addEventListener('DOMContentLoaded', () => {
    initFooterYear();
    initMobileNav();
    initScrollControls();
    initProjectFilter();
    initObservers();
    initContactForm();
  });
})();