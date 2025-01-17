import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "../../login/login.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {ProfileComponent} from "./profile.component";

const routes: Routes = [
  {
    path: 'profile',component:ProfileComponent
  },
  {path: "edit-profile", component: EditProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
