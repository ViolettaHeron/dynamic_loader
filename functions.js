p_current = 0;

function init(){
	var can = document.getElementById("loader_1--canvas");

	addEvents(can);
	traceBase(can);
	trace(can);
	return true;
}
/*
* @params 	canvas on which draw (preferabily square)
*			color in which draw the base circle default #bbbbbb
*/
function traceBase(can,color="#bbbbbb"){
	var ctx = can.getContext("2d");

	var r = can.width/2 - 15;

	ctx.beginPath();
	ctx.strokeStyle = "#bbbbbb";
	ctx.arc((can.width/2), (can.width/2), r, 0, 2 * Math.PI, false);
	ctx.stroke()
	ctx.closePath();
}


/*
* @params 	canvas on which draw (preferabily square)
*			percentage of progression
*			color in which draw the base circle default #000000
*			t/f if put a dot at the end of the arc
*/
function trace(can,percentage=0,arccolor="#000000",putDot=true){
	var ctx = can.getContext("2d");

	var r = can.width/2 - 15;
	var boldness = can.width/75;
	var beginAngle = -(Math.PI)/2;
	var endAngle = beginAngle + (percentage/100)*2*Math.PI

	ctx.beginPath();
	ctx.strokeStyle = arccolor;
	ctx.arc((can.width/2), (can.width/2), r, beginAngle, endAngle, false);
	ctx.stroke()
	ctx.closePath();

	if(putDot){
		var x = (can.width/2)+Math.cos(endAngle)*r;	
		var y = (can.height/2)+Math.sin(endAngle)*r;
		ctx.beginPath();
		ctx.fillStyle = arccolor;
		ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
		ctx.fill()
		ctx.closePath();
	}
}

/*
* @params 	canvas on which draw (preferabily square)
*			percentage of progression
*			color in which draw the base circle default #bbbbbb
*			color in which draw the base circle default #000000
*			t/f if put a dot at the end of the arc
*/
function update(can,p,basecolor="#bbbbbb",arcColor="#000000",putDot=true){
	can.getContext("2d").clearRect(0, 0, can.width, can.height);
	traceBase(can,basecolor)
	trace(can,p,arcColor,putDot);
}

/*
* @params 	canvas on which draw (preferabily square)
*			percentage of progression initial
*			percentage of progression final
*			color in which draw the base circle default #bbbbbb
*			color in which draw the base circle default #000000
*			t/f if put a dot at the end of the arc
*/
function slide(can,p_from,p_to,basecolor="#bbbbbb",arcColor="#000000",putDot=true){
	if(p_from == p_to) return;
	var increment = p_from<p_to?1:-1
	var p_current = p_from;
	var interval = setInterval(function(){
		p_current = p_current+increment
		update(can,p_current)
		if(p_from<p_to && p_current>=p_to) clearInterval(interval);
		if(p_from>p_to && p_current<=p_to) clearInterval(interval);
	}, 30);
}


/*
* add events
*/
function addEvents(can){
	document.getElementById("loader_1--button").addEventListener("click",function(){
		var p = parseInt(document.getElementById("loader_1--value").value);
		if(p<0 || p>100 || p==NaN){
			console.log("error : can't display a percentage negative or above 100");return;
		}
		slide(can,p_current,p);
		p_current = p;
	});
}