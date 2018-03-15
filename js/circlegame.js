var count = 30;
var level = 1;
var pause = 0;
var pauseDetectEdge = 1;
var colorchange = 1;
view.zoom = 1;
var huestart = 20;
var huerange = 80;
var dtc =1;
var delay = 0;
var smokenumb = 40;
var numberOfPointCircles = 30;

// Create a symbol, which we will use to place instances of later:
var background = new Path.Rectangle( new Rectangle (new Point(0,0),new Point (2000,1000) ) );
background.fillColor = '#f00';
background.fillColor.hue = huestart + 180;
background.fillColor.brightness = 0.6;
background.fillColor.saturation = 0.2;

var path = new Path.Circle({

	center: [0, 0],

	radius: 27,

	fillColor: 'white',

	strokeColor: 'black'

});


var starsymbol = new Symbol(path);

var starGroup = new Group();



// -------------- STARS ----------------

for (var i = 0; i < count; i++) {


	var center = Point.random() * view.size;

	var placedSymbol = starsymbol.place(center);

	placedSymbol.scale((5+i) / count);

	starGroup.addChild(placedSymbol);

}



var center = view.center;

var Circles = new Array()



 Circles[0] = new Path.Circle({

	center: center,

	radius: 65,

	strokeColor: '#333',

	fillColor: '#5a2',

	hue: huestart,

	});

Circles[1] = new Path.Circle({

	center: center,

	radius: 20,

	strokeColor: '#000',

	fillColor: '#000',

	});



Circles[2] = new Path.Circle({

	center: new Point(20,40),

	radius: 5,

	strokeColor: '#000',

	fillColor: '#000',

	});

	

function drawLine(){

	var start = new Point(center);

	var end =  (new Point(2,2) * Point.random()) - new Point(1,1);

	end.length=15;

	var path = new Path();

	path.strokeColor = 'black';

	path.strokeWidth=1;

	path.add(start);

	var midpoint = new Point(start + end)

	path.add(midpoint);



	while((midpoint-start).length < 65){

		var angledend = end.clone();

		angledend.angle+= (Math.random()-0.5)*60;

		midpoint+= angledend;

		path.add(midpoint);

	}

	path.scale(63/(midpoint-start).length, center);

	

	return path;

}



var ray = new Array();

var raydirection = new Array();

var sparkdirection = new Array();



var smoke = new Array();

var smokedir = new Array();



var smokepath = new Path.Circle({

	center: [-10, -10],

	radius: level === 10? 10 : 7,

	strokeColor: 'gray'

});



var pointcirc = new Path.Circle({

	center: [-10, -10],

	radius: level === 10? 10 : 7,

	strokeColor: 'yellow'

});



var pointcircsymbol = new Symbol(pointcirc);

var smokesymbol = new Symbol(smokepath);

var symbol = new Symbol(path);

var smokeGroup = new Group();

var smokedirGroup = new Group();

var smokecount = 0;



// Place the instances of the symbol:

for (var i = 0; i < smokenumb; i++) {

	// The center position is a random point in the view:

	var placedSymbol = smokesymbol.place(new Point(-10,-10));

	smokeGroup.addChild(placedSymbol);

	var nullpo = new Point(0,0);

	smokedir[i]=nullpo;

}

var pointcircdir = new Array();

var pointGroup = new Group();

// Place the instances of the symbol:

for (var i = 0; i < numberOfPointCircles; i++) {

	// The center position is a random point in the view:

	var placedSymbol = pointcircsymbol.place(new Point(-10,-10));

	pointGroup.addChild(placedSymbol);

	var nullpo = new Point(0,0);

	pointcircdir[i]=nullpo;

}



var numblines = 15;



for(i=0;i<numblines;i++){

	ray[i] = drawLine();

	raydirection[i] = Math.random()-0.5;

}



var acceleration = new Point(Math.random()*4-2,-2)*Point.random();

var deviceTouchLeft = false;
var deviceTouchRight = false;

var windowWidth = $(window).width();

var speed = new Point(Math.random()*4-2,Math.random()*4-2)*Point.random();

var text = new Array();



// Create a centered text[0] item at the center of the view:

text[0] = new PointText({

	point: new Point(40,view.bounds.height-40),

	justification: 'center',

	fontSize: 30,

	fillColor: 'yellow',

	strokeColor: 'black',

	strokeWidth: 0.6

});

text[2] = new PointText({

	point: new Point(view.bounds.width/2,35),

	justification: 'center',

	fontSize: 30,

	fillColor: 'yellow',

	strokeColor: 'black',

	strokeWidth: 0.6,

	content: ' '

});

