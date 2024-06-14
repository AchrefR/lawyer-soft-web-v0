import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import {ProfileComponent} from "./profile.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    EditProfileComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
