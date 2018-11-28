"use strict";
exports.__esModule = true;
var Num = (function () {
    function Num() {
    }
    Num.average = function (numbers) {
        if (typeof numbers === 'undefined') {
            throw new Error('Core/Num.average: Expects an input');
        }
        if (numbers.length < 2) {
            throw new Error('Core/Num.average: Expects at least 2 numbers in an arrays');
        }
        var sum = this.sum(numbers);
        return sum / numbers.length;
    };
    Num.constrain = function (number, range) {
        if (typeof range === 'number') {
            range = [0, range];
        }
        if (range[0] === range[1]) {
            return 0;
        }
        var max = Math.max(range[0], range[1]);
        var min = Math.min(range[0], range[1]);
        if (number > max) {
            return max;
        }
        else if (number < min) {
            return min;
        }
        else {
            return number;
        }
    };
    Num.cycle = function (number, range) {
        if (typeof range === 'number') {
            range = [0, range];
        }
        var max = Math.max(range[0], range[1]);
        var min = Math.min(range[0], range[1]);
        if (max === 0 && min === 0) {
            return 0;
        }
        var da = this.getNumberLineDistance(min, max);
        var db;
        var c;
        if (number > max) {
            db = this.getNumberLineDistance(number, max);
            c = db % da + min;
            return c === min ? max : c;
        }
        else if (number < min) {
            db = this.getNumberLineDistance(number, min);
            c = max - db % da;
            return c === max ? min : c;
        }
        else {
            return number;
        }
    };
    Num.getNumberLineDistance = function (a, b) {
        var min = Math.min(a, b);
        var max = Math.max(a, b);
        if (min < 0 && max < 0) {
            return Math.abs(min) - Math.abs(max);
        }
        else if (min < 0 && max >= 0) {
            return Math.abs(min) + max;
        }
        else if (min >= 0 && max >= 0) {
            return max - min;
        }
    };
    Num.hypotenuse = function (x, y) {
        var max = Math.max(Math.abs(x), Math.abs(y));
        var min = Math.min(Math.abs(x), Math.abs(y));
        if (max === 0) {
            max = 1;
        }
        var n = min / max;
        return max * Math.sqrt(1 + n * n);
    };
    Num.isNumber = function (number) {
        return typeof number === 'number' ? true : false;
    };
    Num.reciprocal = function (number) {
        return number != 0 ? 1 / number : undefined;
    };
    Num.round = function (number, to) {
        to = typeof to === 'undefined' ? 0 : to;
        return parseFloat((number).toFixed(to));
    };
    Num.lerp = function (from, to, t) {
        return (1 - t) * from + t * to;
    };
    Num.modulate = function (number, from, to, constrain) {
        if (typeof from === 'number') {
            from = [0, from];
        }
        if (typeof to === 'number') {
            to = [0, to];
        }
        var percent = (number - from[0]) / (from[1] - from[0]);
        var result;
        if (to[1] > to[0]) {
            result = percent * (to[1] - to[0]) + to[0];
        }
        else {
            result = to[0] - (percent * (to[0] - to[1]));
        }
        return constrain === true ? Num.constrain(result, to) : result;
    };
    Num.random = function (range, whole, fixed) {
        if (whole === void 0) { whole = false; }
        if (fixed === void 0) { fixed = 2; }
        if (typeof range === 'number') {
            range = [0, range];
        }
        if (range[0] === 0 &&
            range[1] === 1) {
            if (whole === true) {
                return Math.random() > 0.5 ? 1 : 0;
            }
            else {
                return parseFloat((Math.random()).toFixed(fixed));
            }
        }
        else {
            var number = this.modulate(Math.random(), 1, range, false);
            return parseInt((number).toFixed(0));
        }
    };
    Num.sum = function (numbers) {
        var sum = 0;
        for (var _i = 0, numbers_1 = numbers; _i < numbers_1.length; _i++) {
            var number = numbers_1[_i];
            sum += number;
        }
        return sum;
    };
    Num.within = function (number, range) {
        if (typeof range === 'number') {
            range = [0, range];
        }
        return number >= range[0] && number <= range[1] ? true : false;
    };
    return Num;
}());
exports.Num = Num;
//# sourceMappingURL=Num.js.map