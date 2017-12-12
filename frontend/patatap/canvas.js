var circles = [];

function onKeyDown(event) {
  var maxPoint = new Point(view.size.width, view.size.height);
  var randomPoint = new Point.random();
  var point = maxPoint * randomPoint;
  var newCircle = new Path.Circle(point, 500);
  newCircle.fillColor = keyData[event.key].color;
  keyData[event.key].sound.play();

  circles.push(newCircle);
}


function onFrame(event) {
  circles.forEach(function(circle) {
    circle.fillColor.hue += 1;
    circle.scale(.9);
  });

  circles.filter(function(circle) {
    return circle.area < 1;
  }).forEach(function(circle) {
    circle.remove();
  });
  
  circles = circles.filter(function(circle) {
    return circle.area >= 1;
  });
}
