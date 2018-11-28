import {
  Color,
  Point,
  Vector2,
} from '../Anvil';

export interface CanvasDrawStyle {
  fillColor?: CanvasGradient | string
  strokeCap?: string
  strokeColor?: CanvasGradient | string
  strokeJoin?: string
  strokeWidth?: number
  noFill?: boolean
  noStroke?: boolean
}

export class CanvasDraw {

  public context: CanvasRenderingContext2D;
  public element: HTMLCanvasElement;

  public defaultStyle: CanvasDrawStyle;
  public previousTranslation: Vector2;
  public resolutionMultiplier: number;

  constructor(element: HTMLCanvasElement) {
    this.resolutionMultiplier = window.devicePixelRatio
    // window.devicePixelRatio
    this.previousTranslation = new Vector2(0, 0)
    this.element = element
    this.resize()
    this.context = this.element.getContext('2d')
    this.initialize()
  }

  public initialize(): CanvasDraw {
    this.defaultStyle = {
      fillColor: 'black',
      noFill: false,
      noStroke: false,
      strokeCap: 'round', // round, square
      strokeColor: 'black',
      strokeJoin: 'round', // bevel, round, miter
      strokeWidth: 0
    }
    return this
  }

  public setDefaultStyle(style: CanvasDrawStyle): CanvasDraw {
    for (let key in style) {
      this.defaultStyle[key] = style[key]
    }
    return this
  }

  public createLinearGradient(from: Vector2, to: Vector2): CanvasGradient {
    let m = this.resolutionMultiplier
    return this.context.createLinearGradient(
      from.x * m, from.y * m, to.x * m, to.y * m
    )
    // gradient.addColorStop(0, 'green')
    // gradient.addColorStop(1, 'white')
  }

  public createRadialGradient(from: Vector2, fromRadius: number, to: Vector2, toRadius: number) {
    let m = this.resolutionMultiplier
    return this.context.createRadialGradient(
      from.x * m, from.y * m, fromRadius * m, to.x * m, to.y * m, toRadius * m
    )
  }

  // Apply Gradient
  public applyStyle(style?: CanvasDrawStyle): CanvasDraw {
    let computedStyle: CanvasDrawStyle = new Object
    for (let key in this.defaultStyle) {
      computedStyle[key] = this.defaultStyle[key]
    }
    if (typeof style !== 'undefined') {
      for (let key in style) {
        computedStyle[key] = style[key]
      }
    }
    this.context.fillStyle = computedStyle.fillColor
    // this.context.lineCap = computedStyle.strokeCap
    // this.context.lineJoin = computedStyle.strokeJoin
    this.context.strokeStyle = computedStyle.strokeColor
    this.context.lineWidth = computedStyle.strokeWidth
    if (computedStyle.noFill === false) {
      this.context.fill()
    }
    if (computedStyle.noStroke === false) {
      this.context.stroke()
    }
    return this
  }

  public clear(): CanvasDraw {
    this.context.clearRect(0, 0, this.element.width, this.element.height)
    return this
  }

  public resize(width?: number, height?: number): CanvasDraw {
    if (
      typeof height === 'number' &&
      typeof width === 'number'
    ) {
      this.element.height = height * this.resolutionMultiplier
      this.element.width = width * this.resolutionMultiplier
    } else {
      this.element.height = this.element.offsetHeight * this.resolutionMultiplier
      this.element.width = this.element.offsetWidth * this.resolutionMultiplier
    }
    return this
  }

  // TODO: Need to optimize this.
  // Perhaps get a snapshot of all the pixel data.
  public getPixelColor(point: Point): Color {
    let m = this.resolutionMultiplier
    let imageData = this.context.getImageData(
      point.x * m, point.y * m, this.element.width, this.element.height
    )
    let data = imageData.data
    let color: Color = new Color()
    color.r = data[0] / 255
    color.g = data[1] / 255
    color.b = data[2] / 255
    color.a = data[3] / 255
    return color
  }

