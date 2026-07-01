import { Component, inject, OnInit, signal } from '@angular/core';
import { Tabela } from '../../components/tabela/tabela';
import { DashboardService } from '../../services/dashboard';
import { ResumoAnualResponseDTO } from '../../models/resumo-anual';
import { Grafico } from "../../components/grafico/grafico";

@Component({
    selector: 'app-dashboard',
    imports: [Tabela, Grafico],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
    resumoAnualResponseDTO = signal<ResumoAnualResponseDTO[]>([]);

    private _dashBoardService = inject(DashboardService);

    ngOnInit(): void {
        this.listar(new Date().getFullYear());
    }

    listar(ano: number) {
        this._dashBoardService.listar(ano).subscribe({
            next: (response) => {
                console.log(response);

                this.resumoAnualResponseDTO.set(response);
            },
        });
    }
}
