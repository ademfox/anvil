export class TextBoxModel {

  private element: HTMLElement | HTMLInputElement | HTMLTextAreaElement;

  private defaultAttributes: Object = {
    border: 'none',
    height: '0px',
    left: '0px',
    overflowWrap: 'normal',
    overflowX: 'hidden',
    overflowY: 'hidden',
    padding: '0px',
    position: 'fixed',
    resize: 'none',
    top: '0px',
    visibility: 'hidden',
    whiteSpace: 'nowrap',
    width: '0px',
    zIndex: '-9999',
  };

  private styleProperties: string[] = [
    'borderBottomStyle',
    'borderBottomWidth',
    'borderLeftStyle',
    'borderLeftWidth',
    'borderRightStyle',
    'borderRightWidth',
    'borderTopStyle',
    'borderTopWidth',
    'boxSizing',
    'height',
    'maxHeight',
    'maxWidth',
    'minHeight',
    'minWidth',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'width',
  ];

  private fontStyleProperties: string[] = [
    'direction',
    'fontFamily',
    'fontSize',
    'fontSizeAdjust',
    'fontStyle',
    'fontVariant',
    'fontWeight',
    'letterSpacing',
    'lineHeight',
    'tabSize',
    'textAlign',
    'textDecoration',
    'textIndent',
    'textOverflow',
    'textTransform',
    'whiteSpace',
    'wordBreak',
    'wordSpacing',
    'wordWrap',
  ];

  constructor() { }

  public getTextBoxHeightFromElement(element: HTMLElement, text?: string): number {
    this
      .destroy()
      .create('TEXTAREA')
      .applyDefaultAttributes()
      .applyBoxModelPropertiesFromElement(element)
      .applyFontPropertiesFromElement(element);
    this.element.style.maxHeight = '0px'
    this.element.style.height = '0px'
    this.element.style.whiteSpace = 'pre-wrap'
    if (typeof text === 'undefined') {
      text = this.getTextFromElement(element)
    }
    this.setText(text)
    let offset: number = 0
    let style: CSSStyleDeclaration = window.getComputedStyle(element, null)
    if (style['boxSizing'] === 'border-box') {
      offset = this.getElementVerticalBorderHeight(element)
    }
    return this.element.scrollHeight + offset
  }

  public getTextBoxWidthFromElement(element: HTMLElement, text?: string): number {
    this
      .destroy()
      .create('DIV')
      .applyDefaultAttributes()
      .applyBoxModelPropertiesFromElement(element)
      .applyFontPropertiesFromElement(element)
      .setStyle({
        borderLeftWidth: '0px',
        borderRightWidth: '0px',
        boxSizing: 'content-box',
        minWidth: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        whiteSpace: 'nowrap',
        width: '0px',
        wordBreak: 'normal',
        wordWrap: 'normal'
      })
    if (typeof text === 'undefined') {
      text = this.getTextFromElement(element)
    }
    this.setText(text)
    let offset: number = 0
    let style: CSSStyleDeclaration = window.getComputedStyle(element, null)
    if (style['boxSizing'] === 'border-box') {
      offset = this.getElementHorizontalBorderWidth(element)
      offset += this.getElementHorizontalPaddingWidth(element)
    }
    return this.element.scrollWidth + offset
  }

  // Model

  public applyDefaultAttributes(): TextBoxModel {
    for (let key in this.defaultAttributes) {
      this.element.style[key] = this.defaultAttributes[key];
    }
    return this;
  }

  public applyBoxModelPropertiesFromElement(element: HTMLElement): TextBoxModel {
    let style: CSSStyleDeclaration = window.getComputedStyle(element, null)
    for (let name of this.styleProperties) {
      this.element.style[name] = style[name]
    }
    return this
  }

  public applyFontPropertiesFromElement(element: HTMLElement): TextBoxModel {
    let style: CSSStyleDeclaration = window.getComputedStyle(element, null)
    for (let name of this.fontStyleProperties) {
      this.element.style[name] = style[name]
    }
    return this
  }

  public create(type: string | undefined): TextBoxModel {
    type = typeof type === 'string' ? type : 'TEXTAREA'
    this.element = document.createElement(type)
    document.body.appendChild(this.element)
    return this
  }

  public destroy(): TextBoxModel {
    if (
      typeof this.element !== 'undefined' &&
      this.element.nodeType === 1
    ) {
      document.body.removeChild(this.element)
      this.element.remove()
    }
    return this
  }

  public setFontSize(fontSize: number): TextBoxModel {
    this.element.style.fontSize = `${fontSize}px`
    return this
  }

  public setStyle(style: Object): TextBoxModel {
    for (let key in style) {
      this.element.style[key] = style[key]
    }
    return this
  }

  public setText(text: string): TextBoxModel {
    if (
      this.element instanceof HTMLTextAreaElement ||
      this.element instanceof HTMLInputElement ||
      this.element.nodeName === 'TEXTAREA' ||
      this.element.nodeName === 'INPUT'
    ) {
      (<HTMLTextAreaElement | HTMLInputElement>this.element).value = text
    } else {
      text = text.replace(/[\n\r]/g, '<br>')
      text = text.replace(/[\t]/g, '&#9')
      text = text.replace(/[\s]/g, '&nbsp')
      this.element.innerHTML = text
    }
    return this
  }

  // Element

  public getElementFontSize(element: HTMLElement): number {
    let style: CSSStyleDeclaration = window.getComputedStyle(element, null)
    return parseFloat(style['font-size'])
  }

  public getTextFromElement(element: HTMLElement): string {
    if (
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLInputElement ||
      element.nodeName === 'INPUT' ||
      element.nodeName === 'TEXTAREA'
    ) {
      return (<HTMLTextAreaElement | HTMLInputElement>element).value
    } else {
      return element.textContent
    }
  }

  public getElementHorizontalBorderWidth(element: HTMLElement): number {
    let style: CSSStyleDeclaration = window.getComputedStyle(element, null)
    let width: number = parseFloat(style['borderLeftWidth'])
    return width + parseFloat(style['borderRightWidth'])
  }

  public getElementHorizontalPaddingWidth(element: HTMLElement): number {
    let style: CSSStyleDeclaration = window.getComputedStyle(element, null)
    let width: number = parseFloat(style['paddingLeft'])
    return width + parseFloat(style['paddingRight'])
  }

  public getElementLineHeight(element: HTMLElement): number {
    let style: CSSStyleDeclaration = window.getComputedStyle(element, null)
    return parseFloat(style['line-height'])
  }

  public getElementVerticalBorderHeight(element: HTMLElement): number {
    let style: CSSStyleDeclaration = window.getComputedStyle(element, null)
    let height: number = parseFloat(style['borderBottomWidth'])
    return height + parseFloat(style['borderTopWidth'])
  }

  public getElementVerticalPaddingHeight(element: HTMLElement): number {
    let style: CSSStyleDeclaration = window.getComputedStyle(element, null)
    let height: number = parseFloat(style['paddingBottom'])
    return height + parseFloat(style['paddingTop'])
  }

  public setElementFontSize(element: HTMLElement, fontSize: number): TextBoxModel {
    element.style.fontSize = `${fontSize}px`
    return this
  }

}