import * as pixi from "pixi.js"
import * as game from "./core/game"
import * as sketch from "./app/sketch"

import './style.css'

console.log("pixi.js", pixi.VERSION)

async function setup() {
  try {
    await game.initGame()
    await sketch.setup()

    game.ticker.add(sketch.update, undefined, pixi.UPDATE_PRIORITY.HIGH)
  } catch (error) {
    console.error("Setup error:", error)
  }
}
 
setup().catch(error => console.error("Fatal error:", error))
