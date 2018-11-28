import {
  TextBoxModel,
} from '../Anvil'

export class UITextArea {

  // Flags
  public disableLineBreaks: boolean = false
  public disableTabs: boolean = false
  public isInFocus: boolean = false
  public limitNumberOfCharacters: boolean = false
  public removeLeadingWhitespaces: boolean = false
  public removeMultipleWhitespaces: boolean = false

  // Variables
  public element: HTMLTextAreaElement

  // Callbacks
  public onBlur: Function
  public onFocus: Function
  public onInput: Function
  public onPaste: Function

  private _eventInput: Event
  private _eventInputName: string = 'UITextAreaOnInput'
  private _eventKeydown: Event
  private _eventKeydownName: string = 'UITextAreaOnKeydown'
  private _lastKeyCode: number
  private _textBoxModel: TextBoxModel

  constructor(element: HTMLTextAreaElement, properties?: object) {
    this._textBoxModel = new TextBoxModel
    this._eventInput = new CustomEvent(this._eventInputName)
    this._eventKeydown = new CustomEvent(this._eventKeydownName)
    this.setElement(element)
    this.setProperties(properties)
    this.initialize()
    return this
  }

  public initialize() {
    this.onBlur = () => { }
    this.onFocus = () => { }
    this.onInput = () => { }
    this.onPaste = () => { }
    this.filterInput()
    this.grow()
    this.startListening()
    return this
  }

  public setElement(element: HTMLTextAreaElement): UITextArea {
    this.element = element
    return this
  }

  public setProperties(properties: object): UITextArea {
    for (let key in properties) {
      this[key] = properties[key]
    }
    return this
  }

  public grow(): UITextArea {
    let height: number = this._textBoxModel.getTextBoxHeightFromElement(this.element)
    this.element.style.height = `${height}px`
    return this
  }

  public destroy(): UITextArea {
    this.stopListening()
    return this
  }

  public filterInput(): UITextArea {
    // Remove new lines
    if (this.disableLineBreaks === true) {
      this.element.value = this.element.value.replace(/[\r\n]+/g, '')
    }
    // remove tabs
    if (this.disableTabs === true) {
      this.element.value = this.element.value.replace(/[\t]+/g, '')
    }
    // remove multiple whitespaces to one
    if (this.removeMultipleWhitespaces === true) {
      this.element.value = this.element.value.replace(/[\s]+/g, ' ')
    }
    // remove leading whitespaces
    if (this.removeLeadingWhitespaces === true) {
      this.element.value = this.element.value.replace(/^[\s]+/g, '')
    }
    // if limit number of characters is a number
    // trim element value
    if (typeof this.limitNumberOfCharacters === 'number') {
      this.element.value = this.element.value.substring(0, this.limitNumberOfCharacters)
    }
    // replace tabs with spaces
    // this.element.value = this.element.value.replace(/[\t]+/g, '    ')
    return this
  }

  public getSelection(): string {
    let text = this.element.value
    let start = this.element.selectionStart
    let end = this.element.selectionEnd
    return text.substring(start, end)
  }

  public insertString(string: string): UITextArea {
    let start = this.element.selectionStart
    let end = this.element.selectionEnd
    let text = this.element.value
    this.element.value = text.substring(0, start) + string + text.substring(end)
    this.element.selectionEnd = start + string.length
    return this
  }

  public value(value?: string): string {
    if (typeof value === 'string') {
      this.element.value = value
      this.processText()
    }
    return this.element.value
  }

  public processText(): UITextArea {
    this.filterInput()
    this.grow()
    return this
  }

  public startListening(): UITextArea {
    this.element.addEventListener('blur', this._handleBlur.bind(this))
    this.element.addEventListener('focus', this._handleFocus.bind(this))
    this.element.addEventListener('input', this._handleInput.bind(this))
    this.element.addEventListener('keydown', this._handleKeydown.bind(this))
    this.element.addEventListener('paste', this._handlePaste.bind(this))
    window.addEventListener('resize', this._handleInput.bind(this))
    return this
  }

  public stopListening(): UITextArea {
    this.element.removeEventListener('blur', this._handleBlur.bind(this))
    this.element.removeEventListener('focus', this._handleFocus.bind(this))
    this.element.removeEventListener('input', this._handleInput.bind(this))
    this.element.removeEventListener('keydown', this._handleKeydown.bind(this))
    this.element.removeEventListener('paste', this._handlePaste.bind(this))
    window.removeEventListener('resize', this._handleInput.bind(this))
    return this
  }

  // Events

  private _handleBlur(): UITextArea {
    this.isInFocus = false
    return this
  }

  private _handleFocus(): UITextArea {
    this.isInFocus = true
    return this
  }

  private _handleInput(event: KeyboardEvent): UITextArea {
    this.onInput(this)
    this.processText()
    window.dispatchEvent(this._eventInput)
    return this
  }

  private _handleKeydown(event: KeyboardEvent): UITextArea {
    let keyCode: number = event.keyCode
    if (keyCode === 9) {
      this.insertString('\t')
      event.preventDefault()
    }
    if (keyCode === 13 && this.disableLineBreaks === true) {
      event.preventDefault()
    }
    this._lastKeyCode = keyCode
    window.dispatchEvent(this._eventKeydown)
    return this
  }

  private _handlePaste(event: KeyboardEvent): UITextArea {
    this.onPaste(this)
    this.processText()
    return this
  }

}