"use strict";
exports.__esModule = true;
var ArrayUtil = (function () {
    function ArrayUtil() {
    }
    ArrayUtil.countItem = function (item, array) {
        var count = 0;
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var itemInArray = array_1[_i];
            if (itemInArray === item) {
                count++;
            }
        }
        return count;
    };
    ArrayUtil.addUniqueItem = function (value, array) {
        if (array.length === 0) {
            array.push(value);
            return true;
        }
        else {
            var count = ArrayUtil.countItem(value, array);
            if (count === 0) {
                array.push(value);
                return true;
            }
        }
        return false;
    };
    ArrayUtil.removeItem = function (item, array) {
        var itemDeleted = false;
        for (var i = 0; i < array.length; i++) {
            if (array[i] === item) {
                array.splice(i, 1);
                itemDeleted = true;
            }
        }
        return itemDeleted;
    };
    ArrayUtil.copy = function (array) {
        var result = new Array;
        for (var i = 0; i < array.length; i++) {
            result[i] = array[i];
        }
        return result;
    };
    return ArrayUtil;
}());
exports.ArrayUtil = ArrayUtil;
//# sourceMappingURL=ArrayUtil.js.map