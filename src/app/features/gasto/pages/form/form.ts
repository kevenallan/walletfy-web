import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GastoService } from '../../services/gasto';
import { GastoDTO } from '../../models/gasto';
import { AuthService } from '../../../auth/services/auth';
import { Select } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-form',
    imports: [Select, InputTextModule, DatePickerModule, FormsModule, Button],
    templateUrl: './form.html',
    styleUrl: './form.css',
})
export class Form implements OnInit {
    gasto!: GastoDTO;

    date2: Date | undefined;

    private _activatedRoute = inject(ActivatedRoute);
    private _gastoService = inject(GastoService);
    private _authService = inject(AuthService);
    private _router = inject(Router);

    ngOnInit() {
        const id = this._activatedRoute.snapshot.paramMap.get('id');

        if (id) {
            this.buscarGastoPorId(Number(id));
        }
    }

    buscarGastoPorId(id: number) {
        this._gastoService.detalhar(id, this._authService.usuarioId() || 0).subscribe({
            next: (response) => {
                console.log('Gasto encontrado:', response);
                this.gasto = response;
            },
            error: (error) => {
                console.error('Erro ao buscar gasto:', error);
            },
        });
    }

    cadastrar() {}

    atualizar() {}
}
