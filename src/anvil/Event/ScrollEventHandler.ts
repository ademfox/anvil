import {
  Vector2,
} from '../Anvil'

export class ScrollEventHandler {

  public data: any
  public name: string

  public element: HTMLElement | Window

  public event: Event

  public position: Vector2
  public velocity: Vector2
  public acceleration: Vector2

  public previousPosition: Vector2
  public previousVelocity: Vector2

  public isScrolling: boolean = false

  public scrollStartTime: number
  public scrollEndTime: number
  public scrollDuration: number

  public determineScroll: Function = () => { return true }

  public onScrollStart: Function = () => { }
  public onScroll: Function = () => { }
  public onScrollEnd: Function = () => { }

  public debounce: Function = () => { }

  constructor(element: HTMLElement | Window) {
    this.element = element

    this.position = new Vector2
    this.velocity = new Vector2
    this.acceleration = new Vector2

    this.previousPosition = new Vector2
    this.previousVelocity = new Vector2
  }

  public handleScroll(event: Event): void {
    this.event = event
    this.position.equals(this.getPosition())
    this.velocity.equals(Vector2.subtract(this.position, this.previousPosition))
    this.acceleration.equals(Vector2.subtract(this.velocity, this.previousVelocity))
    if (this.isScrolling === false) {
      if (this.determineScroll(event, this) === true) {
        this.scrollStartTime = Date.now()
        this.isScrolling = true
        this.onScrollStart(this.position, this)
      }
    } else {
      this.acceleration.equals(Vector2.subtract(this.velocity, this.previousVelocity))
      this.onScroll(this.position, this)
    }
    this.previousPosition.equals(this.position)
    this.previousVelocity.equals(this.velocity)
  }

  public handleScrollEnd(): void {
    if (this.isScrolling === true) {
      this.scrollEndTime = Date.now()
      this.scrollDuration = this.scrollEndTime - this.scrollStartTime
      this.isScrolling = false
      this.onScrollEnd(this.position, this)
    }
  }

  public getPosition(): Vector2 {
    if (this.element === window) {
      return new Vector2(window.scrollX, window.scrollY)
    } else {
      return new Vector2((<HTMLElement>this.element).scrollLeft, (<HTMLElement>this.element).scrollTop)
    }
  }

  public scrollLeft(left?: number): number {
    let result: number
    if (this.element === window) {
      if (typeof left === 'number') {
        window.scrollTo(left, window.scrollY)
        result = left
      } else {
        result = window.scrollX
      }
    } else {
      if (typeof left === 'number') {
        (<HTMLElement>this.element).scrollLeft = left
        result = left
      } else {
        result = (<HTMLElement>this.element).scrollLeft
      }
    }
    this.update()
    return result
  }

  public scrollTop(top?: number): number {
    let result: number
    if (this.element === window) {
      if (typeof top === 'number') {
        window.scrollTo(window.scrollX, top)
        result = top
      } else {
        result = window.scrollY
      }
    } else {
      if (typeof top === 'number') {
        (<HTMLElement>this.element).scrollTop = top
        result = top
      } else {
        result = (<HTMLElement>this.element).scrollTop
      }
    }
    this.update()
    return result
  }

  public scrollTo(to: Vector2): ScrollEventHandler {
    if (this.element === window) {
      window.scrollTo(to.x, to.y)
    } else {
      (<HTMLElement>this.element).scrollLeft = to.x;
      (<HTMLElement>this.element).scrollTop = to.y
    }
    this.update()
    return this
  }

  private update(): ScrollEventHandler {
    let currentPosition: Vector2 = this.getPosition()
    let currentVelocity: Vector2 = Vector2.subtract(this.position, currentPosition)
    this.acceleration.equals(Vector2.subtract(currentVelocity, this.velocity))
    this.velocity.equals(currentVelocity)
    this.position.equals(currentPosition)
    return this
  }

}