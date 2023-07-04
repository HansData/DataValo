
// !##########################

// ? mengambil data dari valorant API

function lebarLayar() {
    $(window).ready(function () {

        let lebarLayar = $(window).outerWidth();
        if (lebarLayar > 1024) {

            return $('.slider').slick({
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
        } else {
            return $('.slider').slick({
                infinite: true,
                focusOnSelect: true,
                speed: 300,
                swipe: true,
                swipeToSlide: true,
                slidesToScroll: 5,
                slidesToShow: 1,
                centerMode: true,
                variableWidth: true,
                prevArrow: $(".btn-prev"),
                nextArrow: $(".btn-next")
            });
        }
    })
}


function slickInit() {
    $('.slider').removeClass("slick-initialized slick-slider");

    // ! mengecek layar ketika di buka dan menentukan fitur slide yg dipakai
    lebarLayar()

}

function ubahStatis(sumber) {
    $(".container-statis-karakter").html(`
    <div class="peran-karakter">
        <h2 class="h2-peran-karakter">${sumber.role.displayName}</h2>
    <div class="logo-role-agen"></div>
    </div>
    <div class="ability-karakter">
    <ul>
        <li class="logo-ability logo-ability-click" data-id="0"><span class="span-atas"></span><span class="span-bawah"></span><img class="img-ability-click" src="${sumber.abilities[0].displayIcon}" alt="" /></li>
        <li class="logo-ability" data-id="1"><span class="span-atas"></span><span class="span-bawah"></span><img src="${sumber.abilities[1].displayIcon}" alt="" /></li>
        <li class="logo-ability" data-id="2"><span class="span-atas"></span><span class="span-bawah"></span><img src="${sumber.abilities[2].displayIcon}" alt="" /></li>
        <li class="logo-ability" data-id="3"><span class="span-atas"></span><span class="span-bawah"></span><img src="${sumber.abilities[3].displayIcon}" alt="" /></li>
    </ul>
        <h3 class="h3-ability-karakter">${sumber.abilities[0].displayName.toUpperCase()}</h3>

        <p class="p-ability-karakter">
            ${sumber.abilities[0].description}
        </p>
    </div>`).find('div.logo-role-agen').css("background-image", `url(${sumber.role.displayIcon})`)

    $('.logo-ability').click(function () {
        let dataId = $(this).data('id')

        $('.h3-ability-karakter').html(sumber.abilities[dataId].displayName.toUpperCase())
        $('.p-ability-karakter').html(sumber.abilities[dataId].description)

        $('.logo-ability').removeClass('logo-ability-click').children('img').removeClass('img-ability-click');
        $(this).addClass('logo-ability-click').children('img').addClass('img-ability-click');
    })
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

                    // ! function ubah statis
                    ubahStatis(dataAgent[0])

                }

            }
        })

    };

    semuaAgen()


    // ?########################################


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

                        ubahStatis(informasiAgen)
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


    })
});




// !################################ ketika ganti gambar

function getChangeStatis() {

    $.ajax({
        url: "https://valorant-api.com/v1/agents",
        type: "get",
        dataType: "json",

        data: {
            "isPlayableCharacter": "true",
            "language": "id-ID",
        },
        success: function (hasil) {
            const resultAgen = hasil.data;

            $('.slider').on("afterChange", function () {
                let uuidAgen = $('.slick-slide').filter('.slick-active').data('uuid');

                $.each(resultAgen, function (index, data) {
                    if (uuidAgen == data.uuid) {

                        setTimeout(function () {

                            $("#image-karakter").attr("src", data.fullPortrait).css("background-image", `url( ${data.background})`)

                            // ! function ubah statis
                            ubahStatis(data)
                        }, 100)


                    }
                })


            })
        }
    });

}

getChangeStatis()

// !################################ end nya
