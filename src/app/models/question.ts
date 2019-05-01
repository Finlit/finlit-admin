

export class OptionModel {
    isCorrect?: boolean = false;
   // isCorrect?: boolean;
    text?: string = '';
  }

export class Question {
    id?: number = null;
    label?: string= '';
    options?: OptionModel[]=[];
   
    constructor() { }
}
  
// export class OptionModel {
//     isCorrect?: boolean;
//     text?: string;
//   }
 
//  export class Question {
//     id?: number = null;
//     label?: string= '';
//     options?:[
//         {text?:string,isCorrect?: boolean},
//         {text?:string,isCorrect?: boolean},
//         {text?:string,isCorrect?: boolean},
//         {text?:string,isCorrect?: boolean},
//         {text?:string,isCorrect?: boolean}
//     ];
//     constructor() { }
//  }