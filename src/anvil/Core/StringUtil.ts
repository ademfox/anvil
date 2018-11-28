// StringUtil V1.0

export class StringUtil {

  public static trim(string: string): string {
    string = string.replace(/^[\s]+/g, '');
    return string.replace(/[\s]+$/g, '');
  }

  public static removeExtraWhitespaces(string: string): string {
    return string.replace(/[\s]+/g, ' ');
  }

  public static removeTabs(string: string): string {
    return string.replace(/[\t]+/g, '');
  }

  public static removeNewLines(string: string): string {
    return string.replace(/[\r\n]+/g, '');
  }

}