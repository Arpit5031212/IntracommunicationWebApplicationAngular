import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userData: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserById();
  }

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    contact: new FormControl(''),
    addressLine1: new FormControl(''),
    addressLine2: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    permanentCity: new FormControl(''),
    permanentState: new FormControl(''),
    dob: new FormControl('')
  });

  getUserById(): any {
    const id = Number(localStorage.getItem("user-Id"));
    console.log(id);
    this.userService.getUserById(id).subscribe({
      next: (res: any) => {
        this.userData = res;
        console.log(res);
        this.profileForm.setValue({
          firstName: this.userData.firstName,
          lastName: this.userData.lastName,
          email: this.userData.email,
          contact: this.userData.contact,
          addressLine1: this.userData.addressLine1,
          addressLine2: this.userData.addressLine2,
          city: this.userData.city,
          state: this.userData.state,
          permanentCity: this.userData.permanentCity,
          permanentState: this.userData.permanentState,
          dob: this.userData.dob,
        })
      }
    })
  }

  updateUserProfile(): any {
    const id = Number(localStorage.getItem("user-Id"));
    
    this.userService.updateUserProfile(this.userData, id).subscribe({
      next: () => {
        console.log(this.userData, "profile updated")
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

}
