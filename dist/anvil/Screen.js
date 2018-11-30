"use strict";
exports.__esModule = true;
var Anvil_1 = require("./Anvil");
var Screen = (function () {
    function Screen() {
        this.initialize();
    }
    Screen.prototype.initialize = function () {
        this.eventManager = new Anvil_1.ScreenEventManager();
    };
    Screen.getDiagonal = function () {
        var h = window.innerHeight;
        var w = window.innerWidth;
        return Math.abs(Math.sqrt(w * w + h * h));
    };
    Screen.getHeight = function () {
        return window.innerHeight;
    };
    Screen.getWidth = function () {
        return window.innerWidth;
    };
    return Screen;
}());
exports.Screen = Screen;
//# sourceMappingURL=Screen.js.map