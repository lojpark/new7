function initBullet( bullet ){	
	bullet[0] = new Object();
	
	bullet[0].n = 0;
	
	bullet[0].img = new Array();
	bullet[0].reloadBullet = new Array();
	bullet[0].fireRate = new Array();
	bullet[0].kick = new Array();
	bullet[0].range = new Array();
	
	bullet[0].img[1] = new Image();
	bullet[0].img[1].src = "image/bullet1.png";
	bullet[0].reloadBullet[1] = 1;
	bullet[0].fireRate[1] = 1;
	bullet[0].kick[1] = 0;
	
	bullet[0].img[11] = new Image();
	bullet[0].img[11].src = "image/bullet11.png";
	bullet[0].reloadBullet[11] = 3;
	bullet[0].fireRate[11] = 3;
	bullet[0].kick[11] = 0;
	
	bullet[0].img[12] = new Image();
	bullet[0].img[12].src = "image/bullet12.png";
	bullet[0].reloadBullet[12] = 4;
	bullet[0].fireRate[12] = 2;
	bullet[0].kick[12] = 0;
	
	bullet[0].img[13] = new Image();
	bullet[0].img[13].src = "image/bullet13.png";
	bullet[0].reloadBullet[13] = 5;
	bullet[0].fireRate[13] = 1;
	bullet[0].kick[13] = 0;
	
	bullet[0].img[21] = new Image();
	bullet[0].img[21].src = "image/bullet21.png";
	bullet[0].reloadBullet[21] = 3;
	bullet[0].fireRate[21] = 3;
	bullet[0].kick[21] = 3;
	
	bullet[0].img[22] = new Image();
	bullet[0].img[22].src = "image/bullet22.png";
	bullet[0].reloadBullet[22] = 3;
	bullet[0].fireRate[22] = 3;
	bullet[0].kick[22] = 2;
	
	bullet[0].img[23] = new Image();
	bullet[0].img[23].src = "image/bullet23.png";
	bullet[0].reloadBullet[23] = 3;
	bullet[0].fireRate[23] = 3;
	bullet[0].kick[23] = 2;
	
	bullet[0].img[31] = new Image();
	bullet[0].img[31].src = "image/bullet31.png";
	bullet[0].reloadBullet[31] = 1;
	bullet[0].fireRate[31] = 25;
	bullet[0].kick[31] = 10;
	bullet[0].range[31] = 1000;
	
	bullet[0].img[32] = new Image();
	bullet[0].img[32].src = "image/bullet32.png";
	bullet[0].reloadBullet[32] = 1;
	bullet[0].fireRate[32] = 18;
	bullet[0].kick[32] = 7;
	bullet[0].range[32] = 600;
	
	bullet[0].img[33] = new Image();
	bullet[0].img[33].src = "image/bullet33.png";
	bullet[0].reloadBullet[33] = 1;
	bullet[0].fireRate[33] = 10;
	bullet[0].kick[33] = 4;
	bullet[0].range[33] = 400;
	
	bullet[0].img[41] = new Image();
	bullet[0].img[41].src = "image/bullet41.png";
	bullet[0].reloadBullet[41] = 1;
	bullet[0].fireRate[41] = 20;
	bullet[0].kick[41] = 12;
	
	bullet[0].img[42] = new Image();
	bullet[0].img[42].src = "image/bullet42.png";
	bullet[0].reloadBullet[42] = 1;
	bullet[0].fireRate[42] = 15;
	bullet[0].kick[42] = 7;
	
	bullet[0].img[43] = new Image();
	bullet[0].img[43].src = "image/bullet43.png";
	bullet[0].reloadBullet[43] = 1;
	bullet[0].fireRate[43] = 10;
	bullet[0].kick[43] = 5;
	
	bullet[0].img[51] = new Image();
	bullet[0].img[51].src = "image/bullet51.png";
	bullet[0].reloadBullet[51] = 1;
	bullet[0].fireRate[51] = 50;
	bullet[0].kick[51] = 12;
	
	bullet[0].img[52] = new Image();
	bullet[0].img[52].src = "image/bullet52.png";
	bullet[0].reloadBullet[52] = 1;
	bullet[0].fireRate[52] = 40;
	bullet[0].kick[52] = 10;
	
	bullet[0].img[53] = new Image();
	bullet[0].img[53].src = "image/bullet53.png";
	bullet[0].reloadBullet[53] = 1;
	bullet[0].fireRate[53] = 30;
	bullet[0].kick[53] = 7;
	
	bullet[0].img[54] = new Image();
	bullet[0].img[54].src = "image/bullet51.png";
	bullet[0].reloadBullet[54] = 1;
	bullet[0].fireRate[54] = 50;
	bullet[0].kick[54] = 12;
	
	bullet[0].img[61] = new Image();
	bullet[0].img[61].src = "image/bullet61.png";
	bullet[0].reloadBullet[61] = 1;
	bullet[0].fireRate[61] = 20;
	bullet[0].kick[61] = 12;
	
	bullet[0].img[62] = new Image();
	bullet[0].img[62].src = "image/bullet62.png";
	bullet[0].reloadBullet[62] = 1;
	bullet[0].fireRate[62] = 10;
	bullet[0].kick[62] = 8;
	
	bullet[0].img[63] = new Image();
	bullet[0].img[63].src = "image/bullet63.png";
	bullet[0].reloadBullet[63] = 1;
	bullet[0].fireRate[63] = 5;
	bullet[0].kick[63] = 5;
	
	bullet[0].img[71] = new Image();
	bullet[0].img[71].src = "image/bullet71.png";
	bullet[0].reloadBullet[71] = 1;
	bullet[0].fireRate[71] = 20;
	bullet[0].kick[71] = 8;
	
	bullet[0].img[72] = new Image();
	bullet[0].img[72].src = "image/bullet71.png";
	bullet[0].reloadBullet[72] = 1;
	bullet[0].fireRate[72] = 5;
	bullet[0].kick[72] = 5;
	
	bullet[0].img[73] = new Image();
	bullet[0].img[73].src = "image/bullet71.png";
	bullet[0].reloadBullet[73] = 8;
	bullet[0].fireRate[73] = 1;
	bullet[0].kick[73] = 0;
	
	bullet[0].img[81] = new Image();
	bullet[0].img[81].src = "image/bullet81.png";
	bullet[0].reloadBullet[81] = 1;
	bullet[0].fireRate[81] = 20;
	bullet[0].kick[81] = 10;
	
	bullet[0].img[82] = new Image();
	bullet[0].img[82].src = "image/bullet82.png";
	bullet[0].reloadBullet[82] = 1;
	bullet[0].fireRate[82] = 10;
	bullet[0].kick[82] = 5;
	
	bullet[0].img[83] = new Image();
	bullet[0].img[83].src = "image/bullet83.png";
	bullet[0].reloadBullet[83] = 8;
	bullet[0].fireRate[83] = 1;
	bullet[0].kick[83] = 0;
};

