import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {

  user: User;
  password: string;
  confirmPassword: string;
  isProcessing: boolean;
  error: string;
  hide: boolean = true;
  success:string = '';

  constructor(private bottomSheetRef: MatBottomSheetRef<ChangePassComponent>, private userService: UserService) {
    this.isProcessing = false;
    this.user = JSON.parse(localStorage.getItem('user')) as User;
   }

   changePass() {
    this.isProcessing = true;
    if (!this.password) {
      return alert('Please enter Password')
    }
    if (!this.confirmPassword) {
      return alert('Please enter confrim Password')
    }
    if (this.password != this.confirmPassword) {
      return alert('Password and confrim Password Should be same')
    }
    // this.isProcessing = true;
    this.error = '';
    this.success = '';
    this.userService.users.update(this.user.id, { password: this.password } as User).then(() => {
      this.isProcessing = false;
      this.success = 'Password has been changed successfully';
      this.closeBottomSheet();

    }).catch(err => {
      this.error = err;
      this.isProcessing = false;
      this.closeBottomSheet();
    });
  }
  closeBottomSheet() {
    this.bottomSheetRef.dismiss();
  }

  ngOnInit() {
  }

}
