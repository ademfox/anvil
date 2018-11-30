"use strict";
exports.__esModule = true;
var Anvil_1 = require("../Anvil");
var TouchEventManager = (function () {
    function TouchEventManager() {
        this.onEvent = function () { };
        this.onTouchStart = function () { };
        this.onTouchEnd = function () { };
        this.onTouchCancel = function () { };
        this.onTouchMove = function () { };
        this.debounceMoveEnd = function () { };
        this.debounceTime = 0.2;
        this.handlers = {};
        this.startListening();
        return this;
    }
    TouchEventManager.prototype.register = function (name, handler) {
        this.handlers[name] = handler;
        this.handlers[name].name = name;
        return this;
    };
    TouchEventManager.prototype.find = function (name) {
        return this.handlers[name];
    };
    TouchEventManager.prototype.remove = function (name) {
        delete this.handlers[name];
        return this;
    };
    TouchEventManager.prototype.startListening = function () {
        this.debounceMoveEnd = Anvil_1.Util.debounce(this.debounceTime, this.handleTouchMoveEnd.bind(this));
        window.addEventListener('touchstart', this.handleTouchStart.bind(this));
        window.addEventListener('touchmove', this.handleTouchMove.bind(this));
        window.addEventListener('touchmove', this.debounceMoveEnd.bind(this));
        window.addEventListener('touchend', this.handleTouchEnd.bind(this));
        window.addEventListener('touchcancel', this.handleTouchCancel.bind(this));
    };
    TouchEventManager.prototype.stopListening = function () {
        window.removeEventListener('touchstart', this.handleTouchStart);
        window.removeEventListener('touchmove', this.handleTouchMove);
        window.removeEventListener('touchmove', this.debounceMoveEnd);
        window.removeEventListener('touchend', this.handleTouchEnd);
        window.removeEventListener('touchcancel', this.handleTouchCancel);
    };
    TouchEventManager.prototype.isTouchIdentityTaken = function (identity) {
        for (var name_1 in this.handlers) {
            if (this.handlers[name_1].identity === identity) {
                return true;
            }
        }
        return false;
    };
    TouchEventManager.prototype.handleTouchStart = function (event) {
        this.onEvent(event);
        this.onTouchStart(event);
        for (var _i = 0, _a = event.targetTouches; _i < _a.length; _i++) {
            var touch = _a[_i];
            for (var name_2 in this.handlers) {
                if (this.isTouchIdentityTaken(touch.identifier) === false) {
                    this.handlers[name_2].handleTouchStart(event, touch);
                }
            }
        }
    };
    TouchEventManager.prototype.handleTouchEnd = function (event) {
        this.onEvent(event);
        this.onTouchEnd(event);
        for (var name_3 in this.handlers) {
            for (var _i = 0, _a = event.changedTouches; _i < _a.length; _i++) {
                var touch = _a[_i];
                if (this.handlers[name_3].identity === touch.identifier) {
                    this.handlers[name_3].handleTouchEnd(event, touch);
                }
            }
        }
    };
    TouchEventManager.prototype.handleTouchCancel = function (event) {
        this.onEvent(event);
        this.onTouchCancel(event);
        for (var name_4 in this.handlers) {
            for (var _i = 0, _a = event.changedTouches; _i < _a.length; _i++) {
                var touch = _a[_i];
                this.handlers[name_4].handleTouchMove(event, touch);
            }
        }
    };
    TouchEventManager.prototype.handleTouchMove = function (event) {
        this.onEvent(event);
        this.onTouchMove(event);
        for (var name_5 in this.handlers) {
            for (var _i = 0, _a = event.touches; _i < _a.length; _i++) {
                var touch = _a[_i];
                this.handlers[name_5].handleTouchMove(event, touch);
            }
        }
    };
    TouchEventManager.prototype.handleTouchMoveEnd = function () {
        for (var name_6 in this.handlers) {
            this.handlers[name_6].handleTouchMoveEnd();
        }
    };
    return TouchEventManager;
}());
exports.TouchEventManager = TouchEventManager;
//# sourceMappingURL=TouchEventManager.js.map