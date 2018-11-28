import {
  Num,
  Util,
} from './Anvil';

/*
https://gist.github.com/felipesabino/5066336
http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
http://www.tannerhelland.com/3643/grayscale-image-algorithm-vb6/
http://alienryderflex.com/hsp.html
http://www.rapidtables.com/convert/color/hsl-to-rgb.htm
alpha      = 1
black      = 100
blue       = 255
cyan       = 100
green      = 255
lightness  = 100
magenta    = 100
red        = 255
saturation = 100
value      = 100
yellow     = 100
*/

export class ConvertColor {

  // RGB 1, 1, 1
  public static RGBToHEX(rgb: number[]): string {
    rgb[0] = Num.cycle(rgb[0], 1)
    rgb[1] = Num.cycle(rgb[1], 1)
    rgb[2] = Num.cycle(rgb[2], 1)
    rgb = rgb.map((n) => { return n * 255 })
    return `#${rgb[0].toString(16)}${rgb[1].toString(16)}${rgb[2].toString(16)}`
  }

  // RGB 1, 1, 1
  public static HEXToRGB(hex: string): number[] {
    let rgb: number[] = [0, 0, 0]
    let r, g, b
    if (hex.length === 7) {
      r = hex.substr(1, 2)
      g = hex.substr(3, 2)
      b = hex.substr(5, 2)
    } else if (hex.length === 4) {
      r = hex.substr(1, 1)
      g = hex.substr(2, 1)
      b = hex.substr(3, 1)
      r = r.concat(r)
      g = g.concat(g)
      b = b.concat(b)
    }
    rgb[0] = parseInt(r, 16)
    rgb[1] = parseInt(g, 16)
    rgb[2] = parseInt(b, 16)
    return rgb.map((n) => { return n / 255 })
  }

  // CMYK 1, 1, 1, 1
  // RGB 1, 1, 1
  public static RGBToCMYK(rgb: number[]): number[] {
    rgb[0] = Num.cycle(rgb[0], 1)
    rgb[1] = Num.cycle(rgb[1], 1)
    rgb[2] = Num.cycle(rgb[2], 1)
    let cmyk: number[] = [0, 0, 0, 0]
    cmyk[3] = 1 - Math.max.apply(this, rgb)
    cmyk[0] = (1 - rgb[0] - cmyk[3]) / (1 - cmyk[3])
    cmyk[1] = (1 - rgb[1] - cmyk[3]) / (1 - cmyk[3])
    cmyk[2] = (1 - rgb[2] - cmyk[3]) / (1 - cmyk[3])
    return cmyk
  }

  // CMYK 1, 1, 1, 1
  //  RGB 1, 1, 1
  public static CMYKToRGB(cmyk: number[]): number[] {
    cmyk[0] = Num.cycle(cmyk[0], 1)
    cmyk[1] = Num.cycle(cmyk[1], 1)
    cmyk[2] = Num.cycle(cmyk[2], 1)
    cmyk[3] = Num.cycle(cmyk[3], 1)
    let rgb: number[] = [0, 0, 0]
    rgb[0] = (1 - cmyk[0]) * (1 - cmyk[3])
    rgb[1] = (1 - cmyk[1]) * (1 - cmyk[3])
    rgb[2] = (1 - cmyk[2]) * (1 - cmyk[3])
    return rgb
  }

  // RGB   1, 1, 1
  // HSL 359, 1, 1
  public static RGBToHSL(rgb: number[]): number[] {
    rgb[0] = Num.cycle(rgb[0], 1)
    rgb[1] = Num.cycle(rgb[1], 1)
    rgb[2] = Num.cycle(rgb[2], 1)
    let cMax: number = Math.max.apply(this, rgb)
    let cMin: number = Math.min.apply(this, rgb)
    let delta: number = cMax - cMin
    let hsl: number[] = [0, 0, 0]
    if (delta === 0) {
      hsl[0] = 0
    } else if (cMax === rgb[0]) {
      hsl[0] = 60 * (((rgb[1] - rgb[2]) / delta) % 6)
    } else if (cMax === rgb[1]) {
      hsl[0] = 60 * (((rgb[2] - rgb[0]) / delta) + 2)
    } else if (cMax === rgb[2]) {
      hsl[0] = 60 * (((rgb[0] - rgb[1]) / delta) + 4)
    }
    hsl[2] = (cMax + cMin) / 2
    hsl[1] = delta === 0 ? 0 : delta / (1 - Math.abs(2 * hsl[2] - 1))
    return hsl
  }

