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
import { LoginService } from '../../services/login';
import { LoginRequestDTO } from '../../models/login-request';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

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
    private _router = inject(Router);
    private _authService = inject(AuthService);

    constructor() {
        this.configurarFormulario();
    }

    configurarFormulario() {
        this.form = new FormBuilder().group({
            email: ['', [Validators.required, Validators.email]],
            senha: ['', [Validators.required, Validators.minLength(3)]],
        });
    }

    login() {
        if (this.form.valid) {
            const loginRequest = this._montarRequisicaoLogin();

            this._loginService.login(loginRequest).subscribe({
                next: (response) => {
                    this._authService.salvar(response);
                    this._router.navigate(['/gasto']);
                },
                error: (httpError) => {
                    window.alert(
                        'Erro no login: ' + httpError.error.mensagem ||
                            'Ocorreu um erro ao tentar fazer login.',
                    );
                },
            });
        }
    }

    private _montarRequisicaoLogin() {
        const email = this.form.value.email;
        const senha = this.form.value.senha;

        return { email, senha } as LoginRequestDTO;
    }
}
