import * as PIXI from "pixi.js"
import Character from "./Character"
import Player from "./Player"

export default abstract class Enemy<
  Sprite extends PIXI.Sprite | PIXI.AnimatedSprite =
    | PIXI.Sprite
    | PIXI.AnimatedSprite
> extends Character<Sprite> {
  // todo : implement a rea pattern like RPG Maker, The binding of Isaac
  abstract pattern: (() => {})[]
}
