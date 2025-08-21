import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger,ScrollSmoother,ScrollToPlugin);

//ScrollSmoother
ScrollSmoother.create({
  smooth: 1.25,
  effects: true
});

//ScrollToPlugin
document.querySelectorAll('a[href*="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    if (this.classList.contains('button--up-link')) return;
    e.preventDefault();
    const href = this.getAttribute('href');
    const url = new URL(href, window.location.origin);
    const hash = url.hash;
    const page = url.pathname.split('/').pop() || 'index.html';
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (hash && page === currentPage) {
      const targetEl = document.querySelector(hash);
      if (targetEl) {
        gsap.to(window, {
          scrollTo: hash,
          ease: "power2.inOut"
        });
      }
    } else {
      if (hash) sessionStorage.setItem('scrollToHash', hash);
      window.location.href = url.pathname;
    }
  });
});
window.addEventListener('load', () => {
  const hash = sessionStorage.getItem('scrollToHash') || window.location.hash;
  if (hash) {
    sessionStorage.removeItem('scrollToHash');
    const targetEl = document.querySelector(hash);
    if (targetEl) {
      window.scrollTo(0, 0);
      gsap.to(window, {
        scrollTo: hash,
        ease: "power2.inOut"
      });
    }
  }
});

//page__welcome - animation
gsap.utils.toArray('.page__welcome .welcome-wrapper__header, .page__welcome .welcome-wrapper__content, .page__welcome .welcome-wrapper__footer .welcome-wrapper__card').forEach((el, i) => {
  gsap.from(el, {
    opacity: 0,
    y: 80,
    scale: 0.95,
    duration: 1.1,
    ease: 'power2.inOut',
    delay: i * 0.2,
    scrollTrigger: {
      trigger: '.page__welcome',
      start: 'top 80%',
      once: true
    }
  });
});

//page__rooms - ScrollTrigger
gsap.utils.toArray('.page__rooms .rooms-wrapper__header, .page__rooms .rooms-wrapper__description')
  .forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        end: 'top 60%',
        scrub: true
      }
    });
});
gsap.from('.page__rooms .rooms-wrapper__cards article', {
  opacity: 0,
  y: 60,
  duration: 1,
  ease: 'power2.inOut',
  stagger: 0.3,
  scrollTrigger: {
    trigger: '.page__rooms .rooms-wrapper__cards',
    start: 'top 90%',
    end: 'top 0%',
    scrub: true
  }
});

//page__reviews - animation
gsap.utils.toArray('.page__reviews .reviews-wrapper__header, .page__reviews .reviews-wrapper__text, .page__reviews .reviews-wrapper__content article').forEach((el, i) => {
  gsap.from(el, {
    opacity: 0,
    y: 60,
    scale: 0.95,
    duration: 1,
    ease: 'power2.inOut',
    delay: i * 0.18,
    scrollTrigger: {
      trigger: '.page__reviews',
      start: 'top 80%',
      once: true
    }
  });
});