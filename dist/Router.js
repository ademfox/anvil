"use strict";
exports.__esModule = true;
var Router = (function () {
    function Router() {
        this.matchIsFound = false;
        this.noMatchCallback = function () { };
        this.reset();
    }
    Router.prototype.reset = function () {
        this.rules = new Array;
        this.routes = new Array;
        this.pathData = new Array;
        this.queryStringsData = new Array;
        this.data = new Array;
        return this;
    };
    Router.prototype.root = function (callback) {
        this.rootCallback = callback;
        return this;
    };
    Router.prototype.noMatch = function (callback) {
        this.noMatchCallback = callback;
        return this;
    };
    Router.prototype.addRule = function (variable, regex) {
        this.rules[variable] = regex;
        return this;
    };
    Router.prototype.setRules = function (rules) {
        for (var variable in rules) {
            this.rules[variable] = rules[variable];
        }
        return this;
    };
    Router.prototype.match = function (path, callback) {
        this.routes.push({
            callback: callback,
            path: path
        });
        return this;
    };
    Router.prototype.route = function () {
        for (var _i = 0, _a = this.routes; _i < _a.length; _i++) {
            var route = _a[_i];
            if (this.matchRoute(route)) {
                break;
            }
        }
        if (this.matchIsFound === false) {
            this.noMatchCallback();
        }
        return this;
    };
    Router.prototype.matchRoute = function (route) {
        var routePath = this.removeForwardSlashEdges(route.path);
        var routePathFragments = routePath.split('/');
        var path = this.removeForwardSlashEdges(window.location.pathname);
        if (path === '') {
            this.matchIsFound = true;
            this.aggregateData();
            this.rootCallback(this);
            return true;
        }
        var pathFragments = path.split('/');
        if (pathFragments.length !== routePathFragments.length) {
            return false;
        }
        var counter = 0;
        var data = [];
        for (var fragment in routePathFragments) {
            if (fragment.match(/^\{[a-zA-Z0-9\-\_]+\}$/g)) {
                var key = fragment.replace(/({|})/g, '');
                if (this.rules[key] && pathFragments[counter].match(this.rules[key]) ||
                    (!this.rules[key] && pathFragments[counter] !== '')) {
                    data[key] = pathFragments[counter];
                }
                else if (this.rules[key] && !pathFragments[counter].match(this.rules[key])) {
                    return false;
                }
            }
            else {
                if (fragment !== pathFragments[counter]) {
                    return false;
                }
            }
            counter++;
        }
        this.matchIsFound = true;
        this.pathData = data;
        this.aggregateData();
        route.callback();
        return true;
    };
    Router.prototype.aggregateData = function () {
        if (this.pathData) {
            for (var key in this.pathData) {
                this.data[key] = this.pathData[key];
            }
        }
        if (this.queryStringsData) {
            for (var key in this.queryStringsData) {
                this.data[key] = this.queryStringsData[key];
            }
        }
        return this;
    };
    Router.prototype.getqueryStringsData = function () {
        this.queryStringsData = new Array;
        var queryString = window.location.search;
        if (queryString) {
            var queryStrings = queryString.replace(/^\?/g, '').split('&');
            for (var string in queryStrings) {
                var datum = string.split('=');
                this.queryStringsData[datum[0]] = datum[1];
            }
        }
        return this;
    };
    Router.prototype.removeForwardSlashEdges = function (string) {
        return string.replace(/^\//g, '').replace(/\/$/g, '');
    };
    return Router;
}());
exports.Router = Router;
//# sourceMappingURL=Router.js.map