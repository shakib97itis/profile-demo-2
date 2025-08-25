const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuOpenIcon = document.getElementById("menu-open");
const menuCloseIcon = document.getElementById("menu-close");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  menuOpenIcon.classList.toggle("hidden");
  menuCloseIcon.classList.toggle("hidden");
});


document.querySelectorAll(".accordion-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const parent = btn.parentElement;
    const content = parent.querySelector(".accordion-content");

    parent.classList.toggle("open");

    if (content.classList.contains("hidden")) {
      content.classList.remove("hidden");
    } else {
      content.classList.add("hidden");
    }
  });
});

// slider section started
const slider = document.getElementById("slider");
const dots = document.querySelectorAll(".dot");
let index = 0;
const total = slider.children.length;
let interval;

function showSlide(i) {
  index = (i + total) % total;
  slider.style.transform = `translateX(${-index * 100}%)`;

  dots.forEach((dot, dIndex) => {
    dot.classList.toggle("bg-white", dIndex === index);
    dot.classList.toggle("bg-white/50", dIndex !== index);
  });
}

function startAutoSlide() {
  interval = setInterval(() => {
    if (index === total - 1) {
      index = 0;
    } else {
      index++;
    }
    showSlide(index);
  }, 3000);
}

function resetAutoSlide() {
  clearInterval(interval);
  startAutoSlide();
}

document.getElementById("next").addEventListener("click", () => {
  if (index === total - 1) {
    index = 0;
  } else {
    index++;
  }
  showSlide(index);
  resetAutoSlide();
});

document.getElementById("prev").addEventListener("click", () => {
  if (index === 0) {
    index = total - 1;
  } else {
    index--;
  }
  showSlide(index);
  resetAutoSlide();
});

dots.forEach((dot, dIndex) => {
  dot.addEventListener("click", () => {
    index = dIndex;
    showSlide(index);
    resetAutoSlide();
  });
});

let startX = 0;
slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});
slider.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    if (index === total - 1) {
      index = 0;
    } else {
      index++;
    }
    showSlide(index);
    resetAutoSlide();
  } else if (endX - startX > 50) {
    if (index === 0) {
      index = total - 1;
    } else {
      index--;
    }
    showSlide(index);
    resetAutoSlide();
  }
});

showSlide(index);
startAutoSlide();
// slider section ended