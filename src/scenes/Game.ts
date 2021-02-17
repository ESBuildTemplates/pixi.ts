import * as PIXI from "pixi.js"
import * as shooter from "../app/shooter"
import Scene from "./Scene"
import AkumaBall from "../entities/AkumaBall"
import Player from "../entities/Player"

export default class Game extends Scene<PIXI.Sprite> {
  id = "game"
  player: Player
  akumaBall: AkumaBall

  constructor() {
    super(shooter.getSprite("game-background"))

    this.player = new Player()

    this.akumaBall = new AkumaBall({
      position: new PIXI.Point(50, 300),
    })

    this.addChild(this.player, true)
    this.addChild(this.akumaBall, true)

    // @ts-ignore
    window.game = this
  }

  update() {
    super.update()
    shooter.resizeAsBackground(this.sprite)
  }
}
