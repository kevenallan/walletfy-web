import { Component, inject, OnInit, signal } from '@angular/core';
import { ReceitaService } from '../../services/receita';
import { AuthService } from '../../../auth/services/auth';
import { ReceitaResponseDTO } from '../../models/receita-response';
import { Card } from '../../../receita/components/card/card';
import { Tabela } from '../../../receita/components/tabela/tabela';
import { Router } from '@angular/router';
import { ConfirmacaoService } from '../../../../core/services/confirmacao';
import { NotificacaoService } from '../../../../core/services/notificacao';
import { formatarData, primeiroDiaMes, ultimoDiaMes } from '../../../../shared/utils/data';
import { DatasEmissao } from '../../../gasto/models/datas-Emissao';

@Component({
    selector: 'app-receita',
    imports: [Card, Tabela],
    templateUrl: './receita.html',
    styleUrl: './receita.css',
})
export class Receita implements OnInit {
    receitas = signal<ReceitaResponseDTO[]>([]);

    private _receitaService = inject(ReceitaService);
    private _authService = inject(AuthService);
    private _router = inject(Router);
    private _confirmacaoService = inject(ConfirmacaoService);
    private _notificacaoService = inject(NotificacaoService);
    ngOnInit(): void {
        this.listarDatas(primeiroDiaMes(), ultimoDiaMes());
    }

    listarDatas(dataInicio: string, dataFim: string) {
        this._receitaService
            .listar(this._authService.usuarioId() || 0, dataInicio, dataFim)
            .subscribe({
                next: (response) => {
                    this.receitas.set(response);
                },
            });
    }

    cadastrarAtualizarReceita(receitaId?: number) {
        if (receitaId) {
            this._router.navigate([`/receita/${receitaId}/atualizar`]);
        } else {
            this._router.navigate(['/receita/cadastrar']);
        }
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
                                this.listarDatas(primeiroDiaMes(), ultimoDiaMes());
                            },
                        });
                }
            },
        });
    }

    buscarReceitaPorData(event: DatasEmissao) {
        this.listarDatas(formatarData(event.dataInicio), formatarData(event.dataFim));
    }
}
