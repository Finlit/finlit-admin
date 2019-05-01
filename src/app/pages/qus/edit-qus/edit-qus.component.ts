import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Model } from '../../../shared/common/contracts/model';
import { Subscription } from 'rxjs';
import { QuestionService } from '../../../services/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../../../models/question';
import { ToastyService } from 'ng2-toasty';


@Component({
  selector: 'app-edit-qus',
  templateUrl: './edit-qus.component.html',
  styleUrls: ['./edit-qus.component.css']
})
export class EditQusComponent implements OnInit {

  question: Model<Question>;
  userForm: FormGroup;
  subscription: Subscription;
  isNew: boolean = false;

  constructor(private questionService: QuestionService,
    private frmBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) { 

      this.question = new Model({
        api: questionService.questions,
        properties: new Question()
      });
  
      this.initForm();
  
      this.subscription = activatedRoute.params.subscribe(params => {
        const id = params['id'];
        //this.isNew = id == 'new';
        if (id !== 'new') {
          this.getquestion(id);
        } else {
          this.question.properties = new Question();
        }
      });
      //this.initForm();
    }

    onchnage(option,index){
      this.question.properties.options.forEach(i=>i.isCorrect = false);
      option.isCorrect =true;
    }

    
    initForm() {
      
      this.userForm = this.frmBuilder.group({
        label: ['', [Validators.required]],
        
      });
    }

  getquestion(id: string) {
    this.question.fetch(id);
  }


  create() {

    if (this.question.properties.id) {
      return this.question.update().then(() => {
        this.router.navigate(['/pages/qus']);
      });
    }
    this.question.isProcessing = true;
    this.question.save().then(() => {
      this.router.navigate(['/pages/qus']);
    });
  }

ngOnInit() {
}
ngOnDestroy() {
  this.subscription.unsubscribe();
}


}
