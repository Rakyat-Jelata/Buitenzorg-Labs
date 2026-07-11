document.addEventListener('DOMContentLoaded', () => {
    
    // 1. HAMBURGER MENU TOGGLE
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navbarMenu');

    hamburger.addEventListener('click', () => {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
        hamburger.setAttribute('aria-expanded', !expanded);
        navMenu.classList.toggle('active'); // Pastikan Anda menambahkan kelas .active di CSS
    });

    // 2. SCROLL ANIMATION (INTERSECTION OBSERVER)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Seleksi elemen yang ingin dianimasikan (misal: semua service-card)
    document.querySelectorAll('.service-card, .reason-card, .project-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // 3. STATS COUNTER ANIMATION
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (el) => {
        const target = +el.getAttribute('data-target');
        const updateCount = () => {
            const count = +el.innerText;
            const increment = target / 100;
            if (count < target) {
                el.innerText = Math.ceil(count + increment);
                setTimeout(updateCounter, 20);
            } else {
                el.innerText = target;
            }
        };
        updateCount();
    };

    // Picu counter saat masuk ke viewport
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statObserver.observe(stat));
});
