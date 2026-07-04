import { Component, inject, signal, ViewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { InformacoesPessoais } from '../../components/informacoes-pessoais/informacoes-pessoais';
import { Seguranca } from '../../components/seguranca/seguranca';
import { FormDTO } from '../../models/form';
import { PerfilService } from '../../services/perfil';
import { UsuarioResponseDTO } from '../../models/usuario-response';
import { NotificacaoService } from '../../../../core/services/notificacao';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth';
import { ConfirmacaoService } from '../../../../core/services/confirmacao';

@Component({
    selector: 'app-editar',
    imports: [InformacoesPessoais, Seguranca, Button],
    templateUrl: './editar.html',
    styleUrl: './editar.css',
})
export class Editar {
    @ViewChild(InformacoesPessoais) formInfoPessoais!: InformacoesPessoais;
    @ViewChild(Seguranca) formSeguranca!: Seguranca;

    dadosInfoPessoais = signal<UsuarioResponseDTO | null>(null);

    private _perfilService = inject(PerfilService);
    private _notificacaoService = inject(NotificacaoService);
    private _router = inject(Router);
    private _authService = inject(AuthService);
    private _confirmacaoService = inject(ConfirmacaoService);

    constructor() {
        this.detalhar();
    }

    detalhar(): void {
        this._perfilService.detalharUsuario().subscribe({
            next: (response) => {
                this.dadosInfoPessoais.set(response);
            },
        });
    }

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
                this._notificacaoService.msgSucesso('Usuário atualizado');
                this._authService.atualizarNomeUsuario(response.nome ?? '');
            },
        });
    }

    cancelar() {
        this._router.navigate(['dashboard']);
    }

    excluirConta() {
        this._confirmacaoService
            .abrirConfirmacao({
                mensagem: 'Você tem certeza que deseja excluir a sua conta?',
                cabecalho: 'Excluir conta',
                severidadeBotaoAceitacao: 'danger',
            })
            .subscribe({
                next: (confirmado) => {
                    if (confirmado) {
                        this._perfilService.deletarUsuario().subscribe({
                            next: () => {
                                this._authService.logout();
                            },
                        });
                    }
                },
            });
    }
}
