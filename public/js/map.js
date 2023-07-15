$(window).ready(() => {

    // !##############pencobaan fungsi



    function getScreen() {

        const lebarLayar = $('body').outerWidth(true);

        if (lebarLayar > 1024) {
            $('#arrowPrev').addClass('arrowPrev')
            $('#arrowNext').addClass('arrowNext')
        } else {
            $('#arrowPrev').removeClass('arrowPrev')
            $('#arrowNext').removeClass('arrowNext')
        }
    }

    getScreen()



})


const data = fetch('https://valorant-api.com/v1/maps')
    .then(result => result.json())
    .then(result => {
        const data = result.data;
        let nomor = 1;
        function getIndex() {
            if (nomor < 10) {
                return `0${nomor}`
            } else {
                return nomor
            }
        }
        $.each(data, function (index, elemen) {
            if (elemen.uuid !== 'ee613ee9-28b7-4beb-9666-08db13bb2244') {

                $('#slide-slick').append(`
                <div class="conten-slick relative bg-slate-700">
              <img class="lg:w-[100%]" src="${elemen.splash}" alt="" />

              <div class="denah-map relative lg:absolute lg:bottom-0 lg:right-0 lg:w-48 lg:h-48 p-5 bg-white group lg:hover:w-full lg:hover:h-full lg:hover:bg-white/50 transition-all">
                <span class="text-sm font-semibold absolute left-0 top-0 rotate-90 group-hover:lg:text-lg text-red-500">${getIndex()}</span>
                <h3 class="text-base font-semibold mb-2.5 group-hover:lg:text-4xl group-hover:lg:ml-5">${elemen.displayName.toUpperCase()}</h3>
                <img class="lg:w-[80%] group-hover:lg:w-1/2 bayangan2 border-2 border-stone-600 border-dashed mx-auto" src="${elemen.displayIcon}" alt="" />
              </div>
            </div>
                `);

                nomor++;
            }
        })

        getSettingSlick()

    })
    .catch(error => {
        $('#slide-slick').html(error)
    })

function getSettingSlick() {
    $('.slide-slick').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
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

