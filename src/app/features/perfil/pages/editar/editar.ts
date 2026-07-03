import { Component } from '@angular/core';
import { InformacoesPessoais } from '../../components/informacoes-pessoais/informacoes-pessoais';
import { Seguranca } from '../../components/seguranca/seguranca';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-editar',
    imports: [InformacoesPessoais, Seguranca, Button],
    templateUrl: './editar.html',
    styleUrl: './editar.css',
})
export class Editar {}
