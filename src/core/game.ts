import * as PIXI from "pixi.js"

export const app = new PIXI.Application({
  resizeTo: window,
})

export const mouse: PIXI.Point = app.renderer.plugins.interaction.mouse.global

export const ticker = PIXI.Ticker.shared
export const loader = PIXI.Loader.shared

export const container = app.stage

document.body.appendChild(app.view)

export function getAnimatedSprite(
  name: string,
  options: Partial<{
    play: boolean
    loop: boolean
  }> = {}
): PIXI.AnimatedSprite {
  const resource = PIXI.Loader.shared.resources[`assets/sprites/${name}.json`]
  const sprite = new PIXI.AnimatedSprite(Object.values(resource.textures ?? {}))
  sprite.animationSpeed = 15 / 60
  sprite.anchor.set(0.5)
  sprite.visible = true
  if (options.play) sprite.play()
  sprite.loop = options.loop ?? true
  return sprite
}

export function getSprite(
  name: string,
  edit?: (it: PIXI.Sprite) => void
): PIXI.Sprite {
  const resource = PIXI.Loader.shared.resources[`assets/sprites/${name}.png`]
  const sprite = new PIXI.Sprite(resource.texture)
  edit?.(sprite)
  return sprite
}

export function getText(
  text: string,
  style?: Partial<PIXI.ITextStyle>,
  edit?: (it: PIXI.Text) => void
): PIXI.Text {
  const element = new PIXI.Text(text, style)
  edit?.(element)
  return element
}

export function resizeAsBackground(sprite: PIXI.Sprite | PIXI.AnimatedSprite) {
  const { innerWidth, innerHeight } = window

  const ratio = sprite.width / sprite.height
  const clientRatio = innerWidth / innerHeight

  if (clientRatio > ratio) {
    sprite.height /= sprite.width / innerWidth
    sprite.width = innerWidth
    sprite.position.x = 0
    sprite.position.y = (innerHeight - sprite.height) / 2
  } else {
    sprite.width /= sprite.height / innerHeight
    sprite.height = innerHeight
    sprite.position.y = 0
    sprite.position.x = (innerWidth - sprite.width) / 2
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

export function getWidth(): number {
  return window.innerWidth
}

export function getHeight(): number {
  return window.innerHeight
}

/**
 *
 * @param speed from 0 (motionless) to 1 (normal)
 * @param amplitude in pixel
 */
export function getOscillation(speed: number, amplitude: number) {
  // fixme: delta not works?
  return (
    Math.sin((ticker.lastTime / 100) * speed) * amplitude * ticker.deltaTime
  )
}

export function pause() {
  ticker.stop()
}

export function play() {
  ticker.start()
}

export function isPaused() {
  return !ticker.started
}

export function debugTime() {
  console.table({
    elapsedMS: ticker.elapsedMS,
    lastTime: ticker.lastTime,
    deltaTime: ticker.deltaTime,
    deltaMS: ticker.deltaMS,
  })
}
