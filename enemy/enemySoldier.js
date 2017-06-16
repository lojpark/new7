function initEnemy_Soldier( e ){
	e.hp = 15;
	e.spd = 2;
	e.reloadTime = 30;
	e.width = 32;
	e.height = 48;
	e.armType = Math.floor( Math.random()*6 ) + 1;
	e.armType *= 10;
	e.armType += 2;
	if( e.armType == 42 ) e.spd = 3;
	if( e.armType == 22 || e.armType == 52 ) e.armType = 11;
	if( e.armType == 62 ){ e.spd = 3; }
};

function moveEnemy_Soldier( enemy, i, player, bullet, map, particle ){
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
		
		if( e.y >= player.y ){
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

		/* 플레이어보다 너무 위에 있으면 길 찾기 */
		if( e.y < player.y-150 ){
			if( Math.abs( e.x - e.destX ) < 10 ){
				e.destX = player.x + Math.random()*800-400;
			}
		}
		/* 플레이어보다 너무 아래에 있으면 점프 길 찾기 */
		else if( e.y > player.y+150 ){
			if( !e.isJump && e.armType != 32 ){
				e.vy = -10;
				e.isJump = true;
			}
			if( Math.abs( e.x - e.destX ) < 10 ){
				e.destX = player.x + Math.random()*800-400;
			}
		}
		else{
			/* 플레이어 근처로 이동 */
			if( myMath.dist( player.x, player.y, e.destX, e.destY ) > 150 ){
				if( e.x < player.x ) e.destX = player.x - Math.random()*150;
				if( e.x > player.x ) e.destX = player.x + Math.random()*150;
				e.destY = player.y;
			}
		}
		
		/* 재장전 */
		if( e.reloadTime <= 0 ){
			e.loadedBullet = bullet[0].reloadBullet[ e.armType ];
			e.reloadTime = 50;
		}
		
		e.reloadTime--;
		e.fireRate--;
	
		/* 발사 각도 지정 */
		e.fireAngle = Math.atan2( player.y - e.y, player.x - e.x ) * 180 / 3.14;
		/* 저격중이면 */
		if( Math.floor( e.armType / 10 ) == 3 ){
			var minv = 65536, mina = 0;
			var dist = myMath.dist( e.x, e.y, player.x, player.y );
			/* 360도 돌리면서 가장 조준점에 잘 맞는 각도를 찾는다 */
			for( k = 0; k < 360; k += 0.5 ){
				var tx = e.x + dist * Math.cos( ( k + 10 * Math.sin( dist/100 ) ) * 3.14 / 180 );
				var ty = e.y + dist * Math.sin( ( k + 10 * Math.sin( dist/100 ) ) * 3.14 / 180 );
				var tv = myMath.dist( tx, ty, player.x, player.y );
				if( minv > tv ){
					minv = tv;
					mina = k;
				}
			}
			/* 발사 각도 재지정 */
			e.fireAngle = mina;
		}
		
		/* 위 사격 모션 */
		if( -90 < e.fireAngle && e.fireAngle <= 0 ){
			e.dir = 1;
			e.motionUp = Math.floor( ( -1 * e.fireAngle ) / 22.5 );
			e.motionDown = 0;
		}
		if( -180 < e.fireAngle && e.fireAngle <= -90 ){
			e.dir = 0;
			e.motionUp = 3 - Math.floor( ( -1 * e.fireAngle - 90 ) / 22.5 );
			e.motionDown = 0;
		}
		/* 아래 사격 모션 */
		if( 90 <= e.fireAngle && e.fireAngle <= 181 ){
			e.dir = 0;
			e.motionUp = 0;
			e.motionDown = 3 - Math.floor( ( e.fireAngle - 90 ) / 22.5 );
			if( e.motionDown < 0 ) e.motionDown = 0;
		}
		if( 0 < e.fireAngle && e.fireAngle < 90 ){
			e.dir = 1;
			e.motionUp = 0;
			e.motionDown = Math.floor( e.fireAngle / 22.5 );
		}
	
		/* 장전된 총알을 연사 속도에 따라 발사 */
		if( e.loadedBullet > 0 && e.fireRate <= 0 ){
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
					for( k = 1; k <= 20; k++ ){
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

function printEnemy_SoldierArm( e, x, y, mRun, mUp, mDown, img, context ){
	/* 캔버스 저장 */
	context.save();
	
	/* 출력용 임시 변수 생성 */
	var w = 100;
	var h = 20;
	var angle = 0;
	
	y += 20;
	
	/* 달리기 모션 */
	if( mRun % 2 == 1 ) y++;
	if( mRun == 2 || mRun == 6 ) y += 2;
	
	/* 위로 쏘는 모션 */
	if( mUp == 1 ){
		x += 1;
		y -= 2;
		angle = -10;
	}
	if( mUp == 2 ){
		x += 1;
		y -= 3;
		angle = -24;
	}
	if( mUp == 3 ){
		x += 1;
		y -= 3;
		angle = -75;
	}
	/* 아래로 쏘는 모션 */
	if( mDown == 1 ){
		x += 1;
		y += 1;
		angle = 15;
	}
	if( mDown == 2 ){
		y += 2;
		angle = 45;
	}
	if( mDown == 3 ){
		x -= 1;
		y += 2;
		angle = 75;
	}
	
	/* 이미지 회전 */
	rotateContext( x + 16, y + 6, angle, context );
	
	/* 이미지 출력 */
	context.drawImage( img.gun, w * ( e.armType%10 - 1 ), h * Math.floor( e.armType/10 ), w, h, x, y, w/2, h/2 );
	
	/* 캔버스 복구 */
	context.restore();
};

function printEnemy_Soldier( e, scr, img, context ){
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