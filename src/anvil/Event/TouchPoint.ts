import {
  Vector2,
} from '../Anvil'

export class TouchPoint {

  public isDown: boolean = false
  public isMoving: boolean = false

  public acceleration: Vector2
  public position: Vector2
  public velocity: Vector2

  constructor() {
    this.position = new Vector2
    this.velocity = new Vector2
    this.acceleration = new Vector2
  }

}