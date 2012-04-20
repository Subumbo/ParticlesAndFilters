/* Author:
	Patrick Wolleb
*/


// Define name space 
window.sh = window.sh || {};

// Particle class



(function(namespace) {
	
	var Particle = function(x,y) {
		this.initialize(x,y);
	}
	
	var p = Particle.prototype = new Shape();
	
	p.Shape_inititalize = p.initialize;
	p.vx = 0.0;
	p.vy = 0.0;
	
	
	p.initialize = function(x,y) {
		p.Shape_inititalize();
		this.vx = (Math.random() - .5) * 5;
		this.vy = (Math.random() - .5) * 5;
		this.x = x;
		this.y = y;
		this.graphics.beginFill('#000000');
		this.graphics.drawCircle(0,0,5);	

	}
	
	
	p.update = function() {
		this.x += this.vx;
		this.y += this.vy;
		this.alpha -= .05;
	}
	
	
	namespace.Particle = Particle;
	
})(window.sh);


(function() {
	var stage = new Stage('canvas');
	var particles = [];
	var bitmap = new Bitmap();
	
	
	
	stage.addChild(bitmap);
	
	stage.onMouseMove = mouseMove;
	
	Ticker.useRAF = true;
	Ticker.addListener(render)
	
	function mouseMove(e) {
		var p = new sh.Particle(e.stageX, e.stageY);
		stage.addChild(p);
		particles.push(p)
	}
	
	

	function render(time) {
		var i, l = particles.length;
		var p;
		for(i = 0 ; i < l; ++i ) {
			p = particles[i];
			p.update();
			bitmap.draw(p);
		}
		
		while( --i > -1 ) {
			p = particles[i];
			if(p.alpha <= 0) {
				particles.splice(i,1);
			}
		}
		
		
		
		//console.log(particles.length)
		stage.update();
	} 
	
	
})();





