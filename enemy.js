function initEnemy( enemy, img ){
	enemy[0] = new Object();
	
	enemy[0].n = 0;
	
	img.enemy[1] = new Image();
	img.enemy[1].src = "image/enemyCivilian.png";
	img.enemy[2] = new Image();
	img.enemy[2].src = "image/enemySoldier.png";
	img.enemy[3] = new Image();
	img.enemy[3].src = "image/enemyDrone.png";
	
	img.enemy[101] = new Image();
	img.enemy[101].src = "image/enemyHelicopter.png";
	img.enemy[102] = new Object();
	img.enemy[102].top = new Image();
	img.enemy[102].top.src = "image/enemyTank_Top.png";
	img.enemy[102].bottom = new Image();
	img.enemy[102].bottom.src = "image/enemyTank_Bottom.png";
};

function newEnemy( enemy, x, y, type ){
	enemy[0].n++;
	enemy[ enemy[0].n ] = new Object();
	
	var e = enemy[ enemy[0].n ];
	
	e.destX = e.x = x;
	e.destY = e.y = y;
	e.vx = e.vy = 0;
	e.dir = 1;
	e.def = 1.0;
	e.restTime = 0;
	e.burnTime = 0;
	e.fireRate = 0;
	e.fireAngle = 0;
	e.loadedBullet = 0;
	e.isRun = false;
	e.isJump = false;
	e.isMad = false;
	e.isBurn = false;
	e.isDie = false;
	e.dieTime = 0;
	e.motionRun = 0;
	e.motionUp = 0;
	e.motionDown = 0;
	e.type = type;
	
	e.meter = new Object();
	e.meter.y = 0;
	e.meter.alpha = 0.0;
	e.meter.nowValue = 0;
	e.meter.nextValue = 0;
	e.meter.time = 0;
	
	switch( e.type ){
		case 1:
			initEnemy_Civilian( e );
			break;
		case 2:
			initEnemy_Soldier( e );
			break;
		case 3:
			initEnemy_Drone( e );
			break;
		case 101:
			initEnemy_Helicopter( e );
			break;
		case 102:
			initEnemy_Tank( e );
			break;
	}
};

function delEnemy( enemy, i ){
	var j;
	for( j = i; j <= enemy[0].n; j++ ){
		enemy[j] = enemy[j+1];
		enemy[j+1] = null;
	}
	enemy[0].n--;
};

function gravityEnemy( e, map ){
	var fy = Math.floor( (e.y+24) / 30 );
	/* 1의 속도로 중력 가속 */
	if( e.vy < 0 ) e.vy += 0.5;
	if( e.vy < 20 ) e.vy += 0.2;
	/* y위치에 속력을 더한다. */
	e.y += e.vy;
	
	var x = Math.floor( (e.x+32) / 30 );
	var lx = Math.floor( (e.x+20) / 30 );
	var rx = Math.floor( (e.x+40) / 30 );
	var y = Math.floor( (e.y-24) / 30 );
	
	/* 천장에 닿을 때 */
	if( ( map[ y+1 ][ x ] == 1 || map[ y+1 ][ lx ] == 1 || map[ y+1 ][ rx ] == 1 ) && e.vy < 0 ){
		e.y = y*30 + 48;
		e.vy = 0;
		return;
	}
	
	y = Math.floor( (e.y+24) / 30 );
	/* 바닥에 닿을 때 ( 바로 밑에 땅이 있다 && 떨어지고 있다 && 바닥을 통과하지 않았다 )*/
	if( ( map[ y+1 ][ x ] != 0 || map[ y+1 ][ lx ] != 0 || map[ y+1 ][ rx ] != 0 ) && e.vy > 0 && e.y - e.vy <= y*30 - 24 ){
		e.y = y*30 - 24;
		e.vy = 0;
		e.isJump = false;
	}
};

