export function getHalamanAuthor() {

    let autoType = new Typed("#autoType", {
        strings: ["MAHASISWA", "WEB DEVELOPER", "FRONTEND DEVELOPER"],
        typeSpeed: 200,
        backSpeed: 100,
        loop: true,
        showCursor: true,
        backDelay: 2000,
        cursorChar: '|',
    })

    $('#bacaLengkap').click(() => {
        $('#bacaLengkap').html(' gak tau bang aku ngarang binggung mau tulis apa lagi.')
    })

}