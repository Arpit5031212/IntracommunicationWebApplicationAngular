import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../../services/group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent {

  constructor(private groupService: GroupService, private route: Router) { }

  createGroupForm = new FormGroup({
    groupName: new FormControl(''),
    groupType: new FormControl('0'),
    description: new FormControl(''),
  });


  createNewGroup() {
    if(this.createGroupForm.valid) {
      console.log(this.createGroupForm.value);
      const formData = {
        groupName: this.createGroupForm.get('groupName')?.value,
        groupType: this.createGroupForm.get('groupType')?.value,
        description: this.createGroupForm.get('description')?.value,
      }
      const id = localStorage.getItem("user-Id");
      if(id != null) {
        return this.groupService.createNewGroup(formData, parseInt(id)).subscribe({
          next: () => {
            console.log("Group created");
          },
          error: (error: any) => {
            console.error(error, "error block");
          }
        });
      }
      console.error("could not create group try again.")
      return null;
    }

  }

}
