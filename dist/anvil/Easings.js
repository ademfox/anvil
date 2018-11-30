"use strict";
exports.__esModule = true;
var Easings = (function () {
    function Easings() {
    }
    Easings.QuadEaseIn = function (t) {
        return t * t;
    };
    Easings.QuadEaseOut = function (t) {
        return -1 * t * (t - 2);
    };
    Easings.QuadEaseInEaseOut = function (t) {
        t /= 0.5;
        if (t < 1) {
            return 0.5 * t * t;
        }
        t--;
        return -0.5 * (t * (t - 2) - 1);
    };
    Easings.CubicEaseIn = function (t) {
        return t * t * t;
    };
    Easings.CubicEaseOut = function (t) {
        t--;
        return t * t * t + 1;
    };
    Easings.CubicEaseInEaseOut = function (t) {
        t /= 0.5;
        if (t < 1) {
            return 0.5 * t * t * t;
        }
        t -= 2;
        return 0.5 * (t * t * t + 2);
    };
    Easings.QuarticEaseIn = function (t) {
        return t * t * t * t;
    };
    Easings.QuarticEaseOut = function (t) {
        t--;
        return -1 * (t * t * t * t - 1);
    };
    Easings.QuarticEaseInEaseOut = function (t) {
        t /= 0.5;
        if (t < 1) {
            return 0.5 * t * t * t * t;
        }
        t -= 2;
        return -0.5 * (t * t * t * t - 2);
    };
    Easings.EaseOutElastic = function (t, p) {
        if (p === void 0) { p = 0.3; }
        return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
    };
    return Easings;
}());
exports.Easings = Easings;
//# sourceMappingURL=Easings.js.map