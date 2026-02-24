export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row, r) => {

    // FIRST ROW → NEXT BUTTON
    if (r === 0) {
      const nextbtn = document.createElement('button');
      nextbtn.classList.add('btn', 'btn-next');
      nextbtn.textContent = row.textContent.trim();
      row.replaceWith(nextbtn);

    // LAST ROW → PREV BUTTON
    } else if (r === rows.length - 1) {
      const prevbtn = document.createElement('button');
      prevbtn.classList.add('btn', 'btn-prev');
      prevbtn.textContent = row.textContent.trim();
      row.replaceWith(prevbtn);

    // MIDDLE ROWS → SLIDES
    } else {
      row.classList.add('slide');

      [...row.children].forEach((col, c) => {
        if (c === 1) {
          col.classList.add('slide-text');
        }
      });
    }
  });

  const slides = document.querySelectorAll('.slide');

  // Position slides horizontally
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100}%)`;
  });

  const nextSlide = document.querySelector('.btn-next');
  const prevSlide = document.querySelector('.btn-prev');

  let curSlide = 0;
  const maxSlide = slides.length - 1;

  function goToSlide(slideIndex) {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - slideIndex)}%)`;
    });
  }

  // NEXT BUTTON
  if (nextSlide) {
    nextSlide.addEventListener('click', () => {
      if (curSlide === maxSlide) {
        curSlide = 0;
      } else {
        curSlide++;
      }
      goToSlide(curSlide);
    });
  }

  // PREV BUTTON
  if (prevSlide) {
    prevSlide.addEventListener('click', () => {
      if (curSlide === 0) {
        curSlide = maxSlide;
      } else {
        curSlide--;
      }
      goToSlide(curSlide);
    });
  }
}