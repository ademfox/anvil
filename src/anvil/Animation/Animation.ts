import {
  Num,
} from '../Core/Num'

export interface AnimationProperties {
  alternate?: boolean
  delay?: number
  duration?: number
  exports?: any
  numberOfIterations?: number | 'infinite'
  onAnimationEnd?: Function | Function[]
  onAnimationStart?: Function | Function[]
  onIterationEnd?: Function | Function[]
  onIterationStart?: Function | Function[]
  onTick?: Function | Function[]
  timingFunction?: Function
}

export class Animation {

  public alternate: boolean = false
  public delay: number = 0 // Delay before animation starts.
  public duration: number = 2 // In seconds.

  // States
  public isActive: boolean = false
  public isAnimating: boolean = false
  public isPaused: boolean = false
  public isReversed: boolean = false

  public iterationCount: number = 0
  public iterationDelay: number = 0 // Delay before next iteration.
  public numberOfIterations: number | 'infinite' = 1

  public exports: any = 0

  public timingFunction: Function = function (t): number { return t }

  public onAnimationStart: Function | Function[] = function (): void { }
  public onAnimationEnd: Function | Function[] = function (): void { }
  public onIterationEnd: Function | Function[] = function (): void { }
  public onIterationStart: Function | Function[] = function (): void { }
  public callback: Function = function (): void { }
  public onTick: Function | Function[] = function (n, fn, data): void { }

  private currentDirection: boolean = true
  private currentProgress: number

  private startTime: number
  private pauseTime: number
  private endTime: number

  private RAFID: number
  private timeoutID: number

  constructor(properties: AnimationProperties) {
    this.setProperties(properties)
    return this
  }

  public setProperties(properties: AnimationProperties): Animation {
    for (let key in properties) {
      this[key] = properties[key]
    }
    return this
  }

  public goToBeginning(): Animation {
    if (typeof this.onTick === 'function') {
      this.onTick(0, this, undefined)
    } else if (this.onTick.constructor === Array) {
      for (let onTick of <Function[]>this.onTick) {
        onTick(0, this, undefined)
      }
    }
    return this
  }

  public goToEnd(): Animation {
    if (typeof this.onTick === 'function') {
      this.onTick(1, this, undefined)
    } else if (this.onTick.constructor === Array) {
      for (let onTick of <Function[]>this.onTick) {
        onTick(1, this, undefined)
      }
    }
    return this
  }

  public reset(): Animation {
    this.clearSessions()

    this.isActive = false
    this.isAnimating = false
    this.isPaused = false

    this.currentDirection = true

    this.iterationCount = 0

    this.startTime = 0
    this.pauseTime = 0
    this.endTime = 0

    this.currentProgress = 0
    return this
  }

  public pause(): Animation {
    if (
      this.isActive === true &&
      this.isAnimating == true &&
      this.isPaused === false
    ) {
      this.clearSessions()
      this.isAnimating = false
      this.isPaused = true
      this.pauseTime = Date.now()
    }
    return this
  }

  public stop(): Animation {
    this
      .reset()
      .callOnAnimationEnd()
      .callback()
    return this
  }

  public stopAndJumptToEnd(): Animation {
    this
      .reset()
      .goToEnd()
      .callOnAnimationEnd()
      .callback()
    return this
  }

  public stopAndJumpToBeginning(): Animation {
    this
      .reset()
      .goToBeginning()
      .callOnAnimationEnd()
      .callback()
    return this
  }

  // A
  public play(delay?: number): Animation {
    this.callOnAnimationStart()
    // This is only called when it's not animating.
    this.isActive = true
    if (typeof delay !== 'number') {
      delay = this.delay
    }
    this.timeoutID = setTimeout(
      this.start.bind(this),
      delay * 1000
    )
    return this
  }

