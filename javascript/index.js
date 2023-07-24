
import { getHalamanCharacter } from "./karakter.js";
import { getHalamanWeapon } from "../public_html/js/weapon.js";
import { getHalamanMap } from "../public_html/js/map.js";
import { getHalamanAuthor } from "../public_html/js/author.js";
import getSvg from "./getSvg.mjs";


function getHalamanSetting(halaman) {
  return $('#header-container').load(`./public_html/${halaman}.html #main-${halaman}`, function () {
    $(".servis").removeClass("active");
    $(`#${halaman}`).addClass("active");
    if (halaman === "profil") {
      getHalamanProfil()
    } else if (halaman === "character") {
      getHalamanCharacter()
    } else if (halaman === "weapon") {
      getHalamanWeapon()
    } else if (halaman === "map") {
      getHalamanMap()
    } else if (halaman === "author") {
      getHalamanAuthor()
    }

  })
}

// ? ketika halaman di load ulang
const namaHalaman = localStorage.halaman;
if (localStorage.halaman !== undefined) {

  getHalamanSetting(namaHalaman)
}



// ? menload sesuai id halaman
$('.ul-servis').on('click', '.servis', function () {
  const idServis = $($(this)).attr('id');
  localStorage.halaman = idServis;

  getHalamanSetting(idServis)

})

// ?######### configrasi animasi scroll
AOS.init({
  offset: 120,
  delay: 0,
  duration: 500,
  easing: 'ease',
  once: false,
  mirror: false,
  anchorPlacement: 'top-bottom',
});

// ? function halaman profil
function getHalamanProfil() {

  // ?awal body
  $(document).ready(function () {

    $(window).scroll(() => {
      if (window.scrollY > 50) {
        $('.navigasi').addClass('nav-scroll').removeClass('nav-fix')
        $('.ul-servis').addClass('dark:lg:text-textTerang')
      } else {
        $('.navigasi').removeClass('nav-scroll').addClass('nav-fix')
        $('.ul-servis').removeClass('dark:lg:text-textTerang')
      }
    })

    // ?#############

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

  // ? animasi kata valorant
  const kataValorant = $('#h1-valorant').html();
  $('#h1-valorant').html('');

  function ubahKata1(string, elemen) {
    $(`${elemen}`).html('')
    for (let huruf of string) {
      $('#h1-valorant').append(`
        <div data-aos="flip-left" class="group">
        <span class="block md:border-2 md:border-red-700 md:border-solid md:w-[10vw] group-hover:text-sky-600 md:bg-black/50 md:backdrop-blur-sm group-hover:md:-translate-y-6 group-hover:md:bg-black/90 transition-all cursor-default">${huruf}</span>
        </div>
        `)



    }
  }

  ubahKata1(kataValorant, "#h1-valorant")
  // ? mengambil svg
  getSvg()

}
// ? akhir body

getHalamanProfil()


// ? awal navbar
$(document).ready(function () {

  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    $("#img-mode").attr("src", "../components/icon/sun.png")
  } else {
    $("#img-mode").attr("src", "../components/icon/moon.png")
  }


  // !###################
  $('.a-nav').click(function (even) {
    even.preventDefault()
  })


  $(".burger").on('click', '.svg-burger', function () {
    $(".container-servis").toggleClass("nav-slide")
  })


  $(".icon-mode").click(function () {
    $("html").toggleClass("dark");
    if ($("html").hasClass("dark")) {
      $("#img-mode").attr("src", "../components/icon/sun.png")
      $('html').addClass('dark')
      localStorage.theme = 'dark'
    } else {
      $("#img-mode").attr("src", "../components/icon/moon.png")
      $('html').removeClass('dark')
      localStorage.theme = 'light'
    }

  })

  $(".ul-servis").on("click", ".servis", function () {
    $(".servis").removeClass("active");
    $(this).addClass("active");
  })



});
// ? akhir  navbar