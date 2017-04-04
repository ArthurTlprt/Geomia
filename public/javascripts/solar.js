window.onload = function()
{
	planets = [
    new Planet(0, 0, 0, 0, 0, 0, sun, 0.15),
    new Planet(30, 30, 30, 0, 1, 0, earth, 0.05),

  ];
}

var scene = new THREE.Scene();
var textureCube = new THREE.CubeTextureLoader()
.setPath( './images/')
.load( [ 'skymap_posx_1024x1024.jpg', 'skymap_negx_1024x1024.jpg', 'skymap_posy_1024x1024.jpg', 'skymap_negy_1024x1024.jpg', 'skymap_posz_1024x1024.jpg', 'skymap_negz_1024x1024.jpg' ] );

scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 50;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



var light = new THREE.AmbientLight( '#FCD440', 3 );
light.position.set( 100, 0, 0 );
scene.add( light );



var loader = new THREE.TextureLoader();
scene.background = textureCube;

/*
var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( -30, -30, -30);

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add( spotLight );
*/

var controls;


controls = new THREE.OrbitControls( camera );




var sun_geometry = new THREE.SphereGeometry( 10, 32, 32 );
var sun_material = new THREE.MeshPhongMaterial({ map: loader.load('./images/sunmap.jpg',THREE.SphericalRefractionMapping) });
var sun = new THREE.Mesh( sun_geometry, sun_material );
sun.position.x = 0;
sun.position.y = 0;
sun.position.z = 0;
scene.add( sun );

var earth_geometry = new THREE.SphereGeometry( 1, 32, 32 );
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

var markSize = 0.3; // Tweak this to set marker size

var markGeom = new THREE.BoxGeometry(markSize, markSize, markSize, 1, 1, 1);
var markMat = new THREE.MeshBasicMaterial({color: "grey"});

var theta = 0;

controls.autoRotate = false;

// Dessin des 3 axes
//var axisHelper = new THREE.AxisHelper( 5 );
//scene.add( axisHelper );

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


	var marker = new THREE.Mesh(markGeom.clone(), markMat);
    marker.position.copy(earth.position);

    // Display position of earth!
    scene.add(marker);

	for(var i in planets){
		if (Collision(earth, sun)){
		scene.remove(earth);
		delete planets[1];
		console.log("Collision!! ");
	}
      planets[i].update(planets);

    }
    

	//document.addEventListener('mousemove', onMouseMove, false);
	//document.addEventListener('keydown',onDocumentKeyDown,false);

	renderer.autoClear = false;
	renderer.clear();

	//camera.position.set(sun.position.x,camera.position.y,camera.position.z); TODO: reussi a gerer la position de camera par rapport au focus
	controls.target.set(sun.position.x, sun.position.y, sun.position.z); // On vise le soleil par exemple
	renderer.render(scene, camera);
	//controls.update()
};
render();


/*function onDocumentKeyDown(event) {
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
camera.position.y = camera.position.y - delta;
break;
}
}*/


function onMouseMove(event) {
	/*var mouseX = event.clientX - window.innerWidth/2;
	var mouseY = event.clientY - window.innerHeight/2;
	//var mouseZ = event.clientZ - window.innerHeight/2;
	camera.position.x += mouseX * 0.5 - camera.position.x;
	camera.position.y += mouseY * 0.5 - camera.position.y;
	//camera.position.z += mouseZ * 0.06 - camera.position.z;
	camera.lookAt(scene.position);*/
}














