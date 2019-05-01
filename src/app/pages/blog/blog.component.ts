

import { Component, OnInit } from '@angular/core';
import { Blog } from '../../models/blog';
import { Page } from '../../shared/common/contracts/page';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogs: Page<Blog>;

  constructor(private blogService: BlogService) { 

    this.blogs = new Page({
      api: blogService.blogs,
      serverPaging: false
     });
     this.fetch();
  }
  ngOnInit() {
  }

  fetch() {
     this.blogs.fetch();
    
  }
  delete(id: number) {
    var isDelete = window.confirm('Are you sure want to delete ?')
    if (!isDelete) {
      return
    }
    this.blogs.isLoading = true;
    this.blogService.blogs.remove(id).then(() => {
      this.blogs.isLoading = false;
      this.fetch();
    });
  }
}