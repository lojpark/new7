$(document).ready(function(){
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();

	var key = new Object();
	var player = new Object();
	var enemy = new Array();
	var bullet = new Array();
	var items = new Array();
	var particle = new Array();
	var star = new Array();
	var scr = new Object();
	var map = new Array();
	var dbmap = new Array();
	
	var img = new Object();
	img.player = new Image();
	img.player.src = "image/player.png";
	img.snipe = new Image();
	img.snipe.src = "image/snipe.png";
	img.enemy = new Array();
	img.tile = new Image();
	img.tile.src = "image/tile.png";
	
	document.onkeydown = function(e){
		var press_key = e || window.event;
		switch (press_key.keyCode) {
			case 16: key.shift = true; break;
			case 38: key.up = true; break;
			case 40: key.down = true; break;
			case 37: key.left = true; break;
			case 39: key.right = true; break;
			case 88:
				key.x = true;
				break;
			case 90:
				/* 아이템 먹기 */
				if( iPI( player, items ) == 1 ) break;
				
				/* 총 쏘기 */
				if( !key.z ){//&& !player.isSlide ){
					/* 저격 총 */
					if( Math.floor( player.armType / 10 ) == 3 ){
						/* 앉아 있으면 */
						if( player.isSit && !player.isSlide ){
							/* 저격 */
							if( !player.isSnipe ){
								player.sx = player.x;
								player.sy = player.y;
								player.svx = player.svy = 0;
								player.isSnipe = true;
							}
							/* 발사 */
							else{
								if( player.fireRate <= 0 ) player.loadedBullet = 1;
							}
						}
						/* 서 있으면 그냥 발사 */
						else{
							if( player.fireRate <= 0 ) player.loadedBullet = 1;
						}
					}
					/* 단발 총 */
					else if( bullet[0].reloadBullet[ player.armType ] == 1 ){
						if( player.fireRate <= 0 ) player.loadedBullet = 1;
					}
					/* 일반 총 */
					else{
						player.loadedBullet = bullet[0].reloadBullet[ player.armType ];
					}
				}
									
				key.z = true;
				break;
		}
	};
	document.onkeyup = function(e){
		var press_key = e || window.event;
		switch (press_key.keyCode) {
			case 16: key.shift = false; break;
			case 38: key.up = false; break;
			case 40: key.down = false; break;
			case 37: key.left = false; break;
			case 39: key.right = false; break;
			case 65:
				if( player.motionChangeArmType != 3 ){
					changeArm( player, 0 );
				}
				break;
			case 83:
				if( player.motionChangeArmType != 3 ){
					changeArm( player, 1 );
				}
				break;
			case 88:
				if( player.motionChangeArmType == 0 ){
					dropArm( player, items );
				}
				break;
			case 90: key.z = false; break;
			case 49:
				if( player.armType == 11 ) player.armType = 12;
				else if( player.armType == 12 ) player.armType = 13;
				else player.armType = 11;
				break;
			case 50:
				if( player.armType == 21 ) player.armType = 22;
				else if( player.armType == 22 ) player.armType = 23;
				else player.armType = 21;
				break;
			case 51:
				if( player.armType == 31 ) player.armType = 32;
				else if( player.armType == 32 ) player.armType = 33;
				else player.armType = 31;
				break;
			case 52:
				if( player.armType == 41 ) player.armType = 42;
				else if( player.armType == 42 ) player.armType = 43;
				else player.armType = 41;
				break;
			case 53:
				if( player.armType == 51 ) player.armType = 52;
				else if( player.armType == 52 ) player.armType = 53;
				else player.armType = 51;
				break;
			case 54:
				if( player.armType == 61 ) player.armType = 62;
				else if( player.armType == 62 ) player.armType = 63;
				else player.armType = 61;
				break;
			case 55:
				if( player.armType == 71 ) player.armType = 72;
				else if( player.armType == 72 ) player.armType = 73;
				else player.armType = 71;
				break;
			case 56:
				if( player.armType == 81 ) player.armType = 82;
				else if( player.armType == 82 ) player.armType = 83;
				else player.armType = 81;
				break;
			case 66:
				newEnemy( enemy, 3240, 1100, 101 );
				break;
			case 84:
				newEnemy( enemy, 3240, 2337, 102 );
				//for( var k = 1; k <= enemy[0].n; k++ ) enemy[k].isMad = true;
				break;
		}
	};
	
	function init(){
		context.fillStyle = "rgb(255,255,255)";
		key.up = key.down = key.left = key.right = key.shift = key.x = key.z = false;

		initItem( items, img );
		initEnemy( enemy, img );
		initMap( dbmap );
		makeMap( map, dbmap, enemy );
		initPlayer( player );
		initScreen( scr, map );
		initBullet( bullet );
		initParticle( particle );
		initBackground( star, img );
		
		animate();
	}

	function animate(){
		context.clearRect( 0, 0, canvasWidth, canvasHeight );
		
		movePlayer( player, key, map, bullet, particle );
		moveEnemy( enemy, player, bullet, map, particle );
		moveItem( items, particle );
		moveBullet( bullet, player, enemy, map, particle );
		moveParticle( particle );
		moveScreen( scr, player );

		iBP( bullet, player, enemy, particle );		
		iBE( bullet, enemy, player, items, particle );
		
		printBackground( star, scr, img, context );
		printMap( map, scr, img, context );
		printPlayer( player, scr, img, context );
		printEnemy( enemy, scr, img, context );
		printParticle( particle, scr, img, context );
		printItem( items, scr, img, context );
		printBullet( bullet, scr, img, context );
		printPlayerInfo( player, scr, img, context );
	
	/*
		context.font = "14px helvetica";
		context.fillText( player.x, 360, 340 );
		context.fillText( player.y, 360, 360 );
		context.fillText( Math.floor( (player.x+32) / 30 ), 400, 340 );
		context.fillText( Math.floor( (player.y+24) / 30 ), 400, 360 );
		context.fillText( scr.x, 440, 340 );
		context.fillText( scr.y, 440, 360 );
		*/
		
		setTimeout( animate, 33 );
	};
	
	init();
});