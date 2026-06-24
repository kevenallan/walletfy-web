import { Component, inject } from '@angular/core';
import { Cabecalho } from '../../components/cabecalho/cabecalho';
import { FormCadastro } from '../../components/form-cadastro/form-cadastro';
import { Resumo } from '../../components/resumo/resumo';
import { Rodape } from '../../components/rodape/rodape';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { CadastroEdicaoRequestDTO } from '../../models/cadastro-edicao-request';

@Component({
    selector: 'app-cadastro',
    imports: [Cabecalho, Resumo, FormCadastro, Rodape],
    templateUrl: './cadastro.html',
    styleUrl: './cadastro.css',
})
export class Cadastro {
    private _authService = inject(AuthService);
    private _router = inject(Router);

    cadastrar(requisicao: CadastroEdicaoRequestDTO) {
        this._authService.cadastrar(requisicao).subscribe({
            next: (response) => {
                this._authService.salvar(response);
                this._router.navigate(['/gasto']);
            },
        });
    }
}
