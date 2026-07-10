/* ========================================
   PREMIUM HAPPY SCOOPS - JAVASCRIPT
   Interactive Features & Animations
======================================== */

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollProgress();
  initBackToTop();
  initCarousel();
  initMenuFilters();
  initAnimations();
  initFormValidation();
  initStatCounters();
});

// ==========================================
// NAVIGATION
// ==========================================
function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navbar = document.getElementById('navbar');
  const navLinkItems = document.querySelectorAll('.nav-link');

  // Hamburger Menu Toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking nav link
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Navbar Scroll Effect
  if (navbar) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });
  }
}

// ==========================================
// SCROLL PROGRESS BAR
// ==========================================
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.pageYOffset / windowHeight) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }
}

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// ==========================================
// IMAGE CAROUSEL
// ==========================================
function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let slideInterval;

  if (slides.length === 0) return;

  function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add('active');
    }
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function startCarousel() {
    slideInterval = setInterval(nextSlide, 4000);
  }

  function stopCarousel() {
    clearInterval(slideInterval);
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      stopCarousel();
      startCarousel();
    });
  });

  // Pause on hover
  const carouselContainer = document.querySelector('.image-carousel');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopCarousel);
    carouselContainer.addEventListener('mouseleave', startCarousel);
  }

  // Start carousel
  startCarousel();
  showSlide(0);
}

// ==========================================
// MENU FILTERS
// ==========================================
function initMenuFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  if (filterButtons.length === 0 || menuCards.length === 0) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter cards with animation
      menuCards.forEach((card, index) => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          // Show card
          card.classList.remove('hide');
          card.style.animation = `fadeInScale 0.6s ease ${index * 0.05}s forwards`;
        } else {
          // Hide card
          card.classList.add('hide');
        }
      });
    });
  });

  // Order button click handlers
  const orderButtons = document.querySelectorAll('.order-btn');
  orderButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Redirect to contact page
      window.location.href = btn.closest('a')?.href || '/contact';
    });
  });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
function initAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements with animation
  const animatedElements = document.querySelectorAll('.feature-card, .menu-card, .stat-card, .mv-card, .info-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ==========================================
// FORM VALIDATION & SUBMISSION
// ==========================================
function initFormValidation() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.querySelector('.submit-btn');

  if (!form) return;

  // Real-time validation
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateInput(input);
    });

    input.addEventListener('input', () => {
      if (input.classList.contains('invalid')) {
        validateInput(input);
      }
    });
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    let isValid = true;

    inputs.forEach(input => {
      if (!validateInput(input)) {
        isValid = false;
      }
    });

    if (isValid && submitBtn) {
      // Show loading state
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      // The form will submit normally to Flask
      // Loading state will persist until page reloads
    } else if (!isValid) {
      e.preventDefault();
    }
  });
}

function validateInput(input) {
  const value = input.value.trim();
  let isValid = true;

  // Required validation
  if (input.hasAttribute('required') && !value) {
    isValid = false;
  }

  // Email validation
  if (input.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = emailRegex.test(value);
  }

  // Phone validation
  if (input.type === 'number' && input.name === 'mobile_number' && value) {
    isValid = value.length >= 10;
  }

  // Update UI
  if (isValid) {
    input.classList.remove('invalid');
    input.classList.add('valid');
  } else {
    input.classList.remove('valid');
    input.classList.add('invalid');
  }

  return isValid;
}

// ==========================================
// ANIMATED COUNTERS
// ==========================================
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  
  if (statNumbers.length === 0) return;

  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        animateCounter(entry.target);
        entry.target.classList.add('counted');
      }
    });
  }, observerOptions);

  statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// ==========================================
// SMOOTH SCROLLING
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ==========================================
// RIPPLE EFFECT FOR BUTTONS
// ==========================================
function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.classList.add('ripple');

  button.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

document.querySelectorAll('.btn, .filter-btn, .order-btn').forEach(button => {
  button.addEventListener('click', createRipple);
});

// Add ripple CSS
const style = document.createElement('style');
style.textContent = `
  .btn, .filter-btn, .order-btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ==========================================
// LAZY LOADING IMAGES
// ==========================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================
document.addEventListener('keydown', (e) => {
  // ESC key to close mobile menu
  if (e.key === 'Escape') {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks && navLinks.classList.contains('active')) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
let resizeTimer;
window.addEventListener('resize', () => {
  document.body.classList.add('resize-animation-stopper');
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove('resize-animation-stopper');
  }, 400);
});

const resizeStyle = document.createElement('style');
resizeStyle.textContent = `
  .resize-animation-stopper * {
    animation: none !important;
    transition: none !important;
  }
`;
document.head.appendChild(resizeStyle);

// ==========================================
// CONSOLE EASTER EGG
// ==========================================
console.log('%c🍦 Happy Scoops', 'font-size: 24px; font-weight: bold; color: #FF6B9D;');
console.log('%cMade with ❤️ and ice cream', 'font-size: 14px; color: #636E72;');
console.log('%cVisit us at: City Center, Hazratganj, Lucknow', 'font-size: 12px; color: #95E1D3;');
