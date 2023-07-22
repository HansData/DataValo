if (localStorage.halaman === 'map') {
    $(".servis").removeClass("active");
    $("#map").addClass("active");
    $('#header-container').load("./public_html/map.html #main-map", function () {
        getHalamanMap()
    });
}

$('#map').click(() => {
    $('#header-container').load("./public_html/map.html #main-map", function () {
        getHalamanMap()
        localStorage.halaman = 'map'
    });
});

// !#####################bagian start
function getHalamanMap() {
    $(window).ready(() => {

        // ! ########### function menentukan lebar layar untuk menentukan settingna slick
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

        // ? ########## parallax scroll bg
        $(window).scroll(() => {
            let scroll = window.scrollY
            $('.container-main-map').css('background-position-y', `${scroll / 1.5}px`)
        });


    });


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
            <div class="relative border-[5px] border-solid border-white bg-white">
                <img data-aos="zoom-in" class="lg:w-[100%]" src="${elemen.splash}" alt="gambar peta" />

                <div class=" top-0 w-[10vw] h-[15vw] before:w-4/5 before:h-1/3 after:h-4/5 after:w-1/3 dekor-slide-map"></div>
                <div class=" bottom-0 w-[25vw] h-[8vw] before:w-1/3 before:h-4/5 before:bottom-0 after:h-1/4 after:w-4/5 after:bottom-0 dekor-slide-map"></div>
                <div class="right-0  top-0 w-[25vw] h-[8vw] before:w-1/3 before:h-4/5 before:top-0 before:right-0 after:h-1/4 after:w-4/5 after:top-0 after:right-0 dekor-slide-map"></div>
                <div class="right-0  bottom-0 w-[10vw] h-[15vw] before:w-4/5 before:h-1/3 before:bottom-0 before:right-0 after:h-4/5 after:w-1/3 after:bottom-0 after:right-0 dekor-slide-map"></div>

            </div>

            <div class="denah-map relative lg:absolute lg:bottom-0 lg:right-0 lg:w-48 lg:h-48  p-5 bg-teal-400 group lg:hover:w-full lg:hover:h-full lg:hover:bg-teal-400/50 transition-all">
                <span class="z-50 text-sm font-semibold absolute left-0 top-0 rotate-90 group-hover:lg:text-lg text-red-500">${getIndex()}</span>
                <h3 class="text-base font-semibold mb-2.5 group-hover:lg:text-4xl group-hover:lg:ml-5">${elemen.displayName.toUpperCase()}</h3>
                <img class="lg:w-[80%] group-hover:lg:w-1/2 bayangan2 border-2  border-stone-600 border-dashed mx-auto" src="${elemen.displayIcon}" alt="" />
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

    };

    // !##################bagian end

}