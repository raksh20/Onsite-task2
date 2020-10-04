var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");
var rect={x:0,y:0,w:160,h:80};
var dragside = false;
var dragrect=false;
var startX;
var startY;
var rotated=false;
var angle=0;
function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	ctx.fillStyle = "#00cc00";
	ctx.fillRect(rect.x,rect.y,rect.w,rect.h);
	ctx.fillStyle = "black";
	ctx.fillRect(rect.x+rect.w/2,rect.y+rect.h/2,8,8);
	ctx.fillRect(rect.x+rect.w/2,rect.y-8,8,8);
	ctx.fillRect(rect.x+rect.w,rect.y+rect.h/2,8,8);
	ctx.fillRect(rect.x+rect.w/2,rect.y+rect.h,8,8);
	ctx.fillRect(rect.x-8,rect.y+rect.h/2,8,8);
	
}
draw();
function rotate(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.translate(rect.x+rect.w/2, rect.y+rect.h/2);
  	ctx.rotate(20*Math.PI / 180);
  	ctx.translate(-(rect.x+rect.w/2), -(rect.y+rect.h/2));
	ctx.fillStyle = "#00cc00";
	ctx.fillRect(rect.x,rect.y,rect.w,rect.h);
	ctx.fillStyle = "black";
	ctx.fillRect(rect.x+rect.w/2,rect.y+rect.h/2,8,8);
	ctx.fillRect(rect.x+rect.w/2,rect.y-8,8,8);
	ctx.fillRect(rect.x+rect.w,rect.y+rect.h/2,8,8);
	ctx.fillRect(rect.x+rect.w/2,rect.y+rect.h,8,8);
	ctx.fillRect(rect.x-8,rect.y+rect.h/2,8,8);
	rotated=true;
	angle+=20;
	console.log(angle);

	
}

 function mouseDown(e) {
    
    var mousex = e.pageX - this.offsetLeft;
    var mousey = e.pageY - this.offsetTop;
    if(dist({x:mousex,y:mousey},{x:rect.x+rect.w,y:rect.y+rect.h/2})<5){
    	side="right";
    }else  if(dist({x:mousex,y:mousey}, {x:rect.x + rect.w / 2, y:rect.y+ rect.h}) <5){
     side= 'bottom';
    }else  if(dist({x:mousex,y:mousey}, {x:rect.x , y:rect.y+ rect.h/2}) <5){
     side= 'left';
    }else  if(dist({x:mousex,y:mousey}, {x:rect.x + rect.w / 2, y:rect.y}) <5){
     side= 'top';
    }
    if(dist({x:mousex,y:mousey}, {x:rect.x + rect.w / 2, y:rect.y+ rect.h/2}) <10){
    	dragpos="centre";
    }
    if(side=="top"||side=="right"||side=="bottom"||side=="left"){
    	dragside = true;
	}else{
		dragrect=true;
	}
	startX=mousex;
	startY=mousey;
};
/*if(rotated){
	if(dist({x:mousex,y:mousey}, {x:rect.x , y:rect.y+ rect.h/2}) <5){
     side= 'right';
    }
}*/
function dist(p1, p2) {
    return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
}
var side;
var dragpos;
function mouseMove(e) {
	var mousex = e.pageX - this.offsetLeft;
    var mousey = e.pageY - this.offsetTop;
  if(angle==0||angle==360||angle==540||angle==720){  
  	rotated=false;
  	console.log(mousex);
  	console.log(mousey);
  	console.log(rect.x+rect.w,rect.y+rect.h/2);
    if(dist({x:mousex,y:mousey},{x:rect.x+rect.w,y:rect.y+rect.h/2})<5){
    	side="right";
    }else  if(dist({x:mousex,y:mousey}, {x:rect.x + rect.w / 2, y:rect.y+ rect.h}) <5){
    	side= 'bottom';
    }else  if(dist({x:mousex,y:mousey}, {x:rect.x , y:rect.y+ rect.h/2}) <5){
    	side= 'left';
    }else  if(dist({x:mousex,y:mousey}, {x:rect.x + rect.w / 2, y:rect.y}) <5){
    	side= 'top';
    }
    if(dist({x:mousex,y:mousey}, {x:rect.x + rect.w / 2, y:rect.y+ rect.h/2}) <10){
    	dragpos="centre";
    }
    
  if (dragside && side=="right") {
  	//if (x > rect.w-10 && x < 0 + rect.w) {
    rect.w = mousex-rect.x;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw();

  }
  if (dragside && side=="bottom") {
    rect.h = mousey-rect.y;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw();

  }
  if (dragside && side=="left") {
  
  	rect.w += rect.x - mousex;
    rect.x = mousex;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw();

  }
  if (dragside && side=="top") {
  	
   rect.h += rect.y - mousey;
   rect.y = mousey;
   ctx.clearRect(0,0,canvas.width,canvas.height);
   draw();

  }

  if(dragrect && dragpos=="centre"){
  	var dx=mousex - startX;
  	var dy=mousey - startY;
  	rect.x+=dx;
  	rect.y+=dy;
  	
  	ctx.clearRect(0,0,canvas.width,canvas.height);
    draw();
    startX=mousex;
    startY=mousey;
    

  }
}
if(rotated){
	var mouserx=canvas.width-mousex;
	var mousery=canvas.height-mousey;
	console.log(mouserx);
	console.log(mousery);
	console.log(canvas.width-(rect.x + rect.w / 2),canvas.height-(rect.y+ rect.h))
	if(dist({x:mouserx,y:mousery},{x:canvas.width-(rect.x),y:canvas.height-(rect.y+rect.h/2)})<5){
    	side="left";
    }else  if(dist({x:mouserx,y:mousery}, {x:canvas.width-(rect.x + rect.w / 2), y:canvas.height-(rect.y)}) <5){
    	side= 'top';
    }else  if(dist({x:mouserx,y:mousery}, {x:canvas.width-(rect.x+rect.w),y:canvas.height-(rect.y+rect.h/2)}) <5){
    	side= 'right';
    }else  if(dist({x:mouserx,y:mousery}, {x:canvas.width-(rect.x + rect.w / 2), y:canvas.height-(rect.y+ rect.h)}) <5){
    	side= 'bottom';
    }
    if(dist({x:mouserx,y:mousery}, {x:canvas.width-(rect.x + rect.w / 2), y:canvas.height-(rect.y+ rect.h/2)}) <10){
    	dragpos="centre";
    }

    
  if (dragside && side=="left") {
  	//if (x > rect.w-10 && x < 0 + rect.w) {
    rect.w = rect.x;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw();

  }
  if (dragside && side=="top") {
    rect.h = mousery-rect.y;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw();

  }
  if (dragside && side=="right") {
  
  	rect.w += rect.x - mouserx;
    rect.x = mouserx;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw();

  }
  if (dragside && side=="bottom") {
  	
   rect.h += rect.y - mousery;
   rect.y = mousery;
   ctx.clearRect(0,0,canvas.width,canvas.height);
   draw();

  }

  if(dragrect && dragpos=="centre"){
  	var dx=mouserx - startX;
  	var dy=mousery - startY;
  	rect.x+=dx;
  	rect.y+=dy;
  	
  	ctx.clearRect(0,0,canvas.width,canvas.height);
    draw();
    startX=mouserx;
    startY=mousery;
    

  }

}
}
function mouseUp(e){

	dragside=false;
	side=false;
	dragrect=false;
	dragpos=false;
	//rotated=false;
	
}

function init() {
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mouseup', mouseUp, false);
  canvas.addEventListener('mousemove', mouseMove, false);
}

init();