"use strict";
exports.__esModule = true;
var Anvil_1 = require("../Anvil");
var MouseEventManager = (function () {
    function MouseEventManager() {
        this.onEvent = function () { };
        this.onClick = function () { };
        this.onDown = function () { };
        this.onUp = function () { };
        this.onMove = function () { };
        this.debounceTime = 0.2;
        this.handlers = {};
        this.startListening();
    }
    MouseEventManager.prototype.register = function (name, handler) {
        this.handlers[name] = handler;
        this.handlers[name].name = name;
        return this;
    };
    MouseEventManager.prototype.find = function (name) {
        return this.handlers[name];
    };
    MouseEventManager.prototype.remove = function (name) {
        delete this.handlers[name];
        return this;
    };
    MouseEventManager.prototype.startListening = function () {
        this.debounce = Anvil_1.Util.debounce(this.debounceTime, this.handleMoveEnd.bind(this));
        window.addEventListener('click', this.handleClick.bind(this));
        window.addEventListener('mousedown', this.handleDown.bind(this));
        window.addEventListener('mouseup', this.handleUp.bind(this));
        window.addEventListener('mousemove', this.handleMove.bind(this));
        window.addEventListener('mousemove', this.debounce.bind(this));
        return this;
    };
    MouseEventManager.prototype.stopListening = function () {
        window.removeEventListener('click', this.handleClick);
        window.removeEventListener('mousedown', this.handleDown);
        window.removeEventListener('mouseup', this.handleUp);
        window.removeEventListener('mousemove', this.handleMove);
        window.removeEventListener('mousemove', this.debounce);
        return this;
    };
    MouseEventManager.prototype.handleClick = function (event) {
        this.onEvent(event);
        this.onClick(event);
        for (var name_1 in this.handlers) {
            this.handlers[name_1].handleClick(event);
        }
    };
    MouseEventManager.prototype.handleDown = function (event) {
        this.onEvent(event);
        this.onDown(event);
        for (var name_2 in this.handlers) {
            this.handlers[name_2].handleDown(event);
        }
    };
    MouseEventManager.prototype.handleUp = function (event) {
        this.onEvent(event);
        this.onUp(event);
        for (var name_3 in this.handlers) {
            this.handlers[name_3].handleUp(event);
        }
    };
    MouseEventManager.prototype.handleMove = function (event) {
        this.onEvent(event);
        this.onMove(event);
        for (var name_4 in this.handlers) {
            this.handlers[name_4].handleMove(event);
        }
    };
    MouseEventManager.prototype.handleMoveEnd = function () {
        for (var name_5 in this.handlers) {
            this.handlers[name_5].handleMoveEnd();
        }
    };
    return MouseEventManager;
}());
exports.MouseEventManager = MouseEventManager;
//# sourceMappingURL=MouseEventManager.js.map