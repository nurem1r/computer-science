// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn && navMenu) {
  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('active');
    const menuBars = mobileMenuBtn.querySelector('.menu-bars');
    if (navMenu.classList.contains('active')) {
      menuBars.innerHTML = '<span style="transform: rotate(45deg) translate(6px, 6px);"></span><span style="opacity: 0;"></span><span style="transform: rotate(-45deg) translate(6px, -6px);"></span>';
    } else {
      menuBars.innerHTML = '<span></span><span></span><span></span>';
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      const menuBars = mobileMenuBtn.querySelector('.menu-bars');
      menuBars.innerHTML = '<span></span><span></span><span></span>';
    }
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const menuBars = mobileMenuBtn.querySelector('.menu-bars');
        menuBars.innerHTML = '<span></span><span></span><span></span>';
      }
    });
  });
}

// Initialize Nivo Slider with Cyber Theme
$(document).ready(function () {
  $('#slider').nivoSlider({
    effect: 'fade',
    slices: 15,
    boxCols: 8,
    boxRows: 4,
    animSpeed: 600,
    pauseTime: 5000,
    startSlide: 0,
    directionNav: true,
    controlNav: true,
    controlNavThumbs: false,
    pauseOnHover: true,
    manualAdvance: false,
    prevText: '<i class="fas fa-chevron-left"></i>',
    nextText: '<i class="fas fa-chevron-right"></i>',
    randomStart: false,
    beforeChange: function () { },
    afterChange: function () { },
    slideshowEnd: function () { },
    lastSlide: function () { },
    afterLoad: function () {
      // Add cyber effects to slider after load
      $('.nivo-caption').addClass('cyber-caption');
    }
  });
});

// Animated Counter for Stats
function animateCounter() {
  const counters = document.querySelectorAll('.stat-number');

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-count');
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });
}

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';

      // Start counter animation when stats section is visible
      if (entry.target.classList.contains('stats-section')) {
        animateCounter();
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.cyber-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// Observe stats section
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  statsSection.style.opacity = '0';
  observer.observe(statsSection);
}

// Terminal Typewriter Effect
function initTerminal() {
  const promptText = document.querySelector('.prompt-text');
  if (promptText) {
    const texts = [
      "Initializing next-generation education system...",
      "Loading AI research modules...",
      "Connecting to global tech network...",
      "System ready for future innovators..."
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentText = texts[textIndex];

      if (isDeleting) {
        promptText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        promptText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }

      setTimeout(type, isDeleting ? 50 : 100);
    }

    setTimeout(type, 1000);
  }
}

// Glitch Effect on Random Elements
function randomGlitch() {
  const elements = document.querySelectorAll('.cyber-card, .nav-link, .section-heading');
  const randomElement = elements[Math.floor(Math.random() * elements.length)];

  randomElement.classList.add('glitch-active');
  setTimeout(() => {
    randomElement.classList.remove('glitch-active');
  }, 200);

  setTimeout(randomGlitch, Math.random() * 5000 + 3000);
}

// Particle System for Background
function createParticles() {
  const container = document.querySelector('.cyber-glows');
  if (!container) return;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'cyber-particle';
    particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--cyber-blue);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 20 + 10}s linear infinite;
            opacity: ${Math.random() * 0.5 + 0.1};
        `;
    container.appendChild(particle);
  }
}

// Add particle animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg); }
        50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg); }
        75% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg); }
        100% { transform: translate(0, 0) rotate(360deg); }
    }

    .glitch-active {
        animation: textGlitch 0.3s linear;
    }

    @keyframes textGlitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(style);

// Header Scroll Effect
let lastScrollY = window.scrollY;
window.addEventListener('scroll', function () {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(10, 14, 23, 0.95)';
    header.style.backdropFilter = 'blur(20px)';
  } else {
    header.style.background = 'rgba(10, 14, 23, 0.9)';
  }

  // Hide header on scroll down
  if (window.scrollY > lastScrollY && window.scrollY > 100) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  lastScrollY = window.scrollY;
});

// Initialize all effects when page loads
window.addEventListener('load', function () {
  document.body.classList.add('loaded');
  initTerminal();
  createParticles();
  setTimeout(randomGlitch, 5000);

  // Add loaded class to trigger animations
  setTimeout(() => {
    document.body.classList.add('fully-loaded');
  }, 1000);
});

// Smooth scrolling for anchor links
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

// Keyboard Navigation
document.addEventListener('keydown', function (e) {
  // Add cyber sound effects or other interactions
  if (e.ctrlKey && e.key === 'k') {
    e.preventDefault();
    // Add search functionality
    console.log('Search triggered');
  }
});

// Performance optimization
let resizeTimeout;
window.addEventListener('resize', function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function () {
    // Recalculate any layout-dependent values
  }, 250);
});

class CyberSlider {
  constructor() {
    this.slides = document.querySelectorAll('.slide');
    this.dots = document.querySelectorAll('.dot');
    this.currentSlide = 0;
    this.interval = null;

    this.init();
  }

  init() {
    // Event listeners
    document.querySelector('.prev-btn').addEventListener('click', () => this.prevSlide());
    document.querySelector('.next-btn').addEventListener('click', () => this.nextSlide());

    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });

    // Auto advance
    this.startAutoSlide();

    // Pause on hover
    const slider = document.querySelector('.custom-slider');
    slider.addEventListener('mouseenter', () => this.stopAutoSlide());
    slider.addEventListener('mouseleave', () => this.startAutoSlide());
  }

  showSlide(index) {
    // Hide all slides
    this.slides.forEach(slide => slide.classList.remove('active'));
    this.dots.forEach(dot => dot.classList.remove('active'));

    // Show current slide
    this.slides[index].classList.add('active');
    this.dots[index].classList.add('active');
    this.currentSlide = index;
  }

  nextSlide() {
    let next = this.currentSlide + 1;
    if (next >= this.slides.length) next = 0;
    this.showSlide(next);
  }

  prevSlide() {
    let prev = this.currentSlide - 1;
    if (prev < 0) prev = this.slides.length - 1;
    this.showSlide(prev);
  }

  goToSlide(index) {
    this.showSlide(index);
  }

  startAutoSlide() {
    this.interval = setInterval(() => this.nextSlide(), 4000);
  }

  stopAutoSlide() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

// Initialize custom slider
document.addEventListener('DOMContentLoaded', function () {
  new CyberSlider();
});