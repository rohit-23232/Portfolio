// your code goes here
/*==================================================
  SCRIPT.JS
  Part 3.1

  ✓ Loader
  ✓ Sticky Navbar
  ✓ Mobile Menu
  ✓ Smooth Scroll
  ✓ Active Navigation
==================================================*/

"use strict";

/*==================================================
LOADER
==================================================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

        document.body.style.overflow = "visible";

    }, 900);

});

document.body.style.overflow = "hidden";

/*==================================================
ELEMENTS
==================================================*/

const header = document.querySelector(".header");

const menuBtn = document.querySelector(".menu-btn");

const navbar = document.querySelector(".navbar");

const navLinks = document.querySelectorAll(".navbar a");

const sections = document.querySelectorAll("section");

/*==================================================
CREATE MOBILE OVERLAY
==================================================*/

const overlay = document.createElement("div");

overlay.className = "nav-overlay";

document.body.appendChild(overlay);

/*==================================================
MOBILE MENU
==================================================*/

function openMenu(){

    navbar.classList.add("active");

    overlay.classList.add("active");

    menuBtn.innerHTML =
        '<i class="fa-solid fa-xmark"></i>';

    document.body.style.overflow = "hidden";

}

function closeMenu(){

    navbar.classList.remove("active");

    overlay.classList.remove("active");

    menuBtn.innerHTML =
        '<i class="fa-solid fa-bars"></i>';

    document.body.style.overflow = "visible";

}

menuBtn.addEventListener("click", () => {

    navbar.classList.contains("active")
        ? closeMenu()
        : openMenu();

});

overlay.addEventListener("click", closeMenu);

navLinks.forEach(link => {

    link.addEventListener("click", closeMenu);

});

/*==================================================
STICKY NAVBAR
==================================================*/

function stickyNavbar(){

    if(window.scrollY > 60){

        header.classList.add("scrolled");

    }

    else{

        header.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    stickyNavbar,
    { passive:true }
);

stickyNavbar();

/*==================================================
SMOOTH SCROLL
==================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        const target=document.querySelector(
            this.getAttribute("href")
        );

        if(!target) return;

        e.preventDefault();

        const offset=85;

        const position=
            target.offsetTop-offset;

        window.scrollTo({

            top:position,

            behavior:"smooth"

        });

    });

});

/*==================================================
ACTIVE NAV LINK
==================================================*/

function activateMenu(){

    let current="";

    sections.forEach(section=>{

        const top=
            window.scrollY;

        const offset=
            section.offsetTop-140;

        const height=
            section.offsetHeight;

        if(top>=offset &&
           top<offset+height){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(
            link.getAttribute("href")
            ==="#"+current
        ){

            link.classList.add("active");

        }

    });

}

window.addEventListener(

    "scroll",

    activateMenu,

    { passive:true }

);

activateMenu();

/*==================================================
ESC CLOSE MENU
==================================================*/

document.addEventListener("keydown",e=>{

    if(
        e.key==="Escape" &&
        navbar.classList.contains("active")
    ){

        closeMenu();

    }

});

/*==================================================
CLOSE ON RESIZE
==================================================*/

window.addEventListener("resize",()=>{

    if(window.innerWidth>900){

        closeMenu();

    }

});

/*==================================================
HEADER SHADOW ON SCROLL
==================================================*/

window.addEventListener(

    "scroll",

    ()=>{

        if(window.scrollY>120){

            header.style.boxShadow=
            "0 15px 40px rgba(0,0,0,.35)";

        }

        else{

            header.style.boxShadow="none";

        }

    },

    { passive:true }

);

/*==================================================
LOG
==================================================*/

console.log(
    "%cPortfolio Ready ✔",
    "color:#D4AF37;font-size:16px;font-weight:bold;"
);
/*==================================================
  SCRIPT.JS
  Part 3.2

  ✓ Scroll Progress Bar
  ✓ Reveal on Scroll
  ✓ Hero Typing Effect
  ✓ Counter Animation
==================================================*/

"use strict";

/*==================================================
SCROLL PROGRESS BAR
==================================================*/

const progressBar = document.getElementById("progressBar");

function updateProgressBar() {

    const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop;

    const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        (scrollTop / documentHeight) * 100;

    progressBar.style.width = progress + "%";

}

window.addEventListener(
    "scroll",
    updateProgressBar,
    { passive: true }
);

updateProgressBar();

/*==================================================
REVEAL ANIMATION
==================================================*/

const revealElements = document.querySelectorAll(
    ".section,.service-card,.portfolio-item,.price-card,.testimonial-card,.contact-item,.feature"
);

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                entry.target.classList.add("show");

            }

        });

    },

    {

        threshold: 0.15

    }

);

