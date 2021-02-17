import * as PIXI from "pixi.js"
import Entity from "./entities/Entity"
import Game from "./scenes/Game"

async function setup() {
  await new Promise((resolve) => {
    PIXI.Loader.shared
      .add("assets/sprites/akuma-ball.json")
      .add("assets/sprites/game-background.png")
      .load(resolve)
  })

  new Game().setup()
}

setup().then(() => {
  PIXI.Ticker.shared.add(
    () => {
      Entity.children.forEach((entity) => {
        if (entity.isSetup && !entity.parent) entity.update()
      })
    },
    undefined,
    PIXI.UPDATE_PRIORITY.HIGH
  )
})
