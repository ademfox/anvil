"use strict";
exports.__esModule = true;
var UITextField = (function () {
    function UITextField(element, properties) {
        this._eventBlurName = 'UITextFieldOnBlur';
        this._eventFocusName = 'UITextFieldOnFocus';
        this._eventInputName = 'UITextFieldOnInput';
        this._eventKeydownName = 'UITextFieldOnKeydown';
        this._eventPasteName = 'UITextFieldOnPaste';
        this.setElement(element);
        if (typeof properties !== 'undefined') {
            this.setProperties(properties);
        }
        this.initialize();
        return this;
    }
    UITextField.prototype.initialize = function () {
        this._eventBlur = new CustomEvent(this._eventBlurName);
        this._eventFocus = new CustomEvent(this._eventFocusName);
        this._eventInput = new CustomEvent(this._eventInputName);
        this._eventKeydown = new CustomEvent(this._eventKeydownName);
        if (this.element.value === '') {
            this.isEmpty = true;
            this.element.value = this.valuePlaceholder;
        }
        this.filterInput();
        this._processValuePlaceholder();
        this.startListening();
        return this;
    };
    UITextField.prototype.setElement = function (element) {
        this.element = element;
        return this;
    };
    UITextField.prototype.setProperties = function (properties) {
        for (var key in properties) {
            this[key] = properties[key];
        }
        return this;
    };
    UITextField.prototype.setValue = function (value) {
        this.isShowingValuePlaceholder = false;
        this.value = value;
        this.element.value = value;
        return this;
    };
    UITextField.prototype.getValue = function () {
        if (this.isShowingValuePlaceholder === true) {
            this.value = '';
        }
        else {
            this.value = this.element.value;
        }
        return this.value;
    };
    UITextField.prototype._processValuePlaceholder = function () {
        if (this.isInFocus === false &&
            this.element.value === '') {
            this.element.value = this.valuePlaceholder;
            this.isShowingValuePlaceholder = true;
        }
        else if (this.isInFocus === true &&
            this.element.value === this.valuePlaceholder) {
            this.element.value = '';
            this.isShowingValuePlaceholder = false;
        }
        return this;
    };
    UITextField.prototype.filterInput = function () {
        if (this.removeMultipleWhitespaces && true) {
            this.element.value = this.element.value.replace(/[\s]+/g, ' ');
        }
        if (this.removeLeadingWhitespaces && true) {
            this.element.value = this.element.value.replace(/^[\s]+/g, '');
        }
        if (typeof this.limitNumberOfCharacters === 'number') {
            this.element.value = this.element.value.substring(0, this.limitNumberOfCharacters);
        }
        return this;
    };
    UITextField.prototype.clear = function () {
        this.isEmpty = true;
        this.element.value = this.placeholder;
        return this;
    };
    UITextField.prototype.getSelection = function () {
        this.element.value.substring(this.element.selectionStart, this.element.selectionEnd);
    };
    UITextField.prototype.insertString = function (string) {
        var start = this.element.selectionStart;
        var end = this.element.selectionEnd;
        var text = this.element.value;
        this.element.value = text.substring(0, start) + string + text.substring(end);
        this.element.selectionEnd = start + 1;
        return this;
    };
    UITextField.prototype.startListening = function () {
        this.element.addEventListener('blur', this._handleBlur);
        this.element.addEventListener('focus', this._handleFocus);
        this.element.addEventListener('input', this._handleInput);
        this.element.addEventListener('keydown', this._handleKeydown);
        this.element.addEventListener('paste', this._handlePaste);
        return this;
    };
    UITextField.prototype.stopListening = function () {
        this.element.removeEventListener('blur', this._handleBlur);
        this.element.removeEventListener('focus', this._handleFocus);
        this.element.removeEventListener('input', this._handleInput);
        this.element.removeEventListener('keydown', this._handleKeydown);
        this.element.removeEventListener('paste', this._handlePaste);
        return this;
    };
    UITextField.prototype._handleBlur = function () {
        this.isInFocus = false;
        this._processValuePlaceholder();
        this.onBlur(this);
        window.dispatchEvent(this._eventBlur);
        return this;
    };
    UITextField.prototype._handleFocus = function () {
        this.isInFocus = true;
        this._processValuePlaceholder();
        window.dispatchEvent(this._eventFocus);
        this.onFocus(this);
        return this;
    };
    UITextField.prototype._handleInput = function () {
        this.filterInput();
        window.dispatchEvent(this._eventInput);
        this.onInput(this);
        return this;
    };
    UITextField.prototype._handleKeydown = function (event) {
        window.dispatchEvent(this._eventKeydown);
        return this;
    };
    UITextField.prototype._handlePaste = function (event) {
        this.filterInput();
        this.onPaste(this);
        return this;
    };
    return UITextField;
}());
exports.UITextField = UITextField;
//# sourceMappingURL=UITextField.js.map