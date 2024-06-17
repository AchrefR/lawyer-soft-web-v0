import {Component, OnInit, TemplateRef} from '@angular/core';
import {User} from "../../core/model/user.model";
import {UserProfileService} from "../../core/services/user.service";
import {Router} from "@angular/router";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder, FormControlName, Validators} from "@angular/forms";
import {Access} from "../../core/model/access.model";
import {AccessService} from "../../core/services/access.service";
import {AddAgentDTO} from "../../core/model/request/addAgent.model";
import {AddLawyerDTO} from "../../core/model/request/addLawyer.model";
import {UpdateAgentDTO} from "../../core/model/request/updateAgent.model";
import {UpdateLawyerDTO} from "../../core/model/request/updateLawyer.model";
import Swal from "sweetalert2";
import {StrongPasswordRegx} from "./regex-patterns";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

    addAgentForm: any;

    listUsers!: User[];

    modalRef?: BsModalRef;

    allAccesses!: Access[];

    accessesHalfOne: Access[] = [];

    accessesHalfTwo: Access[] = [];

    accessesChose: string[] = [];

    allLawyers!: User[];

    IdLawyerChose!: string;

    addLawyerForm: any;

    editLawyerForm: any;

    editAgentForm: any;

    lawyerChose!: User;

    modalData!: User;

    lawyerOfUserDetails!: User;

    submitted:boolean=false;

    constructor(
        private userService: UserProfileService,
        private router: Router,
        private modalService: BsModalService,
        private formBuilder: FormBuilder,
        private accessService: AccessService,
    ) {
    }

    ngOnInit() {
        this.userService.findAllUsers().subscribe((users) => {
            this.listUsers = users;
            console.log("voila la liste des utilisatuers :", this.listUsers)
        })
        this.userService.finAllLawyers().subscribe((result) => {
            this.allLawyers = result;

        })
    }

    openAgentModal(template: TemplateRef<void>) {
        this.accessService.findAllAccesses().subscribe((result) => {
            this.allAccesses = result;
            this.accessesHalfOne.splice(0, this.accessesHalfOne.length)
            this.accessesHalfTwo.splice(0, this.accessesHalfTwo.length)
            for (let i = 0; i < this.allAccesses.length; i++) {
                if (i <= 20) {

                    this.accessesHalfOne.push(this.allAccesses[i])
                } else {

                    this.accessesHalfTwo.push(this.allAccesses[i])
                }
            }
        })
        this.modalRef = this.modalService.show(template, {});
        this.addAgentForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.min(3)]],
            lastName: ['', [Validators.required, Validators.min(3)]],
            email: ['', [Validators.email, Validators.required]],
            password: ['', [Validators.required,Validators.pattern(StrongPasswordRegx)]],
            lawyer: ['', [Validators.required]]
        });
        this.modalRef.onHide?.subscribe(() => {
            this.userService.findAllUsers().subscribe((result) => {
                this.listUsers = result;
            })
        })
    }

    addAccess(accessChose: string) {
        if (this.accessesChose.indexOf(accessChose) == -1) {
            this.accessesChose.push(accessChose)
        } else {
            this.accessesChose.splice(this.accessesChose.indexOf(accessChose), 1)
        }
    }

    addAgent(): void {
        this.submitted=true;
        const lawyer: string = this.addAgentForm.get(['lawyer']).value;
        this.allLawyers.forEach((lawyer) => {
            if (lawyer.firstName == lawyer.firstName) {
                this.IdLawyerChose = lawyer.id;
            }
        })
        const firstName: string = this.addAgentForm.get(['firstName']).value;
        const lastName: string = this.addAgentForm.get(['lastName']).value;
        const email: string = this.addAgentForm.get(['email']).value;
        const password: string = this.addAgentForm.get(['password']).value;
        const agentDTO: AddAgentDTO = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            accessesIds: this.accessesChose,
            lawyerId: this.IdLawyerChose
        }

        if(!this.addAgentForm.valid && this.accessesChose.length == 0)
        {
            this.submitted=true;
        }

        else
        {
            this.userService.addAgent(agentDTO).subscribe((result) => {
                this.modalRef?.hide();
                this.successmsg();
            })
            this.submitted=false;
        }

    }

    openEditAgentModal(template: TemplateRef<void>, user: User) {
        this.accessService.findAllAccesses().subscribe((result) => {
            this.allAccesses = result;
            this.accessesHalfOne.splice(0, this.accessesHalfOne.length)
            this.accessesHalfTwo.splice(0, this.accessesHalfTwo.length)
            for (let i = 0; i < this.allAccesses.length; i++) {
                if (i <= 20) {

                    this.accessesHalfOne.push(this.allAccesses[i])
                } else {

                    this.accessesHalfTwo.push(this.allAccesses[i])
                }
            }
        })
        this.modalData = user;
        this.allLawyers.forEach((lawyer) => {
            if (lawyer.id == user.lawyerId) {
                this.lawyerChose = lawyer;
            }
        })
        this.accessesChose.splice(0, this.accessesChose.length)
        user.accesses.forEach((access) => {
            this.accessesChose.push(access.id)
        })

        this.modalRef = this.modalService.show(template, {});
        this.editAgentForm = this.formBuilder.group({
            firstName: [user.firstName,[Validators.required, Validators.min(3)]],
            lastName: [user.lastName,[Validators.required, Validators.min(3)]],
            email: [user.email,[Validators.email, Validators.required]],
            lawyer: [this.lawyerChose,[Validators.required]],
        });
        this.modalRef.onHide?.subscribe(() => {
            this.userService.findAllUsers().subscribe((result) => {
                this.listUsers = result;
            })
        })
    }

    successmsg() {
        Swal.fire({
            title: 'Good job!',
            text: '',
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: 'rgb(3, 142, 220)',
            cancelButtonColor: 'rgb(243, 78, 78)',
            confirmButtonText: 'OK'
        });
    }

    editAgent(): void {
        console.log("user", this.modalData.id);
        const firstName: string = this.editAgentForm.get(['firstName']).value;
        const lastName: string = this.editAgentForm.get(['lastName']).value;
        const email: string = this.editAgentForm.get(['email']).value;
        const lawyerName: string = this.editAgentForm.get(['lawyer']).value || this.lawyerChose.firstName;

        this.allLawyers.forEach((lawyer) => {
            if (lawyer.firstName == lawyerName) {
                this.IdLawyerChose = lawyer.id;
            }
        })
        const updateAgentDTO: UpdateAgentDTO = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            lawyerId: this.IdLawyerChose,
            accessesIds: this.accessesChose
        }
        this.userService.updateAgentByAdmin(this.modalData.id, updateAgentDTO).subscribe(() => {
            this.modalRef?.hide();
            this.successmsg();
        })
    }

    openLawyerModal(template: TemplateRef<void>) {
        this.modalRef = this.modalService.show(template, {});
        this.addLawyerForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.min(3)]],
            lastName: ['', [Validators.required, Validators.min(3)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required,Validators.pattern(StrongPasswordRegx)]],
        })
        this.modalRef.onHide?.subscribe(() => {
            this.userService.findAllUsers().subscribe((result) => {
                this.listUsers = result;
            })
            this.userService.finAllLawyers().subscribe((result) => {
                this.allLawyers = result;
            })
        })
    }

    passwordValidation(formControlName: FormControlName) {

    }

    addLawyer() {
        this.submitted=true;
        const firstName: string = this.addLawyerForm.get(['firstName']).value;
        const lastName: string = this.addLawyerForm.get(['lastName']).value;
        const email: string = this.addLawyerForm.get(['email']).value;
        const password: string = this.addLawyerForm.get(['password']).value;
        const lawyerDTO: AddLawyerDTO = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };
        if(!this.addLawyerForm.valid)
        {
            this.submitted=true;
        }
        else
        {
            this.userService.addLawyer(lawyerDTO).subscribe((result) => {
                this.modalRef?.hide();
                this.successmsg();
                this.submitted=false;
            })
        }

    }

    openConfirmModaldeleteUser(template: TemplateRef<void>) {
        this.modalRef = this.modalService.show(template);
    }

    deleteUser(userId: string) {
        this.userService.deleteUserById(userId).subscribe(() => {
            this.userService.findAllUsers().subscribe((result) => {
                this.listUsers = result;
                this.modalRef?.hide();
            })
            this.userService.finAllLawyers().subscribe((result) => {
                this.allLawyers = result;
            })
        })
    }

    openEditLawyerModal(template: TemplateRef<void>, user: User) {
        this.modalData = user;
        this.modalRef = this.modalService.show(template, {});
        this.editLawyerForm = this.formBuilder.group({
            firstName: [user.firstName,[Validators.required, Validators.min(3)]],
            lastName: [user.lastName,[Validators.required, Validators.min(3)]],
            email: [user.email,[Validators.required, Validators.email]],
        })
        this.modalRef.onHide?.subscribe(() => {
            this.userService.findAllUsers().subscribe((result) => {
                this.listUsers = result;
            })
        })
    }

    editLawyer() {
        const firstName: string = this.editLawyerForm.get(['firstName']).value;
        const lastName: string = this.editLawyerForm.get(['lastName']).value;
        const email: string = this.editLawyerForm.get(['email']).value;
        const updateLawyerDTO: UpdateLawyerDTO = {
            firstName: firstName,
            lastName: lastName,
            email: email
        }
        this.userService.updateLawyerByAdmin(this.modalData.id, updateLawyerDTO).subscribe(() => {
            this.modalRef?.hide()
            this.successmsg();
        })
    }

    openViewUserDetails(template: TemplateRef<void>, user: User) {
        if (user.role.name != 'ADMIN' && user.role.name != 'LAWYER') {
            this.userService.findUserById(user.lawyerId).subscribe((result) => {
                this.lawyerOfUserDetails = result
            })
            this.allAccesses = user.accesses;
            this.modalRef = this.modalService.show(template, {})
        } else {
            this.modalRef = this.modalService.show(template)
        }
    }
}