text[1] = new PointText({

	point: new Point(view.bounds.width/2,45),

	justification: 'center',

	fontSize: 20,

	fillColor: 'black',

	strokeColor: 'black',

	strokeWidth: 0.4,

	content: 'Control with A W D S. Hit P to Pause'

});

text[3] = text[2].clone();

// Define a random point in the view, which we will be moving

// the text item towards.

var textdest = new Array();

textdest[0] = new Point(40,view.bounds.height - 80);

textdest[1] = textdest[0].clone();

textdest[2] = new Point(view.bounds.width/2,40);

var points = 0;







//OnFrame

function onFrame(event){
//--------------------------------GAME LOOP---------------------------------------------------------
//dtc = delta time compensation
dtc = (event.delta/0.025);
if(dtc > 6)
	dtc = 6;
//'dtc: '+ dtc + '				speed: ' + speed.length + '		acc: ' + acceleration.length + 
//console.log('			saturation: ' + background.fillColor.saturation + '			brightness: ' + background.fillColor.brightness + '			hue: ' + Circles[0].fillColor.hue + '			brightness: ' + Circles[0].fillColor.brightness	 + ' 		colorchange: ' + colorchange + '		'+colorchange*0.002*level*dtc );


if(delay<41){
	delay += 1*dtc;
}
if(level<11 && pause==0){


	//-----------------RAYS------------------------

		for(i=0;i<numblines;i++){

			if(Math.random()<0.1){

				raydirection[i] += (Math.random()*1-0.5)*dtc;
				
				var maxrot = 2*(1+level*level/6)*dtc;
				
				if(raydirection[i]>maxrot)

					raydirection[i]=maxrot;

				else if(raydirection[i]<-maxrot)

					raydirection[i]=-maxrot;

				ray[i].rotate(raydirection[i]*dtc,center);

			}

			
			/*
			var last = ray[i].lastSegment.point;

			var first = ray[i].firstSegment.point;

			var angle = (last-first).angle;

			var end = new Point(10,0);

			end.angle = angle;

			var midpoint = new Point(center + end)

			

			

			if(Math.random()<0.5){

				for(a=0;a<5;a++){

					var org = originalcord[i].segments[a].point;

					var oldpos = ray[i].segments[a].point;

					var random = Point.random()*6-new Point(3,3);

					console.log(random);

					var newpos = oldpos + random;

					if((newpos-org).length<1.5)

						ray[i].segments[a].point.y = newpos.y;

				}

			}

			//ray[i].scale(63/(midpoint-center).length, center);

			*/

		}

	

	//----------MOVE SMALL CIRCLES----------

	for (var i = 0; i < smokenumb; i++) {

		var item = smokeGroup.children[i];

		smokedir[i] *= 0.99;

		item.position += smokedir[i]*dtc;

		//item.opacity = 0.2;

	}

	for (var i = 0; i < numberOfPointCircles; i++) {

		var item = pointGroup.children[i];

		pointcircdir[i] *= 0.99;

		item.position += pointcircdir[i]*dtc;

		//item.opacity = 0.2;

	}

	

	//-------------TRAIL--------------

	if(smokecount>((smokenumb-1)*8))

		smokecount = 0;

	smokeGroup.children[Math.round(smokecount/8)].position = Flyer.position;

	//smokeGroup.children[Math.round(smokecount/8)].opacity = 1;

	smokedir[Math.round(smokecount/8)] = acceleration.clone()*2 + speed.clone()*0.2;

	smokedir[Math.round(smokecount/8)].angle +=180;

	smokecount++;

	

	

	//------------WHITE CIRCLES---------

	for (var i = 0; i < count; i++) {

		var item = starGroup.children[i];

		// Move the item 1/20th of its width to the right. This way

		// larger circles move faster than smaller circles:

		if(points<0)

			points = 0;

		item.position.x += ((item.bounds.width / 30) * (0.1+level/10+Math.sqrt(points)/140)*(1+level/20))*dtc;

		// If the item has left the view on the right, move it back

		// to the left:

		if (item.bounds.left > view.size.width) {

			item.position.x = -item.bounds.width;

		}

		if(((item.position - Flyer.position).length < item.bounds.height/2 + Flyer.bounds.height/2) && Circles[1].bounds.height<view.bounds.height/2 && delay > 40){
			
			Flyer.scale( Math.pow(1-item.bounds.height / 200 , dtc) );

			points -= Math.round((Flyer.bounds.height*item.bounds.height/8)*(1+points/30000+level/8))*dtc;

			textdest[1] = Point.random() *70 + new Point(50,view.bounds.height - 90);
			
			Flyer.position.x += (Math.random()*10-5)*dtc;

			Flyer.position.y += (Math.random()*10-5)*dtc;

			speed.angle += (Math.random()*40-20)*dtc;

		}


	}

	
	//-------------CONTROL ACCELERATION AND SPEED----------------------
		//acceleration.length += 0.2;

	//acceleration.angle+=Math.random()*10-5;

	if(acceleration.length < 0.7 * (1+level/20))

		acceleration.length *= 1.02;

	if(acceleration.length > 0.7 * (1+level/20))

		acceleration.length *= 0.95;

	if(acceleration.length > 2 * (1+level/10))

		acceleration.length = 2 * (1+level/10);

	if(acceleration.length < 0.1)

		acceleration.length = 0.1;



	//-----------INPUT------------

	var touchTurnLeft = deviceTouchLeft && !deviceTouchRight;
	var touchTurnRight = deviceTouchRight && !deviceTouchLeft;
	var touchAccelerate = deviceTouchRight && deviceTouchLeft;

	if(Key.isDown('a') || Key.isDown('left') || touchTurnLeft)

		acceleration.angle-=4*dtc * (1+level/(25+speed.length*2));// *Math.sqrt(acceleration.length);

	if(Key.isDown('d')  || Key.isDown('right') || touchTurnRight)

		acceleration.angle+=4*dtc * (1+level/(25+speed.length*2));// *Math.sqrt(acceleration.length);

	if(Key.isDown('w')  || Key.isDown('up') || touchAccelerate)

		acceleration.length+=0.1*dtc * (1+level/15);

	if(Key.isDown('s' )  || Key.isDown('down')){

		acceleration.length=0;	
		speed.length *= Math.pow(0.99,dtc);
	}

	speed += acceleration.clone() * 0.07 * (1+level/15);// *(0.15 /(1+speed.length));

	if(speed.length > 4 * (1+level/15))

		speed.length *= Math.pow(0.98,dtc);

	Flyer.position += (speed * dtc);

	

	var dotpos = new Point(0,0)

	dotpos.length = Flyer.bounds.height/2;

	dotpos.angle = acceleration.angle;

	Circles[2].position = Flyer.position + dotpos;

	
	//---------------TEMP---------
	/*
	if(Key.isDown('l'))
		background.fillColor.saturation +=0.01;
	if(Key.isDown('k'))
		background.fillColor.saturation -=0.01;
	if(Key.isDown('j'))
		background.fillColor.brightness +=0.01;
	if(Key.isDown('h'))
		background.fillColor.brightness -=0.01;
	if(Key.isDown('g'))
		Circles[0].fillColor.hue +=0.5;
	if(Key.isDown('f'))
		Circles[0].fillColor.hue -=0.5;
	if(Key.isDown('g'))
		points *= 1.01;
	if(Key.isDown('f'))
		level +=1;
	*/
	//--------------------
	if(Circles[0].bounds.height < 50){

			Circles[0].scale(Math.pow(0.99,dtc));

			Circles[1].scale(Math.pow(0.9995,dtc));

			for(i=0;i<numblines;i++){

				ray[i].scale((Math.random()*500/((ray[i].lastSegment.point-center).length*10)+1),center);

			}

			if(smokecount>(smokenumb-1))

				smokecount = 0;

			smokeGroup.children[Math.round(smokecount)].position = center;

			//smokeGroup.children[Math.round(smokecount/8)].opacity = 1;

			smokedir[Math.round(smokecount)].length = Math.random()*50/(Math.sqrt(Circles[0].bounds.height)+0.1);

			smokedir[Math.round(smokecount)].angle = Math.random()*360;

		}

	else{

		for(i=0;i<numblines;i++){

			if((( ray[i].lastSegment.point-center).length ) > Circles[0].bounds.height/2 +2 )

				ray[i].scale(0.93,center);

			else if((( ray[i].lastSegment.point-center).length ) < Circles[0].bounds.height/2 -2 )	

				ray[i].scale(1.01,center);

			}

	}

	//---------LEVEL UP---------
		if(Circles[0].bounds.height < 0.20/(1+level*10) || ((Circles[0].position - Flyer.position).length < Circles[0].bounds.height/2 + Flyer.bounds.height/2 && Circles[0].bounds.height < 40)){
			level++;
			points += level*points/200;
			if((Circles[0].position - Flyer.position).length < Circles[0].bounds.height/2 + Flyer.bounds.height/2)
				points *= 1.1;
		
			if(level == 10) {
                smokesymbol.definition.strokeColor = '#aaa';
                Circles[2].strokeColor = '#fff';
            }
            Circles[0].scale(700/Circles[0].bounds.height);
			Circles[1].scale(5000/Circles[1].bounds.height);
			Circles[0].fillColor.hue = huestart + huerange*level;
			background.fillColor.hue = huestart + 180 + huerange*level;
			background.fillColor.brightness = 0.6-(level/25);
			background.fillColor.saturation = 0.2+(level/50);
				
			for(i=0;i < numberOfPointCircles;i++){

				pointGroup.children[i].position = center;

				//smokeGroup.children[Math.round(smokecount/8)].opacity = 1;

				pointcircdir[i].length = Math.random() * 25;

				pointcircdir[i].angle += Math.random()*360;

			}
			for (var i = 0; i < count; i++) {

			starGroup.children[i].position = Point.random() * view.size;
			
			if(i<level*count/15)
				starGroup.children[i].position.y = -100;
			}

		}

		

		if(Circles[0].bounds.height > 130 * (1+level/4)){

			Circles[0].scale(Math.pow(0.995,dtc));

			text[0].position = center;

			text[0].fontSize = 200;

			text[3].content = 'LEVEL '+level+'!';
			text[3].position = center+ new Point(0,-60);
			text[3].fontSize = 100;

		} else {

			text[0].fontSize = 30;
			text[3].content = ' ';

		}

		

		if(Circles[1].bounds.height > 50*(1+level/6)){

			Circles[1].scale(Math.pow(0.985,dtc));

		}
	
	//-----------HIT--------------
		if((Circles[0].position - Flyer.position).length < Circles[0].bounds.height/2 + Flyer.bounds.height/2){

			Circles[0].scale(1-(Flyer.bounds.height/150));

			Circles[1].scale(1-(Flyer.bounds.height/150));
			
			Flyer.scale(0.1);
			
			points += Flyer.bounds.height * (1+points/40000+Circles[0].bounds.height/1000+level/10)  * 500;
			
			textdest[1] = Point.random() *70 + new Point(50,view.bounds.height - 90);

		}
	//-------KILL FLYER------------------
	if(Flyer.bounds.height<15){
		
		for(i=0;i<smokenumb;i++){

		smokeGroup.children[i].position = Flyer.position;

		//smokeGroup.children[Math.round(smokecount/8)].opacity = 1;

		smokedir[i].length = 10 * Math.random() * speed.length*(1+level/20)/2;

		smokedir[i].angle += Math.random()*360;

		}

		for(i=0;i < numberOfPointCircles;i++){

			pointGroup.children[i].position = text[0].position;

			//smokeGroup.children[Math.round(smokecount/8)].opacity = 1;

			pointcircdir[i].length = Flyer.bounds.height * Math.random() * speed.length/3;

			pointcircdir[i].angle += Math.random()*360;

			}

		

		Flyer.remove();

		Flyer = createFlyer();

		textdest[1] = Point.random() *70 + new Point(50 + points/1500,view.bounds.height - 90);

	}
	//-----------KEEP FLYER ON MAP
	if(Flyer.position.x<-30){
		Flyer.position.x = view.size.width+30;
	} else if(Flyer.position.y<-30){
		Flyer.position.y = view.size.height+30;
	} else if (Flyer.position.x>view.size.width+30){
		Flyer.position.x = -30;
	} else if (Flyer.position.y>view.size.height+30){
		Flyer.position.y = -30;
	}	

	

	//--------Move text and update------------

	if(points < 5000){

		text[1].content = 'Control with A W D S. Hit P to pause \nMobile: Touch on right side or left side of screen to turn. Hold in both sides to accelerate.';

	}

	else if(5000 < points ){

		text[1].content = ' ';

	}

	
	text[2].content = 'Level '+level+'/10';
	text[0].fontSize = 30*(1+points/300000);
	text[1].fontSize = 35;
	text[1].fillColor = 'black';
	text[1].position = new Point(view.bounds.width/2,90);
	

	

	//------------------POINTS-----------------------

	points -= (0.2+level/30+points/100000)*dtc;

	if(points<0)

		points=0;

	var vector = textdest[1] - text[0].position;

	text[0].position += (vector / 30)*dtc;

	text[0].content = Math.round(points);

	var shake = points/1000;

	if (vector.length < 2*(1+shake/40)) {

		textdest[1] += new Point(2*(1+shake/40)*(Math.random()-0.45), 2*(1+shake/40)*(Math.random()-0.55));

	}

	//-----------------COLOR CHANGE-------------------
	
	Circles[0].fillColor.brightness += colorchange*0.002*level*dtc;
	if(Circles[0].fillColor.brightness>=0.99 )
		colorchange = -1;
	if( Circles[0].fillColor.brightness<=0.6)
		colorchange = 1;

}
//----------GAME LOOP END-----------
//-----------after game-------------
else if(level>=11){

text[0].content = 'Final score: ' + Math.round(points) +'!';
text[0].position = center;
text[0].fontSize = 70;
text[1].content = 'Hit R to play again';
text[1].position = center + new Point(0,60);
text[1].fontSize = 30;
text[1].fillColor = 'white';
text[3].content = 'YOU WON!';
text[3].position = center+ new Point(0,-80);
text[3].fontSize = 100;
text[2].content = '';

if(Key.isDown('r')){
	level = 1;
	points = 0;
	Circles[0].fillColor.hue = huestart;
	Circles[2].strokeColor = '#000';
	background.fillColor.hue = huestart + 180;
	background.fillColor.brightness = 0.6;
	background.fillColor.saturation = 0.2;
	smokesymbol.definition.strokeColor = 'black';
	}

//-------------MOVE YELLOW CIRCLES--------------
for (var i = 0; i < numberOfPointCircles; i++) {

		var item = pointGroup.children[i];

		pointcircdir[i] *= 0.99;

		item.position += pointcircdir[i];

		//item.opacity = 0.2;

	}

}

if((Key.isDown('p') || Key.isDown('P')) && pauseDetectEdge){
		pauseDetectEdge = 0;
		if(pause==1){
			pause = 0;
			text[1].fontSize = 30;
			text[1].position = new Point(view.bounds.width/2,70);
            text[1].fillColor = 'black';
		} else {
		pause = 1;
		text[1].content = 'PAUSED!';
		text[1].position = center;
		text[1].fontSize = 80;
        text[1].fillColor = 'white';
		text[0].position = center + new Point(0,100);
		}
	} else if(!(Key.isDown('p') || Key.isDown('P'))){
		pauseDetectEdge = 1;
	}


}



