import {
  Util,
} from '../Anvil'

export interface Size {
  height: number
  width: number
}

export interface ScreenEventHandler {
  data?: object
  determine?: Function
  event?: Event
  isActive?: boolean
  name?: string
  onResize?: Function
  onResizeEnd?: Function
  onResizeStart?: Function
}

export class ScreenEventManager {

  public currentSize: Size
  public debounce: Function
  public debounceTime: number = 0.2
  public endSize: Size
  public handlers: ScreenEventHandler[]
  public isResizing: boolean = false
  public onResize: Function
  public onResizeEnd: Function
  public onResizeStart: Function
  public resizeDuration: number
  public resizeEndTime: number
  public resizeStartTime: number
  public scaleDelta: number
  public startSize: Size

  constructor() {
    this.handlers = new Array
    this.startListening()
    return this
  }

  public register(name: string, handler: ScreenEventHandler): ScreenEventManager {
    this.handlers[name] = new Object
    let _handler: ScreenEventHandler = this.handlers[name]
    _handler.name = name
    _handler.isActive = false
    for (let key in handler) {
      _handler[key] = handler[key]
    }
    return this
  }

  public find(name: string): ScreenEventHandler {
    return this.handlers[name]
  }

  public remove(name: string): ScreenEventManager {
    delete this.handlers[name]
    return this
  }

  public startListening(): ScreenEventManager {
    this.debounce = Util.debounce(this.debounceTime, this._handleResizeEnd.bind(this))
    window.addEventListener('resize', this._handleResize.bind(this))
    window.addEventListener('resize', this.debounce.bind(this))
    return this
  }

  public stopListening(): ScreenEventManager {
    window.removeEventListener('resize', this._handleResize)
    window.removeEventListener('resize', <EventListener>this.debounce)
    return this
  }

  public getSize(): Size {
    let width: number = window.innerWidth
    let height: number = window.innerHeight
    return { height: height, width: width }
  }

  private _handleResize(event): void {
    if (this.isResizing === false) {
      this.isResizing = true
      this.resizeStartTime = Date.now()
      this.startSize = this.getSize()
      this.currentSize = this.getSize()
      this.onResizeStart(this, event)
      for (let handler of this.handlers) {
        if (handler.determine(this, event) === true) {
          handler.isActive = true
          handler.event = event
          handler.onResizeStart(this, this.handlers[handler.name])
        }
      }
    } else {
      this.currentSize = this.getSize()
      this.onResize(this, event)
      for (let handler of this.handlers) {
        if (handler.isActive === true) {
          handler.event = event
          handler.onResize(this, this.handlers[handler.name])
        }
      }
    }
  }

  private _handleResizeEnd(): void {
    this.isResizing = false
    this.resizeEndTime = Date.now()
    this.resizeDuration = this.resizeEndTime - this.resizeStartTime
    this.endSize = this.getSize()
    this.currentSize = this.getSize()
    this.onResizeEnd(this)
    for (let handler of this.handlers) {
      if (handler.isActive === true) {
        handler.isActive = false
        handler.event = event
        handler.onResizeEnd(this, this.handlers[handler.name])
      }
    }
  }

}