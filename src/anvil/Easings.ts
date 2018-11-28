export class Easings {

  public static QuadEaseIn(t: number): number {
    return t * t;
  }

  public static QuadEaseOut(t: number): number {
    return -1 * t * (t - 2);
  }

  public static QuadEaseInEaseOut(t: number): number {
    t /= 0.5;
    if (t < 1) {
      return 0.5 * t * t;
    }
    t--;
    return -0.5 * (t * (t - 2) - 1);
  }

  public static CubicEaseIn(t: number): number {
    return t * t * t;
  }

  public static CubicEaseOut(t: number): number {
    t--;
    return t * t * t + 1;
  }

  public static CubicEaseInEaseOut(t: number): number {
    t /= 0.5;
    if (t < 1) {
      return 0.5 * t * t * t;
    }
    t -= 2;
    return 0.5 * (t * t * t + 2);
  }

  public static QuarticEaseIn(t: number): number {
    return t * t * t * t;
  }

  public static QuarticEaseOut(t: number): number {
    t--;
    return -1 * (t * t * t * t - 1);
  }

  public static QuarticEaseInEaseOut(t: number): number {
    t /= 0.5;
    if (t < 1) {
      return 0.5 * t * t * t * t;
    }
    t -= 2;
    return -0.5 * (t * t * t * t - 2);
  }

  public static EaseOutElastic(t: number, p: number = 0.3): number {
    return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
  }

}