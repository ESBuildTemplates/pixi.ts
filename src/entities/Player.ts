import * as PIXI from "pixi.js"
import * as shooter from "../app/shooter"
import * as keyboard from "../app/keyboard"
import Character from "./Character"

export default class Player extends Character<PIXI.Sprite> {
  id = "player"
  maxSpeed = 10
  acceleration = 1.2
  deceleration = 0.8

  constructor() {
    super(
      shooter.getAnimatedSprite("akuma-ball", {
        loop: false,
        play: false,
      })
    )
    this.sprite.position.set(500, 500)
  }

  update() {
    this.pointTo(keyboard.mouse)

    if (shooter.dist(this.position, shooter.mouse) < this.sprite.width / 2) {
      this.decelerate()
    } else {
      this.accelerate()
    }

    this.move()

    super.update()
  }
}
