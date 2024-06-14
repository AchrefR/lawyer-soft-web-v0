import {Component, OnInit} from '@angular/core';
import {User} from "../../../core/model/user.model";
import {FormBuilder} from "@angular/forms";
import {UserProfileService} from "../../../core/services/user.service";
import {UpdateAgentDTO} from "../../../core/model/request/updateAgent.model";
import {UpdateLawyerDTO} from "../../../core/model/request/updateLawyer.model";
import {AuthService} from "../../../core/auth/auth.service";
import {TokenStorageService} from "../../../core/auth/token-storage.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {

    userItem: any = localStorage.getItem('auth-user')

    user!: User;

    updateUserForm: any;

    accessesIds: string[] = [];

    constructor(private formBuilder: FormBuilder,
                private userService: UserProfileService,
                private tokenServiceStorage:TokenStorageService,
                private router:Router) {}

    ngOnInit() {
        const user = JSON.parse(this.userItem);
        this.user = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            accesses: user.accesses,
            lawyerId: user.lawyerId,
            enabled: user.enabled
        }
        this.updateUserForm = this.formBuilder.group({
            firstName: [this.user.firstName],
            lastName: [this.user.lastName],
            email: [this.user.email]
        })
    }

    updateUser() {
        const firstName = this.updateUserForm.get(['firstName']).value;
        const lastName = this.updateUserForm.get(['lastName']).value;
        const email = this.updateUserForm.get(['email']).value;
        console.log("first name", firstName);
        console.log("last name", lastName);
        console.log("email name", email);


        this.user.accesses.forEach((access) => {
            this.accessesIds.push(access.id);
        })

        if (this.user.role.name == 'AGENT') {
            const updateAgentDTO: UpdateAgentDTO = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                accessesIds: this.accessesIds,
                lawyerId: this.user.lawyerId
            }
            this.userService.updateAgent(this.user.id, updateAgentDTO).subscribe((result) => {
              this.tokenServiceStorage.saveUser(result);
              this.router.navigate(['/profile/profile'])
            })

      } else if (this.user.role.name == 'LAWYER') {
            const updateLawyerDTO: UpdateLawyerDTO = {
                firstName: firstName,
                lastName: lastName,
                email: email,
            }
            this.userService.updateLawyer(this.user.id, updateLawyerDTO).subscribe((result) => {
              this.tokenServiceStorage.saveUser(result);
              this.router.navigate(['/profile/profile'])
            })
        }
    }
}
