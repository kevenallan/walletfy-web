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

@Component({
    selector: 'app-gasto',
    imports: [Button, Card, Tabela],
    templateUrl: './gasto.html',
    styleUrl: './gasto.css',
})
export class Gasto {
    // gasto.ts
    resumoMeses = signal<ResumoMesDTO[]>([
        {
            mes: 'Janeiro 2026',
            receita: 5000,
            despesas: 2100,
            saldo: 2900,
            pendentes: 3,
            variacaoReceita: 0,
            variacaoDespesas: 0,
            variacaoSaldo: 0,
        },
        {
            mes: 'Fevereiro 2026',
            receita: 5200,
            despesas: 1950,
            saldo: 3250,
            pendentes: 2,
            variacaoReceita: 4,
            variacaoDespesas: -7.1,
            variacaoSaldo: 12.1,
        },
        {
            mes: 'Março 2026',
            receita: 4800,
            despesas: 2400,
            saldo: 2400,
            pendentes: 4,
            variacaoReceita: -7.7,
            variacaoDespesas: 23.1,
            variacaoSaldo: -26.2,
        },
        {
            mes: 'Abril 2026',
            receita: 5100,
            despesas: 1800,
            saldo: 3300,
            pendentes: 1,
            variacaoReceita: 6.3,
            variacaoDespesas: -25,
            variacaoSaldo: 37.5,
        },
        {
            mes: 'Maio 2026',
            receita: 5300,
            despesas: 2800,
            saldo: 2500,
            pendentes: 5,
            variacaoReceita: 3.9,
            variacaoDespesas: 55.6,
            variacaoSaldo: -24.2,
        },
        {
            mes: 'Junho 2026',
            receita: 5500,
            despesas: 3200,
            saldo: 2300,
            pendentes: 5,
            variacaoReceita: 3.8,
            variacaoDespesas: 14.3,
            variacaoSaldo: -8,
        },
    ]);

    isMobile = window.innerWidth < 768;

    @HostListener('window:resize')
    onResize() {
        this.isMobile = window.innerWidth < 768;
    }

    gastos = signal<GastoDTO[]>([]);

    private _gastoService = inject(GastoService);
    private _authService = inject(AuthService);
    private _router = inject(Router);

    constructor() {
        this.listarDatas(primeiroDiaMes(), ultimoDiaMes());
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
        console.log(gastoId);

        this._gastoService.deletar(gastoId, this._authService.usuarioId() || 0).subscribe({
            next: () => {
                window.alert('Gasto deletado');
                this.listarDatas(primeiroDiaMes(), ultimoDiaMes());
            },
        });
    }

    buscarGastosPorData(event: DatasEmissao) {
        this.listarDatas(formatarData(event.dataInicio), formatarData(event.dataFim));
    }
}
