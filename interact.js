function iBP( bullet, player, enemy, particle ){
	var i, j, k;
	var p = player;
	for( i = 1; i <= bullet[0].n; i++ ){
		var b = bullet[i];
		if( p.x - 32/2 <= b.x && b.x <= p.x + 32/2 ){
			if( p.y - 48/2 <= b.y && b.y <= p.y + 48/2 ){
				/* 폭발 파티클 */
				if( Math.floor( b.type / 10 ) == 5 || Math.floor( b.type / 10 ) == 6 ){
					newParticle_Explosion( particle, b.x, b.y, b.dmg * 0.75, 15, 10 )
					newParticle_Smoke1( particle, b.x, b.y, b.dmg * 0.75, 15, 10 );
					/* 후폭풍 */
					for( k = 1; k <= enemy[0].n; k++ ){
						iBlastEnemy( enemy[k], b );
					}
				}
				
				/* 출혈 파티클 */
				newParticle_Blood( particle, b.x, b.y, b.angle, 2.0, Math.ceil( b.dmg ), 12 );
				
				player.hp -= Math.round( b.dmg );
				
				delBullet( bullet, i );
				i--;
				continue;
			}
		}
	}
}

function iBE( bullet, enemy, player, items, particle ){
	var i, j, k;
	for( i = 1; i <= bullet[0].n; i++ ){
		var b = bullet[i];
		for( j = 1; j <= enemy[0].n; j++ ){
			var e = enemy[j];
			
			/* 죽은 적은 무시 */
			if( e.isDie ) continue;
			
			/* 보스는 적군의 공격을 받지 않는다. */
			if( b.who != 1 && e.type >= 100 ) continue;
			
			/* 적이 맞았다 */
			if( e.x - e.width/2 <= b.x && b.x <= e.x + e.width/2 ){
				if( e.y - e.height/2 <= b.y && b.y <= e.y + e.height/2 ){
					/* 화나지 않았다면 */
					if( !e.isMad ){
						/* 화나서 플레이어를 쫒아가게 한다 */
						e.destX = player.x + Math.random()*300-150;
						e.destY = player.y + Math.random()*300-150;
						e.isMad = true;
						/* 근처 친구들도 화나게 한다 */
						for( k = 1; k <= enemy[0].n; k++ ){
							var e2 = enemy[k];
							if( j == k || e2.isMad ) continue;
							if( myMath.dist( e.x, e.y, e2.x, e2.y ) <= 300 || myMath.dist( player.x, player.y, e2.x, e2.y ) <= 300 ){
								e2.destX = player.x + Math.random()*300-150;
								e2.destY = player.y + Math.random()*300-150;
								e2.isMad = true;
							}
						}
					}

					/* 폭발 파티클 */
					if( Math.floor( b.type / 10 ) == 5 || Math.floor( b.type / 10 ) == 6 ){
						newParticle_Explosion( particle, b.x, b.y, b.dmg * 0.75, 15, 10 )
						newParticle_Smoke1( particle, b.x, b.y, b.dmg * 0.75, 15, 10 );
						/* 후폭풍 */
						for( k = 1; k <= enemy[0].n; k++ ){
							if( j == k ) continue;
							iBlastEnemy( enemy[k], b );
						}
						iBlastPlayer( player, b );
					}

					/* 출혈 파티클 */
					if( e.type == 3 || e.type >= 100 ) newParticle_Blood( particle, b.x, b.y, b.angle, 2.0, Math.ceil( b.dmg ), 14 );
					else newParticle_Blood( particle, b.x, b.y, b.angle, 2.0, Math.ceil( b.dmg ), 12 );
					
					/* 체력 감소 */
					iDecreaseHp( e, b.dmg * e.def );
					
					/* 밀려남 */
					if( e.type < 100 ){
						e.vx = Math.round( b.kick*Math.cos( b.angle * 3.14 / 180 ) );
					}
					if( e.type == 2 ) e.vy = Math.round( b.kick*Math.sin( b.angle * 3.14 / 180 ) );

					/* 죽었다 */
					if( e.hp <= 0 ){
						e.isDie = true;
						newItem( items, e.x, e.y, 100 );
					}
					
					/* 불탄다 */
					if( Math.floor( b.type / 10 ) == 7 ){
						if( e.type < 100 ) e.isBurn = true;
						continue;
					}
					
					/* 불을 제외하고 탄환 제거 */
					delBullet( bullet, i );
					i--;
					break;
				}
			}
		}
	}
};

function iPI( player, items ){
	var i;
	var p = player;
	
	for( i = 1; i <= items[0].n; i++ ){
		var it = items[i];
		
		if( p.x - 32/2 <= it.x && it.x <= p.x + 32/2 ){
			if( p.y - 48/2 <= it.y && it.y <= p.y + 48/2 ){
				/* 무기 */
				if( it.type < 100 ){
					player.armn++;
					player.arms[ player.armn ] = it.type;
					changeArm( player, 1 );
				}
				delItem( items, i );
				return 1;
			}
		}
	}
	return 0;
};

function iDecreaseHp( object, value ){
	object.hp -= myMath.floor( value, 1 );
	if( object.meter.time < 15 ) object.meter.time = 1;
	object.meter.nextValue += myMath.floor( value, 1 );
};

function iBlastPlayer( player, b ){
	var dist = myMath.dist( b.x, b.y, player.x, player.y );
	var scale = b.dmg * 3;
	if( dist <= scale ){
		player.hp -= myMath.floor( b.dmg * 0.2 * ( scale - dist ) / scale, 1 );
		if( player.x < b.x ) player.vx = Math.round( -15 * ( scale - dist ) / scale );
		else player.vx = Math.round( 15 * ( scale - dist ) / scale );
		player.vy -= 2;
	}
}
function iBlastEnemy( e, b ){
	var dist = myMath.dist( b.x, b.y, e.x, e.y );
	var scale = b.dmg * 3;
	if( dist <= scale ){
		iDecreaseHp( e, b.dmg * ( scale - dist ) / scale * e.def );
		if( e.type < 100 ){
			if( e.x < b.x ) Math.round( e.vx = -15 * ( scale - dist ) / scale );
			else e.vx = Math.round( 15 * ( scale - dist ) / scale );
			e.vy -= 2;
		}
	}
}