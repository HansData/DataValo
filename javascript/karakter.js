
$('#character').click(() => {
    $('#header-container').load("../public_html/character.html #main-character", function () {

        // ! mengambil data dari valorant API


        // ? function setingan slide slick
        function lebarLayar() {
            $(window).ready(function () {

                let lebarLayar = $(window).outerWidth(true);
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

        // ? function pengambilan data dengan ajax
        function getDataAgent() {
            return $.ajax({
                url: "https://valorant-api.com/v1/agents",
                type: "get",
                dataType: "json",
                data: {
                    "isPlayableCharacter": "true",
                    "language": "id-ID",
                },
                success: result => result.data
            })

        }


        // ? function init slide slick
        function slickInit() {
            $('.slider').removeClass("slick-initialized slick-slider");

            // ! mengecek layar ketika di buka dan menentukan fitur slide yg dipakai
            lebarLayar()

        }

        // ?function tampilan statistik ability agent
        function ubahStatis(sumber) {
            $(".container-statis-karakter").html(`
    <div class="peran-karakter">
        <h2 class="h2-peran-karakter font-judul">${sumber.role.displayName}</h2>
    <div class="logo-role-agen"></div>
    </div>
    <div class="ability-karakter">
    <ul>
        <li class="logo-ability logo-ability-click" data-id="0"><span class="span-atas"></span><span class="span-bawah"></span><img class="img-ability-click" src="${sumber.abilities[0].displayIcon}" alt="" /></li>
        <li class="logo-ability" data-id="1"><span class="span-atas"></span><span class="span-bawah"></span><img src="${sumber.abilities[1].displayIcon}" alt="" /></li>
        <li class="logo-ability" data-id="2"><span class="span-atas"></span><span class="span-bawah"></span><img src="${sumber.abilities[2].displayIcon}" alt="" /></li>
        <li class="logo-ability" data-id="3"><span class="span-atas"></span><span class="span-bawah"></span><img src="${sumber.abilities[3].displayIcon}" alt="" /></li>
    </ul>
        <h3 class="h3-ability-karakter font-subJudul">${sumber.abilities[0].displayName.toUpperCase()}</h3>

        <p class="p-ability-karakter font-isi">
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

        // ?function tampil card slide agent
        function getCardSlide(sumber) {
            $("#slider").append(`
    <li class="slick-slide" data-uuid="${sumber.uuid}">
        <img class="img-slick-slide active-img-slick" src="${sumber.displayIcon}" alt="" />
        <p class="p-slick-slide active-p-slick font-isi">${sumber.displayName}</p>
    </li>
            `)
        }


        $(window).ready(function () {

            async function semuaAgen() {

                // !################## ambil data agent
                const dataAgent = await getDataAgent()

                if (dataAgent.status == 200) {
                    const isiDataAgent = dataAgent.data;

                    $.each(isiDataAgent, function (index, conten) {

                        // ! tampilkan card agent di slide
                        getCardSlide(conten)
                    })

                    // ! function slick init
                    slickInit()

                    // ! mengatur tampilan agent pertama ketika halaman dibuka
                    $("#image-karakter").attr("src", isiDataAgent[0].fullPortrait).css("background-image", `url( ${isiDataAgent[0].background})`)

                    // ! function ubah statis
                    ubahStatis(isiDataAgent[0])
                }

            };

            semuaAgen()


            // ?########################################

            // !############## ketika agent diclick sesuai role
            $(".li-jenis-agen").click(async function () {

                $(".li-jenis-agen").removeClass("active-li-jenis-agen")
                $(".span-jenis-agen").removeClass("active-span-role")
                $(".p-jenis-agen").removeClass("active-p-lore")

                $(this).addClass("active-li-jenis-agen")
                $(this).children("span.span-jenis-agen").addClass("active-span-role")
                $(this).children("p.p-jenis-agen").addClass("active-p-lore")

                const roleAgen = $(this).children("p.p-jenis-agen").html();

                if (roleAgen == 'All Agent') {

                    // ! jika semua agen
                    $('.slider').html('')
                    semuaAgen()
                    return

                }
                // ?mengambil data agent
                const dataAgent = await getDataAgent()

                if (dataAgent.status == 200) {
                    const isiDataAgent = dataAgent.data;
                    let jenisAgen = [];

                    $.each(isiDataAgent, function (index, dataAgen) {
                        if (roleAgen == dataAgen.role.displayName) {
                            jenisAgen.push(dataAgen)
                        }

                    })
                    // ? menghapus isi dari halaman agar kosong
                    $("#slider").html('')
                    $.each(jenisAgen, function (index, informasiAgen) {
                        // ?menampilakan card sesiuai dengan pilihan
                        getCardSlide(informasiAgen)

                        if (index == 0) {
                            $("#image-karakter").attr("src", informasiAgen.fullPortrait).css("background-image", `url( ${informasiAgen.background})`)
                            // ?manampilkan statis agent pertama yg tampil 
                            ubahStatis(informasiAgen)
                        };


                    })

                    // ! slick init
                    slickInit()

                };

            })


            // !################################ ketika card di click sesuai dengan agent

            async function getChangeStatis() {

                // ?mengambil data agent
                const dataAgent = await getDataAgent()
                // ?jika berhasil
                if (dataAgent.status == 200) {
                    const isiDataAgent = dataAgent.data;

                    $('.slider').on("afterChange", function () {
                        let uuidAgen = $('.slick-slide').filter('.slick-active').data('uuid');

                        $.each(isiDataAgent, function (index, data) {
                            if (uuidAgen == data.uuid) {
                                setTimeout(function () {

                                    // ? mengganti tampilan gambar agetn sesuai yg dipilih
                                    $("#image-karakter").attr("src", data.fullPortrait).css("background-image", `url( ${data.background})`)

                                    // ? function ubah statis agent
                                    ubahStatis(data)
                                }, 100)


                            }
                        })


                    })
                }


            }

            getChangeStatis()

        });

        // !################################ end nya



    })
})