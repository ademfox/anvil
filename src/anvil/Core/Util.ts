import {
  Num,
} from './Num'

export class Util {

  public static cycle(array: any[]): Function {
    let index: number = -1;

    return function (): any {
      index++;

      if (index > array.length - 1) {
        index = 0;
      }

      return array[index];
    }
  }

  // Returns a debouncer function that no matter the frequency of calls
  // will only be invoked after the given delay timeout (in seconds).
  public static debounce(delay: number, fn: Function): Function {
    let timeout: number;

    return function (...args: any[]) {
      clearTimeout(timeout);
      let context = this;
      timeout = setTimeout(() => {
        fn.apply(context, args);
      }, 1000 * delay);
    }
  }

  // Delay given function call given number of second(s).
  public static delay(time: number, fn: Function): number {
    return setTimeout(fn, time * 1000);
  }

  public static cancelDelay(id: number): void {
    clearTimeout(id);
  }

  public static repeat(interval: number, fn: Function): number {
    return setInterval(fn, interval * 1000);
  }

  public static stopRepeat(id: number): void {
    clearInterval(id);
  }

  public static match(string: string, _with: RegExp): boolean | string | string[] {
    let value: null | string[] = String(string).match(_with);

    if (value === null) {
      return false;
    } else if (value.length === 1) {
      return value[0];
    }

    return value;
  }

  public static randomChoice(array: any[]): any {
    let index: number = Num.random(array.length - 1, true);
    return array[index];
  }

  public static throttle(threshold: number, fn: Function): Function {
    let timeout: number;
    let last: number;

    threshold = 1000 * threshold;

    return function () {
      let context = this;
      let args = arguments;
      let now = + new Date;
      if (last && now < last + threshold) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          last = now;
          fn.apply(context, args);
        }, threshold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    }
  }

  public static toHex(n: string) {
    return parseInt(n).toString(16).toUpperCase();
  }

}