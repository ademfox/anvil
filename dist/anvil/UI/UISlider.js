"use strict";
exports.__esModule = true;
var Anvil_1 = require("../Anvil");
var UISlider = (function () {
    function UISlider(element) {
        var _this = this;
        this.knobClass = 'knob';
        this.useKnobOnly = true;
        this.fillClass = 'fill';
        this.maximumValue = 1;
        this.minimumValue = 0;
        this.normalizedValue = 0;
        this.value = 0;
        this.edgeSnapTolerance = 8;
        this._clientXDelta = 0;
        this._clientYDelta = 0;
        this._currentFillWidth = 0;
        this._currentKnobLeft = 0;
        this._knobClientXOffset = 0;
        this._knobClientYOffset = 0;
        this._lastClientX = 0;
        this._lastClientY = 0;
        this._previousFillWidth = 0;
        this._previousKnobLeft = 0;
        this.onValueChange = function (context) { };
        this.dragKnobEl = function (knobEl, left) {
            knobEl.style.left = left + "px";
            return _this;
        };
        this.dragFillEl = function (fillEl, width) {
            fillEl.style.width = width + "px";
            return _this;
        };
        this.moveKnob = function (knobEl, left) {
            knobEl.style.left = left + "px";
            return _this;
        };
        this.resizeFill = function (fillEl, width) {
            fillEl.style.width = width + "px";
        };
        this.setElement(element);
        this.initialize();
        return this;
    }
    UISlider.prototype.onActive = function (context) {
        context.element.dataset.value = context.value;
    };
    UISlider.prototype.initialize = function () {
        var knobEl = Anvil_1.DOMUtil.findDescendantWithClass(this.element, this.knobClass, false);
        if (knobEl !== false) {
            this.knobEl = knobEl;
            this.hasKnob = true;
        }
        var fillEl = Anvil_1.DOMUtil.findDescendantWithClass(this.element, this.fillClass, false);
        if (fillEl !== false) {
            this.fillEl = fillEl;
            this.hasFill = true;
        }
        this.startListening();
        this.setValue(this.value);
        return this;
    };
    UISlider.prototype.setNormalizedValue = function (value) {
        this.normalizedValue = value;
        this._computeValueFromNormalizedValue();
        this._computeKnobLeftFromValue();
        this._computeFillWidthFromValue();
        this._adjustKnobAndFill();
        this.onValueChange(this);
        return this;
    };
    UISlider.prototype.setElement = function (element) {
        this.element = element;
        return this;
    };
    UISlider.prototype.setValue = function (value) {
        this.normalizedValue = Anvil_1.Num.modulate(value, [this.minimumValue, this.maximumValue], [0, 1]);
        this._computeValueFromNormalizedValue();
        this._computeKnobLeftFromValue();
        this._computeFillWidthFromValue();
        this._adjustKnobAndFill();
        this.onValueChange(this);
        return this;
    };
    UISlider.prototype._adjustKnobAndFill = function () {
        if (this.hasKnob === true) {
            this.moveKnob(this.knobEl, this._currentKnobLeft, this._previousKnobLeft);
        }
        if (this.hasFill === true) {
            this.resizeFill(this.fillEl, this._currentFillWidth, this._previousFillWidth);
        }
        return this;
    };
    UISlider.prototype._computeKnobLeftFromValue = function () {
        this._previousKnobLeft = this._currentKnobLeft;
        var maxWidth = this.element.offsetWidth - this.knobEl.offsetWidth;
        this._currentKnobLeft = Anvil_1.Num.modulate(this.normalizedValue, [0, 1], [0, maxWidth], true);
        this._constrainKnobLeft();
        return this;
    };
    UISlider.prototype._computeFillWidthFromValue = function () {
        this._previousFillWidth = this._currentFillWidth;
        this._currentFillWidth = Anvil_1.Num.modulate(this.normalizedValue, [0, 1], [this.edgeSnapTolerance, this.element.offsetWidth - this.edgeSnapTolerance], true);
        this._constrainFillWidth();
        this;
    };
    UISlider.prototype._constrainKnobLeft = function () {
        var maxValue = this.element.offsetWidth - this.knobEl.offsetWidth;
        if (this._currentKnobLeft > maxValue) {
            this._currentKnobLeft = maxValue;
        }
        if (this._currentKnobLeft < 0) {
            this._currentKnobLeft = 0;
        }
        return this;
    };
    UISlider.prototype._constrainFillWidth = function () {
        if (this._currentFillWidth > this.element.offsetWidth - this.edgeSnapTolerance) {
            this._currentFillWidth = this.element.offsetWidth;
        }
        if (this._currentFillWidth < this.edgeSnapTolerance) {
            this._currentFillWidth = 0;
        }
        return this;
    };
    UISlider.prototype._computeKnobLeft = function () {
        this._previousKnobLeft = this._currentKnobLeft;
        this._currentKnobLeft += this._clientXDelta;
        if (this._currentKnobLeft < 0) {
            this._currentKnobLeft = 0;
        }
        this._constrainKnobLeft();
        return this;
    };
    UISlider.prototype._computeFillWidthFromKnobLeft = function () {
        this._previousFillWidth = this._currentFillWidth;
        this._currentFillWidth = this._currentKnobLeft + this.knobEl.offsetWidth;
        this._constrainFillWidth();
        return this;
    };
    UISlider.prototype._computeFillWidthFromClientX = function () {
        var elementRect = this.element.getBoundingClientRect();
        this._currentFillWidth = this._lastClientX - elementRect.left;
        this._constrainFillWidth();
        return this;
    };
    UISlider.prototype._computeKnobLeftFromFillWidth = function () {
        this._currentKnobLeft = this._currentFillWidth - (this.knobEl.offsetWidth / 2);
        this._constrainKnobLeft();
        return this;
    };
    UISlider.prototype._computeNormalizedValueFromKnobAndFill = function () {
        if (this.hasKnob === true) {
            this.normalizedValue = Anvil_1.Num.modulate(this._currentKnobLeft, this.element.offsetWidth - this.knobEl.offsetWidth, 1, true);
        }
        else if (this.hasFill === true) {
            this.normalizedValue = Anvil_1.Num.modulate(this._currentFillWidth, [this.edgeSnapTolerance, this.element.offsetWidth - this.edgeSnapTolerance], 1, true);
        }
        return this;
    };
    UISlider.prototype._computeValueFromNormalizedValue = function () {
        this.value = Anvil_1.Num.modulate(this.normalizedValue, 1, [this.minimumValue, this.maximumValue], true);
        return this;
    };
    UISlider.prototype._calculateClientPosition = function (event) {
        var clientX = this._getClientX(event);
        this._clientXDelta = clientX - this._lastClientX;
        this._lastClientX = clientX;
        this;
    };
    UISlider.prototype._computeDrag = function (event) {
        this._calculateClientPosition(event);
        if (this.hasKnob === true &&
            Anvil_1.DOMUtil.hasAncestor(event.target, this.knobEl) !== false) {
            this.knobIsActive = true;
            this._computeKnobLeft();
            this.dragKnobEl(this.knobEl, this._currentKnobLeft);
            if (this.hasFill === true) {
                this._computeFillWidthFromKnobLeft();
                this.dragFillEl(this.fillEl, this._currentFillWidth);
            }
        }
        else if (Anvil_1.DOMUtil.hasAncestor(event.target, this.knobEl) === false &&
            this.hasFill === true &&
            this.useKnobOnly === false) {
            this._computeFillWidthFromClientX();
            this.dragFillEl(this.fillEl, this._currentFillWidth);
            if (this.hasKnob === true) {
                this._computeKnobLeftFromFillWidth();
                this.dragKnobEl(this.knobEl, this._currentKnobLeft);
            }
        }
        this._computeNormalizedValueFromKnobAndFill();
        this._computeValueFromNormalizedValue();
        this.onActive(this);
        return this;
    };
    UISlider.prototype._getClientX = function (event) {
        if (this.isTouch) {
            return event.touches[0].clientX;
        }
        else {
            return event.clientX;
        }
    };
    UISlider.prototype._dragEnd = function (event) {
        if (this.hasKnob === true &&
            this.useKnobOnly === true) {
            this.knobIsActive = false;
        }
        this.isActive = false;
        return this;
    };
    UISlider.prototype._dragTouchStart = function (event) {
        this.isTouch = true;
        this._dragStart(event);
        return this;
    };
    UISlider.prototype._dragStart = function (event) {
        this._lastClientX = this._getClientX(event);
        if (this.isDisabled === false &&
            Anvil_1.DOMUtil.hasAncestor(event.target, this.element) !== false) {
            this.isActive = true;
            this._computeDrag(event);
        }
        return this;
    };
    UISlider.prototype._dragMove = function (event) {
        if (this.isActive) {
            this._computeDrag(event);
        }
        return this;
    };
    UISlider.prototype.startListening = function () {
        window.addEventListener('mousedown', this._dragStart.bind(this));
        window.addEventListener('mousemove', this._dragMove.bind(this));
        window.addEventListener('mouseup', this._dragEnd.bind(this));
        window.addEventListener('touchend', this._dragEnd.bind(this));
        window.addEventListener('touchmove', this._dragMove.bind(this));
        window.addEventListener('touchstart', this._dragTouchStart.bind(this));
        return this;
    };
    UISlider.prototype.stopListening = function () {
        window.removeEventListener('mousedown', this._dragStart);
        window.removeEventListener('mousemove', this._dragMove);
        window.removeEventListener('mouseup', this._dragEnd);
        window.removeEventListener('touchend', this._dragEnd);
        window.removeEventListener('touchmove', this._dragMove);
        window.removeEventListener('touchstart', this._dragTouchStart);
        return this;
    };
    return UISlider;
}());
exports.UISlider = UISlider;
//# sourceMappingURL=UISlider.js.map