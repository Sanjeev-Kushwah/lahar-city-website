/* ============================================
   Lahar City Website — Main JavaScript
   Lahar, Bhind District, Madhya Pradesh
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ══════════════════════════════════════════
       NAVBAR — Scroll shrink effect
    ══════════════════════════════════════════ */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    /* ══════════════════════════════════════════
       MOBILE MENU — Hamburger toggle
    ══════════════════════════════════════════ */
    window.toggleMenu = function () {
        document.getElementById('navLinks').classList.toggle('open');
    };

    document.querySelectorAll('.nav-links a').forEach(a => {
        a.addEventListener('click', () => {
            document.getElementById('navLinks').classList.remove('open');
        });
    });

    /* ══════════════════════════════════════════
       SCROLL REVEAL — Intersection Observer
    ══════════════════════════════════════════ */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        revealObserver.observe(el);
    });

    /* ══════════════════════════════════════════
       STAGGER — Place card animations
    ══════════════════════════════════════════ */
    document.querySelectorAll('.place-card').forEach((el, i) => {
        el.style.transitionDelay = (i % 3) * 0.08 + 's';
    });

    /* ══════════════════════════════════════════
       PLACE FILTERS — Category arrangement
    ══════════════════════════════════════════ */
    const filterButtons = document.querySelectorAll('.place-filter-btn');
    const placeCards = document.querySelectorAll('.place-card');

    function applyPlaceFilter(filter) {
        placeCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const show = filter === 'all' || category === filter;
            card.classList.toggle('filtered-out', !show);
        });
    }

    if (filterButtons.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                applyPlaceFilter(btn.dataset.filter || 'all');
            });
        });
    }

    /* ══════════════════════════════════════════
       PARTICLES — Hero background effect
    ══════════════════════════════════════════ */
    const particleContainer = document.getElementById('particles');
    if (particleContainer) {
        for (let i = 0; i < 18; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 4 + 2;
            p.style.cssText = `
                width:${size}px;
                height:${size}px;
                left:${Math.random() * 100}%;
                bottom:${Math.random() * -20}%;
                animation-duration:${8 + Math.random() * 12}s;
                animation-delay:${Math.random() * 8}s;
            `;
            particleContainer.appendChild(p);
        }
    }

    /* ══════════════════════════════════════════
       CAROUSEL — Gallery slider
    ══════════════════════════════════════════ */
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const track = document.getElementById('carouselTrack');
    const dotsContainer = document.getElementById('carouselDots');

    // Build dots
    if (slides.length && dotsContainer) {
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
    }

    function goToSlide(n) {
        currentSlide = (n + slides.length) % slides.length;
        if (track) track.style.transform = `translateX(-${currentSlide * 100}%)`;
        document.querySelectorAll('.dot').forEach((d, i) =>
            d.classList.toggle('active', i === currentSlide));
    }

    window.nextSlide = function () { goToSlide(currentSlide + 1); };
    window.prevSlide = function () { goToSlide(currentSlide - 1); };

    // Auto-advance every 5 seconds
    let autoPlay = setInterval(window.nextSlide, 5000);

    const galleryCarousel = document.querySelector('.gallery-carousel');
    if (galleryCarousel) {
        galleryCarousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
        galleryCarousel.addEventListener('mouseleave', () => {
            autoPlay = setInterval(window.nextSlide, 5000);
        });
    }

    // Touch/swipe support
    let touchStartX = 0;
    if (track) {
        track.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].clientX;
        }, { passive: true });
        track.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? window.nextSlide() : window.prevSlide();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') window.nextSlide();
        if (e.key === 'ArrowLeft') window.prevSlide();
    });

    /* ══════════════════════════════════════════
       SMOOTH SCROLL — Anchor links
    ══════════════════════════════════════════ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 68; // navbar height
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* ══════════════════════════════════════════
       ACTIVE NAV LINK — Highlight on scroll
    ══════════════════════════════════════════ */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.style.color = link.getAttribute('href') === '#' + entry.target.id
                        ? 'var(--gold)' : '';
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => sectionObserver.observe(section));

    console.log('%c🏛️ Lahar City Website Loaded!', 'color:#C9A227;font-size:16px;font-weight:bold;');
    console.log('%c  Lahar — The City of Culture & Heritage  ', 'color:#E8861A;font-size:12px;');
    console.log('%c  Bhind District, Madhya Pradesh, India   ', 'color:#9B7B5A;font-size:11px;');
});
