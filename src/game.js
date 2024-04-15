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
    this.load.image("plane", "../images/gamer/biplane.png");
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, true);
    this.background = this.add.image(0, -250, "background").setOrigin(0);
    this.background.setScale(0.5); // Aumenta el tamaño del fondo en un 50%
    this.plane = this.physics.add.image(100, 40, "plane");
    this.plane.setScale(0.1);
    this.plane.body.allowGravity = false;
    this.plane.setVelocity(100, -5);
    this.plane.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.speed = speed_plane;
    this.angleIncrement = 1;
  }

  update() {
    // Mover el fondo
    if (this.plane.body.y <= this.physics.world.bounds.y) {
      this.background.y += 1;
    } else if (
      this.plane.body.y + this.plane.body.height >=
      this.physics.world.bounds.bottom
    ) {
      this.background.y -= 1;
    }

    // Manejar la velocidad y la dirección del avión
    const angle = Phaser.Math.DegToRad(this.plane.angle);

    if (this.cursors.up.isDown) {
      this.plane.angle -= this.angleIncrement;
    } else if (this.cursors.down.isDown) {
      this.plane.angle += this.angleIncrement;
    }

    console.log("plane", this.plane.angle);
    // Reducir la velocidad al subir
    if (this.plane.angle < -55 && this.plane.angle > -145) {
      this.speed -= 0.3;
    } else if (this.plane.angle < -36 && this.plane.angle > -135) {
      this.speed -= 0.1;
    } else {
      this.speed = speed_plane;
    }

    // Calcular las componentes de la velocidad en función del ángulo y establecer la velocidad del avión
    const vx = Math.cos(angle) * this.speed;
    const vy = Math.sin(angle) * this.speed;
    this.plane.setVelocity(vx, vy);
  }
}
