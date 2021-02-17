import Entity from "../entities/Entity"
import * as PIXI from "pixi.js"

export default abstract class Scene<
  Sprite extends PIXI.Sprite | PIXI.AnimatedSprite =
    | PIXI.Sprite
    | PIXI.AnimatedSprite
> extends Entity<Sprite> {}
