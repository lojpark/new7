var myMath = new Object();

myMath.dist = function( x1, y1, x2, y2 ){
	return Math.sqrt( ( x1 - x2 ) * ( x1 - x2 ) + ( y1 - y2 ) * ( y1 - y2 ) );
};

myMath.floor = function( num, figure ){
	figure = Math.pow( 10, figure );
	return Math.floor( num * figure ) / figure;
};