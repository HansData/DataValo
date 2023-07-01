// function swiper1() {

//     new Swiper('.mySwiper', {
//         slidesPerView: 4,
//         spaceBetween: 30,
//         loop: true,
//         // centeredSlides: true,
//         pagination: {
//             el: '.swiper-pagination',
//             clickable: true,
//         },
//         navigation: {
//             nextEl: '.btn-next',
//             prevEl: '.btn-prev',
//         },
//     });
// }

// swiper1()

// ! percobaan slick

$('.slider').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true
});
