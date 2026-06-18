import { Component, HostListener, inject, signal } from '@angular/core';

import { Button } from 'primeng/button';
import { Card } from '../../components/card/card';
import { Tabela } from '../../components/tabela/tabela';
import { CardDTO } from '../../models/card';
import { GastoService } from '../../services/gasto';
import { GastoDTO } from '../../models/gasto';
import { AuthService } from '../../../auth/services/auth';
import { Router } from '@angular/router';

@Component({
    selector: 'app-gasto',
    imports: [Button, Card, Tabela],
    templateUrl: './gasto.html',
    styleUrl: './gasto.css',
})
export class Gasto {
    cardConteudo = signal<CardDTO[]>([
        {
            titulo: 'Receita',
            valor: 1000,
            valorPorcentagemDescricao: -5,
        },
        {
            titulo: 'Despesas',
            valor: 1500,
            valorPorcentagemDescricao: 15,
        },
        {
            titulo: 'Saldo Atual',
            valor: 750,
            valorPorcentagemDescricao: -20,
        },
        {
            titulo: 'Pendentes',
            valor: 375,
            valorPorcentagemDescricao: 1,
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
        this.listar();
    }

    listar() {
        this._gastoService.listar(this._authService.usuarioId() || 0).subscribe({
            next: (response) => {
                console.log(response);

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
                this.listar();
            },
        });
    }
}
