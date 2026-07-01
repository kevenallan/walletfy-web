import { Component, inject } from '@angular/core';

import { DividerModule } from 'primeng/divider';
import { Cabecalho } from '../../components/cabecalho/cabecalho';
import { FormLogin } from '../../components/form-login/form-login';
import { Resumo } from '../../components/resumo/resumo';
import { Rodape } from '../../components/rodape/rodape';
import { LoginRequestDTO } from '../../models/login-request';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [
        // MODULES
        DividerModule,

        // COMPONENTS
        Cabecalho,
        Resumo,
        FormLogin,
        Rodape,
    ],
    templateUrl: './login.html',
    styleUrl: './login.css',
})
export class Login {
    private _authService = inject(AuthService);
    private _router = inject(Router);

    login(loginRequest: LoginRequestDTO) {
        this._authService.login(loginRequest).subscribe({
            next: (response) => {
                this._authService.salvar(response);
                this._router.navigate(['/dashboard']);
            },
        });
    }
}
