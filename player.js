function initPlayer( player ){	
	player.x = 3240;
	player.y = 1170;
	player.vx = 0;
	player.vy = 0;
	player.dir = 1;
	player.isRun = false;
	player.isJump = false;
	player.isSit = false;
	player.isSlide = false;
	player.isStuck = false;
	player.isSnipe = false;
	player.sx = player.svx = 0;
	player.sy = player.svy = 0;
	player.motionRun = 0;
	player.motionUp = 0;
	player.motionDown = 0;
	player.fireRate = 0;
	player.fireAngle = 0;
	player.armType = 1;
	player.loadedBullet = 0;
	player.hp = 100;
	
	player.armn = 1;
	player.arms = new Array();
	player.arms[1] = 1;
	/*for( var i = 2; i <= player.armn; i++ ){
		player.arms[i] = ( Math.floor( Math.random()*8 ) + 1 ) * 10 + Math.floor( Math.random()*3 ) + 1;
	}*/
	player.motionChangeArm = 0;
	player.motionChangeArmType = 0;
};

function gravity( player, map ){
	var fy = Math.floor( (player.y+24) / 30 );
	/* 1의 속도로 중력 가속 */
	if( player.vy < 20 ) player.vy += 1;
	/* y위치에 속력을 더한다. */
	player.y += player.vy;
	
	var x = Math.floor( (player.x+32) / 30 );
	var lx = Math.floor( (player.x+20) / 30 );
	var rx = Math.floor( (player.x+40) / 30 );
	var y = Math.floor( (player.y-24) / 30 );
	
	/* 천장에 닿을 때 */
	if( ( map[ y+1 ][ x ] == 1 || map[ y+1 ][ lx ] == 1 || map[ y+1 ][ rx ] == 1 ) && player.vy < 0 ){
		player.y = y*30 + 48;
		player.vy = 0;
		return;
	}
	
	y = Math.floor( (player.y+24) / 30 );
	/* 바닥에 닿을 때 ( 바로 밑에 땅이 있다 && 떨어지고 있다 && 바닥을 통과하지 않았다 )*/
	if( ( map[ y+1 ][ x ] != 0 || map[ y+1 ][ lx ] != 0 || map[ y+1 ][ rx ] != 0 ) && player.vy > 0 && player.y - player.vy <= y*30 - 24 ){
		player.y = y*30 - 24;
		player.vy = 0;
		player.isJump = false;
	}
	else{
		player.isSit = false;
		player.isJump = true;
		if( player.isSlide ){
			player.vx *= 0.5;
			player.isSlide = false;
		}
	}
};

