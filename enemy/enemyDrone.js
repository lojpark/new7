function initEnemy_Drone( e ){
	e.hp = 15;
	e.spd = 2;
	e.reloadTime = 30;
	e.width = 40;
	e.height = 35;
	e.armType = 11;
};

function moveEnemy_Drone( enemy, i, player, bullet, map, particle ){
	var k;
	
	var e = enemy[i];
	
	/* 이동 */
	if( e.x > e.destX ){
		e.x -= e.spd;
	}
	if( e.x < e.destX ){
		e.x += e.spd;
	}
	if( e.y > e.destY ){
		e.y -= e.spd;
	}
	if( e.y < e.destY ){
		e.y += e.spd;
	}
	
	/* 방어력 계산 */
	if( e.motionUp == 0 ) e.def = 0.2;
	else e.def = 1.2;
	
	/* 밀려남 */
	e.x += e.vx;
	if( e.vx > 0 ) e.vx -= 1;
	if( e.vx < 0 ) e.vx += 1;
	e.y += e.vy;
	if( e.vy > 0 ) e.vy -= 1;
	if( e.vy < 0 ) e.vy += 1;
	
	/* 화났다 */
	if( e.isMad ){
		var x = Math.floor( (e.x+32) / 30 );
		var lx = Math.floor( (e.x+20) / 30 );
		var rx = Math.floor( (e.x+40) / 30 );
		var y = Math.floor( (e.y-25) / 30 );
		
		/* 천장에 닿을 때 */
		if( ( map[ y+1 ][ x ] == 1 || map[ y+1 ][ lx ] == 1 || map[ y+1 ][ rx ] == 1 ) && e.y > e.destY ){
			e.y = y*30 + 55;
		}
		
		y = Math.floor( (e.y+17) / 30 );
		/* 바닥에 닿을 때 ( 바로 밑에 땅이 있다 && 내려가고 있다 && 바닥을 통과하지 않았다 )*/
		if( ( map[ y+1 ][ x ] == 1 || map[ y+1 ][ lx ] == 1 || map[ y+1 ][ rx ] == 1 ) && e.y < e.destY && e.y - e.spd <= y*30 - 17 ){
			e.y = y*30 - 17;
		}
		
		x = Math.floor( (e.x+16) / 30 );
		y = Math.floor( (e.y+40) / 30 );
		/* 벽에 닿을 때 */
		if( map[ y ][ x ] == 1 || map[ y - 1 ][ x ] == 1 ){
			e.x = x*30 + 15;
		}
		else if( map[ y ][ x + 1 ] == 1 || map[ y - 1 ][ x + 1 ] == 1 ){
			e.x = x*30 - 16;
		}
		
		/* 플레이어 근처로 이동 */
		if( myMath.dist( player.x, player.y, e.destX, e.destY ) > 150 ){
			if( e.x < player.x ) e.destX = player.x - Math.random()*150;
			if( e.x > player.x ) e.destX = player.x + Math.random()*150;
			if( e.y < player.y ) e.destY = player.y - Math.random()*150;
			if( e.y > player.y ) e.destY = player.y + Math.random()*150;
		}
		
		/* 재장전 */
		if( e.reloadTime <= 0 ){
			e.loadedBullet = bullet[0].reloadBullet[ e.armType ];
			e.reloadTime = 40;
		}
		
		e.reloadTime--;
		e.fireRate--;
	
		/* 발사 각도 지정 */
		e.fireAngle = Math.atan2( player.y - e.y, player.x - e.x ) * 180 / 3.14;
	
		/* 장전된 총알을 연사 속도에 따라 발사 */
		if( e.loadedBullet > 0 && e.fireRate <= 0 && myMath.dist( e.x, e.y, player.x, player.y ) <= 200 ){
			/* 반동 및 연사 속도 지정 */
			e.fireRate = bullet[0].fireRate[ e.armType ];
			/* 장전된 총알 수 감소 */
			e.loadedBullet--;
			/* 발사각에 아군이 있으면 사격 중지 */
			for( k = 1; k <= enemy[0].n; k++ ){
				if( k == i ) continue;
				var e2 = enemy[k];
				if( myMath.dist( e.x, e.y, player.x, player.y ) < myMath.dist( e.x, e.y, e2.x, e2.y ) ) continue;
				var angle = Math.atan2( e2.y - e.y, e2.x - e.x ) * 180 / 3.14;
				if( Math.abs( angle - e.fireAngle ) <= 30 ){
					k = -1;
					break;
				}
			}
			if( k != -1 ){
				/* 산탄 총 */
				if( Math.floor( e.armType / 10 ) == 4 ){
					for( k = 1; k <= 30; k++ ){
						newBullet( bullet, e.x, e.y, e.fireAngle + Math.random()*30-15, e.armType );
					}
				}
				/* 일반 총 */
				else{
					newBullet( bullet, e.x, e.y, e.fireAngle, e.armType );
				}
				/* 발사 파티클 생성 */
				newParticle_Cartridge( particle, e, 4.0, 14, 12 );
			}
		}
		
		/* 총 꺼내기 모션 */
		if( myMath.dist( e.x, e.y, player.x, player.y ) <= 250 ){
			if( e.motionUp < 4 ){
				e.motionUp += 0.5;
				e.reloadTime = 40;
				e.loadedBullet = 0;
			}
			if( e.motionUp >= 4 ){
				e.motionUp = 4;
			}
		}
		/* 총 넣기 모션 */
		else{
			e.motionUp -= 0.5;
			if( e.motionUp < 0 ){
				e.motionUp = 0;
			}
		}
	}
	
	/* 날개 모션 */
	e.motionRun += 0.33;
	if( e.motionRun > 2 ) e.motionRun = 0;
	
	/* 둥실둥실 모션 */
	e.motionDown += 0.1;
	if( e.motionDown > 6.28 ) e.motionDown = 0;
};

function printEnemy_Drone( e, scr, img, context ){
	/* 출력용 임시 변수 생성 */
	var w = e.width;
	var h = e.height;
	var x = Math.round( e.x - w/2 - scr.x );
	var y = Math.round( e.y - h/2 - scr.y ) + 3*Math.sin( e.motionDown );
	var mRun = Math.floor( e.motionRun );
	var mUp = Math.floor( e.motionUp );
	
	if( x < -30 || x > 750 || y < -50 || y > 530 ) return;

	/* 캔버스 저장 */
	context.save();
	
	/* 이미지 출력 */
	context.drawImage( img.enemy[ e.type ], mUp * w, mRun * h, w, h, x, y, w, h );
	
	/* 캔버스 복구 */
	context.restore();
};