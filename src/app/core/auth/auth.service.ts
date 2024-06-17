import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationDTO} from "../model/request/login.model";
import {Observable} from "rxjs";
import {AuthResponse} from "../model/response/auth-response.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url="http://localhost:8082/api/auth";

  isAuthenticated:boolean=false;

  constructor(private httpClient:HttpClient) {}

  login(authenticationDTO:AuthenticationDTO):Observable<AuthResponse> {
    this.isAuthenticated=true;
    return this.httpClient.post<AuthResponse>(this.url +"/authenticate", authenticationDTO);
  }

  logout()
  {
    this.isAuthenticated=false;
  }

  isauthenticated():boolean
  {
    return this.isAuthenticated;
  }

}
