"use strict";
exports.__esModule = true;
var anvil_1 = require("./anvil");
var Scrolla = (function () {
    function Scrolla(properties) {
        this.cxa = 0;
        this.cxb = 0;
        this.cxc = 0;
        this.cya = 0;
        this.cyb = 0;
        this.cyc = 0;
        this.documentHeight = 0;
        this.documentWidth = 0;
        this.isResizing = false;
        this.isScrolling = false;
        this.resizeDebounceTimeout = 0.4;
        this.scrollDebounceTimeout = 0.4;
        this.scrollX = 0;
        this.scrollXDelta = 0;
        this.scrollY = 0;
        this.scrollYDelta = 0;
        this.viewHeightDelta = 0;
        this.viewWidthDelta = 0;
        this.continuousTriggers = new Array;
        this.discreteTriggers = new Array;
        return this;
    }
    Scrolla.prototype.initialize = function () {
        this.startListening();
        this._handleResize();
        this._handleScroll();
        this.computeAll();
        return this;
    };
    Scrolla.prototype.setProperties = function (properties) {
        for (var key in properties) {
            this[key] = properties[key];
        }
        return this;
    };
    Scrolla.prototype.addContinuousTrigger = function (name, settings) {
        this.continuousTriggers[name] = this.applyContinuousTriggerSettings(settings);
        return this;
    };
    Scrolla.prototype.updateContinuousTrigger = function (name, settings) {
        if (typeof this.continuousTriggers[name] !== 'undefined') {
            for (var key in settings) {
                this.continuousTriggers[name][key] = settings[key];
            }
        }
        return this;
    };
    Scrolla.prototype.removeContinuousTrigger = function (name) {
        if (typeof this.continuousTriggers[name] !== 'undefined') {
            delete this.continuousTriggers[name];
        }
        return this;
    };
    Scrolla.prototype.addDiscreteTrigger = function (name, settings) {
        this.discreteTriggers[name] = this.applyDiscreteTriggerSettings(settings);
        return this;
    };
    Scrolla.prototype.updateDiscreteTrigger = function (name, settings) {
        if (typeof this.discreteTriggers[name] !== 'undefined') {
            for (var key in settings) {
                this.discreteTriggers[name][key] = settings[key];
            }
        }
        return this;
    };
    Scrolla.prototype.removeDiscreteTrigger = function (name) {
        if (typeof this.discreteTriggers[name] !== 'undefined') {
            delete this.discreteTriggers[name];
        }
        return this;
    };
    Scrolla.prototype.startListening = function () {
        window.addEventListener('scroll', this._handleScroll.bind(this));
        window.addEventListener('resize', this._handleResize.bind(this));
        return this;
    };
    Scrolla.prototype.stopListening = function () {
        window.removeEventListener('scroll', this._handleScroll);
        window.removeEventListener('resize', this._handleResize);
        return this;
    };
    Scrolla.prototype.applyContinuousTriggerSettings = function (settings) {
        var defaultSettings = {
            action: function (n, obj) { },
            isActive: false,
            isElementBound: false,
            isPaused: false,
            n: 0,
            normalizeEdges: true,
            offsetBottom: 0,
            offsetTop: 0,
            ta: 0,
            tb: 0,
            tc: 0,
            triggerDuration: 0,
            triggerEl: undefined,
            triggerLocation: 0
        };
        for (var key in settings) {
            defaultSettings[key] = settings[key];
        }
        return defaultSettings;
    };
    Scrolla.prototype.callContinuousAction = function (key, n) {
        var action = this.continuousTriggers[key].action;
        window.requestAnimationFrame(action(n).bind(this));
        return this;
    };
    Scrolla.prototype.computeNContinuous = function () {
        var c = this.cya + this.cyb;
        var d = this.documentHeight;
        for (var name_1 in this.continuousTriggers) {
            var v = this.continuousTriggers[name_1];
            var ot = v.normalizeEdges && this.cyb > v.ta ? v.ta - this.cyb : 0;
            var ob = v.normalizeEdges && this.cyb > v.tc ? v.tc - this.cyb : 0;
            var i = v.ta - Math.abs(ot);
            var e = (v.ta + v.tb + this.cyb) - Math.abs(ob);
            var n = anvil_1.Num.modulate(c, [i, e], 1);
            if (v.isActive && n <= 0) {
                if (v.isPaused === false) {
                    this.callContinuousAction(name_1, n);
                }
            }
            else if (n >= 0 && n <= 1) {
                if (v.isPaused === false) {
                    this.callContinuousAction(name_1, n);
                    v.isActive = true;
                }
            }
            else if (v.isActive && n >= 1) {
                if (v.isPaused === false) {
                    this.callContinuousAction(name_1, n);
                    v.isActive = false;
                }
            }
        }
        return this;
    };
    Scrolla.prototype.mapContinuousTriggers = function () {
        for (var name_2 in this.continuousTriggers) {
            var v = this.continuousTriggers[name_2];
            if (v.isElementBound == true &&
                typeof v.triggerEl !== 'undefined' &&
                v.triggerEl.nodeType === 1) {
                var el = this.getElementLocation(v.triggerEl);
                v.ta = el[1];
                v.tb = v.triggerEl.offsetHeight;
            }
            else {
                v.ta = v.triggerLocation;
                v.tb = v.triggerDuration;
            }
            v.ta += v.offsetTop;
            v.tb += v.offsetBottom;
            v.tc = this.documentHeight - (v.ta + v.tb);
            this.continuousTriggers[name_2] = v;
        }
        return this;
    };
    Scrolla.prototype.applyDiscreteTriggerSettings = function (settings) {
        var defaultSettings = {
            action: function (n, obj) { },
            direction: 0,
            isElementBound: false,
            isPaused: false,
            isTriggered: false,
            n: 0,
            offset: 0,
            ta: 0,
            tb: 0,
            triggerEl: undefined,
            triggerInitial: true,
            triggerLocation: 0
        };
        for (var key in settings) {
            defaultSettings[key] = settings[key];
        }
        return defaultSettings;
    };
    Scrolla.prototype.computeNDiscrete = function () {
        var c = this.cya + this.cyb;
        var d = this.scrollYDelta;
        for (var name_3 in this.discreteTriggers) {
            var v = this.discreteTriggers[name_3];
            if (v.triggerInitial === true &&
                v.isTriggered === false &&
                (c >= v.ta)) {
                v.isTriggered = true;
                if (v.isPaused === false) {
                    v.action(d, this);
                }
            }
            else if (d >= 0 &&
                c >= v.ta &&
                (c - d) < v.ta) {
                v.isTriggered = true;
                if (v.isPaused === false) {
                    v.action(d, this);
                }
            }
            else if (d < 0 &&
                c <= v.ta &&
                (c + d) > v.ta) {
                v.isTriggered = true;
                if (v.isPaused === false) {
                    v.action(d, this);
                }
            }
        }
        return this;
    };
    Scrolla.prototype.mapDiscreteTriggers = function () {
        for (var name_4 in this.discreteTriggers) {
            var v = this.discreteTriggers[name_4];
            if (v.isElementBound === true &&
                v.triggerEl &&
                v.triggerEl.nodeType === 1) {
                var el = this.getElementLocation(v.triggerEl);
                v.ta = el[1] + v.offset;
            }
            else {
                v.ta = v.triggerLocation + v.offset;
            }
            v.tb = this.documentHeight - v.ta;
            this.discreteTriggers[name_4] = v;
        }
        return this;
    };
    Scrolla.prototype.compute = function () {
        this.cxa = this.scrollX;
        this.cya = this.scrollY;
        this.cxb = window.innerWidth;
        this.cyb = window.innerHeight;
        this.cxc = this.documentWidth - (this.scrollX + window.innerWidth);
        this.cyc = this.documentHeight - (this.scrollY + window.innerHeight);
        return this;
    };
    Scrolla.prototype.mapAll = function () {
        this.mapContinuousTriggers();
        this.mapDiscreteTriggers();
        return this;
    };
    Scrolla.prototype.computeAll = function () {
        this.updateMetrics();
        this.compute();
        this.mapAll();
        this.computeNDiscrete();
        this.computeNContinuous();
        return this;
    };
    Scrolla.prototype.getElementLocation = function (element) {
        var rect = element.getBoundingClientRect();
        return [this.scrollX + rect.left, this.scrollY + rect.top];
    };
    Scrolla.prototype.updateMetrics = function () {
        this.getScrollValues();
        this.getDocumentDimensions();
        return this;
    };
    Scrolla.prototype.getDocumentDimensions = function () {
        var bodyEl = document.body;
        var htmlEl = document.documentElement;
        this.documentHeight = Math.max(bodyEl.scrollHeight, bodyEl.offsetHeight, htmlEl.clientHeight, htmlEl.scrollHeight, htmlEl.offsetHeight);
        this.documentWidth = Math.max(bodyEl.scrollWidth, bodyEl.offsetWidth, htmlEl.clientWidth, htmlEl.scrollWidth, htmlEl.offsetWidth);
        return this;
    };
    Scrolla.prototype.getScrollValues = function () {
        this.scrollX = window.scrollX || window.pageXOffset || document.body.scrollLeft;
        this.scrollY = window.scrollY || window.pageYOffset || document.body.scrollTop;
        return this;
    };
    Scrolla.prototype._handleScroll = function () {
        this.isScrolling = true;
        var scrollXDelta = this.scrollX;
        var scrollYDelta = this.scrollY;
        this.getScrollValues();
        this.scrollXDelta = (scrollXDelta - this.scrollX) * -1;
        this.scrollYDelta = (scrollYDelta - this.scrollY) * -1;
        this.computeAll();
        return this;
    };
    Scrolla.prototype._handleResize = function () {
        this.isResizing = true;
        var viewHeightDelta = window.innerHeight;
        var viewWidthDelta = window.innerWidth;
        this.getDocumentDimensions();
        this.viewHeightDelta = (viewHeightDelta - window.innerHeight) * -1;
        this.viewWidthDelta = (viewWidthDelta - window.innerWidth) * -1;
        this.computeAll();
        return this;
    };
    return Scrolla;
}());
exports.Scrolla = Scrolla;
//# sourceMappingURL=Scrolla.js.map