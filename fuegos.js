function drawGrid(color, stepx, stepy) {
   ctx.save()
   ctx.strokeStyle = color;
   ctx.fillStyle = '#ffffff';
   ctx.lineWidth = 0.5;
   ctx.fillRect(0, 0, canvas.width, canvas.height);

   for (var i = stepx + 0.5; i < canvas.width; i += stepx) {
     ctx.beginPath();
     ctx.moveTo(i, 0);
     ctx.lineTo(i, canvas.height);
     ctx.stroke();
   }

   for (var i = stepy + 0.5; i < canvas.height; i += stepy) {
     ctx.beginPath();
     ctx.moveTo(0, i);
     ctx.lineTo(canvas.width, i);
     ctx.stroke();
   }
   ctx.restore();
}


var canvas = document.getElementById('canvas_1'),
	ctx = canvas.getContext('2d');
ctx.font = '13px Helvetica';
var wChar= ctx.measureText('m').width;


var orgX=canvas.width/2, 
//escalas
    escala=canvas.width/20,
	orgY=canvas.height-wChar,
//parÃ¡metros
    v0=8,
//tiempo
    dt=0.01, 
	t=0.0,
	angTiro=80*Math.PI/180,
    NPARTICULAS=24,
    pol=[],
    pol_1=[],
	colores=['rgb(255,0,0)', 'rgb(0, 255,0)', 'rgb(0, 0, 255)',
          'rgb(0, 255, 255)', 'rgb(255, 0, 255)', 'rgb(128, 128, 0)',
          'rgb(128, 0, 0)', 'rgb(255, 128, 0)', 'rgb(0, 64, 64)',
          'rgb(128, 128, 255)', 'rgb(128, 0, 64)', 'rgb(255, 0, 128)'],
 	bNuevo=true,
    bTermina=false;


function dispositivo(g){
 //muestra la partÃ­cula en la nueva posiciÃ³n
    var x1,y1;
	if(bNuevo){
		x1=orgX+escala*(10*Math.cos(angTiro)*t);
		y1=orgY-escala*(10*Math.sin(angTiro)*t-5*t*t);
		pol_1.push({x:x1, y:y1});
		g.strokeStyle='black';
		g.fillStyle='black';
		g.beginPath();
		g.moveTo(pol_1[0].x,pol_1[0].y);
		for(var j=1; j<pol_1.length; j++){
			g.lineTo(pol_1[j].x,pol_1[j].y);	
		}
		g.stroke();	
		g.beginPath();
		g.arc(pol_1[pol_1.length-1].x,pol_1[pol_1.length-1].y, wChar/2, 0, 2*Math.PI);
		g.fill();
	}else{
		var angulo;
        var nParticulas=0;
		for(var i=0; i<NPARTICULAS; i++){
			angulo=2*Math.PI*i/NPARTICULAS
			x1=orgX+escala*(5*Math.sin(2*angTiro)+(v0*Math.cos(angulo)+10*Math.cos(angTiro))*t);
			y1=orgY-escala*(5*Math.sin(angTiro)*Math.sin(angTiro)+v0*Math.sin(angulo)*t-5*t*t);		
            if(y1<canvas.height){
				pol[i].push({x:x1, y:y1});
    		}else{
                nParticulas++;
	        }
		}
        if(nParticulas==NPARTICULAS){
            bTermina=true;
         }
		for(var i=0; i<NPARTICULAS; i++){
			g.strokeStyle=colores[i%12];
			g.fillStyle=colores[i%12];
			g.beginPath();
			g.moveTo(pol[i][0].x,pol[i][0].y);
			for(var j=1; j<pol[i].length; j++){
				g.lineTo(pol[i][j].x,pol[i][j].y);	
			}
			g.stroke();
			g.beginPath();
			g.arc(pol[i][pol[i].length-1].x,pol[i][pol[i].length-1].y, 2, 0, 2*Math.PI);
			g.fill();
		}
	}		
}
	
	
var raf;
	
//drawGrid('lightgray', 10, 10);  
nuevo();

function nuevo() {	
 	v0=5+7*Math.random();  
 	angTiro=(30+120*Math.random())*Math.PI/180;  
	pol.length=0;
	pol_1.length=0;
	t=0.0;
    for(var i=0; i<NPARTICULAS; i++){
		pol[i]=[];
    }
	
    bTermina=false;
    bNuevo=true;
	if(raf!=undefined){
        window.cancelAnimationFrame(raf);
    }
	empieza();
}

 function empieza() {
 	raf=window.requestAnimationFrame(animate);
}




function update() {
 	t+=dt;
	if(bNuevo){
		if(t>Math.sin(angTiro)){
			bNuevo=false;
			t=0;
		}
	}
}

function animate(time) {
    update();
	if (bTermina){
       window.cancelAnimationFrame(raf);
	   nuevo();
 	}else{
        raf=window.requestAnimationFrame(animate);
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //drawGrid('lightgray', 10, 10);  
    dispositivo(ctx);
}