function newBullet( bullet, x, y, angle, type, who ){
	bullet[0].n++;
	bullet[ bullet[0].n ] = new Object();
	
	var b = bullet[ bullet[0].n ];
	
	b.who = who;
	b.type = type;
	b.w = bullet[0].img[ b.type ].width;
	b.h = bullet[0].img[ b.type ].height;
	switch( b.type ){
		/* 광자포 */
		case 1:
			b.x = b.ox = x + Math.random()*4 - 2;
			b.y = b.oy = y + Math.random()*4 - 2;
			b.angle = angle + Math.random()*3 - 1.5;
			b.rad = 35;
			b.spd = 18;
			b.range = 300;
			b.dmg = 2;
			b.kick = 2;
			break;
		/* 머신건 */
		case 11:
			b.x = b.ox = x + Math.random()*4 - 2;
			b.y = b.oy = y + Math.random()*4 - 2;
			b.angle = angle + Math.random()*3 - 1.5;
			b.rad = 45;
			b.spd = 18;
			b.range = 350;
			b.dmg = 3;
			b.kick = 2;
			break;
		case 12:
			b.x = b.ox = x + Math.random()*2 - 1;
			b.y = b.oy = y + Math.random()*2 - 1;
			b.angle = angle + Math.random()*6 - 3;
			b.rad = 35;
			b.spd = 18;
			b.range = 325;
			b.dmg = 2.1;
			b.kick = 1;
			break;
		case 13:
			b.x = b.ox = x + Math.random()*2 - 1;
			b.y = b.oy = y + Math.random()*2 - 1;
			b.angle = angle + Math.random()*9 - 4.5;
			b.rad = 30;
			b.spd = 18;
			b.range = 300;
			b.dmg = 1.2;
			b.kick = 0;
			break;
		/* 게틀링건 */
		case 21:
			b.x = b.ox = x + Math.random()*6 - 3;
			b.y = b.oy = y + Math.random()*6 - 3;
			b.angle = angle + Math.random()*1 - 0.5;
			b.rad = 58;
			b.spd = 22;
			b.range = 500;
			b.dmg = 3.5;
			b.kick = 3;
			break;
		case 22:
			b.x = b.ox = x + Math.random()*9 - 4.5;
			b.y = b.oy = y + Math.random()*9 - 4.5;
			b.angle = angle + Math.random()*1 - 0.5;
			b.rad = 52;
			b.spd = 22;
			b.range = 450;
			b.dmg = 1.5;
			b.kick = 2;
			break;
		case 23:
			b.x = b.ox = x + Math.random()*12 - 6;
			b.y = b.oy = y + Math.random()*12 - 6;
			b.angle = angle + Math.random()*1 - 0.5;
			b.rad = 50;
			b.spd = 22;
			b.range = 400;
			b.dmg = 1;
			b.kick = 1;
			break;
		/* 저격총 */
		case 31:
			b.x = b.ox = x;
			b.y = b.oy = y;
			b.angle = angle;
			b.rad = 70;
			b.spd = 25;
			b.range = 1000;
			b.dmg = 20;
			b.kick = 7;
			break;
		case 32:
			b.x = b.ox = x;
			b.y = b.oy = y;
			b.angle = angle;
			b.rad = 60;
			b.spd = 25;
			b.range = 600;
			b.dmg = 12;
			b.kick = 7;
			break;
		case 33:
			b.x = b.ox = x;
			b.y = b.oy = y;
			b.angle = angle;
			b.rad = 50;
			b.spd = 25;
			b.range = 400;
			b.dmg = 8;
			b.kick = 7;
			break;
		/* 샷건 */
		case 41:
			b.x = b.ox = x;
			b.y = b.oy = y;
			b.angle = angle;
			b.rad = 40;
			b.spd = 10 + Math.random()*15;
			b.range = 140 + Math.random()*50;
			b.dmg = 1.5;
			b.kick = 7;
			break;
		case 42:
			b.x = b.ox = x;
			b.y = b.oy = y;
			b.angle = angle;
			b.rad = 30;
			b.spd = 15 + Math.random()*10;
			b.range = 175 + Math.random()*50;
			b.dmg = 1.5;
			b.kick = 7;
			break;
		case 43:
			b.x = b.ox = x;
			b.y = b.oy = y;
			b.angle = angle;
			b.rad = 30;
			b.spd = 15 + Math.random()*10;
			b.range = 200 + Math.random()*50;
			b.dmg = 1.5;
			b.kick = 5;
			break;
		/* 박격포 */
		case 51:
			b.x = b.ox = x;
			b.y = b.oy = y;
			b.vy = 0;
			b.angle = b.oangle = angle;
			b.rad = 30;
			b.spd = 18;
			b.range = 1500;
			b.dmg = 70;
			b.kick = 10;
			break;
		case 52:
			b.x = b.ox = x;
			b.y = b.oy = y;
			b.vy = 0;
			b.angle = b.oangle = angle;
			b.rad = 30;
			b.spd = 20;
			b.range = 1500;
			b.dmg = 60;
			b.kick = 10;
			break;
		case 53:
			b.x = b.ox = x;
			b.y = b.oy = y;
			b.vy = 0;
			b.angle = b.oangle = angle;
			b.rad = 30;
			b.spd = 22;
			b.range = 1500;
			b.dmg = 50;
			b.kick = 10;
			break;
		case 54: // 탱크 박격포
			b.x = b.ox = x;
			b.y = b.oy = y;
			b.vy = 0;
			b.angle = b.oangle = angle;
			b.rad = 30;
			b.spd = 22;
			b.range = 1500;
			b.dmg = 30;
			b.kick = 10;
			break;
		/* 로켓 */
		case 61:
			b.x = b.ox = x;
			b.y = b.oy = y;
			b.vy = Math.random()*2-1;
			b.angle = angle;
			b.rad = 40;
			b.spd = 0;
			b.range = 500;
			b.dmg = 40;
			b.kick = 10;
			break;
		case 62:
			b.x = b.ox = x;
			b.y = b.oy = y;
			b.vy = Math.random()*2-1;
			b.angle = angle;
			b.rad = 40;
			b.spd = 0;
			b.range = 500;
			b.dmg = 20;
			b.kick = 10;
			break;
		case 63:
			b.x = b.ox = x;
			b.y = b.oy = y;
			b.vy = Math.random()*2-1;
			b.angle = angle;
			b.rad = 40;
			b.spd = 0;
			b.range = 500;
			b.dmg = 14;
			b.kick = 10;
			break;
		/* 화염방사기 */
		case 71:
			b.x = b.ox = x;
			b.y = b.oy = y;
			b.angle = angle;
			b.rad = 40;
			b.spd = 7;
			b.range = 180;
			b.dmg = 4.5;
			b.kick = 0;
			b.time = 0;
			break;
		case 72:
			b.x = b.ox = x;
			b.y = b.oy = y;
			b.angle = angle;
			b.rad = 40;
			b.spd = 15;
			b.range = 300;
			b.dmg = 1.5;
			b.kick = 0;
			b.time = 0;
			break;
		case 73:
			b.x = b.ox = x;
			b.y = b.oy = y;
			b.angle = angle;
			b.rad = 40;
			b.spd = 15;
			b.range = 300;
			b.dmg = 0.1;
			b.kick = 0;
			b.time = 0;
			break;
		/* 레이져 */
		case 81:
			b.x = b.ox = x;
			b.y = b.oy = y;
			b.angle = angle;
			b.rad = 40;
			b.spd = 0;
			b.range = 500;
			b.dmg = 15;
			b.kick = 0;
			b.time = 0;
			break;
		case 82:
			b.x = b.ox = x;
			b.y = b.oy = y;
			b.angle = angle;
			b.rad = 40;
			b.spd = 0;
			b.range = 500;
			b.dmg = 10;
			b.kick = 0;
			b.time = 0;
			break;
		case 83:
			b.x = b.ox = x;
			b.y = b.oy = y;
			b.angle = angle;
			b.rad = 40;
			b.spd = 0;
			b.range = 500;
			b.dmg = 1;
			b.kick = 0;
			b.time = 0;
			break;
	}
};

