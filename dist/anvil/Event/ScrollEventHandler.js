"use strict";
exports.__esModule = true;
var Anvil_1 = require("../Anvil");
var ScrollEventHandler = (function () {
    function ScrollEventHandler(element) {
        this.isScrolling = false;
        this.determineScroll = function () { return true; };
        this.onScrollStart = function () { };
        this.onScroll = function () { };
        this.onScrollEnd = function () { };
        this.debounce = function () { };
        this.element = element;
        this.position = new Anvil_1.Vector2;
        this.velocity = new Anvil_1.Vector2;
        this.acceleration = new Anvil_1.Vector2;
        this.previousPosition = new Anvil_1.Vector2;
        this.previousVelocity = new Anvil_1.Vector2;
    }
    ScrollEventHandler.prototype.handleScroll = function (event) {
        this.event = event;
        this.position.equals(this.getPosition());
        this.velocity.equals(Anvil_1.Vector2.subtract(this.position, this.previousPosition));
        this.acceleration.equals(Anvil_1.Vector2.subtract(this.velocity, this.previousVelocity));
        if (this.isScrolling === false) {
            if (this.determineScroll(event, this) === true) {
                this.scrollStartTime = Date.now();
                this.isScrolling = true;
                this.onScrollStart(this.position, this);
            }
        }
        else {
            this.acceleration.equals(Anvil_1.Vector2.subtract(this.velocity, this.previousVelocity));
            this.onScroll(this.position, this);
        }
        this.previousPosition.equals(this.position);
        this.previousVelocity.equals(this.velocity);
    };
    ScrollEventHandler.prototype.handleScrollEnd = function () {
        if (this.isScrolling === true) {
            this.scrollEndTime = Date.now();
            this.scrollDuration = this.scrollEndTime - this.scrollStartTime;
            this.isScrolling = false;
            this.onScrollEnd(this.position, this);
        }
    };
    ScrollEventHandler.prototype.getPosition = function () {
        if (this.element === window) {
            return new Anvil_1.Vector2(window.scrollX, window.scrollY);
        }
        else {
            return new Anvil_1.Vector2(this.element.scrollLeft, this.element.scrollTop);
        }
    };
    ScrollEventHandler.prototype.scrollLeft = function (left) {
        var result;
        if (this.element === window) {
            if (typeof left === 'number') {
                window.scrollTo(left, window.scrollY);
                result = left;
            }
            else {
                result = window.scrollX;
            }
        }
        else {
            if (typeof left === 'number') {
                this.element.scrollLeft = left;
                result = left;
            }
            else {
                result = this.element.scrollLeft;
            }
        }
        this.update();
        return result;
    };
    ScrollEventHandler.prototype.scrollTop = function (top) {
        var result;
        if (this.element === window) {
            if (typeof top === 'number') {
                window.scrollTo(window.scrollX, top);
                result = top;
            }
            else {
                result = window.scrollY;
            }
        }
        else {
            if (typeof top === 'number') {
                this.element.scrollTop = top;
                result = top;
            }
            else {
                result = this.element.scrollTop;
            }
        }
        this.update();
        return result;
    };
    ScrollEventHandler.prototype.scrollTo = function (to) {
        if (this.element === window) {
            window.scrollTo(to.x, to.y);
        }
        else {
            this.element.scrollLeft = to.x;
            this.element.scrollTop = to.y;
        }
        this.update();
        return this;
    };
    ScrollEventHandler.prototype.update = function () {
        var currentPosition = this.getPosition();
        var currentVelocity = Anvil_1.Vector2.subtract(this.position, currentPosition);
        this.acceleration.equals(Anvil_1.Vector2.subtract(currentVelocity, this.velocity));
        this.velocity.equals(currentVelocity);
        this.position.equals(currentPosition);
        return this;
    };
    return ScrollEventHandler;
}());
exports.ScrollEventHandler = ScrollEventHandler;
//# sourceMappingURL=ScrollEventHandler.js.map