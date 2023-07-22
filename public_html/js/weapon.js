
if (localStorage.halaman === 'weapon') {
  $(".servis").removeClass("active");
  $("#weapon").addClass("active");
  $('#header-container').load("./public_html/weapon.html", function () {
    getHalamanWeapon()
  });
}


$('#weapon').click(() => {
  $('#header-container').load("./public_html/weapon.html #main-weapon", function () {
    getHalamanWeapon()
    localStorage.halaman = 'weapon'
  })
});

// !########################## bagian start

function getHalamanWeapon() {

  $(window).ready(function () {

    $('#form-select').click(function () {
      $('#select-senjata').toggleClass('h-52').toggleClass('h-0')
      $('#img-select').toggleClass('rotasi');
    })


    $('#form-select').on('click', '.select-jenis-senjata', function () {
      const jenis = $(this).html();
      $('.senjata-active').html(jenis)
      $('.select-jenis-senjata').removeClass('hidden')
      $(this).addClass('hidden')
    })

    // ?##################### ketika card di click

    $('.conten-weapon').on('click', '.image-senjata', function () {
      $(this).siblings('.data-senjata').toggleClass('h-[355px]')
    })


    // ? bg parallax scroll
    $(window).scroll(() => {
      let scroll = window.scrollY
      $('.container-main-weapon').css('background-position-y', `${scroll / 1.5}px`)
    });


  })

  // !######################### bagian pengambilan data


  function getCard(sumber) {

    return $('#conten-weapon').append(`
   <div class="relative statis-senjata mb-5 lg:w-[49%] lg:mb-[2%] before-dekor-card dark:bg-slate-200/40 h-max">
     <div class="image-senjata  p-5 pb-10 box-border cursor-pointer hover:shadow-lg border-2 border-stone-300 border-solid hover:border-stone-400 group hover:border-dashed" data-uuid="${sumber.uuid}">
       <h2 data-aos="fade-up" class="nama-senjata font-semibold text-4xl p-6 font-judul md:text-5xl lg:text-6xl text-textTerang dark:text-textGelap">${sumber.nama.toUpperCase()}</h2>
       <img data-aos="fade-down" class="block mx-auto bayangan group-hover:scale-110 group-hover:bayangan-hover transition-all " src="../components/image/${sumber.img}" alt="gambar senjata" />
   </div>

 <div class="data-senjata bg-slate-300  overflow-hidden  h-0 transition-all">
   <div class="data-utama">
     <h2 class="text-3xl py-3 border-b-2 border-solid border-stone-700 mb-2 font-subJudul pl-2">STATISTIK</h2>
     <ul class="font-isi">
       <li class="statistik bg-sky-200"><span>Fire-Rate :</span><span>${sumber.weaponStats.fireRate} RDS/SEC</span></li>
       <li class="statistik bg-sky-300"><span>Run Speed :</span><span>${sumber.weaponStats.runSpeedMultiplier} M/SEC</span></li>
       <li class="statistik bg-sky-200"><span>Equip Speed :</span><span>${sumber.weaponStats.equipTimeSeconds} SEC</span></li>
       <li class="statistik bg-sky-300"><span>Reload Speed :</span><span>${sumber.weaponStats.reloadTimeSeconds} SEC</span></li>
       <li class="statistik bg-sky-200"><span>Magazine :</span><span>${sumber.weaponStats.magazineSize} RDS</span></li>
     </ul>
   </div>
   <div class="data-damage">
     <h2 class="text-3xl font-medium py-3 border-b-2 border-solid border-stone-700 mb-2 font-subJudul pl-2">DAMAGE</h2>
     <ul class="font-isi">
       <li class="statistik bg-red-200">
         <div>distance :</div>
         <div>${sumber.weaponStats.damageRanges[0].rangeStartMeters}-${sumber.weaponStats.damageRanges[0].rangeEndMeters} </div>
         <div>${sumber.weaponStats.damageRanges[1].rangeStartMeters}-${sumber.weaponStats.damageRanges[1].rangeEndMeters} </div>
       </li>
       <li class="statistik bg-red-300">
         <div>head :</div>
         <div>${sumber.weaponStats.damageRanges[0].headDamage}</div>
         <div>${sumber.weaponStats.damageRanges[1].headDamage}</div>
       </li>
       <li class="statistik bg-red-200">
         <div>body :</div>
         <div>${sumber.weaponStats.damageRanges[0].bodyDamage}</div>
         <div>${sumber.weaponStats.damageRanges[1].bodyDamage}</div>
       </li>
       <li class="statistik bg-red-300">
         <div>legs :</div>
         <div>${sumber.weaponStats.damageRanges[0].legDamage}</div>
         <div>${sumber.weaponStats.damageRanges[1].legDamage}</div>
       </li>
     </ul>
   </div>
     </div>

 </div>
    `)
  }

  // ? ############################### pengambilan json pertama

  function getWeapon() {
    $.getJSON('../../json/imageSenjata.json', result => {
      const dataSenjata = result.senjata;
      $.each(dataSenjata, (index, elemen) => {

        // ? ######### card
        getCard(elemen)

      })


    })
  }

  getWeapon()

  // ? ############################## ketika jenis senjata di click

  $('#form-select').on('click', '.select-jenis-senjata', function () {
    let jenis = $(this).data('category').toLowerCase();

    // ? kosongkan isisnya
    $('#conten-weapon').html('')

    // ? jika pilih semua senjata
    if (jenis == "semua senjata") {
      return getWeapon()

    }


    $.getJSON('../../json/imageSenjata.json', result => {
      const dataSenjata = result.senjata;
      const jenisSenjata = [];

      // ?simpan data sesuai categoty
      $.each(dataSenjata, (index, elemen) => {

        if (jenis == elemen.category.toLowerCase()) {
          jenisSenjata.push(elemen)
        }
      })

      $.each(jenisSenjata, (index, elemen) => {
        // ? ############ card

        getCard(elemen)
      })
    })


  })


  // !######################### bagian end
}