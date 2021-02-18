import * as PIXI from "pixi.js"
import * as game from "../core/game"

let hello: PIXI.Sprite

/**
 * After resources is loaded, setup your Game
 */
export async function setup() {
  hello = game.getSprite("hello")
  game.app.stage.addChild(hello)
}

/**
 * Called for each Game tick
 */
export async function update() {
  const oscillation = Math.sin(Date.now() / 100) * 10
  hello.position.set(game.getWidth() / 2, game.getHeight() / 2 + oscillation)
}
