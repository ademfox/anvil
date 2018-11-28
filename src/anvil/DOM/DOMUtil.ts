// DOMUtil V1.0

export class DOMUtil {

  // Find ancestor element that match identifierFn.
  public static findAncestor(el: HTMLElement, identifierFn: Function, isMoreThanOneResults: boolean = true) {
    let results: Array<HTMLElement> = new Array
    if (identifierFn(el)) {
      results.push(el)
    }
    let currentEl: HTMLElement = el
    while (currentEl.nodeName !== 'HTML') {
      if (identifierFn(currentEl)) {
        results.push(currentEl)
      }
      currentEl = currentEl.parentElement
    }
    if (results.length > 0) {
      return isMoreThanOneResults === true ? results : results[0]
    } else {
      return false
    }
  }

  // Find ancestor with given class name.
  public static findAncestorWithClass(el: HTMLElement, className: string, isMoreThanOneResults: boolean = true) {
    let identifierFn = function (el: HTMLElement): boolean {
      return el.classList.contains(className)
    }
    return DOMUtil.findAncestor(el, identifierFn, isMoreThanOneResults)
  }

  // Find ancestor with given ID.
  public static findAncestorWithID(el: HTMLElement, ID: string, isMoreThanOneResults: boolean = true) {
    let identifierFn = (el: HTMLElement): boolean => {
      return el.id === ID ? true : false
    }
    return DOMUtil.findAncestor(el, identifierFn, isMoreThanOneResults)
  }

  // Find descendant that match the identifierFn.
  public static findDescendant(el: HTMLElement, identifierFn: Function, isMoreThanOneResults: boolean = true) {
    let results = new Array
    if (identifierFn(el)) {
      results.push(el)
    }
    let inspectDescendant = function (inspectEl: HTMLElement) {
      let childrenEls: HTMLCollection = inspectEl.children
      if (childrenEls.length > 0) {
        for (let index in childrenEls) {
          if (identifierFn(childrenEls[index])) {
            results.push(childrenEls[index])
            if (isMoreThanOneResults === false) {
              break
            }
          }
          if (childrenEls[index].children.length > 0) {
            inspectDescendant(<HTMLElement>childrenEls[index])
          }
        }
      }
    }
    inspectDescendant(el)
    if (results.length > 0) {
      return isMoreThanOneResults === true ? results : results[0]
    } else {
      return false
    }
  }

  // Find descendant with ID.
  public static findDescendantWithID(el: HTMLElement, ID: string, isMoreThanOneResults: boolean = true) {
    let identifierFn = function (el) {
      return el.id === ID ? true : false
    }
    return DOMUtil.findDescendant(el, identifierFn, isMoreThanOneResults)
  }

  // Find descendant with given class name.
  public static findDescendantWithClass(el: HTMLElement, className: string, isMoreThanOneResults: boolean = true) {
    let identifierFn = function (el) {
      return el.classList.contains(className)
    }
    return DOMUtil.findDescendant(el, identifierFn, isMoreThanOneResults)
  }

  public static findSibling(el: HTMLElement, identifierFn: Function, isMoreThanOneResults: boolean = true) {
    let results = DOMUtil.getSiblings(el)
    if (results === false) {
      return false
    }
    let siblingEls: HTMLCollection = results
    if (siblingEls.length > 0) {
      let results: Array<HTMLElement> = new Array
      for (let index in siblingEls) {
        if (identifierFn(siblingEls[index])) {
          results.push(<HTMLElement>siblingEls[index])
        }
      }
      if (results.length > 0) {
        return isMoreThanOneResults === true ? results : results[0]
      }
    }
    return false
  }

  public static findSiblingWithClass(el: HTMLElement, className: string, isMoreThanOneResults: boolean = true) {
    let identifierFn = (el) => {
      return el.classList.contains(className)
    }
    return DOMUtil.findSibling(el, identifierFn, isMoreThanOneResults)
  }

  public static hasAncestor(el: HTMLElement, ancestorEl) {
    let identifierFn = (el) => {
      return el === ancestorEl ? true : false
    }
    return DOMUtil.findAncestor(el, identifierFn, false)
  }

  public static hasDescendant(el: HTMLElement, descendantEl) {
    let identifierFn = (el) => {
      return el === descendantEl ? true : false
    }
    return DOMUtil.findDescendant(el, identifierFn, false)
  }

  public static getOffset(el: HTMLElement): Array<number> {
    let boundingBox = el.getBoundingClientRect()
    return [window.scrollX + boundingBox.left, window.scrollY + boundingBox.top]
  }

  public static getSiblings(el: HTMLElement) {
    let siblingEls: HTMLCollection = el.parentElement.children
    return siblingEls.length > 0 ? siblingEls : false
  }

  public static isAnElement(element): boolean {
    if (
      typeof element === 'object' &&
      typeof element.nodeType === 'number' &&
      element.nodeType === 1
    ) {
      return true
    } else {
      return false
    }
  }

  public static isElementNodeName(element: HTMLElement, name: string): boolean {
    if (
      typeof element === 'object' &&
      typeof element.nodeName === 'string' &&
      element.nodeName === name
    ) {
      return true
    } else {
      return false
    }
  }

}