function moveEnemy( enemy, player, bullet, map, particle ){
	var i, k;
	for( i = 1; i <= enemy[0].n; i++ ){
		var e = enemy[i];
		
		if( e.hp <= 0 ) e.isDie = true;
		
		/* 죽은 적 처리 */
		if( e.isDie ){
			e.dieTime++;
			
			/* 탱크 폭발 */
			if( e.type >= 100 ){
				/* 폭발 파티클 */
				newParticle_Explosion( particle, e.x + Math.random()*100-50, e.y + Math.random()*50-25, 30, 10, 2 );
				if( e.dieTime >= 50 ){
					newParticle_Explosion( particle, e.x + Math.random()*100-50, e.y + Math.random()*50-25, 30, 10, 10 );
					newParticle_Smoke1( particle, e.x, e.y, 30, 50, 20 );
					delEnemy( enemy, i );
					continue;
				}
			}
			/* 일반 적 */
			else{
				if( e.dieTime <= 1 ){
					/* 폭발 파티클 */
					newParticle_Explosion( particle, e.x, e.y, 10, 10, 5 )
					newParticle_Smoke1( particle, e.x, e.y, 10, 20, 5 );
					/* 출혈 파티클 */
					if( e.type == 3 || e.type == 101 ) newParticle_Blood( particle, e.x, e.y, 444, 2.0, 30, 14 );
					else newParticle_Blood( particle, e.x, e.y, 444, 2.0, 30, 12 );
				}
				/* 데미지 미터가 사라지면 소멸 */
				if( e.meter.time == 0 && e.meter.alpha <= 0 ){
					delEnemy( enemy, i );
					continue;
				}
			}
		}
		
		if( !e.isDie ){
			switch( e.type ){
				case 1:
					moveEnemy_Civilian( enemy, i, player, bullet, map, particle );
					break;
				case 2:
					moveEnemy_Soldier( enemy, i, player, bullet, map, particle );
					break;
				case 3:
					moveEnemy_Drone( enemy, i, player, bullet, map, particle );
					break;
				case 101:
					moveEnemy_Helicopter( enemy, i, player, bullet, map, particle );
					break;
				case 102:
					moveEnemy_Tank( enemy, i, player, bullet, map, particle );
					break;
			}
			
			/* 불 파티클 */
			if( e.isBurn ){
				newParticle_Fire2( particle, e.x, e.y, e.height, 25 );
				iDecreaseHp( e, 0.2 );
				e.burnTime++;
				if( e.burnTime >= 100 ){
					e.burnTime = 0;
					e.isBurn = false;
				}
			}
		}
		
		/* 딜 표시 */
		if( e.meter.time > 0 ){
			e.meter.time++;
			if( e.meter.time < 15 ){
				e.meter.alpha = 0.0;
			}
			else if( e.meter.time == 15 ){
				e.meter.nowValue = e.meter.nextValue;
				e.meter.nextValue = 0;
			}
			else if( e.meter.time <= 25 ){
				e.meter.y += 0.5;
				if( e.meter.alpha < 1 ) e.meter.alpha += 0.2;
			}
			if( e.meter.time > 35 ){
				e.meter.y += 2;
				e.meter.alpha -= 0.1;
				if( e.meter.alpha <= 0 ){
					e.meter.alpha = e.meter.time = e.meter.nowValue = e.meter.y = 0;
					if( e.meter.nextValue > 0 ) e.meter.time = 8;
				}
			}
		}
	}
};

function printEnemy( enemy, scr, img, context ){
	var i;
	for( i = 1; i <= enemy[0].n; i++ ){
		var e = enemy[i];
		
		if( !e.isDie || e.type >= 100 ){
			switch( e.type ){
				case 1:
					printEnemy_Civilian( e, scr, img, context );
					break;
				case 2:
					printEnemy_Soldier( e, scr, img, context );
					break;
				case 3:
					printEnemy_Drone( e, scr, img, context );
					break;
				case 101:
					printEnemy_Helicopter( e, scr, img, context );
					break;
				case 102:
					printEnemy_Tank( e, scr, img, context );
					break;
			}
		}
		
		if( myMath.floor( e.meter.nowValue, 0 ) > 0 && e.meter.alpha > 0.01 ){
			context.fillStyle = "rgba(255,0,0," + e.meter.alpha + ")";
			context.font = "14px helvetica";
			context.fillText( "- " + myMath.floor( e.meter.nowValue, 0 ), e.x - scr.x - 10, Math.floor( e.y - e.height/2 - e.meter.y - scr.y ) );
		}
	}
};