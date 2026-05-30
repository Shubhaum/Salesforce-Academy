// Mobile Menu and Smooth Scrolling Enhancements
document.addEventListener('DOMContentLoaded', function() {
  
  // Smooth scroll for anchor links
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

  // Navbar shadow effect on scroll
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
      navbar.style.transition = 'box-shadow 0.3s ease';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  // Form input focus animations
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.style.transition = 'all 0.3s ease';
    });

    // Add validation styling
    input.addEventListener('blur', function() {
      if (this.value) {
        this.style.borderColor = 'rgba(0, 208, 132, 0.5)';
      }
    });
  });

  // Form submission with feedback
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get all form inputs
      const formData = new FormData(form);
      const button = form.querySelector('button');
      const originalText = button.textContent;
      
      // Show loading state
      button.textContent = 'Submitting...';
      button.style.opacity = '0.7';
      button.disabled = true;
      
      // Simulate form submission
      setTimeout(() => {
        button.textContent = '✓ Submitted Successfully!';
        button.style.background = '#00D084';
        
        // Reset after 2 seconds
        setTimeout(() => {
          form.reset();
          button.textContent = originalText;
          button.style.opacity = '1';
          button.disabled = false;
          button.style.background = '';
        }, 2000);
      }, 1000);
    });
  }

  // Add animation to elements as they come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = entry.target.dataset.animation || 'fadeInUp 0.6s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe cards and stats
  document.querySelectorAll('.card, .stat').forEach(el => {
    el.dataset.animation = 'fadeInUp 0.6s ease forwards';
    observer.observe(el);
  });

  // Mobile touch optimization
  const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
  };

  if (isTouchDevice()) {
    // Add active state styling for touch devices
    const touchElements = document.querySelectorAll('button, a, .card');
    touchElements.forEach(el => {
      el.addEventListener('touchstart', function() {
        this.style.opacity = '0.8';
      });
      el.addEventListener('touchend', function() {
        this.style.opacity = '1';
      });
    });
  }

  // Prevent double-tap zoom on buttons and links
  document.addEventListener('touchend', function(e) {
    if (e.target.closest('button, a')) {
      e.preventDefault();
    }
  }, false);
});

// Responsive image loading (if images are added later)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
}

// Smooth navbar hide/show on scroll (optional enhancement)
let lastScrollTop = 0;
const scrollHandler = debounce(function() {
  const navbar = document.querySelector('.navbar');
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop && window.innerWidth < 768) {
    // Scrolling DOWN - hide navbar on mobile
    navbar.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling UP - show navbar
    navbar.style.transform = 'translateY(0)';
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, 100);

window.addEventListener('scroll', scrollHandler);
