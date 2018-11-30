"use strict";
exports.__esModule = true;
var Num_1 = require("../Core/Num");
var Animation = (function () {
    function Animation(properties) {
        this.alternate = false;
        this.delay = 0;
        this.duration = 2;
        this.isActive = false;
        this.isAnimating = false;
        this.isPaused = false;
        this.isReversed = false;
        this.iterationCount = 0;
        this.iterationDelay = 0;
        this.numberOfIterations = 1;
        this.exports = 0;
        this.timingFunction = function (t) { return t; };
        this.onAnimationStart = function () { };
        this.onAnimationEnd = function () { };
        this.onIterationEnd = function () { };
        this.onIterationStart = function () { };
        this.callback = function () { };
        this.onTick = function (n, fn, data) { };
        this.currentDirection = true;
        this.setProperties(properties);
        return this;
    }
    Animation.prototype.setProperties = function (properties) {
        for (var key in properties) {
            this[key] = properties[key];
        }
        return this;
    };
    Animation.prototype.goToBeginning = function () {
        if (typeof this.onTick === 'function') {
            this.onTick(0, this, undefined);
        }
        else if (this.onTick.constructor === Array) {
            for (var _i = 0, _a = this.onTick; _i < _a.length; _i++) {
                var onTick = _a[_i];
                onTick(0, this, undefined);
            }
        }
        return this;
    };
    Animation.prototype.goToEnd = function () {
        if (typeof this.onTick === 'function') {
            this.onTick(1, this, undefined);
        }
        else if (this.onTick.constructor === Array) {
            for (var _i = 0, _a = this.onTick; _i < _a.length; _i++) {
                var onTick = _a[_i];
                onTick(1, this, undefined);
            }
        }
        return this;
    };
    Animation.prototype.reset = function () {
        this.clearSessions();
        this.isActive = false;
        this.isAnimating = false;
        this.isPaused = false;
        this.currentDirection = true;
        this.iterationCount = 0;
        this.startTime = 0;
        this.pauseTime = 0;
        this.endTime = 0;
        this.currentProgress = 0;
        return this;
    };
    Animation.prototype.pause = function () {
        if (this.isActive === true &&
            this.isAnimating == true &&
            this.isPaused === false) {
            this.clearSessions();
            this.isAnimating = false;
            this.isPaused = true;
            this.pauseTime = Date.now();
        }
        return this;
    };
    Animation.prototype.stop = function () {
        this
            .reset()
            .callOnAnimationEnd()
            .callback();
        return this;
    };
    Animation.prototype.stopAndJumptToEnd = function () {
        this
            .reset()
            .goToEnd()
            .callOnAnimationEnd()
            .callback();
        return this;
    };
    Animation.prototype.stopAndJumpToBeginning = function () {
        this
            .reset()
            .goToBeginning()
            .callOnAnimationEnd()
            .callback();
        return this;
    };
    Animation.prototype.play = function (delay) {
        this.callOnAnimationStart();
        this.isActive = true;
        if (typeof delay !== 'number') {
            delay = this.delay;
        }
        this.timeoutID = setTimeout(this.start.bind(this), delay * 1000);
        return this;
    };
    Animation.prototype.start = function () {
        this.isActive = true;
        if (this.isReversed === true) {
            this.currentDirection = false;
        }
        if (this.isPaused === true) {
            var startTimeDelta = this.pauseTime - this.startTime;
            var endTimeDelta = this.endTime - this.pauseTime;
            var now = Date.now();
            this.startTime = now - startTimeDelta;
            this.endTime = now + endTimeDelta;
            this.isPaused = false;
        }
        else {
            this.startTime = Date.now();
            this.endTime = this.startTime + (this.duration * 1000);
        }
        this.isAnimating = true;
        this.callOnIterationStart();
        this.loop();
        return this;
    };
    Animation.prototype.loop = function () {
        var frame = function () {
            this.tick();
            if (this.isActive === true &&
                this.isAnimating === true &&
                this.isPaused === false) {
                if (this.currentProgress < 1) {
                    this.loop();
                    return;
                }
                else {
                    this.iterationCount++;
                    this.callOnIterationEnd();
                    if (typeof this.numberOfIterations === 'number' &&
                        this.iterationCount >= this.numberOfIterations) {
                        this.stop();
                        return;
                    }
                    if (this.alternate === true &&
                        this.iterationCount % 2 !== 0) {
                        this.toggleDirection();
                    }
                    this.play(this.iterationDelay);
                }
            }
        };
        this.RAFID = window.requestAnimationFrame(frame.bind(this));
        return this;
    };
    Animation.prototype.tick = function () {
        this.currentProgress = this.getCurrentNValue();
        var n = this.timingFunction(this.currentProgress);
        if (this.currentDirection === false) {
            n = 1 - n;
        }
        if (typeof this.onTick === 'function') {
            this.onTick(n, this.iterationCount, this.exports);
        }
        else if (this.onTick.constructor === Array) {
            for (var _i = 0, _a = this.onTick; _i < _a.length; _i++) {
                var onTick = _a[_i];
                onTick(n, this.iterationCount, this.exports);
            }
        }
        return this;
    };
    Animation.prototype.getCurrentNValue = function () {
        return Num_1.Num.modulate(Date.now(), [this.startTime, this.endTime], 1, true);
    };
    Animation.prototype.clearSessions = function () {
        clearTimeout(this.timeoutID);
        window.cancelAnimationFrame(this.RAFID);
        return this;
    };
    Animation.prototype.toggleDirection = function () {
        this.currentDirection = this.currentDirection === true ? false : true;
        return this;
    };
    Animation.prototype.callOnAnimationStart = function () {
        if (typeof this.onAnimationStart === 'function') {
            this.onAnimationStart(this);
        }
        else if (this.onAnimationStart.constructor === Array) {
            for (var _i = 0, _a = this.onAnimationStart; _i < _a.length; _i++) {
                var onAnimationStart = _a[_i];
                onAnimationStart(this);
            }
        }
        return this;
    };
    Animation.prototype.callOnAnimationEnd = function () {
        if (typeof this.onAnimationEnd === 'function') {
            this.onAnimationEnd(this);
        }
        else if (this.onAnimationEnd.constructor === Array) {
            for (var _i = 0, _a = this.onAnimationEnd; _i < _a.length; _i++) {
                var onAnimationEnd = _a[_i];
                onAnimationEnd(this);
            }
        }
        return this;
    };
    Animation.prototype.callOnIterationStart = function () {
        if (typeof this.onIterationStart === 'function') {
            this.onIterationStart(this);
        }
        else if (this.onIterationStart.constructor === Array) {
            for (var _i = 0, _a = this.onIterationStart; _i < _a.length; _i++) {
                var onIterationStart = _a[_i];
                onIterationStart(this);
            }
        }
        return this;
    };
    Animation.prototype.callOnIterationEnd = function () {
        if (typeof this.onIterationEnd === 'function') {
            this.onIterationEnd(this);
        }
        else if (this.onIterationEnd.constructor === Array) {
            for (var _i = 0, _a = this.onIterationEnd; _i < _a.length; _i++) {
                var onIterationEnd = _a[_i];
                onIterationEnd(this);
            }
        }
        return this;
    };
    return Animation;
}());
exports.Animation = Animation;
//# sourceMappingURL=Animation.js.map