  // HSL 359, 1, 1
  // RGB   1, 1, 1
  public static HSLToRGB(hsl: number[]): number[] {
    hsl[0] = Num.cycle(hsl[0], 359)
    hsl[1] = Num.cycle(hsl[1], 1)
    hsl[2] = Num.cycle(hsl[2], 1)
    let rgb: number[] = [0, 0, 0]
    let h: number = hsl[0] / 60
    let c: number = (1 - Math.abs(2 * hsl[2] - 1)) * hsl[1]
    let x: number = c * (1 - Math.abs(h % 2 - 1))
    if (h >= 0 && h <= 1) {
      rgb = [c, x, 0]
    } else if (h >= 1 && h <= 2) {
      rgb = [x, c, 0]
    } else if (h >= 2 && h <= 3) {
      rgb = [0, c, x]
    } else if (h >= 3 && h <= 4) {
      rgb = [0, x, c]
    } else if (h >= 4 && h <= 5) {
      rgb = [x, 0, c]
    } else if (h >= 5 && h <= 6) {
      rgb = [c, 0, x]
    }
    let m: number = hsl[2] - (0.5 * c)
    return rgb.map((v) => { return v + m })
  }

  // RGB   1, 1, 1
  // HSV 359, 1, 1
  public static RGBToHSV(rgb: number[]): number[] {
    rgb[0] = Num.cycle(rgb[0], 1)
    rgb[1] = Num.cycle(rgb[1], 1)
    rgb[2] = Num.cycle(rgb[2], 1)
    let cMax: number = Math.max.apply(this, rgb)
    let cMin: number = Math.min.apply(this, rgb)
    let delta: number = cMax - cMin
    let hsv: number[] = [0, 0, 0]
    if (delta === 0) {
      hsv[0] = 0
    } else if (cMax === rgb[0]) {
      hsv[0] = 60 * (((rgb[1] - rgb[2]) / delta) % 6)
    } else if (cMax === rgb[1]) {
      hsv[0] = 60 * (((rgb[2] - rgb[0]) / delta) + 2)
    } else if (cMax === rgb[2]) {
      hsv[0] = 60 * (((rgb[0] - rgb[1]) / delta) + 4)
    }
    hsv[1] = cMax === 0 ? 0 : delta / cMax
    hsv[2] = cMax
    return hsv
  }

  // HSV 359, 1, 1
  // RGB   1, 1, 1
  public static HSVToRGB(hsv: number[]): number[] {
    hsv[0] = Num.cycle(hsv[0], 359)
    hsv[1] = Num.cycle(hsv[1], 1)
    hsv[2] = Num.cycle(hsv[2], 1)
    let c: number = hsv[2] * hsv[1]
    let x: number = c * (1 - Math.abs((hsv[0] / 60) % 2 - 1))
    let rgb: number[]
    if (
      hsv[0] >= 0 &&
      hsv[0] <= 60
    ) {
      rgb = [c, x, 0]
    } else if (
      hsv[0] >= 60 &&
      hsv[0] <= 120
    ) {
      rgb = [x, c, 0]
    } else if (
      hsv[0] >= 120 &&
      hsv[0] <= 180
    ) {
      rgb = [0, c, x]
    } else if (
      hsv[0] >= 180 &&
      hsv[0] <= 240
    ) {
      rgb = [0, x, c]
    } else if (
      hsv[0] >= 240 &&
      hsv[0] <= 300
    ) {
      rgb = [x, 0, c]
    } else if (
      hsv[0] >= 300 &&
      hsv[0] <= 360
    ) {
      rgb = [c, 0, x]
    }
    let m: number = hsv[2] - c
    return rgb.map((v) => { return v + m })
  }
}

export interface ColorInput {
  alpha?: number
  black?: number
  blue?: number
  brightness?: number
  cmyk?: number[]
  cyan?: number
  green?: number
  hex?: string
  hsl?: number[]
  hsv?: number[]
  hue?: number
  lightness?: number
  magenta?: number
  red?: number
  rgb?: number[]
  saturation?: number
  value?: number
  yellow?: number
}

export class Color {

  r: number = 0
  g: number = 0
  b: number = 0
  a: number = 1

  constructor(input?: Color | ColorInput | string) {
    if (typeof input !== 'undefined') {
      this.set(input)
    }
    return this
  }

