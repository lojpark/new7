function initScreen( scr, map ){
	scr.x = 3240-360;
	scr.y = 1170-240;
	scr.dx = 3600;
	scr.dy = 2400;
	scr.width = map[0].width;
	scr.height = map[0].height;
};

function moveScreen( scr, player ){
	/* 스크린이 따라갈 목표 지정 */
	if( player.isSnipe ){
		scr.dx = player.sx;
		scr.dy = player.sy;
	}
	else{
		scr.dx = player.x;
		scr.dy = player.y;
	}
	
	/* 남은 거리에 비례해서 따라간다 */
	scr.x += (scr.dx - scr.x - 360) / 10;
	scr.y += (scr.dy - scr.y - 240) / 10;
	
	/* 거의 비슷하게 따라왔으면 그냥 설정 */
	if( Math.abs( scr.x + 360 - scr.dx ) + Math.abs( scr.y + 240 - scr.dy ) <= 1 ){
		scr.x = scr.dx - 360;
		scr.y = scr.dy - 240;
	}
	
	/* 테두리 */
	if( scr.x < 0 ) scr.x = 0;
	if( scr.y < 0 ) scr.y = 0;
	if( scr.x > 30*scr.width*24 - 720 ) scr.x = 30*scr.width*24 - 720;
	if( scr.y > 30*scr.height*16 - 480 ) scr.y = 30*scr.height*16 - 480;
	
	/* 소숫점 없애기 */
	scr.x = Math.round( scr.x );
	scr.y = Math.round( scr.y );
};