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

var requestFullscreen = function (ele) {
    if (ele.requestFullscreen) {
        ele.requestFullscreen();
    } else if (ele.webkitRequestFullscreen) {
        ele.webkitRequestFullscreen();
    } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen();
    } else if (ele.msRequestFullscreen) {
        ele.msRequestFullscreen();
    } else {
        console.log('Fullscreen API is not supported.');
    }
};

var exitFullscreen = function () {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else {
        console.log('Fullscreen API is not supported.');
    }
};

var elem = document.body;

$('.full-screen').click(function () {
    if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    ) {
        exitFullscreen()
    } else {
        requestFullscreen(elem);
    }
});
