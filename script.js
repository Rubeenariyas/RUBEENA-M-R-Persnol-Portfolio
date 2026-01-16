document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Clean Navbar effect on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.background = 'rgba(10, 10, 12, 0.9)';
            navbar.style.boxShadow = '0 1px 0 rgba(255,255,255,0.05)';
        } else {
            navbar.style.background = 'rgba(10, 10, 12, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    console.log("Portfolio loaded: Professional Glassmorphism Mode");
});
