function initEnemy_Civilian( e ){
	e.hp = 6;
	e.spd = 2;
	e.width = 32;
	e.height = 48;
};

function moveEnemy_Civilian( enemy, i, player, bullet, map, particle ){
	var k;
	
	var e = enemy[i];
	
	gravityEnemy( e, map );
	
	e.isRun = false;
	
	/* 방향 전환 */
	if( e.x > e.destX ) e.dir = 0;
	if( e.x < e.destX ) e.dir = 1;
	/* 휴식 */
	if( e.restTime > 0 || ( e.armType == 32 && e.isMad ) ) e.restTime--;
	/* 이동 */
	else{
		if( e.x > e.destX ){
			e.x -= e.spd;
			e.dir = 0;
			e.isRun = true;
		}
		if( e.x < e.destX ){
			e.x += e.spd;
			e.dir = 1;
			e.isRun = true;
		}
	}
	
	/* 밀려남 */
	e.x += e.vx;
	if( e.vx > 0 ) e.vx -= 1;
	if( e.vx < 0 ) e.vx += 1;
	
	/* 평소 */
	if( !e.isMad ){
		var x = Math.floor( (e.x+32) / 30 );
		var y = Math.floor( (e.y+24) / 30 );
		if( map[ y+1 ][ x-1 ] == 0 ){
			e.x += e.spd;
			e.destX = e.destX + Math.random()*300;
		}
		else if( map[ y+1 ][ x+1 ] == 0 ){
			e.x -= e.spd;
			e.destX = e.destX - Math.random()*300;
		}
		
		x = Math.floor( (e.x+16) / 30 );
		y = Math.floor( (e.y+48) / 30 );
		/* 벽에 닿을 때 */
		if( map[ y ][ x ] == 1 || map[ y - 1 ][ x ] == 1 ){
			e.x = x*30 + 13;
			e.destX = e.destX + Math.random()*300;
		}
		else if( map[ y ][ x + 1 ] == 1 || map[ y - 1 ][ x + 1 ] == 1 ){
			e.x = x*30 - 15;
			e.destX = e.destX - Math.random()*300;
		}
		
		if( Math.abs( e.x - e.destX ) < 10 ){
			if( Math.random()*4 < 1 ) e.restTime = Math.floor( Math.random()*150 );
			else e.destX = e.destX + Math.random()*300-150;
		}
	}
	/* 화났다 */
	else{
		/* 휴식 중지 */
		e.restTime = 0;
		
		/* 걸음아 날 살려라 */
		e.spd = 4;
		
		if( e.y < player.y ){
			var x = Math.floor( (e.x+32) / 30 );
			var y = Math.floor( (e.y+24) / 30 );
			if( !e.isJump && ( map[ y+1 ][ x-1 ] == 0 || map[ y+1 ][ x+1 ] == 0 ) ){
				e.vy = -10;
				e.isJump = true;
			}
		}
		x = Math.floor( (e.x+16) / 30 );
		y = Math.floor( (e.y+48) / 30 );
		/* 벽에 닿을 때 */
		if( map[ y ][ x ] == 1 || map[ y - 1 ][ x ] == 1 ){
			e.x = x*30 + 13;
			if( !e.isJump ){
				e.vy = -10;
				e.isJump = true;
			}
		}
		else if( map[ y ][ x + 1 ] == 1 || map[ y - 1 ][ x + 1 ] == 1 ){
			e.x = x*30 - 15;
			if( !e.isJump ){
				e.vy = -10;
				e.isJump = true;
			}
		}

		/* 플레이어로부터 도망 */
		if( myMath.dist( player.x, player.y, e.x, e.y ) < 350 ){
			e.destX = e.x - ( player.x - e.x );
			e.destY = player.y;
		}
		else{
			if( Math.abs( e.x - e.destX ) < 10 ){
				e.destX = e.x + Math.random()*300 - 150;
			}
		}
	}
	
	/* 달리는 모션 */
	if( e.isRun ){
		e.motionRun += 0.3;
		if( e.motionRun >= 9 ) e.motionRun = 1;
	}
	else{
		e.motionRun = 0;
	}
};

function printEnemy_Civilian( e, scr, img, context ){
	/* 출력용 임시 변수 생성 */
	var w = e.width;
	var h = e.height;
	var x = e.x - w/2 - scr.x;
	var y = e.y - h/2 - scr.y;
	var mRun = Math.floor( e.motionRun );
	var mUp = Math.floor( e.motionUp );
	var mDown = Math.floor( e.motionDown );
	
	if( x < -30 || x > 750 || y < -50 || y > 530 ) return;

	/* 캔버스 저장 */
	context.save();

	/* 왼쪽 방향이면 캔버스 반전 */
	if( e.dir == 0 ){
		context.scale( -1, 1 );
		x *= -1;
		x -= 32;
	}
	
	/* 이미지 출력 */
	if( mDown == 0 ) context.drawImage( img.enemy[ e.type ], mRun * 32, mUp * 48, 32, 48, x, y, 32, 48 );
	else context.drawImage( img.enemy[ e.type ], mRun * 32, 3 * 48 + mDown * 48, 32, 48, x, y, 32, 48 );
	printEnemy_SoldierArm( e, x, y, mRun, mUp, mDown, img, context );
	
	/* 캔버스 복구 */
	context.restore();
};