function movePlayer( player, key, map, bullet, particle ){
	var x = 0, y = 0;
	
	player.isRun = false;
	if( player.fireRate > 0 ) player.fireRate--;
	gravity( player, map );
	
	/* 저격 중 */
	if( player.isSnipe && player.loadedBullet <= 0 ){
		/* 속도 증가 */
		if( key.up && player.svy > -20 ) player.svy -= 1.5;
		if( key.down && player.svy < 20 ) player.svy += 1.5;
		if( key.left && player.svx > -20 ) player.svx -= 1.5;
		if( key.right && player.svx < 20 ) player.svx += 1.5;
		
		/* 마찰력 */
		if( player.svx < 0 ) player.svx += 0.5;
		if( player.svx > 0 ) player.svx -= 0.5;
		if( player.svy < 0 ) player.svy += 0.5;
		if( player.svy > 0 ) player.svy -= 0.5;
		
		/* 사정거리 이내 */
		if( myMath.dist( player.x, player.y, player.sx + player.svx, player.sy + player.svy ) < bullet[0].range[ player.armType ] ){
			player.sx += player.svx;
			player.sy += player.svy;
		}
		/* 사정거리 밖이면 원모양으로 회전 */
		else{
			player.sx += player.svx;
			player.sy += player.svy;
			var angle = Math.atan2( player.sy - player.y, player.sx - player.x );
			player.sx = player.x + bullet[0].range[ player.armType ] * Math.cos( angle );
			player.sy = player.y + bullet[0].range[ player.armType ] * Math.sin( angle );
		}
		
		return;
	}
	
	/* 총 반동 or 슬라이딩 */
	player.x += player.vx;
	if( player.isSlide ){
		if( player.vx > 0 && player.vx <= 2 ) player.vx -= 0.2;
		else if( player.vx > 0 ) player.vx -= 1;
		if( player.vx < 0 && player.vx >= -2 ) player.vx += 0.2;
		else if( player.vx < 0 ) player.vx += 1;
	}
	else{
		if( player.vx > 0 ) player.vx -= 1;
		if( player.vx < 0 ) player.vx += 1;
	}
	/* 총 반동 or 슬라이딩 끝 */
	if( Math.abs( player.vx ) < 1 ){
		player.vx = 0;
		if( player.isSlide ){
			x = Math.floor( (player.x+32) / 30 );
			y = Math.floor( (player.y+48) / 30 );
			/* 슬라이딩이 끝났는데 벽에 걸렸으면 못 움직이게 한다 */
			if( map[ y - 1 ][ x ] == 1 ){
				player.isStuck = true;
				player.fireAngle = player.motionUp = player.motionDown = 0;
			}
			player.isSlide = false;
		}
	}
	
	/* 좌로 이동 */
	if( key.left && !player.isSlide ){
		if( !player.isSit && !player.isStuck ) player.x -= 5;
		if( player.dir == 1 ) player.fireAngle = 180 - player.fireAngle;
		player.dir = 0;
		player.isRun = true;
	}
	/* 우로 이동 */
	if( key.right && !player.isSlide ){
		if( !player.isSit && !player.isStuck ) player.x += 5;
		if( player.dir == 0 ) player.fireAngle = 180 - player.fireAngle;
		player.dir = 1;
		player.isRun = true;
	}
	
	/* 벽에 끼인 상태가 아니면 끼임 상태 해제 */
	x = Math.floor( (player.x+32) / 30 );
	y = Math.floor( (player.y+48) / 30 );
	if( map[ y - 1 ][ x ] != 1 ){
		player.isStuck = false;
	}
	
	if( !player.isStuck ){
		x = Math.floor( (player.x+16) / 30 );
		y = Math.floor( (player.y+48) / 30 );
		/* 벽에 닿을 때 */
		if( map[ y ][ x ] == 1 || ( map[ y - 1 ][ x ] == 1 && !player.isSlide ) ){
			player.x = x*30 + 12;
		}
		if( map[ y ][ x + 1 ] == 1 || ( map[ y - 1 ][ x + 1 ] == 1 && !player.isSlide ) ){
			player.x = x*30 - 14;
		}
	}
	
	/* 점프 */
	if( key.shift && !player.isJump && !player.isSit && !player.isSlide && !player.isStuck ){
		player.vy = -12;
		if( player.isSlide ) player.vx *= 0.5;
		player.isSit = player.isSlide = false;
		player.isJump = true;
	}
	
	/* 슬라이딩 */
	if( key.shift && player.isSit && !player.isJump && !player.isSlide && player.vx == 0 && !player.isSnipe ){
		player.isSlide = true;
		player.loadedBullet = 0;
		if( player.dir == 0 ) player.vx = -15;
		else player.vx = 15;
	}
	
	/* 위로 쏘기 */
	if( key.up && !player.isStuck ){
		/* 밑을 쏘고 있었으면 밑에서부터 모션 변화 */
		if( player.motionDown > 0 ){
			player.motionDown -= 0.5;
			if( player.motionDown < 0 ) player.motionDown = 0;
		}
		/* 위 방향으로 모션 변화 */
		else{
			player.motionUp += 0.5;
			if( player.motionUp >= 4 ) player.motionUp = 3;
		}
		/* 왼쪽 각도 */
		if( player.dir == 0 ){
			player.fireAngle += 8;
			if( player.fireAngle >= 270 ) player.fireAngle = 270;
		}
		/* 오른쪽 각도 */
		else{
			player.fireAngle -= 8;
			if( player.fireAngle <= - 90 ) player.fireAngle = -90;
		}
	}
	
	/* 아래로 쏘기 */
	if( player.isJump && !player.isStuck ){
		if( key.down ){			
			/* 위를 쏘고 있었으면 위에서부터 모션 변화 */
			if( player.motionUp > 0 ){
				player.motionUp -= 0.5;
				if( player.motionUp < 0 ) player.motionUp = 0;
			}
			/* 아래 방향으로 모션 변화 */
			else{
				player.motionDown += 0.5;
				if( player.motionDown >= 4 ) player.motionDown = 3;
			}
			player.motionDown += 0.5;
			if( player.motionDown >= 4 ) player.motionDown = 3;
			/* 왼쪽 각도 */
			if( player.dir == 0 ){
				player.fireAngle -= 15;
				if( player.fireAngle <= 90 ) player.fireAngle = 90;
			}
			/* 오른쪽 각도 */
			else{
				player.fireAngle += 15;
				if( player.fireAngle >= 90 ) player.fireAngle = 90;
			}
		}
	}
	/* 앉기 */
	else{
		if( key.down ) player.isSit = true;
		else player.isSit = false;
	}
	
	/* 앞으로 쏘기 */
	if( !key.up && ( !key.down || player.isSit ) ){
		/* 왼쪽 각도 */
		if( player.dir == 0 ){
			if( player.fireAngle > 180 ){
				player.fireAngle -= 15;
				if( player.fireAngle <= 180 ) player.fireAngle = 180;
			}
			else{
				player.fireAngle += 8;
				if( player.fireAngle >= 180 ) player.fireAngle = 180;
			}
		}
		/* 오른쪽 각도 */
		else{
			if( player.fireAngle < 0 ){
				player.fireAngle += 15;
				if( player.fireAngle >= 0 ) player.fireAngle = 0;
			}
			else{
				player.fireAngle -= 8;
				if( player.fireAngle <= 0 ) player.fireAngle = 0;
			}
		}
		/* 모션 제자리로 */
		player.motionUp -= 0.5;
		if( player.motionUp < 0 ) player.motionUp = 0;
		player.motionDown -= 0.5;
		if( player.motionDown < 0 ) player.motionDown = 0;
	}
	
	/* 달리는 모션 */
	if( player.isRun ){
		player.motionRun += 0.34;
		if( player.motionRun >= 9 ) player.motionRun = 1;
	}
	else{
		player.motionRun = 0;
	}
	
	/* 장전된 총알을 연사 속도에 따라 발사 */
	if( player.loadedBullet > 0 && player.fireRate <= 0 ){//&& !player.isSlide ){
		/* 연사 속도 지정 */
		player.fireRate = bullet[0].fireRate[ player.armType ];
		
		/* 슬라이딩 중이 아니면 반동 지정 */
		if( !player.isSlide ){
			player.vx = Math.round( -1*bullet[0].kick[ player.armType ]*Math.cos( player.fireAngle * 3.14 / 180 ) );
			if( player.vy >= 0 ){
				player.vy += Math.round( -0.75*bullet[0].kick[ player.armType ]*Math.sin( player.fireAngle * 3.14 / 180 ) );
			}
		}
		
		/* 장전된 총알 수 감소 */
		player.loadedBullet--;
		
		/* 저격 중이면 */
		if( player.isSnipe ){
			var k, minv = 65536, mina = 0;
			var dist = Math.sqrt( ( player.x - player.sx ) * ( player.x - player.sx ) + ( player.y - player.sy ) * ( player.y - player.sy ) );
			/* 360도 돌리면서 가장 조준점에 잘 맞는 각도를 찾는다 */
			for( k = 0; k < 360; k += 0.5 ){
				var tx = player.x + dist * Math.cos( ( k + 10 * Math.sin( dist/100 ) ) * 3.14 / 180 );
				var ty = player.y + dist * Math.sin( ( k + 10 * Math.sin( dist/100 ) ) * 3.14 / 180 );
				var tv = Math.sqrt( ( tx - player.sx ) * ( tx - player.sx ) + ( ty - player.sy ) + ( ty - player.sy ) );
				if( minv > tv ){
					minv = tv;
					mina = k;
				}
			}
			/* 발사 */
			newBullet( bullet, player.x, player.y, mina, player.armType, 1 );
			/* 데미지 2배 */
			bullet[ bullet[0].n ].dmg *= 2;
			player.isSnipe = false;
		}
		/* 게틀링건 */
		else if( Math.floor( player.armType / 10 ) == 2 ){
			newBullet( bullet, player.x, player.y, player.fireAngle, player.armType, 1 );
			if( player.armType >= 22 ){
				newBullet( bullet, player.x, player.y, player.fireAngle, player.armType, 1 );
				bullet[ bullet[0].n ].rad += 22;
			}
			if( player.armType >= 23 ){
				newBullet( bullet, player.x, player.y, player.fireAngle, player.armType, 1 );
				bullet[ bullet[0].n ].rad += 44;
			}
		}
		/* 산탄 총 */
		else if( Math.floor( player.armType / 10 ) == 4 ){
			var k, num, ang;
			if( player.armType == 41 ){ num = 30; ang = 60; }
			if( player.armType == 42 ){ num = 20; ang = 40; }
			if( player.armType == 43 ){ num = 10; ang = 20; }
			for( k = 1; k <= num; k++ ){
				newBullet( bullet, player.x, player.y, player.fireAngle + Math.random()*ang - ang/2, player.armType, 1 );
			}
		}
		/* 화염 방사기 */
		else if( Math.floor( player.armType / 10 ) == 7 ){
			newBullet( bullet, player.x, player.y, player.fireAngle, player.armType, 1 );
		}
		/* 레이저 총 */
		else if( Math.floor( player.armType / 10 ) == 8 ){
			var k;
			/* 직선으로 한번에 발사 */
			for( k = 0; k <= 20; k++ ){
				newBullet( bullet, player.x, player.y, player.fireAngle, player.armType, 1 );
				bullet[ bullet[0].n ].rad += 24 * k;
				bullet[ bullet[0].n ].x = bullet[ bullet[0].n ].ox + bullet[ bullet[0].n ].rad * Math.cos( bullet[ bullet[0].n ].angle * 3.14 / 180 );
				bullet[ bullet[0].n ].y = bullet[ bullet[0].n ].oy + bullet[ bullet[0].n ].rad * Math.sin( bullet[ bullet[0].n ].angle * 3.14 / 180 );
				var x = Math.floor( (bullet[ bullet[0].n ].x+30) / 30 );
				var y = Math.floor( (bullet[ bullet[0].n ].y+30) / 30 );
				/* 벽에 닿으면 중지 */
				if( x < 0 || x > map[0].width * 24 || y < 0 || y > map[0].height * 16 || map[ y ][ x ] == 1 ){
					break;
				}
			}
		}
		/* 일반 총 */
		else{
			newBullet( bullet, player.x, player.y, player.fireAngle, player.armType, 1 );
		}
		
		/* 발사 파티클 생성 */
		/* 머신건 */
		if( player.armType == 11 ){
			newParticle_Cartridge( particle, player, 3.0, 14, 12 );
		}
		if( player.armType == 12 ){
			newParticle_Cartridge( particle, player, 2.0, 14, 12 );
		}
		if( player.armType == 13 ){
			newParticle_Cartridge( particle, player, 1.0, 14, 12 );
		}
		/* 게틀링 */
		if( player.armType == 21 ){
			newParticle_Cartridge( particle, player, 4.0, 14, 12 );
		}
		if( player.armType == 22 ){
			newParticle_Cartridge( particle, player, 3.0, 14, 12 );
		}
		if( player.armType == 23 ){
			newParticle_Cartridge( particle, player, 2.0, 14, 12 );
		}
		/* 저격총 */
		if( player.armType == 31 ){
			newParticle_Cartridge( particle, player, 6.0, 15, 16 );
		}
		/* 산탄총 */
		if( Math.floor( player.armType / 10 ) == 4 ){
			newParticle_Cartridge( particle, player, 6.0, 12, 16 );
			newParticle_Cartridge( particle, player, 6.0, 14, 16 );
			if( player.armType == 41 ) newParticle_Smoke2( particle, player, 20, 60 );
			if( player.armType == 42 ) newParticle_Smoke2( particle, player, 15, 30 );
			if( player.armType == 43 ) newParticle_Smoke2( particle, player, 10, 15 );
		}
		/* 박격포, 로켓 */
		if( Math.floor( player.armType / 10 ) == 5 || Math.floor( player.armType / 10 ) == 6 ){
			newParticle_Smoke1( particle, player.x, player.y, 10, 10, 10 );
		}
	}
};

