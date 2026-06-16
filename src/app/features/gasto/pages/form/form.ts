import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GastoService } from '../../services/gasto';
import { GastoDTO } from '../../models/gasto';
import { AuthService } from '../../../auth/services/auth';
import { Select } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { CategoriaDTO } from '../../../categoria/models/categoria';
import { CategoriaService } from '../../../categoria/service/categoria';
import { FormaPagamentoService } from '../../services/forma-pagamento';
import { FormaPagamentoDTO } from '../../models/forma-pagamento';
import { StatusGastoService } from '../../services/status-gasto';
import { StatusGastoDTO } from '../../models/status-gasto';
import { TitleCasePipe } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { forkJoin, Observable, switchMap, tap } from 'rxjs';
import { GastoRequestDTO } from '../../models/gasto-request';

@Component({
    selector: 'app-form',
    imports: [
        Select,
        InputTextModule,
        DatePickerModule,
        FormsModule,
        Button,
        TitleCasePipe,
        InputNumberModule,
    ],
    templateUrl: './form.html',
    styleUrl: './form.css',
})
export class Form implements OnInit {
    gasto!: GastoDTO;

    descricao = signal<string>('');
    valor = signal<number | null>(null);
    categorias = signal<CategoriaDTO[]>([]);
    categoriaSelecionada = signal<CategoriaDTO | null>(null);
    formaPagamento = signal<FormaPagamentoDTO[]>([]);
    formaPagamentoSelecionada = signal<FormaPagamentoDTO | null>(null);
    statusGasto = signal<StatusGastoDTO[]>([]);
    statusGastoSelecionado = signal<StatusGastoDTO | null>(null);
    dataGasto = signal<Date | null>(null);
    dataVencimento = signal<Date | null>(null);

    private _router = inject(Router);
    private _activatedRoute = inject(ActivatedRoute);
    private _authService = inject(AuthService);
    private _categoriaService = inject(CategoriaService);
    private _formaPagamentoService = inject(FormaPagamentoService);
    private _statusGastoService = inject(StatusGastoService);
    private _gastoService = inject(GastoService);

    ngOnInit() {
        const id = this._activatedRoute.snapshot.paramMap.get('id');

        if (id) {
            this.buscarGastoPorId(Number(id))
                .pipe(
                    switchMap(() =>
                        forkJoin({
                            categorias: this.getCategorias(),
                            formasPagamento: this.getFormaPagamento(),
                            statusGasto: this.getStatusGasto(),
                        }),
                    ),
                )
                .subscribe();
        } else {
            this.getCategorias().subscribe();
            this.getFormaPagamento().subscribe();
            this.getStatusGasto().subscribe();
        }
    }

    buscarGastoPorId(id: number): Observable<GastoDTO> {
        return this._gastoService.detalhar(id, this._authService.usuarioId() || 0).pipe(
            tap((response) => {
                this.gasto = response;
            }),
        );
    }

    getCategorias(): Observable<CategoriaDTO[]> {
        return this._categoriaService
            .listar(this._authService.usuarioId()!)
            .pipe(tap((response) => this.categorias.set(response)));
    }

    getFormaPagamento(): Observable<FormaPagamentoDTO[]> {
        return this._formaPagamentoService
            .listar()
            .pipe(tap((response) => this.formaPagamento.set(response)));
    }

    getStatusGasto(): Observable<StatusGastoDTO[]> {
        return this._statusGastoService.listar().pipe(
            tap((response) => {
                this.statusGasto.set(response);
                this.setarStatus();
            }),
        );
    }

    setarStatus() {
        if (this.gasto) {
            this.statusGastoSelecionado.set(this.gasto.status);
        } else {
            const statusPago = this.statusGasto().find((s) => s.nome === 'PAGO') ?? null;
            this.statusGastoSelecionado.set(statusPago);
        }
    }

    cadastrar() {
        const gastoRequest: GastoRequestDTO = {
            categoriaId: this.categoriaSelecionada()?.id ?? 0,
            formaPagamentoId: this.formaPagamentoSelecionada()?.id ?? 0,
            statusId: this.statusGastoSelecionado()?.id ?? 0,
            descricao: this.descricao(),
            valor: this.valor() ?? 0,
            dataGasto: this.dataGasto() ?? new Date(),
            dataVencimento: this.dataVencimento() ?? null,
        };
        this._gastoService.cadastrar(gastoRequest, this._authService.usuarioId() || 0);
        console.log(gastoRequest);
    }

    // atualizar() {}

    voltar() {
        this._router.navigate(['/gasto']);
    }
}
