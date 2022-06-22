class Step{
  constructor(x, y, s, b){
    this.pos = createVector(x, y);
    this.size = s;
    this.life = 550;
    this.count = 0;
    this.dead = false;
    this.foundFood = b;
  }
  show(){
    let c = color('blue');
    if (this.foundFood){
      c = color('red');
    }
    fill(c);
    ellipseMode(CENTER);
    ellipse(this.pos.x, this.pos.y, this.size);
    this.count++;
    if (this.count >= this.life){
      this.dead = true;
    }
  }
  foundFood(){
    return this.foundFood;
  }
}
