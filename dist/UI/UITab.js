"use strict";
exports.__esModule = true;
var anvil_1 = require("../anvil");
var UITab = (function () {
    function UITab(properties) {
        this.tabNavItemClass = '_UITabNavItem';
        this.openOnCondition = function (tabNavItemEl) { return true; };
        this.setProperties(properties);
        this.startListening();
        return this;
    }
    UITab.prototype.setProperties = function (properties) {
        for (var key in properties) {
            this[key] = properties[key];
        }
        return this;
    };
    UITab.prototype.activateTab = function (tabEl) {
        return tabEl.classList.add('_UITab-active');
    };
    UITab.prototype.deactivateTab = function (tabEl, callbackFn) {
        tabEl.classList.remove('_UITab-active');
        callbackFn();
    };
    UITab.prototype.getTabFromTabNavItem = function (tabNavItemEl) {
        var group = tabNavItemEl.dataset.group;
        var target = tabNavItemEl.dataset.target;
        return document.querySelector("#" + target + "._UITab[data-group=\"" + group + "\"]");
    };
    UITab.prototype.getActiveTab = function (tabNavItemEl) {
        var group = tabNavItemEl.dataset.group;
        return document.querySelector("._UITab[data-group=\"" + group + "\"]._UITab-active");
    };
    UITab.prototype.activateTabFromTabNavItem = function (tabNavItemEl) {
        var _this = this;
        var tabEl = this.getTabFromTabNavItem(tabNavItemEl);
        var activeTabEl = this.getActiveTab(tabNavItemEl);
        var callback = function () {
            _this.activateTab(tabEl);
        };
        this.deactivateTab(activeTabEl, callback.bind(this));
        return this;
    };
    UITab.prototype.activateTabNavItem = function (tabNavItemEl, callbackFn) {
        tabNavItemEl.classList.add('_UITabNavItem-active');
        callbackFn();
    };
    UITab.prototype.deactivateTabNavItem = function (tabNavItemEl, callbackFn) {
        tabNavItemEl.classList.remove('_UITabNavItem-active');
        callbackFn();
    };
    UITab.prototype.getActiveTabNavItem = function (tabNavItemEl) {
        var group = tabNavItemEl.dataset.group;
        return document.querySelector("._UITabNavItem[data-group=\"" + group + "\"]._UITabNavItem-active");
    };
    UITab.prototype._handleClick = function (event) {
        var _this = this;
        var tabNavItemEl = anvil_1.DOMUtil.findAncestorWithClass(event.target, this.tabNavItemClass, false);
        if (tabNavItemEl &&
            this.openOnCondition(tabNavItemEl)) {
            event.preventDefault();
            var activeTabNavItemEl = this.getActiveTabNavItem(tabNavItemEl);
            var callback2_1 = function () {
                _this.activateTabFromTabNavItem(tabNavItemEl);
            };
            var callback = function () {
                _this.activateTabNavItem(tabNavItemEl, callback2_1.bind(_this));
            };
            this.deactivateTabNavItem(activeTabNavItemEl, callback.bind(this));
        }
        return this;
    };
    UITab.prototype.startListening = function () {
        window.addEventListener('click', this._handleClick.bind(this));
        return this;
    };
    UITab.prototype.stopListening = function () {
        window.removeEventListener('click', this._handleClick.bind(this));
        return this;
    };
    return UITab;
}());
exports.UITab = UITab;
//# sourceMappingURL=UITab.js.map