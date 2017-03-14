window.onload = function()
{
	planets = [
    new Planet(0, 0, 0, 0, 0, 0, sun, 0.15),
    new Planet(30, 30, 30, 0, 1, 0, earth, 0.05),

  ];
}

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 50;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var light = new THREE.AmbientLight( '#FCD440', 3 );
light.position.set( 100, 0, 0 );
scene.add( light );

var loader = new THREE.TextureLoader();
var sun_geometry = new THREE.SphereGeometry( 10, 32, 32 );
var sun_material = new THREE.MeshPhongMaterial({ map: loader.load('./images/sunmap.jpg',THREE.SphericalRefractionMapping) });
var sun = new THREE.Mesh( sun_geometry, sun_material );
sun.position.x = 0;
sun.position.y = 0;
sun.position.z = 0;
scene.add( sun );

var earth_geometry = new THREE.SphereGeometry( 2, 32, 32 );
var earth_material = new THREE.MeshPhongMaterial({ map: loader.load('./images/earthmap.jpg',THREE.SphericalRefractionMapping) });
var earth = new THREE.Mesh( earth_geometry, earth_material );
earth.position.x = 30;
earth.position.y = 30;
earth.position.z = 30;
scene.add( earth );

var moon_geometry = new THREE.SphereGeometry( 2, 32, 32 );
var moon_material = new THREE.MeshPhongMaterial({ map: loader.load('./images/earthmap.jpg',THREE.SphericalRefractionMapping) });
var moon = new THREE.Mesh( moon_geometry, moon_material );
//scene.add( moon );

var theta = 0;

function Collision(S1, S2) {
   var d2 = (S1.position.x-S2.position.x)*(S1.position.x-S2.position.x) + (S1.position.y-S2.position.y)*(S1.position.y-S2.position.y) + (S1.position.z-S2.position.z)*(S1.position.z-S2.position.z);
   if (d2 > (S1.geometry.vertices[0].y + S2.geometry.vertices[0].y)*(S1.geometry.vertices[0].y + S2.geometry.vertices[0].y)) {
      return false;
    } else {
      return true;
    }
}

var render = function () {
	requestAnimationFrame( render );

	//theta += 0.005
	/*
	earth.rotation.z += 0.01;
	earth.position.x = 40 * Math.cos(theta);
	earth.position.y = 10 * Math.sin(theta);
	earth.position.z = 30 * Math.sin(theta);

	moon.rotation.z += 0.01;
	moon.position.x = 60 * Math.cos(theta);
	moon.position.y = 30 * Math.sin(theta);
	moon.position.z = 50 * Math.sin(theta);
	*/

	if (Collision(earth, sun)){
		scene.remove(earth);
		delete planets[1];
		console.log("Collision!! ");
	}

	for(var i in planets){
      planets[i].update(planets);
    }

	document.addEventListener('mousemove', onMouseMove, false);
	document.addEventListener('keydown',onDocumentKeyDown,false);
	renderer.render(scene, camera);
};

function onDocumentKeyDown(event) {
	var delta = 5;
	var keycode = event.keyCode;
	switch(keycode){
case 37 : //left arrow
camera.position.x = camera.position.x - delta;
break;
case 38 : // up arrow
camera.position.z = camera.position.z - delta;
break;
case 39 : // right arrow
camera.position.x = camera.position.x + delta;
break;
case 40 : //down arrow
camera.position.z = camera.position.z + delta;
break;
case 90 : //z 
camera.position.y = camera.position.y + delta;
break;
case 83 : //s
camera.position.y = camera.position.y + delta;
break;
}
}



function onMouseMove(event) {
	var mouseX = event.clientX - window.innerWidth/2;
	var mouseY = event.clientY - window.innerHeight/2;
	//var mouseZ = event.clientZ - window.innerHeight/2;
	camera.position.x += mouseX * 0.5 - camera.position.x;
	camera.position.y += mouseY * 0.5 - camera.position.y;
	//camera.position.z += mouseZ * 0.06 - camera.position.z;
	camera.lookAt(scene.position);
}
render();
