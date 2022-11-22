class Canvas {

  constructor(ctx, x, y, r, dx, dy, color) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.mouseX = 0;
    this.mouseY = 0;
    this.color = color;
    this.maxCircle = 35;
    this.distance = 100;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  update(mouseX, mouseY) {
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
    if (
        mouseX - this.x < this.distance &&
        mouseX - this.x > -this.distance &&
        mouseY - this.y < this.distance &&
        mouseY- this.y > -this.distance
    ) {
      if (this.r < this.maxCircle) {
        this.r++;
      }
    } else {
      if (this.r > 0) this.r--;
    }
    this.draw();
  }

}

class MouseDraw {

  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.x = window.innerWidth / 2;
    this.y = window.innerHeight / 2;
    this.mouseX = 0;
    this.mouseY = 0;
    this.r = 5; // BÁN KÍNH
    this.dx = 0;
    this.dy = 0;
    this.arrays = [];
    this.arrayColor = ['#E14D2A','#FD841F','#3E6D9C','#001253'];
    this.fps = 60; // SET FPS
    this.isMouseOut = false;
  }

  drawCircle() {
    this.clear();
    if (!this.isMouseOut) {
      let dx = (Math.random() - 0.5) * 5;
      let dy = (Math.random() - 0.5) * 5;
      this.arrays.push(
        new Canvas(
          this.ctx,
          this.mouseX,
          this.mouseY,
          this.r,
          dx,
          dy,
          this.randomcolor()
        )
      );
    }
    for (let i = 0; i < this.arrays.length; i++) {
      if (this.arrays[i].r == 0) this.arrays.splice(i, 1); // REMOVE khi bán kính về 0
      this.arrays[i].update(this.mouseX, this.mouseY); // CẬP NHẬT
    }
  }

  randomcolor = function () {
    // var o = Math.round,
    //   r = Math.random,
    //   s = 255;
    // return (
    //   "rgba(" +
    //   o(r() * s) +
    //   "," +
    //   o(r() * s) +
    //   "," +
    //   o(r() * s) +
    //   "," +
    //   r().toFixed(1) +
    //   ")"
    // );
    return this.arrayColor[Math.floor(Math.random() * this.arrayColor.length)]
  }

  clear() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
  
  mouseMouse(){
    window.addEventListener('mousemove', (event) =>{
        this.mouseX = event.x;
        this.mouseY = event.y;
        this.isMouseOut = false;
    })
  }

  mouseOut(){
    window.addEventListener('mouseout', (event) =>{
        this.isMouseOut = true;
    })
  }

  run() {
    this.mouseMouse();
    this.mouseOut();
    setInterval(() => {
      this.drawCircle();
    }, 1000 / this.fps);
  }

}

var mouseDraw = new MouseDraw();
mouseDraw.run();
