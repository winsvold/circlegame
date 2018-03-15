var zoom = 1;

function resizeGame() {
    var heightwin = $('body').innerHeight();
    var widthwin = $('body').innerWidth();
    var heightcanvas = $('#myCanvas').innerHeight();
    var widthcanvas = $('#myCanvas').innerWidth();
    if ((heightwin / heightcanvas) < (widthwin / widthcanvas))
        zoom = heightwin / heightcanvas;
    else
        zoom = widthwin / widthcanvas;

    $("#myCanvas").css({'zoom': zoom});
}

window.setInterval(function () {
    resizeGame();
}, 200);
