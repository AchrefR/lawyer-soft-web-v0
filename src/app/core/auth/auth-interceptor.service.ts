import { Injectable } from '@angular/core';
import {TokenStorageService} from "./token-storage.service";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
const TOKEN_HEADER_KEY = "Authorization";
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.tokenService.getToken();
    if (token != null) {
      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, "Bearer " + token),
      });
    }
    return next.handle(authReq);
  }
}
