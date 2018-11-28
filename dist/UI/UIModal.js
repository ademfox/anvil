"use strict";
exports.__esModule = true;
var anvil_1 = require("../anvil");
var UIModal = (function () {
    function UIModal(properties) {
        this.closeKeyCodes = [27];
        this.closeOnOutsideClick = true;
        this.isActive = false;
        this.triggerCloseClass = '_jsUIModalClose';
        this.triggerOpenClass = '_jsUIModalOpen';
        this.openOnCondition = function (targetModalEl) { return true; };
        this.open = function (modalEl, completeFn, context) {
            modalEl.classList.add('_UIModal-active');
            completeFn();
        };
        this.close = function (activeModalEl, completeFn, context) {
            activeModalEl.classList.remove('_UIModal-active');
            completeFn();
        };
        this.transit = function (currentModalEl, nextModalEl, completeFn, context) {
            currentModalEl.classList.remove('_UIModal-active');
            nextModalEl.classList.add('_UIModal-active');
            completeFn();
        };
        if (typeof properties !== 'undefined') {
            this.setProperties(properties);
        }
        this.initialize();
        return this;
    }
    UIModal.prototype.initialize = function () {
        this._eventOpen = new Event('UIModalOpen');
        this._eventClose = new Event('UIModalClose');
        this._eventTransit = new Event('UIModalTransit');
        this.startListening();
        return this;
    };
    UIModal.prototype.setProperties = function (properties) {
        for (var key in properties) {
            this[key] = properties[key];
        }
        return this;
    };
    UIModal.prototype.getTargetModalElFromTriggerEl = function (triggerOpenEl) {
        var targetID = triggerOpenEl.dataset.uimodalTarget;
        return document.getElementById(targetID);
    };
    UIModal.prototype.closeActiveModal = function () {
        var _this = this;
        if (this.isActive === true) {
            var completeFn = function () {
                _this.isActive = false;
            };
            completeFn.bind(this);
            window.dispatchEvent(this._eventClose);
            this.close(this.activeModalEl, completeFn);
        }
        return this;
    };
    UIModal.prototype.openModalByTriggerEl = function (triggerOpenEl) {
        var targetModalEl = this.getTargetModalElFromTriggerEl(triggerOpenEl);
        this.lastTriggerOpenEl = triggerOpenEl;
        this.openModalByTargetEl(targetModalEl, this);
        return this;
    };
    UIModal.prototype.openModalByTargetEl = function (targetModalEl, context) {
        var _this = this;
        if (typeof targetModalEl === 'object' &&
            typeof targetModalEl.nodeType === 'number' &&
            targetModalEl.nodeType === 1 &&
            this.openOnCondition(targetModalEl)) {
            var completeFn = function () {
                _this.activeModalEl = targetModalEl;
                _this.isActive = true;
            };
            completeFn = completeFn.bind(this);
            if (this.isActive === true) {
                window.dispatchEvent(this._eventTransit);
                this.transit(this.activeModalEl, targetModalEl, completeFn, this);
            }
            else {
                window.dispatchEvent(this._eventOpen);
                this.open(targetModalEl, completeFn, this);
            }
        }
        return this;
    };
    UIModal.prototype.startListening = function () {
        window.addEventListener('click', this._handleClick.bind(this));
        window.addEventListener('keyup', this._handleKeyUp.bind(this));
        return this;
    };
    UIModal.prototype.stopListening = function () {
        window.removeEventListener('click', this._handleClick);
        window.removeEventListener('keyup', this._handleKeyUp);
        return this;
    };
    UIModal.prototype._handleClick = function (event) {
        var triggerOpenEl = anvil_1.DOMUtil.findAncestorWithClass(event.target, this.triggerOpenClass, false);
        if (triggerOpenEl !== false) {
            event.preventDefault();
            this.openModalByTriggerEl(triggerOpenEl);
        }
        else if (this.isActive) {
            var triggerCloseEl = anvil_1.DOMUtil.findAncestorWithClass(event.target, this.triggerCloseClass, false);
            if (triggerCloseEl) {
                event.preventDefault();
                this.closeActiveModal();
            }
            if (this.closeOnOutsideClick === true) {
                if (anvil_1.DOMUtil.hasAncestor(event.target, this.activeModalEl) === false) {
                    this.closeActiveModal();
                }
            }
        }
        return this;
    };
    UIModal.prototype._handleKeyUp = function (event) {
        if (this.isActive === true) {
            for (var _i = 0, _a = this.closeKeyCodes; _i < _a.length; _i++) {
                var keyCode = _a[_i];
                if (event.keyCode === keyCode) {
                    this.closeActiveModal();
                }
            }
        }
        return this;
    };
    return UIModal;
}());
exports.UIModal = UIModal;
//# sourceMappingURL=UIModal.js.map