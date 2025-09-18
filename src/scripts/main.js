import './fontawesome.js'
import './animations.js'
//import './tracking.js'

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

//no - scroll
function updateScrollLock() {
    const nav = document.querySelector('.hamburger-nav');
    const isActive = nav?.classList.contains('active');
    document.querySelectorAll('.page').forEach(container => {
        container.classList.toggle('noscroll', isActive);
    });
}

//remove - hamburger menu
function handleNavClick(e) {
    const link = e.target.closest('a[href^="#"]');
    const upBtn = e.target.closest('a.button--up-link[href="#header"]');
    if (!link && !upBtn) return;
    const nav = e.currentTarget;
    nav.classList.remove('active');
    document.body.classList.remove('noscroll');
    document.documentElement.classList.remove('noscroll');
    document.querySelectorAll(".hamburger-zone").forEach(el => el.classList.remove("active"));
}
document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector('.hamburger-nav');
    if (!nav) return;
    new MutationObserver(updateScrollLock).observe(nav, {
        attributes: true,
        attributeFilter: ['class']
    });
    updateScrollLock();
    nav.addEventListener('click', handleNavClick);
    document.body.addEventListener('click', (e) => {
        const upBtn = e.target.closest('a.button--up-link[href="#header"]');
        if (!upBtn) return;
        nav.classList.remove('active');
        document.body.classList.remove('noscroll');
        document.documentElement.classList.remove('noscroll');
        document.querySelectorAll(".hamburger-zone").forEach(el => el.classList.remove("active"));
    });
});

//main
//slider
document.addEventListener('DOMContentLoaded', function() {
    let slides = document.querySelectorAll('.travel-tips-wrapper__trip-content');
    let dots = document.querySelectorAll('.travel-tips-wrapper__content-slider-dot');
    let currentIndex = 0;
    let autoSlide = true;
    const delay = 12000;
    let startX = null;
    let isDragging = false;
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
    const sliderArea = slides[0]?.parentElement;
    if (sliderArea) {
        sliderArea.addEventListener('touchstart', function(e) {
            if (e.touches.length === 1) {
                startX = e.touches[0].clientX;
            }
        });
        sliderArea.addEventListener('touchend', function(e) {
            if (startX !== null && e.changedTouches.length === 1) {
                let endX = e.changedTouches[0].clientX;
                let diff = endX - startX;
                if (Math.abs(diff) > 40) {
                    autoSlide = false;
                    if (diff < 0) {
                        currentIndex = (currentIndex + 1) % slides.length;
                    } else {
                        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                    }
                    changeSlide();
                }
            }
            startX = null;
        });
        sliderArea.addEventListener('mousedown', function(e) {
            isDragging = true;
            startX = e.clientX;
        });
        sliderArea.addEventListener('mouseup', function(e) {
            if (isDragging && startX !== null) {
                let endX = e.clientX;
                let diff = endX - startX;
                if (Math.abs(diff) > 40) {
                    autoSlide = false;
                    if (diff < 0) {
                        currentIndex = (currentIndex + 1) % slides.length;
                    } else {
                        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                    }
                    changeSlide();
                }
            }
            isDragging = false;
            startX = null;
        });
        sliderArea.addEventListener('mouseleave', function() {
            isDragging = false;
            startX = null;
        });
    }
    let interval = setInterval(autoAdvance, delay);
    changeSlide();
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