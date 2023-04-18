
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
carouselLeftButton.addEventListener("click", () => nextItem());
carouselRightButton.addEventListener("click", () => previousItem());
generateCarouselCircle();
setActiveCircles();
const touchSlide = (() => {
    let start, move, change, sliderWidth

    // Do this on initial touch on screen
    carouselItemWrapper.addEventListener("touchstart", (e) => {
      consoloe.log("started",e.touches[0].clientX)
        // get the touche position of X on the screen
        start = e.touches[0].clientX
        // (each slide with) the width of the slider container divided by the number of slides
        //sliderWidth = slider.clientWidth/trail.length
      return false;
    })
    
    // Do this on touchDrag on screen
    carouselItemWrapper.addEventListener("touchmove", (e) => {
        // prevent default function
        e.preventDefault()
      consoloe.log("moving",e.touches[0].clientX)
      
        // get the touche position of X on the screen when dragging stops
        move = e.touches[0].clientX
        // Subtract initial position from end position and save to change variabla
        change = start - move;
      return false;
      
    })

    const mobile = (e) => {
        // if change is greater than a quarter of sliderWidth, next else Do NOTHING
        change > 50  ? nextItem() : null;
      consoloe.log("end")
      
        // if change * -1 is greater than a quarter of sliderWidth, prev else Do NOTHING
        (change * -1) > 50 ? previousItem() : null;
        // reset all variable to 0
        [start, move, change, sliderWidth] = [0,0,0,0]
      return false;
      
    }
    // call mobile on touch end
    carouselItemWrapper.addEventListener("touchend", mobile)
})()
// onWindowResize(setButtonsPosition);
