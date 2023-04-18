
const carousel = document.querySelector(".carousel");
var currentItem = 0;
const carouselItemWrapper = document.querySelector(".carousel__item-wrapper");
const carouselLeftButton = document.querySelector(".carousel__arrow--left");
const carouselRightButton = document.querySelector(".carousel__arrow--right");
const carouselItem = document.querySelector(".carousel__item");
const carouselCircleWrapper = document.querySelector(
  ".carousel__circle-wrapper"
);

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
      console.log(currentItem);
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
    console.log(currentItem)
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
  let touchstartX = 0;
  let touchendX = 0;
  carouselItemWrapper.addEventListener("touchstart", (e) => {
    touchstartX = e.changedTouches[0].screenX;
    console.log(touchstartX)
  console.log("touchstart")
    
  });
  carouselItemWrapper.addEventListener("touchend", (e) => {
    touchendX = e.changedTouches[0].screenX;
    console.log(touchendX)
    console.log("touchend")
    
    if (touchendX < touchstartX && Math.abs(touchendX - touchstartX) > 50) {
    console.log("next")
      
      nextItem();
    }

    if (touchendX > touchstartX && Math.abs(touchendX - touchstartX) > 50) {
    console.log("prev")
      
      previousItem();
    }
  });
// onWindowResize(setButtonsPosition);
