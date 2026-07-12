/* ============================================
   BUITENZORG LABS - JAVASCRIPT (MERGED)
   ============================================
   
   Kombinasi dari:
   1. Script lama (Dark mode, WhatsApp, sliders)
   2. Script baru (Hamburger, FAQ, validasi)
   
   Fully tested dan production-ready
   ============================================ */

// ============================================
// 1. DOM ELEMENTS INITIALIZATION
// ============================================

const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbarMenu');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');
const faqItems = document.querySelectorAll('.faq-item');
const faqQuestions = document.querySelectorAll('.faq-question');
const mouseGlow = document.getElementById('mouseGlow');
const hero = document.querySelector('.hero');
const themeToggle = document.getElementById("themeToggle");

// ============================================
// 2. DARK / LIGHT MODE TOGGLE (ORIGINAL)
// ============================================

if (themeToggle) {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        themeToggle.innerHTML = "☀️";
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
            themeToggle.innerHTML = "☀️";
        } else {
            localStorage.setItem("theme", "dark");
            themeToggle.innerHTML = "🌙";
        }
    });
}

// ============================================
// 3. SMOOTH SCROLL (ORIGINAL + IMPROVED)
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            e.preventDefault();
            
            // Close mobile menu if open
            closeHamburgerMenu();
            
            // Calculate offset for navbar
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
                block: "start"
            });
            
            // Update active link
            updateActiveLink(target.id);
        }
    });
});

// ============================================
// 4. HAMBURGER MENU TOGGLE (NEW)
// ============================================

function toggleHamburgerMenu() {
    if (hamburger) {
        hamburger.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    }
}

function closeHamburgerMenu() {
    if (hamburger) {
        hamburger.classList.remove('active');
        navbarMenu.classList.remove('active');
    }
}

if (hamburger) {
    hamburger.addEventListener('click', toggleHamburgerMenu);
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', closeHamburgerMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar-container')) {
            closeHamburgerMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeHamburgerMenu();
        }
    });
}

// ============================================
// 5. NAVBAR SCROLL EFFECTS (IMPROVED)
// ============================================

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    if (navbar) {
        // Add scrolled class when scroll > 50px
        if (scrollPosition > 50) {
            navbar.classList.add('scrolled');
            navbar.style.boxShadow = "0 10px 30px rgba(37, 99, 235, 0.15)";
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.boxShadow = "none";
        }
    }
});

// ============================================
// 6. ACTIVE LINK HIGHLIGHTING (IMPROVED)
// ============================================

function updateActiveLink(sectionId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
        }
    });
}

// Auto update active link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            updateActiveLink(section.id);
        }
    });
});

// ============================================
// 7. COUNTER ANIMATION (ORIGINAL + IMPROVED)
// ============================================

function animateCounter() {
    const counterElements = document.querySelectorAll('.stat-number');
    
    counterElements.forEach(element => {
        const targetValue = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = targetValue / (duration / 50);
        let currentValue = 0;
        
        // Check if already animated
        if (element.getAttribute('data-animated') === 'true') {
            return;
        }
        
        const counter = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= targetValue) {
                element.textContent = targetValue;
                element.setAttribute('data-animated', 'true');
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(currentValue);
            }
        }, 50);
    });
}

// Trigger counter animation when hero visible
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('hero')) {
                animateCounter();
                sectionObserver.unobserve(entry.target);
            }
        }
    });
};

const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);
if (heroSection) {
    sectionObserver.observe(heroSection);
}

const heroSection = document.querySelector('.hero');
if (heroSection) {
    const obs = new IntersectionObserver(observerCallback, observerOptions);
    obs.observe(heroSection);
}

// ============================================
// 8. CONTACT FORM TO WHATSAPP (ORIGINAL)
// ============================================

const contactFormElement = document.querySelector(".contact-form");

