"use strict";
exports.__esModule = true;
var anvil_1 = require("../anvil");
var TouchEventHandler = (function () {
    function TouchEventHandler() {
        this.isTouching = false;
        this.isMoving = false;
        this.determine = function () { return false; };
        this.onDoubleTap = function () { };
        this.onTouchStart = function () { };
        this.onTouchEnd = function () { };
        this.onCancel = function () { };
        this.onMoveStart = function () { };
        this.onMove = function () { };
        this.onMoveEnd = function () { };
        this.doubleTapCounter = 0;
        this.doubleTapMaximumTouchTime = 500;
        this.doubleTapMaximumDelayTime = 500;
        this.initialize();
    }
    TouchEventHandler.prototype.initialize = function () {
        this.acceleration = new anvil_1.Vector2;
        this.position = new anvil_1.Vector2;
        this.velocity = new anvil_1.Vector2;
        this.touchEndPosition = new anvil_1.Vector2;
        this.touchStartPosition = new anvil_1.Vector2;
        this.moveEndPosition = new anvil_1.Vector2;
        this.movePosition = new anvil_1.Vector2;
        this.moveStartPosition = new anvil_1.Vector2;
        this.previousPosition = new anvil_1.Vector2;
        this.previousVelocity = new anvil_1.Vector2;
        this.cancelPosition = new anvil_1.Vector2;
        return this;
    };
    TouchEventHandler.prototype.handleTouchStart = function (event, touch) {
        this.event = event;
        this.touch = touch;
        var point = new anvil_1.Vector2(touch.clientX, touch.clientY);
        if (this.determine(point, this) === true) {
            this.touchStartPosition.equals(point);
            this.touchStartTime = Date.now();
            this.identity = touch.identifier;
            this.isTouching = true;
            this.onTouchStart(point, this);
        }
    };
    TouchEventHandler.prototype.handleTouchEnd = function (event, touch) {
        if (this.identity === touch.identifier &&
            this.isTouching === true) {
            if (this.isMoving === true) {
                this.handleTouchMoveEnd();
            }
            var point = new anvil_1.Vector2(touch.clientX, touch.clientY);
            this.touchEndPosition.equals(point);
            this.touchEndTime = Date.now();
            this.touchDuration = this.touchEndTime - this.touchStartTime;
            this.isTouching = false;
            this.touchCount++;
            this.identity = undefined;
            this.onTouchEnd(point, this);
            this.handleDoubleTap();
        }
    };
    TouchEventHandler.prototype.handleTouchMove = function (event, touch) {
        if (this.identity === touch.identifier &&
            this.isTouching === true) {
            this.event = event;
            this.touch = touch;
            var point = new anvil_1.Vector2(touch.clientX, touch.clientY);
            if (this.isMoving === false) {
                this.position.equals(point);
                this.previousPosition.equals(point);
                this.moveStartPosition.equals(point);
                this.moveStartTime = Date.now();
                this.isMoving = true;
                this.onMoveStart(point, this);
            }
            else {
                this.position.equals(point);
                this.velocity.equals(anvil_1.Vector2.subtract(this.position, this.previousPosition));
                this.acceleration.equals(anvil_1.Vector2.subtract(this.velocity, this.previousVelocity));
                this.moveEndTime = Date.now();
                this.moveDuration = this.moveEndTime - this.moveStartTime;
                this.onMove(point, this);
                this.previousPosition.equals(point);
                this.previousVelocity.equals(this.velocity);
            }
        }
    };
    TouchEventHandler.prototype.handleTouchMoveEnd = function () {
        if (this.isMoving === true) {
            this.moveEndTime = Date.now();
            this.moveDuration = this.moveEndTime - this.moveStartTime;
            this.isMoving = false;
            this.onMoveEnd(this.position, this);
        }
    };
    TouchEventHandler.prototype.handleTouchCancel = function (event, touch) {
        if (this.identity === touch.identifier &&
            this.isTouching === true) {
            this.handleTouchMoveEnd();
            this.handleTouchEnd(event, touch);
            var point = new anvil_1.Vector2(touch.clientX, touch.clientY);
            this.cancelTime = Date.now();
            this.cancelPosition.equals(point);
            this.onCancel(point, this);
        }
    };
    TouchEventHandler.prototype.handleDoubleTap = function () {
        if (this.touchDuration < this.doubleTapMaximumTouchTime &&
            this.doubleTapCounter === 0) {
            this.previousTapTime = Date.now();
            this.doubleTapCounter++;
        }
        else if (this.touchDuration < this.doubleTapMaximumTouchTime &&
            Date.now() - this.previousTapTime < this.doubleTapMaximumDelayTime &&
            this.doubleTapCounter === 1) {
            this.doubleTapCounter = 0;
            this.onDoubleTap(this.position, this);
        }
        else {
            this.doubleTapCounter = 0;
        }
    };
    return TouchEventHandler;
}());
exports.TouchEventHandler = TouchEventHandler;
//# sourceMappingURL=TouchEventHandler.js.map