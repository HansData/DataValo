$(window).ready(() => {

    // !##############pencobaan fungsi



    function getScreen() {

        const lebarLayar = $('body').outerWidth(true);
        console.log('ok')

        if (lebarLayar > 1024) {
            $('#arrowPrev').addClass('arrowPrev')
            $('#arrowNext').addClass('arrowNext')
        } else {
            $('#arrowPrev').removeClass('arrowPrev')
            $('#arrowNext').removeClass('arrowNext')
        }
    }

    getScreen()


    function getSettingSlick() {
        $('.slide-slick').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            // fade: true,
            infinite: false,
            asNavFor: '.slide',
            prevArrow: '.arrowPrev',
            nextArrow: '.arrowNext',
            dots: false,




        });
        $('.slide').slick({
            slidesToShow: 12,
            slidesToScroll: 12,
            variableWidth: true,
            asNavFor: '.slide-slick',
            infinite: false,
            centerMode: false,
            arrows: false,
            dots: false,
            focusOnSelect: true,
            touchMove: false
        });

    }

    getSettingSlick()

    // $(window).resize(() => {
    //     getScreen()
    //     $('.slide-slick').removeClass("slick-initialized slick-slider")
    //     $('.slide').removeClass("slick-initialized slick-slider")
    //     getSettingSlick()
    // })


    function zoomDenah() {
        $('.slide-slick').on('click', '.denah-map', function () {

        })
    }

})