import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GastoService } from '../../services/gasto';
import { GastoDTO } from '../../models/gasto';
import { AuthService } from '../../../auth/services/auth';
import { Select } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { CategoriaDTO } from '../../../categoria/models/categoria';
import { CategoriaService } from '../../../categoria/services/categoria';
import { FormaPagamentoService } from '../../services/forma-pagamento';
import { FormaPagamentoDTO } from '../../models/forma-pagamento';
import { StatusGastoService } from '../../services/status-gasto';
import { StatusGastoDTO } from '../../models/status-gasto';
import { TitleCasePipe } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { forkJoin, Observable, switchMap, tap } from 'rxjs';
import { GastoRequestDTO } from '../../models/gasto-request';
import { NotificacaoService } from '../../../../core/services/notificacao';
import { ConfirmacaoService } from '../../../../core/services/confirmacao';
import { TipoCategoria } from '../../../../core/enum/tipo-categoria';
@Component({
    selector: 'app-form',
    imports: [
        Select,
        InputTextModule,
        DatePickerModule,
        Button,
        TitleCasePipe,
        InputNumberModule,
        ReactiveFormsModule,
    ],
    templateUrl: './form.html',
    styleUrl: './form.css',
})
export class Form implements OnInit {
    gasto!: GastoDTO;
    isEdit = false;

    categorias = signal<CategoriaDTO[]>([]);
    formaPagamento = signal<FormaPagamentoDTO[]>([]);
    statusGasto = signal<StatusGastoDTO[]>([]);
    statusGastoSelecionado = signal<StatusGastoDTO | null>(null);

    form!: FormGroup;

    private _router = inject(Router);
    private _activatedRoute = inject(ActivatedRoute);
    private _authService = inject(AuthService);
    private _categoriaService = inject(CategoriaService);
    private _formaPagamentoService = inject(FormaPagamentoService);
    private _statusGastoService = inject(StatusGastoService);
    private _gastoService = inject(GastoService);
    private _confirmacaoService = inject(ConfirmacaoService);
    private _notificacaoService = inject(NotificacaoService);

    constructor() {
        this.configurarFormulario();
    }

    configurarFormulario() {
        this.form = new FormBuilder().group({
            descricao: [null, [Validators.required]],
            valor: [null, [Validators.required]],
            categoria: [null, [Validators.required]],
            formaPagamento: [null, [Validators.required]],
            status: [null, [Validators.required]],
            dataGasto: [null, [Validators.required]],
            dataVencimento: [null],
        });
    }

    ngOnInit() {
        const id = this._activatedRoute.snapshot.paramMap.get('id');

        if (id) {
            this.isEdit = true;

            this.buscarGastoPorId(Number(id))
                .pipe(
                    tap((gasto) => {
                        this.setarCamposGasto(gasto);
                    }),
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

    setarCamposGasto(gasto: GastoDTO) {
        this.form.reset({
            descricao: gasto.descricao,
            valor: gasto.valor,
            categoria: gasto.categoria.id,
            formaPagamento: gasto.formaPagamento.id,
            status: gasto.status.id,
            dataGasto: this.stringParaDate(gasto.dataGasto),
            dataVencimento: this.stringParaDate(gasto.dataVencimento),
        });
    }

    private stringParaDate(data: string): Date | null {
        if (!data) {
            return null;
        }

        const [ano, mes, dia] = data.split('-').map(Number);

        return new Date(ano, mes - 1, dia);
    }

    getCategorias(): Observable<CategoriaDTO[]> {
        return this._categoriaService
            .listar(this._authService.usuarioId()!, TipoCategoria.DESPESA)
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

    salvar() {
        this.form.markAllAsTouched();
        this.form.markAllAsDirty();
        this.form.updateValueAndValidity();

        if (this.form.invalid) {
            return;
        }

        const form = this.form.value;

        const gastoRequest: GastoRequestDTO = {
            categoriaId: form.categoria,
            formaPagamentoId: form.formaPagamento,
            statusId: form.status,
            descricao: form.descricao,
            valor: form.valor,
            dataGasto: form.dataGasto,
            dataVencimento: form.dataVencimento,
        };

        if (this.gasto) {
            gastoRequest.id = this.gasto.id;
            this.atualizar(gastoRequest);
        } else {
            this.cadastrar(gastoRequest);
        }
    }

    cadastrar(gastoRequest: GastoRequestDTO) {
        this._gastoService
            .cadastrar(gastoRequest, this._authService.usuarioId() || 0)
            .subscribe(() => {
                this._notificacaoService.msgSucesso('Gasto cadastrado');

                this._confirmacaoService
                    .abrirConfirmacao({
                        mensagem: 'Você deseja continuar a cadastrar mais gastos?',
                        cabecalho: 'Cadastrar gastos',
                        severidadeBotaoAceitacao: 'success',
                    })
                    .subscribe({
                        next: (confirmado) => {
                            if (confirmado) {
                                this.form.reset();
                            } else {
                                this._router.navigate(['/gasto']);
                            }
                        },
                    });
            });
    }

    atualizar(gastoRequest: GastoRequestDTO) {
        this._gastoService.atualizar(gastoRequest, this._authService.usuarioId() || 0).subscribe({
            next: () => {
                this._router.navigate(['/gasto']);
                this._notificacaoService.msgSucesso('Gasto atualizado');
            },
        });
    }

    voltar() {
        this._router.navigate(['/gasto']);
    }
}
