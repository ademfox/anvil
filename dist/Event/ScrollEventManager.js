"use strict";
exports.__esModule = true;
var anvil_1 = require("../anvil");
var ScrollEventManager = (function () {
    function ScrollEventManager() {
        this.debounceTime = 0.2;
        this.isScrolling = false;
        this.onEvent = function () { };
        this.onScrollStart = function () { };
        this.onScroll = function () { };
        this.onScrollEnd = function () { };
        this.handlers = {};
        this.startListening();
    }
    ScrollEventManager.prototype.register = function (name, handler) {
        this.handlers[name] = handler;
        this.handlers[name].name = name;
        return this;
    };
    ScrollEventManager.prototype.find = function (name) {
        return this.handlers[name];
    };
    ScrollEventManager.prototype.remove = function (name) {
        this.handlers[name].element.removeEventListener('scroll', this.handleScroll);
        this.handlers[name].element.removeEventListener('scroll', this.handlers[name].debounce);
        delete this.handlers[name];
        return this;
    };
    ScrollEventManager.prototype.startListening = function () {
        for (var name_1 in this.handlers) {
            this.handlers[name_1].debounce = anvil_1.Util.debounce(this.debounceTime, this.handlers[name_1].handleScrollEnd.bind(this));
            this.handlers[name_1].element.addEventListener('scroll', this.handlers[name_1].handleScroll.bind(this));
            this.handlers[name_1].element.addEventListener('scroll', this.handlers[name_1].debounce.bind(this));
        }
        return this;
    };
    ScrollEventManager.prototype.stopListening = function () {
        for (var name_2 in this.handlers) {
            this.handlers[name_2].element.removeEventListener('scroll', this.handleScroll);
            this.handlers[name_2].element.removeEventListener('scroll', this.handlers[name_2].debounce);
        }
        return this;
    };
    ScrollEventManager.prototype.handleScroll = function (event) {
        for (var name_3 in this.handlers) {
            this.handlers[name_3].handleScroll(event);
        }
    };
    ScrollEventManager.prototype.handleScrollEnd = function () {
        for (var name_4 in this.handlers) {
            this.handlers[name_4].handleScroll(event);
        }
    };
    return ScrollEventManager;
}());
exports.ScrollEventManager = ScrollEventManager;
//# sourceMappingURL=ScrollEventManager.js.map