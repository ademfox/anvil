"use strict";
exports.__esModule = true;
var Anvil_1 = require("../Anvil");
var ScreenEventManager = (function () {
    function ScreenEventManager() {
        this.debounceTime = 0.2;
        this.isResizing = false;
        this.handlers = new Array;
        this.startListening();
        return this;
    }
    ScreenEventManager.prototype.register = function (name, handler) {
        this.handlers[name] = new Object;
        var _handler = this.handlers[name];
        _handler.name = name;
        _handler.isActive = false;
        for (var key in handler) {
            _handler[key] = handler[key];
        }
        return this;
    };
    ScreenEventManager.prototype.find = function (name) {
        return this.handlers[name];
    };
    ScreenEventManager.prototype.remove = function (name) {
        delete this.handlers[name];
        return this;
    };
    ScreenEventManager.prototype.startListening = function () {
        this.debounce = Anvil_1.Util.debounce(this.debounceTime, this._handleResizeEnd.bind(this));
        window.addEventListener('resize', this._handleResize.bind(this));
        window.addEventListener('resize', this.debounce.bind(this));
        return this;
    };
    ScreenEventManager.prototype.stopListening = function () {
        window.removeEventListener('resize', this._handleResize);
        window.removeEventListener('resize', this.debounce);
        return this;
    };
    ScreenEventManager.prototype.getSize = function () {
        var width = window.innerWidth;
        var height = window.innerHeight;
        return { height: height, width: width };
    };
    ScreenEventManager.prototype._handleResize = function (event) {
        if (this.isResizing === false) {
            this.isResizing = true;
            this.resizeStartTime = Date.now();
            this.startSize = this.getSize();
            this.currentSize = this.getSize();
            this.onResizeStart(this, event);
            for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
                var handler = _a[_i];
                if (handler.determine(this, event) === true) {
                    handler.isActive = true;
                    handler.event = event;
                    handler.onResizeStart(this, this.handlers[handler.name]);
                }
            }
        }
        else {
            this.currentSize = this.getSize();
            this.onResize(this, event);
            for (var _b = 0, _c = this.handlers; _b < _c.length; _b++) {
                var handler = _c[_b];
                if (handler.isActive === true) {
                    handler.event = event;
                    handler.onResize(this, this.handlers[handler.name]);
                }
            }
        }
    };
    ScreenEventManager.prototype._handleResizeEnd = function () {
        this.isResizing = false;
        this.resizeEndTime = Date.now();
        this.resizeDuration = this.resizeEndTime - this.resizeStartTime;
        this.endSize = this.getSize();
        this.currentSize = this.getSize();
        this.onResizeEnd(this);
        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            if (handler.isActive === true) {
                handler.isActive = false;
                handler.event = event;
                handler.onResizeEnd(this, this.handlers[handler.name]);
            }
        }
    };
    return ScreenEventManager;
}());
exports.ScreenEventManager = ScreenEventManager;
//# sourceMappingURL=ScreenEventManager.js.map