import {
  Animation,
  AnimationQueue,
} from '../Anvil'

export class AnimationGroup {

  public stack: (Animation | AnimationQueue)[]

  public callback: Function = function (): void { }

  public isAnimating: boolean = false
  public count: number = 0

  constructor() {
    this.stack = new Array
  }

  public add(animation: Animation | AnimationQueue): AnimationGroup {
    this.stack.push(animation)
    return this
  }

  public clear(): AnimationGroup {
    this.reset()
    this.stack = new Array
    return this
  }

  public reset(): AnimationGroup {
    // Remove all callbacks from current animation.
    for (let i = 0; i < this.stack.length; i++) {
      this.stack[i].callback = function (): void { }
    }
    this.count = 0
    this.isAnimating = false
    return this
  }

  public setup(): AnimationGroup {
    for (let i = 0; i < this.stack.length; i++) {
      this.stack[i].callback = this.onAnimationEnd.bind(this)
    }
    return this
  }

  public play(): AnimationGroup {
    if (this.isAnimating === false) {
      this.setup()
      this.isAnimating = true
      for (let i = 0; i < this.stack.length; i++) {
        this.stack[i].play()
      }
    }
    return this
  }

  public stop(): AnimationGroup {
    if (this.isAnimating === true) {
      for (let i = 0; i < this.stack.length; i++) {
        this.stack[i].stop()
      }
      this.reset()
    }
    return this
  }

  private onAnimationEnd(): void {
    this.count++
    // If this is the last animation that played in the stack.
    if (this.count == this.stack.length) {
      this.reset()
      this.callback()
    }
  }

}