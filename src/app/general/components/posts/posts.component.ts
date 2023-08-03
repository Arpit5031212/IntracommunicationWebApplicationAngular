import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { DataShareService } from '../../services/data-share.service';
import { GroupService } from '../../services/group.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  // isLiked: boolean = false;
  loading: boolean = true;

  posts: any[] = [];
  groupId!: number;
  comments: any[] = [];
  searchedUsers: any[] = [];
  groupMembers: any[] = [];

  userId: number = Number(localStorage.getItem("user-Id"));

  constructor(private postsService: PostsService, private router: ActivatedRoute, private userService: UserService, private groupService: GroupService) {}

  ngOnInit(): void {
    this.viewAllPostsInGroup(this.groupId);
  }

  searchUser(name: any): any {
    this.userService.getSearchedUsers(name).subscribe({
      next: (res: any) => {
        this.searchedUsers = res;
        
        console.log(this.searchedUsers)
      },
      error: (error: any) => {
        console.log("user not found, try again", error);
      }
    })
  }

  getAllMembers() {
    this.postsService.getAllGroupMembers(this.groupId).subscribe({
      next: (res: any) => {
        this.groupMembers = res;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  // removemember(memberId: number) {
    
  // }


  addGroupMember(memberId: any) {
    const groupId = this.groupId;
    const requestObj = {memberId, groupId}
    this.groupService.sendGroupJoinRequest(requestObj).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: any) => {
        console.log(error);
      }
      
    })
  }
  

  getGroupIdFromRoute() {
    this.router.params.subscribe({
      next: (params: any) => {
        this.groupId = Number(params['id']);
      }
    })
  }

  addPost(postDescription: any): any {
    console.log("button clicked");
    const postedBy = localStorage.getItem("user-Id");
    const postedOnGroup = this.groupId;
    const postObj = {postDescription, postedBy, postedOnGroup};
    this.postsService.addPost(postObj).subscribe({
      next: (res: any) => {
        console.log(res);
      }
    });
  }

  viewAllPostsInGroup(groupId: number) {
    this.getGroupIdFromRoute();
    this.postsService.getAllPostsInGroup(this.groupId).subscribe({
      next: (res: any) => {
        this.posts = res;
        this.loading = false;
      },
      error: (error: any) => {
        console.error("cant fetch posts", error);
        this.loading = false;
      }
    })
  }

  like(postId: number) {
    // this.isLiked = !this.isLiked;
    this.postsService.likePost(this.userId, postId).subscribe({
      next: () => {
        console.log("post Liked");
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

  addComment(commentDescription: any, postId: number): any {
    const commentedBy = Number(localStorage.getItem("user-Id"));
    const commentObj = {commentDescription, commentedBy, postId}
    this.postsService.addComment(commentObj).subscribe({
      next: () => {
        console.log("comment added");
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  viewAllComments(postId: any) {
    this.postsService.getAllComments(postId).subscribe({
      next: (res) => {
        this.comments = res;
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  deleteComment(commentId: any) {
    const userId = Number(localStorage.getItem("user-Id"));
    this.postsService.deleteComment(commentId, userId).subscribe({
      next: (res: any) => {
        console.log(res.message);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  deletePost(postId: number) {
    const userId = Number(localStorage.getItem("user-Id"));
    this.postsService.deletePost(postId, userId).subscribe({
      next: (res: any) => {
        console.log(res.message);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

}
