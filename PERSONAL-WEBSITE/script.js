//we will also add spinning on wesites:
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

//for fixed the navbar:or sticky while scrolling.
const nav = document.querySelector(".nav");
// console.log(nav);
const header = document.querySelector(".header");
const navheight = nav.getBoundingClientRect().height;
// console.log(navheight);
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navheight}px`,
});
headerObserver.observe(header);

//for scolling ...better performance while scrolling like bounce the section :
const allSections = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  section1.scrollIntoView({ behavior: "smooth" });
});

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

//for experienced!! active the other tab while clicking the header title
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  // console.log(clicked);

  if (!clicked) return;

  //remove active class:
  tabs.forEach((t) => t.classList.remove("operations__content--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  //active content area:
  clicked.classList.add("operations__tab--active");

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//click nav bar to display features smoothly::
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//for fadeout while mouseover on other nav bar::
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this; //here this keyword works as a opacity .. this return the current value::
    });
    logo.style.opacity = this;
  }
};

//can use bind method :
//passing "argument" into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

//create a new variable for current slide:
let curSlide = 0;
const maxSlide = slides.length;

//for dots below the  slides:
const dotContainer = document.querySelector(".dots");
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"> </button>`
    );
  });
};
createDots();

const activeDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};
activeDot(0); //for set default first slide more darker on dots!!

//for refactoring:
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToSlide(0);
//for next slide

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    //because looping over number of slide available
    curSlide = 0; //after reach last slide then back to first slide as well
  } else {
    curSlide++; //increase the slide number while performing next button
  }
  // slides.forEach((s,i)=>(s.style.transform=`translateX(${100*(i-curSlide)}%)`));
  goToSlide(curSlide);
  activeDot(curSlide);
};
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activeDot(curSlide);
};

//can slide use the --> and <-- key button or... right/left: to move on
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
//curSlide=1:-100% 0% 100% 200%;
document.addEventListener("keydown", function (e) {
  // console.log(e);
  // if(e.key==='ArrowRight')prevSlide();
  e.key === "ArrowRight" && nextSlide();
  e.key === "ArrowLeft" && prevSlide();
});
