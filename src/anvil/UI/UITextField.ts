import {
  DOMUtil,
} from '../Anvil'

export class UITextField {

  // Flags
  allowDecimals: boolean
  disableTabs: boolean
  isEmpty: boolean
  isInFocus: boolean
  isShowingValuePlaceholder: boolean
  limitNumberOfCharacters: boolean
  numbersOnly: boolean
  placeholder: string
  removeLeadingWhitespaces: boolean
  removeMultipleWhitespaces: boolean
  value: string
  valuePlaceholder: string

  // Callbacks
  onBlur: Function
  onFocus: Function
  onInput: Function
  onPaste: Function

  // Variables
  element: HTMLInputElement

  _eventBlur: Event
  _eventFocus: Event
  _eventInput: Event
  _eventKeydown: Event

  _eventBlurName: string = 'UITextFieldOnBlur'
  _eventFocusName: string = 'UITextFieldOnFocus'
  _eventInputName: string = 'UITextFieldOnInput'
  _eventKeydownName: string = 'UITextFieldOnKeydown'
  _eventPasteName: string = 'UITextFieldOnPaste'

  constructor(element: HTMLInputElement, properties?: object) {
    this.setElement(element)
    if (typeof properties !== 'undefined') {
      this.setProperties(properties)
    }
    this.initialize()
    return this
  }

  public initialize(): UITextField {
    this._eventBlur = new CustomEvent(this._eventBlurName)
    this._eventFocus = new CustomEvent(this._eventFocusName)
    this._eventInput = new CustomEvent(this._eventInputName)
    this._eventKeydown = new CustomEvent(this._eventKeydownName)
    if (this.element.value === '') {
      this.isEmpty = true
      this.element.value = this.valuePlaceholder
    }
    this.filterInput()
    this._processValuePlaceholder()
    this.startListening()
    return this
  }

  public setElement(element: HTMLInputElement): UITextField {
    this.element = element
    return this
  }

  public setProperties(properties: object): UITextField {
    for (let key in properties) {
      this[key] = properties[key]
    }
    return this
  }

  public setValue(value): UITextField {
    this.isShowingValuePlaceholder = false
    this.value = value
    this.element.value = value
    return this
  }

  public getValue(): string {
    if (this.isShowingValuePlaceholder === true) {
      this.value = ''
    } else {
      this.value = this.element.value
    }
    return this.value
  }

  public _processValuePlaceholder(): UITextField {
    if (
      this.isInFocus === false &&
      this.element.value === ''
    ) {
      this.element.value = this.valuePlaceholder
      this.isShowingValuePlaceholder = true
    } else if (
      this.isInFocus === true &&
      this.element.value === this.valuePlaceholder
    ) {
      this.element.value = ''
      this.isShowingValuePlaceholder = false
    }
    return this
  }

  public filterInput() {
    // Remove multiple whitespaces to one.
    if (this.removeMultipleWhitespaces && true) {
      this.element.value = this.element.value.replace(/[\s]+/g, ' ')
    }
    // Remove leading whitespaces.
    if (this.removeLeadingWhitespaces && true) {
      this.element.value = this.element.value.replace(/^[\s]+/g, '')
    }
    // If limit number of characters is a number.
    // Trim element value.
    if (typeof this.limitNumberOfCharacters === 'number') {
      this.element.value = this.element.value.substring(0, this.limitNumberOfCharacters)
    }
    return this
  }

  public clear() {
    this.isEmpty = true
    this.element.value = this.placeholder
    return this
  }

  public getSelection() {
    this.element.value.substring(this.element.selectionStart, this.element.selectionEnd)
  }

  public insertString(string: string) {
    let start = this.element.selectionStart
    let end = this.element.selectionEnd
    // Set input value to:
    // Text before caret + tab + text after caret.
    let text = this.element.value
    this.element.value = text.substring(0, start) + string + text.substring(end)
    // Put caret position back.
    this.element.selectionEnd = start + 1
    return this
  }

  public startListening() {
    this.element.addEventListener('blur', this._handleBlur)
    this.element.addEventListener('focus', this._handleFocus)
    this.element.addEventListener('input', this._handleInput)
    this.element.addEventListener('keydown', this._handleKeydown)
    this.element.addEventListener('paste', this._handlePaste)
    return this
  }

  public stopListening() {
    this.element.removeEventListener('blur', this._handleBlur)
    this.element.removeEventListener('focus', this._handleFocus)
    this.element.removeEventListener('input', this._handleInput)
    this.element.removeEventListener('keydown', this._handleKeydown)
    this.element.removeEventListener('paste', this._handlePaste)
    return this
  }

  // Events

  public _handleBlur() {
    this.isInFocus = false
    this._processValuePlaceholder()
    this.onBlur(this)
    window.dispatchEvent(this._eventBlur)
    return this
  }

  public _handleFocus() {
    this.isInFocus = true
    this._processValuePlaceholder()
    window.dispatchEvent(this._eventFocus)
    this.onFocus(this)
    return this
  }

  public _handleInput() {
    this.filterInput()
    window.dispatchEvent(this._eventInput)
    this.onInput(this)
    return this
  }

  public _handleKeydown(event) {
    window.dispatchEvent(this._eventKeydown)
    return this
  }

  public _handlePaste(event) {
    this.filterInput()
    this.onPaste(this)
    return this
  }

}