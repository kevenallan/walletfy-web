import { Component } from '@angular/core';
import { Cabecalho } from '../../components/cabecalho/cabecalho';
import { Resumo } from '../../components/resumo/resumo';
import { Rodape } from '../../components/rodape/rodape';
import { FormCadastro } from '../../components/form-cadastro/form-cadastro';

@Component({
    selector: 'app-cadastro',
    imports: [Cabecalho, Resumo, FormCadastro, Rodape],
    templateUrl: './cadastro.html',
    styleUrl: './cadastro.css',
})
export class Cadastro {}
