"use strict";
exports.__esModule = true;
var DOMUtil = (function () {
    function DOMUtil() {
    }
    DOMUtil.findAncestor = function (el, identifierFn, isMoreThanOneResults) {
        if (isMoreThanOneResults === void 0) { isMoreThanOneResults = true; }
        var results = new Array;
        if (identifierFn(el)) {
            results.push(el);
        }
        var currentEl = el;
        while (currentEl.nodeName !== 'HTML') {
            if (identifierFn(currentEl)) {
                results.push(currentEl);
            }
            currentEl = currentEl.parentElement;
        }
        if (results.length > 0) {
            return isMoreThanOneResults === true ? results : results[0];
        }
        else {
            return false;
        }
    };
    DOMUtil.findAncestorWithClass = function (el, className, isMoreThanOneResults) {
        if (isMoreThanOneResults === void 0) { isMoreThanOneResults = true; }
        var identifierFn = function (el) {
            return el.classList.contains(className);
        };
        return DOMUtil.findAncestor(el, identifierFn, isMoreThanOneResults);
    };
    DOMUtil.findAncestorWithID = function (el, ID, isMoreThanOneResults) {
        if (isMoreThanOneResults === void 0) { isMoreThanOneResults = true; }
        var identifierFn = function (el) {
            return el.id === ID ? true : false;
        };
        return DOMUtil.findAncestor(el, identifierFn, isMoreThanOneResults);
    };
    DOMUtil.findDescendant = function (el, identifierFn, isMoreThanOneResults) {
        if (isMoreThanOneResults === void 0) { isMoreThanOneResults = true; }
        var results = new Array;
        if (identifierFn(el)) {
            results.push(el);
        }
        var inspectDescendant = function (inspectEl) {
            var childrenEls = inspectEl.children;
            if (childrenEls.length > 0) {
                for (var index in childrenEls) {
                    if (identifierFn(childrenEls[index])) {
                        results.push(childrenEls[index]);
                        if (isMoreThanOneResults === false) {
                            break;
                        }
                    }
                    if (childrenEls[index].children.length > 0) {
                        inspectDescendant(childrenEls[index]);
                    }
                }
            }
        };
        inspectDescendant(el);
        if (results.length > 0) {
            return isMoreThanOneResults === true ? results : results[0];
        }
        else {
            return false;
        }
    };
    DOMUtil.findDescendantWithID = function (el, ID, isMoreThanOneResults) {
        if (isMoreThanOneResults === void 0) { isMoreThanOneResults = true; }
        var identifierFn = function (el) {
            return el.id === ID ? true : false;
        };
        return DOMUtil.findDescendant(el, identifierFn, isMoreThanOneResults);
    };
    DOMUtil.findDescendantWithClass = function (el, className, isMoreThanOneResults) {
        if (isMoreThanOneResults === void 0) { isMoreThanOneResults = true; }
        var identifierFn = function (el) {
            return el.classList.contains(className);
        };
        return DOMUtil.findDescendant(el, identifierFn, isMoreThanOneResults);
    };
    DOMUtil.findSibling = function (el, identifierFn, isMoreThanOneResults) {
        if (isMoreThanOneResults === void 0) { isMoreThanOneResults = true; }
        var results = DOMUtil.getSiblings(el);
        if (results === false) {
            return false;
        }
        var siblingEls = results;
        if (siblingEls.length > 0) {
            var results_1 = new Array;
            for (var index in siblingEls) {
                if (identifierFn(siblingEls[index])) {
                    results_1.push(siblingEls[index]);
                }
            }
            if (results_1.length > 0) {
                return isMoreThanOneResults === true ? results_1 : results_1[0];
            }
        }
        return false;
    };
    DOMUtil.findSiblingWithClass = function (el, className, isMoreThanOneResults) {
        if (isMoreThanOneResults === void 0) { isMoreThanOneResults = true; }
        var identifierFn = function (el) {
            return el.classList.contains(className);
        };
        return DOMUtil.findSibling(el, identifierFn, isMoreThanOneResults);
    };
    DOMUtil.hasAncestor = function (el, ancestorEl) {
        var identifierFn = function (el) {
            return el === ancestorEl ? true : false;
        };
        return DOMUtil.findAncestor(el, identifierFn, false);
    };
    DOMUtil.hasDescendant = function (el, descendantEl) {
        var identifierFn = function (el) {
            return el === descendantEl ? true : false;
        };
        return DOMUtil.findDescendant(el, identifierFn, false);
    };
    DOMUtil.getOffset = function (el) {
        var boundingBox = el.getBoundingClientRect();
        return [window.scrollX + boundingBox.left, window.scrollY + boundingBox.top];
    };
    DOMUtil.getSiblings = function (el) {
        var siblingEls = el.parentElement.children;
        return siblingEls.length > 0 ? siblingEls : false;
    };
    DOMUtil.isAnElement = function (element) {
        if (typeof element === 'object' &&
            typeof element.nodeType === 'number' &&
            element.nodeType === 1) {
            return true;
        }
        else {
            return false;
        }
    };
    DOMUtil.isElementNodeName = function (element, name) {
        if (typeof element === 'object' &&
            typeof element.nodeName === 'string' &&
            element.nodeName === name) {
            return true;
        }
        else {
            return false;
        }
    };
    return DOMUtil;
}());
exports.DOMUtil = DOMUtil;
//# sourceMappingURL=DOMUtil.js.map