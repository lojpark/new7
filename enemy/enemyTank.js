function initEnemy_Tank( e ){
	e.hp = 400;
	e.spd = 3;
	e.reloadTime = 30;
	e.width = 170;
	e.height = 80;
	e.state = 0;
	e.gun = new Object();
	e.gun.x = 0;
	e.gun.y = 0;
	e.gun.vx = 0;
	e.gun.vy = 0;
	e.destAngle = 0;
	e.destDir = 0;
	e.isMad = true;
};

function moveEnemy_Tank( enemy, i, player, bullet, map, particle ){
	var k;
	
	var e = enemy[i];
	
	e.isRun = false;
	
	/* 이동 */
	if( e.x > e.destX ){
		e.vx -= 0.1;
		if( e.vx < e.spd * -1 ) e.vx = e.spd * -1;
		e.isRun = true;
	}
	if( e.x < e.destX ){
		e.vx += 0.1;
		if( e.vx > e.spd ) e.vx = e.spd;
		e.isRun = true;
	}
	e.x += e.vx;
	
	/* 이동 목적지 지정 */
	if( Math.abs( e.x - e.destX ) < 10 ){
		if( Math.random()*3 < 1 ){
			if( e.x < player.x ) e.destX = player.x - Math.random()*50;
			if( e.x > player.x ) e.destX = player.x + Math.random()*50;
		}
		else{
			if( e.x < player.x ) e.destX = e.destX - 200 - Math.random()*150;
			if( e.x > player.x ) e.destX = e.destX + 200 + Math.random()*150;
		}
		e.destY = player.y;
	}
	
	if( myMath.dist( player.x, player.y, e.x, e.y ) > 300 ){
		if( e.state != 0 ){
			e.reloadTime = 50;
			e.loadedBullet = 0;
			e.state = 0;
		}
	}
	else{
		if( e.state == 0 ){
			e.reloadTime = 30;
			e.loadedBullet = 0;
			if( Math.random()*2 <= 1 ) e.state = 1;
			else e.state = 2;
		}
	}
		
	e.reloadTime--;
	e.fireRate--;
	
	/* 포 이동 목적지를 따라 포 이동 */
	if( e.gun.x == 0 && e.gun.y == 0 && e.destDir == 1 && e.motionDown == 0 ){
		if( e.dir == 0 ){
			e.motionUp += 0.5;
			if( e.motionUp >= 4 ){
				e.motionUp = 4;
				e.dir = 1;
			}
		}
		else{
			if( e.motionUp < e.destAngle ) e.motionUp += 0.5;
			if( e.motionUp > e.destAngle ) e.motionUp -= 0.5;
		}
	}
	else if( e.gun.x == 0 && e.gun.y == 0 && e.destDir == 0 && e.motionDown == 0 ){
		if( e.dir == 1 ){
			e.motionUp += 0.5;
			if( e.motionUp >= 4 ){
				e.motionUp = 4;
				e.dir = 0;
			}
		}
		else{
			if( e.motionUp < e.destAngle ) e.motionUp += 0.5;
			if( e.motionUp > e.destAngle ) e.motionUp -= 0.5;
		}
	}
	
	/* 포 반동 */
	if( e.gun.x < 0 ) e.gun.x += 0.5;
	if( e.gun.x > 0 ) e.gun.x -= 0.5;
	if( e.gun.y < 0 ) e.gun.y += 0.5;
	if( e.gun.y > 0 ) e.gun.y -= 0.5;
	
	if( e.state == 0 ){
		/* 재장전 */
		if( e.reloadTime <= 0 ){
			e.loadedBullet = bullet[0].reloadBullet[ 61 ];
			e.reloadTime = 140;
		}
		
		/* 발사 각도 지정 */
		e.fireAngle = Math.atan2( player.y - e.y, player.x - e.x ) * 180 / 3.14;
		
		/* 포 이동 목적지 설정 */
		if( -90 < e.fireAngle && e.fireAngle <= 0 ){
			e.destAngle = Math.floor( ( -1 * e.fireAngle ) / 18 );
			e.destDir = 1;
		}
		else if( -180 < e.fireAngle && e.fireAngle <= -90 ){
			e.destAngle = 4 - Math.floor( ( -1 * e.fireAngle - 90 ) / 18 );
			e.destDir = 0;
		}
		else{
			e.destAngle = 0;
			if( e.x < player.x ) e.destDir = 1;
			else e.destDir = 0;
		}
	
		/* 뚜껑 닫는 모션 */
		e.motionDown -= 0.5;
		if( e.motionDown <= 0 ) e.motionDown = 0;
		
		/* 장전된 총알을 연사 속도에 따라 발사 */
		if( e.loadedBullet > 0 && e.fireRate <= 0 && e.dir == e.destDir && e.destAngle == e.motionUp ){
			/* 연사 속도 지정 */
			e.fireRate = bullet[0].fireRate[ 54 ];
			/* 장전된 총알 수 감소 */
			e.loadedBullet--;
			
			/* 포 끝 위치 지정 */
			var tmpx = 0, tmpy = 0;
			if( e.motionUp == 0 ){ tmpx = 134; tmpy = 28; e.gun.x += 10; }
			if( e.motionUp == 1 ){ tmpx = 106; tmpy = 80; e.gun.x += 7; e.gun.y += 3; }
			if( e.motionUp == 2 ){ tmpx = 78; tmpy = 110; e.gun.x += 5; e.gun.y += 5; }
			if( e.motionUp == 3 ){ tmpx = 50; tmpy = 126; e.gun.x += 3; e.gun.y += 7; }
			if( e.motionUp == 4 ){ tmpx = 0; tmpy = 135; e.gun.y += 10; }
			if( e.dir == 1 ){ tmpx *= -1; e.gun.x *= -1; }

			/* 발사 */
			newBullet( bullet, e.x - tmpx, e.y - tmpy, Math.atan2( player.y - (e.y-tmpy), player.x - (e.x-tmpx) ) * 180 / 3.14, 54 );
			newParticle_Smoke1( particle, e.x - tmpx, e.y - tmpy, 10, 10, 10 );
		}
	}
	/* 사람 등장 */
	else if( e.state == 1 ){
		/* 재장전 */
		if( e.reloadTime <= 0 ){
			e.loadedBullet = 3;
			e.reloadTime = 30;
		}
		
		/* 뚜껑 여는 모션 */
		if( e.motionUp == 0 ){
			e.motionDown += 0.5;
			if( e.motionDown >= 3 ) e.motionDown = 3;
		}
		
		/* 포 이동 목적지 설정 */
		e.destAngle = 0;
		if( e.x < player.x ) e.destDir = 1;
		else e.destDir = 0;
		
		/* 장전된 총알을 연사 속도에 따라 발사 */
		if( e.loadedBullet > 0 && e.fireRate <= 0 && e.motionUp == 0 && e.motionDown == 3 ){
			/* 연사 속도 지정 */
			e.fireRate = bullet[0].fireRate[ 11 ];
			/* 장전된 총알 수 감소 */
			e.loadedBullet--;
			
			newBullet( bullet, e.x, e.y - 28, Math.atan2( player.y - (e.y-28), player.x - e.x ) * 180 / 3.14, 11 );
		}
	}
	/* 기관총 등장 */
	else if( e.state == 2 ){
		/* 재장전 */
		if( e.reloadTime <= 0 ){
			e.loadedBullet = 5;
			e.reloadTime = 10;
		}
		
		/* 뚜껑 여는 모션 */
		if( e.motionUp == 0 ){
			e.motionDown += 0.5;
			if( e.motionDown >= 3 ) e.motionDown = 3;
		}
		
		/* 포 이동 목적지 설정 */
		e.destAngle = 0;
		if( e.x < player.x ) e.destDir = 1;
		else e.destDir = 0;
		
		/* 장전된 총알을 연사 속도에 따라 발사 */
		if( e.loadedBullet > 0 && e.fireRate <= 0 && e.motionUp == 0 && e.motionDown == 3 ){
			/* 연사 속도 지정 */
			e.fireRate = 2;//bullet[0].fireRate[ 22 ];
			e.fireAngle += 17;
			/* 장전된 총알 수 감소 */
			e.loadedBullet--;
			
			newBullet( bullet, e.x, e.y - 28, e.fireAngle, 22 );
			newBullet( bullet, e.x, e.y - 28, e.fireAngle, 22 );
			bullet[ bullet[0].n ].rad += 22;
			newBullet( bullet, e.x, e.y - 28, e.fireAngle, 22 );
			bullet[ bullet[0].n ].rad += 44;
			newBullet( bullet, e.x, e.y - 28, e.fireAngle, 22 );
			bullet[ bullet[0].n ].rad += 66;
		}
	}
	
	/* 달리는 모션 */
	if( e.isRun ){
		e.motionRun += 0.5;
		if( e.motionRun >= 2 ) e.motionRun = 0;
	}
	else{
		e.motionRun = 0;
	}
};

