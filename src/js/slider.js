   // import Swiper JS
   import Swiper from 'swiper';
   // import Swiper styles
   import 'swiper/css';


  var swiper1 = new Swiper('.swiper', {
    speed: 400,
    initialSlide: 0,
    slidesPerView: 1,
    loop: true,
    pagination : {
      el: '.swiper-pagination1',
      type: 'bullets',
      clickable: true,
    }, 
    
    autoplay: {
     delay: 3000,
   },
    breakpoints: {
      320: {
        slidesPerView: 1.6,
        spaceBetween: 12
      },
      375: {
        slidesPerView: 1.6,
        spaceBetween: 12
      },
      
      768: {
        slidesPerView: 2.6,
        spaceBetween: 24
      },
      1200: {
        slidesPerView: 4.9,
        spaceBetween: 24
      },
    },   
  });