import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Access} from "../model/access.model";

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  url="http://localhost:8082/api/accesses"

  constructor(private httpClient:HttpClient) { }

  findAllAccesses()
  {
    return this.httpClient.get<Access[]>(this.url+"/")
  }

}