  public set(input: Color | ColorInput | string): Color {
    if (Color.isColor(input)) {
      this.equals(<Color>input)
    } else if (typeof input === 'string') {
      this._setFromString(input)
    } else if (typeof input === 'object') {
      this._setFromObject(<ColorInput>input)
    } else {
      this.r = 0
      this.g = 0
      this.b = 0
      this.a = 1
    }
    return this
  }

  private _setFromString(input: string): Color {
    if (typeof Color._name[input] !== 'undefined') {
      this._setFromArray('rgba', Color._name[input])
    } else if (typeof Util.match(input, Color._regex.hex) === 'string') {
      let rgb: number[] = ConvertColor.HEXToRGB(input)
      this._setFromArray('rgb', rgb)
    } else if (typeof Util.match(input, Color._regex.rgb) === 'string') {
      let rgb: number[] = input.match(/(\d+)/g).map((s) => { return parseFloat(s) })
      this._setFromArray('rgb', rgb)
    } else if (typeof Util.match(input, Color._regex.rgba) === 'string') {
      let rgba: number[] = input.match(/(\d+)/g).map((s) => { return parseFloat(s) })
      this._setFromArray('rgba', rgba)
    } else if (typeof Util.match(input, Color._regex.hsl) === 'string') {
      let hsl: number[] = input.match(/(\d+)/g).map((s) => { return parseFloat(s) })
      let rgb: number[] = ConvertColor.HSLToRGB(hsl)
      this._setFromArray('rgb', rgb)
    } else if (typeof Util.match(input, Color._regex.hsla) === 'string') {
      let hsla: number[] = input.match(/(\d+)/g).map((s) => { return parseFloat(s) })
      let rgba: number[] = ConvertColor.HSLToRGB(hsla)
      rgba.push(hsla[3])
      this._setFromArray('rgba', rgba)
    }
    return this
  }

  private _setFromArray(format: string = 'rgb', array: number[]): Color {
    let rgb: number[]
    let alpha: number
    if (format === 'hsl') {
      let hsl: number[] = [array[0], array[1], array[2]]
      rgb = ConvertColor.HSLToRGB(hsl)
      if (typeof array[3] === 'number') {
        alpha = array[3]
      }
    } else if (format === 'hsb' || format === 'hsv') {
      let hsv: number[] = [array[0], array[1], array[2]]
      rgb = ConvertColor.HSVToRGB(hsv)
      if (typeof array[3] === 'number') {
        alpha = array[3]
      }
    } else if (format === 'cmyk') {
      let cmyk: number[] = [array[0], array[1], array[2], array[3]]
      rgb = ConvertColor.CMYKToRGB(cmyk)
      if (typeof array[4] === 'number') {
        alpha = array[4]
      }
    } else {
      rgb = [array[0], array[1], array[2]]
      if (typeof array[3] === 'number') {
        alpha = array[3]
      }
    }
    this.r = rgb[0]
    this.g = rgb[1]
    this.b = rgb[2]
    if (typeof alpha === 'number') {
      this.a = alpha
    }
    return this
  }

  private _setFromObject(input: ColorInput): Color {
    let rgb: number[]
    if (typeof input.hex === 'string') {
      rgb = ConvertColor.HEXToRGB(input.hex)
    } else if (
      typeof input.red === 'number' &&
      typeof input.green === 'number' &&
      typeof input.blue === 'number'
    ) {
      rgb = [input.red, input.green, input.blue]
    } else if (
      typeof input.hue === 'number' &&
      typeof input.saturation === 'number'
    ) {
      if (typeof input.lightness === 'number') {
        rgb = ConvertColor.HSLToRGB([input.hue, input.saturation, input.lightness])
      }
    } else if (
      typeof input.brightness === 'number' ||
      typeof input.value === 'number'
    ) {
      let b = input.brightness || input.value
      rgb = ConvertColor.HSVToRGB([input.hue, input.saturation, b])
    } else if (
      typeof input.cyan === 'number' &&
      typeof input.magenta === 'number' &&
      typeof input.yellow === 'number' &&
      typeof input.black === 'number'
    ) {
      let cmyk = [input.cyan, input.magenta, input.yellow, input.black]
      rgb = ConvertColor.CMYKToRGB(cmyk)
    } else if (
      typeof input.rgb === 'object' &&
      input.rgb.constructor === Array
    ) {
      rgb = input.rgb
      if (typeof input.rgb[3] === 'number') {
        input.alpha = input.rgb[3]
      }
    } else if (
      typeof input.hsl === 'object' &&
      input.hsl.constructor === Array
    ) {
      rgb = ConvertColor.HSLToRGB(input.hsl)
      if (typeof input.hsl[3] === 'number') {
        input.alpha = input.hsl[3]
      }
    } else if (
      typeof input.hsv === 'object' &&
      input.hsv.constructor === Array
    ) {
      rgb = ConvertColor.HSLToRGB(input.hsv)
      if (typeof input.hsv[3] === 'number') {
        input.alpha = input.hsv[3]
      }
    } else if (
      typeof input.cmyk === 'object' &&
      input.cmyk.constructor === Array
    ) {
      rgb = ConvertColor.CMYKToRGB(input.cmyk)
      if (typeof input.cmyk[4] === 'number') {
        input.alpha = input.cmyk[4]
      }
    } else {
      rgb = [0, 0, 0]
    }
    this._setFromArray('rgb', rgb)
    if (typeof input.alpha === 'number') {
      this.a = input.alpha
    }
    return this
  }

