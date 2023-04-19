
const carousel = document.querySelector(".carousel");
var currentItem = 0;
const carouselItemWrapper = document.querySelector(".carousel__item-wrapper");
const carouselLeftButton = document.querySelector(".carousel__arrow--left");
const carouselRightButton = document.querySelector(".carousel__arrow--right");
const carouselItem = document.querySelector(".carousel__item");
const carouselCircleWrapper = document.querySelector(
  ".carousel__circle-wrapper"
);
const setSelected = function () {
  const bullets = carouselCircleWrapper.querySelectorAll(".carousel__circle");
  bullets.forEach(function (bullet) {
    bullet.classList.remove("carousel__circle--active");
  });
  carouselItemWrapper
    .querySelectorAll(".carousel__item")
    .forEach(function (slide) {
      slide.classList.remove("selected");
    });
  const scrolllength =
    carousel.querySelector("ul li:nth-child(2)").offsetLeft -
    carousel.querySelector("ul li:nth-child(1)").offsetLeft;
  const nthchild = Math.round(
    carouselItemWrapper.scrollLeft / scrolllength + 1
  );
  carouselCircleWrapper
    .querySelector("div:nth-child(" + nthchild + ")")
    .classList.add("carousel__circle--active");
  carouselItemWrapper
    .querySelector("li:nth-child(" + nthchild + ")")
    .classList.add("selected");
};

const setInteracted = function () {
  carouselItemWrapper.classList.add("interacted");
};
// Attach the handlers
carouselItemWrapper.addEventListener("scroll", debounce(setSelected));
carouselItemWrapper.addEventListener("touchstart", setInteracted);

function setColumns() {
  if (carousel.dataset.carouselEnable === "true") {
    if (carousel.dataset.carouselColumns === "4") {
      carouselItemWrapper
        .querySelectorAll(".carousel__item")
        .forEach((item) =>
          item.classList.add(
            `col--md-6`,
            `col--lg-${12 / carousel.dataset.carouselColumns}`
          )
        );
    } else {
      carouselItemWrapper
        .querySelectorAll(".carousel__item")
        .forEach((item) =>
          item.classList.add(`col--md-${12 / carousel.dataset.carouselColumns}`)
        );
    }
    if (
      carousel.dataset.carouselColumns >= carouselItemWrapper.childElementCount
    ) {
      carouselRightButton.classList.add("carousel__arrow--right--hidden");
    }
  } else {
    carouselItemWrapper.classList.add(
      `carousel__item-wrapper--col-${carousel.dataset.carouselColumns}`
    );
  }
}
function setAccessibilityAttributes() {
  carouselItemWrapper
    .querySelectorAll(".carousel__item")
    .forEach((item) => (item.ariaHidden = true));
  carouselItemWrapper
    .querySelectorAll("a")
    .forEach((link) => link.setAttribute("tabindex", "-1"));
  if (window.innerWidth > 992) {
    let items =
      carouselItemWrapper.childElementCount < carousel.dataset.carouselColumns
        ? carouselItemWrapper.childElementCount
        : carousel.dataset.carouselColumns;
    for (let i = 0; i < items; i++) {
      carouselItemWrapper.children[currentItem + i].ariaHidden = false;
      carouselItemWrapper.children[currentItem + i]
        .querySelectorAll("a")
        .forEach((link) => link.removeAttribute("tabindex"));
    }
  } else {
    carouselItemWrapper.children[currentItem].ariaHidden = false;
    carouselItemWrapper.children[currentItem]
      .querySelectorAll("a")
      .forEach((link) => link.removeAttribute("tabindex"));
  }
}
function setActiveCircles() {
  const carouselCircles = carousel.querySelectorAll(".carousel__circle");
  carouselCircles.forEach((item) => {
    item.classList.remove("carousel__circle--active");
  });
  if (window.innerWidth > 992) {
    let items =
      carouselItemWrapper.childElementCount < carousel.dataset.carouselColumns
        ? carouselItemWrapper.childElementCount
        : carousel.dataset.carouselColumns;
    for (let i = 0; i < items; i++) {
      carouselCircles[currentItem + i].classList.add(
        "carousel__circle--active"
      );
    }
  } else {
    carouselCircles[currentItem].classList.add("carousel__circle--active");
  }
}
function previousItem() {
  //show right button
  carouselRightButton.classList.remove("carousel__arrow--right--hidden");
  const slideWidth = carouselItem.clientWidth;
  //if reached first item, hide left button

  if (currentItem === 1) {
    carouselLeftButton.classList.add("carousel__arrow--left--hidden");
  }
  if (currentItem !== 0) {
    currentItem -= 1;
  }
  carouselItemWrapper.style.transform = `translateX(-${
    (slideWidth + 32) * currentItem
  }px)`;
  setActiveCircles();
  setAccessibilityAttributes();
}

function nextItem() {
  //show the left button + remove margin-left
  carouselLeftButton.classList.remove("carousel__arrow--left--hidden");
  //slide the carousel
  const slideWidth = carouselItem.clientWidth;
  if (currentItem !== carouselItemWrapper.childElementCount - 1) {
    currentItem += 1;
  }
  carouselItemWrapper.style.transform = `translateX(-${
    (slideWidth + 32) * currentItem
  }px)`;
  //if reached last item, hide the right button
  if (
    currentItem + Number(carousel.dataset.carouselColumns) ===
    carouselItemWrapper.childElementCount
  ) {
    carouselRightButton.classList.add("carousel__arrow--right--hidden");
  }
  setActiveCircles();
  setAccessibilityAttributes();
}

function generateCarouselCircle() {
  for (let i = 0; i < carouselItemWrapper.childElementCount; i++) {
    const circle = document.createElement("div");
    circle.classList.add("carousel__circle");
    carouselCircleWrapper.appendChild(circle);
  }
  carouselCircleWrapper.classList.add("carousel__circle-wrapper--show");
}

setColumns();
function setButtonsPosition() {
  const imgHeight = document.querySelector("img")?.clientHeight;
  if (imgHeight) {
    document.querySelector(".carousel__arrow--right").style.top =
      imgHeight / 2 + "px";
    document.querySelector(".carousel__arrow--left").style.top =
      imgHeight / 2 + "px";
  }
}

carousel.classList.add("carousel--enabled");
setButtonsPosition();
setAccessibilityAttributes();
carouselLeftButton.addEventListener("click", () => nextItem());
carouselRightButton.addEventListener("click", () => previousItem());
generateCarouselCircle();
setActiveCircles();
/**
 * Debounce functions for better performance
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Function} fn The function to debounce
 */
function debounce(fn) {
  // Setup a timer
  let timeout;
  // Return a function to run debounced
  return function () {
    // Setup the arguments
    let context = this;
    let args = arguments;
    console.log(timeout);
    // If there's a timer, cancel it
    if (timeout) {
      window.cancelAnimationFrame(timeout);
    }
    // Setup the new requestAnimationFrame()
    timeout = window.requestAnimationFrame(function () {
      fn.apply(context, args);
    });
  };
}
