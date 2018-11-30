"use strict";
exports.__esModule = true;
var Anvil_1 = require("../Anvil");
var CanvasLayerManager = (function () {
    function CanvasLayerManager(layerStackElement) {
        this.count = 0;
        this.isFullScreen = false;
        this.layerStackElement = layerStackElement;
        this.layers = new Array;
        this.startListening();
        this.resize();
        return this;
    }
    CanvasLayerManager.prototype.create = function (name) {
        var element = document.createElement("CANVAS");
        element = this.layerStackElement.appendChild(element);
        var canvasLayer = new Anvil_1.CanvasLayer(element);
        this.layers[name] = canvasLayer;
        this.count++;
        this.resize();
        return this.layers[name];
    };
    CanvasLayerManager.prototype.register = function (name, canvasLayer) {
        var element = this.layerStackElement.appendChild(canvasLayer.element);
        canvasLayer.updateElement(element);
        this.layers[name] = canvasLayer;
        this.count++;
        this.resize();
        return this.layers[name];
    };
    CanvasLayerManager.prototype.get = function (name) {
        if (typeof this.layers[name] === 'undefined') {
            this.create(name);
        }
        return this.layers[name];
    };
    CanvasLayerManager.prototype.remove = function (name) {
        for (var i = 0; i < this.layerStackElement.children.length; i++) {
            var child = this.layerStackElement.children[i];
            if (child === this.layers[name].element) {
                this.layerStackElement.removeChild(child);
                delete this.layers[name];
                this.count--;
                return true;
            }
        }
        return false;
    };
    CanvasLayerManager.prototype.resize = function () {
        var height = 0;
        var width = 0;
        if (this.isFullScreen === true) {
            height = window.innerHeight;
            width = window.innerWidth;
            this.layerStackElement.style.height = height + "px";
            this.layerStackElement.style.width = width + "px";
        }
        else {
            height = this.layerStackElement.offsetHeight;
            width = this.layerStackElement.offsetWidth;
        }
        for (var name_1 in this.layers) {
            this.layers[name_1].element.style.height = height + "px";
            this.layers[name_1].element.style.width = width + "px";
            this.layers[name_1].draw.resize();
        }
        return this;
    };
    CanvasLayerManager.prototype.startListening = function () {
        window.addEventListener('resize', this.resize.bind(this));
        return this;
    };
    CanvasLayerManager.prototype.stopListening = function () {
        window.removeEventListener('resize', this.resize);
        return this;
    };
    return CanvasLayerManager;
}());
exports.CanvasLayerManager = CanvasLayerManager;
//# sourceMappingURL=CanvasLayerManager.js.map