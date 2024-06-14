import { Component, OnInit, EventEmitter, Output, Inject, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../core/auth/token-storage.service';

// Language

import {User} from "../../core/model/user.model";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  userItem:any=localStorage.getItem("auth-user");

  user!:User;

  ngOnInit() {

    const userObject=JSON.parse(this.userItem)

    this.user={
      id:userObject.id,
      firstName:userObject.firstName,
      lastName:userObject.lastName,
      email:userObject.email,
      role:userObject.role,
      accesses:userObject.accesses,
      lawyerId:userObject.lawyerId,
      enabled:userObject.enabled
    }

    console.log("user : ",this.user)
  }

  constructor(private router:Router,private tokenStorageService:TokenStorageService) {
  }

  logout()
  {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);
  }

}
