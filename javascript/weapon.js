$(window).ready(function () {

    $('#form-select').click(function () {
        $('#select-senjata').toggleClass('hidden').toggleClass('.block')
        $('#img-select').toggleClass('rotasi');
    })


    $('#form-select').on('click', '.select-jenis-senjata', function () {
        const jenis = $(this).html();
        $('.senjata-active').html(jenis)
        $('.select-jenis-senjata').removeClass('hidden')
        $(this).addClass('hidden')
        console.log($(this))
    })

    $('.conten-weapon').on('click', '.image-senjata', function () {
        $(this).siblings('.data-senjata').toggleClass('h-0').toggleClass('h-[360px]')
    })
})


