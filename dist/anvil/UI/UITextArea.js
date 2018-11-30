"use strict";
exports.__esModule = true;
var Anvil_1 = require("../Anvil");
var UITextArea = (function () {
    function UITextArea(element, properties) {
        this.disableLineBreaks = false;
        this.disableTabs = false;
        this.isInFocus = false;
        this.limitNumberOfCharacters = false;
        this.removeLeadingWhitespaces = false;
        this.removeMultipleWhitespaces = false;
        this._eventInputName = 'UITextAreaOnInput';
        this._eventKeydownName = 'UITextAreaOnKeydown';
        this._textBoxModel = new Anvil_1.TextBoxModel;
        this._eventInput = new CustomEvent(this._eventInputName);
        this._eventKeydown = new CustomEvent(this._eventKeydownName);
        this.setElement(element);
        this.setProperties(properties);
        this.initialize();
        return this;
    }
    UITextArea.prototype.initialize = function () {
        this.onBlur = function () { };
        this.onFocus = function () { };
        this.onInput = function () { };
        this.onPaste = function () { };
        this.filterInput();
        this.grow();
        this.startListening();
        return this;
    };
    UITextArea.prototype.setElement = function (element) {
        this.element = element;
        return this;
    };
    UITextArea.prototype.setProperties = function (properties) {
        for (var key in properties) {
            this[key] = properties[key];
        }
        return this;
    };
    UITextArea.prototype.grow = function () {
        var height = this._textBoxModel.getTextBoxHeightFromElement(this.element);
        this.element.style.height = height + "px";
        return this;
    };
    UITextArea.prototype.destroy = function () {
        this.stopListening();
        return this;
    };
    UITextArea.prototype.filterInput = function () {
        if (this.disableLineBreaks === true) {
            this.element.value = this.element.value.replace(/[\r\n]+/g, '');
        }
        if (this.disableTabs === true) {
            this.element.value = this.element.value.replace(/[\t]+/g, '');
        }
        if (this.removeMultipleWhitespaces === true) {
            this.element.value = this.element.value.replace(/[\s]+/g, ' ');
        }
        if (this.removeLeadingWhitespaces === true) {
            this.element.value = this.element.value.replace(/^[\s]+/g, '');
        }
        if (typeof this.limitNumberOfCharacters === 'number') {
            this.element.value = this.element.value.substring(0, this.limitNumberOfCharacters);
        }
        return this;
    };
    UITextArea.prototype.getSelection = function () {
        var text = this.element.value;
        var start = this.element.selectionStart;
        var end = this.element.selectionEnd;
        return text.substring(start, end);
    };
    UITextArea.prototype.insertString = function (string) {
        var start = this.element.selectionStart;
        var end = this.element.selectionEnd;
        var text = this.element.value;
        this.element.value = text.substring(0, start) + string + text.substring(end);
        this.element.selectionEnd = start + string.length;
        return this;
    };
    UITextArea.prototype.value = function (value) {
        if (typeof value === 'string') {
            this.element.value = value;
            this.processText();
        }
        return this.element.value;
    };
    UITextArea.prototype.processText = function () {
        this.filterInput();
        this.grow();
        return this;
    };
    UITextArea.prototype.startListening = function () {
        this.element.addEventListener('blur', this._handleBlur.bind(this));
        this.element.addEventListener('focus', this._handleFocus.bind(this));
        this.element.addEventListener('input', this._handleInput.bind(this));
        this.element.addEventListener('keydown', this._handleKeydown.bind(this));
        this.element.addEventListener('paste', this._handlePaste.bind(this));
        window.addEventListener('resize', this._handleInput.bind(this));
        return this;
    };
    UITextArea.prototype.stopListening = function () {
        this.element.removeEventListener('blur', this._handleBlur.bind(this));
        this.element.removeEventListener('focus', this._handleFocus.bind(this));
        this.element.removeEventListener('input', this._handleInput.bind(this));
        this.element.removeEventListener('keydown', this._handleKeydown.bind(this));
        this.element.removeEventListener('paste', this._handlePaste.bind(this));
        window.removeEventListener('resize', this._handleInput.bind(this));
        return this;
    };
    UITextArea.prototype._handleBlur = function () {
        this.isInFocus = false;
        return this;
    };
    UITextArea.prototype._handleFocus = function () {
        this.isInFocus = true;
        return this;
    };
    UITextArea.prototype._handleInput = function (event) {
        this.onInput(this);
        this.processText();
        window.dispatchEvent(this._eventInput);
        return this;
    };
    UITextArea.prototype._handleKeydown = function (event) {
        var keyCode = event.keyCode;
        if (keyCode === 9) {
            this.insertString('\t');
            event.preventDefault();
        }
        if (keyCode === 13 && this.disableLineBreaks === true) {
            event.preventDefault();
        }
        this._lastKeyCode = keyCode;
        window.dispatchEvent(this._eventKeydown);
        return this;
    };
    UITextArea.prototype._handlePaste = function (event) {
        this.onPaste(this);
        this.processText();
        return this;
    };
    return UITextArea;
}());
exports.UITextArea = UITextArea;
//# sourceMappingURL=UITextArea.js.map