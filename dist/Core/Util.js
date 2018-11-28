"use strict";
exports.__esModule = true;
var Num_1 = require("./Num");
var Util = (function () {
    function Util() {
    }
    Util.cycle = function (array) {
        var index = -1;
        return function () {
            index++;
            if (index > array.length - 1) {
                index = 0;
            }
            return array[index];
        };
    };
    Util.debounce = function (delay, fn) {
        var timeout;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            clearTimeout(timeout);
            var context = this;
            timeout = setTimeout(function () {
                fn.apply(context, args);
            }, 1000 * delay);
        };
    };
    Util.delay = function (time, fn) {
        return setTimeout(fn, time * 1000);
    };
    Util.cancelDelay = function (id) {
        clearTimeout(id);
    };
    Util.repeat = function (interval, fn) {
        return setInterval(fn, interval * 1000);
    };
    Util.stopRepeat = function (id) {
        clearInterval(id);
    };
    Util.match = function (string, _with) {
        var value = String(string).match(_with);
        if (value === null) {
            return false;
        }
        else if (value.length === 1) {
            return value[0];
        }
        return value;
    };
    Util.randomChoice = function (array) {
        var index = Num_1.Num.random(array.length - 1, true);
        return array[index];
    };
    Util.throttle = function (threshold, fn) {
        var timeout;
        var last;
        threshold = 1000 * threshold;
        return function () {
            var context = this;
            var args = arguments;
            var now = +new Date;
            if (last && now < last + threshold) {
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                    last = now;
                    fn.apply(context, args);
                }, threshold);
            }
            else {
                last = now;
                fn.apply(context, args);
            }
        };
    };
    Util.toHex = function (n) {
        return parseInt(n).toString(16).toUpperCase();
    };
    return Util;
}());
exports.Util = Util;
//# sourceMappingURL=Util.js.map