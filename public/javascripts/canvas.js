function initCanvas(document){
  var canvas = document.getElementById('mon_canvas');
  if(!canvas)
  {
    alert("Impossible de récupérer le canvas");
    return;
  }
  return canvas;
}
function initContext(document){
  var canvas = initCanvas(document);
  var context = canvas.getContext('2d');
  if(!context)
  {
    alert("Impossible de récupérer le context du canvas");
    return;
  }
  return context;
}