  public getArray(format: string, alpha: boolean = false): number[] {
    let result = [this.r, this.g, this.b]
    if (format === 'hsl') {
      result = ConvertColor.RGBToHSL(result)
    } else if (format === 'hsb' || format === 'hsv') {
      result = ConvertColor.RGBToHSV(result)
    } else if (format === 'cmyk') {
      result = ConvertColor.RGBToCMYK(result)
    }
    if (alpha === true) {
      result.push(this.a)
    }
    return result
  }

  public getString(format?: string, alpha?: number): string {
    let rgb = [this.r, this.g, this.b]
    let hsl = ConvertColor.RGBToHSL(rgb)
    let hex = ConvertColor.RGBToHEX(rgb)
    rgb = rgb.map((v) => { return Math.round(v * 255) })
    hsl[1] = Math.round(hsl[1] * 100)
    hsl[2] = Math.round(hsl[2] * 100)
    if (typeof alpha === 'undefined') {
      alpha = this.a
    }
    let strings = {
      hex: hex,
      rgb: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
      rgba: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`,
      hsl: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[1]}%)`,
      hsla: `hsla(${hsl[0]}, ${hsl[1]}%, ${hsl[1]}%, ${alpha})`
    }
    if (
      typeof format === 'string' &&
      typeof strings[format] != 'undefined'
    ) {
      return strings[format]
    } else {
      return strings.rgba
    }
  }

  public equals(color: Color): Color {
    this.r = color.r
    this.g = color.g
    this.b = color.b
    this.a = color.a
    return this
  }

  public clone(): Color {
    return Color.equals(this)
  }

  public lerp(target: Color, t: number): Color {
    this.r = Num.lerp(this.r, target.r, t)
    this.g = Num.lerp(this.g, target.g, t)
    this.b = Num.lerp(this.b, target.b, t)
    this.a = Num.lerp(this.a, target.a, t)
    return this
  }

  public red(red?: number): number {
    if (typeof red === 'number') {
      this.r = red
    }
    return this.r
  }

  public green(green?: number): number {
    if (typeof green === 'number') {
      this.g = green
    }
    return this.g
  }

  public blue(blue?: number): number {
    if (typeof blue === 'number') {
      this.b = blue
    }
    return this.b
  }

  public cyan(cyan?: number): number {
    let cmyk: number[] = ConvertColor.RGBToCMYK([this.r, this.g, this.b])
    if (typeof cyan === 'number') {
      cmyk[0] = cyan
      let rgb: number[] = ConvertColor.CMYKToRGB(cmyk)
      this.r = rgb[0]
      this.g = rgb[1]
      this.b = rgb[2]
    }
    return cmyk[0]
  }

  public magenta(magenta?: number): number {
    let cmyk: number[] = ConvertColor.RGBToCMYK([this.r, this.g, this.b])
    if (typeof magenta === 'number') {
      cmyk[1] = magenta
      let rgb: number[] = ConvertColor.CMYKToRGB(cmyk)
      this.r = rgb[0]
      this.g = rgb[1]
      this.b = rgb[2]
    }
    return cmyk[1]
  }

