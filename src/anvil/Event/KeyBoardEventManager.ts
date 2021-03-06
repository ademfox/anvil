// KeyPress, KeyUp, and KeyDown are analagous to, respectively, Click, MouseUp, and MouseDown.
// The *Down happens first, the *Press happens second (when text is entered), and the *Up happens last (when text input is complete).
// The exception is webkit, which has an extra event in there:
// keydown, keypress, textInput, keyup

import {
  KeyBoardEventHandler,
} from '../Anvil'


export class KeyBoardEventManager {

  public altKeyIsDown: boolean = false
  public ctrlKeyIsDown: boolean = false
  public shiftKeyIsDown: boolean = false

  public isDisabled: boolean = false
  public isDown: boolean = false

  public downKeys: number[]
  public lastKeyCode: number

  public handlers: { [name: string]: KeyBoardEventHandler }

  public onEvent: Function = () => { }
  public onKeyDown: Function = () => { }
  public onKeyPress: Function = () => { }
  public onKeyUp: Function = () => { }

  public constructor() {
    this.handlers = {}
    this.downKeys = new Array
    this.startListening()
  }

  public register(name: string, handler: KeyBoardEventHandler): KeyBoardEventManager {
    this.handlers[name] = handler
    this.handlers[name].name = name
    this.handlers[name].manager = this
    return this
  }

  public find(name: string): KeyBoardEventHandler {
    return this.handlers[name]
  }

  public remove(name: string): KeyBoardEventManager {
    this.handlers[name].manager = undefined
    delete this.handlers[name]
    return this
  }

  public startListening(): KeyBoardEventManager {
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
    window.addEventListener('keypress', this.handleKeyPress.bind(this))
    window.addEventListener('keyup', this.handleKeyUp.bind(this))
    return this
  }

  public stopListening(): KeyBoardEventManager {
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keypress', this.handleKeyPress)
    window.removeEventListener('keyup', this.handleKeyUp)
    return this
  }

  private handleKeyDown(event: KeyboardEvent): void {
    this.downKeys.push(event.keyCode)
    // SHIFT
    if (event.keyCode === 16) {
      this.shiftKeyIsDown = true
    }
    // CTRL
    if (event.keyCode === 17) {
      this.ctrlKeyIsDown = true
    }
    // ALT
    if (event.keyCode === 18) {
      this.altKeyIsDown = true
    }
    this.onEvent(this, event)
    this.onKeyDown(this, event)
    this.lastKeyCode = event.keyCode
    this.isDown = true
    for (let name in this.handlers) {
      this.handlers[name].handleKeyDown(event)
    }
  }

  private handleKeyPress(event: KeyboardEvent): void {
    this.onEvent(event)
    this.onKeyPress(event)
    this.lastKeyCode = event.keyCode
    for (let name in this.handlers) {
      this.handlers[name].handleKeyPress(event)
    }
  }

  private handleKeyUp(event: KeyboardEvent): void {
    let downKeyIndex: number = this.downKeys.indexOf(event.keyCode)
    if (downKeyIndex !== -1) {
      this.downKeys.splice(downKeyIndex, 1)
    }
    // SHIFT
    if (event.keyCode === 16) {
      this.shiftKeyIsDown = false
    }
    // CTRL
    if (event.keyCode === 17) {
      this.ctrlKeyIsDown = false
    }
    // AlT
    if (event.keyCode === 18) {
      this.altKeyIsDown = false
    }
    this.onEvent(event)
    this.onKeyUp(event)
    if (this.downKeys.length === 0) {
      this.isDown = false
    }
    for (let name in this.handlers) {
      this.handlers[name].handleKeyUp(event)
    }
  }

}