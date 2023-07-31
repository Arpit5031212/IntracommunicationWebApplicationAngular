import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById(id: number): any {
    return this.http.get<any>(`${environment.baseUrl}/User/id?id=${id}`);
  }

  getSearchedUsers(userName: string): any {
    return this.http.get<any>(`${environment.baseUrl}/user/name?name=${userName}`);
  }

  updateUserProfile(userUpdateObj: any, id: number): any {
    return this.http.patch<any>(`${environment.baseUrl}/user/patch/${id}`, userUpdateObj);
  }

}
