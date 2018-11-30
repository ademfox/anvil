"use strict";
exports.__esModule = true;
var Anvil_1 = require("../Anvil");
var Angle = (function () {
    function Angle() {
    }
    Angle.toDegrees = function (radians) {
        return radians * (180 / Math.PI);
    };
    Angle.toRadians = function (degrees) {
        return degrees * (Math.PI / 180);
    };
    Angle.deltaClockwise = function (from, to, direction) {
        if (direction === void 0) { direction = false; }
        var sign = 1;
        var range = from - Math.PI;
        if (range < 0) {
            var offset = Anvil_1.Num.cycle(range, Math.PI * 2);
            if (to < from ||
                to >= offset) {
                sign = -1;
            }
        }
        else if (to < from &&
            to >= range) {
            sign = -1;
        }
        if (direction === false) {
            sign = 1;
        }
        var result = 0;
        if (from > to) {
            result = from - to;
        }
        else if (to > from) {
            result = to - from;
        }
        return result * sign;
    };
    Angle.deltaCounterclockwise = function (from, to, direction) {
        if (direction === void 0) { direction = false; }
        var sign = 1;
        var range = from + Math.PI;
        if (range > Math.PI * 2) {
            var offset = Anvil_1.Num.cycle(range, Math.PI * 2);
            if (to > from ||
                to <= offset) {
                sign = -1;
            }
        }
        else if (to > from &&
            to <= range) {
            sign = -1;
        }
        if (direction === false) {
            sign = 1;
        }
        var result = 0;
        if (from > to) {
            result = from - to;
        }
        else if (to > from) {
            result = to - from;
        }
        return result * sign;
    };
    Angle.differenceClockwise = function (from, to) {
        var result = 0;
        if (from > to) {
            result = (Math.PI * 2) - from + to;
        }
        else if (to > from) {
            result = to - from;
        }
        return result;
    };
    Angle.differenceCounterclockwise = function (from, to) {
        var result = 0;
        if (from > to) {
            result = from - to;
        }
        else if (to > from) {
            result = from + (Math.PI * 2) - to;
        }
        return result;
    };
    return Angle;
}());
exports.Angle = Angle;
//# sourceMappingURL=Angle.js.map