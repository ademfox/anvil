"use strict";
exports.__esModule = true;
var TextBoxModel = (function () {
    function TextBoxModel() {
        this.defaultAttributes = {
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
            zIndex: '-9999'
        };
        this.styleProperties = [
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
        this.fontStyleProperties = [
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
    }
    TextBoxModel.prototype.getTextBoxHeightFromElement = function (element, text) {
        this
            .destroy()
            .create('TEXTAREA')
            .applyDefaultAttributes()
            .applyBoxModelPropertiesFromElement(element)
            .applyFontPropertiesFromElement(element);
        this.element.style.maxHeight = '0px';
        this.element.style.height = '0px';
        this.element.style.whiteSpace = 'pre-wrap';
        if (typeof text === 'undefined') {
            text = this.getTextFromElement(element);
        }
        this.setText(text);
        var offset = 0;
        var style = window.getComputedStyle(element, null);
        if (style['boxSizing'] === 'border-box') {
            offset = this.getElementVerticalBorderHeight(element);
        }
        return this.element.scrollHeight + offset;
    };
    TextBoxModel.prototype.getTextBoxWidthFromElement = function (element, text) {
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
        });
        if (typeof text === 'undefined') {
            text = this.getTextFromElement(element);
        }
        this.setText(text);
        var offset = 0;
        var style = window.getComputedStyle(element, null);
        if (style['boxSizing'] === 'border-box') {
            offset = this.getElementHorizontalBorderWidth(element);
            offset += this.getElementHorizontalPaddingWidth(element);
        }
        return this.element.scrollWidth + offset;
    };
    TextBoxModel.prototype.applyDefaultAttributes = function () {
        for (var key in this.defaultAttributes) {
            this.element.style[key] = this.defaultAttributes[key];
        }
        return this;
    };
    TextBoxModel.prototype.applyBoxModelPropertiesFromElement = function (element) {
        var style = window.getComputedStyle(element, null);
        for (var _i = 0, _a = this.styleProperties; _i < _a.length; _i++) {
            var name_1 = _a[_i];
            this.element.style[name_1] = style[name_1];
        }
        return this;
    };
    TextBoxModel.prototype.applyFontPropertiesFromElement = function (element) {
        var style = window.getComputedStyle(element, null);
        for (var _i = 0, _a = this.fontStyleProperties; _i < _a.length; _i++) {
            var name_2 = _a[_i];
            this.element.style[name_2] = style[name_2];
        }
        return this;
    };
    TextBoxModel.prototype.create = function (type) {
        type = typeof type === 'string' ? type : 'TEXTAREA';
        this.element = document.createElement(type);
        document.body.appendChild(this.element);
        return this;
    };
    TextBoxModel.prototype.destroy = function () {
        if (typeof this.element !== 'undefined' &&
            this.element.nodeType === 1) {
            document.body.removeChild(this.element);
            this.element.remove();
        }
        return this;
    };
    TextBoxModel.prototype.setFontSize = function (fontSize) {
        this.element.style.fontSize = fontSize + "px";
        return this;
    };
    TextBoxModel.prototype.setStyle = function (style) {
        for (var key in style) {
            this.element.style[key] = style[key];
        }
        return this;
    };
    TextBoxModel.prototype.setText = function (text) {
        if (this.element instanceof HTMLTextAreaElement ||
            this.element instanceof HTMLInputElement ||
            this.element.nodeName === 'TEXTAREA' ||
            this.element.nodeName === 'INPUT') {
            this.element.value = text;
        }
        else {
            text = text.replace(/[\n\r]/g, '<br>');
            text = text.replace(/[\t]/g, '&#9');
            text = text.replace(/[\s]/g, '&nbsp');
            this.element.innerHTML = text;
        }
        return this;
    };
    TextBoxModel.prototype.getElementFontSize = function (element) {
        var style = window.getComputedStyle(element, null);
        return parseFloat(style['font-size']);
    };
    TextBoxModel.prototype.getTextFromElement = function (element) {
        if (element instanceof HTMLTextAreaElement ||
            element instanceof HTMLInputElement ||
            element.nodeName === 'INPUT' ||
            element.nodeName === 'TEXTAREA') {
            return element.value;
        }
        else {
            return element.textContent;
        }
    };
    TextBoxModel.prototype.getElementHorizontalBorderWidth = function (element) {
        var style = window.getComputedStyle(element, null);
        var width = parseFloat(style['borderLeftWidth']);
        return width + parseFloat(style['borderRightWidth']);
    };
    TextBoxModel.prototype.getElementHorizontalPaddingWidth = function (element) {
        var style = window.getComputedStyle(element, null);
        var width = parseFloat(style['paddingLeft']);
        return width + parseFloat(style['paddingRight']);
    };
    TextBoxModel.prototype.getElementLineHeight = function (element) {
        var style = window.getComputedStyle(element, null);
        return parseFloat(style['line-height']);
    };
    TextBoxModel.prototype.getElementVerticalBorderHeight = function (element) {
        var style = window.getComputedStyle(element, null);
        var height = parseFloat(style['borderBottomWidth']);
        return height + parseFloat(style['borderTopWidth']);
    };
    TextBoxModel.prototype.getElementVerticalPaddingHeight = function (element) {
        var style = window.getComputedStyle(element, null);
        var height = parseFloat(style['paddingBottom']);
        return height + parseFloat(style['paddingTop']);
    };
    TextBoxModel.prototype.setElementFontSize = function (element, fontSize) {
        element.style.fontSize = fontSize + "px";
        return this;
    };
    return TextBoxModel;
}());
exports.TextBoxModel = TextBoxModel;
//# sourceMappingURL=TextBoxModel.js.map