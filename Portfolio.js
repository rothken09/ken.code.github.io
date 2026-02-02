// =====================================================
// KEN.CODE Portfolio - JavaScript
// =====================================================

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', function () {
    navMenu.classList.toggle('show');
    // Toggle icon
    const icon = hamburger.querySelector('i');
    if (navMenu.classList.contains('show')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    } else {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  });
}

// Close menu when clicking on a link
const menuLinks = document.querySelectorAll('.menu a');
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show');
    const icon = hamburger.querySelector('i');
    icon.classList.remove('fa-xmark');
    icon.classList.add('fa-bars');
  });
});

// Navbar scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', function () {
  if (window.scrollY > 100) {
    nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

// Active link on scroll
const sections = document.querySelectorAll('section, header');
const navLinks = document.querySelectorAll('.menu a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    portfolioItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
        item.style.animation = 'fadeIn 0.5s ease';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// Skill bars animation on scroll
const skillBars = document.querySelectorAll('.skill-progress');
let animated = false;

function animateSkillBars() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const sectionPos = skillsSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.3;

  if (sectionPos < screenPos && !animated) {
    skillBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
    animated = true;
  }
}

window.addEventListener('scroll', animateSkillBars);

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };

    // Simple validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showNotification('กรุณากรอกข้อมูลให้ครบทุกช่อง', 'error');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification('กรุณากรอกอีเมลให้ถูกต้อง', 'error');
      return;
    }

    // Show success message (in real app, you would send to server)
    showNotification('ส่งข้อความสำเร็จ! ขอบคุณที่ติดต่อมาครับ', 'success');

    // Reset form
    contactForm.reset();
  });
}

// Notification function
function showNotification(message, type) {
  // Remove existing notification
  const existingNotif = document.querySelector('.notification');
  if (existingNotif) {
    existingNotif.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
    <span>${message}</span>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 9999;
    animation: slideIn 0.5s ease;
  `;

  // Add slide animation
  const slideStyle = document.createElement('style');
  slideStyle.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(slideStyle);

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideIn 0.5s ease reverse';
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 3000);
}

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

// Scroll reveal animation
function revealOnScroll() {
  const reveals = document.querySelectorAll('.skill-card, .portfolio-item, .contact-item, .about-content');

  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('revealed');
    }
  });
}

// Add reveal styles
const revealStyle = document.createElement('style');
revealStyle.textContent = `
  .skill-card, .portfolio-item, .contact-item, .about-content {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
  }
  
  .skill-card.revealed, .portfolio-item.revealed, .contact-item.revealed, .about-content.revealed {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(revealStyle);

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Typing effect for hero section (optional)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize on page load
window.addEventListener('load', function () {
  // Trigger initial animations
  animateSkillBars();
  revealOnScroll();
});

console.log('🚀 KEN.CODE Portfolio loaded successfully!');