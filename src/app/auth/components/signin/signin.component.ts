import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  hide: boolean = true;

  constructor(private authService: AuthService, private router: Router) { }

  signinForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
  })

  onSignin(): any {
    if(this.signinForm.valid) {
      console.log(this.signinForm.value);
      return this.authService.signin(this.signinForm.value).subscribe({
        next: (res) => {
          console.log("login Successful", res);
          this.router.navigate(['nav']);
        },

        error: (error) => {
          console.error('Login failed:', error);
        }
      });
    }
  }
}