function changeArm( player, dir ){
	/* 무기가 하나밖에 없으면 교체 취소 */
	if( player.armn == 1 ) return;
	
	var i, temp = 0;
	
	/* 무기 교체 모션 초기화 */
	player.motionChangeArm = 0;
	
	/* 위로 무기 교체 */
	if( dir == 0 || dir == 2 ){
		temp = player.arms[1];
		for( i = 1; i < player.armn; i++ ){
			player.arms[ i ] = player.arms[ i + 1 ];
		}
		player.arms[ player.armn ] = temp;
		/* 위로 무기 교체 모션 시작 */
		if( dir == 0 ) player.motionChangeArmType = 1;
		/* 버리기 무기 교체 모션 시작 */
		if( dir == 2 ) player.motionChangeArmType = 3;
	}
	/* 아래로 무기 교체 */
	else{
		temp = player.arms[ player.armn ];
		for( i = player.armn; i > 1; i-- ){
			player.arms[ i ] = player.arms[ i - 1 ];
		}
		player.arms[ 1 ] = temp;
		/* 아래로 무기 교체 모션 시작 */
		player.motionChangeArmType = 2;
	}
	
	/* 현재 무기 교체 */
	player.armType = player.arms[ 1 ];
};

function dropArm( player, items ){
	/* 기본 무기는 버리지 못한다 */
	if( player.armType == 1 ) return;
	
	/* 필드에 아이템 추가 */
	newItem( items, player.x, player.y, player.armType );
	
	/* 무기 위로 올리면서 버리기 */
	changeArm( player, 2 );
};

