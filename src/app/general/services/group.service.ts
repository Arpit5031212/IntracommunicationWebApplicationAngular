import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor( private http: HttpClient ) { }

  getAllJoinedGroupIds(params: any): any {
    //const queryParams = new HttpParams(params);
    return this.http.get<any>(`${environment.baseUrl}/Group/joined?userid=${params}`);
  }

  getGroupById(params: any): any {
  // const queryParams = new HttpParams(params);
  return this.http.get<any>(`${environment.baseUrl}/Group/searchById?groupId=${params}`);
  }

  createNewGroup(newGroupObj: any, params: number): any {
    // const queryParams = new HttpParams(params);
    return this.http.post<any>(`${environment.baseUrl}/Group/create?adminid=${params}`, newGroupObj);
  }

  sendGroupJoinRequest(requestObj: any): any {
    return this.http.post<any>(`${environment.baseUrl}/Group/add-member-request`, requestObj);
  }

  getAllGroupInvitations(id: number): any {
    return this.http.get<any>(`${environment.baseUrl}/Group/invites?userId=${id}`);
  }

  acceptInvitation(id: number): any {
    return this.http.post<any>(`${environment.baseUrl}/Group/accept-invitation?inviteId=${id}`, id);
  }

  
}