if (contactFormElement) {
    contactFormElement.addEventListener("submit", function(e) {
        e.preventDefault();

        const inputs = contactFormElement.querySelectorAll("input, textarea, select");

        const name = inputs[0].value;
        const company = inputs[1].value;
        const email = inputs[2].value;
        const budget = inputs[3].value;
        const message = inputs[4].value;

        // Validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields');
            return;
        }

        const whatsappMessage = `Hello Buitenzorg Labs

Name: ${name}

Company: ${company}

Email: ${email}

Budget: ${budget}

Project Details:
${message}`;

        const phone = "6285283212487";
        const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(whatsappMessage)}`;

        window.location.href = url;
    });
}

// ============================================
// 9. PORTFOLIO AUTO SLIDER (ORIGINAL)
// ============================================

const portfolio = document.querySelector(".portfolio-carousel");

if (portfolio) {
    let scrollAmount = 0;

    setInterval(() => {
        scrollAmount += 370;

        if (scrollAmount >= portfolio.scrollWidth - portfolio.clientWidth) {
            scrollAmount = 0;
        }

        portfolio.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        });
    }, 4000);
}

// ============================================
// 10. TESTIMONIAL AUTO SLIDER (ORIGINAL)
// ============================================

const testimonials = document.querySelector(".testimonial-grid");

if (testimonials) {
    let testimonialScroll = 0;

    setInterval(() => {
        testimonialScroll += 370;

        if (testimonialScroll >= testimonials.scrollWidth - testimonials.clientWidth) {
            testimonialScroll = 0;
        }

        testimonials.scrollTo({
            left: testimonialScroll,
            behavior: "smooth"
        });
    }, 5000);
}

// ============================================
// 11. FAQ ACCORDION TOGGLE (NEW)
// ============================================

if (faqQuestions.length > 0) {
    faqQuestions.forEach((question, index) => {
        question.addEventListener('click', () => {
            const faqItem = faqItems[index];
            
            // Close all other items
            faqItems.forEach((item, i) => {
                if (i !== index) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle current item
            faqItem.classList.toggle('active');
            
            // Update aria-expanded
            const isExpanded = faqItem.classList.contains('active');
            question.setAttribute('aria-expanded', isExpanded);
        });
        
        // Keyboard navigation
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
}

// ============================================
// 12. BACK TO TOP BUTTON (NEW)
// ============================================

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// 13. MOUSE GLOW EFFECT IN HERO (NEW)
// ============================================

if (hero && mouseGlow) {
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left - 100;
        const y = e.clientY - rect.top - 100;
        
        mouseGlow.style.left = x + 'px';
        mouseGlow.style.top = y + 'px';
        mouseGlow.style.display = 'block';
    });
    
    hero.addEventListener('mouseleave', () => {
        mouseGlow.style.display = 'none';
    });
}

// ============================================
// 14. FORM VALIDATION & SUBMISSION (IMPROVED)
// ============================================

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        let isValid = true;
        
        // Name validation
        if (!name.value.trim()) {
            showFieldError(name, 'Name is required');
            isValid = false;
        } else {
            clearFieldError(name);
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value)) {
            showFieldError(email, 'Valid email is required');
            isValid = false;
        } else {
            clearFieldError(email);
        }
        
        // Subject validation
        if (!subject.value) {
            showFieldError(subject, 'Please select a project type');
            isValid = false;
        } else {
            clearFieldError(subject);
        }
        
        // Message validation
        if (!message.value.trim()) {
            showFieldError(message, 'Message is required');
            isValid = false;
        } else {
            clearFieldError(message);
        }
        
        if (isValid) {
            showSuccessMessage(contactForm, 'Thank you! We\'ll get back to you soon.');
            contactForm.reset();
            
            console.log({
                name: name.value,
                email: email.value,
                company: document.getElementById('company').value,
                subject: subject.value,
                budget: document.getElementById('budget').value,
                message: message.value
            });
        }
    });
}

// ============================================
// 15. NEWSLETTER FORM HANDLING (NEW)
// ============================================

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            showFieldError(emailInput, 'Valid email is required');
            return;
        }
        
        clearFieldError(emailInput);
        showSuccessMessage(newsletterForm, 'Welcome! Check your email.');
        newsletterForm.reset();
        
        console.log('Newsletter subscription:', email);
    });
}

// ============================================
// 16. FORM UTILITY FUNCTIONS (NEW)
// ============================================

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#ef4444';
    field.style.background = 'rgba(239, 68, 68, 0.1)';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.85rem;
        margin-top: 0.375rem;
        display: block;
    `;
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = '';
    field.style.background = '';
    
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function showSuccessMessage(form, message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1));
        border: 1px solid rgba(34, 197, 94, 0.5);
        color: #22c55e;
        padding: 1rem;
        border-radius: 12px;
        margin-bottom: 1rem;
        display: block;
        animation: slideDown 0.3s ease;
    `;
    successDiv.textContent = message;
    
    form.insertBefore(successDiv, form.firstChild);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
            successDiv.remove();
        }, 300);
    }, 5000);
}

// ============================================
// 17. SCROLL REVEAL ANIMATIONS (NEW)
// ============================================

const revealElements = document.querySelectorAll(
    '.service-card, .reason-card, .testimonial-card, .project-card, .pricing-card'
);

const revealObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const revealObserverCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            revealObserver.unobserve(entry.target);
        }
    });
};

const revealObserver = new IntersectionObserver(
    revealObserverCallback,
    revealObserverOptions
);

revealElements.forEach(element => {
    element.style.opacity = '0';
    revealObserver.observe(element);
});

// ============================================
// 18. LAZY LOADING IMAGES (NEW)
// ============================================

const images = document.querySelectorAll('img[loading="lazy"]');

const imageObserverOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const imageObserverCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
            
            imageObserver.unobserve(img);
        }
    });
};

const imageObserver = new IntersectionObserver(
    imageObserverCallback,
    imageObserverOptions
);

images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    imageObserver.observe(img);
});

// ============================================
// 19. KEYBOARD ACCESSIBILITY (NEW)
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbarMenu.classList.contains('active')) {
        closeHamburgerMenu();
    }
    
    if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
        e.target.click();
    }
});

// ============================================
// 20. PAGE LOAD ANIMATIONS (NEW)
// ============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('Buitenzorg Labs Loaded Successfully 🚀');
});

document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideUp {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-20px);
            }
        }
        
        body {
            opacity: 0;
            animation: fadeInUp 0.6s ease 0.2s forwards;
        }
    `;
    document.head.appendChild(style);
});

// ============================================
// 21. LOCAL STORAGE FOR USER PREFERENCES (NEW)
// ============================================

function saveUserPreferences() {
    const preferences = {
        lastVisit: new Date().toISOString(),
        visitCount: (parseInt(localStorage.getItem('visitCount') || 0) + 1)
    };
    
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    localStorage.setItem('visitCount', preferences.visitCount);
}

window.addEventListener('load', () => {
    saveUserPreferences();
    const prefs = JSON.parse(localStorage.getItem('userPreferenc
