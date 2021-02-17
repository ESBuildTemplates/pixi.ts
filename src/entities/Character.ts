import * as PIXI from "pixi.js"
import * as shooter from "../app/shooter"
import Entity from "./Entity"

export default abstract class Character<
  Sprite extends PIXI.Sprite | PIXI.AnimatedSprite =
    | PIXI.Sprite
    | PIXI.AnimatedSprite
> extends Entity<Sprite> {
  abstract maxSpeed: number
  abstract acceleration: number
  abstract deceleration: number

  speed = 0
  angle = 0

  get velocity(): PIXI.IPointData {
    return {
      x: this.speed * Math.cos(shooter.toRadians(this.angle)),
      y: this.speed * Math.sin(shooter.toRadians(this.angle)),
    }
  }

  get position(): PIXI.IPointData {
    return this.sprite.getGlobalPosition()
  }

  get radius(): number {
    return this.sprite.width / 2
  }

  pointTo(point: PIXI.IPointData): this {
    this.angle = this.angleTo(point)
    return this
  }

  applyAngle(): this {
    this.sprite.angle = this.angle
    return this
  }

  accelerate(): this {
    if (this.speed === 0) this.speed = 1
    this.speed *= this.acceleration
    if (this.speed > this.maxSpeed) this.speed = this.maxSpeed
    return this
  }

  decelerate(): this {
    if (this.speed < 1) this.speed = 0
    else this.speed *= this.deceleration
    return this
  }

  follow(point: PIXI.IPointData): this {
    this.pointTo(point)
    if (this.distanceTo(point) < 0) {
      this.decelerate()
    } else {
      this.accelerate()
    }
    return this.move()
  }

  followCharacter(character: Character): this {
    this.pointTo(character.position)
    if (this.distanceToCharacter(character) < 0) {
      // this.collisionToCharacter(character)
      this.speed = 0
    } else {
      this.accelerate()
    }
    return this.move()
  }

  distanceTo(point: PIXI.IPointData): number {
    return shooter.dist(this.position, point) - this.radius
  }

  distanceToCharacter(character: Character): number {
    return (
      shooter.dist(this.position, character.position) -
      character.radius -
      this.radius
    )
  }

  collisionToCharacter(character: Character): this {
    return this
  }

  angleTo(point: PIXI.IPointData): number {
    const position = this.position
    const delta_x = point.x - position.x
    const delta_y = point.y - position.y
    return shooter.toDegrees(Math.atan2(delta_y, delta_x))
  }

  move(): this {
    const velocity = this.velocity
    this.sprite.position.x += velocity.x
    this.sprite.position.y += velocity.y
    return this
  }
}
