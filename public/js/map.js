$(window).ready(() => {

    const lebarLayar = $('body').outerWidth(true);

    if (lebarLayar > 1024) {
        $('#arrowPrev').addClass('arrowPrev')
        $('#arrowNext').addClass('arrowNext')
    } else {
        $('#arrowPrev').removeClass('arrowPrev')
        $('#arrowNext').removeClass('arrowNext')
    }

    $('.slide-slick').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.slide',
        prevArrow: '.arrowPrev',
        nextArrow: '.arrowNext'
    });
    $('.slide').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        asNavFor: '.slide-slick',
        centerMode: true,
        arrows: false,
        dots: true,
        centerMode: true,
        focusOnSelect: true
    });



})