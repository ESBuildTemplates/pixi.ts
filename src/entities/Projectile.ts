import * as PIXI from "pixi.js"
import Character from "./Character"

export abstract class Projectile<
  Sprite extends PIXI.Sprite | PIXI.AnimatedSprite =
    | PIXI.Sprite
    | PIXI.AnimatedSprite
> extends Character<Sprite> {}