  public putPixelColor(point: Point, color: Color) {
    let m = this.resolutionMultiplier
    let pixel = this.context.getImageData(point.x * m, point.y * m, 1, 1)
    let data = pixel.data
    data[0] = color.r * 255
    data[1] = color.g * 255
    data[2] = color.b * 255
    data[3] = color.a * 255
    return this.context.putImageData(pixel, 0, 0)
  }

  public clip(): CanvasDraw {
    this.context.clip()
    return this
  }

  public shadow(offsetX: number, offsetY: number, blur: number, color: Color | string): CanvasDraw {
    let m = this.resolutionMultiplier
    if (color instanceof Color) {
      color = color.getString('rgba')
    }
    this.context.shadowBlur = blur * m
    this.context.shadowColor = <string>color
    this.context.shadowOffsetX = offsetX * m
    this.context.shadowOffsetY = offsetY * m
    return this
  }

  public image(img: HTMLImageElement, st: Point, sw: number, sh: number, dt: Point, dw: number, dh: number): CanvasDraw {
    let m = this.resolutionMultiplier
    this.context.drawImage(
      img, st.x, st.y, sw, sh, dt.x * m, dt.y * m, dw * m, dh * m
    )
    return this
  }

  // Shapes

  public circle(v: Point, r: number, style: CanvasDrawStyle, insert?: Function): CanvasDraw {
    let m: number = this.resolutionMultiplier
    this.save()
    this.begin()
    this.context.arc(v.x * m, v.y * m, r * m, 0, 2 * Math.PI, false)
    this.end()
    this.applyStyle(style)
    if (typeof insert !== 'undefined') {
      insert()
    }
    this.restore()
    return this
  }

  // Paths

  // Gradient
  // https://www.w3schools.com/tags/canvas_createlineargradient.asp
  // https://www.w3schools.com/tags/canvas_arcto.asp
  public arcTo(from: Point, to: Point, r: number): CanvasDraw {
    let m = this.resolutionMultiplier
    this.context.arcTo(
      from.x * m, from.y * m, to.x * m, to.y * m, r * m
    )
    return this
  }

  public begin(): CanvasDraw {
    this.context.beginPath()
    return this
  }

  public bezierCurveTo(cp1: Point, cp2: Point, to: Point): CanvasDraw {
    let m = this.resolutionMultiplier
    this.context.bezierCurveTo(
      cp1.x * m, cp1.y * m, cp2.x * m, cp2.y * m, to.x * m, to.y * m
    )
    return this
  }

  public end(): CanvasDraw {
    this.context.closePath()
    return this
  }

  // https://www.w3schools.com/tags/canvas_ispointinpath.asp
  public isPointInPath(point: Point): CanvasDraw {
    let m = this.resolutionMultiplier
    this.context.isPointInPath(point.x * m, point.y * m)
    return this
  }

  public lineTo(to: Point): CanvasDraw {
    let m = this.resolutionMultiplier
    this.context.lineTo(to.x * m, to.y * m)
    return this
  }

  public moveTo(to: Point): CanvasDraw {
    let m = this.resolutionMultiplier
    this.context.moveTo(to.x * m, to.y * m)
    return this
  }

  public quadraticCurveTo(cp: Point, to: Point): CanvasDraw {
    let m = this.resolutionMultiplier
    this.context.quadraticCurveTo(
      cp.x * m, cp.y * m, to.x * m, to.y * m
    )
    return this
  }

  // @transformations

  public rotate(angle: number): CanvasDraw {
    this.context.rotate(angle)
    return this
  }

  public scale(w: number, h?: number): CanvasDraw {
    if (typeof h !== 'number') {
      h = w
    }
    this.context.scale(w, h)
    return this
  }

  public translate(to: Point): CanvasDraw {
    let m: number = this.resolutionMultiplier
    this.context.translate(to.x * m, to.y * m)
    this.previousTranslation.equals(to)
    return this
  }

  public reset(): CanvasDraw {
    this.context.setTransform(1, 0, 0, 1, 0, 0)
    return this
  }

  public save(): CanvasDraw {
    this.context.save()
    return this
  }

  public restore(): CanvasDraw {
    this.context.restore()
    return this
  }

}