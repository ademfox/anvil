import {
  DOMUtil,
  Num,
} from '../Anvil'

export class UISlider {

  element: HTMLElement

  isActive: boolean
  isDisabled: boolean
  isTouch: boolean

  hasKnob: boolean
  knobClass: string = 'knob'
  knobEl: HTMLElement
  knobIsActive: boolean
  useKnobOnly: boolean = true

  hasFill: boolean
  fillClass: string = 'fill'
  fillEl: HTMLElement

  maximumValue: number = 1
  minimumValue: number = 0
  normalizedValue: number = 0
  value: number = 0
  edgeSnapTolerance: number = 8

  _clientXDelta: number = 0
  _clientYDelta: number = 0
  _currentFillWidth: number = 0
  _currentKnobLeft: number = 0
  _knobClientXOffset: number = 0
  _knobClientYOffset: number = 0
  _lastClientX: number = 0
  _lastClientY: number = 0
  _previousFillWidth: number = 0
  _previousKnobLeft: number = 0

  public onActive(context) {
    context.element.dataset.value = context.value
  }

  public onValueChange: Function = (context) => { }

  public constructor(element: HTMLElement) {
    this.setElement(element)
    this.initialize()
    return this
  }

  public initialize() {
    let knobEl = DOMUtil.findDescendantWithClass(this.element, this.knobClass, false)
    if (knobEl !== false) {
      this.knobEl = knobEl
      this.hasKnob = true
    }
    let fillEl = DOMUtil.findDescendantWithClass(this.element, this.fillClass, false)
    if (fillEl !== false) {
      this.fillEl = fillEl
      this.hasFill = true
    }
    this.startListening()
    this.setValue(this.value)
    return this
  }

  public dragKnobEl: Function = (knobEl: HTMLElement, left: number) => {
    knobEl.style.left = `${left}px`
    return this
  }

  public dragFillEl: Function = (fillEl: HTMLElement, width: number) => {
    fillEl.style.width = `${width}px`
    return this
  }

  public setNormalizedValue(value) {
    this.normalizedValue = value
    this._computeValueFromNormalizedValue()
    this._computeKnobLeftFromValue()
    this._computeFillWidthFromValue()
    this._adjustKnobAndFill()
    this.onValueChange(this)
    return this
  }

  public setElement(element: HTMLElement) {
    this.element = element
    return this
  }

  public setValue(value) {
    this.normalizedValue = Num.modulate(value, [this.minimumValue, this.maximumValue], [0, 1])
    this._computeValueFromNormalizedValue()
    this._computeKnobLeftFromValue()
    this._computeFillWidthFromValue()
    this._adjustKnobAndFill()
    this.onValueChange(this)
    return this
  }

  public moveKnob: Function = (knobEl: HTMLElement, left: number) => {
    knobEl.style.left = `${left}px`
    return this
  }

  public resizeFill: Function = (fillEl: HTMLElement, width: number) => {
    fillEl.style.width = `${width}px`
  }

  public _adjustKnobAndFill() {
    if (this.hasKnob === true) {
      this.moveKnob(this.knobEl, this._currentKnobLeft, this._previousKnobLeft)
    }
    if (this.hasFill === true) {
      this.resizeFill(this.fillEl, this._currentFillWidth, this._previousFillWidth)
    }
    return this
  }

  private _computeKnobLeftFromValue() {
    this._previousKnobLeft = this._currentKnobLeft
    let maxWidth: number = this.element.offsetWidth - this.knobEl.offsetWidth
    this._currentKnobLeft = Num.modulate(this.normalizedValue, [0, 1], [0, maxWidth], true)
    this._constrainKnobLeft()
    return this
  }

  private _computeFillWidthFromValue() {
    this._previousFillWidth = this._currentFillWidth
    this._currentFillWidth = Num.modulate(
      this.normalizedValue, [0, 1],
      [this.edgeSnapTolerance, this.element.offsetWidth - this.edgeSnapTolerance],
      true
    )
    this._constrainFillWidth()
    this
  }

  private _constrainKnobLeft() {
    let maxValue = this.element.offsetWidth - this.knobEl.offsetWidth
    if (this._currentKnobLeft > maxValue) {
      this._currentKnobLeft = maxValue
    }
    if (this._currentKnobLeft < 0) {
      this._currentKnobLeft = 0
    }
    return this
  }

  private _constrainFillWidth() {
    if (this._currentFillWidth > this.element.offsetWidth - this.edgeSnapTolerance) {
      this._currentFillWidth = this.element.offsetWidth
    }
    if (this._currentFillWidth < this.edgeSnapTolerance) {
      this._currentFillWidth = 0
    }
    return this
  }

