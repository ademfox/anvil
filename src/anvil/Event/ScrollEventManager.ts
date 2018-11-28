import {
  ScrollEventHandler,
  Util,
  Vector2,
} from '../Anvil'

export class ScrollEventManager {

  public debounce: Function
  public debounceTime: number = 0.2

  public handlers: { [name: string]: ScrollEventHandler }

  public isScrolling: boolean = false

  public onEvent: Function = () => { }
  public onScrollStart: Function = () => { }
  public onScroll: Function = () => { }
  public onScrollEnd: Function = () => { }

  constructor() {
    this.handlers = {}
    this.startListening()
  }

  public register(name: string, handler: ScrollEventHandler): ScrollEventManager {
    this.handlers[name] = handler
    this.handlers[name].name = name
    return this
  }

  public find(name: string): ScrollEventHandler {
    return this.handlers[name]
  }

  public remove(name: string): ScrollEventManager {
    this.handlers[name].element.removeEventListener(
      'scroll', this.handleScroll
    )
    this.handlers[name].element.removeEventListener(
      'scroll', <EventListener>this.handlers[name].debounce
    )
    delete this.handlers[name]
    return this
  }

  public startListening(): ScrollEventManager {
    for (let name in this.handlers) {
      this.handlers[name].debounce = Util.debounce(
        this.debounceTime, this.handlers[name].handleScrollEnd.bind(this)
      )
      this.handlers[name].element.addEventListener(
        'scroll', this.handlers[name].handleScroll.bind(this)
      )
      this.handlers[name].element.addEventListener(
        'scroll', this.handlers[name].debounce.bind(this)
      )
    }
    return this
  }

  public stopListening(): ScrollEventManager {
    for (let name in this.handlers) {
      this.handlers[name].element.removeEventListener(
        'scroll', this.handleScroll
      )
      this.handlers[name].element.removeEventListener(
        'scroll', <EventListener>this.handlers[name].debounce
      )
    }
    return this
  }

  private handleScroll(event): void {
    for (let name in this.handlers) {
      this.handlers[name].handleScroll(event)
    }
  }

  private handleScrollEnd(): void {
    for (let name in this.handlers) {
      this.handlers[name].handleScroll(event)
    }
  }

}