const slideWrapper = document.getElementById('imageSliderContainer');
const slideTitle = document.getElementById('slideTitle');
const slideDesc = document.getElementById('slideDescription');
const slideDotsWrapper = document.getElementById('slideDots');


let page = document.getElementById('pageIdentifier').innerHTML;
console.log(page);

let slidesAmnt = 0;
let slides = null;

let slideIndex = 0;

let slidesJson = null;

async function loadJson() {
  try {
    const response = await fetch("./detailPageSlides/slides.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading .json:", error);
    return null;
  }
}

function nextSlide() {
  if (slideIndex === slides.length - 1) {
    slideIndex = 0;
  } else {
    slideIndex++;
  }
  updateSlide();
}

function prevSlide() {
  if (slideIndex === 0) {
    slideIndex = slides.length - 1;
  } else {
    slideIndex--;
  }
  updateSlide();
}

function updateSlide() {
  windowWidth = slideWrapper.offsetWidth;
  for (let i = 0; i < slidesAmnt; i++) {
    let cSlide = slides[i];
    let cSlideWidth = cSlide.offsetWidth;
    let offset = (cSlideWidth / windowWidth) * 50;
    let cDot = document.getElementById('dot-slide' + (i+1));

    let slideInfo = slidesJson[page][cSlide.id];
    console.log(slideInfo);

    if (i === slideIndex) {
      // cSlide.style.transform = 'translate(50%, 50%)';
      // cSlide.style.transform = 'translate(' + (50-offset) + '%, 10%)';
      cSlide.style.height = '40vh';

      // cSlideWidth = cSlide.offsetWidth;
      // offset = (cSlideWidth / windowWidth) * 50;
      cSlide.style.left = (50-offset) + '%';

      cSlide.style.filter = "none";
      cSlide.style.zIndex = 2;

      slideTitle.innerHTML = slideInfo['title'];
      slideDesc.innerHTML = slideInfo['description'];

      if (!cDot.classList.contains('cDot')) {
        cDot.classList.add('cDot');
      }
    } else {
      // cSlide.style.transform = 'translate(' + (50 + ((i - slideIndex) * 50)) + '%, 50%)';
      // cSlide.style.transform = 'translate(' + (50 - offset + (i - slideIndex)*50) + '%, 20%)';
      cSlide.style.left = (50 - offset + (i - slideIndex)*40) + '%';
      cSlide.style.height = '25%';
      cSlide.style.filter = "blur(5px)";
      cSlide.style.zIndex = 1;
      
      if (cDot.classList.contains('cDot')) {
        cDot.classList.remove('cDot');
      }
    }
  }
}

function fillSlider(data) {
  for (let i = 0; i < slidesAmnt; i++) {
    let slideInfo = data[page]['slide' + (i+1)];
    slideWrapper.innerHTML += 
    '<div class="imageSliderImg" id="slide' + (i+1) + '">'+
      // '<img src="'+slideInfo['image']+'" alt="" class="sliderImg">' +
      slideInfo['slideContent'] +
    '</div>';
    slideDotsWrapper.innerHTML += '<div id="dot-slide' + (i+1) + '" class="dot" onclick="chSlide(' + i + ')"></div>'
  }
}

function chSlide(index) {
  slideIndex = index;
  updateSlide();
}

async function setup(){
  // load slides.json into a variable
  slidesJson = await loadJson();
  console.log(slidesJson);
  slidesAmnt = Object.keys(slidesJson[page]).length;
  fillSlider(slidesJson);
  slides = slideWrapper.children;
  console.log(slides);
  updateSlide();
}

setup();
