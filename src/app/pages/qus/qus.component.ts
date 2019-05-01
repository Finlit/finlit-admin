import { Question } from '../../models/question';
import { QuestionService } from '../../services/question.service';
import { Page } from '../../shared/common/contracts/page';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';


@Component({
  selector: 'app-qus',
  templateUrl: './qus.component.html',
  styleUrls: ['./qus.component.css']
})
export class QusComponent implements OnInit {

  questions: Page<Question>;
  

 
  constructor(private questionService: QuestionService) {
    this.questions = new Page({
      api: questionService.questions
    
    });
    this.fetch();


   }

  ngOnInit() {
  }

  fetch() {
    this.questions.fetch();
  }
  _fetch(e) {
    console.log(e);
  }

  delete(id: number) {
    var isDelete = window.confirm('Are you sure want to delete ?')
    if (!isDelete) {
      return
    }
    this.questions.isLoading = true;
    this.questionService.questions.remove(id).then(() => { 
      this.questions.isLoading = false;
       this.fetch(); 
      });
  }



}
