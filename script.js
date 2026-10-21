/**
 * ============================================================================
 * NITYANANDA SAHU — MONOGRAPHIC PORTFOLIO
 * Vanilla JavaScript Engine
 * 
 * Features:
 *  1. Dynamic Gallery Generation with Proportional Interleaving
 *  2. Museum-Grade Filtering with CSS Reflow Animations (.fade-in)
 *  3. Dynamic Lightbox System with Filter-Aware Cycling & Touch Gestures
 *  4. Dynamic Navbar Scroll Effects (.scrolled at > 50px)
 *  5. Mobile Navigation Menu Toggle with Hamburger-to-X Animation
 *  6. Smooth Anchor Scrolling with Fixed Header Offset (~80px)
 *  7. Intersection Observer Scroll Reveal System (.reveal -> .active)
 *  8. Scroll-Spy Active Nav Link Highlighting
 *  9. Studio Contact Form Handler with Toast Notification System
 * 10. Progressive Image Loading & Skeleton Placeholder Removal
 * ============================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     01. GLOBAL CONFIGURATION & ARTWORK DATA
     ========================================================================== */

  // Artwork collection configuration
  const GALLERY_CONFIG = {
    sculpture: {
      category: 'sculpture',
      categoryLabel: 'Sculpture',
      count: 27,
      folder: 'pictures/sculpture',
      uppercaseIndices: new Set([22]) // 22.JPG on filesystem
    },
    realistic: {
      category: 'realistic',
      categoryLabel: 'Realistic Painting',
      count: 50,
      folder: 'pictures/realistic',
      uppercaseIndices: new Set([6]) // 6.JPG on filesystem
    },
    portrait: {
      category: 'portrait',
      categoryLabel: 'Portrait',
      count: 50,
      folder: 'pictures/portrait',
      uppercaseIndices: new Set([7, 13, 21, 22, 33, 36, 43]) // Uppercase .JPG files
    }
  };

  /**
   * Helper to construct image path, handling uppercase .JPG vs lowercase .jpg
   */
  function getImagePath(categoryKey, plateNumber) {
    const config = GALLERY_CONFIG[categoryKey];
    const isUpper = config && config.uppercaseIndices && config.uppercaseIndices.has(plateNumber);
    const extension = isUpper ? 'JPG' : 'jpg';
    return `pictures/${categoryKey}/${plateNumber}.${extension}`;
  }

  /**
   * Generates raw collection arrays for each category
   */
  function generateCategoryArtworks(categoryKey) {
    const config = GALLERY_CONFIG[categoryKey];
    const items = [];
    for (let i = 1; i <= config.count; i++) {
      items.push({
        category: config.category,
        categoryLabel: config.categoryLabel,
        plateNumber: i,
        src: getImagePath(categoryKey, i),
        alt: `${config.categoryLabel} — Plate No. ${i}`,
        title: config.categoryLabel,
        numberText: `Plate No. ${i}`
      });
    }
    return items;
  }

  /**
   * Proportional Deficit Interleaving Algorithm
   * Curates 127 artworks (50 realistic, 50 portrait, 27 sculpture) into a
   * harmonious museum exhibition sequence where sculptures are distributed
   * evenly throughout rather than clumped together at the start or end.
   */
  function interleaveArtworks(sculptureList, realisticList, portraitList) {
    const sQueue = [...sculptureList];
    const rQueue = [...realisticList];
    const pQueue = [...portraitList];
    const interleaved = [];
    const totalCount = sculptureList.length + realisticList.length + portraitList.length;

    let sCount = 0;
    let rCount = 0;
    let pCount = 0;

    for (let step = 0; step < totalCount; step++) {
      const targetStep = step + 1;
      const expectedS = (targetStep * sculptureList.length) / totalCount;
      const expectedR = (targetStep * realisticList.length) / totalCount;
      const expectedP = (targetStep * portraitList.length) / totalCount;

      const sDeficit = sQueue.length > 0 ? expectedS - sCount : -Infinity;
      const rDeficit = rQueue.length > 0 ? expectedR - rCount : -Infinity;
      const pDeficit = pQueue.length > 0 ? expectedP - pCount : -Infinity;

      if (sDeficit >= rDeficit && sDeficit >= pDeficit && sQueue.length > 0) {
        interleaved.push(sQueue.shift());
        sCount++;
      } else if (rDeficit >= pDeficit && rQueue.length > 0) {
        interleaved.push(rQueue.shift());
        rCount++;
      } else if (pQueue.length > 0) {
        interleaved.push(pQueue.shift());
        pCount++;
      } else if (rQueue.length > 0) {
        interleaved.push(rQueue.shift());
        rCount++;
      } else if (sQueue.length > 0) {
        interleaved.push(sQueue.shift());
        sCount++;
      }
    }

    return interleaved;
  }


  /* ==========================================================================
     02. DYNAMIC GALLERY GENERATION & IMAGE PLACEHOLDER HANDLING
     ========================================================================== */

  const galleryGrid = document.getElementById('gallery-grid');
  let allGalleryItems = [];

  function buildGallery() {
    if (!galleryGrid) return;

    // Inject loading & overlay helper CSS dynamically to ensure rock-solid appearance
    injectHelperStyles();

    const sculptures = generateCategoryArtworks('sculpture');
    const realistic = generateCategoryArtworks('realistic');
    const portraits = generateCategoryArtworks('portrait');

    const curatedCollection = interleaveArtworks(sculptures, realistic, portraits);
    const fragment = document.createDocumentFragment();

    curatedCollection.forEach((artwork, index) => {
      const item = document.createElement('div');
      item.className = 'gallery-item loading fade-in';
      item.dataset.category = artwork.category;
      item.dataset.index = index.toString();
      item.dataset.plateNumber = artwork.plateNumber.toString();
      item.dataset.categoryLabel = artwork.categoryLabel;

      // Image element with lazy loading
      const img = document.createElement('img');
      img.src = artwork.src;
      img.alt = artwork.alt;
      img.loading = 'lazy';
      img.decoding = 'async';

      // Progressive image loading enhancement
      const onImageSuccess = () => {
        item.classList.remove('loading');
        item.classList.add('loaded');
      };

      if (img.complete && img.naturalWidth > 0) {
        onImageSuccess();
      } else {
        img.addEventListener('load', onImageSuccess);
      }

      // Robust fallback for uppercase vs lowercase extension
      img.addEventListener('error', function onImageError() {
        if (!this.dataset.fallbackTried) {
          this.dataset.fallbackTried = 'true';
          if (this.src.endsWith('.jpg')) {
            this.src = this.src.slice(0, -4) + '.JPG';
            return;
          } else if (this.src.endsWith('.JPG')) {
            this.src = this.src.slice(0, -4) + '.jpg';
            return;
          }
        }
        item.classList.remove('loading');
        item.classList.add('image-error');
      });

      // Image wrapper with 4:5 aspect ratio to prevent CLS layout shift
      const imgWrap = document.createElement('div');
      imgWrap.className = 'gallery-item-image-wrapper';

      // Hover overlay matching required structure
      const overlay = document.createElement('div');
      overlay.className = 'overlay';

      const titleSpan = document.createElement('span');
      titleSpan.className = 'overlay-title artwork-title';
      titleSpan.textContent = artwork.categoryLabel;

      const numberSpan = document.createElement('span');
      numberSpan.className = 'overlay-number artwork-category';
      numberSpan.textContent = `Plate No. ${artwork.plateNumber}`;

      overlay.appendChild(titleSpan);
      overlay.appendChild(numberSpan);

      imgWrap.appendChild(img);
      imgWrap.appendChild(overlay);
      item.appendChild(imgWrap);

      fragment.appendChild(item);
    });

    galleryGrid.innerHTML = '';
    galleryGrid.appendChild(fragment);

    allGalleryItems = Array.from(galleryGrid.querySelectorAll('.gallery-item'));
  }


  /* ==========================================================================
     03. GALLERY FILTERING SYSTEM
     ========================================================================== */

  const filterTabs = document.querySelectorAll('.filter-tab');

  function initGalleryFiltering() {
    if (!filterTabs.length || !galleryGrid) return;

    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetFilter = tab.getAttribute('data-filter') || 'all';

        // Update active tab styling
        filterTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        // Filter items with reflow-triggered CSS animations
        allGalleryItems.forEach(item => {
          const category = item.dataset.category;
          const isMatch = (targetFilter === 'all' || category === targetFilter);

          if (isMatch) {
            item.classList.remove('hidden');
            item.style.display = '';

            // Force reflow to re-trigger smooth fade-in animation
            item.classList.remove('fade-in');
            void item.offsetWidth;
            item.classList.add('fade-in');
          } else {
            item.classList.add('hidden');
            item.classList.remove('fade-in');
            item.style.display = 'none';
          }
        });
      });
    });
  }


  /* ==========================================================================
     04. LIGHTBOX SYSTEM (MODAL, CONTROLS, TOUCH & ACCESSIBILITY)
     ========================================================================== */

  let lightboxEl = null;
  let lightboxImg = null;
  let lightboxCaption = null;
  let lightboxCounter = null;
  let lightboxCloseBtn = null;
  let lightboxPrevBtn = null;
  let lightboxNextBtn = null;

  let currentVisibleIndex = 0;
  let isLightboxOpen = false;

  /**
   * Returns only currently visible (filtered) gallery items
   */
  function getCurrentlyVisibleItems() {
    return allGalleryItems.filter(item => {
      return !item.classList.contains('hidden') && item.style.display !== 'none';
    });
  }

  /**
   * Creates or configures the Lightbox overlay matching the required DOM structure
   */
  function setupLightbox() {
    let existingLightbox = document.getElementById('lightbox');

    if (!existingLightbox) {
      existingLightbox = document.createElement('div');
      existingLightbox.className = 'lightbox';
      existingLightbox.id = 'lightbox';
      existingLightbox.setAttribute('role', 'dialog');
      existingLightbox.setAttribute('aria-modal', 'true');
      existingLightbox.setAttribute('aria-label', 'Artwork detail preview');
      existingLightbox.setAttribute('aria-hidden', 'true');
      document.body.appendChild(existingLightbox);
    }

    // Ensure the lightbox HTML matches the prompt structure precisely
    existingLightbox.innerHTML = `
      <button class="lightbox-close" id="lightbox-close" aria-label="Close">&times;</button>
      <button class="lightbox-prev" id="lightbox-prev" aria-label="Previous">&#8249;</button>
      <button class="lightbox-next" id="lightbox-next" aria-label="Next">&#8250;</button>
      <div class="lightbox-content">
        <div class="lightbox-img-wrap">
          <img class="lightbox-img" id="lightbox-img" src="" alt="">
        </div>
        <div class="lightbox-caption-wrap">
          <div class="lightbox-caption" id="lightbox-caption"></div>
          <div class="lightbox-details" id="lightbox-details">Monographic Archival Collection</div>
        </div>
        <div class="lightbox-counter" id="lightbox-counter"></div>
      </div>
    `;

    lightboxEl = existingLightbox;
    lightboxImg = lightboxEl.querySelector('.lightbox-img');
    lightboxCaption = lightboxEl.querySelector('.lightbox-caption');
    lightboxCounter = lightboxEl.querySelector('.lightbox-counter');
    lightboxCloseBtn = lightboxEl.querySelector('.lightbox-close');
    lightboxPrevBtn = lightboxEl.querySelector('.lightbox-prev');
    lightboxNextBtn = lightboxEl.querySelector('.lightbox-next');

    // Lightbox Button Listeners
    lightboxCloseBtn.addEventListener('click', closeLightbox);
    lightboxPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(-1);
    });
    lightboxNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(1);
    });

    // Close on backdrop click (outside image and controls)
    lightboxEl.addEventListener('click', (e) => {
      if (
        e.target === lightboxEl ||
        e.target.classList.contains('lightbox-content') ||
        e.target.classList.contains('lightbox-img-wrap')
      ) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
      } else if (e.key === 'ArrowRight') {
        navigateLightbox(1);
      }
    });

    // Touch Swipe Gestures for Mobile
    initLightboxTouchGestures();

    // Event delegation on gallery grid to open lightbox
    if (galleryGrid) {
      galleryGrid.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (!item) return;

        const visibleItems = getCurrentlyVisibleItems();
        const clickedIndex = visibleItems.indexOf(item);
        if (clickedIndex !== -1) {
          openLightbox(clickedIndex);
        }
      });
    }
  }

  /**
   * Opens the lightbox at the specified visible index
   */
  function openLightbox(index) {
    const visibleItems = getCurrentlyVisibleItems();
    if (visibleItems.length === 0) return;

    currentVisibleIndex = (index + visibleItems.length) % visibleItems.length;
    renderLightboxItem();

    lightboxEl.classList.add('active');
    lightboxEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    document.body.style.overflow = 'hidden'; // Scroll lock
    isLightboxOpen = true;

    // Focus close button for accessibility
    if (lightboxCloseBtn) {
      lightboxCloseBtn.focus();
    }
  }

  /**
   * Closes the lightbox
   */
  function closeLightbox() {
    if (!isLightboxOpen) return;

    lightboxEl.classList.remove('active');
    lightboxEl.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    document.body.style.overflow = ''; // Release scroll lock
    isLightboxOpen = false;
  }

  /**
   * Navigates prev (-1) or next (+1) through visible items
   */
  function navigateLightbox(direction) {
    const visibleItems = getCurrentlyVisibleItems();
    if (visibleItems.length <= 1) return;

    currentVisibleIndex = (currentVisibleIndex + direction + visibleItems.length) % visibleItems.length;
    renderLightboxItem();
  }

  /**
   * Updates lightbox DOM with the current item details
   */
  function renderLightboxItem() {
    const visibleItems = getCurrentlyVisibleItems();
    if (visibleItems.length === 0) return;

    const item = visibleItems[currentVisibleIndex];
    const sourceImg = item.querySelector('img');
    const categoryLabel = item.dataset.categoryLabel || 'Fine Art';
    const plateNumber = item.dataset.plateNumber || '1';

    // Caption: "Sculpture — Plate No. 12"
    const captionText = `${categoryLabel} — Plate No. ${plateNumber}`;
    // Counter: "3 / 27" format
    const counterText = `${currentVisibleIndex + 1} / ${visibleItems.length}`;

    // Soft fade transition during image swap
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = 'scale(0.97)';

    const tempImg = new Image();
    tempImg.src = sourceImg.src;

    tempImg.onload = () => {
      lightboxImg.src = sourceImg.src;
      lightboxImg.alt = captionText;
      lightboxCaption.textContent = captionText;
      lightboxCounter.textContent = counterText;
      lightboxImg.style.opacity = '1';
      lightboxImg.style.transform = 'scale(1)';
    };

    tempImg.onerror = () => {
      lightboxImg.src = sourceImg.src;
      lightboxImg.alt = captionText;
      lightboxCaption.textContent = captionText;
      lightboxCounter.textContent = counterText;
      lightboxImg.style.opacity = '1';
      lightboxImg.style.transform = 'scale(1)';
    };
  }

  /**
   * Touch swipe handling for mobile devices
   */
  function initLightboxTouchGestures() {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    lightboxEl.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    lightboxEl.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 1) {
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        handleSwipeGesture();
      }
    }, { passive: true });

    function handleSwipeGesture() {
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      const minSwipeDistance = 50;

      // Horizontal swipe navigation
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
        if (diffX < 0) {
          navigateLightbox(1); // Swipe left -> Next
        } else {
          navigateLightbox(-1); // Swipe right -> Prev
        }
      }
      // Vertical swipe down to dismiss
      else if (diffY > 90 && Math.abs(diffX) < 60) {
        closeLightbox();
      }
    }
  }


  /* ==========================================================================
     05. NAVBAR SCROLL EFFECT (.scrolled at > 50px)
     ========================================================================== */

  const navbar = document.querySelector('.navbar');

  function initNavbarScroll() {
    if (!navbar) return;

    const checkNavbarScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', checkNavbarScroll, { passive: true });
    checkNavbarScroll(); // Initial check
  }


  /* ==========================================================================
     06. MOBILE MENU TOGGLE (.menu-toggle -> .nav-links.active)
     ========================================================================== */

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  function initMobileMenu() {
    if (!menuToggle || !navLinks) return;

    const toggleMenu = (shouldOpen) => {
      const isOpen = typeof shouldOpen === 'boolean'
        ? shouldOpen
        : !navLinks.classList.contains('active');

      // Support both .active (from prompt) and .open (from style.css)
      navLinks.classList.toggle('active', isOpen);
      navLinks.classList.toggle('open', isOpen);
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen.toString());

      // If icon element exists, swap classes
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (isOpen) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    };

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when clicking any nav link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // Close menu on click outside
    document.addEventListener('click', (e) => {
      if (
        navLinks.classList.contains('active') &&
        !navLinks.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        toggleMenu(false);
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        toggleMenu(false);
      }
    });
  }


  /* ==========================================================================
     07. SMOOTH SCROLL WITH FIXED NAVBAR OFFSET (~80px)
     ========================================================================== */

  function initSmoothScroll() {
    const internalAnchors = document.querySelectorAll('a[href^="#"]');

    internalAnchors.forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        if (!href || href === '#') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        if (href.startsWith('#') && href.length > 1) {
          let targetEl = null;
          try {
            targetEl = document.querySelector(href);
          } catch (err) {
            // Invalid selector fallback
            return;
          }

          if (targetEl) {
            e.preventDefault();

            const navHeight = navbar ? navbar.offsetHeight : 80;

            if (window.lenis && typeof window.lenis.scrollTo === 'function') {
              window.lenis.scrollTo(targetEl, { offset: -navHeight, duration: 1.1 });
            } else {
              const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
              window.scrollTo({
                top: targetPos,
                behavior: 'smooth'
              });
            }

            // Update URL hash without causing a page jump
            if (history.pushState) {
              history.pushState(null, '', href);
            }
          }
        }
      });
    });
  }


  /* ==========================================================================
     08. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
     ========================================================================== */

  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Trigger once
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(el => revealObserver.observe(el));
    } else {
      // Fallback for environments lacking IntersectionObserver
      revealElements.forEach(el => el.classList.add('active'));
    }
  }


  /* ==========================================================================
     09. ACTIVE NAV LINK HIGHLIGHTING (SCROLL-SPY)
     ========================================================================== */

  function initActiveNavHighlighting() {
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!navAnchors.length) return;

    const sections = [];
    navAnchors.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href !== '#' && href.length > 1) {
        try {
          const sec = document.querySelector(href);
          if (sec && !sections.includes(sec)) {
            sections.push(sec);
          }
        } catch (e) {
          // Ignored
        }
      }
    });

    if (!sections.length) return;

    const updateActiveSection = () => {
      const scrollPos = window.scrollY;
      const navHeight = navbar ? navbar.offsetHeight : 80;
      const offset = navHeight + 60;

      let currentId = '';

      // Bottom of page detection to activate final section (Contact)
      const isPageBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 80);

      if (isPageBottom) {
        currentId = sections[sections.length - 1].getAttribute('id') || '';
      } else {
        sections.forEach(section => {
          const sectionTop = section.offsetTop - offset;
          const sectionHeight = section.offsetHeight;
          if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentId = section.getAttribute('id') || '';
          }
        });
      }

      // Default to first section when near very top
      if (!currentId && scrollPos < 200 && sections.length > 0) {
        currentId = sections[0].getAttribute('id') || '';
      }

      navAnchors.forEach(link => {
        const href = link.getAttribute('href');
        if (currentId && href === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();
  }


  /* ==========================================================================
     10. CONTACT FORM SUBMISSION & TOAST NOTIFICATION
     ========================================================================== */

  function initContactForm() {
    const contactForm = document.querySelector('.contact-form') || document.querySelector('#contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = contactForm.querySelector('input[name="name"]') || contactForm.querySelector('#name');
      const senderName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Art Enthusiast';

      // Submit button loading animation state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.textContent : 'Send Inquiry';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      setTimeout(() => {
        // Reset form inputs
        contactForm.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Message Sent';
          setTimeout(() => {
            submitBtn.textContent = originalBtnText;
          }, 3000);
        }

        // Display Museum Toast Notification
        showMuseumToast(
          `Thank you, ${senderName}! Your inquiry has been conveyed to Shri Nityananda Sahu's studio. We look forward to connecting with you.`
        );
      }, 600);
    });
  }

  /**
   * Displays a toast notification with styling
   */
  function showMuseumToast(message) {
    let container = document.getElementById('studio-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'studio-toast-container';
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'true');
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'studio-toast';
    toast.innerHTML = `
      <div class="toast-indicator"></div>
      <div class="toast-body">
        <h4 class="toast-title">Studio Transmission</h4>
        <p class="toast-message">${escapeHTML(message)}</p>
      </div>
      <button class="toast-dismiss" aria-label="Dismiss">&times;</button>
    `;

    container.appendChild(toast);

    // Dismiss button click
    const dismissBtn = toast.querySelector('.toast-dismiss');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => removeToast(toast));
    }

    // Slide and fade in
    requestAnimationFrame(() => {
      toast.classList.add('visible');
    });

    // Auto dismiss after 5 seconds
    const autoDismissTimer = setTimeout(() => {
      removeToast(toast);
    }, 5000);

    function removeToast(el) {
      clearTimeout(autoDismissTimer);
      el.classList.remove('visible');
      el.classList.add('removing');
      el.addEventListener('transitionend', () => {
        el.remove();
        if (container.children.length === 0) {
          container.remove();
        }
      }, { once: true });
    }
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }


  /* ==========================================================================
     11. HELPER STYLES INJECTION
     (Ensures shimmer placeholder, toast UI, and overlay styles are 100% styled)
     ========================================================================== */

  function injectHelperStyles() {
    if (document.getElementById('studio-injected-styles')) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'studio-injected-styles';
    styleEl.textContent = `
      /* Gallery Image Shimmer Loading State & 4:5 Aspect Ratio */
      .gallery-item,
      .gallery-item-image-wrapper,
      .gallery-item.loading {
        aspect-ratio: 4 / 5;
        background-color: #EDE9E1;
        position: relative;
      }
      .gallery-item.loading::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.45) 50%, transparent 100%);
        animation: gallerySkeletonShimmer 1.6s infinite;
        pointer-events: none;
      }
      @keyframes gallerySkeletonShimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      .gallery-item img {
        transition: opacity 0.5s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .gallery-item.loading img {
        opacity: 0;
      }
      .gallery-item.loaded img {
        opacity: 1;
      }

      /* Overlay Typography Precision */
      .gallery-item .overlay .overlay-title {
        display: block;
      }
      .gallery-item .overlay .overlay-number {
        display: block;
      }

      /* Studio Toast Notifications */
      #studio-toast-container {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        z-index: 10005;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        max-width: 440px;
        pointer-events: none;
      }
      .studio-toast {
        position: relative;
        display: flex;
        align-items: stretch;
        background: #191816;
        color: #F8F5EE;
        border-radius: 6px;
        border: 1px solid rgba(215, 208, 196, 0.2);
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
        overflow: hidden;
        pointer-events: auto;
        opacity: 0;
        transform: translateY(24px) scale(0.96);
        transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .studio-toast.visible {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      .studio-toast.removing {
        opacity: 0;
        transform: translateY(12px) scale(0.96);
      }
      .toast-indicator {
        width: 5px;
        background: #A65B32;
        flex-shrink: 0;
      }
      .toast-body {
        padding: 1rem 1.25rem;
        flex: 1;
      }
      .toast-title {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 0.95rem;
        font-weight: 600;
        color: #D4AF37;
        margin-bottom: 0.25rem;
        letter-spacing: 0.05em;
      }
      .toast-message {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.85rem;
        line-height: 1.5;
        color: rgba(248, 245, 238, 0.88);
      }
      .toast-dismiss {
        background: transparent;
        border: none;
        color: rgba(248, 245, 238, 0.5);
        font-size: 1.25rem;
        line-height: 1;
        padding: 0.75rem 1rem;
        cursor: pointer;
        align-self: flex-start;
        transition: color 0.2s ease;
      }
      .toast-dismiss:hover {
        color: #FFFFFF;
      }

      @media (max-width: 600px) {
        #studio-toast-container {
          left: 1rem;
          right: 1rem;
          bottom: 1rem;
          max-width: none;
        }
      }
    `;
    document.head.appendChild(styleEl);
  }


  /* ==========================================================================
     12. INITIALIZATION SEQUENCE
     ========================================================================== */

  function initApp() {
    buildGallery();
    initGalleryFiltering();
    setupLightbox();
    initNavbarScroll();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initActiveNavHighlighting();
    initContactForm();
  }

  initApp();
});
