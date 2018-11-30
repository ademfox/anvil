"use strict";
exports.__esModule = true;
var Anvil_1 = require("../Anvil");
var TouchPoint = (function () {
    function TouchPoint() {
        this.isDown = false;
        this.isMoving = false;
        this.position = new Anvil_1.Vector2;
        this.velocity = new Anvil_1.Vector2;
        this.acceleration = new Anvil_1.Vector2;
    }
    return TouchPoint;
}());
exports.TouchPoint = TouchPoint;
//# sourceMappingURL=TouchPoint.js.map