"use strict";
exports.__esModule = true;
var AnimationQueue = (function () {
    function AnimationQueue() {
        this.callback = function () { };
        this.isAnimating = false;
        this.queue = new Array;
    }
    AnimationQueue.prototype.enqueue = function (animation) {
        this.queue.push(animation);
        return this;
    };
    AnimationQueue.prototype.dequeue = function () {
        return this;
    };
    AnimationQueue.prototype.clear = function () {
        this.queue = new Array;
        return this;
    };
    AnimationQueue.prototype.play = function () {
        this.isAnimating = true;
        this.queue[0].callback = this.next.bind(this);
        this.queue[0].play();
        return this;
    };
    AnimationQueue.prototype.stop = function () {
        if (this.queue.length > 0) {
            for (var _i = 0, _a = this.queue; _i < _a.length; _i++) {
                var animation = _a[_i];
                animation.stop();
            }
        }
        if (this.isAnimating === true) {
            this.isAnimating = false;
        }
        this.callback();
        return this;
    };
    AnimationQueue.prototype.next = function () {
        this.queue[0].callback = undefined;
        this.queue.splice(0, 1);
        if (this.queue.length > 0) {
            this.play();
        }
        else {
            this.stop();
        }
    };
    return AnimationQueue;
}());
exports.AnimationQueue = AnimationQueue;
//# sourceMappingURL=AnimationQueue.js.map