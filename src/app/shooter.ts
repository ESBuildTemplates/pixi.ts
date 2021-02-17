import * as PIXI from "pixi.js"

export const app = new PIXI.Application({
  resizeTo: window,
})

document.body.appendChild(app.view)

export function getAnimatedSprite(
  name: string,
  options: Partial<{
    play: boolean
    loop: boolean
  }> = {}
): PIXI.AnimatedSprite {
  const resource = PIXI.Loader.shared.resources[`assets/sprites/${name}.json`]
  const sprite = new PIXI.AnimatedSprite(Object.values(resource.textures))
  sprite.animationSpeed = 15 / 60
  sprite.anchor.set(0.5)
  sprite.visible = true
  if (options.play) sprite.play()
  sprite.loop = options.loop
  return sprite
}

export function getSprite(name: string): PIXI.Sprite {
  const resource = PIXI.Loader.shared.resources[`assets/sprites/${name}.png`]
  return new PIXI.Sprite(resource.texture)
}

export function listenInteraction(
  callback: (event: PIXI.InteractionEvent) => unknown
) {
  return callback
}

export function resizeAsBackground(sprite: PIXI.Sprite | PIXI.AnimatedSprite) {
  const { clientWidth, clientHeight } = document.body

  const ratio = sprite.width / sprite.height
  const clientRatio = clientWidth / clientHeight

  if (clientRatio > ratio) {
    sprite.height /= sprite.width / clientWidth
    sprite.width = clientWidth
    sprite.position.x = 0
    sprite.position.y = (clientHeight - sprite.height) / 2
  } else {
    sprite.width /= sprite.height / clientHeight
    sprite.height = clientHeight
    sprite.position.y = 0
    sprite.position.x = (clientWidth - sprite.width) / 2
  }
}

export function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

export function toDegrees(radians: number): number {
  return radians * (180 / Math.PI)
}

export function dist(a: PIXI.IPointData, b: PIXI.IPointData): number {
  const c = a.x - b.x
  const d = a.y - b.y
  return Math.sqrt(c * c + d * d)
}

export const mouse: PIXI.Point = app.renderer.plugins.interaction.mouse.global
