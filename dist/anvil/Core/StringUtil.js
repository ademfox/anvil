"use strict";
exports.__esModule = true;
var StringUtil = (function () {
    function StringUtil() {
    }
    StringUtil.trim = function (string) {
        string = string.replace(/^[\s]+/g, '');
        return string.replace(/[\s]+$/g, '');
    };
    StringUtil.removeExtraWhitespaces = function (string) {
        return string.replace(/[\s]+/g, ' ');
    };
    StringUtil.removeTabs = function (string) {
        return string.replace(/[\t]+/g, '');
    };
    StringUtil.removeNewLines = function (string) {
        return string.replace(/[\r\n]+/g, '');
    };
    return StringUtil;
}());
exports.StringUtil = StringUtil;
//# sourceMappingURL=StringUtil.js.map