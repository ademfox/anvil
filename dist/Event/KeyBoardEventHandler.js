"use strict";
exports.__esModule = true;
var KeyBoardEventHandler = (function () {
    function KeyBoardEventHandler() {
        this.isDown = false;
        this.determineKeyDown = function () { return true; };
        this.determineKeyPress = function () { return true; };
        this.onKeyDownStart = function () { };
        this.onKeyDownEnd = function () { };
        this.onKeyPress = function () { };
    }
    KeyBoardEventHandler.prototype.handleKeyDown = function (event) {
        if (this.determineKeyDown(event.keyCode, event, this) === true) {
            this.event = event;
            this.keyDownStartTime = Date.now();
            this.keyCode = event.keyCode;
            this.isDown = true;
            if (typeof this.onKeyDownStart === 'function') {
                this.onKeyDownStart(event.keyCode, this);
            }
            else if (this.onKeyDownStart.constructor === Array) {
                for (var _i = 0, _a = this.onKeyDownStart; _i < _a.length; _i++) {
                    var onKeyDownStart = _a[_i];
                    onKeyDownStart(event.keyCode, this);
                }
            }
        }
    };
    KeyBoardEventHandler.prototype.handleKeyPress = function (event) {
        if (this.determineKeyPress(event.keyCode, event, this) === true) {
            this.event = event;
            this.keyCode = event.keyCode;
            this.keyPressTime = Date.now();
            if (typeof this.onKeyPress === 'function') {
                this.onKeyPress(event.keyCode, this);
            }
            else if (this.onKeyPress.constructor === Array) {
                for (var _i = 0, _a = this.onKeyPress; _i < _a.length; _i++) {
                    var onKeyPress = _a[_i];
                    onKeyPress(event.keyCode, this);
                }
            }
        }
    };
    KeyBoardEventHandler.prototype.handleKeyUp = function (event) {
        if (this.isDown === true) {
            this.event = event;
            this.keyCode = event.keyCode;
            this.keyDownEndTime = Date.now();
            this.keyDownDuration = this.keyDownEndTime - this.keyDownStartTime;
            this.isDown = false;
            if (typeof this.onKeyDownEnd === 'function') {
                this.onKeyDownEnd(event.keyCode, this);
            }
            else if (this.onKeyDownEnd.constructor === Array) {
                for (var _i = 0, _a = this.onKeyDownEnd; _i < _a.length; _i++) {
                    var onKeyDownEnd = _a[_i];
                    onKeyDownEnd(event.keyCode, this);
                }
            }
        }
    };
    return KeyBoardEventHandler;
}());
exports.KeyBoardEventHandler = KeyBoardEventHandler;
//# sourceMappingURL=KeyBoardEventHandler.js.map