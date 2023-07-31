import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getAllPostsInGroup(groupId: number): any {
    return this.http.get<any>(`${environment.baseUrl}/posts/group/${groupId}`);
  }

  likePost(userId: number, postId: number): any {
    const likePostObj =  {userId, postId}
    return this.http.post<any>(`${environment.baseUrl}/posts/like`, likePostObj);
  }

  addPost(postObj: any): any {
    return this.http.post<any>(`${environment.baseUrl}/posts/add`, postObj);
  }

  addComment(commentObj: any) {
    return this.http.post<any>(`${environment.baseUrl}/posts/comment`, commentObj);
  }

  getAllComments(postId: any) {
    return this.http.get<any>(`${environment.baseUrl}/posts/comments/all?postId=${postId}`);
  }

  deleteComment(commentId: any) {
    return this.http.delete<any>(`${environment.baseUrl}/posts/delete-comment/${commentId}`);
  }

}
