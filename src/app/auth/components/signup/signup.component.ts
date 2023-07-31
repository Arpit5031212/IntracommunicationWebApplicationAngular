import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from 'src/app/shared/password.validator';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  hide: boolean = true;

  constructor(private authService: AuthService, private router: Router) { }

  signupForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    contact: new FormControl('', Validators.required),
    addressLine1: new FormControl('', Validators.required),
    addressLine2: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    permanentCity: new FormControl('', Validators.required),
    permanentState: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
  }, {validators: passwordValidator});

  OnSignup(): any {
    if(this.signupForm.valid) {
      console.log(this.signupForm.value);
      const userData = {
        firstName: this.signupForm.get('firstName')?.value,
        lastName: this.signupForm.get('lastName')?.value,
        email: this.signupForm.get('email')?.value,
        contact: this.signupForm.get('contact')?.value,
        addressLine1: this.signupForm.get('addressLine1')?.value,
        addressLine2: this.signupForm.get('addressLine2')?.value,
        city: this.signupForm.get('city')?.value,
        state: this.signupForm.get('state')?.value,
        permanentCity: this.signupForm.get('permanentCity')?.value,
        permanentState: this.signupForm.get('permanentState')?.value,
        password: this.signupForm.get('password')?.value,
      };
      this.signupForm.reset();
      return this.authService.signup(userData).subscribe({
        next: () => {
          console.log("registration successful");
          this.router.navigate(['/auth/signIn']);
        },
        error: (error) => {
          console.error("registration failed, please try again");
          this.router.navigate(['/auth/signup']);
        }
      })
    }
  }
}
