import * as PIXI from "pixi.js"
import * as game from "../core/game"

let hello: PIXI.Sprite, button: PIXI.Text

/**
 * After resources is loaded, setup your Game
 */
export async function setup() {
  // make hello world text
  hello = game.getSprite("hello", (it) => {
    it.anchor.set(0.5)
    it.position.set(game.getWidth() / 2, game.getHeight() / 2)
  })

  // make pause button
  button = game.getText(
    "⏯",
    { fontSize: game.getHeight() * 0.15, fill: 0xffffff },
    (it) => {
      it.anchor.set(0.5)
      it.position.set(game.getWidth() / 2, game.getHeight() * 0.6)

      // activate button behaviors
      it.interactive = true
      it.buttonMode = true
      it.on("pointertap", () => {
        if (game.isPaused()) game.play()
        else game.pause()
      })
    }
  )

  // add to scene
  game.container.addChild(hello, button)
}

/**
 * Called for each Game tick
 */
export async function update() {
  hello.position.y = game.getHeight() / 2 + game.getOscillation(1, 10)
  button.position.y = game.getHeight() * 0.6 + game.getOscillation(1, 5)
}
