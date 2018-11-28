import {
  DOMUtil,
} from '../Anvil'

export class UISwitch {

  element: HTMLElement
  isDisabled: boolean = false
  isOn: boolean = false
  onSwitch: Function = (isOn: boolean) => { }
  value: number = 0

  constructor(element: HTMLElement) {
    this.setElement(element)
    this.startListening()
    return this
  }

  public computeValue(isOn: boolean): number {
    return isOn ? 1 : 0
  }

  public setElement(element: HTMLElement): UISwitch {
    this.element = element
    return this
  }

  public turnOn(switchEl: HTMLElement): UISwitch {
    switchEl.dataset.value = this.value.toString()
    switchEl.classList.add('_UISwitch-isOn')
    return this
  }

  public turnOff(switchEl: HTMLElement): UISwitch {
    switchEl.dataset.value = this.value.toString()
    switchEl.classList.remove('_UISwitch-isOn')
    return this
  }

  public startListening(): UISwitch {
    window.addEventListener('click', this._handleClick.bind(this))
    return this
  }

  public stopListening(): UISwitch {
    window.removeEventListener('click', this._handleClick)
    return this
  }

  private _turnOff(): UISwitch {
    this.onSwitch(this.isOn, this.value, this)
    this.isOn = false
    this.value = this.computeValue(this.isOn)
    this.turnOff(this.element)
    return this
  }

  private _turnOn(): UISwitch {
    this.onSwitch(this.isOn, this.value, this)
    this.isOn = true
    this.value = this.computeValue(this.isOn)
    this.turnOn(this.element)
    return this
  }

  private _toggleSwitch(): UISwitch {
    this.isOn = this.isOn === true ? false : true
    return this
  }

  private _handleClick(event: Event): UISwitch {
    if (this.isDisabled === false) {
      if (DOMUtil.hasAncestor(<HTMLElement>event.target, this.element)) {
        this._toggleSwitch()
        if (this.isOn == true) {
          this._turnOn()
        } else {
          this._turnOff()
        }
      }
    }
    return this
  }

}