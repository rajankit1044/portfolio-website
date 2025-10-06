// Hamburger menu toggle with improved accessibility
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  if (!menu || !icon) return;

  const isOpen = menu.classList.toggle("open");
  icon.classList.toggle("open");

  // Update aria-expanded for screen readers
  const button = icon.closest('.hamburger-menu')?.querySelector('button.hamburger-icon');
  if (button) {
    button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  // Close menu when clicking outside
  if (isOpen) {
    document.addEventListener('click', closeMenuOnOutsideClick, { once: true });
  }
}

function closeMenuOnOutsideClick(event) {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  if (!menu.contains(event.target) && !icon.contains(event.target)) {
    menu.classList.remove("open");
    icon.classList.remove("open");
    const button = icon.closest('.hamburger-menu')?.querySelector('button.hamburger-icon');
    if (button) button.setAttribute('aria-expanded', 'false');
  }
}

// IntersectionObserver for section animations with performance optimization
const allSections = document.querySelectorAll("section");
const observerOptions = { threshold: 0.3, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      // Unobserve after animation to improve performance
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

allSections.forEach(section => observer.observe(section));

// Enhanced typing animation with cursor and pause
const introText = document.querySelector(".title");
if (introText) {
  const text = introText.textContent.trim();
  introText.textContent = "";
  let index = 0;
  const cursor = document.createElement('span');
  cursor.textContent = '|';
  cursor.style.animation = 'blink 1s infinite';
  introText.appendChild(cursor);

  function type() {
    if (index < text.length) {
      const char = text.charAt(index);
      cursor.before(char);
      index++;
      setTimeout(type, char === ' ' ? 50 : 100); // Faster for spaces
    } else {
      // Pause then remove cursor
      setTimeout(() => {
        cursor.remove();
      }, 1000);
    }
  }
  // Delay start
  setTimeout(type, 500);
}

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
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

// Arrow icon scroll to experience section
const arrowIcon = document.querySelector('.arrow-icon');
if (arrowIcon) {
  arrowIcon.addEventListener('click', () => {
    const experienceSection = document.querySelector('#experience');
    if (experienceSection) {
      experienceSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
  arrowIcon.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      arrowIcon.click();
    }
  });
}

// Contact form handling
const contactForm = document.querySelector('#contact form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Basic validation
    const name = this.querySelector('input[name="name"]');
    const email = this.querySelector('input[name="email"]');
    const message = this.querySelector('textarea[name="message"]');

    if (!name?.value.trim() || !email?.value.trim() || !message?.value.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email.value)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Simulate form submission (replace with actual backend call)
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
  });
}

// Add CSS for blinking cursor
const style = document.createElement('style');
style.textContent = `
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;
document.head.appendChild(style);

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Any additional initialization can go here
});

