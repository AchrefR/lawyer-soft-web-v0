import { Injectable } from '@angular/core';
const TOKEN_KEY = "auth-token";
const USER_KEY = "auth-user";
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  signOut() {
    window.localStorage.clear();
  }
  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string|null {

    return localStorage.getItem(TOKEN_KEY);
  }


  public saveUser(user:any) {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser():any {

    return localStorage.getItem(JSON.parse(USER_KEY));
  }

}
