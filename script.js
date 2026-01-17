document.addEventListener('DOMContentLoaded', () => {
    // 🧭 Navigation Logic
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section');

    // 📐 Dynamic Navbar Height
    const updateNavHeight = () => {
        const height = navbar.offsetHeight;
        document.documentElement.style.setProperty('--nav-height', `${height}px`);
    };

    window.addEventListener('resize', updateNavHeight);
    updateNavHeight(); // Initial set

    // Toggle Mobile Menu
    const toggleMenu = () => {
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
    };

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);

    // Smooth Scroll & Close Menu
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href === '#' ? 'home' : href.substring(1);
                // Try section by ID, or fallback to body for Home
                const targetSection = document.getElementById(targetId) || (href === '#' ? document.body : null);

                if (targetSection) {
                    if (mobileOverlay.classList.contains('active')) toggleMenu();

                    const navPadding = 20; // Reduced breathing room
                    const offset = navbar.offsetHeight + navPadding;

                    window.scrollTo({
                        top: targetSection.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ✨ Active Link Highlighting (ScrollSpy)
    const highlightActiveLink = () => {
        let currentSectionId = '';
        const offset = navbar.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - offset;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id') || '';
            }
        });

        // Special case for Home (top of page)
        if (window.scrollY < 100) currentSectionId = '';

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if ((href === '#' && currentSectionId === '') || href === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightActiveLink);
    highlightActiveLink(); // Run on load

    // Clean Navbar effect on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.background = 'rgba(0, 0, 0, 0.85)';
            navbar.style.borderBottom = '1px solid rgba(255, 138, 0, 0.2)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.6)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            navbar.style.boxShadow = 'none';
        }
    });

    console.log("Portfolio loaded: Professional Glassmorphism Mode");

    // 3D Tilt Effect for Neon Cards
    document.addEventListener('mousemove', function (e) {
        const cards = document.querySelectorAll('.neon-card');

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Only apply if mouse is close/over to avoid performance hit on all cards
            if (x > -50 && x < rect.width + 50 && y > -50 && y < rect.height + 50) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg tilt
                const rotateY = ((x - centerX) / centerX) * 5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            } else {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            }
        });
    });
    // Fade-in on Scroll Observer
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

    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });
});
