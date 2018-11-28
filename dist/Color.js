"use strict";
exports.__esModule = true;
var anvil_1 = require("./anvil");
var ConvertColor = (function () {
    function ConvertColor() {
    }
    ConvertColor.RGBToHEX = function (rgb) {
        rgb[0] = anvil_1.Num.cycle(rgb[0], 1);
        rgb[1] = anvil_1.Num.cycle(rgb[1], 1);
        rgb[2] = anvil_1.Num.cycle(rgb[2], 1);
        rgb = rgb.map(function (n) { return n * 255; });
        return "#" + rgb[0].toString(16) + rgb[1].toString(16) + rgb[2].toString(16);
    };
    ConvertColor.HEXToRGB = function (hex) {
        var rgb = [0, 0, 0];
        var r, g, b;
        if (hex.length === 7) {
            r = hex.substr(1, 2);
            g = hex.substr(3, 2);
            b = hex.substr(5, 2);
        }
        else if (hex.length === 4) {
            r = hex.substr(1, 1);
            g = hex.substr(2, 1);
            b = hex.substr(3, 1);
            r = r.concat(r);
            g = g.concat(g);
            b = b.concat(b);
        }
        rgb[0] = parseInt(r, 16);
        rgb[1] = parseInt(g, 16);
        rgb[2] = parseInt(b, 16);
        return rgb.map(function (n) { return n / 255; });
    };
    ConvertColor.RGBToCMYK = function (rgb) {
        rgb[0] = anvil_1.Num.cycle(rgb[0], 1);
        rgb[1] = anvil_1.Num.cycle(rgb[1], 1);
        rgb[2] = anvil_1.Num.cycle(rgb[2], 1);
        var cmyk = [0, 0, 0, 0];
        cmyk[3] = 1 - Math.max.apply(this, rgb);
        cmyk[0] = (1 - rgb[0] - cmyk[3]) / (1 - cmyk[3]);
        cmyk[1] = (1 - rgb[1] - cmyk[3]) / (1 - cmyk[3]);
        cmyk[2] = (1 - rgb[2] - cmyk[3]) / (1 - cmyk[3]);
        return cmyk;
    };
    ConvertColor.CMYKToRGB = function (cmyk) {
        cmyk[0] = anvil_1.Num.cycle(cmyk[0], 1);
        cmyk[1] = anvil_1.Num.cycle(cmyk[1], 1);
        cmyk[2] = anvil_1.Num.cycle(cmyk[2], 1);
        cmyk[3] = anvil_1.Num.cycle(cmyk[3], 1);
        var rgb = [0, 0, 0];
        rgb[0] = (1 - cmyk[0]) * (1 - cmyk[3]);
        rgb[1] = (1 - cmyk[1]) * (1 - cmyk[3]);
        rgb[2] = (1 - cmyk[2]) * (1 - cmyk[3]);
        return rgb;
    };
    ConvertColor.RGBToHSL = function (rgb) {
        rgb[0] = anvil_1.Num.cycle(rgb[0], 1);
        rgb[1] = anvil_1.Num.cycle(rgb[1], 1);
        rgb[2] = anvil_1.Num.cycle(rgb[2], 1);
        var cMax = Math.max.apply(this, rgb);
        var cMin = Math.min.apply(this, rgb);
        var delta = cMax - cMin;
        var hsl = [0, 0, 0];
        if (delta === 0) {
            hsl[0] = 0;
        }
        else if (cMax === rgb[0]) {
            hsl[0] = 60 * (((rgb[1] - rgb[2]) / delta) % 6);
        }
        else if (cMax === rgb[1]) {
            hsl[0] = 60 * (((rgb[2] - rgb[0]) / delta) + 2);
        }
        else if (cMax === rgb[2]) {
            hsl[0] = 60 * (((rgb[0] - rgb[1]) / delta) + 4);
        }
        hsl[2] = (cMax + cMin) / 2;
        hsl[1] = delta === 0 ? 0 : delta / (1 - Math.abs(2 * hsl[2] - 1));
        return hsl;
    };
    ConvertColor.HSLToRGB = function (hsl) {
        hsl[0] = anvil_1.Num.cycle(hsl[0], 359);
        hsl[1] = anvil_1.Num.cycle(hsl[1], 1);
        hsl[2] = anvil_1.Num.cycle(hsl[2], 1);
        var rgb = [0, 0, 0];
        var h = hsl[0] / 60;
        var c = (1 - Math.abs(2 * hsl[2] - 1)) * hsl[1];
        var x = c * (1 - Math.abs(h % 2 - 1));
        if (h >= 0 && h <= 1) {
            rgb = [c, x, 0];
        }
        else if (h >= 1 && h <= 2) {
            rgb = [x, c, 0];
        }
        else if (h >= 2 && h <= 3) {
            rgb = [0, c, x];
        }
        else if (h >= 3 && h <= 4) {
            rgb = [0, x, c];
        }
        else if (h >= 4 && h <= 5) {
            rgb = [x, 0, c];
        }
        else if (h >= 5 && h <= 6) {
            rgb = [c, 0, x];
        }
        var m = hsl[2] - (0.5 * c);
        return rgb.map(function (v) { return v + m; });
    };
    ConvertColor.RGBToHSV = function (rgb) {
        rgb[0] = anvil_1.Num.cycle(rgb[0], 1);
        rgb[1] = anvil_1.Num.cycle(rgb[1], 1);
        rgb[2] = anvil_1.Num.cycle(rgb[2], 1);
        var cMax = Math.max.apply(this, rgb);
        var cMin = Math.min.apply(this, rgb);
        var delta = cMax - cMin;
        var hsv = [0, 0, 0];
        if (delta === 0) {
            hsv[0] = 0;
        }
        else if (cMax === rgb[0]) {
            hsv[0] = 60 * (((rgb[1] - rgb[2]) / delta) % 6);
        }
        else if (cMax === rgb[1]) {
            hsv[0] = 60 * (((rgb[2] - rgb[0]) / delta) + 2);
        }
        else if (cMax === rgb[2]) {
            hsv[0] = 60 * (((rgb[0] - rgb[1]) / delta) + 4);
        }
        hsv[1] = cMax === 0 ? 0 : delta / cMax;
        hsv[2] = cMax;
        return hsv;
    };
    ConvertColor.HSVToRGB = function (hsv) {
        hsv[0] = anvil_1.Num.cycle(hsv[0], 359);
        hsv[1] = anvil_1.Num.cycle(hsv[1], 1);
        hsv[2] = anvil_1.Num.cycle(hsv[2], 1);
        var c = hsv[2] * hsv[1];
        var x = c * (1 - Math.abs((hsv[0] / 60) % 2 - 1));
        var rgb;
        if (hsv[0] >= 0 &&
            hsv[0] <= 60) {
            rgb = [c, x, 0];
        }
        else if (hsv[0] >= 60 &&
            hsv[0] <= 120) {
            rgb = [x, c, 0];
        }
        else if (hsv[0] >= 120 &&
            hsv[0] <= 180) {
            rgb = [0, c, x];
        }
        else if (hsv[0] >= 180 &&
            hsv[0] <= 240) {
            rgb = [0, x, c];
        }
        else if (hsv[0] >= 240 &&
            hsv[0] <= 300) {
            rgb = [x, 0, c];
        }
        else if (hsv[0] >= 300 &&
            hsv[0] <= 360) {
            rgb = [c, 0, x];
        }
        var m = hsv[2] - c;
        return rgb.map(function (v) { return v + m; });
    };
    return ConvertColor;
}());
exports.ConvertColor = ConvertColor;
var Color = (function () {
    function Color(input) {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 1;
        if (typeof input !== 'undefined') {
            this.set(input);
        }
        return this;
    }
    Color.prototype.set = function (input) {
        if (Color.isColor(input)) {
            this.equals(input);
        }
        else if (typeof input === 'string') {
            this._setFromString(input);
        }
        else if (typeof input === 'object') {
            this._setFromObject(input);
        }
        else {
            this.r = 0;
            this.g = 0;
            this.b = 0;
            this.a = 1;
        }
        return this;
    };
    Color.prototype._setFromString = function (input) {
        if (typeof Color._name[input] !== 'undefined') {
            this._setFromArray('rgba', Color._name[input]);
        }
        else if (typeof anvil_1.Util.match(input, Color._regex.hex) === 'string') {
            var rgb = ConvertColor.HEXToRGB(input);
            this._setFromArray('rgb', rgb);
        }
        else if (typeof anvil_1.Util.match(input, Color._regex.rgb) === 'string') {
            var rgb = input.match(/(\d+)/g).map(function (s) { return parseFloat(s); });
            this._setFromArray('rgb', rgb);
        }
        else if (typeof anvil_1.Util.match(input, Color._regex.rgba) === 'string') {
            var rgba = input.match(/(\d+)/g).map(function (s) { return parseFloat(s); });
            this._setFromArray('rgba', rgba);
        }
        else if (typeof anvil_1.Util.match(input, Color._regex.hsl) === 'string') {
            var hsl = input.match(/(\d+)/g).map(function (s) { return parseFloat(s); });
            var rgb = ConvertColor.HSLToRGB(hsl);
            this._setFromArray('rgb', rgb);
        }
        else if (typeof anvil_1.Util.match(input, Color._regex.hsla) === 'string') {
            var hsla = input.match(/(\d+)/g).map(function (s) { return parseFloat(s); });
            var rgba = ConvertColor.HSLToRGB(hsla);
            rgba.push(hsla[3]);
            this._setFromArray('rgba', rgba);
        }
        return this;
    };
    Color.prototype._setFromArray = function (format, array) {
        if (format === void 0) { format = 'rgb'; }
        var rgb;
        var alpha;
        if (format === 'hsl') {
            var hsl = [array[0], array[1], array[2]];
            rgb = ConvertColor.HSLToRGB(hsl);
            if (typeof array[3] === 'number') {
                alpha = array[3];
            }
        }
        else if (format === 'hsb' || format === 'hsv') {
            var hsv = [array[0], array[1], array[2]];
            rgb = ConvertColor.HSVToRGB(hsv);
            if (typeof array[3] === 'number') {
                alpha = array[3];
            }
        }
        else if (format === 'cmyk') {
            var cmyk = [array[0], array[1], array[2], array[3]];
            rgb = ConvertColor.CMYKToRGB(cmyk);
            if (typeof array[4] === 'number') {
                alpha = array[4];
            }
        }
        else {
            rgb = [array[0], array[1], array[2]];
            if (typeof array[3] === 'number') {
                alpha = array[3];
            }
        }
        this.r = rgb[0];
        this.g = rgb[1];
        this.b = rgb[2];
        if (typeof alpha === 'number') {
            this.a = alpha;
        }
        return this;
    };
    Color.prototype._setFromObject = function (input) {
        var rgb;
        if (typeof input.hex === 'string') {
            rgb = ConvertColor.HEXToRGB(input.hex);
        }
        else if (typeof input.red === 'number' &&
            typeof input.green === 'number' &&
            typeof input.blue === 'number') {
            rgb = [input.red, input.green, input.blue];
        }
        else if (typeof input.hue === 'number' &&
            typeof input.saturation === 'number') {
            if (typeof input.lightness === 'number') {
                rgb = ConvertColor.HSLToRGB([input.hue, input.saturation, input.lightness]);
            }
        }
        else if (typeof input.brightness === 'number' ||
            typeof input.value === 'number') {
            var b = input.brightness || input.value;
            rgb = ConvertColor.HSVToRGB([input.hue, input.saturation, b]);
        }
        else if (typeof input.cyan === 'number' &&
            typeof input.magenta === 'number' &&
            typeof input.yellow === 'number' &&
            typeof input.black === 'number') {
            var cmyk = [input.cyan, input.magenta, input.yellow, input.black];
            rgb = ConvertColor.CMYKToRGB(cmyk);
        }
        else if (typeof input.rgb === 'object' &&
            input.rgb.constructor === Array) {
            rgb = input.rgb;
            if (typeof input.rgb[3] === 'number') {
                input.alpha = input.rgb[3];
            }
        }
        else if (typeof input.hsl === 'object' &&
            input.hsl.constructor === Array) {
            rgb = ConvertColor.HSLToRGB(input.hsl);
            if (typeof input.hsl[3] === 'number') {
                input.alpha = input.hsl[3];
            }
        }
        else if (typeof input.hsv === 'object' &&
            input.hsv.constructor === Array) {
            rgb = ConvertColor.HSLToRGB(input.hsv);
            if (typeof input.hsv[3] === 'number') {
                input.alpha = input.hsv[3];
            }
        }
        else if (typeof input.cmyk === 'object' &&
            input.cmyk.constructor === Array) {
            rgb = ConvertColor.CMYKToRGB(input.cmyk);
            if (typeof input.cmyk[4] === 'number') {
                input.alpha = input.cmyk[4];
            }
        }
        else {
            rgb = [0, 0, 0];
        }
        this._setFromArray('rgb', rgb);
        if (typeof input.alpha === 'number') {
            this.a = input.alpha;
        }
        return this;
    };
    Color.prototype.getArray = function (format, alpha) {
        if (alpha === void 0) { alpha = false; }
        var result = [this.r, this.g, this.b];
        if (format === 'hsl') {
            result = ConvertColor.RGBToHSL(result);
        }
        else if (format === 'hsb' || format === 'hsv') {
            result = ConvertColor.RGBToHSV(result);
        }
        else if (format === 'cmyk') {
            result = ConvertColor.RGBToCMYK(result);
        }
        if (alpha === true) {
            result.push(this.a);
        }
        return result;
    };
    Color.prototype.getString = function (format, alpha) {
        var rgb = [this.r, this.g, this.b];
        var hsl = ConvertColor.RGBToHSL(rgb);
        var hex = ConvertColor.RGBToHEX(rgb);
        rgb = rgb.map(function (v) { return Math.round(v * 255); });
        hsl[1] = Math.round(hsl[1] * 100);
        hsl[2] = Math.round(hsl[2] * 100);
        if (typeof alpha === 'undefined') {
            alpha = this.a;
        }
        var strings = {
            hex: hex,
            rgb: "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")",
            rgba: "rgba(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ", " + alpha + ")",
            hsl: "hsl(" + hsl[0] + ", " + hsl[1] + "%, " + hsl[1] + "%)",
            hsla: "hsla(" + hsl[0] + ", " + hsl[1] + "%, " + hsl[1] + "%, " + alpha + ")"
        };
        if (typeof format === 'string' &&
            typeof strings[format] != 'undefined') {
            return strings[format];
        }
        else {
            return strings.rgba;
        }
    };
    Color.prototype.equals = function (color) {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        this.a = color.a;
        return this;
    };
    Color.prototype.clone = function () {
        return Color.equals(this);
    };
    Color.prototype.lerp = function (target, t) {
        this.r = anvil_1.Num.lerp(this.r, target.r, t);
        this.g = anvil_1.Num.lerp(this.g, target.g, t);
        this.b = anvil_1.Num.lerp(this.b, target.b, t);
        this.a = anvil_1.Num.lerp(this.a, target.a, t);
        return this;
    };
    Color.prototype.red = function (red) {
        if (typeof red === 'number') {
            this.r = red;
        }
        return this.r;
    };
    Color.prototype.green = function (green) {
        if (typeof green === 'number') {
            this.g = green;
        }
        return this.g;
    };
    Color.prototype.blue = function (blue) {
        if (typeof blue === 'number') {
            this.b = blue;
        }
        return this.b;
    };
    Color.prototype.cyan = function (cyan) {
        var cmyk = ConvertColor.RGBToCMYK([this.r, this.g, this.b]);
        if (typeof cyan === 'number') {
            cmyk[0] = cyan;
            var rgb = ConvertColor.CMYKToRGB(cmyk);
            this.r = rgb[0];
            this.g = rgb[1];
            this.b = rgb[2];
        }
        return cmyk[0];
    };
    Color.prototype.magenta = function (magenta) {
        var cmyk = ConvertColor.RGBToCMYK([this.r, this.g, this.b]);
        if (typeof magenta === 'number') {
            cmyk[1] = magenta;
            var rgb = ConvertColor.CMYKToRGB(cmyk);
            this.r = rgb[0];
            this.g = rgb[1];
            this.b = rgb[2];
        }
        return cmyk[1];
    };
    Color.prototype.yellow = function (yellow) {
        var cmyk = ConvertColor.RGBToCMYK([this.r, this.g, this.b]);
        if (typeof yellow === 'number') {
            cmyk[2] = yellow;
            var rgb = ConvertColor.CMYKToRGB(cmyk);
            this.r = rgb[0];
            this.g = rgb[1];
            this.b = rgb[2];
        }
        return cmyk[2];
    };
    Color.prototype.alpha = function (alpha) {
        if (typeof alpha === 'number') {
            this.a = anvil_1.Num.cycle(alpha, 1);
        }
        return this.a;
    };
    Color.prototype.hue = function (degrees) {
        var hsl = ConvertColor.RGBToHSL([this.r, this.g, this.b]);
        if (typeof degrees === 'number') {
            hsl[0] = Math.abs(Math.round(anvil_1.Num.cycle(degrees, 360)));
            var rgb = ConvertColor.HSLToRGB(hsl);
            this.r = rgb[0];
            this.g = rgb[1];
            this.b = rgb[2];
        }
        return Math.round(hsl[0]);
    };
    Color.prototype.hueRotate = function (increment) {
        this.hue(this.hue() + increment);
        return this;
    };
    Color.prototype.saturation = function (saturation) {
        var hsl = ConvertColor.RGBToHSL([this.r, this.g, this.b]);
        if (typeof saturation === 'number') {
            hsl[1] = anvil_1.Num.cycle(saturation, 1);
            var rgb = ConvertColor.HSLToRGB(hsl);
            this.r = rgb[0];
            this.g = rgb[1];
            this.b = rgb[2];
        }
        return hsl[1];
    };
    Color.prototype.value = function (value) {
        var hsv = ConvertColor.RGBToHSV([this.r, this.g, this.b]);
        if (typeof value === 'number') {
            value = anvil_1.Num.cycle(value, 1);
            hsv[2] = value;
            var rgb = ConvertColor.HSVToRGB(hsv);
            this.r = rgb[0];
            this.g = rgb[1];
            this.b = rgb[2];
        }
        return hsv[2];
    };
    Color.prototype.brightness = function () {
        return Math.sqrt(0.299 * this.r * this.r + 0.587 * this.g * this.g + 0.114 * this.b * this.b);
    };
    Color.prototype.invert = function () {
        this.r = 1 - this.r;
        this.g = 1 - this.g;
        this.b = 1 - this.b;
        return this;
    };
    Color.isColor = function (color) {
        return color instanceof Color ? true : false;
    };
    Color.equals = function (color) {
        return new Color(color);
    };
    Color.triadic = function (color) {
        var colora = color.clone().hueRotate(-120);
        var colorc = color.clone().hueRotate(120);
        return [colora, color, colorc];
    };
    Color.complement = function (color) {
        return color.clone().hueRotate(180);
    };
    Color.splitComplements = function (color) {
        var colora = color.clone().hueRotate(-150);
        var colorc = color.clone().hueRotate(150);
        return [colora, color, colorc];
    };
    Color.analogous = function (color) {
        var colora = color.clone().hueRotate(-30);
        var colorc = color.clone().hueRotate(30);
        return [colora, color, colorc];
    };
    Color.lerp = function (color1, color2, t) {
        var color = Color.equals(color2);
        color.r = anvil_1.Num.lerp(color.r, color2.r, t);
        color.g = anvil_1.Num.lerp(color.g, color2.g, t);
        color.b = anvil_1.Num.lerp(color.b, color2.b, t);
        color.a = anvil_1.Num.lerp(color.a, color2.a, t);
        return color;
    };
    Color._name = {
        azure: [0, 0.5, 1, 1],
        black: [0, 0, 0, 1],
        blue: [0, 0, 1, 1],
        brown: [0.6, 0.3, 0, 1],
        clear: [0, 0, 0, 0],
        cyan: [0, 1, 1, 1],
        gray: [0.5, 0.5, 0.5, 1],
        green: [0, 1, 0, 1],
        magenta: [1, 0, 1, 1],
        orange: [1, 0.5, 0, 1],
        pink: [1, 0.8, 0.86, 1],
        purple: [0.5, 0, 0.5, 1],
        red: [1, 0, 0, 1],
        salmon: [0.98, 0.5, 0.45, 1],
        transparent: [0, 0, 0, 0],
        ultramarine: [0.25, 0, 1, 1],
        violet: [0.5, 0, 1, 1],
        white: [1, 1, 1, 1],
        yellow: [1, 1, 0, 1]
    };
    Color._regex = {
        hex: /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/g,
        hsl: /^(hsl|HSL)\((360|3[0-5][0-9]|2[0-9][0-9]|1[0-9][0-9]|[1-9]?[0-9]),\s?(100|[1-9]?[0-9]),\s?(100|[1-9]?[0-9])\)$/g,
        hsla: /^(hsl|HSL)\((360|3[0-5][0-9]|2[0-9][0-9]|1[0-9][0-9]|[1-9]?[0-9]),\s?(100|[1-9]?[0-9]),\s?(100|[1-9]?[0-9]),\s?(1|0|0\.([0-9]?)+[1-9])\)$/g,
        rgb: /^(rgb|RGB)\((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9]),\s?(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9]),\s?(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\)$/g,
        rgba: /^(rgba|RGBA)\((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9]),\s?(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9]),\s?(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9]),\s?(1|0|0\.([0-9]?){1,5}[1-9])\)$/g
    };
    return Color;
}());
exports.Color = Color;
//# sourceMappingURL=Color.js.map