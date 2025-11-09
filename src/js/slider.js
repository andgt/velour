const swiper = new Swiper('.swiper', {
  speed: 800,
  spaceBetween: 0,
  loop: true,
  spaceBetween: 10,
  breakpoints: {
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 1,
    },
  },
  autoplay: {
    delay: 800,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

const swiperCard = new Swiper('.card__slider', {
  speed: 800,
  spaceBetween: 0,
  loop: true,
  spaceBetween: 10,
  breakpoints: {
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 1,
    },
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
})
