import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   hide = true;
   user: User = new User();
   isProcessing: boolean;
   loginForm: FormGroup
   isLoadig: boolean;

  constructor(
    private userService: UserService,
    private toastyService: ToastyService,
    private formBuilder: FormBuilder,
    private router: Router) { 
      this.isProcessing = false;
      this.initForm();
    }

    initForm() {
      this.loginForm = this.formBuilder.group({
        password: ['', [Validators.required]],
        email: ['', [Validators.required]],
      });
    }

    logIn() {
      this.isProcessing = true;
      this.userService.signIn.create(this.loginForm.value).then((data) => {
        if (!data.role || data.role.toLowerCase() != "admin") {
          return this.router.navigate(['/error'],{queryParams:{msg:"Only Admin Accessible !"}});
        }
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['./pages']);
       this.isProcessing = false;
      }).catch(err =>alert(err));
    }

  ngOnInit() {
  }

 


}
