import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { SigninModel } from 'src/models/DataModels';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey: string = "jwt-token";
  private userId: string = "user-Id"

  constructor(private httpClient: HttpClient) { }

  signin(signinObj: any) {
    return this.httpClient.post<any>(`${environment.baseUrl}/account/signin`, signinObj).pipe(tap(response => {
      if(response && response.token) {
        const jwt = response.token.token;
        this.saveToken(jwt);
        this.saveId(response.id);
      }
    }));
  }

  signup(signupObj: any) {
    return this.httpClient.post<any>(`${environment.baseUrl}/account/signup`, signupObj);
  }

  logout() {
    this.removeToken();
    localStorage.removeItem(this.userId);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  saveId(id: number) {
    localStorage.setItem(this.userId, id.toString());
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }
}
