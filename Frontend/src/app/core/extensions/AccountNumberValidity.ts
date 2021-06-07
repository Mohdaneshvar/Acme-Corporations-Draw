export class AccountNumberValidity {


  static validate(accountNumber:string) {
    if(accountNumber)
    {
      var rgx = /^[0-9]*\.?[0-9]*$/;
      return accountNumber.match(rgx);
    }
  }

}