function createFlyer(){
	delay = 0;
	//do{
	if(Math.random()>0.5){
		var point = new Point(Math.random()*view.size.width,view.size.height+20);
		var direction = new Point(Math.random()*4-2,-2)*Point.random()+new Point(0,-0.5);
	} else {
		var direction = new Point(Math.random()*4-2,2)*Point.random()+new Point(0,0.5);
		var point = new Point(Math.random()*view.size.width,-20);
	}
	
	//--------------SPAWNING WITHOUT CRASHING SYSTEM ------------------ NOT WORKiNG SLOW!
	/*
	var stop = 1;
	for (var i = 0; i < count && stop; i++) {
		var item = starGroup.children[i];
		var positionx = item.position.x;
		for(a=0;a< 50*dtc ; a=a+2){
			var match = 1;
			positionx += a*((item.bounds.width / 30) * (0.1+Math.sqrt(points*(0.4))/200+points/180000)*(1+level/30))*dtc;
			if (positionx>view.bounds.width+item.bounds.width/2)
				positionx = 0 - item.bounds.width/2;
			var pos = new Point (positionx,item.position.y);
			var flyerpos = point + direction*a*dtc;
			if( (pos - flyerpos).length < item.bounds.height + 30 ){
				stop = 0;
				}
			}
		}
	escape++;
	if(stop)
		console.log('yeah!');

	}while(!stop && escape < count); */
	
	
	acceleration = direction.clone();
	speed = direction.clone();


	var newCircle = Path.Circle({

		center: point,

		radius: 15,

		fillColor: level=== 10 ? '#fff' : '#f00',

		strokeColor: 'black'

	});

	return newCircle;

}

function someIsLeftOfMiddle(touches) {
	return touches.some(function(touch){
		return touch.clientX < windowWidth/2;
    });
}

function someIsRightOfMiddle(touches) {
    return touches.some(function(touch){
        return touch.clientX > windowWidth/2;
    });
}

function touchHandler(event) {
	deviceTouch = true;
	if(someIsLeftOfMiddle(Array.from(event.touches))) {
		deviceTouchLeft = true;
	} else {
		deviceTouchLeft = false;
	}
	if(someIsRightOfMiddle(Array.from(event.touches))){
		deviceTouchRight = true;
	} else {
		deviceTouchRight = false;
	}
}

function windowResizeHandler() {
	windowWidth = $(window).width();
}

window.addEventListener('touchstart', touchHandler);
window.addEventListener('touchend', touchHandler);
window.addEventListener('resize', windowResizeHandler);

document.addEventListener('contextmenu', function(event){event.preventDefault()});

Flyer = createFlyer();

console.log('Circle Game!');
