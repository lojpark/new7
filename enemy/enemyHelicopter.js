function initEnemy_Helicopter( e ){
	e.hp = 400;
	e.spd = 8;
	e.reloadTime = 30;
	e.width = 200;
	e.height = 110;
	e.state = 0;
	e.isMad = true;
};

function moveEnemy_Helicopter( enemy, i, player, bullet, map, particle ){
	var k;
	
	var e = enemy[i];
	
	if( e.state == 2 ) e.spd = 15;
	else e.spd = 8;
	
	/* 정지 */
	if( Math.abs( e.x - e.destX ) < 30 ){
		if( e.vx > 0 ) e.vx -= 0.3;
		if( e.vx < 0 ) e.vx += 0.3;
		if( Math.abs( e.vx ) < 0.3 ) e.vx = 0;
	}
	/* 이동 */
	else{
		if( e.x > e.destX ){
			e.vx -= 0.5;
			if( e.vx < e.spd * -1 ) e.vx = e.spd * -1;
		}
		if( e.x < e.destX ){
			e.vx += 0.5;
			if( e.vx > e.spd ) e.vx = e.spd;
		}
	}
	/* 정지 */
	if( Math.abs( e.y - e.destY ) < 30 ){
		if( e.vy > 0 ) e.vy -= 0.3;
		if( e.vy < 0 ) e.vy += 0.3;
		if( Math.abs( e.vy ) < 0.3 ) e.vy = 0;
	}
	/* 이동 */
	else{
		if( e.y > e.destY ){
			e.vy -= 0.5;
			if( e.vy < e.spd * -1 ) e.vy = e.spd * -1;
		}
		if( e.y < e.destY ){
			e.vy += 0.5;
			if( e.vy > e.spd ) e.vy = e.spd;
		}
	}
	e.x += e.vx;
	e.y += e.vy;
	
	if( e.state != 2 ){
		if( e.x < player.x ) e.dir = 1;
		else e.dir = 0;
	}
	
	/* 이동 목적지 지정 */
	if( myMath.dist( e.x, e.y, e.destX, e.destY ) < 30 ){
		if( e.state == 1 ){
			e.state = 2;
			e.destY = e.y;
			if( e.x < player.x ) e.destX = player.x + 250;
			else e.destX = player.x - 250;
		}
		else{
			if( e.state == 2 ){
				e.state = 0;
				if( Math.random()*2 < 1 ){
					e.destX = player.x - 300;
					e.destY = player.y;
				}
				else{
					e.destX = player.x + 300;
					e.destY = player.y;
				}
			}
			else{
				e.state = 1;
				if( Math.random()*2 < 1 ){
					e.destX = player.x - 350;
					e.destY = player.y - 150;
				}
				else{
					e.destX = player.x + 350;
					e.destY = player.y - 150;
				}
			}
		}
	}
		
	e.reloadTime--;
	e.fireRate--;
	
	/* 미사일 */
	if( e.state == 0 ){
		/* 재장전 */
		if( e.reloadTime <= 0 ){
			e.loadedBullet = bullet[0].reloadBullet[ 61 ];
			e.reloadTime = 100;
		}
		
		/* 발사 각도 지정 */
		e.fireAngle = Math.atan2( player.y - e.y, player.x - e.x ) * 180 / 3.14;
		
		/* 장전된 총알을 연사 속도에 따라 발사 */
		if( e.loadedBullet > 0 && e.fireRate <= 0 && Math.abs( e.y - player.y ) < 30 && Math.abs( e.x - player.x ) > 150 ){
			/* 연사 속도 지정 */
			e.fireRate = bullet[0].fireRate[ 61 ];
			/* 장전된 총알 수 감소 */
			e.loadedBullet--;
			
			/* 발사 */
			newBullet( bullet, e.x + 10, e.y + 20, Math.atan2( player.y - (e.y + 20), player.x - (e.x + 10) ) * 180 / 3.14, 61 );
			newParticle_Smoke1( particle, e.x, e.y, 10, 10, 10 );
		}
	}
	/* 기관총 */
	if( e.state == 2 ){
		/* 재장전 */
		if( e.reloadTime <= 0 ){
			e.loadedBullet = 6;
			e.reloadTime = 30;
		}
		
		/* 발사 각도 지정 */
		e.fireAngle = Math.atan2( player.y - e.y, player.x - e.x ) * 180 / 3.14;
		
		/* 장전된 총알을 연사 속도에 따라 발사 */
		if( e.loadedBullet > 0 && e.fireRate <= 0 ){
			/* 연사 속도 지정 */
			e.fireRate = bullet[0].fireRate[ 22 ];
			/* 장전된 총알 수 감소 */
			e.loadedBullet--;
			
			var tmpx = 0, tmpy = 0, tmpa = 0;
			if( e.dir == 0 ){
				tmpx = -40;
				tmpy = 50;
				tmpa = 150;
			}
			else{
				tmpx = 40;
				tmpy = 50;
				tmpa = 30;
			}
			/* 발사 */
			newBullet( bullet, e.x + tmpx, e.y + tmpy, tmpa, 22 );
		}
	}
	
	/* 날개 모션 */
	e.motionRun += 0.5;
	if( e.motionRun >= 3 ) e.motionRun = 0;
};

function printEnemy_Helicopter( e, scr, img, context ){
	/* 출력용 임시 변수 생성 */
	var w = 218, h = 147;
	var x = Math.round( e.x - w/2 - scr.x );
	var y = Math.round( e.y - h/2 - scr.y );
	var mRun = Math.floor( e.motionRun );
	var mUp = Math.floor( e.motionUp );
	var mDown = Math.floor( e.motionDown );
	
	if( x < -1*w || x > 720+w || y < -1*h || y > 480+h ) return;

	/* 캔버스 저장 */
	context.save();

	/* 왼쪽 방향이면 캔버스 반전 */
	if( e.dir == 0 ){
		context.scale( -1, 1 );
		x *= -1;
		x -= w;
	}
	
	/* 이미지 출력 */
	context.drawImage( img.enemy[ e.type ], mRun * w, 0, w, h, x, y, w, h );
	
	/* 캔버스 복구 */
	context.restore();
};