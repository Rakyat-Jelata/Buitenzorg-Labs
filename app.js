/* ==========================
   DARK / LIGHT MODE
========================== */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        themeToggle.innerHTML = "☀️";
    }

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        if (
            document.body.classList.contains("light-mode")
        ) {
            localStorage.setItem("theme", "light");
            themeToggle.innerHTML = "☀️";
        } else {
            localStorage.setItem("theme", "dark");
            themeToggle.innerHTML = "🌙";
        }

    });

}

/* ==========================
   SMOOTH SCROLL
========================== */

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener(
        "click",
        function(e){

            const target =
                document.querySelector(
                    this.getAttribute("href")
                );

            if(target){

                e.preventDefault();

                target.scrollIntoView({
                    behavior:"smooth",
                    block:"start"
                });

            }

        }
    );

});

/* ==========================
   CONTACT FORM TO WHATSAPP
========================== */

const contactForm =
document.querySelector(".contact-form");

if(contactForm){

contactForm.addEventListener(
"submit",
function(e){

e.preventDefault();

const inputs =
contactForm.querySelectorAll(
"input, textarea, select"
);

const name =
inputs[0].value;

const company =
inputs[1].value;

const email =
inputs[2].value;

const budget =
inputs[3].value;

const message =
inputs[4].value;

const whatsappMessage =

`Hello Buitenzorg Labs

Name: ${name}

Company: ${company}

Email: ${email}

Budget: ${budget}

Project Details:
${message}`;

const phone =
"6285283212487";

const url =
`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(whatsappMessage)}`;

window.location.href = url;

);

});

}

/* ==========================
   PORTFOLIO AUTO SLIDER
========================== */

const portfolio =
document.querySelector(
".portfolio-carousel"
);

if(portfolio){

let scrollAmount = 0;

setInterval(() => {

scrollAmount += 370;

if(
scrollAmount >=
portfolio.scrollWidth -
portfolio.clientWidth
){
scrollAmount = 0;
}

portfolio.scrollTo({
left:scrollAmount,
behavior:"smooth"
});

},4000);

}

/* ==========================
   TESTIMONIAL SLIDER
========================== */

const testimonials =
document.querySelector(
".testimonial-grid"
);

if(testimonials){

let testimonialScroll = 0;

setInterval(() => {

testimonialScroll += 370;

if(
testimonialScroll >=
testimonials.scrollWidth -
testimonials.clientWidth
){
testimonialScroll = 0;
}

testimonials.scrollTo({
left:testimonialScroll,
behavior:"smooth"
});

},5000);

}

/* ==========================
   NAVBAR SHADOW
========================== */

window.addEventListener(
"scroll",
() => {

const header =
document.querySelector(
".header"
);

if(window.scrollY > 50){

header.style.boxShadow =
"0 10px 30px rgba(0,0,0,.25)";

}else{

header.style.boxShadow =
"none";

}

}
);

/* ==========================
   HERO COUNTER ANIMATION
========================== */

const counters =
document.querySelectorAll(
".hero-stats h3"
);

counters.forEach(counter => {

const updateCounter = () => {

const text =
counter.innerText;

let target = 0;

if(text.includes("+")){

target =
parseInt(text);

}else if(text.includes("%")){

target =
parseInt(text);

}else if(text.includes("/")){

return;

}else{

target =
parseInt(text);
}

let count = 0;

const speed = target / 50;

const timer =
setInterval(() => {

count += speed;

if(count >= target){

count = target;

clearInterval(timer);

if(text.includes("+")){

counter.innerText =
target + "+";

}
else if(text.includes("%")){

counter.innerText =
target + "%";

}
else{

counter.innerText =
target;

}

}else{

if(text.includes("+")){

counter.innerText =
Math.floor(count)+"+";

}
else if(text.includes("%")){

counter.innerText =
Math.floor(count)+"%";

}
else{

counter.innerText =
Math.floor(count);

}

}

},20);

};

updateCounter();

});

/* ==========================
   LOADING COMPLETE
========================== */

window.addEventListener(
"load",
() => {

document.body.classList.add(
"loaded"
);

console.log(
"Buitenzorg Labs Loaded Successfully 🚀"
);

});