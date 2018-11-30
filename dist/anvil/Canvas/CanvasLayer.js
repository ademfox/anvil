"use strict";
exports.__esModule = true;
var Anvil_1 = require("../Anvil");
var CanvasLayer = (function () {
    function CanvasLayer(element) {
        this.element = element;
        this.initialize();
    }
    CanvasLayer.prototype.initialize = function () {
        this.element.style.position = 'absolute';
        this.element.style.left = '0px';
        this.element.style.top = '0px';
        this.draw = new Anvil_1.CanvasDraw(this.element);
        return this;
    };
    CanvasLayer.prototype.updateElement = function (element) {
        this.element = element;
        this.draw.element = element;
        return this;
    };
    CanvasLayer.prototype.show = function () {
        this.element.style.display = "block";
        return this;
    };
    CanvasLayer.prototype.hide = function () {
        this.element.style.display = "none";
        return this;
    };
    CanvasLayer.prototype.setZIndex = function (zIndex) {
        this.element.style.zIndex = zIndex.toString();
        return this;
    };
    return CanvasLayer;
}());
exports.CanvasLayer = CanvasLayer;
//# sourceMappingURL=CanvasLayer.js.map