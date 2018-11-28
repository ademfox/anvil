import {
  Animation,
  AnimationGroup,
} from '../Anvil';

export class AnimationQueue {

  public queue: (Animation | AnimationGroup)[];

  public callback: Function = function (): void { };

  public isAnimating: boolean = false;

  constructor() {
    this.queue = new Array;
  }

  public enqueue(animation: Animation | AnimationGroup): AnimationQueue {
    this.queue.push(animation);
    return this;
  }

  public dequeue() {
    return this;
  }

  public clear(): AnimationQueue {
    this.queue = new Array;
    return this;
  }

  public play(): AnimationQueue {
    this.isAnimating = true;
    this.queue[0].callback = this.next.bind(this);
    this.queue[0].play();
    return this;
  }

  public stop(): AnimationQueue {
    if (this.queue.length > 0) {
      for (let animation of this.queue) {
        animation.stop();
      }
    }

    if (this.isAnimating === true) {
      this.isAnimating = false;
    }

    this.callback();
    return this;
  }

  private next(): void {
    this.queue[0].callback = undefined;
    this.queue.splice(0, 1);

    if (this.queue.length > 0) {
      this.play();
    } else {
      this.stop();
    }
  }

}