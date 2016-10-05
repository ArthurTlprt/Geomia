class Particule {

  constructor(x0, y0, vx0, vy0, color, q) {
    this.x = x0;
    this.y = y0;

    this.vx = vx0;
    this.vy = vy0;

    this.ax = 0;
    this.ay = 0;

    this.forces = [];
    this.color = color;
    this.q = q;

    this.ke = 10;

  }

  updateForces(particules){
    this.forces = [];
    var dist = 0;
    for(var i in particules){
      if(this != particules[i]){
        dist = Math.pow( this.x - particules[i].x, 2) + Math.pow( this.y - particules[i].y, 2);
        if(dist == 0){ dit = 0.00001 };
        this.forces.push(
          {x: (this.ke * this.q * particules[i].q * (this.x - particules[i].x))/dist,
           y: (this.ke * this.q * particules[i].q * (this.y - particules[i].y))/dist });
      }
    }
  }

  update(particules){
    this.updateForces(particules);
    // update des accélérations
    this.ax = 0;
    this.ay = 0;
    for(var i in this.forces){
      this.ax += this.forces[i].x;
      this.ay += this.forces[i].y;
    }
    // update des vitesses
    this.vx += this.ax;
    this.vy += this.ay;
    // update des positions
    this.x += this.vx;
    this.y += this.vy;
  }

  display(context, canvas){
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, 5, 0, 2*Math.PI, true);
    context.fill();
    context.closePath();
  }
}
