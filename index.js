import { Game } from "./src/game.js";

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 500,
  scene: [Game],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 400 },
      debug: false,
    },
  },
};

var game = new Phaser.Game(config);
