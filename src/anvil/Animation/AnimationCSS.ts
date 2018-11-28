import {
  Animation,
} from '../Anvil'


export interface AnimationCSSInterface {

}

export class AnimationCSS {

  public element: HTMLElement
  public isAnimating: boolean = false

  constructor(element: HTMLElement) {
    this.element = element;
  }

  // TODO: Add Hooks, Controls.

}