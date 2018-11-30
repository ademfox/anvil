"use strict";
exports.__esModule = true;
var Anvil_1 = require("../Anvil");
var MouseEventHandler = (function () {
    function MouseEventHandler() {
        this.isDown = false;
        this.isDragging = false;
        this.isMoving = false;
        this.determineClick = function () { return true; };
        this.determineDown = function () { return true; };
        this.determineMove = function () { return true; };
        this.determineDrag = function () { return true; };
        this.clickCount = 0;
        this.clickTime = 0;
        this.doubleClickCounter = 0;
        this.doubleClickMaximumDelayTime = 500;
        this.onClick = function () { };
        this.onDownStart = function () { };
        this.onDownEnd = function () { };
        this.onDragStart = function () { };
        this.onDrag = function () { };
        this.onDragEnd = function () { };
        this.onMoveStart = function () { };
        this.onMove = function () { };
        this.onMoveEnd = function () { };
        this.onDoubleClick = function () { };
        this.position = new Anvil_1.Vector2;
        this.acceleration = new Anvil_1.Vector2;
        this.velocity = new Anvil_1.Vector2;
        this.previousVelocity = new Anvil_1.Vector2;
        this.previousPosition = new Anvil_1.Vector2;
        this.clickPosition = new Anvil_1.Vector2;
        this.downEndPosition = new Anvil_1.Vector2;
        this.downStartPosition = new Anvil_1.Vector2;
        this.moveEndPosition = new Anvil_1.Vector2;
        this.moveStartPosition = new Anvil_1.Vector2;
        this.dragStartPosition = new Anvil_1.Vector2;
        this.dragEndPosition = new Anvil_1.Vector2;
    }
    MouseEventHandler.prototype.handleClick = function (event) {
        if (this.determineClick(event, this) === true) {
            var point = new Anvil_1.Vector2(event.clientX, event.clientY);
            this.event = event;
            this.clickCount++;
            this.position.equals(point);
            this.clickPosition.equals(point);
            this.clickTime = Date.now();
            this.onClick(point, this);
            this.handleDoubleClick();
        }
    };
    MouseEventHandler.prototype.handleDoubleClick = function () {
        if (Date.now() - this.clickTime < this.doubleClickMaximumDelayTime) {
            this.doubleClickCounter++;
            if (this.doubleClickCounter === 2) {
                this.onDoubleClick(this.position, this);
                this.doubleClickCounter = 0;
            }
        }
        else {
            this.doubleClickCounter = 0;
        }
    };
    MouseEventHandler.prototype.handleDown = function (event) {
        if (this.determineDown(event, this) === true) {
            var point = new Anvil_1.Vector2(event.clientX, event.clientY);
            this.event = event;
            this.position.equals(point);
            this.downStartPosition.equals(point);
            this.downStartTime = Date.now();
            this.isDown = true;
            this.onDownStart(point, this);
        }
    };
    MouseEventHandler.prototype.handleUp = function (event) {
        if (this.isDown === true) {
            var point = new Anvil_1.Vector2(this.position);
            this.handleDragEnd();
            this.event = event;
            this.position.equals(point);
            this.downEndPosition.equals(point);
            this.downEndTime = Date.now();
            this.downDuration = this.downEndTime - this.downStartTime;
            this.isDown = false;
            this.onDownEnd(point, this);
        }
    };
    MouseEventHandler.prototype.handleMove = function (event) {
        var point = new Anvil_1.Vector2(event.clientX, event.clientY);
        this.position.equals(point);
        this.velocity.equals(Anvil_1.Vector2.subtract(this.position, this.previousPosition));
        this.acceleration.equals(Anvil_1.Vector2.subtract(this.velocity, this.previousVelocity));
        if (this.isMoving === false &&
            this.determineMove(event, this) === true) {
            this.isMoving = true;
            this.moveStartTime = Date.now();
            this.onMoveStart(event);
        }
        else if (this.isMoving === true) {
            this.onMove(point, this);
        }
        this.previousVelocity.equals(this.velocity);
        this.previousPosition.equals(point);
        if (this.isDown === true &&
            this.isMoving === true) {
            if (this.isDragging === true) {
                this.onDrag(this.position, this);
            }
            else {
                this.isDragging = true;
                this.dragStartTime = Date.now();
                this.dragStartPosition.equals(this.position);
                this.onDragStart(this.position, this);
            }
        }
    };
    MouseEventHandler.prototype.handleDragEnd = function () {
        if (this.isDragging === true) {
            this.dragEndTime = Date.now();
            this.dragDuration = this.dragEndTime - this.dragStartTime;
            this.dragEndPosition.equals(this.position);
            this.isDragging = false;
            this.onDragEnd(this.position, this);
        }
    };
    MouseEventHandler.prototype.handleMoveEnd = function () {
        if (this.isMoving === true) {
            this.handleDragEnd();
            this.moveEndTime = Date.now();
            this.moveDuration = this.moveEndTime - this.moveStartTime;
            this.moveEndPosition.equals(this.position);
            this.isMoving = false;
            this.onMoveEnd(this.position, this);
        }
    };
    return MouseEventHandler;
}());
exports.MouseEventHandler = MouseEventHandler;
//# sourceMappingURL=MouseEventHandler.js.map