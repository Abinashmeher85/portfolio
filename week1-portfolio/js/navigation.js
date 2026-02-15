/* ===============================
   HAMBURGER MENU
=================================*/
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

/* ===============================
   ACTIVE NAV LINK ON SCROLL
=================================*/
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/* ===============================
   SCROLL REVEAL ANIMATION
=================================*/
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 120;

        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add("active");
        }
    });
}
window.addEventListener("scroll", revealOnScroll);

/* ===============================
   BETTER TYPING ANIMATION
=================================*/
const typingElement = document.querySelector(".typing");
const words = ["Web Developer", "UI Designer", "ML Enthusiast", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    const currentText = currentWord.substring(0, charIndex);
    typingElement.textContent = currentText;

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(typeEffect, 100);
    } 
    else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 50);
    } 
    else {
        isDeleting = !isDeleting;
        if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 1000);
    }
}
typeEffect();

/* ===============================
   COUNTER ANIMATION
=================================*/
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
    counter.innerText = "0";

    const updateCounter = () => {
        const target = +counter.getAttribute("data-target");
        const c = +counter.innerText;
        const increment = target / 100;

        if (c < target) {
            counter.innerText = Math.ceil(c + increment);
            setTimeout(updateCounter, 30);
        } else {
            counter.innerText = target;
        }
    };

    updateCounter();
});

/* ===============================
   CONTACT FORM ANIMATION
=================================*/
const form = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    successMsg.style.display = "block";
    successMsg.style.opacity = "1";
    form.reset();

    setTimeout(() => {
        successMsg.style.opacity = "0";
    }, 3000);
});

/* ===============================
   SCROLL TO TOP
=================================*/
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
    scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ===============================
   DARK / LIGHT MODE
=================================*/
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.textContent = "🌙";
    }
});

/* SAFE LOADER FIX */
window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    if(loader){
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }
});
