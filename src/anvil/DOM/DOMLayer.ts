import {
  Vector2,
} from '../Anvil'

export class Layer {

  element: HTMLElement

  position: Vector2

  constructor() {
    this.position = new Vector2
  }

  public initialize(): Layer {
    this.position = new Vector2
    return this
  }

}