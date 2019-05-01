import { Component, OnInit } from '@angular/core';
import { Model } from '../../../shared/common/contracts/model';
import { User } from '../../../models/user';
import { Subscription } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: Model<User>;
  subscription: Subscription;
  uploader: FileUploader;
  postForm: FormGroup;
  constructor( private frmBuilder: FormBuilder,
    private userService: UserService,
   private router: Router,
   private activatedRoute: ActivatedRoute) { 
    this.user = new Model({
      api: userService.users,
      properties: new User()
    });

    this.initForm();


    this.subscription = activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'new') {
        this.getuser(id);
      } else {
        this.user.properties = new User();
      }
    });
  }
    initForm() {
      this.postForm = this.frmBuilder.group({
        name: ['', [Validators.required]],
        aboutUs: ['', [Validators.required]],
        role: ['', [Validators.required]],
        email: ['', [Validators.required]],
        ageGroup: ['', [Validators.required]],
        status: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        question: ['', [Validators.required]],
      });
    }
  
    getuser(id: string) {
      this.user.fetch(id);
    }
  
    
  create() {
  
    // if (!this.bar.properties.state.id) {
    //   return alert(`Please Select state to proceed`);
    // }
  
    if (this.user.properties.id) {
      return this.user.update().then(() => {
        this.router.navigate(['/pages/users']);
      });
    }
    this.user.save().then(() => {
      this.router.navigate(['/pages/users']);
    });
  }
  
    ngOnInit() {
    }
  
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
  }

