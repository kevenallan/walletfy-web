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

    login() {
        if (this.form.valid) {
            this._loginService.login(this.form.value.email, this.form.value.senha).subscribe({
                next: (response) => {
                    console.log('Login bem-sucedido:', response);
                },
                error: (httpError) => {
                    console.error('Erro no login:', httpError);
                    window.alert(
                        'Erro no login: ' + httpError.error.mensagem ||
                            'Ocorreu um erro ao tentar fazer login.',
                    );
                },
            });
        }
    }
}
