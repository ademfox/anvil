"use strict";
exports.__esModule = true;
var StyleManager = (function () {
    function StyleManager(element, properties) {
        this.styles = [
            'bottom',
            'height',
            'left',
            'marginBottom',
            'marginLeft',
            'marginRight',
            'marginTop',
            'maxHeight',
            'maxWidth',
            'minHeight',
            'minWidth',
            'paddingBottom',
            'paddingLeft',
            'paddingRight',
            'paddingTop',
            'position',
            'right',
            'top',
            'width',
        ];
        this.vendorStyles = [
            'transform',
            'transformOrigin',
            'transformStyle',
        ];
        this.vendorPrefixes = ['moz', 'ms', 'o', 'webkit'];
        this.transformations = [
            'matrix',
            'matrix3d',
            'perspective',
            'rotate',
            'rotate3d',
            'rotateX',
            'rotateY',
            'rotateZ',
            'scale',
            'scale3d',
            'scaleX',
            'scaleY',
            'scaleZ',
            'skew',
            'skewX',
            'skewY',
            'translate',
            'translate3d',
            'translateX',
            'translateY',
            'translateZ',
        ];
        this.defaultSuffix = 'px';
        this.suffixes = [
            {
                suffix: '',
                styles: [
                    'matrix',
                    'matrix3d',
                    'perspective',
                    'position',
                    'scale',
                    'scaleX',
                    'scaleY',
                    'scaleZ',
                ]
            },
            {
                suffix: ['%', '%', 'px'],
                styles: ['transformOrigin']
            },
            {
                suffix: 'deg',
                styles: [
                    'rotate',
                    'rotateX',
                    'rotateY',
                    'rotateZ',
                    'skew',
                    'skewX',
                    'skewY',
                ]
            },
            {
                suffix: [null, null, null, 'deg'],
                styles: ['rotate3d']
            }
        ];
        this.setElement(element);
        if (typeof properties !== 'undefined') {
            this.setProperties(properties);
        }
        this.reset();
        return this;
    }
    StyleManager.prototype.setElement = function (element) {
        this.element = element;
        return this;
    };
    StyleManager.prototype.setProperties = function (properties) {
        for (var key in properties) {
            this[key] = properties[key];
        }
        return this;
    };
    StyleManager.prototype.applyStyle = function (style, value) {
        this.element.style[style] = value;
        return this;
    };
    StyleManager.prototype.applyStyleWithVendorPrefixes = function (style, value) {
        var capitalizedStyleName = (style.charAt(0).toUpperCase() + style.slice(1));
        for (var _i = 0, _a = this.vendorPrefixes; _i < _a.length; _i++) {
            var prefix = _a[_i];
            this.applyStyle(prefix + capitalizedStyleName, value);
        }
        this.applyStyle(style, value);
        return this;
    };
    StyleManager.prototype.valueToString = function (style, value, join) {
        var result = '';
        var suffix = this.defaultSuffix;
        for (var _i = 0, _a = this.suffixes; _i < _a.length; _i++) {
            var _suffix = _a[_i];
            if (_suffix['styles'].indexOf(style) !== -1) {
                suffix = _suffix['suffix'];
            }
        }
        if (Array.isArray(value)) {
            var i = 0;
            for (var _value in value) {
                result += _value.toString();
                if (Array.isArray(suffix)) {
                    if (suffix[i] !== null) {
                        result += suffix[i];
                    }
                }
                else {
                    result += suffix;
                }
                if (i < value.length - 1) {
                    result += join;
                }
                i++;
            }
        }
        else {
            result += value.toString();
            if (Array.isArray(suffix)) {
                if (suffix[0] !== null) {
                    result += suffix[0];
                }
            }
            else {
                result += suffix;
            }
        }
        return result;
    };
    StyleManager.prototype.applyStyles = function () {
        for (var style in this.styles) {
            if (this[style] !== null) {
                var value = this.valueToString(style, this[style], ' ');
                this.applyStyle(style, value);
            }
        }
        return this;
    };
    StyleManager.prototype.applyTransformations = function () {
        var transformValues = '';
        for (var _i = 0, _a = this.transformations; _i < _a.length; _i++) {
            var transform = _a[_i];
            if (this[transform] !== null) {
                var stringValue = this.valueToString(transform, this[transform], ', ');
                transformValues += transform + ("(" + stringValue + ") ");
            }
        }
        this.applyStyleWithVendorPrefixes('transform', transformValues);
        return this;
    };
    StyleManager.prototype.applyVendorStyles = function () {
        for (var style in this.vendorStyles) {
            if (this[style] !== null) {
                var value = this.valueToString(style, this[style], ' ');
                this.applyStyleWithVendorPrefixes(style, value);
            }
        }
        return this;
    };
    StyleManager.prototype.apply = function () {
        this.applyStyles();
        this.applyTransformations();
        this.applyVendorStyles();
        return this;
    };
    StyleManager.prototype.reset = function () {
        for (var _i = 0, _a = this.styles; _i < _a.length; _i++) {
            var style = _a[_i];
            this[style] = null;
        }
        for (var _b = 0, _c = this.transformations; _b < _c.length; _b++) {
            var style = _c[_b];
            this[style] = null;
        }
        for (var _d = 0, _e = this.vendorStyles; _d < _e.length; _d++) {
            var style = _e[_d];
            this[style] = null;
        }
        return this;
    };
    return StyleManager;
}());
exports.StyleManager = StyleManager;
//# sourceMappingURL=StyleManager.js.map