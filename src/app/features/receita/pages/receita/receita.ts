import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { ReceitaService } from '../../services/receita';
import { AuthService } from '../../../auth/services/auth';
import { ReceitaResponseDTO } from '../../models/receita-response';
import { Card } from '../../../receita/components/card/card';
import { Tabela } from '../../../receita/components/tabela/tabela';
import { ConfirmacaoService } from '../../../../core/services/confirmacao';
import { NotificacaoService } from '../../../../core/services/notificacao';
import { formatarData, primeiroDiaMesDate, ultimoDiaMesDate } from '../../../../shared/utils/data';
import { DatasEmissao } from '../../../gasto/models/datas-Emissao';
import { Button } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { ReceitaRequestDTO } from '../../models/receita-request';
import { Form } from '../../components/form/form';

@Component({
    selector: 'app-receita',
    imports: [Card, Tabela, Button],
    templateUrl: './receita.html',
    styleUrl: './receita.css',
    providers: [DialogService],
})
export class Receita implements OnInit {
    receitas = signal<ReceitaResponseDTO[]>([]);

    isMobile = window.innerWidth < 768;

    dataFiltro: DatasEmissao = { dataInicio: primeiroDiaMesDate(), dataFim: ultimoDiaMesDate() };

    @HostListener('window:resize')
    onResize() {
        this.isMobile = window.innerWidth < 768;
    }

    private _authService = inject(AuthService);
    private _receitaService = inject(ReceitaService);
    private _confirmacaoService = inject(ConfirmacaoService);
    private _notificacaoService = inject(NotificacaoService);
    private _dialogService = inject(DialogService);
    ngOnInit(): void {
        this.listarDatas();
    }

    buscarReceitaPorData(event: DatasEmissao) {
        this.dataFiltro.dataInicio = event.dataInicio;
        this.dataFiltro.dataFim = event.dataFim;
        this.listarDatas();
    }

    listarDatas() {
        this._receitaService
            .listar(
                this._authService.usuarioId() || 0,
                formatarData(this.dataFiltro.dataInicio),
                formatarData(this.dataFiltro.dataFim),
            )
            .subscribe({
                next: (response) => {
                    this.receitas.set(response);
                },
            });
    }

    abrirForm(receitaId?: number) {
        const ref = this._dialogService.open(Form, {
            header: receitaId ? 'Editar Receita' : 'Nova Receita',
            width: '650px',
            height: '600px',
            breakpoints: { '768px': '90vw', '480px': '100vw' },
            closable: true,
            closeOnEscape: true,
            dismissableMask: true,
            data: { receitaId },
        });

        if (ref) {
            ref.onClose.subscribe((resultado: ReceitaRequestDTO) => {
                if (resultado) {
                    if (resultado.id) {
                        this.atualizar(resultado);
                    } else {
                        this.cadastrar(resultado);
                    }
                }
            });
        }
    }
    cadastrar(receitaRequest: ReceitaRequestDTO) {
        this._receitaService
            .cadastrar(receitaRequest, this._authService.usuarioId() || 0)
            .subscribe(() => {
                this._notificacaoService.msgSucesso('Receita cadastrada');
                this.listarDatas();
                // this._confirmacaoService
                //     .abrirConfirmacao({
                //         mensagem: 'Você deseja continuar a cadastrar mais gastos?',
                //         cabecalho: 'Cadastrar gastos',
                //         severidadeBotaoAceitacao: 'success',
                //     })
                //     .subscribe({
                //         next: (confirmado) => {
                //             if (confirmado) {
                //                 // this.form.reset();
                //             } else {
                //                 // this._router.navigate(['/gasto']);
                //             }
                //         },
                //     });
            });
    }

    atualizar(receitaRequest: ReceitaRequestDTO) {
        this._receitaService
            .atualizar(receitaRequest, this._authService.usuarioId() || 0)
            .subscribe({
                next: () => {
                    this._notificacaoService.msgSucesso('Receita atualizada');
                    this.listarDatas();
                },
            });
    }
    deletarReceita(receitaId: number) {
        this._confirmacaoService.abrirConfirmacao().subscribe({
            next: (confirmado: boolean) => {
                if (confirmado) {
                    this._receitaService
                        .deletar(receitaId, this._authService.usuarioId() || 0)
                        .subscribe({
                            next: () => {
                                this._notificacaoService.msgSucesso('Receita deletada');
                                this.listarDatas();
                            },
                        });
                }
            },
        });
    }
}
