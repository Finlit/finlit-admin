import { Injectable } from '@angular/core';
import { IApi } from '../shared/common/contracts/api';
import { User } from '../models/user';
import { GenericApi } from '../shared/common/generic-api';
import { Question } from '../models/question';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QuestionService {

    questions: IApi<Question>;

  constructor(http: HttpClient) {
    this.questions = new GenericApi<Question>('questions', http);
  }


}
