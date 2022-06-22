class Food{
  constructor(x, y, s){
    this.pos = createVector(x, y);
    this.size = s;
    this.done = false;
  }
  show(){
    ellipseMode(CENTER);
    fill(color('green'));
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}
