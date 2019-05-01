import { Injectable } from '@angular/core';
import { IApi } from '../shared/common/contracts/api';
import { GenericApi } from '../shared/common/generic-api';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../models/blog';

@Injectable()
export class BlogService {

    blogs: IApi<Blog>;

  constructor(http: HttpClient) {
    this.blogs = new GenericApi<Blog>('blogs', http);
  }
}
