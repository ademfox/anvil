export class Num {

  public static average(numbers: number[]): number {
    if (numbers.length < 2) {
      throw new Error('Core/Num.average: Expects at least 2 numbers in an arrays');
    }

    let sum: number = this.sum(numbers);

    return sum / numbers.length;
  }

  public static constrain(number: number, range: number | number[]): number {
    if (typeof range === 'number') {
      range = [0, range];
    }

    if (range[0] === range[1]) {
      return 0;
    }

    let max: number = Math.max(range[0], range[1]);
    let min: number = Math.min(range[0], range[1]);

    if (number > max) {
      return max;
    } else if (number < min) {
      return min;
    } else {
      return number;
    }
  }

  public static cycle(number: number, range: number | number[]): number {
    if (typeof range === 'number') {
      range = [0, range];
    }

    let max = Math.max(range[0], range[1]);
    let min = Math.min(range[0], range[1]);

    if (max === 0 && min === 0) {
      return 0;
    }

    let da = this.getNumberLineDistance(min, max);
    let db: number;
    let c: number;

    if (number > max) {
      db = this.getNumberLineDistance(number, max);
      c = db % da + min;
      return c === min ? max : c;
    } else if (number < min) {
      db = this.getNumberLineDistance(number, min);
      c = max - db % da;
      return c === max ? min : c;
    } else {
      return number;
    }
  }

  public static getNumberLineDistance(a: number, b: number) {
    let min = Math.min(a, b);
    let max = Math.max(a, b);

    if (min < 0 && max < 0) {
      return Math.abs(min) - Math.abs(max);
    } else if (min < 0 && max >= 0) {
      return Math.abs(min) + max;
    } else if (min >= 0 && max >= 0) {
      return max - min;
    }
  }

  public static hypotenuse(x: number, y: number) {
    // http://www.johndcook.com/blog/2010/06/02/whats-so-hard-about-finding-a-hypotenuse/
    let max = Math.max(Math.abs(x), Math.abs(y));
    let min = Math.min(Math.abs(x), Math.abs(y));

    if (max === 0) {
      max = 1;
    }

    let n: number = min / max;
    return max * Math.sqrt(1 + n * n);
  }

  public static reciprocal(number: number): number | undefined {
    return number != 0 ? 1 / number : undefined;
  }

  public static round(number: number, to?: number): number {
    to = typeof to === 'undefined' ? 0 : to;
    return parseFloat((number).toFixed(to));
  }

  public static lerp(from: number, to: number, t: number): number {
    return (1 - t) * from + t * to;
  }

  public static modulate(number: number, from: number | number[], to: number | number[], constrain?: boolean): number {
    if (typeof from === 'number') {
      from = [0, from];
    }

    if (typeof to === 'number') {
      to = [0, to];
    }

    let percent: number = (number - from[0]) / (from[1] - from[0]);
    let result: number;

    if (to[1] > to[0]) {
      result = percent * (to[1] - to[0]) + to[0];
    } else {
      result = to[0] - (percent * (to[0] - to[1]));
    }

    return constrain === true ? Num.constrain(result, to) : result;
  }

  public static random(range: number | number[], whole: boolean = false, fixed: number = 2): number {
    if (typeof range === 'number') {
      range = [0, range];
    }

    if (
      range[0] === 0 &&
      range[1] === 1
    ) {
      if (whole === true) {
        return Math.random() > 0.5 ? 1 : 0;
      } else {
        return parseFloat((Math.random()).toFixed(fixed));
      }
    } else {
      let number = this.modulate(Math.random(), 1, range, false);
      return parseInt((number).toFixed(0));
    }
  }

  public static sum(numbers: Array<number>): number {
    let sum = 0;

    for (let number of numbers) {
      sum += number;
    }

    return sum;
  }

  public static within(number: number, range: number | number[]): boolean {
    if (typeof range === 'number') {
      range = [0, range];
    }

    return number >= range[0] && number <= range[1] ? true : false;
  }

}