function printInfoArm( player, scr, img, context ){
	/* 출력용 임시 변수 생성 */
	var i;
	var w = 100;
	var h = 20;
	
	/* 무기 교체 완료 */
	if( player.motionChangeArmType == 0 ){
		/* 이미지 출력 */
		context.drawImage( img.gun, w * ( player.arms[ 1 ]%10 - 1 ), h * Math.floor( player.arms[ 1 ]/10 ), w, h, 10, 20, w, h );
		for( i = 2; i <= player.armn; i++ ){
			context.drawImage( img.gun, w * ( player.arms[ i ]%10 - 1 ), h * Math.floor( player.arms[ i ]/10 ), w, h, 20, 10 + i*20, w * 0.5, h * 0.5 );
		}
	}
	/* 위로 무기 교체 중 */
	else if( player.motionChangeArmType == 1 || player.motionChangeArmType == 3 ){
		/* 맨 위 무기 작아지게 */
		context.drawImage( img.gun, w * ( player.arms[ player.armn ]%10 - 1 ), h * Math.floor( player.arms[ player.armn ]/10 ), w, h, 
							10 + player.motionChangeArm, 20, 
							w * ( 1.0 - player.motionChangeArm * 0.05 ), h * ( 1.0 - player.motionChangeArm * 0.05 ) );
		
		/* 맨 위로 올리는 무기 커지게 */
		context.drawImage( img.gun, w * ( player.arms[ 1 ]%10 - 1 ), h * Math.floor( player.arms[ 1 ]/10 ), w, h, 
							20 - player.motionChangeArm, 50 - 3 * player.motionChangeArm, 
							w * ( 0.5 + player.motionChangeArm * 0.05 ), h * ( 0.5 + player.motionChangeArm * 0.05 ) );
		
		/* 나머지 무기 위로 이동 */
		for( i = 2; i < player.armn; i++ ){
			context.drawImage( img.gun, w * ( player.arms[ i ]%10 - 1 ), h * Math.floor( player.arms[ i ]/10 ), w, h, 
			20, 10 + ( i + 1 )*20 - 2 * player.motionChangeArm, 
			w * 0.5, h * 0.5 );
		}
		
		player.motionChangeArm += 2;
		
		/* 무기 교체 모션 완료 */
		if( player.motionChangeArm >= 10 ){
			/* 버리기 모션이었다면 무기 버리기 */
			if( player.motionChangeArmType == 3 ) player.armn--;
			/* 교체 모션 초기화 */
			player.motionChangeArmType = player.motionChangeArm = 0;
		}
	}
	/* 아래로 무기 교체 중 */
	else{
		/* 맨 위 무기 밑으로 내리면서 작아지게 */
		context.drawImage( img.gun, w * ( player.arms[ 2 ]%10 - 1 ), h * Math.floor( player.arms[ 2 ]/10 ), w, h, 
							10 + player.motionChangeArm, 20 + 3 * player.motionChangeArm, 
							w * ( 1.0 - player.motionChangeArm * 0.05 ), h * ( 1.0 - player.motionChangeArm * 0.05 ) );
		
		/* 위로 올리는 무기 커지게 */
		context.drawImage( img.gun, w * ( player.arms[ 1 ]%10 - 1 ), h * Math.floor( player.arms[ 1 ]/10 ), w, h, 
							20 - player.motionChangeArm, 20, 
							w * ( 0.5 + player.motionChangeArm * 0.05 ), h * ( 0.5 + player.motionChangeArm * 0.05 ) );
		
		/* 나머지 무기 위로 이동 */
		for( i = 3; i <= player.armn; i++ ){
			context.drawImage( img.gun, w * ( player.arms[ i ]%10 - 1 ), h * Math.floor( player.arms[ i ]/10 ), w, h, 
			20, 10 + ( i - 1 )*20 + 2 * player.motionChangeArm, 
			w * 0.5, h * 0.5 );
		}
		
		player.motionChangeArm += 2;
		
		/* 무기 교체 모션 완료 */
		if( player.motionChangeArm >= 10 ){
			/* 교체 모션 초기화 */
			player.motionChangeArmType = player.motionChangeArm = 0;
		}
	}
};

