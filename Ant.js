class Ant{
  constructor(x, y, s){
    this.pos = createVector(x, y);
    this.size = s;
    this.vel = p5.Vector.random2D();
    this.vel.setMag(100);
    this.acc = createVector();
    this.maxForce = 2;
    this.maxSpeed = 2;
    this.home = createVector(width - width/3, height/2);
    this.hasFood = false;
    this.path = [];
    this.steps = 0;
    this.stepCD = 20;
    this.item = null;
    this.perception = s*25;
    this.temp = [];
  }
  show(){
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading() - radians(-90));
    fill(200, 50);
    ellipseMode(CENTER);
    //ellipse(0, 0, this.perception);
    fill(150);
    triangle(0, -this.size*2, -this.size, this.size, this.size, this.size);
    if (this.item != null){
      ellipseMode(CENTER);
      fill(color('green'));
      ellipse(0, -this.size*2, this.size);
    }
    pop();
  }
  showPath(){
    for (let i = this.path.length -1; i >= 0; i--){
      this.path[i].show();
      if (this.path[i].dead){
        this.path.splice(i, 1);
      }
    }
  }
  walk(){
    if (this.item != null){
      this.goHome();
    }else{
      this.seekFood();
    }
  }
  seekFood(){
    let found = this.checkArea();
    if (found == undefined){
      return;
    }
    if (found == 'food'){
      let item;
      let index = 0;
      let closest = 1000;
      for (let i = foods.length-1; i >= 0; i--){
        let d = dist(this.pos.x, this.pos.y, foods[i].pos.x, foods[i].pos.y);
        if (d < closest && d < this.perception){
          closest = d;
          index = i;
        }
      }
      if (closest < this.size*2){
        this.item = foods[index];
        foods[index].done = true;
        return;
      }else{
        item = foods[index];
        let desired = p5.Vector.sub(item.pos, this.pos);
        desired.limit(this.maxForce);
        this.applyForce(desired);
      }
    }else if (found == 'red'){
      let index = 0;
      let oldest = 0;
      for (let i = 0; i < this.temp.length; i++){
        if (this.temp[i].count > oldest){
          oldest = this.temp[i].count;
          index = i;
        }
      }
      let desired = p5.Vector.sub(this.temp[index].pos, this.pos);
      desired.limit(this.maxForce);
      this.applyForce(desired);
    }
    this.temp = [];
  }
  checkArea(){
    for (let i = foods.length-1; i >=0; i--){
      if (dist(this.pos.x, this.pos.y, foods[i].pos.x, foods[i].pos.y) < this.perception){
        return 'food';
      }
    }
    for (let i = 0; i < ants.length; i++){
      for (let j = ants[i].path.length-1; j >= 0; j--){
        if (ants[i] == this){
          break;
        }
        if (ants[i].path[j].foundFood){
          if (dist(this.pos.x, this.pos.y, ants[i].path[j].pos.x, ants[i].path[j].pos.y) < this.perception){
            this.temp.push(ants[i].path[j]);
          }
        }
      }
    }
    if (this.temp.length >0){
      return 'red';
    }else{
      return undefined;
    }
  }
  goHome(){
    let desired = p5.Vector.sub(this.home, this.pos);
    desired.limit(this.maxForce);
    desired.setMag(this.maxSpeed);
    this.applyForce(desired);
    if (dist(this.pos.x, this.pos.y, this.home.x, this.home.y) < this.size*2){
      this.item = null;
    }
  }
  update(){
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.acc.mult(0);
    if (this.pos.x < this.size || this.pos.x > width-this.size){
      this.vel.x *= -1;
    }
    if (this.pos.y < this.size || this.pos.y > height-this.size){
      this.vel.y *= -1;
    }
    this.takeStep();
  }
  takeStep(){
    this.steps++;
    if (this.steps >= this.stepCD){
      if (this.item != null){
        this.path.push(new Step(this.pos.x, this.pos.y, this.size * 0.75, true));
      }else{
        this.path.push(new Step(this.pos.x, this.pos.y, this.size * 0.75, false));
      }
      this.steps = 0;
    }
  }
  applyForce(force){
    this.acc.add(force);
  }
}



