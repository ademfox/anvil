"use strict";
exports.__esModule = true;
var anvil_1 = require("../anvil");
var CanvasDraw = (function () {
    function CanvasDraw(element) {
        this.resolutionMultiplier = window.devicePixelRatio;
        this.previousTranslation = new anvil_1.Vector2(0, 0);
        this.element = element;
        this.resize();
        this.context = this.element.getContext('2d');
        this.initialize();
    }
    CanvasDraw.prototype.initialize = function () {
        this.defaultStyle = {
            fillColor: 'black',
            noFill: false,
            noStroke: false,
            strokeCap: 'round',
            strokeColor: 'black',
            strokeJoin: 'round',
            strokeWidth: 0
        };
        return this;
    };
    CanvasDraw.prototype.setDefaultStyle = function (style) {
        for (var key in style) {
            this.defaultStyle[key] = style[key];
        }
        return this;
    };
    CanvasDraw.prototype.createLinearGradient = function (from, to) {
        var m = this.resolutionMultiplier;
        return this.context.createLinearGradient(from.x * m, from.y * m, to.x * m, to.y * m);
    };
    CanvasDraw.prototype.createRadialGradient = function (from, fromRadius, to, toRadius) {
        var m = this.resolutionMultiplier;
        return this.context.createRadialGradient(from.x * m, from.y * m, fromRadius * m, to.x * m, to.y * m, toRadius * m);
    };
    CanvasDraw.prototype.applyStyle = function (style) {
        var computedStyle = new Object;
        for (var key in this.defaultStyle) {
            computedStyle[key] = this.defaultStyle[key];
        }
        if (typeof style !== 'undefined') {
            for (var key in style) {
                computedStyle[key] = style[key];
            }
        }
        this.context.fillStyle = computedStyle.fillColor;
        this.context.strokeStyle = computedStyle.strokeColor;
        this.context.lineWidth = computedStyle.strokeWidth;
        if (computedStyle.noFill === false) {
            this.context.fill();
        }
        if (computedStyle.noStroke === false) {
            this.context.stroke();
        }
        return this;
    };
    CanvasDraw.prototype.clear = function () {
        this.context.clearRect(0, 0, this.element.width, this.element.height);
        return this;
    };
    CanvasDraw.prototype.resize = function (width, height) {
        if (typeof height === 'number' &&
            typeof width === 'number') {
            this.element.height = height * this.resolutionMultiplier;
            this.element.width = width * this.resolutionMultiplier;
        }
        else {
            this.element.height = this.element.offsetHeight * this.resolutionMultiplier;
            this.element.width = this.element.offsetWidth * this.resolutionMultiplier;
        }
        return this;
    };
    CanvasDraw.prototype.getPixelColor = function (point) {
        var m = this.resolutionMultiplier;
        var imageData = this.context.getImageData(point.x * m, point.y * m, this.element.width, this.element.height);
        var data = imageData.data;
        var color = new anvil_1.Color();
        color.r = data[0] / 255;
        color.g = data[1] / 255;
        color.b = data[2] / 255;
        color.a = data[3] / 255;
        return color;
    };
    CanvasDraw.prototype.putPixelColor = function (point, color) {
        var m = this.resolutionMultiplier;
        var pixel = this.context.getImageData(point.x * m, point.y * m, 1, 1);
        var data = pixel.data;
        data[0] = color.r * 255;
        data[1] = color.g * 255;
        data[2] = color.b * 255;
        data[3] = color.a * 255;
        return this.context.putImageData(pixel, 0, 0);
    };
    CanvasDraw.prototype.clip = function () {
        this.context.clip();
        return this;
    };
    CanvasDraw.prototype.shadow = function (offsetX, offsetY, blur, color) {
        var m = this.resolutionMultiplier;
        if (color instanceof anvil_1.Color) {
            color = color.getString('rgba');
        }
        this.context.shadowBlur = blur * m;
        this.context.shadowColor = color;
        this.context.shadowOffsetX = offsetX * m;
        this.context.shadowOffsetY = offsetY * m;
        return this;
    };
    CanvasDraw.prototype.image = function (img, st, sw, sh, dt, dw, dh) {
        var m = this.resolutionMultiplier;
        this.context.drawImage(img, st.x, st.y, sw, sh, dt.x * m, dt.y * m, dw * m, dh * m);
        return this;
    };
    CanvasDraw.prototype.circle = function (v, r, style, insert) {
        var m = this.resolutionMultiplier;
        this.save();
        this.begin();
        this.context.arc(v.x * m, v.y * m, r * m, 0, 2 * Math.PI, false);
        this.end();
        this.applyStyle(style);
        if (typeof insert !== 'undefined') {
            insert();
        }
        this.restore();
        return this;
    };
    CanvasDraw.prototype.arcTo = function (from, to, r) {
        var m = this.resolutionMultiplier;
        this.context.arcTo(from.x * m, from.y * m, to.x * m, to.y * m, r * m);
        return this;
    };
    CanvasDraw.prototype.begin = function () {
        this.context.beginPath();
        return this;
    };
    CanvasDraw.prototype.bezierCurveTo = function (cp1, cp2, to) {
        var m = this.resolutionMultiplier;
        this.context.bezierCurveTo(cp1.x * m, cp1.y * m, cp2.x * m, cp2.y * m, to.x * m, to.y * m);
        return this;
    };
    CanvasDraw.prototype.end = function () {
        this.context.closePath();
        return this;
    };
    CanvasDraw.prototype.isPointInPath = function (point) {
        var m = this.resolutionMultiplier;
        this.context.isPointInPath(point.x * m, point.y * m);
        return this;
    };
    CanvasDraw.prototype.lineTo = function (to) {
        var m = this.resolutionMultiplier;
        this.context.lineTo(to.x * m, to.y * m);
        return this;
    };
    CanvasDraw.prototype.moveTo = function (to) {
        var m = this.resolutionMultiplier;
        this.context.moveTo(to.x * m, to.y * m);
        return this;
    };
    CanvasDraw.prototype.quadraticCurveTo = function (cp, to) {
        var m = this.resolutionMultiplier;
        this.context.quadraticCurveTo(cp.x * m, cp.y * m, to.x * m, to.y * m);
        return this;
    };
    CanvasDraw.prototype.rotate = function (angle) {
        this.context.rotate(angle);
        return this;
    };
    CanvasDraw.prototype.scale = function (w, h) {
        if (typeof h !== 'number') {
            h = w;
        }
        this.context.scale(w, h);
        return this;
    };
    CanvasDraw.prototype.translate = function (to) {
        var m = this.resolutionMultiplier;
        this.context.translate(to.x * m, to.y * m);
        this.previousTranslation.equals(to);
        return this;
    };
    CanvasDraw.prototype.reset = function () {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        return this;
    };
    CanvasDraw.prototype.save = function () {
        this.context.save();
        return this;
    };
    CanvasDraw.prototype.restore = function () {
        this.context.restore();
        return this;
    };
    return CanvasDraw;
}());
exports.CanvasDraw = CanvasDraw;
//# sourceMappingURL=CanvasDraw.js.map