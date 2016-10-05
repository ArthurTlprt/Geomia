var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 50;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var light = new THREE.AmbientLight( '#FCD440', 3 );
light.position.set( 100, 0, 0 );
scene.add( light );

var sun_geometry = new THREE.SphereGeometry( 10, 32, 32 );
var sun_material = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture('./images/sunmap.jpg',THREE.SphericalRefractionMapping) });
var sun = new THREE.Mesh( sun_geometry, sun_material );
scene.add( sun );

var earth_geometry = new THREE.SphereGeometry( 2, 32, 32 );
var earth_material = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture('./images/earthmap.jpg',THREE.SphericalRefractionMapping) });
var earth = new THREE.Mesh( earth_geometry, earth_material );
scene.add( earth );

var theta = 0;

var render = function () {
	requestAnimationFrame( render );

	theta += 0.005
	earth.rotation.z += 0.01;
	earth.position.x = 40 * Math.cos(theta);
	earth.position.y = 10 * Math.sin(theta);
	earth.position.z = 30 * Math.sin(theta);

	document.addEventListener('mousemove', onMouseMove, false);
	renderer.render(scene, camera);
};


function onMouseMove(event) {
	var mouseX = event.clientX - window.innerWidth/2;
	var mouseY = event.clientY - window.innerHeight/2;
	camera.position.x += mouseX * 0.06 - camera.position.x;
	camera.position.y += mouseY * 0.06 - camera.position.y;
	camera.lookAt(scene.position);
	console.log(mouseX * 0.06 - camera.position.x);
}
render();
