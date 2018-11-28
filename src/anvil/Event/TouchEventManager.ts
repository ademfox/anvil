import {
  TouchEventHandler,
  Util,
} from '../Anvil'

export class TouchEventManager {

  public handlers: { [name: string]: TouchEventHandler }

  public onEvent: Function = () => { }
  public onTouchStart: Function = () => { }
  public onTouchEnd: Function = () => { }
  public onTouchCancel: Function = () => { }
  public onTouchMove: Function = () => { }

  public debounceMoveEnd: Function = () => { }
  public debounceTime: number = 0.2

  public constructor() {
    this.handlers = {}
    this.startListening()
    return this
  }

  public register(name: string, handler: TouchEventHandler): TouchEventManager {
    this.handlers[name] = handler
    this.handlers[name].name = name
    return this
  }

  public find(name: string): TouchEventHandler {
    return this.handlers[name]
  }

  public remove(name: string): TouchEventManager {
    delete this.handlers[name]
    return this
  }

  public startListening(): void {
    this.debounceMoveEnd = Util.debounce(this.debounceTime, this.handleTouchMoveEnd.bind(this))
    window.addEventListener('touchstart', this.handleTouchStart.bind(this))
    window.addEventListener('touchmove', this.handleTouchMove.bind(this))
    window.addEventListener('touchmove', this.debounceMoveEnd.bind(this))
    window.addEventListener('touchend', this.handleTouchEnd.bind(this))
    window.addEventListener('touchcancel', this.handleTouchCancel.bind(this))
  }

  public stopListening(): void {
    window.removeEventListener('touchstart', this.handleTouchStart)
    window.removeEventListener('touchmove', this.handleTouchMove)
    window.removeEventListener('touchmove', <EventListener>this.debounceMoveEnd)
    window.removeEventListener('touchend', this.handleTouchEnd)
    window.removeEventListener('touchcancel', this.handleTouchCancel)
  }

  public isTouchIdentityTaken(identity: number | string): boolean {
    for (let name in this.handlers) {
      if (this.handlers[name].identity === identity) {
        return true
      }
    }
    return false
  }

  private handleTouchStart(event): void {
    this.onEvent(event)
    this.onTouchStart(event)
    for (let touch of event.targetTouches) {
      for (let name in this.handlers) {
        if (this.isTouchIdentityTaken(touch.identifier) === false) {
          this.handlers[name].handleTouchStart(event, touch)
        }
      }
    }
  }

  private handleTouchEnd(event): void {
    this.onEvent(event)
    this.onTouchEnd(event)
    for (let name in this.handlers) {
      for (let touch of event.changedTouches) {
        if (this.handlers[name].identity === touch.identifier) {
          this.handlers[name].handleTouchEnd(event, touch)
        }
      }
    }
  }

  private handleTouchCancel(event): void {
    this.onEvent(event)
    this.onTouchCancel(event)
    for (let name in this.handlers) {
      for (let touch of event.changedTouches) {
        this.handlers[name].handleTouchMove(event, touch)
      }
    }
  }

  private handleTouchMove(event): void {
    this.onEvent(event)
    this.onTouchMove(event)
    for (let name in this.handlers) {
      for (let touch of event.touches) {
        this.handlers[name].handleTouchMove(event, touch)
      }
    }
  }

  private handleTouchMoveEnd(): void {
    for (let name in this.handlers) {
      this.handlers[name].handleTouchMoveEnd()
    }
  }

}