import { Component, inject, ViewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { InformacoesPessoais } from '../../components/informacoes-pessoais/informacoes-pessoais';
import { Seguranca } from '../../components/seguranca/seguranca';
import { FormDTO } from '../../models/form';
import { PerfilService } from '../../services/perfil';

@Component({
    selector: 'app-editar',
    imports: [InformacoesPessoais, Seguranca, Button],
    templateUrl: './editar.html',
    styleUrl: './editar.css',
})
export class Editar {
    @ViewChild(InformacoesPessoais) formInfoPessoais!: InformacoesPessoais;
    @ViewChild(Seguranca) formSeguranca!: Seguranca;

    private _perfilService = inject(PerfilService);

    salvar(): void {
        const dadosPessoais = this.formInfoPessoais.getFormValue();
        const dadosSenha = this.formSeguranca.getFormValue();

        if (!dadosPessoais || !dadosSenha) return;

        const usuarioForm: FormDTO = {
            nome: dadosPessoais.nome || '',
            email: dadosPessoais.email || '',
            senhaAntiga: dadosSenha.senhaAtual || '',
            senhaNova: dadosSenha.senhaNova || '',
            dataNascimento: dadosPessoais.dataNascimento,
            telefone: dadosPessoais.telefone,
            foto: dadosPessoais.foto,
        };

        this._perfilService.atualizarUsuario(usuarioForm).subscribe({
            next: (response) => {
                console.log(response);
            },
        });
    }
}
