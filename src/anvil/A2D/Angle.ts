import {
  Num,
} from '../Anvil';

export class Angle {

  public static toDegrees(radians: number): number {
    return radians * (180 / Math.PI);
  }

  public static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  public static deltaClockwise(from: number, to: number, direction: boolean = false): number {
    let sign: number = 1;
    let range: number = from - Math.PI;

    if (range < 0) {
      let offset: number = Num.cycle(range, Math.PI * 2);
      if (
        to < from ||
        to >= offset
      ) {
        sign = -1;
      }
    } else if (
      to < from &&
      to >= range
    ) {
      sign = -1;
    }

    if (direction === false) {
      sign = 1;
    }

    let result: number = 0;

    if (from > to) {
      result = from - to;
    } else if (to > from) {
      result = to - from;
    }

    return result * sign;
  }

  public static deltaCounterclockwise(from: number, to: number, direction: boolean = false): number {
    let sign: number = 1;
    let range: number = from + Math.PI;

    if (range > Math.PI * 2) {
      let offset: number = Num.cycle(range, Math.PI * 2);

      if (
        to > from ||
        to <= offset
      ) {
        sign = -1;
      }
    } else if (
      to > from &&
      to <= range
    ) {
      sign = -1;
    }

    if (direction === false) {
      sign = 1;
    }

    let result: number = 0;

    if (from > to) {
      result = from - to;
    } else if (to > from) {
      result = to - from;
    }

    return result * sign;
  }

  public static differenceClockwise(from: number, to: number): number {
    let result: number = 0;

    if (from > to) {
      result = (Math.PI * 2) - from + to;
    } else if (to > from) {
      result = to - from;
    }

    return result;
  }


  public static differenceCounterclockwise(from: number, to: number): number {
    let result: number = 0;

    if (from > to) {
      result = from - to;
    } else if (to > from) {
      result = from + (Math.PI * 2) - to;
    }

    return result;
  }

}