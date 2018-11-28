import {
  ScreenEventManager,
} from './Anvil';

export class Screen {

  public eventManager: ScreenEventManager;

  constructor() {
    this.initialize();
  }

  public initialize(): void {
    this.eventManager = new ScreenEventManager();
  }

  public static getDiagonal(): number {
    let h: number = window.innerHeight;
    let w: number = window.innerWidth;
    return Math.abs(Math.sqrt(w * w + h * h));
  }

  public static getHeight(): number {
    return window.innerHeight;
  }

  public static getWidth(): number {
    return window.innerWidth;
  }

}