function printEnemy_Tank( e, scr, img, context ){
	/* 출력용 임시 변수 생성 */
	var bW = 178, tW = 267;
	var bH = 65, tH = 133;
	var bX = Math.round( e.x - bW/2 - scr.x );
	var bY = Math.round( e.y - bH/2 - scr.y );
	var tX = Math.round( e.x - tW/2 - scr.x ) + e.gun.x;
	var tY = Math.round( e.y - 137 - scr.y ) + e.gun.y;
	var mRun = Math.floor( e.motionRun );
	var mUp = Math.floor( e.motionUp );
	var mDown = Math.floor( e.motionDown );
	
	if( bX < -220 || bX > 780 || bY < -50 || bY > 530 ) return;

	/* 캔버스 저장 */
	context.save();

	/* 왼쪽 방향이면 캔버스 반전 */
	if( e.dir == 0 ){
		context.scale( -1, 1 );
		bX *= -1;
		bX -= bW;
		tX *= -1;
		tX -= tW;
	}
	
	/* 이미지 출력 */
	/* 밑 몸체 */
	context.drawImage( img.enemy[ e.type ].bottom, mRun * bW, 0, bW, bH, bX, bY, bW, bH );
	/* 윗 몸체 */
	context.drawImage( img.enemy[ e.type ].top, mUp * tW, 0, tW, tH, tX, tY, tW, tH );
	/* 뚜껑 */
	if( mUp == 0 ) context.drawImage( img.enemy[ e.type ].top, mDown * tW, tH, tW, tH, tX, tY, tW, tH );
	
	/* 캔버스 복구 */
	context.restore();
};