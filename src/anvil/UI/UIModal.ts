import {
  DOMUtil,
} from '../Anvil'

export class UIModal {

  public activeModalEl: HTMLElement
  public closeKeyCodes: number[] = [27]
  public closeOnOutsideClick: boolean = true
  public isActive: boolean = false
  public lastTriggerOpenEl: HTMLElement
  public triggerCloseClass: string = '_jsUIModalClose'
  public triggerOpenClass: string = '_jsUIModalOpen'

  private _eventClose: Event
  private _eventOpen: Event
  private _eventTransit: Event

  public openOnCondition: Function = (targetModalEl: HTMLElement): boolean => { return true }

  public open: Function = (modalEl: HTMLElement, completeFn: Function, context?) => {
    modalEl.classList.add('_UIModal-active')
    completeFn()
  }

  public close: Function = (activeModalEl: HTMLElement, completeFn: Function, context?) => {
    activeModalEl.classList.remove('_UIModal-active')
    completeFn()
  }

  public transit: Function = (currentModalEl: HTMLElement, nextModalEl: HTMLElement, completeFn: Function, context?) => {
    currentModalEl.classList.remove('_UIModal-active')
    nextModalEl.classList.add('_UIModal-active')
    completeFn()
  }

  constructor(properties?: object) {
    if (typeof properties !== 'undefined') {
      this.setProperties(properties)
    }
    this.initialize()
    return this
  }

  public initialize() {
    this._eventOpen = new Event('UIModalOpen')
    this._eventClose = new Event('UIModalClose')
    this._eventTransit = new Event('UIModalTransit')
    this.startListening()
    return this
  }

  public setProperties(properties: object) {
    for (let key in properties) {
      this[key] = properties[key]
    }
    return this
  }

  public getTargetModalElFromTriggerEl(triggerOpenEl: HTMLElement): HTMLElement {
    let targetID = triggerOpenEl.dataset.uimodalTarget
    return document.getElementById(targetID)
  }

  // Main

  public closeActiveModal() {
    if (this.isActive === true) {
      let completeFn = () => {
        this.isActive = false
      }
      completeFn.bind(this)
      window.dispatchEvent(this._eventClose)
      this.close(this.activeModalEl, completeFn)
    }
    return this
  }

  public openModalByTriggerEl(triggerOpenEl: HTMLElement) {
    let targetModalEl = this.getTargetModalElFromTriggerEl(triggerOpenEl)
    this.lastTriggerOpenEl = triggerOpenEl
    this.openModalByTargetEl(targetModalEl, this)
    return this
  }

  public openModalByTargetEl(targetModalEl: HTMLElement, context?) {
    if (
      typeof targetModalEl === 'object' &&
      typeof targetModalEl.nodeType === 'number' &&
      targetModalEl.nodeType === 1 &&
      this.openOnCondition(targetModalEl)
    ) {
      let completeFn = () => {
        this.activeModalEl = targetModalEl
        this.isActive = true
      }
      completeFn = completeFn.bind(this)
      if (this.isActive === true) {
        window.dispatchEvent(this._eventTransit)
        this.transit(this.activeModalEl, targetModalEl, completeFn, this)
      } else {
        window.dispatchEvent(this._eventOpen)
        this.open(targetModalEl, completeFn, this)
      }
    }
    return this
  }

  public startListening() {
    window.addEventListener('click', this._handleClick.bind(this))
    window.addEventListener('keyup', this._handleKeyUp.bind(this))
    return this
  }

  public stopListening() {
    window.removeEventListener('click', this._handleClick)
    window.removeEventListener('keyup', this._handleKeyUp)
    return this
  }

  // Events

  private _handleClick(event: Event): UIModal {
    let triggerOpenEl = DOMUtil.findAncestorWithClass(<HTMLElement>event.target, this.triggerOpenClass, false)
    if (triggerOpenEl !== false) {
      event.preventDefault()
      this.openModalByTriggerEl(<HTMLElement>triggerOpenEl)
    } else if (this.isActive) {
      let triggerCloseEl = DOMUtil.findAncestorWithClass(<HTMLElement>event.target, this.triggerCloseClass, false)
      if (triggerCloseEl) {
        event.preventDefault()
        this.closeActiveModal()
      }
      if (this.closeOnOutsideClick === true) {
        if (DOMUtil.hasAncestor(<HTMLElement>event.target, this.activeModalEl) === false) {
          this.closeActiveModal()
        }
      }
    }
    return this
  }

  private _handleKeyUp(event: KeyboardEvent): UIModal {
    if (this.isActive === true) {
      for (let keyCode of this.closeKeyCodes) {
        if (event.keyCode === keyCode) {
          this.closeActiveModal()
        }
      }
    }
    return this
  }

}