const sliderContainers = document.querySelectorAll('.slider-container');

sliderContainers.forEach(container => {
  const slider = container.querySelector('.slider');
  const nextBtn = container.querySelector('.next');
  const prevBtn = container.querySelector('.prev');

  

  nextBtn.addEventListener('click', () => {
    slider.scrollBy({ left: 400, behavior: 'smooth' });
    setTimeout(updateArrows, 400);
  });

  prevBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -400, behavior: 'smooth' });
    setTimeout(updateArrows, 400);
  });

  slider.addEventListener('scroll', () => {
    updateArrows();
  });

  function snapToClosest() {
    const slides = container.querySelectorAll('.slide');
    const sliderCenter = slider.scrollLeft + slider.offsetWidth / 2;

    let closestSlide = null;
    let closestDistance = Infinity;

    slides.forEach(slide => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(sliderCenter - slideCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestSlide = slide;
      }
    });

    if (closestSlide) {
      const scrollTo = closestSlide.offsetLeft - (slider.offsetWidth / 2 - closestSlide.offsetWidth / 2);
      slider.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  }

  function updateArrows() {
    const scrollLeft = slider.scrollLeft;
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

    if (scrollLeft <= 10) {
      prevBtn.classList.add('hidden');
    } else {
      prevBtn.classList.remove('hidden');
    }

    if (scrollLeft >= maxScrollLeft - 10) {
      nextBtn.classList.add('hidden');
    } else {
      nextBtn.classList.remove('hidden');
    }
  }

  updateArrows();
});
