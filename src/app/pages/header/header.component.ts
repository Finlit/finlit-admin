import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { Page } from '../../shared/common/contracts/page';
import { UserService } from '../../services/user.service';
import { MatBottomSheet } from '@angular/material';
import { ChangePassComponent } from '../../modals/change-pass/change-pass.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class AppHeaderComponent {
  user: User;
  
  constructor(private router: Router, private userService: UserService, private bottomSheet: MatBottomSheet) { 
    this.user = JSON.parse(localStorage.getItem('user')) as User;

  }

  ngOnInit() {
  }

  logOut() {
    window.localStorage.clear();
    this.router.navigate(['/signin']);
  }

  openBottomSheet(): void {
    this.bottomSheet.open(ChangePassComponent, { disableClose: true});
  }


}