function delBullet( bullet, i ){
	var j;
	for( j = i; j <= bullet[0].n; j++ ){
		bullet[j] = bullet[j+1];
		bullet[j+1] = null;
	}
	bullet[0].n--;
};

function moveBullet( bullet, player, enemy, map, particle ){
	var i, k;
	for( i = 1; i <= bullet[0].n; i++ ){
		var b = bullet[i];
		
		/* 광자포면 반짝거린다 */
		if( Math.floor( b.type / 10 ) == 0 ){
			b.x = b.ox + b.rad * Math.cos( b.angle * 3.14 / 180 );
			b.y = b.oy + b.rad * Math.sin( b.angle * 3.14 / 180 );
			
			newParticle( particle, b.x + Math.random()*4-2, b.y + Math.random()*4-2, 
						1.0, 1.0, 
						1.0, 0.0, 
						0, 0, 
						b.angle+180 + Math.random()*30-15, 1, 
						0, 0,
						11, 10, 2 );
		}
		/* 저격 총이면 총알이 휜다 */
		else if( Math.floor( b.type / 10 ) == 3 ){
			b.x = b.ox + b.rad * Math.cos( ( b.angle + 10 * Math.sin( b.rad/100 ) ) * 3.14 / 180 );
			b.y = b.oy + b.rad * Math.sin( ( b.angle + 10 * Math.sin( b.rad/100 ) ) * 3.14 / 180 );
		}
		/* 박격포면 포물선을 그린다 */
		else if( Math.floor( b.type / 10 ) == 5 ){
			var fx = b.x, fy = b.y;
			/* 직선 운동 */
			b.x = b.ox + b.rad * Math.cos( b.oangle * 3.14 / 180 );
			b.y = b.oy + b.rad * Math.sin( b.oangle * 3.14 / 180 );
			/* 후 중력 가속 */
			if( b.type != 54 ){
				b.y += b.vy;
				b.oy += b.vy;
				b.vy++;
			}
			else{
				newParticle_Fire1( particle, b.x, b.y, 30, 10 );
			}
			/* 이미지 각도 재 설정 */
			b.angle = Math.atan2( b.y - fy, b.x - fx ) * 180 / 3.14;
		}
		/* 로켓이면 가속도가 붙는다 */
		else if( Math.floor( b.type / 10 ) == 6 ){
			/*
			유도탄
			var minv = 2147483647, mini = 1;
			for( k = 1; k <= enemy[0].n; k++ ){
				var e = enemy[k];
				if( minv > myMath.dist( b.x, b.y, e.x, e.y ) ){
					minv = myMath.dist( b.x, b.y, e.x, e.y );
					mini = k;
				}
			}
			
			b.spd++;
			if( b.spd < 10 ){
				b.x = b.ox + b.rad * Math.cos( b.angle * 3.14 / 180 );
				b.y = b.oy + b.rad * Math.sin( b.angle * 3.14 / 180 );
			}
			else{
				b.angle += ( ( Math.atan2( enemy[ mini ].y - b.y, enemy[ mini ].x - b.x ) * 180 / 3.14 ) - b.angle ) / 10;
				b.x = b.x + b.spd * Math.cos( b.angle * 3.14 / 180 );
				b.y = b.y + b.spd * Math.sin( b.angle * 3.14 / 180 );
			}
			*/
			
			b.x = b.ox + b.rad * Math.cos( b.angle * 3.14 / 180 );
			b.y = b.oy + b.rad * Math.sin( b.angle * 3.14 / 180 );
			b.spd++;
			
			newParticle( particle, b.x + Math.random()*10-5, b.y + Math.random()*10-5, 
						2.0, 10.0, 
						0.75, 0.0, 
						0, 0, 
						b.angle+180 + Math.random()*30-15, 3, 
						0, 0,
						15, 20, 1 );
		}
		/* 화염 방사기 */
		else if( Math.floor( b.type / 10 ) == 7 ){
			b.x = b.ox + b.rad * Math.cos( b.angle * 3.14 / 180 );
			b.y = b.oy + b.rad * Math.sin( b.angle * 3.14 / 180 );
			b.time++;
			/* 불 파티클 */
			if( b.type == 71 ) newParticle_Fire1( particle, b.x, b.y, b.rad/2, 20 );
			if( b.type == 72 ) newParticle_Fire1( particle, b.x, b.y, 30, 20 );
			if( b.type == 73 ) newParticle_Fire1( particle, b.x, b.y, 20, 5 );
		}
		/* 레이저면 바로 사라진다 */
		else if( Math.floor( b.type / 10 ) == 8 ){
			if( b.time == 0 ) b.time++;
			else b.rad = b.range + 1;
			
			var sc = 4.0, dur = 10;
			if( b.type == 82 ){ sc = 3.0; dur = 8; }
			if( b.type == 83 ){ sc = 2.0; dur = 4; }
			newParticle( particle, b.x + Math.random()*10-5, b.y + Math.random()*10-5, 
						sc, sc, 
						0.75, 0.0, 
						Math.random()*360, 15, 
						Math.random()*360, 1, 
						0, 0,
						12, dur, 2 );
		}
		/* 일반 총이면 직선 운동 */
		else{
			b.x = b.ox + b.rad * Math.cos( b.angle * 3.14 / 180 );
			b.y = b.oy + b.rad * Math.sin( b.angle * 3.14 / 180 );
		}
		
		b.rad += b.spd;
		
		
		var x = Math.floor( (b.x+30) / 30 );
		var y = Math.floor( (b.y+30) / 30 );
		/* 벽에 닿을 때 */
		if( x < 0 || x > map[0].width * 24 || y < 0 || y > map[0].height * 16 || map[ y ][ x ] == 1 ){
			/* 폭발 파티클 */
			if( Math.floor( b.type / 10 ) == 5 || Math.floor( b.type / 10 ) == 6 ){
				newParticle_Explosion( particle, b.x, b.y, b.dmg * 0.75, 15, 10 )
				newParticle_Smoke1( particle, b.x, b.y, b.dmg * 0.75, 15, 10 );
				/* 후폭풍 */
				for( k = 1; k <= enemy[0].n; k++ ){
					iBlastEnemy( enemy[k], b );
				}
				iBlastPlayer( player, b );
			}
			delBullet( bullet, i );
			i--;
			continue;
		}
		/* 사정거리 초과시 총알 삭제 */
		if( b.rad > b.range || b.y <= 30 ){
			delBullet( bullet, i );
			i--;
		}
	}
};

function printBullet( bullet, scr, img, context ){
	var i;
	for( i = 1; i <= bullet[0].n; i++ ){
		var b = bullet[i];
		
		/* 출력용 임시 변수 생성 */
		var x = b.x - scr.x;
		var y = b.y - scr.y;
		var w = b.w;
		var h = b.h;

		/* 캔버스 저장 */
		context.save();
		
		/* 캔버스 회전 */
		rotateContext( x, y, b.angle, context );
		
		/* 이미지 출력 */
		context.drawImage( bullet[0].img[ b.type ], 0, 0, w, h, x - w/2, y - h/2, w, h );
		
		/* 캔버스 복구 */
		context.restore();
	}
};

function rotateContext( x, y, angle, context ){
	context.translate( x, y );
	context.rotate( angle * Math.PI/180 );
	context.translate( x * -1, y * -1 );
};