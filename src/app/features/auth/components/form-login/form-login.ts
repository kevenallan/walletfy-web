import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { LoginRequestDTO } from '../../models/login-request';

@Component({
    selector: 'app-form-login',
    imports: [
        ReactiveFormsModule,
        IconFieldModule,
        InputIconModule,
        PasswordModule,
        ButtonModule,
        InputTextModule,
    ],
    templateUrl: './form-login.html',
    styleUrl: './form-login.css',
})
export class FormLogin {
    form!: FormGroup;
    formOutput = output<LoginRequestDTO>();

    constructor() {
        this.configurarFormulario();
    }

    configurarFormulario() {
        this.form = new FormBuilder().group({
            email: ['', [Validators.required, Validators.email]],
            senha: ['', [Validators.required]],
        });
    }

    login() {
        if (this.form.valid) {
            const loginRequest = this._montarRequisicaoLogin();

            this.formOutput.emit(loginRequest);
        }
    }

    private _montarRequisicaoLogin() {
        const email = this.form.value.email;
        const senha = this.form.value.senha;

        return { email, senha } as LoginRequestDTO;
    }
}
