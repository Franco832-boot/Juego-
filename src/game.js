var speed_plane = 100;
var angles = 1;
let background;
var balas;
var tiempo_de_balas;
export class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }

  preload() {
    this.load.image("background", "../images/background/Background.png");
    this.load.spritesheet("planeSprite", "../images/gamer/biplane_frime.png", {
      frameWidth: 1200,
      frameHeight: 654,
    });
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, true);
    this.background = this.add.image(0, -250, "background").setOrigin(0);
    this.background.setScale(0.5);
    this.plane = this.physics.add.sprite(100, 40, "planeSprite");
    this.plane.setScale(0.1);
    this.plane.body.allowGravity = false;
    this.plane.setVelocity(100, 0);
    this.plane.setCollideWorldBounds(true);

    this.anims.create({
      key: "planeAnimation",
      frames: this.anims.generateFrameNumbers("planeSprite", {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.cursors = this.input.keyboard.createCursorKeys();
    this.speed = speed_plane;

    this.angleIncrement = 1;
  }

  update() {
    if (this.plane.body.y <= this.physics.world.bounds.y) {
      this.background.y += 1;
    } else if (
      this.plane.body.y + this.plane.height >=
      this.physics.world.bounds.bottom
    ) {
      this.background.y -= 1;
    }

    const angle = Phaser.Math.DegToRad(this.plane.angle);

    if (this.cursors.up.isDown) {
      this.plane.angle -= this.angleIncrement;
    } else if (this.cursors.down.isDown) {
      this.plane.angle += this.angleIncrement;
    }

    if (this.plane.angle < -55 && this.plane.angle > -145) {
      this.speed -= 0.3;
    } else if (this.plane.angle < -36 && this.plane.angle > -135) {
      this.speed -= 0.1;
    } else {
      this.speed = speed_plane;
    }

    const vx = Math.cos(angle) * this.speed;
    const vy = Math.sin(angle) * this.speed;
    console.log("vx", vx, vy);
    this.plane.setVelocity(vx, vy);

    this.plane.anims.play("planeAnimation", true);
  }
}
