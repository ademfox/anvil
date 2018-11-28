"use strict";
exports.__esModule = true;
var MuralProp = (function () {
    function MuralProp(element, properties) {
        this.initializeStates();
        this.setElement(element);
        if (typeof properties !== 'undefined') {
            this.setProperties(properties);
        }
        this.reset();
        return this;
    }
    MuralProp.prototype.setElement = function (element) {
        this.element = element;
        return this;
    };
    MuralProp.prototype.setProperties = function (properties) {
        for (var key in properties) {
            this[key] = properties[key];
        }
        return this;
    };
    MuralProp.prototype.initializeStates = function () {
        this.computedOrigin = [0, 0];
        this.computedPosition = [0, 0];
        this.computedSize = [0, 0];
        this.maxSize = [null, null];
        this.minSize = [null, null];
        this.origin = [0, 0];
        this.position = [0, 0];
        this.size = [0, 0];
        return this;
    };
    MuralProp.prototype.reset = function () {
        this.resize(this.size);
        this.moveTo(this.position);
        this.constrainSize();
        this.computeRatio();
        return this;
    };
    MuralProp.prototype.createNullElement = function () {
        this.element = document.createElement('DIV');
        this.element.style.position = 'fixed';
        this.element.style.zIndex = (-9999).toString();
        this.element.style.visibility = 'hidden';
        document.body.appendChild(this.element);
        return this;
    };
    MuralProp.prototype.computeOrigin = function () {
        var scale = this.getScaleFromOriginal();
        this.computedOrigin[0] = this.origin[0] * scale[0];
        this.computedOrigin[1] = this.origin[1] * scale[1];
        return this;
    };
    MuralProp.prototype.computeRatio = function () {
        var w = this.computedSize[0] === 0 ? 1 : this.computedSize[0];
        var h = this.computedSize[1] === 0 ? 1 : this.computedSize[1];
        this.computedRatio = w / h;
        return this;
    };
    MuralProp.prototype.setOrigin = function (origin) {
        this.origin[0] = origin[0];
        this.origin[1] = origin[1];
        return this;
    };
    MuralProp.prototype.setOriginPercentage = function (origin) {
        this.origin[0] = origin[0] * this.size[0];
        this.origin[1] = origin[1] * this.size[1];
        return this;
    };
    MuralProp.prototype.resize = function (size) {
        this.resizeWidth(size[0]);
        this.resizeHeight(size[1]);
        return this;
    };
    MuralProp.prototype.resizeHeight = function (height, constrainProportions) {
        if (constrainProportions === void 0) { constrainProportions = false; }
        this.computedSize[1] = height;
        if (constrainProportions === true) {
            this.computedSize[0] = this.computedRatio * this.computedSize[1];
        }
        return this;
    };
    MuralProp.prototype.resizeWidth = function (width, constrainProportions) {
        if (constrainProportions === void 0) { constrainProportions = false; }
        this.computedSize[0] = width;
        if (constrainProportions === true) {
            this.computedSize[1] = this.computedRatio * this.computedSize[0];
        }
        return this;
    };
    MuralProp.prototype.constrainSize = function () {
        this.constrainWidth();
        this.constrainHeight();
        return this;
    };
    MuralProp.prototype.constrainHeight = function () {
        if (typeof this.maxSize[1] === 'number' &&
            this.computedSize[1] > this.maxSize[1]) {
            this.computedSize[1] = this.maxSize[1];
        }
        if (typeof this.minSize[1] === 'number' &&
            this.computedSize[1] < this.minSize[1]) {
            this.computedSize[1] = this.minSize[1];
        }
        return this;
    };
    MuralProp.prototype.constrainWidth = function () {
        if (typeof this.maxSize[0] === 'number' &&
            this.computedSize[0] > this.maxSize[0]) {
            this.computedSize[0] = this.maxSize[0];
        }
        if (typeof this.minSize[0] === 'number' &&
            this.computedSize[0] < this.minSize[0]) {
            this.computedSize[0] = this.minSize[0];
        }
        return this;
    };
    MuralProp.prototype.constrainProportionsByHeight = function () {
        this.computeRatio();
        this.computedSize[0] = this.computedSize[1] * this.computedRatio;
        return this;
    };
    MuralProp.prototype.constrainProportionsByWidth = function () {
        this.computeRatio();
        this.computedSize[1] = this.computedSize[0] / this.computedRatio;
        return this;
    };
    MuralProp.prototype.scale = function (scale) {
        this.scaleWidth(scale[0]);
        this.scaleHeight(scale[1]);
        return this;
    };
    MuralProp.prototype.scaleHeight = function (scale) {
        this.computedSize[1] = this.computedSize[1] * scale;
        return this;
    };
    MuralProp.prototype.scaleWidth = function (scale) {
        this.computedSize[0] = this.computedSize[0] * scale;
        return this;
    };
    MuralProp.prototype.scalePosition = function (scale) {
        this.scalePositionX(scale[0]);
        this.scalePositionY(scale[1]);
        return this;
    };
    MuralProp.prototype.scalePositionX = function (scale) {
        this.computedPosition[0] *= scale;
        return this;
    };
    MuralProp.prototype.scalePositionY = function (scale) {
        this.computedPosition[1] *= scale;
        return this;
    };
    MuralProp.prototype.move = function (offset) {
        this.moveX(offset[0]);
        this.moveY(offset[1]);
        return this;
    };
    MuralProp.prototype.moveX = function (x) {
        this.computedPosition[0] += x;
        return this;
    };
    MuralProp.prototype.moveY = function (y) {
        this.computedPosition[1] += y;
        return this;
    };
    MuralProp.prototype.moveTo = function (to) {
        this.moveXTo(to[0]);
        this.moveYTo(to[1]);
        return this;
    };
    MuralProp.prototype.moveXTo = function (x) {
        this.computedPosition[0] = x;
        return this;
    };
    MuralProp.prototype.moveYTo = function (y) {
        this.computedPosition[1] = y;
        return this;
    };
    MuralProp.prototype.cover = function (input) {
        var size = this.inputToSize(input);
        var newSize = [];
        if (this.computedSize[0] < size[0]) {
            newSize[0] = size[0];
            newSize[1] = newSize[0] / this.computedRatio;
        }
        else if (this.computedSize[1] < size[1]) {
            newSize[1] = size[1];
            newSize[0] = this.computedRatio * newSize[1];
        }
        if (newSize[1] < size[1]) {
            newSize[1] = size[1];
            newSize[0] = this.computedRatio * newSize[1];
        }
        else if (newSize[0] < size[0]) {
            newSize[0] = size[0];
            newSize[1] = newSize[0] / this.computedRatio;
        }
        this.resize(newSize);
        return this;
    };
    MuralProp.prototype.stretch = function (input) {
        var size = this.inputToSize(input);
        this.resize(size);
        return this;
    };
    MuralProp.prototype.alignBottom = function (input) {
        var size = this.inputToSize(input);
        this.computedPosition[1] = size[1] - this.computedSize[1];
        return this;
    };
    MuralProp.prototype.alignCenter = function (input) {
        var size = this.inputToSize(input);
        var a = size[0] === 0 ? 0 : size[0] / 2;
        var b = this.computedSize[0] === 0 ? 0 : this.computedSize[0] / 2;
        this.computedPosition[0] = a - b;
        a = size[1] === 0 ? 0 : size[1] / 2;
        b = this.computedSize[1] === 0 ? 0 : this.computedSize[1] / 2;
        this.computedPosition[1] = a - b;
        return this;
    };
    MuralProp.prototype.alignHorizontalCenter = function (input) {
        var size = this.inputToSize(input);
        var a = size[0] === 0 ? 0 : size[0] / 2;
        var b = this.computedSize[0] === 0 ? 0 : this.computedSize[0] / 2;
        this.computedPosition[0] = a - b;
        return this;
    };
    MuralProp.prototype.alignLeft = function () {
        this.computedPosition[0] = 0;
        return this;
    };
    MuralProp.prototype.alignRight = function (input) {
        var size = this.inputToSize(input);
        this.computedPosition[0] = size[0] - this.computedSize[0];
    };
    MuralProp.prototype.alignTop = function (input) {
        this.computedPosition[1] = 0;
        return this;
    };
    MuralProp.prototype.alignVerticalCenter = function (input) {
        var size = this.inputToSize(input);
        var a = size[1] === 0 ? 0 : size[1] / 2;
        var b = this.computedSize[1] === 0 ? 0 : this.computedSize[1] / 2;
        this.computedPosition[0] = a - b;
        return this;
    };
    MuralProp.prototype.getScaleFromOriginal = function () {
        var a = this.computedSize[0] === 0 ? 1 : this.computedSize[0];
        var b = this.size[0] === 0 ? 1 : this.size[0];
        var x = a / b;
        a = this.computedSize[1] === 0 ? 1 : this.computedSize[1];
        b = this.size[1] === 0 ? 1 : this.size[1];
        var y = a / b;
        return [x, y];
    };
    MuralProp.prototype.inputToSize = function (input) {
        var size = typeof input && input.nodeType === 1 ? [input.offsetWidth, input.offsetHeight] : input;
        return size;
    };
    MuralProp.prototype.draw = function () {
        this.computeOrigin();
        this.element.style.left = this.computedPosition[0] - this.computedOrigin[0] + "px";
        this.element.style.top = this.computedPosition[1] - this.computedOrigin[0] + "px";
        this.element.style.width = this.computedSize[0] + "px";
        this.element.style.height = this.computedSize[1] + "px";
        return this;
    };
    MuralProp.prototype.remove = function () {
        var styleProperties = ['left', 'top', 'width', 'height'];
        for (var _i = 0, styleProperties_1 = styleProperties; _i < styleProperties_1.length; _i++) {
            var styleProperty = styleProperties_1[_i];
            this.element.style[styleProperty] = null;
        }
        return this;
    };
    return MuralProp;
}());
exports.MuralProp = MuralProp;
//# sourceMappingURL=Mural.js.map