  // B, Similar to play but without the delay :D.
  private start(): Animation {
    this.isActive = true

    // Set beginning direction.
    if (this.isReversed === true) {
      this.currentDirection = false
    }

    // If it's paused.
    if (this.isPaused === true) {
      let startTimeDelta: number = this.pauseTime - this.startTime
      let endTimeDelta: number = this.endTime - this.pauseTime
      let now: number = Date.now()
      this.startTime = now - startTimeDelta
      this.endTime = now + endTimeDelta
      this.isPaused = false
    }
    // If it's not paused.
    else {
      this.startTime = Date.now()
      this.endTime = this.startTime + (this.duration * 1000)
    }

    this.isAnimating = true

    this.callOnIterationStart()

    // Begin loop.
    this.loop()
    return this
  }

  // C
  private loop(): Animation {
    let frame: Function = function (): void {

      // Tick, this also moves progress forward!
      this.tick()

      if (
        this.isActive === true &&
        this.isAnimating === true &&
        this.isPaused === false
      ) {

        if (this.currentProgress < 1) {
          // Loop again!
          this.loop()
          // Break here!
          return
        } else {
          // End iteration.
          this.iterationCount++
          this.callOnIterationEnd()

          // Stop animation if exceeds number of iterations.
          if (
            typeof this.numberOfIterations === 'number' &&
            this.iterationCount >= this.numberOfIterations
          ) {
            // End animation if iteration count reach number of iterations.
            this.stop()
            // Break function!
            return
          }

          // Toggle direction if it's alternating.
          if (
            this.alternate === true &&
            this.iterationCount % 2 !== 0
          ) {
            this.toggleDirection()
          }

          // Continue playing!
          // The cycle begins again.
          this.play(this.iterationDelay)
        }

      } // End if active, animating, and not paused.

    }
    // Go!
    this.RAFID = window.requestAnimationFrame(
      frame.bind(this)
    )
    return this
  }

  // D
  private tick(): Animation {

    // Update currentProgress.
    this.currentProgress = this.getCurrentNValue()

    // Modify N based on TimingFunction.
    let n: number = this.timingFunction(
      this.currentProgress
    )

    // Reverse N depending on current direction.
    if (this.currentDirection === false) {
      n = 1 - n
    }

    // Tick.
    if (typeof this.onTick === 'function') {
      this.onTick(
        n, this.iterationCount, this.exports
      )
    } else if (this.onTick.constructor === Array) {
      for (let onTick of <Function[]>this.onTick) {
        onTick(
          n, this.iterationCount, this.exports
        )
      }
    }

    return this
  }

  // Helpers

  // Get current N value.
  private getCurrentNValue(): number {
    return Num.modulate(
      Date.now(),
      [this.startTime, this.endTime],
      1, true
    )
  }

  private clearSessions(): Animation {
    clearTimeout(this.timeoutID)
    window.cancelAnimationFrame(this.RAFID)
    return this
  }

  private toggleDirection(): Animation {
    this.currentDirection = this.currentDirection === true ? false : true
    return this
  }

  // Callbacks

  public callOnAnimationStart(): Animation {
    if (typeof this.onAnimationStart === 'function') {
      this.onAnimationStart(this)
    } else if (this.onAnimationStart.constructor === Array) {
      for (let onAnimationStart of <Function[]>this.onAnimationStart) {
        onAnimationStart(this)
      }
    }
    return this
  }

  public callOnAnimationEnd(): Animation {
    if (typeof this.onAnimationEnd === 'function') {
      this.onAnimationEnd(this)
    } else if (this.onAnimationEnd.constructor === Array) {
      for (let onAnimationEnd of <Function[]>this.onAnimationEnd) {
        onAnimationEnd(this)
      }
    }
    return this
  }

  public callOnIterationStart(): Animation {
    if (typeof this.onIterationStart === 'function') {
      this.onIterationStart(this)
    } else if (this.onIterationStart.constructor === Array) {
      for (let onIterationStart of <Function[]>this.onIterationStart) {
        onIterationStart(this)
      }
    }
    return this
  }

  public callOnIterationEnd(): Animation {
    if (typeof this.onIterationEnd === 'function') {
      this.onIterationEnd(this)
    } else if (this.onIterationEnd.constructor === Array) {
      for (let onIterationEnd of <Function[]>this.onIterationEnd) {
        onIterationEnd(this)
      }
    }
    return this
  }

}