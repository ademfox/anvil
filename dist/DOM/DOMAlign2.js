"use strict";
exports.__esModule = true;
var DOMAlign = (function () {
    function DOMAlign() {
    }
    DOMAlign.prototype.convertPointToScreen = function () {
    };
    DOMAlign.getAbsoluteOuterCornerTopLeft = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: ar.height - oy,
            l: -tr.width + ox,
            r: ar.width - ox,
            t: -tr.height + oy,
            fb: ar.top + oy <= window.innerHeight,
            fl: ar.left - tr.width + ox >= 0,
            fr: ar.left + ox <= window.innerWidth,
            ft: ar.top - tr.height + oy >= 0
        };
    };
    return DOMAlign;
}());
exports.DOMAlign = DOMAlign;
//# sourceMappingURL=DOMAlign2.js.map