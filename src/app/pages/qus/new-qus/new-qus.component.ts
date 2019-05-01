import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Model } from '../../../shared/common/contracts/model';
import { Subscription } from 'rxjs';
import { QuestionService } from '../../../services/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, OptionModel } from '../../../models/question';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-new-qus',
  templateUrl: './new-qus.component.html',
  styleUrls: ['./new-qus.component.css']
})
export class NewQusComponent implements OnInit {

  question: Model<Question>;
  userForm: FormGroup;
 
  subscription: Subscription;
  isLoading: boolean;
  Question: Question = new Question();
   data: any;
   isCorrect?: boolean = false;
   text?: string

  constructor(private questionService: QuestionService,
    private frmBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    // this.isLoading = false;
    this.question = new Model({
      api: questionService.questions,
      properties: new Question()
    });

    this.initForm();

    this.subscription = activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'new') {
        this.getquestion(id);
      } else {
        this.question.properties = new Question();
        this.question.properties.options = [new OptionModel(), new OptionModel(), new OptionModel(), new OptionModel(), new OptionModel()]
      }
    });

  }

  onchnage(option,index){
    //this.question.properties.options.forEach(i=>i.isCorrect = false);
    option.isCorrect =true;
   

  }

 
  initForm() {
    this.userForm = this.frmBuilder.group({
      label: ['', [Validators.required]],
      optionId_0: ['', [Validators.required]],
      optionId_1: ['', [Validators.required]],
      optionId_2: ['', [Validators.required]],
      optionId_3: ['', [Validators.required]],
      optionId_4: ['', [Validators.required]],
     
      isCorrect: ['', [Validators.required]],
      // isCorrect_1: ['', [Validators.required]],
      // isCorrect_2: ['', [Validators.required]],
      // isCorrect_3: ['', [Validators.required]],
      // isCorrect_4: ['', [Validators.required]],
    });
  }

  getquestion(id: string) {
    this.question.fetch(id);
  }

  create(option) {
    this.isLoading = true;
    // this.data = [
    //   { text: option.optionId, isCorrect: option.isCorrect },
    //   { text: option.optionId_1, isCorrect: option.isCorrect_1 },
    //   { text: option.optionId_2, isCorrect: option.isCorrect_2 },
    //   { text: option.optionId_3, isCorrect: option.isCorrect_3 },
    //   { text: option.optionId_4, isCorrect: option.isCorrect_4 }
    //   //isCorrect:option.optionId
    // ]
    
   
    //   if (!option.optionId_0) {
    //   return alert(`Please Enter text option to proceed`);
    // }

    // if (!option.optionId_1) {
    //   return alert(`Please Enter text option to proceed`);
    // }
    // if (!option.optionId_2) {
    //   return alert(`Please Enter text option to proceed`);
    // }

    // if (!option.optionId_3) {
    //   return alert(`Please Enter text option to proceed`);
    // }

    // if (!option.optionId_4) {
    //   return alert(`Please Enter text option to proceed`);
    // }


    // if (!option.optionId_5) {
    //   return alert(`Please Enter text option to proceed`);
    // }

    if (this.question.properties.id) {
      return this.question.update().then(() => {
        this.router.navigate(['/pages/qus']);
      });
    }
    this.question.isProcessing = true;
    this.question.save().then(() => {
      this.isLoading = false;
      this.router.navigate(['/pages/qus']);
    });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}