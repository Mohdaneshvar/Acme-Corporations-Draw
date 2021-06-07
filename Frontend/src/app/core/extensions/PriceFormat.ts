export class PriceFormat {
  static transform(value: any): any {
    if (!value)
      return value;

    return (value + "ریال").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
}
