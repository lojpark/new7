function initParticle( particle ){	
	particle[0] = new Object();
	
	particle[0].n = 0;
};

function newParticle( particle, x, y, 
						startScale, endScale, 
						startAlpha, endAlpha, 
						startAngle, deltaAngle, 
						gotoAngle, spd, 
						startVy, gravity,
						color, duration, type ){
	particle[0].n++;
	particle[ particle[0].n ] = new Object();
	
	var p = particle[ particle[0].n ];
	
	p.x = p.ox = x;
	p.y = p.oy = y;
	p.scale = startScale;
	p.deltaScale = ( endScale - startScale ) / duration;
	p.alpha = startAlpha;
	p.deltaAlpha = ( endAlpha - startAlpha ) / duration;
	p.angle = startAngle;
	p.deltaAngle = deltaAngle;
	p.gotoAngle = gotoAngle;
	p.spd = spd;
	p.vy = startVy;
	p.gravity = gravity;
	p.color = color;
	p.duration = duration;
	p.type = type;
	
	p.rad = 0;
};

/* 탄피 파티클 */
function newParticle_Cartridge( particle, player, scale, color, duration ){
	newParticle( particle, player.x + Math.random()*10-5, player.y + Math.random()*10-5, 
				scale, scale, 
				1.0, 1.0, 
				0, 0, 
				player.fireAngle+180, Math.random()*4+1, 
				-3, 1,
				color, duration, 2 );
};

/* 퍼지는 연기 파티클 */
function newParticle_Smoke1( particle, x, y, scale, duration, number ){
	var k;
	for( k = 1; k <= number; k++ ){
		newParticle( particle, x + Math.random()*10-5, y + Math.random()*10-5, 
					2.0, scale + Math.random()*1.5,
					0.75, 0.0, 
					0, 0, 
					Math.random()*360, Math.random()*3+1, 
					0, 0,
					15, duration + Math.random()*1.5, 1 );
	}
};

/* 쏘는 연기 파티클 */
function newParticle_Smoke2( particle, player, number, angle ){
	var k;
	for( k = 1; k <= number; k++ ){
		newParticle( particle, player.x + Math.random()*10-5, player.y + Math.random()*10-5, 
					2.0, Math.random()*5+5, 
					0.75, 0.0, 
					0, 0, 
					player.fireAngle + Math.random()*angle - angle/2, Math.random()*10+4, 
					0, 0,
					15, Math.random()*15+10, 1 );
	}
};

/* 날아가는 불 파티클 */
function newParticle_Fire1( particle, x, y, scale, duration ){
	newParticle( particle, x + Math.random()*20-10, y,
				 scale, scale * 0.28, 
				 1.0, 0.0, 
				 0, Math.random()*30-15, 
				 Math.random()*45-90, 1, 
				 0, 0,
				 12, duration, 2 );
	newParticle( particle, x, y+5, 
				 scale * 0.6, scale * 0.16, 
				 0.5, 0.0, 
				 Math.random()*360, Math.random()*2, 
				 Math.random()*45-90, 1, 
				 0, 0, 
				 14, duration, 2 );
};
/* 고정된 불 파티클 */
function newParticle_Fire2( particle, x, y, height, scale ){
	newParticle( particle, x + Math.random()*20-10, y + height/2 - 15,
				 scale, scale * 0.28, 
				 0.25, 0.0, 
				 0, Math.random()*30-15, 
				 Math.random()*45-90, 2, 
				 0, 0,
				 12, 20, 2 );
	newParticle( particle, x, y + height/2 - 10, 
				 scale * 0.6, scale * 0.16, 
				 0.75, 0.0, 
				 Math.random()*360, Math.random()*2, 
				 Math.random()*45-90, 0, 
				 0, 0, 
				 14, 2, 2 );
};

