"use strict";
exports.__esModule = true;
var anvil_1 = require("../anvil");
var Vector2 = (function () {
    function Vector2() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.x = 0;
        this.y = 0;
        this.setPoint.apply(this, args);
        return this;
    }
    Vector2.prototype.setPoint = function (x, y) {
        if (typeof x === 'number' &&
            typeof y === 'number') {
            this.x = x;
            this.y = y;
        }
        else if (typeof x === 'undefined') {
            this.x = 0;
            this.y = 0;
        }
        else {
            this.equals(x);
        }
        return this;
    };
    Vector2.prototype.setMagnitude = function (mag) {
        this
            .normalize()
            .multiply(mag);
        return this;
    };
    Vector2.prototype.equals = function (point) {
        this.x = point.x;
        this.y = point.y;
        return this;
    };
    Vector2.prototype.isEqualTo = function (point) {
        if (this.x === point.x &&
            this.y === point.y) {
            return true;
        }
        return false;
    };
    Vector2.prototype.round = function (to) {
        if (to === void 0) { to = 0; }
        this.x = parseFloat((this.x).toFixed(to));
        this.y = parseFloat((this.y).toFixed(to));
        return this;
    };
    Vector2.prototype.clone = function () {
        return Vector2.equals(this);
    };
    Vector2.prototype.getArray = function () {
        return [this.x, this.y];
    };
    Vector2.prototype.getString = function () {
        return "x: " + this.x + ", y: " + this.y;
    };
    Vector2.prototype.average = function () {
        return (Math.abs(this.x) + Math.abs(this.y)) / 2;
    };
    Vector2.prototype.absolute = function () {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        return this;
    };
    Vector2.prototype.add = function (point) {
        this.x += point.x;
        this.y += point.y;
        return this;
    };
    Vector2.prototype.addX = function (point) {
        if (typeof point === 'number') {
            this.x += point;
        }
        else {
            this.x += point.x;
        }
        return this;
    };
    Vector2.prototype.addY = function (point) {
        if (typeof point === 'number') {
            this.y += point;
        }
        else {
            this.y += point.x;
        }
        return this;
    };
    Vector2.prototype.subtract = function (point) {
        this.x -= point.x;
        this.y -= point.y;
        return this;
    };
    Vector2.prototype.subtractX = function (point) {
        if (typeof point === 'number') {
            this.x -= point;
        }
        else {
            this.x -= point.x;
        }
        return this;
    };
    Vector2.prototype.subtractY = function (point) {
        if (typeof point === 'number') {
            this.y -= point;
        }
        else {
            this.y += point.x;
        }
        return this;
    };
    Vector2.prototype.multiply = function (by) {
        this.x *= by;
        this.y *= by;
        return this;
    };
    Vector2.prototype.multiplyX = function (by) {
        this.x *= by;
        return this;
    };
    Vector2.prototype.multiplyY = function (by) {
        this.y *= by;
        return this;
    };
    Vector2.prototype.divide = function (by) {
        by = by === 0 ? 1 : by;
        this.x /= by;
        this.y /= by;
        return this;
    };
    Vector2.prototype.divideX = function (by) {
        by = by === 0 ? 1 : by;
        this.x /= by;
        return this;
    };
    Vector2.prototype.divideY = function (by) {
        by = by === 0 ? 1 : by;
        this.y /= by;
        return this;
    };
    Vector2.prototype.constrain = function (constrain) {
        this.x = anvil_1.Num.constrain(this.x, constrain);
        this.y = anvil_1.Num.constrain(this.y, constrain);
        return this;
    };
    Vector2.prototype.dot = function (point) {
        return this.x * point.x + this.y * point.y;
    };
    Vector2.prototype.magnitude = function () {
        return anvil_1.Num.hypotenuse(this.x, this.y);
    };
    Vector2.prototype.normalize = function () {
        var mag = Math.abs(this.magnitude());
        mag = mag === 0 ? 1 : mag;
        this.x /= mag;
        this.y /= mag;
        return this;
    };
    Vector2.prototype.getDistanceTo = function (to) {
        return Vector2
            .subtract(this, to)
            .magnitude();
    };
    Vector2.prototype.getAngle = function () {
        var m = Math.abs(Math.sqrt(this.x * this.x + this.y * this.y));
        var angle = Math.acos(this.x / m);
        if (this.y < 0) {
            angle = Math.PI + (Math.PI - angle);
        }
        return anvil_1.Num.cycle(angle, Math.PI * 2);
    };
    Vector2.prototype.getAngleFrom = function (from) {
        var x = (this.x - from.x);
        var y = (this.y - from.y);
        var m = Math.abs(Math.sqrt(x * x + y * y));
        var angle = Math.acos(x / m);
        if (y < 0) {
            angle = Math.PI + (Math.PI - angle);
        }
        return angle;
    };
    Vector2.prototype.getAngleTo = function (to) {
        var x = (to.x - this.x);
        var y = (to.y - this.y);
        var m = Math.abs(Math.sqrt(x * x + y * y));
        var angle = Math.acos(x / m);
        if (y < 0) {
            angle = Math.PI + (Math.PI - angle);
        }
        return angle;
    };
    Vector2.prototype.rotateBy = function (by) {
        var angle = this.getAngle() + by;
        var m = Math.abs(Math.sqrt(this.x * this.x + this.y * this.y));
        this.x = Math.cos(angle) * m;
        this.y = Math.sin(angle) * m;
        return this;
    };
    Vector2.prototype.rotateTo = function (angle) {
        angle = anvil_1.Num.cycle(angle, Math.PI * 2);
        var m = Math.abs(Math.sqrt(this.x * this.x + this.y * this.y));
        this.x = Math.cos(angle) * m;
        this.y = Math.sin(angle) * m;
        return this;
    };
    Vector2.prototype.rotateByFrom = function (by, from) {
        by = anvil_1.Num.cycle(by, Math.PI * 2);
        var x = this.x - from.x;
        var y = this.y - from.y;
        var m = Math.abs(Math.sqrt(x * x + y * y));
        var a = Math.acos(x / m);
        if (y < 0) {
            a = Math.PI + (Math.PI - a);
        }
        var finalAngle = anvil_1.Num.cycle(a + by, Math.PI * 2);
        this.x = from.x + Math.cos(finalAngle) * m;
        this.y = from.y + Math.sin(finalAngle) * m;
        return this;
    };
    Vector2.prototype.rotateToFrom = function (to, from) {
        to = anvil_1.Num.cycle(to, Math.PI * 2);
        var x = this.x - from.x;
        var y = this.y - from.y;
        var m = Math.abs(Math.sqrt(x * x + y * y));
        this.x = from.x + Math.cos(to) * m;
        this.y = from.y + Math.sin(to) * m;
        return this;
    };
    Vector2.prototype.moveBy = function (x, y) {
        if (typeof x === 'number' &&
            typeof y === 'number') {
            this.x += x;
            this.y += y;
        }
        else if (typeof x !== 'undefined' &&
            typeof y === 'undefined') {
            this.add(x);
        }
        return this;
    };
    Vector2.prototype.moveTo = function (x, y) {
        if (typeof x === 'number' &&
            typeof y === 'number') {
            this.x = x;
            this.y = y;
        }
        else if (typeof x !== 'undefined' &&
            typeof y === 'undefined') {
            this.equals(x);
        }
        return this;
    };
    Vector2.prototype.moveRadiallyBy = function (angle, by) {
        angle = anvil_1.Num.cycle(angle, Math.PI * 2);
        this.x += Math.cos(angle) * by;
        this.y += Math.sin(angle) * by;
        return this;
    };
    Vector2.prototype.moveRadiallyTo = function (angle, by) {
        angle = anvil_1.Num.cycle(angle, Math.PI * 2);
        this.x = Math.cos(angle) * by;
        this.y = Math.sin(angle) * by;
        return this;
    };
    Vector2.prototype.scaleBy = function (by) {
        var magnitude = Math.abs(Math.sqrt(this.x * this.x + this.y * this.y));
        magnitude = magnitude === 0 ? 1 : magnitude;
        this.x /= magnitude;
        this.y /= magnitude;
        this.x *= by;
        this.y *= by;
        return this;
    };
    Vector2.prototype.scaleByFrom = function (by, from) {
        var sub = Vector2.subtract(this, from);
        var m = sub.magnitude();
        sub
            .normalize()
            .multiply(m * by)
            .add(from);
        this.equals(sub);
        return this;
    };
    Vector2.prototype.limit = function (by) {
        var mag = this.magnitude();
        if (mag > by) {
            this
                .normalize()
                .multiply(by);
        }
        return this;
    };
    Vector2.prototype.lerp = function (point, time) {
        this.x = anvil_1.Num.modulate(time, 1, [this.x, point.x], false);
        this.y = anvil_1.Num.modulate(time, 1, [this.y, point.y], false);
        return this;
    };
    Vector2.prototype.isZero = function () {
        return this.x === 0 && this.y === 0 ? true : false;
    };
    Vector2.prototype.zero = function () {
        this.x = 0;
        this.y = 0;
        return this;
    };
    Vector2.projectFrom = function (from, direction, by) {
        var to = Vector2
            .equals(direction)
            .normalize()
            .multiply(by);
        return Vector2.add(from, to);
    };
    Vector2.zero = function () {
        return new Vector2(0, 0);
    };
    Vector2.random = function () {
        return new Vector2(Math.random(), Math.random());
    };
    Vector2.equals = function (point) {
        return new Vector2(point.x, point.y);
    };
    Vector2.add = function (a, b) {
        return new Vector2(a).add(b);
    };
    Vector2.subtract = function (a, b) {
        return new Vector2(a.x, a.y).subtract(b);
    };
    Vector2.multiply = function (v, n) {
        return new Vector2(v.x, v.y).multiply(n);
    };
    Vector2.divide = function (v, n) {
        return new Vector2(v.x, v.y).divide(n);
    };
    Vector2.normalize = function (v) {
        return new Vector2(v.x, v.y).normalize();
    };
    Vector2.getMidPointBetween = function (a, b) {
        var x = a.x - b.x;
        var y = a.y - b.y;
        x /= 2;
        y /= 2;
        x += b.x;
        y += b.y;
        return new Vector2(x, y);
    };
    Vector2.getDistanceBetween = function (a, b) {
        return Vector2
            .subtract(a, b)
            .magnitude();
    };
    Vector2.splitAtAngle = function (target, angle, by) {
        var results = new Array;
        results[0] = Vector2
            .equals(target)
            .moveRadiallyBy(angle, -by);
        results[1] = Vector2
            .equals(target)
            .moveRadiallyBy(angle, by);
        return results;
    };
    Vector2.scaleByFrom = function (vector, to, from) {
        var result = Vector2.equals(vector);
        return result.scaleByFrom(to, from);
    };
    Vector2.getDisplacement = function (from, to) {
        return Vector2.subtract(to, from);
    };
    Vector2.getDirection = function (from, to) {
        return Vector2
            .subtract(to, from)
            .normalize();
    };
    Vector2.isEqual = function (a, b) {
        return a.x === a.x && a.y === b.y ? true : false;
    };
    Vector2.angleIsInProximity = function (a, b, tolerance) {
        var d1 = anvil_1.Angle.differenceClockwise(a, b);
        var d2 = anvil_1.Angle.differenceCounterclockwise(a, b);
        var d = Math.min(d1, d2);
        return d <= tolerance ? true : false;
    };
    Vector2.getAngleBetween2Points = function (a, b) {
        var a1 = Vector2.equals(a).getAngle();
        var a2 = Vector2.equals(b).getAngle();
        var b1 = anvil_1.Angle.differenceClockwise(a1, a2);
        var b2 = anvil_1.Angle.differenceCounterclockwise(a1, a2);
        return Math.min(b1, b2);
    };
    Vector2.getAngleBetween3Points = function (a, b, c) {
        var va = Vector2.equals(a);
        var vb = Vector2.equals(b);
        var vc = Vector2.equals(c);
        var a1 = vb.getAngleTo(va);
        var a2 = vb.getAngleTo(vc);
        var b1 = anvil_1.Angle.differenceClockwise(a1, a2);
        var b2 = anvil_1.Angle.differenceCounterclockwise(a1, a2);
        return Math.min(b1, b2);
    };
    Vector2.getBasePointOfTriangle = function (v1, v2, v3) {
        var a1 = v1.getAngleTo(v3);
        var a2 = v1.getAngleTo(v2);
        var a = Math.abs(a1 - a2);
        var h = v1.getDistanceTo(v2);
        var bh = Math.sin(a) * h;
        var ml = Math.atan(a) / bh;
        var fv = Vector2.equals(v1);
        return fv.moveRadiallyBy(a1, ml);
    };
    Vector2.addGroupBy = function (group, by) {
        for (var _i = 0, group_1 = group; _i < group_1.length; _i++) {
            var point = group_1[_i];
            point.add(by);
        }
        return group;
    };
    Vector2.subtractGroupBy = function (group, by) {
        for (var _i = 0, group_2 = group; _i < group_2.length; _i++) {
            var point = group_2[_i];
            point.subtract(by);
        }
        return group;
    };
    Vector2.multiplyGroupBy = function (group, by) {
        for (var _i = 0, group_3 = group; _i < group_3.length; _i++) {
            var point = group_3[_i];
            point.multiply(by);
        }
        return group;
    };
    Vector2.divideGroupBy = function (group, by) {
        for (var _i = 0, group_4 = group; _i < group_4.length; _i++) {
            var point = group_4[_i];
            point.divide(by);
        }
        return group;
    };
    Vector2.scaleGroupByFrom = function (group, by, from) {
        for (var _i = 0, group_5 = group; _i < group_5.length; _i++) {
            var point = group_5[_i];
            point.scaleByFrom(by, from);
        }
        return group;
    };
    Vector2.rotateGroupToFrom = function (group, to, from) {
        for (var _i = 0, group_6 = group; _i < group_6.length; _i++) {
            var point = group_6[_i];
            point.rotateToFrom(to, from);
        }
        return group;
    };
    Vector2.rotateGroupByFrom = function (group, by, from) {
        for (var _i = 0, group_7 = group; _i < group_7.length; _i++) {
            var point = group_7[_i];
            point.rotateByFrom(by, from);
        }
        return group;
    };
    return Vector2;
}());
exports.Vector2 = Vector2;
//# sourceMappingURL=Vector2.js.map