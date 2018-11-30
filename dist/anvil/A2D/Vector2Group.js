"use strict";
exports.__esModule = true;
var Vector2Group = (function () {
    function Vector2Group() {
    }
    Vector2Group.prototype.set = function (group) {
        this.group = group;
    };
    Vector2Group.prototype.add = function (by) {
        for (var i = 0; i < this.group.length; i++) {
            this.group[i].add(by);
        }
        return this;
    };
    Vector2Group.prototype.subtract = function (by) {
        for (var i = 0; i < this.group.length; i++) {
            this.group[i].subtract(by);
        }
        return this;
    };
    return Vector2Group;
}());
exports.Vector2Group = Vector2Group;
//# sourceMappingURL=Vector2Group.js.map