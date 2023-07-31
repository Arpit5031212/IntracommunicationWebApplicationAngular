import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { DataShareService } from '../../services/data-share.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {

  joinedGroupsIds: any[] = [];
  joinedGroupInfo: any[] = [];
  users: any[] = [];

  invitations: any[] = [];

  ngOnInit() {
    this.getJoinedGroupIds();
  }


  constructor(private groupService: GroupService, private authService: AuthService, private router: Router, private userService: UserService) { }


  searchUsers(userName: string) {
    this.userService.getSearchedUsers(userName).subscribe({
      next: (res: any) => {
        this.users = res;
        console.log(res);
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }
  //returns the ids of the groups joined by the logged in user
  getJoinedGroupIds(): any {
    const id = localStorage.getItem("user-Id")
    return this.groupService.getAllJoinedGroupIds(Number(id)).subscribe({
      next: (res: any) => {
        this.joinedGroupsIds = res;
        console.log(this.joinedGroupsIds);
      }, error: (error: any) => {
        console.error(error);
      }
    })
  }

  // returns the group info of the given group id.
  getJoinedGroupData(groupId: any): any {
    return this.groupService.getGroupById(groupId).subscribe({
      next: (res: any) => {
        this.joinedGroupInfo.push(res);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  // returns the group info of all the groups joined by user.
  viewAllGroups() {
    for (var i = 0; i < this.joinedGroupsIds.length; i++) {
      this.getJoinedGroupData(this.joinedGroupsIds[i].groupId);
    }
    console.log(this.joinedGroupInfo);
  }

  signout() {
    this.authService.logout();
    this.router.navigate(['home']);
  }

  sendGroupId(groupId: number) {
    this.router.navigate([`posts/${groupId}`])
  }

  showAllInvitations() {
    const userId = Number(localStorage.getItem("user-Id"))
    this.groupService.getAllGroupInvitations(userId).subscribe({
      next: (res: any) => {
        this.invitations = res;
        console.log(this.invitations);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  acceptInvitation(id: number) {
    this.groupService.acceptInvitation(id).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }






}
