class Planet {

  constructor(x0, y0, z0, vx0, vy0, vz0, mesh, m) {
    this.x = x0;
    this.y = y0;
    this.z = z0;

    this.vx = vx0;
    this.vy = vy0;
    this.vz = vz0;

    this.ax = 0;
    this.ay = 0;
    this.az = 0;

    this.forces = [];
    this.mesh = mesh;
    this.m = m;

    this.ke = 6.67*10^(-11);

  }

  updateForces(planets){
    this.forces = [];
    var dist = 0;
    for(var i in planets){
      if(this != planets[i]){
        dist = Math.pow( this.x - planets[i].x, 2) + Math.pow( this.y - planets[i].y, 2);
        if(dist == 0){ dist = 0.00001 };
        this.forces.push(
          {x: (this.ke * this.m * planets[i].m * (this.x - planets[i].x))/dist,
           y: (this.ke * this.m * planets[i].m * (this.y - planets[i].y))/dist,
           z: (this.ke * this.m * planets[i].m * (this.z - planets[i].z))/dist });
      }
    }
  }

  update(planets){
    this.updateForces(planets);
    // update des accélérations
    this.ax = 0;
    this.ay = 0;
    this.az = 0;
    for(var i in this.forces){
      this.ax += this.forces[i].x;
      this.ay += this.forces[i].y;
      this.az += this.forces[i].z;
    }
    // update des vitesses
    this.vx += this.ax;
    this.vy += this.ay;
    this.vz += this.az;
    // update des positions
    this.x += this.vx;
    this.y += this.vy;
    this.z += this.vz;

    this.mesh.position.x = this.x;
    this.mesh.position.y = this.y;
    this.mesh.position.z = this.z;
  }

 


}
