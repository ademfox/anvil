"use strict";
exports.__esModule = true;
var Anvil_1 = require("../Anvil");
var UISwitch = (function () {
    function UISwitch(element) {
        this.isDisabled = false;
        this.isOn = false;
        this.onSwitch = function (isOn) { };
        this.value = 0;
        this.setElement(element);
        this.startListening();
        return this;
    }
    UISwitch.prototype.computeValue = function (isOn) {
        return isOn ? 1 : 0;
    };
    UISwitch.prototype.setElement = function (element) {
        this.element = element;
        return this;
    };
    UISwitch.prototype.turnOn = function (switchEl) {
        switchEl.dataset.value = this.value.toString();
        switchEl.classList.add('_UISwitch-isOn');
        return this;
    };
    UISwitch.prototype.turnOff = function (switchEl) {
        switchEl.dataset.value = this.value.toString();
        switchEl.classList.remove('_UISwitch-isOn');
        return this;
    };
    UISwitch.prototype.startListening = function () {
        window.addEventListener('click', this._handleClick.bind(this));
        return this;
    };
    UISwitch.prototype.stopListening = function () {
        window.removeEventListener('click', this._handleClick);
        return this;
    };
    UISwitch.prototype._turnOff = function () {
        this.onSwitch(this.isOn, this.value, this);
        this.isOn = false;
        this.value = this.computeValue(this.isOn);
        this.turnOff(this.element);
        return this;
    };
    UISwitch.prototype._turnOn = function () {
        this.onSwitch(this.isOn, this.value, this);
        this.isOn = true;
        this.value = this.computeValue(this.isOn);
        this.turnOn(this.element);
        return this;
    };
    UISwitch.prototype._toggleSwitch = function () {
        this.isOn = this.isOn === true ? false : true;
        return this;
    };
    UISwitch.prototype._handleClick = function (event) {
        if (this.isDisabled === false) {
            if (Anvil_1.DOMUtil.hasAncestor(event.target, this.element)) {
                this._toggleSwitch();
                if (this.isOn == true) {
                    this._turnOn();
                }
                else {
                    this._turnOff();
                }
            }
        }
        return this;
    };
    return UISwitch;
}());
exports.UISwitch = UISwitch;
//# sourceMappingURL=UISwitch.js.map