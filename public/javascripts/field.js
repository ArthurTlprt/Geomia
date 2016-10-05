window.onload = function()
{
  canvas = initCanvas(document);
  context = initContext(document);

  /**
   * Le but est de simuler les forces de coulombs
   * entre des charges oposées
   */

  particules = [
    new Particule(500, 500, 0, -0, '#da3c2b', 0.5),
    new Particule(400, 500, 0, -0, '#da3c2b', 0.5),
    new Particule(500, 400, 0, -0, '#526eae', -0.5),
    new Particule(200, 200, 0, 0, '#526eae', -0.5)
  ];

  var mouse_x, mouse_y;


  function main(){

    context.beginPath();
    context.clearRect(0, 0, canvas.width, canvas.height);

    for(var i in particules){
      particules[i].update(particules);
      particules[i].display(context, canvas);
    }


    setTimeout(main, 15);
  }

  $("body").mousemove(function(e) {
    mouse_x = e.pageX;
    mouse_y = e.pageY;
  })

  main();

}
