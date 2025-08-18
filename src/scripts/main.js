//header

document.addEventListener("DOMContentLoaded", () => {
    let hamelmnts = document.querySelectorAll(".hamburger-zone");
    for (const btn of document.querySelectorAll(".hamburger-btn")) {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            for (const element of hamelmnts) {
                element.classList.toggle("active");
            }  
        });
    }
});

//main

//slider

document.addEventListener('DOMContentLoaded', function() {
    let slides = document.querySelectorAll('.travel-tips-wrapper__trip-content');
    let dots = document.querySelectorAll('.travel-tips-wrapper__content-slider-dot');
    let currentIndex = 0;
    let autoSlide = true;
    const delay = 12000;
    function changeSlide() {
        slides.forEach(slide => {
            slide.classList.remove('active', 'animate-slide');
        });
        slides[currentIndex].classList.add('active', 'animate-slide');
        dots.forEach(dot => dot.checked = false);
        dots[currentIndex].checked = true;
    }
    function autoAdvance() {
        if (autoSlide) {
            currentIndex = (currentIndex + 1) % slides.length;
            changeSlide();
        }
    }
    dots.forEach((dot, index) => {
        dot.addEventListener('change', () => {
            autoSlide = false;
            currentIndex = index;
            changeSlide();
        });
    });
    let interval = setInterval(autoAdvance, delay);
    changeSlide();
});

//animations

document.addEventListener("DOMContentLoaded", () => {
    const applyAnimations = (animations) => {
      animations.forEach(({ element, delay }) => {
        setTimeout(() => {
          if (element) element.classList.add("animate");
        }, delay);
      });
    };
    const animationOffers = [
      { element: document.querySelector(".container--ad"), delay: 400 },
      { element: document.querySelector(".cards__1"), delay: 700 },
      { element: document.querySelector(".cards__2"), delay: 900 },
      { element: document.querySelector(".cards__3"), delay: 1100 },
    ];
    const animationLocation = [
      { element: document.querySelector(".container--ad--another-pages"), delay: 400 },
      { element: document.querySelector(".page__iframe"), delay: 700 },
    ];
    applyAnimations([...animationOffers, ...animationLocation]);
});  
document.addEventListener("DOMContentLoaded", function () {
    const animateElements = (elements) => {
        elements.forEach(({ element, delay }) => {
            if (element) {
                setTimeout(() => {
                    element.classList.add("animate");
                }, delay);
            }
        });
    };
    const getThreshold = () => {
        const width = window.innerWidth;
        if (width <= 480) return .05;
        else if (width <= 768) return .15;
        else return .35;
    };
    const createObserver = (sectionSelector, animationData) => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateElements(animationData);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: getThreshold() });
        const section = document.querySelector(sectionSelector);
        if (section) {
            observer.observe(section);
        }
    };
    const aboutAnimationData = [
        { element: document.querySelector(".header-about"), delay: 200 },
        { element: document.querySelector(".container--about"), delay: 400 },
        { element: document.querySelector(".footer-about"), delay: 600 },
    ];
    createObserver(".page__about", aboutAnimationData);
    const skillsAnimationData = [
        { element: document.querySelector(".container--skills-header-main"), delay: 200 },
        { element: document.querySelector(".footer-skills__c-1"), delay: 400 },
        { element: document.querySelector(".footer-skills__c-2"), delay: 600 },
        { element: document.querySelector(".footer-skills__c-3"), delay: 800 },
        { element: document.querySelector(".footer-skills__c-4"), delay: 1000 },
        { element: document.querySelector(".footer-skills__c-5"), delay: 1200 },
        { element: document.querySelector(".footer-skills__c-6"), delay: 1400 },
    ];
    createObserver(".page__skills", skillsAnimationData);
    const reviewsAnimationData = [
        { element: document.querySelector(".header-reviews"), delay: 200 },
        { element: document.querySelector(".container--reviews"), delay: 400 },
        { element: document.querySelector(".footer-reviews__c-1"), delay: 600 },
        { element: document.querySelector(".footer-reviews__c-2"), delay: 800 },
        { element: document.querySelector(".footer-reviews__c-3"), delay: 1000 },
    ];
    createObserver(".page__reviews", reviewsAnimationData);
});

//p

document.addEventListener("DOMContentLoaded", () => {
    const paragraphs = document.querySelectorAll(".travel-tips-wrapper__trip-content-summary-info");
    const maxLength = 200;

    paragraphs.forEach(p => {
        let text = p.textContent.trim();
        if (text.length > maxLength) {
            p.textContent = text.slice(0, maxLength - 3) + "...";
        } else {
            p.textContent = text.padEnd(maxLength, " ");
        }
    });
});

//footer

document.getElementById("current-year").textContent = new Date().getFullYear();