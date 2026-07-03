import { Component, ViewChild } from '@angular/core';
import { InformacoesPessoais } from '../../components/informacoes-pessoais/informacoes-pessoais';
import { Seguranca } from '../../components/seguranca/seguranca';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-editar',
    imports: [InformacoesPessoais, Seguranca, Button],
    templateUrl: './editar.html',
    styleUrl: './editar.css',
})
export class Editar {
    @ViewChild(InformacoesPessoais) formInfoPessoais!: InformacoesPessoais;
    @ViewChild(Seguranca) formSeguranca!: Seguranca;

    salvar(): void {
        const dadosPessoais = this.formInfoPessoais.getFormValue();
        const dadosSenha = this.formSeguranca.getFormValue();

        console.log(dadosPessoais, dadosSenha);

        if (!dadosPessoais || !dadosSenha) return;

        console.log('chegou para chamar o service');

        // chama o service com os dados
    }
}
