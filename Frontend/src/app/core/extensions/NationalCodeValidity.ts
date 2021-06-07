export class NationalCodeValidity {


  static isValidNationalCode(nationalCode: string) {
    if (!/^\d{10}$/.test(nationalCode))
      return false;

    let check = parseInt(nationalCode[9]);
    let sum = 0;
    let i;
    for (i = 0; i < 9; ++i) {
      sum += parseInt(nationalCode[i]) * (10 - i);
    }
    sum %= 11;

    return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11);
  }

}
