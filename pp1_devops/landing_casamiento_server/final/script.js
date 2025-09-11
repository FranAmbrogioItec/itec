// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// Countdown Timer
function updateCountdown() {
  const weddingDate = new Date('2026-01-17T19:00:00').getTime();
  const now = new Date().getTime();
  const difference = weddingDate - now;

  if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      document.getElementById('days').textContent = days.toString().padStart(3, '0');
      document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
      document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
      document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
  } else {
      document.getElementById('days').textContent = '000';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
  }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Smooth scroll function
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({
      behavior: 'smooth'
  });
}

// Toggle bank details
function toggleBankDetails() {
  const bankDetails = document.getElementById('bank-details');
  const isVisible = bankDetails.style.display !== 'none';
  
  if (isVisible) {
      bankDetails.style.display = 'none';
  } else {
      bankDetails.style.display = 'block';
  }
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
      heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add loading animation to elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('visible');
      }
  });
}, observerOptions);

// Observe elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});