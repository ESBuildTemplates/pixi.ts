import * as pixi from "pixi.js"

export const keys = new Set<Key>()

class Key extends pixi.EventEmitter {
  private _isPressed: boolean = false
  private _pressedAt: number = 0

  constructor(public readonly id: string | number) {
    super()
    keys.add(this)
  }

  handle(event: KeyboardEvent, action: "up" | "down") {
    this.emit(action, event, this.duration)
    if (action === "down") {
      this._isPressed = true
      this._pressedAt = Date.now()
    } else {
      this._isPressed = false
    }
  }

  get duration(): number {
    if (!this._isPressed) return 0
    return Date.now() - this._pressedAt
  }

  get isPressed(): boolean {
    return this._isPressed
  }

  isMineEvent(event: KeyboardEvent): boolean {
    if (typeof this.id === "string") return event.key === this.id
    return event.keyCode === this.id
  }
}

//=> https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key#r%C3%A9sultat

export const up = new Key("ArrowUp")
export const left = new Key("ArrowLeft")
export const right = new Key("ArrowRight")
export const down = new Key("ArrowDown")
export const space = new Key(" ")

document.addEventListener("keydown", (event) => {
  keys.forEach((key) => {
    if (key.isMineEvent(event)) key.handle(event, "down")
  })
})

document.addEventListener("keyup", (event) => {
  keys.forEach((key) => {
    if (key.isMineEvent(event)) key.handle(event, "up")
  })
})
