let ants;
let foods;
let size;
function setup() {
  createCanvas(windowWidth, windowHeight);
  size = 5;
  ants = [];
  for (let i = 0; i < 20; i++){
    ants.push(new Ant(width/2, height/2, size));
  }
  foods = [];
}

function draw() {
  background(220);
  for (let i = 0; i < foods.length; i++){
    foods[i].show();
    if (foods[i].done){
      foods.splice(i, 1);
    }
  }
  for (let i = 0; i < ants.length; i++){
    ants[i].showPath();
    ants[i].show();
    ants[i].update();
    ants[i].walk();
  }
}

function mouseClicked(){
  if (foods.length > 300){
    return;
  }
  let r = 100;
  for (let i = 0; i < 100; i++){
    let x = random(-r, r) + mouseX;
    let y = random(-r, r) + mouseY;
    if (x < 0){
      x = 0;
    }else if (x > width){
      x = width;
    }
    if (y < 0){
      y = 0;
    }else if (y > height){
      y = height;
    }
    foods.push(new Food(x, y, size));
  }
}

