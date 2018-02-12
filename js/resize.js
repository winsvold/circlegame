var zoom = 1;

function resizeGame(){
	var heightwin = $('#canvasdiv').innerHeight();
	var widthwin = $('#canvasdiv').innerWidth();
	var heightcanvas = $('#myCanvas').innerHeight();
	var widthcanvas = $('#myCanvas').innerWidth();
	if((heightwin/heightcanvas) < (widthwin/widthcanvas))
		zoom = heightwin/heightcanvas;
	else
		zoom = widthwin/widthcanvas;

	$("#myCanvas").css({ 'zoom': zoom });

	var winheight = $(window).height();
	var top = winheight/2 - heightcanvas * zoom / 2;
	if(top>0)
		$('#canvasdiv').css({ 'margin-top': top});
}

window.setInterval(function(){
	resizeGame();
}, 20);

document.body.style.overflow = 'hidden';