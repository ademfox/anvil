import {
  CanvasDraw,
} from '../Anvil';

export class CanvasLayer {

  public draw: CanvasDraw;
  public element: HTMLCanvasElement;

  constructor(element: HTMLCanvasElement) {
    this.element = element;
    this.initialize();
  }

  public initialize(): CanvasLayer {
    this.element.style.position = 'absolute';
    this.element.style.left = '0px';
    this.element.style.top = '0px';
    this.draw = new CanvasDraw(this.element);
    return this;
  }

  public updateElement(element: HTMLCanvasElement): CanvasLayer {
    this.element = element;
    this.draw.element = element;
    return this;
  }

  public show(): CanvasLayer {
    this.element.style.display = `block`;
    return this;
  }

  public hide(): CanvasLayer {
    this.element.style.display = `none`;
    return this;
  }

  public setZIndex(zIndex: number): CanvasLayer {
    this.element.style.zIndex = zIndex.toString();
    return this;
  }

}