import {
  Angle,
  Num,
  Point,
} from '../Anvil'

export class Vector2 {

  public x: number = 0
  public y: number = 0

  constructor(...args) {
    this.setPoint(...args)
    return this
  }

  public setPoint(x?: number | Point, y?: number) {
    if (
      typeof x === 'number' &&
      typeof y === 'number'
    ) {
      this.x = x
      this.y = y
    } else if (typeof x === 'undefined') {
      this.x = 0
      this.y = 0
    } else {
      this.equals(<Point>x)
    }
    return this
  }

  public setMagnitude(mag: number): Vector2 {
    this
      .normalize()
      .multiply(mag)
    return this
  }

  public equals(point: Point): Vector2 {
    this.x = point.x
    this.y = point.y
    return this
  }

  public isEqualTo(point: Point): boolean {
    if (
      this.x === point.x &&
      this.y === point.y
    ) {
      return true
    }
    return false
  }

  public round(to: number = 0): Vector2 {
    this.x = parseFloat(
      (this.x).toFixed(to)
    )
    this.y = parseFloat(
      (this.y).toFixed(to)
    )
    return this
  }

  public clone(): Vector2 {
    return Vector2.equals(this)
  }

  public getArray(): number[] {
    return [this.x, this.y]
  }

  public getString(): string {
    return `x: ${this.x}, y: ${this.y}`
  }

  public average(): number {
    return (Math.abs(this.x) + Math.abs(this.y)) / 2
  }

  public absolute(): Vector2 {
    this.x = Math.abs(this.x)
    this.y = Math.abs(this.y)
    return this
  }

  public add(point: Point): Vector2 {
    this.x += point.x
    this.y += point.y
    return this
  }

  public addX(point: number | Point): Vector2 {
    if (typeof point === 'number') {
      this.x += point
    } else {
      this.x += point.x
    }
    return this
  }

  public addY(point: number | Point): Vector2 {
    if (typeof point === 'number') {
      this.y += point
    } else {
      this.y += point.x
    }
    return this
  }

  public subtract(point: Point): Vector2 {
    this.x -= point.x
    this.y -= point.y
    return this
  }

  public subtractX(point: number | Point): Vector2 {
    if (typeof point === 'number') {
      this.x -= point
    } else {
      this.x -= point.x
    }
    return this
  }

  public subtractY(point: number | Point): Vector2 {
    if (typeof point === 'number') {
      this.y -= point
    } else {
      this.y += point.x
    }
    return this
  }

  public multiply(by: number): Vector2 {
    this.x *= by
    this.y *= by
    return this
  }

  public multiplyX(by: number): Vector2 {
    this.x *= by
    return this
  }

  public multiplyY(by: number): Vector2 {
    this.y *= by
    return this
  }

  public divide(by: number): Vector2 {
    by = by === 0 ? 1 : by
    this.x /= by
    this.y /= by
    return this
  }

  public divideX(by: number): Vector2 {
    by = by === 0 ? 1 : by
    this.x /= by
    return this
  }

  public divideY(by: number): Vector2 {
    by = by === 0 ? 1 : by
    this.y /= by
    return this
  }

  public constrain(constrain: number | number[]): Vector2 {
    this.x = Num.constrain(this.x, constrain)
    this.y = Num.constrain(this.y, constrain)
    return this
  }

  public dot(point: Point): number {
    return this.x * point.x + this.y * point.y
  }

  public magnitude(): number {
    return Num.hypotenuse(this.x, this.y)
  }

  public normalize(): Vector2 {
    let mag: number = Math.abs(this.magnitude())
    mag = mag === 0 ? 1 : mag
    this.x /= mag
    this.y /= mag
    return this
  }

  public getDistanceTo(to: Point): number {
    return Vector2
      .subtract(this, to)
      .magnitude()
  }

  public getAngle(): number {
    let m: number = Math.abs(
      Math.sqrt(this.x * this.x + this.y * this.y)
    )
    let angle: number = Math.acos(this.x / m)
    if (this.y < 0) {
      angle = Math.PI + (Math.PI - angle)
    }
    return Num.cycle(angle, Math.PI * 2)
  }

  public getAngleFrom(from: Point): number {
    let x: number = (this.x - from.x)
    let y: number = (this.y - from.y)
    let m: number = Math.abs(
      Math.sqrt(x * x + y * y)
    )
    let angle: number = Math.acos(x / m)
    if (y < 0) {
      angle = Math.PI + (Math.PI - angle)
    }
    return angle
  }

  public getAngleTo(to: Point): number {
    let x: number = (to.x - this.x)
    let y: number = (to.y - this.y)
    let m: number = Math.abs(
      Math.sqrt(x * x + y * y)
    )
    let angle: number = Math.acos(x / m)
    if (y < 0) {
      angle = Math.PI + (Math.PI - angle)
    }
    return angle
  }

