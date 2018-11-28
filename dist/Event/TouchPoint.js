"use strict";
exports.__esModule = true;
var anvil_1 = require("../anvil");
var TouchPoint = (function () {
    function TouchPoint() {
        this.isDown = false;
        this.isMoving = false;
        this.position = new anvil_1.Vector2;
        this.velocity = new anvil_1.Vector2;
        this.acceleration = new anvil_1.Vector2;
    }
    return TouchPoint;
}());
exports.TouchPoint = TouchPoint;
//# sourceMappingURL=TouchPoint.js.map