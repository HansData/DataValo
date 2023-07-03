
// !##########################

// ? mengambil data dari valorant API


function slickInit() {
    $('.slider').removeClass("slick-initialized slick-slider");
    $('.slider').slick({
        infinite: true,
        focusOnSelect: true,
        speed: 300,
        swipe: false,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,
        prevArrow: $(".btn-prev"),
        nextArrow: $(".btn-next")
    });
}

$(window).ready(function () {

    function semuaAgen() {


        $.ajax({
            url: "https://valorant-api.com/v1/agents",
            type: "get",
            dataType: "json",

            data: {
                "isPlayableCharacter": "true",
                "language": "id-ID",
            },
            success: function (hasil) {

                if (hasil.status == 200) {

                    let dataAgent = hasil.data;
                    $.each(dataAgent, function (index, conten) {
                        $("#slider").append(`
                <li class="slick-slide" data-uuid="${conten.uuid}">
                <img class="img-slick-slide active-img-slick" src="${conten.displayIcon}" alt="" />
                <p class="p-slick-slide active-p-slick">${conten.displayName}</p>
              </li>
             `)
                    })

                    // ! slick init

                    slickInit()


                    $("#image-karakter").attr("src", dataAgent[0].fullPortrait).css("background-image", `url( ${dataAgent[0].background})`)

                }

            }
        })

    };

    semuaAgen()


    $(".li-jenis-agen").click(function () {

        const roleAgen = $(this).children("p.p-jenis-agen").html();

        if (roleAgen == 'All Agent') {

            // ! jika semua agen
            $('.slider').html('')
            semuaAgen()
            return

        }

        $.ajax({
            url: "https://valorant-api.com/v1/agents",
            type: "get",
            dataType: "json",
            data: {
                "isPlayableCharacter": "true",
                "language": "id-ID",
            },
            success: function (result) {
                const resultAgen = result.data;
                let jenisAgen = [];

                $.each(resultAgen, function (index, dataAgen) {
                    if (roleAgen == dataAgen.role.displayName) {
                        jenisAgen.push(dataAgen)
                    }

                });


                $("#slider").html('')
                $.each(jenisAgen, function (index, informasiAgen) {

                    $("#slider").append(`
                <li class="slick-slide" data-uuid="${informasiAgen.uuid}">
                <img class="img-slick-slide active-img-slick" src="${informasiAgen.displayIcon}" alt="" />
                <p class="p-slick-slide active-p-slick">${informasiAgen.displayName}</p>
              </li>
             `)

                    if (index == 0) {
                        $("#image-karakter").attr("src", informasiAgen.fullPortrait).css("background-image", `url( ${informasiAgen.background})`)
                    }
                });

                // ! slick init
                slickInit()

            }
        })


    })

});


$(window).ready(function () {

    $('.li-jenis-agen').click(function () {
        $(".li-jenis-agen").removeClass("active-li-jenis-agen")
        $(".span-jenis-agen").removeClass("active-span-role")
        $(".p-jenis-agen").removeClass("active-p-lore")

        $(this).addClass("active-li-jenis-agen")
        $(this).children("span.span-jenis-agen").addClass("active-span-role")
        $(this).children("p.p-jenis-agen").addClass("active-p-lore")


        // !###################### ketika ganti gambar

        $('.slider').on("afterChange", function () {
            let currentSlide = $('.slider').slick('slickCurrentSlide');
            console.log(currentSlide)
        })

        // !################################ end nya

    })
});


// $('.slider').on("beforeChange", function () {

//     let currentSlide = $('.slider').slick('slickCurrentSlide');

//     $('.slick-slide').each(function (index, data) {

//         if ($(this).hasClass('slick-active')) {
//             let uuid = $(this).data('uuid')

//             $.ajax({
//                 url: `https://valorant-api.com/v1/agents/${uuid}`,
//                 type: "get",
//                 dataType: "json",
//                 data: {
//                     "language": "id-ID"
//                 },
//                 success: function (hasil) {

//                     const dataPribadi = hasil.data;
//                     $("#image-karakter").attr("src", dataPribadi.fullPortrait).css("background-image", `url( ${dataPribadi.background})`)

//                 }
//             })

//         }

//     })
// })

// ! percobaan slick
// $(window).ready(function () {

//     function slideDestop() {
//         setTimeout(
//             function () {
//                 $('.slider').slick({
//                     infinite: true,
//                     focusOnSelect: true,
//                     speed: 300,
//                     swipe: false,
//                     slidesToShow: 1,
//                     centerMode: true,
//                     variableWidth: true,
//                     prevArrow: $(".btn-prev"),
//                     nextArrow: $(".btn-next")
//                 });
//             }, 10)
//     }

//     function slideMobile() {
//         setTimeout(
//             function () {
//                 $('.slider').slick({
//                     infinite: true,
//                     focusOnSelect: true,
//                     speed: 300,
//                     swipe: true,
//                     swipeToSlide: true,
//                     slidesToScroll: 5,
//                     slidesToShow: 1,
//                     centerMode: true,
//                     variableWidth: true,
//                     prevArrow: $(".btn-prev"),
//                     nextArrow: $(".btn-next")
//                 });
//             },)
//     }

//     slideDestop()



// })
