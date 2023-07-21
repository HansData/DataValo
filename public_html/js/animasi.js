const kataValorant = $('#h1-valorant').html();

function ubahKata1(string, elemen) {
    $(`${elemen}`).html('')
    for (let huruf of string) {
        $('#h1-valorant').append(`
        <span class="block md:border-2 md:border-red-700 md:border-solid md:w-[10vw] hover:text-sky-600 md:bg-black/50 md:backdrop-blur-sm hover:md:-translate-y-6 hover:md:bg-black/90 transition-all cursor-default">${huruf}</span>
        `)


    }
}

ubahKata1(kataValorant, "#h1-valorant")
