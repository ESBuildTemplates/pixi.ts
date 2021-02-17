import * as PIXI from "pixi.js"
import * as shooter from "../app/shooter"

export default abstract class Entity<
  Sprite extends PIXI.Sprite | PIXI.AnimatedSprite =
    | PIXI.Sprite
    | PIXI.AnimatedSprite
> extends PIXI.utils.EventEmitter {
  static children: Set<Entity> = new Set()

  children: Set<Entity> = new Set()
  parent?: Entity
  id: string | number = null

  private readonly _sprite: Sprite
  private _isSetup: boolean = false

  protected constructor(sprite: Sprite, setup?: boolean) {
    super()
    this._sprite = sprite
    this.on("update", () => {})
    if (setup) this.setup()
  }

  get sprite(): Sprite {
    return this._sprite
  }

  get isSetup(): boolean {
    return this._isSetup
  }

  get container(): PIXI.Container {
    return this.parent ? this.parent.sprite : shooter.app.stage
  }

  setup() {
    this.emit("setup")
    this.container.addChild(this._sprite)
    Entity.children.add(this)
    this.id = Entity.children.size
    this._isSetup = true
  }

  update() {
    this.emit("update")
    this.children.forEach((child) => child.update())
  }

  destroy() {
    this._isSetup = false
    this.container.removeChild(this._sprite)
    Entity.children.delete(this)
    this._sprite.removeChildren()
    this.children.forEach((child) => child.destroy())
    this.emit("destroy")
  }

  addChild(entity: Entity, setup?: boolean) {
    entity.parent = this
    this.children.add(entity)
    if (setup) entity.setup()
  }

  removeChild(entity: Entity, destroy?: boolean) {
    entity.parent = null
    this.children.delete(entity)
    if (destroy) entity.destroy()
  }

  static find<T extends Entity>(id: string | number): T {
    return [...this.children].find((entity) => entity.id === id) as T
  }
}
