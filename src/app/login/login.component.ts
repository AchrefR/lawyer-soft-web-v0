import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../core/auth/auth.service";
import {TokenStorageService} from "../core/auth/token-storage.service";
import {AuthenticationDTO} from "../core/model/request/login.model";
import {AuthResponse} from "../core/model/response/auth-response.model";
import {User} from "../core/model/user.model";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

    loginForm: any;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private userService: AuthService,
                private tokenStorage: TokenStorageService) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: [''],
            password: ['']
        })
    }

    login() {
      const email: string = this.loginForm.get(['email']).value;
      const password: string = this.loginForm.get(['password']).value;
      const authenticationDTO: AuthenticationDTO = {
        email: email,
        password: password
      };

      this.userService.login(authenticationDTO).subscribe((authResponse: AuthResponse) => {
        const token: string = authResponse.token;
        const user: User = authResponse.user;
        this.tokenStorage.saveToken(token);
        this.tokenStorage.saveUser(user);
        this.router.navigate(['/'])
      });

    }

}