revealElements.forEach((element) => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});

/*==================================================
HERO TYPING EFFECT
==================================================*/

const heroTitle =
    document.querySelector(".hero h1");

if (heroTitle) {

    const originalText =
        heroTitle.innerHTML;

    heroTitle.innerHTML = "";

    let i = 0;

    function typeHero() {

        if (i < originalText.length) {

            heroTitle.innerHTML +=
                originalText.charAt(i);

            i++;

            setTimeout(typeHero, 22);

        }

    }

    window.addEventListener("load", () => {

        setTimeout(typeHero, 700);

    });

}

/*==================================================
COUNTER ANIMATION
==================================================*/

const counters =
    document.querySelectorAll(".hero-stats h3");

let counterPlayed = false;

function animateCounters() {

    if (counterPlayed) return;

    const statsSection =
        document.querySelector(".hero-stats");

    if (!statsSection) return;

    const rect =
        statsSection.getBoundingClientRect();

    if (rect.top <
        window.innerHeight - 100) {

        counterPlayed = true;

        counters.forEach(counter => {

            const text =
                counter.innerText;

            if (text.includes("★")) {

                return;

            }

            const target =
                parseInt(text.replace(/\D/g, ""));

            let current = 0;

            const speed =
                target / 80;

            function updateCounter() {

                current += speed;

                if (current < target) {

                    counter.innerText =
                        Math.floor(current) + "+";

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.innerText =
                        target + "+";

                }

            }

            updateCounter();

        });

    }

}

window.addEventListener(

    "scroll",

    animateCounters,

    { passive: true }

);

animateCounters();

/*==================================================
PARALLAX HERO
==================================================*/

const hero =
    document.querySelector(".hero");

window.addEventListener(

    "scroll",

    () => {

        if (!hero) return;

        const offset =
            window.scrollY;

        hero.style.backgroundPositionY =
            offset * 0.4 + "px";

    },

    { passive: true }

);

/*==================================================
BUTTON RIPPLE EFFECT
==================================================*/

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple =
            document.createElement("span");

        ripple.className = "ripple";

        const rect =
            this.getBoundingClientRect();

        ripple.style.left =
            e.clientX - rect.left + "px";

        ripple.style.top =
            e.clientY - rect.top + "px";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});

/*==================================================
SECTION FADE DELAY
==================================================*/

document.querySelectorAll(".service-card").forEach(

    (card, index) => {

        card.style.transitionDelay =
            `${index * 80}ms`;

    }

);

document.querySelectorAll(".portfolio-item").forEach(

    (item, index) => {

        item.style.transitionDelay =
            `${index * 70}ms`;

    }

);

document.querySelectorAll(".price-card").forEach(

    (card, index) => {

        card.style.transitionDelay =
            `${index * 120}ms`;

    }

);

/*==================================================
END PART 3.2
==================================================*/
/*==================================================
  SCRIPT.JS
  Part 3.3

  ✓ Portfolio Filter
  ✓ Back To Top
  ✓ Cursor Glow
  ✓ Contact Form Validation
  ✓ Performance Optimizations
==================================================*/

"use strict";

/*==================================================
PORTFOLIO FILTER
==================================================*/

const filterButtons =
document.querySelectorAll(".portfolio-filter button");

