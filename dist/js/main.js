document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const navbar = document.getElementById('navbar')
  const navLinks = document.getElementById('navLinks')
  const menuButton = document.querySelector('.hamburger')
  const setMenu = (open) => {
    if (!navLinks || !menuButton) return
    navLinks.classList.toggle('open', open)
    menuButton.setAttribute('aria-expanded', String(open))
    menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu')
  }

  window.addEventListener('scroll', () => navbar?.classList.toggle('scrolled', window.scrollY > 60), { passive: true })
  setMenu(false)
  window.toggleMenu = () => setMenu(!navLinks?.classList.contains('open'))
  navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)))
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false) })

  document.querySelectorAll('img').forEach((image) => {
    image.addEventListener('load', () => image.classList.add('is-loaded'))
    image.addEventListener('error', () => image.classList.add('is-failed'))
    if (image.complete && image.naturalWidth) image.classList.add('is-loaded')
  })

  const revealItems = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
  if (reduceMotion || !('IntersectionObserver' in window)) revealItems.forEach((item) => item.classList.add('visible'))
  else {
    const observer = new IntersectionObserver((entries, instance) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); instance.unobserve(entry.target) }
    }), { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    revealItems.forEach((item) => observer.observe(item))
  }

  document.querySelectorAll('.place-card').forEach((card, index) => { card.style.transitionDelay = `${(index % 3) * 0.08}s` })
  const filterButtons = document.querySelectorAll('.place-filter-btn')
  const placeCards = document.querySelectorAll('.place-card')
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    filterButtons.forEach((item) => { item.classList.remove('active'); item.setAttribute('aria-pressed', 'false') })
    button.classList.add('active'); button.setAttribute('aria-pressed', 'true')
    const filter = button.dataset.filter || 'all'
    placeCards.forEach((card) => card.classList.toggle('filtered-out', filter !== 'all' && card.dataset.category !== filter))
  }))

  const particleContainer = document.getElementById('particles')
  if (particleContainer && !reduceMotion && window.innerWidth > 600) {
    for (let index = 0; index < 18; index += 1) {
      const particle = document.createElement('div'); particle.className = 'particle'
      const size = Math.random() * 4 + 2
      particle.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;bottom:${Math.random() * -20}%;animation-duration:${8 + Math.random() * 12}s;animation-delay:${Math.random() * 8}s`
      particleContainer.appendChild(particle)
    }
  }

  let currentSlide = 0
  const slides = [...document.querySelectorAll('.carousel-slide')]
  const track = document.getElementById('carouselTrack')
  const dotsContainer = document.getElementById('carouselDots')
  const gallery = document.querySelector('.gallery-carousel')
  let autoPlay = null
  const updateSlide = (index) => {
    if (!slides.length) return
    currentSlide = (index + slides.length) % slides.length
    if (track) track.style.transform = `translateX(-${currentSlide * 100}%)`
    slides.forEach((slide, slideIndex) => {
      slide.setAttribute('aria-hidden', String(slideIndex !== currentSlide))
      slide.classList.toggle('active', slideIndex === currentSlide)
    })
    dotsContainer?.querySelectorAll('.dot').forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === currentSlide))
  }
  const stopAutoPlay = () => { if (autoPlay) { clearInterval(autoPlay); autoPlay = null } }
  const startAutoPlay = () => { if (!reduceMotion && slides.length > 1 && !document.hidden && !autoPlay) autoPlay = setInterval(() => updateSlide(currentSlide + 1), 5000) }
  slides.forEach((slide, index) => slide.setAttribute('aria-hidden', String(index !== 0)))
  slides.forEach((_, index) => { const dot = document.createElement('button'); dot.className = `dot${index === 0 ? ' active' : ''}`; dot.type = 'button'; dot.setAttribute('aria-label', `Show gallery slide ${index + 1}`); dot.addEventListener('click', () => updateSlide(index)); dotsContainer?.appendChild(dot) })
  window.nextSlide = () => updateSlide(currentSlide + 1)
  window.prevSlide = () => updateSlide(currentSlide - 1)
  gallery?.addEventListener('mouseenter', stopAutoPlay); gallery?.addEventListener('mouseleave', startAutoPlay)
  gallery?.addEventListener('focusin', stopAutoPlay); gallery?.addEventListener('focusout', startAutoPlay)
  document.addEventListener('visibilitychange', () => document.hidden ? stopAutoPlay() : startAutoPlay())
  startAutoPlay()
  let touchStartX = 0
  track?.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].clientX }, { passive: true })
  track?.addEventListener('touchend', (event) => { const diff = touchStartX - event.changedTouches[0].clientX; if (Math.abs(diff) > 50) diff > 0 ? window.nextSlide() : window.prevSlide() })
  gallery?.addEventListener('keydown', (event) => { if (event.key === 'ArrowRight') window.nextSlide(); if (event.key === 'ArrowLeft') window.prevSlide() })

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => anchor.addEventListener('click', (event) => {
    const target = document.querySelector(anchor.getAttribute('href'))
    if (target) { event.preventDefault(); window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 68, behavior: reduceMotion ? 'auto' : 'smooth' }) }
  }))
  const sections = document.querySelectorAll('section[id]')
  const sectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) navLinks?.querySelectorAll('a').forEach((link) => link.classList.toggle('current', link.getAttribute('href') === `#${entry.target.id}`))
  }), { threshold: 0.4 })
  sections.forEach((section) => sectionObserver.observe(section))
})
