import { Component, OnInit } from '@angular/core';
import { Blog } from '../../../models/blog';
import { Model } from '../../../shared/common/contracts/model';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BlogService } from '../../../services/blog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { MatDialog } from '@angular/material';
import { ImageEditComponent } from './image-edit/image-edit.component';


@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  blog: Model<Blog>;
  subscription: Subscription;
  postForm: FormGroup;
  //isLoadig: boolean;
  uploader: FileUploader;

  constructor(private blogService: BlogService,
    private frmBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog) {

    this.uploader = new FileUploader({
      itemAlias: 'image',
      queueLimit: 1,
      headers: [{ name: 'x-access-token', value: localStorage.getItem('token') }]
    });


    this.blog = new Model({
      api: blogService.blogs,
      properties: new Blog()
    });

    this.initForm();

    this.subscription = activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id !== 'new') {
        this.getPost(id);
      } else {
        this.blog.properties = new Blog();
      }
    });
  }

  openDialog(file: File): void {
    const dialogRef = this.dialog.open(ImageEditComponent, {
      width: '50%',
      data: { file: file }
    });

    dialogRef.afterClosed().subscribe(
      (file: File) => {
        this.uploader.clearQueue();
        if (file) {
          this.uploader.addToQueue([file]);
          if (this.blog.properties.id) {
            this.configureUploader(this.blog.properties.id);
          }
        }
      });

  }

  initForm() {
    this.postForm = this.frmBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  getPost(id: string) {
    this.blog.fetch(id);
  }
  configureUploader(id) {
    this.uploader.setOptions({ url: `api/blogs/upload/image/${id}` });

    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      this.uploader.clearQueue();
      let res = JSON.parse(response);
      if (!res.isSuccess) {
        return alert({ title: 'Error', msg: 'Image upload failed' });
      }
     // this.blog.isProcessing = false;
      this.router.navigate(['/pages/blog']);
    };
    //this.blog.isProcessing = true;
    setTimeout(() => {
      this.uploader.queue[0].upload();
    }, 1);
  }

  chooseImg(event: any) {
    if (event && event.target && event.target.files && event.target.files[0]) {
      let file: File = event.target.files[0];
      if (file.size > 1 * 1024 * 1024) {
        return alert('Image Size should be less than or equal to 1MB');
      }
      this.openDialog(file);
    }

  }

  save() {
    if (!this.blog.properties.id) {
      if (!this.uploader.queue[0]) {
        return alert(`Please Choose Image to porceed`);
      }
    }

    this.blog.isProcessing = true;
    return this.blog.save().then(() => {
      if (this.uploader.queue[0]) {
        this.configureUploader(this.blog.properties.id)
      } else {
        this.router.navigate(['/pages/blog']);
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
