export class MobileValidity {
  static isValidMobile(mobileNumber: string) {
    if (mobileNumber.startsWith("09") && mobileNumber.length === 11)
      return true;
    else {
      return false;
    }
  }

  static isValidPhone(telNumber: string) {
    if (telNumber.startsWith("0") && telNumber.length === 11)
      return true;
    else {
      return false;
    }
  }
}