  public yellow(yellow?: number): number {
    let cmyk: number[] = ConvertColor.RGBToCMYK([this.r, this.g, this.b])
    if (typeof yellow === 'number') {
      cmyk[2] = yellow
      let rgb: number[] = ConvertColor.CMYKToRGB(cmyk)
      this.r = rgb[0]
      this.g = rgb[1]
      this.b = rgb[2]
    }
    return cmyk[2]
  }

  public alpha(alpha?: number): number {
    if (typeof alpha === 'number') {
      this.a = Num.cycle(alpha, 1)
    }
    return this.a
  }

  public hue(degrees?: number): number {
    let hsl: number[] = ConvertColor.RGBToHSL([this.r, this.g, this.b])
    if (typeof degrees === 'number') {
      hsl[0] = Math.abs(Math.round(Num.cycle(degrees, 360)))
      let rgb: number[] = ConvertColor.HSLToRGB(hsl)
      this.r = rgb[0]
      this.g = rgb[1]
      this.b = rgb[2]
    }
    return Math.round(hsl[0])
  }

  public hueRotate(increment: number): Color {
    this.hue(this.hue() + increment)
    return this
  }

  public saturation(saturation?: number): number {
    let hsl: number[] = ConvertColor.RGBToHSL([this.r, this.g, this.b])
    if (typeof saturation === 'number') {
      hsl[1] = Num.cycle(saturation, 1)
      let rgb: number[] = ConvertColor.HSLToRGB(hsl)
      this.r = rgb[0]
      this.g = rgb[1]
      this.b = rgb[2]
    }
    return hsl[1]
  }

  public value(value?: number): number {
    let hsv: number[] = ConvertColor.RGBToHSV([this.r, this.g, this.b])
    if (typeof value === 'number') {
      value = Num.cycle(value, 1)
      hsv[2] = value
      let rgb: number[] = ConvertColor.HSVToRGB(hsv)
      this.r = rgb[0]
      this.g = rgb[1]
      this.b = rgb[2]
    }
    return hsv[2]
  }

  public brightness(): number {
    return Math.sqrt(0.299 * this.r * this.r + 0.587 * this.g * this.g + 0.114 * this.b * this.b)
  }

  public invert(): Color {
    this.r = 1 - this.r
    this.g = 1 - this.g
    this.b = 1 - this.b
    return this
  }

  public static isColor(color): boolean {
    return color instanceof Color ? true : false
  }

  public static equals(color: Color): Color {
    return new Color(color)
  }

  public static triadic(color: Color): Array<Color> {
    let colora: Color = color.clone().hueRotate(-120)
    let colorc: Color = color.clone().hueRotate(120)
    return [colora, color, colorc]
  }

  public static complement(color: Color): Color {
    return color.clone().hueRotate(180)
  }

  public static splitComplements(color: Color): Array<Color> {
    let colora: Color = color.clone().hueRotate(-150)
    let colorc: Color = color.clone().hueRotate(150)
    return [colora, color, colorc]
  }

  public static analogous(color: Color): Array<Color> {
    let colora: Color = color.clone().hueRotate(-30)
    let colorc: Color = color.clone().hueRotate(30)
    return [colora, color, colorc]
  }

  public static lerp(color1: Color, color2: Color, t: number): Color {
    let color: Color = Color.equals(color2)
    color.r = Num.lerp(color.r, color2.r, t)
    color.g = Num.lerp(color.g, color2.g, t)
    color.b = Num.lerp(color.b, color2.b, t)
    color.a = Num.lerp(color.a, color2.a, t)
    return color
  }

  public static _name: object = {
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
  }

  public static _regex = {
    hex: /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/g,
    hsl: /^(hsl|HSL)\((360|3[0-5][0-9]|2[0-9][0-9]|1[0-9][0-9]|[1-9]?[0-9]),\s?(100|[1-9]?[0-9]),\s?(100|[1-9]?[0-9])\)$/g,
    hsla: /^(hsl|HSL)\((360|3[0-5][0-9]|2[0-9][0-9]|1[0-9][0-9]|[1-9]?[0-9]),\s?(100|[1-9]?[0-9]),\s?(100|[1-9]?[0-9]),\s?(1|0|0\.([0-9]?)+[1-9])\)$/g,
    rgb: /^(rgb|RGB)\((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9]),\s?(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9]),\s?(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\)$/g,
    rgba: /^(rgba|RGBA)\((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9]),\s?(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9]),\s?(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9]),\s?(1|0|0\.([0-9]?){1,5}[1-9])\)$/g,
  }

}