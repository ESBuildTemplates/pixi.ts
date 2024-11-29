import * as pixi from "pixi.js"

export const app = new pixi.Application()
export const mouse = new pixi.Point()
export const ticker = pixi.Ticker.shared
export const container = app.stage

// Time management
let lastTickTime = 0
let currentDeltaTime = 0

// Oscillation
let oscillationTime = 0

export async function initGame() {
  await app.init({
    resizeTo: window,
    autoDensity: true,
    antialias: true,
    autoStart: true,
  })

  document.body.appendChild(app.canvas)

  ticker.autoStart = true
  lastTickTime = performance.now()
  
  // Delta time update
  ticker.add(() => {
    if (!ticker.started) return
    const currentTime = performance.now()
    currentDeltaTime = (currentTime - lastTickTime) / 1000
    lastTickTime = currentTime
  }, undefined, pixi.UPDATE_PRIORITY.HIGH)

  // Oscillation update
  ticker.add(() => {
    if (!ticker.started) return
    oscillationTime += currentDeltaTime
  })

  container.eventMode = "static"
  container.hitArea = app.screen
  container.on("mousemove", (event) => {
    mouse.copyFrom(event.global)
  })
}

export async function getAnimatedSprite(
  name: string,
  options: Partial<{
    play: boolean
    loop: boolean
  }> = {},
): Promise<pixi.AnimatedSprite> {
  const texture = await pixi.Assets.load(`assets/sprites/${name}.json`)
  const sprite = new pixi.AnimatedSprite(
    Object.keys(texture.frames).map((key) => pixi.Texture.from(key)),
  )

  sprite.animationSpeed = 15 / 60
  sprite.anchor.set(0.5)
  sprite.visible = true
  sprite.loop = options.loop ?? true

  if (options.play) sprite.play()

  return sprite
}

export async function getSprite(
  name: string,
  edit?: (it: pixi.Sprite) => void,
): Promise<pixi.Sprite> {
  const texture = await pixi.Assets.load(`assets/sprites/${name}.png`)
  const sprite = new pixi.Sprite(texture)
  edit?.(sprite)
  return sprite
}

export function getText(
  text: string,
  style?: Partial<pixi.TextStyle>,
  edit?: (it: pixi.Text) => void,
): pixi.Text {
  const element = new pixi.Text({text, style})
  edit?.(element)
  return element
}

export function resizeAsBackground(sprite: pixi.Sprite | pixi.AnimatedSprite) {
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

export function dist(a: pixi.PointData, b: pixi.PointData): number {
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
 * Returns the time elapsed since the last frame in seconds
 */
export function getDeltaTime(): number {
  return currentDeltaTime
}

/**
 * Crée une oscillation sinusoïdale
 * @param duration Durée en secondes pour un cycle complet (aller-retour)
 * @param amplitude Amplitude en pixels
 * @returns La valeur de l'oscillation à l'instant T
 */
export function getOscillation(duration: number, amplitude: number) {
  // On convertit la durée en fréquence angulaire (2π = un cycle complet)
  const frequency = (Math.PI * 2) / duration
  return Math.sin(oscillationTime * frequency) * amplitude
}

export function pause() {
  ticker.stop()
}

export function play() {
  lastTickTime = performance.now()
  currentDeltaTime = 0
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