function printPlayerInfo( player, scr, img, context ){
	printInfoArm( player, scr, img, context );
};

function printPlayerArm( player, x, y, mRun, mUp, mDown, img, context ){
	/* 캔버스 저장 */
	context.save();
	
	/* 출력용 임시 변수 생성 */
	var w = 100;
	var h = 20;
	var angle = 0;
	
	y += 20;
	
	/* 점프 모션 */
	if( player.isJump ) y += 2;
	/* 슬라이딩 모션 */
	else if( player.isSlide ){
		x -= 5;
		y += 18;
		angle = -10;
	}
	/* 앉기 모션 */
	else if( player.isSit || player.isStuck ) y += 8;
	/* 달리기 모션 */
	else{
		if( mRun % 2 == 1 ) y++;
		if( mRun == 2 || mRun == 6 ) y += 2;
	}
	
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
	
	/* 캔버스 회전 */
	rotateContext( x + 16, y + 6, angle, context );
	
	/* 이미지 출력 */
	context.drawImage( img.gun, w * ( player.armType%10 - 1 ), h * Math.floor( player.armType/10 ), w, h, x, y, w/2, h/2 );
	
	/* 캔버스 복구 */
	context.restore();
};

function printPlayer( player, scr, img, context ){
	/* 캔버스 저장 */
	context.save();
	
	/* 출력용 임시 변수 생성 */
	var x = player.x - 16 - scr.x;
	var y = player.y - 24 - scr.y;
	var w = 32, h = 48;
	var mRun = Math.floor( player.motionRun );
	var mUp = Math.floor( player.motionUp );
	var mDown = Math.floor( player.motionDown );
	
	/* 앉기 */
	if( player.isSit || player.isStuck ){
		mRun = 0;
		mUp = 5;
	}
	/* 슬라이딩 */
	if( player.isSlide ){
		mRun = 1;
		mUp = 5;
		w = 34;
	}
	
	/* 왼쪽 방향이면 캔버스 반전 */
	if( player.dir == 0 ){
		context.scale( -1, 1 );
		x *= -1;
		x -= 32;
	}
	
	/* 이미지 출력 */
	/* 지면 */
	if( !player.isJump ){
		context.drawImage( img.player, mRun * 32, mUp * 48, w, h, x, y, w, h );
	}
	/* 공중 */
	else{
		/* 위로 */
		if( mDown == 0 ){
			context.drawImage( img.player, mUp * 32, 4 * 48, w, h, x, y, w, h );
		}
		/* 아래로 */
		else{
			context.drawImage( img.player, mDown * 32 + 3 * 32, 4 * 48, w, h, x, y, w, h );
		}
	}
	
	/* 무기 출력 */
	printPlayerArm( player, x, y, mRun, mUp, mDown, img, context );	
	
	/* 캔버스 복구 */
	context.restore();
	
	
	/* 저격 중 */
	if( player.isSnipe ){
		/* 조준점 */
		context.drawImage( img.snipe, 0, 0, 32, 32, player.sx - 16 - scr.x, player.sy - 16 - scr.y, 32, 32 );
		
		var range = 1000;
		if( player.armType == 32 ) range = 600;
		if( player.armType == 33 ) range = 400;
		/* 조준원 */
		context.fillStyle = "rgba( 0, 255, 0, 0.05 )";
		context.beginPath();
		context.arc( player.x - scr.x, player.y - scr.y, range, 0, Math.PI*2, false);
		context.closePath();
		context.fill();
		
		/* 조준원 테두리 */
		context.strokeStyle = "rgb( 0, 255, 0 )";
		for( ; range >= 100; range -= 200 ){
			context.beginPath();
			context.arc( player.x - scr.x, player.y - scr.y, range, 0, Math.PI*2, false);
			context.closePath();
			context.stroke();
		}
	}

	/* 체력 */
	context.fillStyle = "rgba( 255, 128, 128, 0.75 )";
	context.font = "bold 20px helvetica";
	context.fillText( "HP : " + Math.floor( player.hp ), 20, 450 );
};