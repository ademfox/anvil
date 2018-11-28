"use strict";
exports.__esModule = true;
var Ajax = (function () {
    function Ajax(properties) {
        this.method = 'GET';
        this.setProperties(properties);
        this.xhr = new XMLHttpRequest();
        return this;
    }
    Ajax.prototype.setProperties = function (properties) {
        for (var key in properties) {
            this[key] = properties[key];
        }
        return this;
    };
    Ajax.prototype.send = function () {
        var _this = this;
        var onStateChange = function () {
            if (_this.xhr.readyState === XMLHttpRequest.DONE) {
                var data = void 0;
                if (_this.xhr.responseText) {
                    data = JSON.parse(_this.xhr.responseText);
                }
                if (_this.xhr.status === 200) {
                    _this.success(data, _this.xhr);
                }
                else {
                    _this.fail(data, _this.xhr);
                }
            }
            _this.xhr.open(_this.method, _this.URL, true);
            if (_this.method === 'POST') {
                _this.xhr.setRequestHeader('Content-Type', 'application/jsoncharset=UTF-8');
            }
            if (typeof _this.data !== 'undefined') {
                _this.xhr.send(JSON.stringify(_this.data));
            }
            else {
                _this.xhr.send();
            }
        };
        this.xhr.onreadystatechange = onStateChange.bind(this);
        return this;
    };
    return Ajax;
}());
exports.Ajax = Ajax;
//# sourceMappingURL=Ajax.js.map