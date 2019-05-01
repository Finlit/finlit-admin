
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Page } from '../../shared/common/contracts/page';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { Model } from '../../shared/common/contracts/model';
import { ActivatedRoute, Router } from '@angular/router';
import {PageEvent} from '@angular/material';
import { AlertService, AlertProps } from '../../shared/alert/alert.service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  isEdit: boolean = false;
  users: Page<User>;
  user: Model<User>;
  alert: AlertProps;
  pageEvent: PageEvent;
  @ViewChild('userEditFprm') userEditFprm:TemplateRef<any>

 
  constructor(private userService: UserService, private router: Router,private alertService: AlertService
    ,private toastyService: ToastyService,private _formBuilder: FormBuilder) {
      this.users = new Page({
        api: userService.users,
        filters: [{
          field: 'status',
          value: ''
        }]
      });
      this.fetch();
  
      this.user = new Model({
        api: userService.users,
        properties: new User()
      });
     }  

  ngOnInit() {
  
  }

  fetch() {
    this.users.fetch();
  }

  _fetch(e) {
    console.log(e);
  }

  edit(user?: User) {
    this.alert = this.alertService._appendComponentToBody({ templateRef: this.userEditFprm, header: 'TEST', subheader: 'sub' });
    this.alert.open();
    if (user) {
      this.user.properties = Object.assign({}, user);
     
    };
    this.isEdit = true;
  }

  save(user?: User) {
    if (user) {
      this.user.properties = user;
    }
     this.user.save().then(() => {
      this.fetch();
      this.cancel();
    }).catch();

  }

  update(user: User) {
    this.users.isLoading = true;
    this.userService.users.update(user.id, user).then(() => {
      this.users.isLoading = false;
      this.fetch();
    }).catch(err => alert(JSON.stringify(err)))
  }
  
  delete(id: number) {
    var isDelete = window.confirm('Are you sure want to delete ?')
    if (!isDelete) {
      return
    }
    this.users.isLoading = true;
    this.userService.users.remove(id).then(() => { this.users.isLoading = false; this.fetch(); });
  }

  cancel() {
  
    this.isEdit = false;
    this.user.properties = new User();
    this.alert.close();
  }

}
