"use strict";
exports.__esModule = true;
var AnimationGroup = (function () {
    function AnimationGroup() {
        this.callback = function () { };
        this.isAnimating = false;
        this.count = 0;
        this.stack = new Array;
    }
    AnimationGroup.prototype.add = function (animation) {
        this.stack.push(animation);
        return this;
    };
    AnimationGroup.prototype.clear = function () {
        this.reset();
        this.stack = new Array;
        return this;
    };
    AnimationGroup.prototype.reset = function () {
        for (var i = 0; i < this.stack.length; i++) {
            this.stack[i].callback = function () { };
        }
        this.count = 0;
        this.isAnimating = false;
        return this;
    };
    AnimationGroup.prototype.setup = function () {
        for (var i = 0; i < this.stack.length; i++) {
            this.stack[i].callback = this.onAnimationEnd.bind(this);
        }
        return this;
    };
    AnimationGroup.prototype.play = function () {
        if (this.isAnimating === false) {
            this.setup();
            this.isAnimating = true;
            for (var i = 0; i < this.stack.length; i++) {
                this.stack[i].play();
            }
        }
        return this;
    };
    AnimationGroup.prototype.stop = function () {
        if (this.isAnimating === true) {
            for (var i = 0; i < this.stack.length; i++) {
                this.stack[i].stop();
            }
            this.reset();
        }
        return this;
    };
    AnimationGroup.prototype.onAnimationEnd = function () {
        this.count++;
        if (this.count == this.stack.length) {
            this.reset();
            this.callback();
        }
    };
    return AnimationGroup;
}());
exports.AnimationGroup = AnimationGroup;
//# sourceMappingURL=AnimationGroup.js.map