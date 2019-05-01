// import { CreditService } from '../CreditCard/CreditService';
export class ValidationService {
    static cardNumber: string;
  
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
      let config = {
        'required': 'Required',
        'min': `Minimum value required ${validatorValue.min ? validatorValue.min : ''}`,
        'max': `Maximum value should be ${validatorValue.max ? validatorValue.max : ''}`,
        'maxlength': 'Enter a valid number',
        'minlength': 'Enter a valid number',
        'invalidName': 'Enter a valid name',
        'invalidEmailAddress': 'Invalid email address',
        'email': 'Invalid email address',
        'invalidPassword': 'Invalid password. Password must be of at least 6 characters long and should contain a number',
        'invalidNumber': 'Enter positive numeric values only',
        'invalidPhoneNumber': 'Enter a valid phone number',
        'invalidCardNumber': 'Please enter a valid credit/debit card number',
        'invalidCVVNumber': 'Enter a valid CVV code',
        'invalidCardExpiry': 'Invalid expiry date',
        'invalidUrl': 'Enter a valid url starting with http://',
        'invalidTaxId': 'Enter a valid TaxId',
        'invalidFaxNumber': 'Enter a valid fax number',
        'invalidZip': 'Please enter a valid zip code',
        'invalidInput': 'Please enter a valid input',
        'invalidGoal': 'Please enter valid goal. '
      };
      return config[validatorName];
    }
  
    static spaceValidator(control: any) {
      // RFC 2822 compliant regex
      if (control.value) {
        let str = control.value.replace(/\s+/g, '');
        if (str.length > 0) {
          return null;
        } else {
          return { 'invalidInput': true };
        }
      }
    }
  
    static fullNameValidator(control: any) {
      // RFC 2822 compliant regex
      if (control.value) {
        let str = control.value.replace(/\s+/g, '');
  
        if (control.value.match(/^([a-z])+([a-zA-Z0-9 .,-@&#!\'\\$\\s]*)$/i) && str.length > 0) {
          return null;
        } else {
          return { 'invalidName': true };
        }
      }
    }
  
    static nameValidator(control: any) {
      // RFC 2822 compliant regex
      if (control.value) {
        let str = control.value.replace(/\s+/g, '');
  
        if (control.value.match(/^([a-z])+([a-zA-Z0-9 .,-@&#!\'\\$\\s]*)$/i) && str.length > 0) {
          return null;
        } else {
          return { 'invalidName': true };
        }
      }
    }
  
    static zipValidator(control: any) {
      // RFC 2822 compliant regex
      if (control.value) {
        if (control.value.match(/^\d{5}([\-]?\d{4})?$/)) {
          return null;
        } else if (control.value.match(/^\d{6}$/)) {
          return null;
        } else {
          return { 'invalidZip': true };
        }
      }
    }
  
    static urlValidator(control: any) {
      // RFC 2822 compliant regex
      if (control.value) {
        if (control.value.match(/^http(s)?:\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)) {
          return null;
        } else {
          return { 'invalidUrl': true };
        }
      }
    }
  
    static websiteValidator(control: any) {
      // RFC 2822 compliant regex
      if (control.value) {
        if (control.value.match(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/)) {
          return null;
        } else {
          return { 'invalidUrl': true };
        }
      }
    }
  
    static facboolUrlValidator(control: any) {
      // RFC 2822 compliant regex
      if (control.value) {
        if (control.value.match(/^(https?:\/\/)?((w{3}\.)?)facebook.com\/.*/i)) {
          return null;
        } else {
          return { 'invalidUrl': true };
        }
      }
    }
  
    static twitterUrlValidator(control: any) {
      // RFC 2822 compliant regex
      if (control.value) {
        if (control.value.match(/^(https?:\/\/)?((w{3}\.)?)twitter\.com\/(#!\/)?[a-z0-9_]+$/i)) {
          return null;
        } else {
          return { 'invalidUrl': true };
        }
      }
    }
  
    static emailValidator(control: any) {
      // RFC 2822 compliant regex
      if (control.value) {
        if (control.value.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|glass|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i)) {
          return null;
        } else {
          return { 'invalidEmailAddress': true };
        }
      }
    }
  
    static emaiListValidator(control: any) {
      // RFC 2822 compliant regex
      if (control.value) {
        if (control.value.match(/^(\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]{2,5}\s*?,?\s*?)+$/)) {
          return null;
        } else {
          return { 'invalidEmailAddress': true };
        }
      }
    }
  
    static taxIdValidator(control: any) {
      // RFC 2822 compliant regex
      if (control.value) {
        if (control.value.match(/^([0-9]|[a-z])+([0-9a-z-]+)$/i)) {
          return null;
        } else {
          return { 'invalidTaxId': true };
        }
      }
    }
  
    static numberValidator(control: any) {
      if (control.value) {
        if (control.value.toString() && control.value.toString().match(/^[0-9]*$/)) {
          return null;
        } else {
          return { 'invalidNumber': true };
        }
      }
    }
  
    static goalValidator(control: any) {
      if (control.value) {
        if (control.value.toString() && control.value.toString().match(/^[1-9][0-9]*$/)) {
          return null;
        } else {
          return { 'invalidGoal': true };
        }
      }
    }
  
    static phoneNumberValidator(control: any) {
      if (control.value) {
        if (control.value.match(/^\d{10}$/)) {
          return null;
        } 
        else if (control.value.match(/^(\+\d{1,3}[- ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) {
          return null;
        } else if (control.value.match(/^(\+\d{1,3}[- ]?)?\(?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/)) {
          return null;
        } else {
          return { 'invalidPhoneNumber': true };
        }
      }
    }
  
    
    static phoneNumberWithoutDialCodeValidator(control: any) {
      if (control.value) {
        if (control.value.match(/^\d{5,15}$/)) {
          return null;
        } else {
          return { 'invalidPhoneNumber': true };
        }
      }
    }
  
    static faxNumberValidator(control: any) {
      if (control.value) {
        if (control.value.match(/^\d{10}$/)) {
          return null;
        } else if (control.value.match(/^(\+\d{1,3}[- ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) {
          return null;
        } else if (control.value.match(/^(\+\d{1,3}[- ]?)?\(?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/)) {
          return null;
        } else {
          return { 'invalidFaxNumber': true };
        }
      }
    }
  
    static setCardNumber(cardNumber: string) {
      this.cardNumber = cardNumber;
    }
  
    static getCardNumber(): string {
      return this.cardNumber;
    }
  
    static passwordValidator(control: any) {
      // {6,100}           - Assert password is between 6 and 100 characters
      // (?=.*[0-9])       - Assert a string has at least one number
      if (control.value) {
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
          return null;
        } else {
          return { 'invalidPassword': true };
        }
      }
    }
  
    // static creditCardNumberValidator(control: any) {
    //   if (control.value) {
    //     let creditService = new CreditService();
    //     if (creditService.validateCardNumber(control.value)) {
    //       ValidationService.setCardNumber(control.value);
    //       return null;
    //     } else {
    //       ValidationService.setCardNumber(null);
    //       return { 'invalidCardNumber': true };
    //     }
    //   }
    // }
  
    // static creditCardCVVNumberValidator(control: any) {
  
    //   if (control.value) {
    //     let creditService = new CreditService();
    //     if (creditService.validateCardNumber(ValidationService.getCardNumber())) {
    //       if (creditService.validateCardCVC(control.value,
    //         creditService.parseCardType(ValidationService.getCardNumber()))) {
    //         return null;
    //       } else {
    //         return { 'invalidCVVNumber': true };
    //       }
    //     }
    //   }
    // }
  
    // static creditCardExpiryDateValidator(control: any) {
    //   let creditService = new CreditService();
    //   if (control.value) {
    //     let partsOfStr = control.value.split('/');
    //     if (creditService.validateCardExpiry(partsOfStr[0], partsOfStr[1])) {
    //       return null;
    //     } else {
    //       return { 'invalidCardExpiry': true };
    //     }
    //   }
    // }
  
    /*
     ZIP CODES
     "US"=>"^\d{5}([\-]?\d{4})?$",
     "UK"=>"^(GIR|[A-Z]\d[A-Z\d]??|[A-Z]{2}\d[A-Z\d]??)[ ]??(\d[A-Z]{2})$",
     "DE"=>"\b((?:0[1-46-9]\d{3})|(?:[1-357-9]\d{4})|(?:[4][0-24-9]\d{3})|(?:[6][013-9]\d{3}))\b",
     "CA"=>"^([ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ])\ {0,1}(\d[ABCEGHJKLMNPRSTVWXYZ]\d)$",
     "FR"=>"^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$",
     "IT"=>"^(V-|I-)?[0-9]{5}$",
     "AU"=>"^(0[289][0-9]{2})|([1345689][0-9]{3})|(2[0-8][0-9]{2})|(290[0-9])|(291[0-4])|(7[0-4][0-9]{2})|(7[8-9][0-9]{2})$",
     "NL"=>"^[1-9][0-9]{3}\s?([a-zA-Z]{2})?$",
     "ES"=>"^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$",
     "DK"=>"^([D|d][K|k]( |-))?[1-9]{1}[0-9]{3}$",
     "SE"=>"^(s-|S-){0,1}[0-9]{3}\s?[0-9]{2}$",
     "BE"=>"^[1-9]{1}[0-9]{3}$",
     "IN"=>"^\d{6}$"
     */
  }
  