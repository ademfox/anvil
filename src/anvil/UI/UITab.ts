import {
  DOMUtil,
} from '../Anvil'

export class UITab {

  public tabNavItemClass: string = '_UITabNavItem'
  public openOnCondition: Function = (tabNavItemEl) => { return true }

  constructor(properties: Object) {
    this.setProperties(properties)
    this.startListening()
    return this
  }

  public setProperties(properties: Object) {
    for (let key in properties) {
      this[key] = properties[key]
    }
    return this
  }

  public activateTab(tabEl: HTMLElement) {
    return tabEl.classList.add('_UITab-active')
  }

  public deactivateTab(tabEl: HTMLElement, callbackFn: Function) {
    tabEl.classList.remove('_UITab-active')
    callbackFn()
  }

  public getTabFromTabNavItem(tabNavItemEl: HTMLElement): HTMLElement {
    let group = tabNavItemEl.dataset.group
    let target = tabNavItemEl.dataset.target
    return <HTMLElement>document.querySelector(`#${target}._UITab[data-group="${group}"]`)
  }

  public getActiveTab(tabNavItemEl: HTMLElement): HTMLElement {
    let group = tabNavItemEl.dataset.group
    return <HTMLElement>document.querySelector(`._UITab[data-group="${group}"]._UITab-active`)
  }

  public activateTabFromTabNavItem(tabNavItemEl: HTMLElement) {
    let tabEl: HTMLElement = this.getTabFromTabNavItem(tabNavItemEl)
    let activeTabEl: HTMLElement = this.getActiveTab(tabNavItemEl)
    let callback: Function = () => {
      this.activateTab(tabEl)
    }
    this.deactivateTab(activeTabEl, callback.bind(this))
    return this
  }

  public activateTabNavItem(tabNavItemEl: HTMLElement, callbackFn: Function) {
    tabNavItemEl.classList.add('_UITabNavItem-active')
    callbackFn()
  }

  public deactivateTabNavItem(tabNavItemEl: HTMLElement, callbackFn: Function) {
    tabNavItemEl.classList.remove('_UITabNavItem-active')
    callbackFn()
  }

  public getActiveTabNavItem(tabNavItemEl: HTMLElement): HTMLElement {
    let group: string = tabNavItemEl.dataset.group
    return <HTMLElement>document.querySelector(`._UITabNavItem[data-group="${group}"]._UITabNavItem-active`)
  }

  private _handleClick(event: Event) {
    let tabNavItemEl: HTMLElement = <HTMLElement>DOMUtil.findAncestorWithClass(<HTMLElement>event.target, this.tabNavItemClass, false)
    if (
      tabNavItemEl &&
      this.openOnCondition(tabNavItemEl)
    ) {
      event.preventDefault()
      let activeTabNavItemEl: HTMLElement = this.getActiveTabNavItem(tabNavItemEl)
      let callback2: Function = () => {
        this.activateTabFromTabNavItem(tabNavItemEl)
      }
      let callback: Function = () => {
        this.activateTabNavItem(tabNavItemEl, callback2.bind(this))
      }
      this.deactivateTabNavItem(activeTabNavItemEl, callback.bind(this))
    }
    return this
  }

  private startListening() {
    window.addEventListener('click', this._handleClick.bind(this))
    return this
  }

  private stopListening() {
    window.removeEventListener('click', this._handleClick.bind(this))
    return this
  }

}