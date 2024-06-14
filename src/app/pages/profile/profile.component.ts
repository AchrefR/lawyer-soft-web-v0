import {Component, OnInit} from '@angular/core';
import {User} from "../../core/model/user.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements  OnInit{

  userItem:any=localStorage.getItem('auth-user')

  user!:User;

  ngOnInit() {
    const user=JSON.parse(this.userItem);
    this.user={
      id:user.id,
      firstName:user.firstName,
      lastName:user.lastName,
      email:user.email,
      role:user.role,
      accesses:user.accesses,
      lawyerId:user.lawyerId,
      enabled:user.enabled
    }
  }

  constructor() {
  }

}