/* 폭발 파티클 */
function newParticle_Explosion( particle, x, y, scale, duration, number ){
	var k;
	for( k = 1; k <= number; k++ ){
		var color;
		if( Math.random()*2 < 1 ) color = 12;
		else color = 14;
		
		var sc = scale * ( 0.5 + Math.random() );
		
		newParticle( particle, x + Math.random()*scale*2-scale, y + Math.random()*scale*2-scale, 
					sc, sc, 
					0.75, 0.0, 
					0, 0, 
					Math.random()*360, Math.random()*3+1, 
					0, 0,
					color, duration + Math.random()*1.5, 1 );
	}
};

/* 출혈 파티클 */
function newParticle_Blood( particle, x, y, angle, scale, number, color ){
	var k;
	for( k = 1; k <= number; k++ ){
		var sc = Math.random()*scale;
		var ang = angle;
		/* 죽어서 나오는 피는 흩뿌린다 */
		if( angle == 444 ) ang = Math.random()*360;
		newParticle( particle, x + Math.random()*10-5, y + Math.random()*10-5, 
					sc, sc, 
					1.0, 1.0, 
					0, 0, 
					ang + 180 + Math.random()*30-15, Math.random()*4+1, 
					-3, 1,
					color, 5+Math.random()*10, 2 );
	}
};

function delParticle( particle, i ){
	var j;
	for( j = i; j <= particle[0].n; j++ ){
		particle[j] = particle[j+1];
		particle[j+1] = null;
	}
	particle[0].n--;
};

function moveParticle( particle ){
	var i;
	for( i = 1; i <= particle[0].n; i++ ){
		var p = particle[i];
		p.x = p.ox + p.rad * Math.cos( p.gotoAngle * 3.14 / 180 );
		p.y = p.oy + p.rad * Math.sin( p.gotoAngle * 3.14 / 180 );
		p.rad += p.spd;
		
		p.oy += p.vy;
		p.vy += p.gravity;
		
		p.scale += p.deltaScale;
		p.alpha += p.deltaAlpha;
		p.angle += p.deltaAngle;
		p.duration--;
		
		/* 시간 지난 파티클 삭제 */
		if( p.duration <= 0 ){
			delParticle( particle, i );
			i--;
		}
	}
};

function setColor( color, alpha, context ){
	switch( color ){
		case 0: context.fillStyle = "rgba(0,0,0," + alpha + ")"; break;
		case 1: context.fillStyle = "rgba(0,16,112," + alpha + ")"; break;
		case 4: context.fillStyle = "rgba(0,120,0," + alpha + ")"; break;
		case 7: context.fillStyle = "rgba(150,94,36," + alpha + ")"; break;
		case 9: context.fillStyle = "rgba(32,128,255," + alpha + ")"; break;
		case 10: context.fillStyle = "rgba(181,230,29," + alpha + ")"; break;
		case 11: context.fillStyle = "rgba(132,231,255," + alpha + ")"; break;
		case 12: context.fillStyle = "rgba(255,0,0," + alpha + ")"; break;
		case 14: context.fillStyle = "rgba(255,255,0," + alpha + ")"; break;
		case 15: context.fillStyle = "rgba(255,255,255," + alpha + ")"; break;
	}
};

function printParticle( particle, scr, img, context ){
	var i;
	for( i = 1; i <= particle[0].n; i++ ){
		var p = particle[i];
		
		/* 출력용 임시 변수 생성 */
		var x = p.x - scr.x;
		var y = p.y - scr.y;

		/* 캔버스 저장 */
		context.save();
		
		/* 캔버스 회전 */
		rotateContext( x, y, p.angle, context );
		
		setColor( p.color, p.alpha, context );
		
		/* 원형 파티클 */
		if( p.type == 1 ){
			context.beginPath();
			context.arc( x, y, p.scale, 0, Math.PI*2, false);
			context.closePath();
			context.fill();
		}
		/* 사각형 파티클 */
		else{
			context.fillRect( x - p.scale/2, y - p.scale/2, p.scale, p.scale );
		}
		
		/* 캔버스 복구 */
		context.restore();
	}
};