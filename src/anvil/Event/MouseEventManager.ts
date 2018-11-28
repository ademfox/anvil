import {
  Util,
  MouseEventHandler,
} from '../Anvil'

export class MouseEventManager {

  public handlers: { [name: string]: MouseEventHandler }

  public onEvent: Function = () => { }
  public onClick: Function = () => { }
  public onDown: Function = () => { }
  public onUp: Function = () => { }
  public onMove: Function = () => { }

  public debounce: Function
  public debounceTime: number = 0.2

  constructor() {
    this.handlers = {}
    this.startListening()
  }

  public register(name: string, handler: MouseEventHandler): MouseEventManager {
    this.handlers[name] = handler
    this.handlers[name].name = name
    return this
  }

  public find(name: string): MouseEventHandler {
    return this.handlers[name]
  }

  public remove(name: string): MouseEventManager {
    delete this.handlers[name]
    return this
  }

  public startListening(): MouseEventManager {
    this.debounce = Util.debounce(this.debounceTime, this.handleMoveEnd.bind(this))
    window.addEventListener('click', this.handleClick.bind(this))
    window.addEventListener('mousedown', this.handleDown.bind(this))
    window.addEventListener('mouseup', this.handleUp.bind(this))
    window.addEventListener('mousemove', this.handleMove.bind(this))
    window.addEventListener('mousemove', this.debounce.bind(this))
    return this
  }

  public stopListening(): MouseEventManager {
    window.removeEventListener('click', this.handleClick)
    window.removeEventListener('mousedown', this.handleDown)
    window.removeEventListener('mouseup', this.handleUp)
    window.removeEventListener('mousemove', this.handleMove)
    window.removeEventListener('mousemove', <EventListener>this.debounce)
    return this
  }

  private handleClick(event: MouseEvent): void {
    this.onEvent(event)
    this.onClick(event)
    for (let name in this.handlers) {
      this.handlers[name].handleClick(event)
    }
  }

  private handleDown(event: MouseEvent): void {
    this.onEvent(event)
    this.onDown(event)
    for (let name in this.handlers) {
      this.handlers[name].handleDown(event)
    }
  }

  private handleUp(event: MouseEvent): void {
    this.onEvent(event)
    this.onUp(event)
    for (let name in this.handlers) {
      this.handlers[name].handleUp(event)
    }
  }

  private handleMove(event: MouseEvent): void {
    this.onEvent(event)
    this.onMove(event)
    for (let name in this.handlers) {
      this.handlers[name].handleMove(event)
    }
  }

  private handleMoveEnd(): void {
    for (let name in this.handlers) {
      this.handlers[name].handleMoveEnd()
    }
  }

}