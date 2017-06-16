function initItem( items, img ){
	items[0] = new Object();
	
	items[0].n = 0;
	
	img.gun = new Image();
	img.gun.src = "image/gun.png";
	img.gold = new Image();
	img.gold.src = "image/gold.png";
	
	newItem( items, 3340, 1200, ( Math.floor( Math.random()*8 ) + 1 ) * 10 + Math.floor( Math.random()*3 ) + 1 );
	newItem( items, 3140, 1200, ( Math.floor( Math.random()*8 ) + 1 ) * 10 + Math.floor( Math.random()*3 ) + 1 );
};

function newItem( items, x, y, type ){
	items[0].n++;
	items[ items[0].n ] = new Object();
	
	var it = items[ items[0].n ];
	
	it.x = x;
	it.y = y;
	it.type = type;
	it.motionFloat = 0;
	it.motionTurn = 0;
};

function delItem( items, i ){
	var j;
	for( j = i; j <= items[0].n; j++ ){
		items[j] = items[j+1];
		items[j+1] = null;
	}
	items[0].n--;
};

function moveItem( items, particle ){
	var i;
	for( i = 1; i <= items[0].n; i++ ){
		var it = items[i];
		
		/* 무기 */
		if( it.type < 100 ){
			/* 둥실둥실 모션 */
			it.motionFloat += 0.1;
			if( it.motionFloat > 6.28 ) it.motionFloat = 0;
			
			/* 반짝반짝 모션 */
			if( Math.random()*2 < 1 ){
				newParticle( particle, it.x + Math.random()*30-15, it.y + 3*Math.sin( it.motionFloat ) + Math.random()*10-5, 
							 1.0, 1.0, 
							 0.75, 0.0, 
							 0, 0, 
							 -90, 1, 
							 0, 0,
							 15, 10 +  + Math.random()*20, 1 );
			}
		}
		
		/* 돈 */
		else if( it.type == 100 ){
			/* 빙글빙글 모션 */
			it.motionTurn += 0.34;
			if( it.motionTurn > 3 ) it.motionTurn = 3;
		}
	}
};

function printItem( items, scr, img, context ){
	var i;
	for( i = 1; i <= items[0].n; i++ ){
		var it = items[i];
		
		/* 무기 */
		if( it.type < 100 ){
			/* 출력용 임시 변수 생성 */
			var w = 100, h = 20;
			var x = it.x - w * 0.25 - scr.x;
			var y = it.y - h * 0.25 - scr.y + 3*Math.sin( it.motionFloat );
			
			/* 캔버스 저장 */
			context.save();

			/* 캔버스 회전 */
			rotateContext( x, y, -10, context );
			
			/* 이미지 출력 */
			context.drawImage( img.gun, w * ( it.type%10 - 1 ), h * Math.floor( it.type/10 ), w, h, x, y, w * 0.5, h * 0.5 );

			/* 캔버스 복구 */
			context.restore();
		}
		
		/* 돈 */
		else if( it.type == 100 ){
			/* 출력용 임시 변수 생성 */
			var w = 12, h = 12;
			var x = it.x - w - scr.x;
			var y = it.y - h - scr.y;
			var mTurn = Math.floor( it.motionTurn );
			
			/* 이미지 출력 */
			context.drawImage( img.gold, w * mTurn, 0, w, h, x, y, w, h );
		}
	}
};