import { Component } from '@angular/core';
import { Cabecalho } from '../../components/cabecalho/cabecalho';
import { FormCadastro } from '../../components/form-cadastro/form-cadastro';
import { Resumo } from '../../components/resumo/resumo';
import { Rodape } from '../../components/rodape/rodape';

@Component({
    selector: 'app-cadastro',
    imports: [Cabecalho, Resumo, FormCadastro, Rodape],
    templateUrl: './cadastro.html',
    styleUrl: './cadastro.css',
})
export class Cadastro {}
