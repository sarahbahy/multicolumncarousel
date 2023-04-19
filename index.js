
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
  console.log(bullets);
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
  console.log(scrolllength);
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

const scrollTo = function (event) {
  event.preventDefault();
  carouselItemWrapper.scrollLeft = carouselItemWrapper.querySelector(
    this.getAttribute("href")
  ).offsetLeft;
};

const setInteracted = function () {
  carouselItemWrapper.classList.add("interacted");
};
// Attach the handlers
carouselItemWrapper.addEventListener("scroll", setSelected);
carouselItemWrapper.addEventListener("touchstart", setInteracted);
carouselItemWrapper.addEventListener("keydown", function (e) {
  if (e.key == "ArrowLeft") carouselItemWrapper.classList.add("interacted");
  if (e.key == "ArrowRight") carouselItemWrapper.classList.add("interacted");
});

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

function onCarouselSwipe() {
  let touchstartX = 0;
  let touchendX = 0;
  carouselItemWrapper.addEventListener("touchdown", (e) => {
    // console.log("touchdown", e.touches[0].screenX);
  });
  carouselItemWrapper.addEventListener("touchmove", (e) => {
    // console.log("touchmove", e.touches[0].screenX);
  });
  carouselItemWrapper.addEventListener("touchend", (e) => {
    // console.log("touchend", e);
    nextItem();
  });
  // carouselItemWrapper.addEventListener("mousedown", (e) => {
  //   touchstartX = e.screenX;
  //   console.log("mousedown", e.screenX);

  //   // document.body.style.overflow = "hidden";
  // });
  // carouselItemWrapper.addEventListener("mouseup", (e) => {
  //   // document.body.style.overflow = "";
  //   e.preventDefault();
  //   console.log("mouseup", e.screenX);
  //   touchendX = e.screenX;
  //   if (touchendX < touchstartX && Math.abs(touchendX - touchstartX) > 50) {
  //     nextItem();
  //   }
  //   console.log("moving");

  //   if (touchendX > touchstartX && Math.abs(touchendX - touchstartX) > 50) {
  //     previousItem();
  //   }
  // });
}

function generateCarouselCircle() {
  console.log(carouselItemWrapper.childElementCount);
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
onCarouselSwipe();
