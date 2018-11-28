import {
  Vector2,
} from '../Anvil'

export class MouseEventHandler {

  public event: Event
  public name: string

  public isDown: boolean = false
  public isDragging: boolean = false
  public isMoving: boolean = false

  public acceleration: Vector2
  public position: Vector2
  public velocity: Vector2

  public previousPosition: Vector2
  public previousVelocity: Vector2

  public clickPosition: Vector2
  public downEndPosition: Vector2
  public downStartPosition: Vector2

  public moveEndPosition: Vector2
  public moveStartPosition: Vector2

  public dragStartPosition: Vector2
  public dragEndPosition: Vector2

  public determineClick: Function = () => { return true }
  public determineDown: Function = () => { return true }
  public determineMove: Function = () => { return true }
  public determineDrag: Function = () => { return true }

  public clickCount: number = 0
  public clickTime: number = 0

  public downStartTime: number
  public downEndTime: number
  public downDuration: number

  public moveStartTime: number
  public moveEndTime: number
  public moveDuration: number

  public dragStartTime: number
  public dragEndTime: number
  public dragDuration: number

  public doubleClickCounter: number = 0
  public doubleClickMaximumDelayTime: number = 500

  public onClick: Function = () => { }

  public onDownStart: Function = () => { }
  public onDownEnd: Function = () => { }

  public onDragStart: Function = () => { }
  public onDrag: Function = () => { }
  public onDragEnd: Function = () => { }

  public onMoveStart: Function = () => { }
  public onMove: Function = () => { }
  public onMoveEnd: Function = () => { }

  public onDoubleClick: Function = () => { }

  constructor() {
    this.position = new Vector2
    this.acceleration = new Vector2
    this.velocity = new Vector2
    this.previousVelocity = new Vector2
    this.previousPosition = new Vector2
    this.clickPosition = new Vector2
    this.downEndPosition = new Vector2
    this.downStartPosition = new Vector2
    this.moveEndPosition = new Vector2
    this.moveStartPosition = new Vector2
    this.dragStartPosition = new Vector2
    this.dragEndPosition = new Vector2
  }

  public handleClick(event: MouseEvent) {
    if (this.determineClick(event, this) === true) {
      let point: Vector2 = new Vector2(event.clientX, event.clientY)
      this.event = event
      this.clickCount++
      this.position.equals(point)
      this.clickPosition.equals(point)
      this.clickTime = Date.now()
      this.onClick(point, this)
      this.handleDoubleClick()
    }
  }

  public handleDoubleClick() {
    if (Date.now() - this.clickTime < this.doubleClickMaximumDelayTime) {
      this.doubleClickCounter++
      if (this.doubleClickCounter === 2) {
        this.onDoubleClick(this.position, this)
        this.doubleClickCounter = 0
      }
    } else {
      this.doubleClickCounter = 0
    }
  }

  public handleDown(event: MouseEvent) {
    if (this.determineDown(event, this) === true) {
      let point: Vector2 = new Vector2(event.clientX, event.clientY)
      this.event = event
      this.position.equals(point)
      this.downStartPosition.equals(point)
      this.downStartTime = Date.now()
      this.isDown = true
      this.onDownStart(point, this)
    }
  }

  public handleUp(event: MouseEvent) {
    if (this.isDown === true) {
      let point: Vector2 = new Vector2(this.position)
      this.handleDragEnd()
      this.event = event
      this.position.equals(point)
      this.downEndPosition.equals(point)
      this.downEndTime = Date.now()
      this.downDuration = this.downEndTime - this.downStartTime
      this.isDown = false
      this.onDownEnd(point, this)
    }
  }

  public handleMove(event: MouseEvent) {
    let point: Vector2 = new Vector2(event.clientX, event.clientY)
    this.position.equals(point)
    this.velocity.equals(
      Vector2.subtract(this.position, this.previousPosition)
    )
    this.acceleration.equals(
      Vector2.subtract(this.velocity, this.previousVelocity)
    )
    if (
      this.isMoving === false &&
      this.determineMove(event, this) === true
    ) {
      this.isMoving = true
      this.moveStartTime = Date.now()
      this.onMoveStart(event)
    } else if (this.isMoving === true) {
      this.onMove(point, this)
    }
    this.previousVelocity.equals(this.velocity)
    this.previousPosition.equals(point)
    if (
      this.isDown === true &&
      this.isMoving === true
    ) {
      if (this.isDragging === true) {
        this.onDrag(this.position, this)
      } else {
        this.isDragging = true
        this.dragStartTime = Date.now()
        this.dragStartPosition.equals(this.position)
        this.onDragStart(this.position, this)
      }
    }
  }

  public handleDragEnd() {
    if (this.isDragging === true) {
      this.dragEndTime = Date.now()
      this.dragDuration = this.dragEndTime - this.dragStartTime
      this.dragEndPosition.equals(this.position)
      this.isDragging = false
      this.onDragEnd(this.position, this)
    }
  }

  public handleMoveEnd() {
    if (this.isMoving === true) {
      this.handleDragEnd()
      this.moveEndTime = Date.now()
      this.moveDuration = this.moveEndTime - this.moveStartTime
      this.moveEndPosition.equals(this.position)
      this.isMoving = false
      this.onMoveEnd(this.position, this)
    }
  }

}
