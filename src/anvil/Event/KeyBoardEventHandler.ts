import {
  KeyBoardEventManager,
} from '../Anvil'

export class KeyBoardEventHandler {

  public manager: KeyBoardEventManager

  public name: string
  public data: any
  public keyCode: number

  public event: KeyboardEvent

  public isDown: boolean = false

  public determineKeyDown: Function = () => { return true }
  public determineKeyPress: Function = () => { return true }

  public onKeyDownStart: Function | Function[] = () => { }
  public onKeyDownEnd: Function | Function[] = () => { }
  public onKeyPress: Function | Function[] = () => { }

  public keyDownStartTime: number
  public keyDownEndTime: number
  public keyDownDuration: number

  public keyPressTime: number

  constructor() { }

  public handleKeyDown(event: KeyboardEvent) {
    if (this.determineKeyDown(event.keyCode, event, this) === true) {
      this.event = event
      this.keyDownStartTime = Date.now()
      this.keyCode = event.keyCode
      this.isDown = true
      if (typeof this.onKeyDownStart === 'function') {
        this.onKeyDownStart(event.keyCode, this)
      } else if (this.onKeyDownStart.constructor === Array) {
        for (let onKeyDownStart of <Function[]>this.onKeyDownStart) {
          onKeyDownStart(event.keyCode, this)
        }
      }
    }
  }

  public handleKeyPress(event: KeyboardEvent) {
    if (this.determineKeyPress(event.keyCode, event, this) === true) {
      this.event = event
      this.keyCode = event.keyCode
      this.keyPressTime = Date.now()
      if (typeof this.onKeyPress === 'function') {
        this.onKeyPress(event.keyCode, this)
      } else if (this.onKeyPress.constructor === Array) {
        for (let onKeyPress of <Function[]>this.onKeyPress) {
          onKeyPress(event.keyCode, this)
        }
      }
    }
  }

  public handleKeyUp(event: KeyboardEvent) {
    if (this.isDown === true) {
      this.event = event
      this.keyCode = event.keyCode
      this.keyDownEndTime = Date.now()
      this.keyDownDuration = this.keyDownEndTime - this.keyDownStartTime
      this.isDown = false
      if (typeof this.onKeyDownEnd === 'function') {
        this.onKeyDownEnd(event.keyCode, this)
      } else if (this.onKeyDownEnd.constructor === Array) {
        for (let onKeyDownEnd of <Function[]>this.onKeyDownEnd) {
          onKeyDownEnd(event.keyCode, this)
        }
      }
    }
  }

}