  public rotateBy(by: number): Vector2 {
    let angle: number = this.getAngle() + by
    let m: number = Math.abs(
      Math.sqrt(this.x * this.x + this.y * this.y)
    )
    this.x = Math.cos(angle) * m
    this.y = Math.sin(angle) * m
    return this
  }

  public rotateTo(angle: number): Vector2 {
    angle = Num.cycle(angle, Math.PI * 2)
    let m: number = Math.abs(
      Math.sqrt(this.x * this.x + this.y * this.y)
    )
    this.x = Math.cos(angle) * m
    this.y = Math.sin(angle) * m
    return this
  }

  public rotateByFrom(by: number, from: Point): Vector2 {
    by = Num.cycle(by, Math.PI * 2)
    let x: number = this.x - from.x
    let y: number = this.y - from.y
    let m: number = Math.abs(
      Math.sqrt(x * x + y * y)
    )
    let a: number = Math.acos(x / m)
    if (y < 0) {
      a = Math.PI + (Math.PI - a)
    }
    let finalAngle: number = Num.cycle(a + by, Math.PI * 2)
    this.x = from.x + Math.cos(finalAngle) * m
    this.y = from.y + Math.sin(finalAngle) * m
    return this
  }

  public rotateToFrom(to: number, from: Point): Vector2 {
    to = Num.cycle(to, Math.PI * 2)
    let x: number = this.x - from.x
    let y: number = this.y - from.y
    let m: number = Math.abs(
      Math.sqrt(x * x + y * y)
    )
    this.x = from.x + Math.cos(to) * m
    this.y = from.y + Math.sin(to) * m
    return this
  }

  public moveBy(x?: number | Point, y?: number): Vector2 {
    if (
      typeof x === 'number' &&
      typeof y === 'number'
    ) {
      this.x += x
      this.y += y
    } else if (
      typeof x !== 'undefined' &&
      typeof y === 'undefined'
    ) {
      this.add(<Point>x)
    }
    return this
  }

  public moveTo(x?: number | Point, y?: number): Vector2 {
    if (
      typeof x === 'number' &&
      typeof y === 'number'
    ) {
      this.x = x
      this.y = y
    } else if (
      typeof x !== 'undefined' &&
      typeof y === 'undefined'
    ) {
      this.equals(<Point>x)
    }
    return this
  }

  public moveRadiallyBy(angle: number, by: number): Vector2 {
    angle = Num.cycle(angle, Math.PI * 2)
    this.x += Math.cos(angle) * by
    this.y += Math.sin(angle) * by
    return this
  }

  public moveRadiallyTo(angle: number, by: number): Vector2 {
    angle = Num.cycle(angle, Math.PI * 2)
    this.x = Math.cos(angle) * by
    this.y = Math.sin(angle) * by
    return this
  }

  public scaleBy(by: number): Vector2 {
    let magnitude: number = Math.abs(Math.sqrt(this.x * this.x + this.y * this.y))
    magnitude = magnitude === 0 ? 1 : magnitude
    this.x /= magnitude
    this.y /= magnitude
    this.x *= by
    this.y *= by
    return this
  }

  public scaleByFrom(by: number, from: Point): Vector2 {
    let sub: Vector2 = Vector2.subtract(this, from)
    let m: number = sub.magnitude()
    sub
      .normalize()
      .multiply(m * by)
      .add(from)
    this.equals(sub)
    return this
  }

  public limit(by: number): Vector2 {
    let mag: number = this.magnitude()
    if (mag > by) {
      this
        .normalize()
        .multiply(by)
    }
    return this
  }

  public lerp(point: Point, time: number): Vector2 {
    this.x = Num.modulate(time, 1, [this.x, point.x], false)
    this.y = Num.modulate(time, 1, [this.y, point.y], false)
    return this
  }

  public isZero(): boolean {
    return this.x === 0 && this.y === 0 ? true : false
  }

  public zero(): Vector2 {
    this.x = 0
    this.y = 0
    return this
  }

  public static projectFrom(from: Point, direction: Point, by: number) {
    let to: Vector2 = Vector2
      .equals(direction)
      .normalize()
      .multiply(by)
    return Vector2.add(from, to)
  }

  public static zero(): Vector2 {
    return new Vector2(0, 0)
  }

  public static random(): Vector2 {
    return new Vector2(Math.random(), Math.random())
  }

  public static equals(point: Point): Vector2 {
    return new Vector2(point.x, point.y)
  }

  public static add(a: Point, b: Point): Vector2 {
    return new Vector2(a).add(b)
  }

