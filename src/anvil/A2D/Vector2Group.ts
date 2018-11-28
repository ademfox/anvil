import {
  Point,
  Vector2,
} from '../Anvil'

export class Vector2Group {

  public group: Vector2[]

  constructor() { }

  public set(group: Vector2[]) {
    this.group = group
  }

  public add(by: Point): Vector2Group {
    for (let i = 0; i < this.group.length; i++) {
      this.group[i].add(by)
    }
    return this
  }

  public subtract(by: Point): Vector2Group {
    for (let i = 0; i < this.group.length; i++) {
      this.group[i].subtract(by)
    }
    return this
  }

}