  private _computeKnobLeft() {
    this._previousKnobLeft = this._currentKnobLeft
    this._currentKnobLeft += this._clientXDelta
    if (this._currentKnobLeft < 0) {
      this._currentKnobLeft = 0
    }
    this._constrainKnobLeft()
    return this
  }

  private _computeFillWidthFromKnobLeft() {
    this._previousFillWidth = this._currentFillWidth
    this._currentFillWidth = this._currentKnobLeft + this.knobEl.offsetWidth
    this._constrainFillWidth()
    return this
  }

  private _computeFillWidthFromClientX() {
    let elementRect = this.element.getBoundingClientRect()
    this._currentFillWidth = this._lastClientX - elementRect.left
    this._constrainFillWidth()
    return this
  }

  private _computeKnobLeftFromFillWidth() {
    this._currentKnobLeft = this._currentFillWidth - (this.knobEl.offsetWidth / 2)
    this._constrainKnobLeft()
    return this
  }

  private _computeNormalizedValueFromKnobAndFill() {
    if (this.hasKnob === true) {
      this.normalizedValue = Num.modulate(
        this._currentKnobLeft, this.element.offsetWidth - this.knobEl.offsetWidth, 1, true
      )
    } else if (this.hasFill === true) {
      this.normalizedValue = Num.modulate(
        this._currentFillWidth,
        [this.edgeSnapTolerance, this.element.offsetWidth - this.edgeSnapTolerance],
        1, true
      )
    }
    return this
  }

  private _computeValueFromNormalizedValue() {
    this.value = Num.modulate(this.normalizedValue, 1, [this.minimumValue, this.maximumValue], true)
    return this
  }

  private _calculateClientPosition(event) {
    let clientX = this._getClientX(event)
    this._clientXDelta = clientX - this._lastClientX
    this._lastClientX = clientX
    this
  }

  private _computeDrag(event) {
    this._calculateClientPosition(event)
    if (
      this.hasKnob === true &&
      DOMUtil.hasAncestor(event.target, this.knobEl) !== false
    ) {
      this.knobIsActive = true
      this._computeKnobLeft()
      this.dragKnobEl(this.knobEl, this._currentKnobLeft)
      if (this.hasFill === true) {
        this._computeFillWidthFromKnobLeft()
        this.dragFillEl(this.fillEl, this._currentFillWidth)
      }
    } else if (
      DOMUtil.hasAncestor(event.target, this.knobEl) === false &&
      this.hasFill === true &&
      this.useKnobOnly === false
    ) {
      this._computeFillWidthFromClientX()
      this.dragFillEl(this.fillEl, this._currentFillWidth)
      if (this.hasKnob === true) {
        this._computeKnobLeftFromFillWidth()
        this.dragKnobEl(this.knobEl, this._currentKnobLeft)
      }
    }
    this._computeNormalizedValueFromKnobAndFill()
    this._computeValueFromNormalizedValue()
    this.onActive(this)
    return this
  }

  private _getClientX(event) {
    if (this.isTouch) {
      return event.touches[0].clientX
    } else {
      return event.clientX
    }
  }

  private _dragEnd(event) {
    if (
      this.hasKnob === true &&
      this.useKnobOnly === true
    ) {
      this.knobIsActive = false
    }
    this.isActive = false
    return this
  }

  private _dragTouchStart(event) {
    this.isTouch = true
    this._dragStart(event)
    return this
  }

  private _dragStart(event) {
    this._lastClientX = this._getClientX(event)
    if (
      this.isDisabled === false &&
      DOMUtil.hasAncestor(event.target, this.element) !== false
    ) {
      this.isActive = true
      this._computeDrag(event)
    }
    return this
  }

  private _dragMove(event) {
    if (this.isActive) {
      this._computeDrag(event)
    }
    return this
  }

  public startListening() {
    window.addEventListener('mousedown', this._dragStart.bind(this))
    window.addEventListener('mousemove', this._dragMove.bind(this))
    window.addEventListener('mouseup', this._dragEnd.bind(this))
    window.addEventListener('touchend', this._dragEnd.bind(this))
    window.addEventListener('touchmove', this._dragMove.bind(this))
    window.addEventListener('touchstart', this._dragTouchStart.bind(this))
    return this
  }

  public stopListening() {
    window.removeEventListener('mousedown', this._dragStart)
    window.removeEventListener('mousemove', this._dragMove)
    window.removeEventListener('mouseup', this._dragEnd)
    window.removeEventListener('touchend', this._dragEnd)
    window.removeEventListener('touchmove', this._dragMove)
    window.removeEventListener('touchstart', this._dragTouchStart)
    return this
  }

}