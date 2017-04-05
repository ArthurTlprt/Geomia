window.onload = function()
{
	planets = [
    new Planet(0, 0, 0, 0, 0, 0, sun, 0.15),
    new Planet(30, 30, 30, 0, 1, 0, containerEarth, 0.05),

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


// lumière globale
var light	= new THREE.AmbientLight( 0x222222 )
scene.add( light )

var light	= new THREE.DirectionalLight( 0xffffff, 1 )
light.position.set(5,5,5)
scene.add( light )
	light.castShadow	= true
	light.shadow.cameraNear	= 0.01
	light.shadow.cameraFar	= 15
	light.shadow.cameraFov	= 45
	light.shadow.cameraLeft	= -1
	light.shadow.cameraRight	=  1
	light.shadow.cameraTop	=  1
	light.shadow.cameraBottom= -1
	light.shadow.bias	= 0.001
	light.shadow.darkness	= 0.2
	light.shadow.mapWidth	= 1024
	light.shadow.mapHeight	= 1024


var loader = new THREE.TextureLoader();
scene.background = textureCube;
var onRenderFcts= [];

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

/*
var earth_geometry   = new THREE.SphereGeometry(1, 32, 32);
var textureloader = new THREE.TextureLoader();
var earth_material  = new THREE.MeshPhongMaterial();
var earth = new THREE.Mesh( earth_geometry, earth_material );
earth.material.map    = textureloader.load('./images/earth_map_2048x1024.jpg');
earth.material.bumpMap    = textureloader.load('./images/earth_bump_2048x1024.jpg');
earth.material.bumpScale = 0.05
earth.material.specularMap = textureloader.load('./images/earth_specular_2048x1024.jpg');
earth.material.specular  = new THREE.Color('grey');
earth.receiveShadow	= true;
earth.castShadow	= true;
scene.add(earth);
*/

	var containerEarth	= new THREE.Object3D()
	containerEarth.rotateZ(-23.4 * Math.PI/180)
	containerEarth.position.x = 30;
	containerEarth.position.y = 30;
	containerEarth.position.z = 30;
	scene.add(containerEarth)
	
	var earth	= THREEx.Planets.createEarth()

	earth.receiveShadow	= true
	earth.castShadow	= true
	containerEarth.add(earth)

	onRenderFcts.push(function(delta, now){
		earth.rotation.y += 1/32 * delta;		
	})
	var geometry	= new THREE.SphereGeometry(1, 32, 32)
	var material	= THREEx.createAtmosphereMaterial()
	material.uniforms.glowColor.value.set(0x00b3ff)
	material.uniforms.coeficient.value	= 0.8
	material.uniforms.power.value		= 2.0
	var mesh	= new THREE.Mesh(geometry, material );
	mesh.scale.multiplyScalar(1.01);

	containerEarth.add( mesh );


	var geometry	= new THREE.SphereGeometry(1, 32, 32)
	var material	= THREEx.createAtmosphereMaterial()
	material.uniforms.glowColor.value.set(0x00b3ff)
	material.uniforms.coeficient.value	= 0.8
	material.uniforms.power.value		= 2.0
	var mesh	= new THREE.Mesh(geometry, material );

	containerEarth.add( mesh );
	// new THREEx.addAtmosphereMaterial2DatGui(material, datGUI)
	var geometry	= new THREE.SphereGeometry(1, 32, 32)
	var material	= THREEx.createAtmosphereMaterial()
	material.side	= THREE.BackSide
	material.uniforms.glowColor.value.set(0x00b3ff)
	material.uniforms.coeficient.value	= 0.5
	material.uniforms.power.value		= 4.0
	var mesh	= new THREE.Mesh(geometry, material );
	mesh.scale.multiplyScalar(1.15);
    
	containerEarth.add( mesh );
	// new THREEx.addAtmosphereMaterial2DatGui(material, datGUI)
	var earthCloud	= THREEx.Planets.createEarthCloud()
	earthCloud.receiveShadow	= true
	earthCloud.castShadow	= true
	containerEarth.add(earthCloud)
	onRenderFcts.push(function(delta, now){
		earthCloud.rotation.y += 1/8 * delta;		
	})






/*
var earth_geometry = new THREE.SphereGeometry( 1, 32, 32 );
var earth_material = new THREE.MeshPhongMaterial({ map: loader.load('./images/earthmap.jpg',THREE.SphericalRefractionMapping) });
var earth = new THREE.Mesh( earth_geometry, earth_material );
earth.position.x = 30;
earth.position.y = 30;
earth.position.z = 30;
scene.add( earth );
*/

//var moon_geometry = new THREE.SphereGeometry( 2, 32, 32 );
//var moon_material = new THREE.MeshPhongMaterial({ map: loader.load('./images/earthmap.jpg',THREE.SphericalRefractionMapping) });
//var moon = new THREE.Mesh( moon_geometry, moon_material );
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
    marker.position.copy(containerEarth.position);

    // Display position of earth!
    scene.add(marker);

	for(var i in planets){

		// TODO: collision
		//if (Collision(containerEarth, sun)){
		//scene.remove(earth);
		//delete planets[1];
		//console.log("Collision!! ");
		//}

      planets[i].update(planets);


    }
    

	renderer.autoClear = false;
	renderer.clear();

	//camera.position.set(sun.position.x,camera.position.y,camera.position.z); TODO: reussi a gerer la position de camera par rapport au focus
	controls.target.set(containerEarth.position.x, containerEarth.position.y, containerEarth.position.z); // On vise le soleil par exemple
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