  public static subtract(a: Point, b: Point): Vector2 {
    return new Vector2(a.x, a.y).subtract(b)
  }

  public static multiply(v: Point, n: number): Vector2 {
    return new Vector2(v.x, v.y).multiply(n)
  }

  public static divide(v: Point, n: number): Vector2 {
    return new Vector2(v.x, v.y).divide(n)
  }

  public static normalize(v: Point): Vector2 {
    return new Vector2(v.x, v.y).normalize()
  }

  public static getMidPointBetween(a: Point, b: Point): Vector2 {
    let x: number = a.x - b.x
    let y: number = a.y - b.y
    x /= 2
    y /= 2
    x += b.x
    y += b.y
    return new Vector2(x, y)
  }

  public static getDistanceBetween(a: Point, b: Point): number {
    return Vector2
      .subtract(a, b)
      .magnitude()
  }

  public static splitAtAngle(target: Point, angle: number, by: number): Vector2[] {
    let results: Vector2[] = new Array
    results[0] = Vector2
      .equals(target)
      .moveRadiallyBy(angle, -by)
    results[1] = Vector2
      .equals(target)
      .moveRadiallyBy(angle, by)
    return results
  }

  public static scaleByFrom(vector: Vector2, to: number, from: Vector2): Vector2 {
    let result: Vector2 = Vector2.equals(vector)
    return result.scaleByFrom(to, from)
  }

  public static getDisplacement(from: Point, to: Point): Vector2 {
    return Vector2.subtract(to, from)
  }

  public static getDirection(from: Point, to: Point): Vector2 {
    return Vector2
      .subtract(to, from)
      .normalize()
  }

  // @comparison

  public static isEqual(a: Point, b: Point): boolean {
    return a.x === a.x && a.y === b.y ? true : false
  }

  // Angles

  public static angleIsInProximity(a: number, b: number, tolerance: number): boolean {
    let d1: number = Angle.differenceClockwise(a, b)
    let d2: number = Angle.differenceCounterclockwise(a, b)
    let d: number = Math.min(d1, d2)
    return d <= tolerance ? true : false
  }

  public static getAngleBetween2Points(a: Point, b: Point): number {
    let a1: number = Vector2.equals(a).getAngle()
    let a2: number = Vector2.equals(b).getAngle()
    let b1: number = Angle.differenceClockwise(a1, a2)
    let b2: number = Angle.differenceCounterclockwise(a1, a2)
    return Math.min(b1, b2)
  }

  public static getAngleBetween3Points(a: Point, b: Point, c: Point): number {
    let va: Vector2 = Vector2.equals(a)
    let vb: Vector2 = Vector2.equals(b)
    let vc: Vector2 = Vector2.equals(c)
    let a1: number = vb.getAngleTo(va)
    let a2: number = vb.getAngleTo(vc)
    let b1: number = Angle.differenceClockwise(a1, a2)
    let b2: number = Angle.differenceCounterclockwise(a1, a2)
    return Math.min(b1, b2)
  }

  // Triangle

  public static getBasePointOfTriangle(v1: Vector2, v2: Vector2, v3: Vector2): Vector2 {
    let a1: number = v1.getAngleTo(v3)
    let a2: number = v1.getAngleTo(v2)
    let a: number = Math.abs(a1 - a2)
    let h: number = v1.getDistanceTo(v2)
    let bh: number = Math.sin(a) * h
    let ml: number = Math.atan(a) / bh
    let fv: Vector2 = Vector2.equals(v1)
    return fv.moveRadiallyBy(a1, ml)
  }

  // Group

  public static addGroupBy(group: Vector2[], by: Point): Vector2[] {
    for (let point of group) {
      point.add(by)
    }
    return group
  }

  public static subtractGroupBy(group: Vector2[], by: Point): Vector2[] {
    for (let point of group) {
      point.subtract(by)
    }
    return group
  }

  public static multiplyGroupBy(group: Vector2[], by: number): Vector2[] {
    for (let point of group) {
      point.multiply(by)
    }
    return group
  }

  public static divideGroupBy(group: Vector2[], by: number): Vector2[] {
    for (let point of group) {
      point.divide(by)
    }
    return group
  }

  public static scaleGroupByFrom(group: Vector2[], by: number, from: Point): Vector2[] {
    for (let point of group) {
      point.scaleByFrom(by, from)
    }
    return group
  }

  public static rotateGroupToFrom(group: Vector2[], to: number, from: Point): Vector2[] {
    for (let point of group) {
      point.rotateToFrom(to, from)
    }
    return group
  }

  public static rotateGroupByFrom(group: Vector2[], by: number, from: Point): Vector2[] {
    for (let point of group) {
      point.rotateByFrom(by, from)
    }
    return group
  }

}