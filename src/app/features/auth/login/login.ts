import { Component, inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { LoginService } from '../services/login';

@Component({
    selector: 'app-login',
    imports: [
        ButtonModule,
        FormsModule,
        InputTextModule,
        IconFieldModule,
        InputIconModule,
        PasswordModule,
        DividerModule,
        ReactiveFormsModule,
    ],
    templateUrl: './login.html',
    styleUrl: './login.css',
})
export class Login {
    form!: FormGroup;

    private _loginService = inject(LoginService);
    constructor() {
        this.configurarFormulario();
    }

    configurarFormulario() {
        this.form = new FormBuilder().group({
            email: ['', [Validators.required, Validators.email]],
            senha: ['', [Validators.required, Validators.minLength(3)]],
        });
    }

    entrar() {
        console.log(this.form.value.email, this.form.value.senha);

        if (this.form.valid) {
            console.log('entrou');

            this._loginService.login(this.form.value.email, this.form.value.senha);
        }
    }
}
