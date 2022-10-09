import * as PIXI from "pixi.js"
import * as game from "./core/game"
import * as sketch from "./app/sketch"

async function setup() {
  await new Promise((resolve) => {
    game.loader
      // .add("assets/sprites/animation.json")
      .add("assets/sprites/hello.png")
      .load(resolve)
  })

  await sketch.setup()

  game.ticker.add(sketch.update, undefined, PIXI.UPDATE_PRIORITY.HIGH)
}

setup().catch()
