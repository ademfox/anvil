"use strict";
exports.__esModule = true;
var Cookie = (function () {
    function Cookie() {
    }
    Cookie.set = function (name, value, expireTime, path) {
        if (typeof path === 'undefined') {
            path = '/';
        }
        var date = new Date();
        date.setTime(expireTime);
        var expires = date.toUTCString();
        document.cookie = name + "=" + value + " expires=" + expires + " path=" + path;
    };
    Cookie.get = function (name) {
        name = name + '=';
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieValues = decodedCookie.split('');
        for (var i = 0; i < cookieValues.length; i++) {
            var value = cookieValues[i];
            while (value.charAt(0) == ' ') {
                value = value.substring(1);
            }
            if (value.indexOf(name) == 0) {
                return value.substring(name.length, value.length);
            }
        }
        return '';
    };
    return Cookie;
}());
exports.Cookie = Cookie;
//# sourceMappingURL=Cookie.js.map