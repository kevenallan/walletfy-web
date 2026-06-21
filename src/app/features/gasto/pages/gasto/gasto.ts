import { Component, HostListener, inject, signal } from '@angular/core';

import { Button } from 'primeng/button';
import { Card } from '../../components/card/card';
import { Tabela } from '../../components/tabela/tabela';
import { GastoService } from '../../services/gasto';
import { GastoDTO } from '../../models/gasto';
import { AuthService } from '../../../auth/services/auth';
import { Router } from '@angular/router';
import { formatarData, primeiroDiaMes, ultimoDiaMes } from '../../../../shared/utils/data';
import { DatasEmissao } from '../../models/datas-Emissao';
import { ResumoMesDTO } from '../../models/resumo-mes';
import { ConfirmacaoService } from '../../../../core/services/confirmacao';
import { NotificacaoService } from '../../../../core/services/notificacao';

@Component({
    selector: 'app-gasto',
    imports: [Button, Card, Tabela],
    templateUrl: './gasto.html',
    styleUrl: './gasto.css',
})
export class Gasto {
    resumoMeses = signal<ResumoMesDTO[]>([]);

    isMobile = window.innerWidth < 768;

    @HostListener('window:resize')
    onResize() {
        this.isMobile = window.innerWidth < 768;
    }

    gastos = signal<GastoDTO[]>([]);

    private _authService = inject(AuthService);
    private _gastoService = inject(GastoService);
    private _router = inject(Router);
    private _confirmacaoService = inject(ConfirmacaoService);
    private _notificacaoService = inject(NotificacaoService);

    constructor() {
        this.listarDatas(primeiroDiaMes(), ultimoDiaMes());
        this.listarCardsResumo();
    }

    listarDatas(dataInicio: string, dataFim: string) {
        this._gastoService
            .listar(this._authService.usuarioId() || 0, dataInicio, dataFim)
            .subscribe({
                next: (response) => {
                    this.gastos.set(response);
                },
            });
    }

    cadastrarAtualizarGasto(idGasto?: number) {
        if (idGasto) {
            this._router.navigate([`/gasto/${idGasto}/atualizar`]);
        } else {
            this._router.navigate(['/gasto/cadastrar']);
        }
    }

    deletarGasto(gastoId: number) {
        this._confirmacaoService.abrirConfirmacao().subscribe({
            next: (confirmado: boolean) => {
                if (confirmado) {
                    this._gastoService
                        .deletar(gastoId, this._authService.usuarioId() || 0)
                        .subscribe({
                            next: () => {
                                this._notificacaoService.msgSucesso('Gasto deletado');
                                this.listarDatas(primeiroDiaMes(), ultimoDiaMes());
                            },
                        });
                }
            },
        });
    }

    buscarGastosPorData(event: DatasEmissao) {
        this.listarDatas(formatarData(event.dataInicio), formatarData(event.dataFim));
    }

    listarCardsResumo() {
        this._gastoService.listarResumo(1).subscribe({
            next: (response) => {
                this.resumoMeses.set(response);
            },
        });
    }
}
