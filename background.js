function initBackground( star, img ){
	img.moon = new Image();
	img.moon.src = "image/moon.png";
	img.building = new Image();
	img.building.src = "image/building.png";
	
	var i;
	/* 별 */
	star[0] = 100;
	for( i = 1; i <= star[0]; i++ ){
		star[i] = new Object();
		star[i].x = Math.random()*1100;
		star[i].y = Math.random()*600;
		star[i].scale = Math.random()*0.7 + 0.2;
	}
};

function printBackground( star, scr, img, context ){
	var i;
	/* 별 */
	for( i = 1; i <= star[0]; i++ ){
		var s = star[i];
		if( s.x - scr.x / 12 < 0 || s.x - scr.x / 12 > 720 || s.y - scr.y / 12 < 0 || s.y - scr.y / 12 > 480 ) continue;
		context.fillStyle = "rgb(255,255,255)";
		context.beginPath();
		context.arc( s.x - scr.x / 12, s.y - scr.y / 12, s.scale+Math.random()*0.3, 0, Math.PI*2, false );
		context.closePath();
		context.fill();
	}
	
	/* 달 */
	context.drawImage( img.moon, 0, 0, 96, 96, 600 - 48 - scr.x / 10, 180 - 48 - scr.y / 10, 96, 96 );
	
	/* 건물 */
	context.drawImage( img.building, scr.x * ( 3720 / ( 30*(scr.width+1)*24 ) ), 0, 720, 480, 0, 300 - scr.y * 0.15, 720, 480 );
};