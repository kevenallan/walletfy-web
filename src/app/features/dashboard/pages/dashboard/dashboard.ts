import { Component, inject, OnInit, signal } from '@angular/core';
import { Tabela } from '../../components/tabela/tabela';
import { DashboardService } from '../../services/dashboard';
import { ResumoAnualResponseDTO } from '../../models/resumo-anual';
import { Grafico } from '../../components/grafico/grafico';
import { GraficoMesDTO } from '../../models/grafico-mes';

@Component({
    selector: 'app-dashboard',
    imports: [Tabela, Grafico],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
    resumoAnualResponseDTO = signal<ResumoAnualResponseDTO[]>([]);
    dadosReceitas: GraficoMesDTO[] = [];
    dadosDespesas: GraficoMesDTO[] = [];

    private _dashBoardService = inject(DashboardService);

    ngOnInit(): void {
        this.listar(new Date().getFullYear());
    }

    listar(ano: number) {
        this._dashBoardService.listar(ano).subscribe({
            next: (response) => {
                this.resumoAnualResponseDTO.set(response);
                this.dadosReceitas = response.map((r) => ({ mes: r.mes, total: r.totalReceitas }));
                this.dadosDespesas = response.map((r) => ({ mes: r.mes, total: r.totalGastos }));
            },
        });
    }
}
