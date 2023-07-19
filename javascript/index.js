
$('#profil').click(() => {
    $('#header-container').load("../public/profil.html #main-about", function () {
        getJsProfil()
    });
});

function getJsProfil() {

    // ?awal body
    $(document).ready(function () {

        $(".selecMode").on("click", ".mode", function () {
            $(".mode").removeClass("active");
            $(this).addClass("active");
        })

        //  * mengambil json 

        $(".mode").click(function () {
            const namaMode = $(this).html();
            $.getJSON("../json/modeGame.json", function (hasil) {

                const modeGame = hasil.modeGame;
                $.each(modeGame, function (index, elemen) {

                    if (namaMode == elemen.mode) {
                        $("#h1-mode").html(elemen.mode)
                        $("#p-mode").html(elemen.deskripsi)
                    }
                })
            })
        })

    });

}
// ? akhir body

getJsProfil()


// ? awal navbar
$(document).ready(function () {
    $('.servis').on('click', '.a-nav', function (even) {
        even.preventDefault()
    })

    $(".svg-burger").click(function () {
        $(".container-servis").toggleClass("nav-slide")

    })

    $(".icon-mode").click(function () {
        $("body").toggleClass("dark-mode");
        if ($("body").hasClass("dark-mode")) {
            $("#img-mode").attr("src", "../components/icon/sun.png")
        } else {
            $("#img-mode").attr("src", "../components/icon/moon.png")
        }

    })

    $(".ul-servis").on("click", ".servis", function () {
        $(".servis").removeClass("active");
        $(this).addClass("active");
    })

});
// ? akhir  navbar