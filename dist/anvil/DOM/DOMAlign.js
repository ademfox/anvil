"use strict";
exports.__esModule = true;
var DOMAlign = (function () {
    function DOMAlign() {
    }
    DOMAlign.getAbsoluteOuter = function (alignment, anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        if (alignment === 'top-left') {
            return DOMAlign.getAbsoluteOuterTopLeft(anchorEl, targetEl);
        }
        else if (alignment === 'top') {
            return DOMAlign.getAbsoluteOuterTop(anchorEl, targetEl);
        }
        else if (alignment === 'top-right') {
            return DOMAlign.getAbsoluteOuterTopRight(anchorEl, targetEl);
        }
        else if (alignment === 'bottom-left') {
            return DOMAlign.getAbsoluteOuterBottomLeft(anchorEl, targetEl);
        }
        else if (alignment === 'bottom') {
            return DOMAlign.getAbsoluteOuterBottom(anchorEl, targetEl);
        }
        else if (alignment === 'bottom-right') {
            return DOMAlign.getAbsoluteOuterBottomRight(anchorEl, targetEl);
        }
        else if (alignment === 'left-top') {
            return DOMAlign.getAbsoluteOuterLeftTop(anchorEl, targetEl);
        }
        else if (alignment === 'left') {
            return DOMAlign.getAbsoluteOuterLeft(anchorEl, targetEl);
        }
        else if (alignment === 'left-bottom') {
            return DOMAlign.getAbsoluteOuterLeftBottom(anchorEl, targetEl);
        }
        else if (alignment === 'right-top') {
            return DOMAlign.getAbsoluteOuterRightTop(anchorEl, targetEl);
        }
        else if (alignment === 'right') {
            return DOMAlign.getAbsoluteOuterRight(anchorEl, targetEl);
        }
        else if (alignment === 'right-bottom') {
            return DOMAlign.getAbsoluteOuterRightBottom(anchorEl, targetEl);
        }
        else if (alignment === 'corner-top-left') {
            return DOMAlign.getAbsoluteOuterCornerTopLeft(anchorEl, targetEl);
        }
        else if (alignment === 'corner-top-right') {
            return DOMAlign.getAbsoluteOuterCornerTopRight(anchorEl, targetEl);
        }
        else if (alignment === 'corner-bottom-left') {
            return DOMAlign.getAbsoluteOuterCornerBottomLeft(anchorEl, targetEl);
        }
        else if (alignment === 'corner-bottom-right') {
            return DOMAlign.getAbsoluteOuterCornerBottomRight(anchorEl, targetEl);
        }
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
    DOMAlign.getAbsoluteOuterCornerTopRight = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: ar.height - oy,
            l: ar.width + ox,
            r: -tr.width - ox,
            t: -tr.height + oy,
            fb: ar.top + oy <= window.innerHeight,
            fl: ar.right + ox >= 0,
            fr: ar.right + tr.width + ox <= window.innerWidth,
            ft: ar.top - tr.height + oy >= 0
        };
    };
    DOMAlign.getAbsoluteOuterCornerBottomLeft = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: -tr.height - oy,
            l: -tr.width + ox,
            r: ar.width - ox,
            t: ar.height + oy,
            fb: ar.bottom + tr.height + oy <= window.innerHeight,
            fl: ar.left - tr.width + ox >= 0,
            fr: ar.left + ox <= window.innerWidth,
            ft: ar.bottom + oy >= 0
        };
    };
    DOMAlign.getAbsoluteOuterCornerBottomRight = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: -tr.height - oy,
            l: ar.width + ox,
            r: -tr.width - ox,
            t: ar.height + oy,
            fb: ar.bottom + tr.height + oy <= window.innerHeight,
            fl: ar.right + ox >= 0,
            fr: ar.right + tr.width + ox <= window.innerWidth,
            ft: ar.bottom + oy >= 0
        };
    };
    DOMAlign.getAbsoluteOuterTopLeft = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: ar.height - oy,
            l: 0 + ox,
            r: ar.width - tr.width - ox,
            t: -tr.height + oy,
            fb: ar.top + oy <= window.innerHeight,
            fl: ar.left + ox >= 0,
            fr: ar.left + tr.width + ox <= window.innerWidth,
            ft: ar.top - tr.height + oy >= 0
        };
    };
    DOMAlign.getAbsoluteOuterTop = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        var half = (ar.width - tr.width) / 2;
        return {
            b: ar.height - oy,
            l: half + ox,
            r: half - ox,
            t: -tr.height + oy,
            fb: ar.top + oy <= window.innerHeight,
            fl: ar.left + half + ox >= 0,
            fr: ar.right + half + ox <= window.innerWidth,
            ft: ar.top - tr.height + oy >= 0
        };
    };
    DOMAlign.getAbsoluteOuterTopRight = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: ar.height - oy,
            l: ar.width - tr.width + ox,
            r: 0 - ox,
            t: -tr.height + oy,
            fb: ar.top + oy <= window.innerHeight,
            fl: ar.right - tr.width + ox >= 0,
            fr: ar.right + ox <= window.innerWidth,
            ft: ar.top - tr.height + oy >= 0
        };
    };
    DOMAlign.getAbsoluteOuterBottomLeft = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: -tr.height - oy,
            l: 0 + ox,
            r: ar.width - tr.width - ox,
            t: ar.height + oy,
            fb: ar.bottom + tr.height + oy <= window.innerHeight,
            fl: ar.left + ox >= 0,
            fr: ar.left + tr.width + ox <= window.innerWidth,
            ft: ar.bottom + oy >= 0
        };
    };
    DOMAlign.getAbsoluteOuterBottom = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        var half = (ar.width - tr.width) / 2;
        return {
            b: -tr.height - oy,
            l: half + ox,
            r: half - ox,
            t: ar.height + oy,
            fb: ar.bottom + tr.height + oy <= window.innerHeight,
            fl: ar.left + half + ox >= 0,
            fr: ar.right + half + ox <= window.innerWidth,
            ft: ar.bottom + oy >= 0
        };
    };
    DOMAlign.getAbsoluteOuterBottomRight = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: -tr.height - oy,
            l: ar.width - tr.width + ox,
            r: 0 - ox,
            t: ar.height + oy,
            fb: ar.bottom + tr.height + oy <= window.innerHeight,
            fl: ar.right - tr.width + ox >= 0,
            fr: ar.right + ox <= window.innerWidth,
            ft: ar.bottom + ox >= 0
        };
    };
    DOMAlign.getAbsoluteOuterLeftTop = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: ar.height - tr.height - oy,
            l: -tr.width + ox,
            r: ar.width - ox,
            t: 0 + oy,
            fb: ar.top + tr.height + oy <= window.innerHeight,
            fl: ar.left - tr.width + ox >= 0,
            fr: ar.left + ox <= window.innerWidth,
            ft: ar.top + oy >= 0
        };
    };
    DOMAlign.getAbsoluteOuterLeft = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        var half = (ar.height - tr.height) / 2;
        return {
            b: half - oy,
            l: -tr.width + ox,
            r: ar.width - ox,
            t: half + oy,
            fb: ar.bottom + half + oy <= window.innerHeight,
            fl: ar.left - tr.width + ox >= 0,
            fr: ar.left + ox <= window.innerWidth,
            ft: ar.top + half + oy >= 0
        };
    };
    DOMAlign.getAbsoluteOuterLeftBottom = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: 0 - oy,
            l: -tr.width + ox,
            r: ar.width - ox,
            t: ar.height - tr.height + oy,
            fb: ar.bottom + oy <= window.innerHeight,
            fl: ar.left - tr.width + ox >= 0,
            fr: ar.left + ox <= window.innerWidth,
            ft: ar.bottom - tr.height + oy >= 0
        };
    };
    DOMAlign.getAbsoluteOuterRightTop = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: ar.height - tr.height - oy,
            l: ar.width + ox,
            r: -tr.width - ox,
            t: 0 + oy,
            fb: ar.top + tr.height + oy <= window.innerHeight,
            fl: ar.right + ox >= 0,
            fr: ar.right + tr.width + ox <= window.innerWidth,
            ft: ar.top + oy >= 0
        };
    };
    DOMAlign.getAbsoluteOuterRight = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        var half = (ar.height - tr.height) / 2;
        return {
            b: half - oy,
            l: ar.width + ox,
            r: -tr.width - ox,
            t: half + oy,
            fb: ar.bottom + half + oy <= window.innerHeight,
            fl: ar.right + ox >= 0,
            fr: ar.right + tr.width + ox <= window.innerWidth,
            ft: ar.top + half + oy >= 0
        };
    };
    DOMAlign.getAbsoluteOuterRightBottom = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: 0 - oy,
            l: ar.width + ox,
            r: -tr.width - ox,
            t: ar.height - tr.height + oy,
            fb: ar.bottom + oy <= window.innerHeight,
            fl: ar.right + ox >= 0,
            fr: ar.right + tr.width + ox <= window.innerWidth,
            ft: ar.bottom - tr.height + oy >= 0
        };
    };
    DOMAlign.getAbsoluteInner = function (alignment, anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        if (alignment === 'top-left') {
            return DOMAlign.getAbsoluteInnerTopLeft(anchorEl, targetEl);
        }
        else if (alignment === 'top') {
            return DOMAlign.getAbsoluteInnerTop(anchorEl, targetEl);
        }
        else if (alignment === 'top-right') {
            return DOMAlign.getAbsoluteInnerTopRight(anchorEl, targetEl);
        }
        else if (alignment === 'bottom-left') {
            return DOMAlign.getAbsoluteInnerBottomLeft(anchorEl, targetEl);
        }
        else if (alignment === 'bottom') {
            return DOMAlign.getAbsoluteInnerBottom(anchorEl, targetEl);
        }
        else if (alignment === 'bottom-right') {
            return DOMAlign.getAbsoluteInnerBottomRight(anchorEl, targetEl);
        }
        else if (alignment === 'left') {
            return DOMAlign.getAbsoluteInnerLeft(anchorEl, targetEl);
        }
        else if (alignment === 'right') {
            return DOMAlign.getAbsoluteInnerRight(anchorEl, targetEl);
        }
    };
    DOMAlign.getAbsoluteInnerTopLeft = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: ar.height - tr.height - oy,
            l: 0 + ox,
            r: ar.width - tr.width - ox,
            t: 0 + oy,
            fb: ar.top + tr.height + oy <= window.innerHeight,
            fl: ar.left + ox >= 0,
            fr: ar.left + tr.width + ox <= window.innerWidth,
            ft: ar.top + oy >= 0
        };
    };
    DOMAlign.getAbsoluteInnerTop = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        var half = (ar.width - tr.width) / 2;
        return {
            b: ar.height - tr.height - oy,
            l: half + ox,
            r: half - ox,
            t: 0 + oy,
            fb: ar.top + tr.height + oy <= window.innerHeight,
            fl: ar.left + half + ox >= 0,
            fr: ar.right + half + ox <= window.innerWidth,
            ft: ar.top + oy >= 0
        };
    };
    DOMAlign.getAbsoluteInnerTopRight = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: ar.height - tr.height - oy,
            l: ar.width - tr.width + ox,
            r: 0 - ox,
            t: 0 + oy,
            fb: ar.top + tr.height + oy <= window.innerHeight,
            fl: ar.right - tr.width + ox >= 0,
            fr: ar.right + ox <= window.innerWidth,
            ft: ar.top + oy >= 0
        };
    };
    DOMAlign.getAbsoluteInnerBottomLeft = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: 0 - oy,
            l: 0 + ox,
            r: ar.width - tr.width - ox,
            t: ar.height - tr.height + oy,
            fb: ar.bottom + tr.height + oy <= window.innerHeight,
            fl: ar.left + ox >= 0,
            fr: ar.left + tr.width + ox <= window.innerWidth,
            ft: ar.bottom + oy >= 0
        };
    };
    DOMAlign.getAbsoluteInnerBottom = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        var half = (ar.width - tr.width) / 2;
        return {
            b: 0 - oy,
            l: half + ox,
            r: half - ox,
            t: ar.height - tr.height + oy,
            fb: ar.bottom + tr.height + oy <= window.innerHeight,
            fl: ar.left + half + ox >= 0,
            fr: ar.right + half + ox <= window.innerWidth,
            ft: ar.bottom + oy >= 0
        };
    };
    DOMAlign.getAbsoluteInnerBottomRight = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: 0 - oy,
            l: ar.width - tr.width + ox,
            r: 0 - ox,
            t: ar.height - tr.height + oy,
            fb: ar.bottom + tr.height + oy <= window.innerHeight,
            fl: ar.right - tr.width + ox >= 0,
            fr: ar.right + ox <= window.innerWidth,
            ft: ar.bottom + oy >= 0
        };
    };
    DOMAlign.getAbsoluteInnerLeft = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        var half = (ar.height - tr.height) / 2;
        return {
            b: half - oy,
            l: 0 + ox,
            r: ar.width - tr.width - ox,
            t: half + oy,
            fb: ar.bottom + half + oy <= window.innerHeight,
            fl: ar.left + ox >= 0,
            fr: ar.left + tr.width + ox <= window.innerWidth,
            ft: ar.top + half + oy >= 0
        };
    };
    DOMAlign.getAbsoluteInnerRight = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        var half = (ar.height - tr.height) / 2;
        return {
            b: half - oy,
            l: ar.width - tr.width + ox,
            r: 0 - ox,
            t: half + oy,
            fb: ar.bottom + half + oy <= window.innerHeight,
            fl: ar.right + ox >= 0,
            fr: ar.right + tr.width + ox <= window.innerWidth,
            ft: ar.top + half + oy >= 0
        };
    };
    DOMAlign.getAbsoluteAlignmentCenter = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        var halfX = (ar.width - tr.width) / 2;
        var halfY = (ar.height - tr.height) / 2;
        return {
            b: halfY - oy,
            l: halfX + ox,
            r: halfX - ox,
            t: halfY + oy,
            fb: ar.bottom + halfY + oy <= window.innerHeight,
            fl: ar.left + halfX + ox >= 0,
            fr: ar.right + halfX + ox <= window.innerWidth,
            ft: ar.top + halfY + oy >= 0
        };
    };
    DOMAlign.getFixedOuter = function (alignment, anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        if (alignment === 'top-left') {
            return DOMAlign.getFixedOuterTopLeft(anchorEl, targetEl);
        }
        else if (alignment === 'top') {
            return DOMAlign.getFixedOuterTop(anchorEl, targetEl);
        }
        else if (alignment === 'top-right') {
            return DOMAlign.getFixedOuterTopRight(anchorEl, targetEl);
        }
        else if (alignment === 'bottom-left') {
            return DOMAlign.getFixedOuterBottomLeft(anchorEl, targetEl);
        }
        else if (alignment === 'bottom') {
            return DOMAlign.getFixedOuterBottom(anchorEl, targetEl);
        }
        else if (alignment === 'bottom-right') {
            return DOMAlign.getFixedOuterBottomRight(anchorEl, targetEl);
        }
        else if (alignment === 'left-top') {
            return DOMAlign.getFixedOuterLeftTop(anchorEl, targetEl);
        }
        else if (alignment === 'left') {
            return DOMAlign.getFixedOuterLeft(anchorEl, targetEl);
        }
        else if (alignment === 'left-bottom') {
            return DOMAlign.getFixedOuterLeftBottom(anchorEl, targetEl);
        }
        else if (alignment === 'right-top') {
            return DOMAlign.getFixedOuterRightTop(anchorEl, targetEl);
        }
        else if (alignment === 'right') {
            return DOMAlign.getFixedOuterRight(anchorEl, targetEl);
        }
        else if (alignment === 'right-bottom') {
            return DOMAlign.getFixedOuterRightBottom(anchorEl, targetEl);
        }
    };
    DOMAlign.getFixedOuterCornerTopLeft = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: window.innerHeight - ar.top - oy,
            l: ar.left - tr.width + ox,
            r: window.innerWidth - ar.left - ox,
            t: ar.top - tr.height + oy,
            fb: ar.top + oy <= window.innerHeight,
            fl: ar.left - tr.width + ox >= 0,
            fr: ar.left + ox <= window.innerWidth,
            ft: ar.top - tr.height + oy >= 0
        };
    };
    DOMAlign.getFixedOuterCornerTopRight = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: window.innerHeight - ar.top - oy,
            l: ar.right + ox,
            r: window.innerWidth - ar.right - tr.width - ox,
            t: ar.top - tr.height + oy,
            fb: ar.top + oy <= window.innerHeight,
            fl: ar.right + ox >= 0,
            fr: ar.right + tr.width + ox <= window.innerWidth,
            ft: ar.top - tr.height + oy >= 0
        };
    };
    DOMAlign.getFixedOuterCornerBottomLeft = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: window.innerHeight - ar.bottom - tr.height - oy,
            l: ar.left - tr.width + ox,
            r: window.innerWidth - ar.left - ox,
            t: ar.bottom + oy,
            fb: ar.bottom + tr.height + oy <= window.innerHeight,
            fl: ar.left - tr.width + ox >= 0,
            fr: ar.left + ox <= window.innerWidth,
            ft: ar.bottom + oy >= 0
        };
    };
    DOMAlign.getFixedOuterCornerBottomRight = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: window.innerHeight - ar.bottom - tr.height - oy,
            l: ar.right + ox,
            r: window.innerWidth - ar.right - tr.width - ox,
            t: ar.bottom + oy,
            fb: ar.bottom + tr.height + oy <= window.innerHeight,
            fl: ar.right + ox >= 0,
            fr: ar.right + tr.width + ox <= window.innerWidth,
            ft: ar.bottom + oy >= 0
        };
    };
    DOMAlign.getFixedOuterTopLeft = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: window.innerHeight - ar.top - oy,
            l: ar.left + ox,
            r: window.innerWidth - ar.left - tr.width - ox,
            t: ar.top - tr.height + oy,
            fb: ar.top + oy <= window.innerHeight,
            fl: ar.left + ox >= 0,
            fr: ar.left + tr.width + ox <= window.innerWidth,
            ft: ar.top - tr.height + oy >= 0
        };
    };
    DOMAlign.getFixedOuterTop = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        var half = (ar.width - tr.width) / 2;
        return {
            b: window.innerHeight - ar.top - oy,
            l: ar.left + half + ox,
            r: window.innerWidth - ar.right + half - ox,
            t: ar.top - tr.height + oy,
            fb: ar.top + oy <= window.innerHeight,
            fl: ar.left + half + ox >= 0,
            fr: ar.right + half + ox <= window.innerWidth,
            ft: ar.top - tr.height + oy >= 0
        };
    };
    DOMAlign.getFixedOuterTopRight = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: window.innerHeight - ar.top - oy,
            l: ar.right - tr.width + ox,
            r: window.innerWidth - ar.right - ox,
            t: ar.top - tr.height + oy,
            fb: ar.top + oy <= window.innerHeight,
            fl: ar.right - tr.width + ox >= 0,
            fr: ar.right + ox <= window.innerWidth,
            ft: ar.top - tr.height + oy >= 0
        };
    };
    DOMAlign.getFixedOuterBottomLeft = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: window.innerHeight - ar.bottom - tr.height - oy,
            l: ar.left + ox,
            r: window.innerWidth - ar.left - tr.width - ox,
            t: ar.bottom + oy,
            fb: ar.bottom + tr.height + oy <= window.innerHeight,
            fl: ar.left + ox >= 0,
            fr: ar.left + tr.width + oy <= window.innerWidth,
            ft: ar.bottom + ox >= 0
        };
    };
    DOMAlign.getFixedOuterBottom = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        var half = (ar.width - tr.width) / 2;
        return {
            b: window.innerHeight - ar.bottom - tr.height - oy,
            l: ar.left + half + ox,
            r: window.innerWidth - ar.right + half - ox,
            t: ar.bottom + oy,
            fb: ar.bottom + tr.height + oy <= window.innerHeight,
            fl: ar.left + half + ox >= 0,
            fr: ar.right + half + ox <= window.innerWidth,
            ft: ar.bottom + oy >= 0
        };
    };
    DOMAlign.getFixedOuterBottomRight = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: window.innerHeight - ar.bottom - tr.height - oy,
            l: ar.right - tr.width + ox,
            r: window.innerWidth - ar.right - ox,
            t: ar.bottom + oy,
            fb: ar.bottom + tr.height + oy <= window.innerHeight,
            fl: ar.right - tr.width + ox >= 0,
            fr: ar.right + ox <= window.innerWidth,
            ft: ar.bottom + oy >= 0
        };
    };
    DOMAlign.getFixedOuterLeftTop = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: window.innerHeight - ar.top - tr.height - oy,
            l: ar.left - tr.width + ox,
            r: window.innerWidth - ar.left - ox,
            t: ar.top + oy,
            fb: ar.top + tr.height + oy <= window.innerHeight,
            fl: ar.left - tr.width + ox >= 0,
            fr: ar.left + ox <= window.innerWidth,
            ft: ar.top + oy >= 0
        };
    };
    DOMAlign.getFixedOuterLeft = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        var half = (ar.height - tr.height) / 2;
        return {
            b: window.innerHeight - ar.bottom + half - oy,
            l: ar.left - tr.width + ox,
            r: window.innerWidth - ar.left - ox,
            t: ar.top + half + oy,
            fb: ar.bottom + half + oy <= window.innerHeight,
            fl: ar.left - tr.width + ox >= 0,
            fr: ar.left + ox <= window.innerWidth,
            ft: ar.top + half + oy >= 0
        };
    };
    DOMAlign.getFixedOuterLeftBottom = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: window.innerHeight - ar.bottom - oy,
            l: ar.left - tr.width + ox,
            r: window.innerWidth - ar.left - ox,
            t: ar.bottom - tr.height + oy,
            fb: ar.bottom + oy <= window.innerHeight,
            fl: ar.left - tr.width + ox >= 0,
            fr: ar.left + ox <= window.innerWidth,
            ft: ar.bottom - tr.height + oy >= 0
        };
    };
    DOMAlign.getFixedOuterRightTop = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: window.innerHeight - ar.top - tr.height - oy,
            l: ar.right + ox,
            r: window.innerWidth - ar.right - tr.width - ox,
            t: ar.top + oy,
            fb: ar.top + tr.height + oy <= window.innerHeight,
            fl: ar.right + ox >= 0,
            fr: ar.right + tr.width + ox <= window.innerWidth,
            ft: ar.top + oy >= 0
        };
    };
    DOMAlign.getFixedOuterRight = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        var half = (ar.height - tr.height) / 2;
        return {
            b: window.innerHeight - ar.bottom + half - oy,
            l: ar.right + ox,
            r: window.innerWidth - ar.right - tr.width - ox,
            t: ar.top + half + oy,
            fb: ar.bottom + half + oy <= window.innerHeight,
            fl: ar.right + ox >= 0,
            fr: ar.right + tr.width + ox <= window.innerWidth,
            ft: ar.top + half + oy >= 0
        };
    };
    DOMAlign.getFixedOuterRightBottom = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: window.innerHeight - ar.top - tr.height - oy,
            l: ar.right + ox,
            r: window.innerWidth - ar.right - tr.width - ox,
            t: ar.top + oy,
            fb: ar.bottom + oy <= window.innerHeight,
            fl: ar.right + ox >= 0,
            fr: ar.right + tr.width + ox <= window.innerWidth,
            ft: ar.bottom - tr.height + oy >= 0
        };
    };
    DOMAlign.getFixedInner = function (alignment, anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        if (alignment === 'top-left') {
            return DOMAlign.getFixedInnerTopLeft(anchorEl, targetEl);
        }
        else if (alignment === 'top') {
            return DOMAlign.getFixedInnerTop(anchorEl, targetEl);
        }
        else if (alignment === 'top-right') {
            return DOMAlign.getFixedInnerTopRight(anchorEl, targetEl);
        }
        else if (alignment === 'bottom-left') {
            return DOMAlign.getFixedInnerBottomLeft(anchorEl, targetEl);
        }
        else if (alignment === 'bottom') {
            return DOMAlign.getFixedInnerBottom(anchorEl, targetEl);
        }
        else if (alignment === 'bottom-right') {
            return DOMAlign.getFixedInnerBottomRight(anchorEl, targetEl);
        }
        else if (alignment === 'left') {
            return DOMAlign.getFixedInnerLeft(anchorEl, targetEl);
        }
        else if (alignment === 'right') {
            return DOMAlign.getFixedInnerRight(anchorEl, targetEl);
        }
    };
    DOMAlign.getFixedInnerTopLeft = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: window.innerHeight - ar.top - tr.height - oy,
            l: ar.left + ox,
            r: window.innerWidth - ar.left - tr.width - ox,
            t: ar.top + oy,
            fb: ar.top + tr.height + oy <= window.innerHeight,
            fl: ar.left + ox >= 0,
            fr: ar.left + tr.width + ox <= window.innerWidth,
            ft: ar.top + ox >= 0
        };
    };
    DOMAlign.getFixedInnerTop = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        var half = (ar.width - tr.width) / 2;
        return {
            b: window.innerHeight - ar.top - tr.height - oy,
            l: ar.left + half + ox,
            r: window.innerWidth - ar.right + half - ox,
            t: ar.top + oy,
            fb: ar.top + tr.height + oy <= window.innerHeight,
            fl: ar.left + half + ox >= 0,
            fr: ar.right + half + ox <= window.innerWidth,
            ft: ar.top + oy >= 0
        };
    };
    DOMAlign.getFixedInnerTopRight = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: window.innerHeight - ar.top - tr.height - oy,
            l: ar.right - tr.width + ox,
            r: window.innerWidth - ar.right - ox,
            t: ar.top + oy,
            fb: ar.top + tr.height + oy <= window.innerHeight,
            fl: ar.right - tr.width + ox >= 0,
            fr: ar.right + ox <= window.innerWidth,
            ft: ar.top + oy >= 0
        };
    };
    DOMAlign.getFixedInnerBottomLeft = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: window.innerHeight - ar.bottom - tr.height - oy,
            l: ar.left + ox,
            r: window.innerWidth - ar.left - tr.width - ox,
            t: ar.bottom - tr.height + oy,
            fb: ar.bottom + oy <= window.innerHeight,
            fl: ar.left + ox >= 0,
            fr: ar.left + tr.width + ox <= window.innerWidth,
            ft: ar.bottom - tr.height + oy >= 0
        };
    };
    DOMAlign.getFixedInnerBottom = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        var half = (ar.width - tr.width) / 2;
        return {
            b: window.innerHeight - ar.bottom - tr.height - oy,
            l: ar.left + half + ox,
            r: window.innerWidth - ar.right + half - ox,
            t: ar.bottom - tr.height + oy,
            fb: ar.bottom + oy <= window.innerHeight,
            fl: ar.left + half + ox >= 0,
            fr: ar.right + half + ox <= window.innerWidth,
            ft: ar.bottom - tr.height + oy >= 0
        };
    };
    DOMAlign.getFixedInnerBottomRight = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        return {
            b: window.innerHeight - ar.bottom - tr.height - oy,
            l: ar.right - tr.width + ox,
            r: window.innerWidth - ar.right - ox,
            t: ar.bottom - tr.height + oy,
            fb: ar.bottom + oy <= window.innerHeight,
            fl: ar.right - tr.width + ox >= 0,
            fr: ar.right + ox <= window.innerWidth,
            ft: ar.bottom - tr.height + oy >= 0
        };
    };
    DOMAlign.getFixedInnerLeft = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        var half = (ar.height - tr.height) / 2;
        return {
            b: window.innerHeight - ar.bottom + half - oy,
            l: ar.left - tr.width + ox,
            r: window.innerWidth - ar.left - tr.width - ox,
            t: ar.top + half + oy,
            fb: ar.bottom + half + oy <= window.innerHeight,
            fl: ar.left - tr.width + ox >= 0,
            fr: ar.left + ox <= window.innerWidth,
            ft: ar.top + half + oy >= 0
        };
    };
    DOMAlign.getFixedInnerRight = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        var half = (ar.height - tr.height) / 2;
        return {
            b: window.innerHeight - ar.bottom + half - oy,
            l: ar.right + ox,
            r: window.innerWidth - ar.right - tr.width - ox,
            t: ar.top + half + oy,
            fb: ar.bottom + half + oy <= window.innerHeight,
            fl: ar.right - tr.width + ox >= 0,
            fr: ar.right + ox <= window.innerWidth,
            ft: ar.top + half + oy >= 0
        };
    };
    DOMAlign.getFixedAlignmentCenter = function (anchorEl, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var ar = anchorEl.getBoundingClientRect();
        var tr = targetEl.getBoundingClientRect();
        var halfX = (ar.width - tr.width) / 2;
        var halfY = (ar.height - tr.height) / 2;
        return {
            b: window.innerHeight - ar.bottom + halfY - oy,
            l: ar.left + halfX + ox,
            r: window.innerWidth - ar.right + halfX - ox,
            t: ar.top + halfY + oy,
            fb: ar.bottom + halfY + oy <= window.innerHeight,
            fl: ar.left + halfX + ox >= 0,
            fr: ar.right + halfX + ox <= window.innerWidth,
            ft: ar.top + halfY + oy >= 0
        };
    };
    DOMAlign.getFixedPointTopLeft = function (x, y, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var tr = targetEl.getBoundingClientRect();
        return {
            b: window.innerHeight - y - oy,
            l: x - tr.width + ox,
            r: window.innerWidth - x - ox,
            t: y - tr.height + oy,
            fb: y + oy <= window.innerHeight,
            fl: x - tr.width + ox >= 0,
            fr: x + ox <= window.innerWidth,
            ft: y - tr.height + oy >= 0
        };
    };
    DOMAlign.getFixedPointTop = function (x, y, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var tr = targetEl.getBoundingClientRect();
        var half = tr.width / 2;
        return {
            b: window.innerHeight - y - oy,
            l: x - half + ox,
            r: window.innerWidth - x - half - ox,
            t: y - tr.height + oy,
            fb: y + oy <= window.innerHeight,
            fl: x - half + ox >= 0,
            fr: x + half + ox <= window.innerWidth,
            ft: y - tr.height + oy >= 0
        };
    };
    DOMAlign.getFixedPointTopRight = function (x, y, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var tr = targetEl.getBoundingClientRect();
        return {
            b: window.innerHeight - y - oy,
            l: x + ox,
            r: window.innerWidth - x - tr.width - ox,
            t: y - tr.height + oy,
            fb: y + oy <= window.innerHeight,
            fl: x + ox >= 0,
            fr: x + tr.width + ox <= window.innerWidth,
            ft: y - tr.height + oy >= 0
        };
    };
    DOMAlign.getFixedPointBottomLeft = function (x, y, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var tr = targetEl.getBoundingClientRect();
        return {
            b: window.innerHeight - y - tr.height - oy,
            l: x - tr.width + ox,
            r: window.innerWidth - x - ox,
            t: y + oy,
            fb: y + tr.height + oy <= window.innerHeight,
            fl: x - tr.width + ox >= 0,
            fr: x + ox <= window.innerWidth,
            ft: y + oy >= 0
        };
    };
    DOMAlign.getFixedPointBottom = function (x, y, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var tr = targetEl.getBoundingClientRect();
        var half = tr.width / 2;
        return {
            b: window.innerHeight - y - tr.height - oy,
            l: x - half + ox,
            r: window.innerWidth - x - half - ox,
            t: y + oy,
            fb: y + tr.height + oy <= window.innerHeight,
            fl: x - half + ox >= 0,
            fr: x + half + ox <= window.innerWidth,
            ft: y + oy >= 0
        };
    };
    DOMAlign.getFixedPointBottomRight = function (x, y, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var tr = targetEl.getBoundingClientRect();
        return {
            b: window.innerHeight - y - tr.height - oy,
            l: x + ox,
            r: window.innerWidth - x - tr.width - ox,
            t: y + oy,
            fb: y + tr.height + oy <= window.innerHeight,
            fl: x + ox >= 0,
            fr: x + tr.width + ox <= window.innerWidth,
            ft: y + oy >= 0
        };
    };
    DOMAlign.getFixedPointLeft = function (x, y, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var tr = targetEl.getBoundingClientRect();
        var half = tr.height / 2;
        return {
            b: window.innerHeight - y - half - oy,
            l: x - tr.width + ox,
            r: window.innerWidth - x - ox,
            t: y - half + oy,
            fb: y + half + oy <= window.innerHeight,
            fl: x - tr.width + ox >= 0,
            fr: x + ox <= window.innerWidth,
            ft: y - half + oy >= 0
        };
    };
    DOMAlign.getFixedPointRight = function (x, y, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var tr = targetEl.getBoundingClientRect();
        var half = tr.height / 2;
        return {
            b: window.innerHeight - y - half - oy,
            l: x + ox,
            r: window.innerWidth - x - tr.width - ox,
            t: y - half + oy,
            fb: y + half + oy <= window.innerHeight,
            fl: x + ox >= 0,
            fr: x + tr.width + ox <= window.innerWidth,
            ft: y - half + oy >= 0
        };
    };
    DOMAlign.getFixedPointCenter = function (x, y, targetEl, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var tr = targetEl.getBoundingClientRect();
        var halfX = tr.width / 2;
        var halfY = tr.height / 2;
        return {
            b: window.innerHeight - y - halfY + oy,
            l: x - halfX + ox,
            r: window.innerWidth - x - halfY - ox,
            t: y - halfY + oy,
            fb: y + halfY + oy <= window.innerHeight,
            fl: x - halfX + ox >= 0,
            fr: x + halfX + ox <= window.innerWidth,
            ft: y - halfY + oy >= 0
        };
    };
    return DOMAlign;
}());
exports.DOMAlign = DOMAlign;
//# sourceMappingURL=DOMAlign.js.map