const portfolioItems =
document.querySelectorAll(".portfolio-item");

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        /* Active Button */

        filterButtons.forEach(btn=>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const filter =
        button.dataset.filter;

        portfolioItems.forEach(item=>{

            if(
                filter==="all" ||
                item.classList.contains(filter)
            ){

                item.style.display="block";

                setTimeout(()=>{

                    item.style.opacity="1";
                    item.style.transform="scale(1)";

                },100);

            }

            else{

                item.style.opacity="0";

                item.style.transform="scale(.85)";

                setTimeout(()=>{

                    item.style.display="none";

                },300);

            }

        });

    });

});

/*==================================================
BACK TO TOP
==================================================*/

const backToTop =
document.getElementById("backToTop");

function toggleBackButton(){

    if(window.scrollY>450){

        backToTop.classList.add("show");

    }

    else{

        backToTop.classList.remove("show");

    }

}

window.addEventListener(

    "scroll",

    toggleBackButton,

    {passive:true}

);

backToTop.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*==================================================
CURSOR GLOW
==================================================*/

const cursor =
document.querySelector(".cursor-glow");

if(cursor && window.innerWidth>992){

    let mouseX=0;

    let mouseY=0;

    let posX=0;

    let posY=0;

    window.addEventListener(

        "mousemove",

        e=>{

            mouseX=e.clientX;

            mouseY=e.clientY;

        },

        {passive:true}

    );

    function animateCursor(){

        posX+=(mouseX-posX)*0.12;

        posY+=(mouseY-posY)*0.12;

        cursor.style.left=posX+"px";

        cursor.style.top=posY+"px";

        requestAnimationFrame(
            animateCursor
        );

    }

    animateCursor();

}

/*==================================================
CONTACT FORM
==================================================*/

const form =
document.querySelector(".contact form");

if(form){

form.addEventListener("submit",function(e){

    e.preventDefault();

    const name=
    form.querySelector(
    'input[type="text"]'
    );

    const email=
    form.querySelector(
    'input[type="email"]'
    );

    const message=
    form.querySelector(
    "textarea"
    );

    if(

        name.value.trim()==="" ||

        email.value.trim()==="" ||

        message.value.trim()===""

    ){

        alert(
        "Please fill in all required fields."
        );

        return;

    }

    const emailPattern=

    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email.value)){

        alert("Enter a valid email.");

        return;

    }

    alert(

"Thank you! Your message has been sent successfully."

    );

    form.reset();

});

}

/*==================================================
LAZY IMAGE FADE-IN
==================================================*/

const images=
document.querySelectorAll("img");

const imageObserver=

new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="scale(1)";

imageObserver.unobserve(entry.target);

}

});

},

{

threshold:.15

}

);

images.forEach(img=>{

img.style.opacity="0";

img.style.transform="scale(.96)";

img.style.transition=
".6s ease";

imageObserver.observe(img);

});

/*==================================================
PERFORMANCE
==================================================*/

/* Prevent dragging images */

document.querySelectorAll("img")
.forEach(img=>{

img.draggable=false;

});

/* Passive touch */

window.addEventListener(

"touchstart",

()=>{},

{passive:true}

);

/*==================================================
COPYRIGHT YEAR
==================================================*/

const yearElement=
document.querySelector(".footer-bottom p");

if(yearElement){

const year=
new Date().getFullYear();

yearElement.innerHTML=

`© ${year} PhotoEditor Portfolio.
All Rights Reserved.`;

}

/*==================================================
PRELOAD HERO IMAGE
==================================================*/

const heroImage=
document.querySelector(".hero-image img");

if(heroImage){

const preload=new Image();

preload.src=heroImage.src;

}

/*==================================================
CONSOLE MESSAGE
==================================================*/

console.log(

"%c✨ Premium Portfolio Loaded Successfully",

"color:#D4AF37;font-size:16px;font-weight:bold"

);

/*==================================================
END OF SCRIPT
==================================================*/
