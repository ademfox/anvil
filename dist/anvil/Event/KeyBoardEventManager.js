"use strict";
exports.__esModule = true;
var KeyBoardEventManager = (function () {
    function KeyBoardEventManager() {
        this.altKeyIsDown = false;
        this.ctrlKeyIsDown = false;
        this.shiftKeyIsDown = false;
        this.isDisabled = false;
        this.isDown = false;
        this.onEvent = function () { };
        this.onKeyDown = function () { };
        this.onKeyPress = function () { };
        this.onKeyUp = function () { };
        this.handlers = {};
        this.downKeys = new Array;
        this.startListening();
    }
    KeyBoardEventManager.prototype.register = function (name, handler) {
        this.handlers[name] = handler;
        this.handlers[name].name = name;
        this.handlers[name].manager = this;
        return this;
    };
    KeyBoardEventManager.prototype.find = function (name) {
        return this.handlers[name];
    };
    KeyBoardEventManager.prototype.remove = function (name) {
        this.handlers[name].manager = undefined;
        delete this.handlers[name];
        return this;
    };
    KeyBoardEventManager.prototype.startListening = function () {
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keypress', this.handleKeyPress.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
        return this;
    };
    KeyBoardEventManager.prototype.stopListening = function () {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keypress', this.handleKeyPress);
        window.removeEventListener('keyup', this.handleKeyUp);
        return this;
    };
    KeyBoardEventManager.prototype.handleKeyDown = function (event) {
        this.downKeys.push(event.keyCode);
        if (event.keyCode === 16) {
            this.shiftKeyIsDown = true;
        }
        if (event.keyCode === 17) {
            this.ctrlKeyIsDown = true;
        }
        if (event.keyCode === 18) {
            this.altKeyIsDown = true;
        }
        this.onEvent(this, event);
        this.onKeyDown(this, event);
        this.lastKeyCode = event.keyCode;
        this.isDown = true;
        for (var name_1 in this.handlers) {
            this.handlers[name_1].handleKeyDown(event);
        }
    };
    KeyBoardEventManager.prototype.handleKeyPress = function (event) {
        this.onEvent(event);
        this.onKeyPress(event);
        this.lastKeyCode = event.keyCode;
        for (var name_2 in this.handlers) {
            this.handlers[name_2].handleKeyPress(event);
        }
    };
    KeyBoardEventManager.prototype.handleKeyUp = function (event) {
        var downKeyIndex = this.downKeys.indexOf(event.keyCode);
        if (downKeyIndex !== -1) {
            this.downKeys.splice(downKeyIndex, 1);
        }
        if (event.keyCode === 16) {
            this.shiftKeyIsDown = false;
        }
        if (event.keyCode === 17) {
            this.ctrlKeyIsDown = false;
        }
        if (event.keyCode === 18) {
            this.altKeyIsDown = false;
        }
        this.onEvent(event);
        this.onKeyUp(event);
        if (this.downKeys.length === 0) {
            this.isDown = false;
        }
        for (var name_3 in this.handlers) {
            this.handlers[name_3].handleKeyUp(event);
        }
    };
    return KeyBoardEventManager;
}());
exports.KeyBoardEventManager = KeyBoardEventManager;
//# sourceMappingURL=KeyBoardEventManager.js.map