import { Component } from '@angular/core';

import { DividerModule } from 'primeng/divider';
import { Cabecalho } from '../../components/cabecalho/cabecalho';
import { FormLogin } from '../../components/form-login/form-login';
import { Resumo } from '../../components/resumo/resumo';
import { Rodape } from '../../components/rodape/rodape';

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
export class Login {}
