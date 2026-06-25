import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { ReceitaResponseDTO } from '../../models/receita-response';
import { CategoriaDTO } from '../../../categoria/models/categoria';
import { FormaPagamentoDTO } from '../../../gasto/models/forma-pagamento';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth';
import { CategoriaService } from '../../../categoria/services/categoria';
import { FormaPagamentoService } from '../../../gasto/services/forma-pagamento';
import { ReceitaService } from '../../services/receita';
import { StatusReceitaService } from '../../services/status-receita';
import { ConfirmacaoService } from '../../../../core/services/confirmacao';
import { NotificacaoService } from '../../../../core/services/notificacao';
import { forkJoin, Observable, switchMap, tap } from 'rxjs';
import { TipoCategoria } from '../../../../core/enum/tipo-categoria';
import { ReceitaRequestDTO } from '../../models/receita-request';
import { InputTextModule } from 'primeng/inputtext';
import { StatusReceitaDTO } from '../../models/status-receita';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TitleCasePipe } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
    selector: 'app-form',
    imports: [
        Button,
        Select,
        DatePicker,
        InputNumberModule,
        ReactiveFormsModule,
        TitleCasePipe,
        InputTextModule,
    ],
    templateUrl: './form.html',
    styleUrl: './form.css',
})
export class Form implements OnInit {
    receitaId!: number;
    receita!: ReceitaResponseDTO;
    isEdit = false;

    categorias = signal<CategoriaDTO[]>([]);
    formaPagamento = signal<FormaPagamentoDTO[]>([]);
    statusReceita = signal<StatusReceitaDTO[]>([]);
    form!: FormGroup;

    private _authService = inject(AuthService);
    private _categoriaService = inject(CategoriaService);
    private _formaPagamentoService = inject(FormaPagamentoService);
    private _statusReceitaService = inject(StatusReceitaService);
    private _receitaService = inject(ReceitaService);
    private _confirmacaoService = inject(ConfirmacaoService);
    private _notificacaoService = inject(NotificacaoService);
    private _ref = inject(DynamicDialogRef);
    private _config = inject(DynamicDialogConfig);
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
            dataReceita: [null, [Validators.required]],
        });
    }

    ngOnInit() {
        this.receitaId = this._config.data?.receitaId;

        if (this.receitaId) {
            this.isEdit = true;

            this.buscarReceitaPorId(Number(this.receitaId))
                .pipe(
                    tap((receita) => {
                        this.setarCamposReceita(receita);
                    }),
                    switchMap(() =>
                        forkJoin({
                            categorias: this.getCategorias(),
                            formasPagamento: this.getFormaPagamento(),
                            statusReceita: this.getStatusReceita(),
                        }),
                    ),
                )
                .subscribe();
        } else {
            this.getCategorias().subscribe();
            this.getFormaPagamento().subscribe();
            this.getStatusReceita().subscribe();
        }
    }

    buscarReceitaPorId(id: number): Observable<ReceitaResponseDTO> {
        return this._receitaService.detalhar(id, this._authService.usuarioId() || 0).pipe(
            tap((response) => {
                this.receita = response;
            }),
        );
    }

    setarCamposReceita(receita: ReceitaResponseDTO) {
        this.form.reset({
            descricao: receita.descricao,
            valor: receita.valor,
            categoria: receita.categoria.id,
            formaPagamento: receita.formaPagamento.id,
            status: receita.status.id,
            dataReceita: this.stringParaDate(receita.dataReceita),
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
            .listar(this._authService.usuarioId()!, TipoCategoria.RECEITA)
            .pipe(tap((response) => this.categorias.set(response)));
    }

    getFormaPagamento(): Observable<FormaPagamentoDTO[]> {
        return this._formaPagamentoService
            .listar()
            .pipe(tap((response) => this.formaPagamento.set(response)));
    }

    getStatusReceita(): Observable<StatusReceitaDTO[]> {
        return this._statusReceitaService.listar().pipe(
            tap((response) => {
                this.statusReceita.set(response);
                // this.setarStatus();
            }),
        );
    }

    // setarStatus() {
    //     if (this.receita) {
    //         this.form.patchValue({ status: this.receita.status.id });
    //     } else {
    //         const statusRecebido = this.statusReceita().find((s) => s.nome === 'RECEBIDO') ?? null;
    //         this.form.patchValue({ status: statusRecebido?.id });
    //     }
    // }

    salvar() {
        this.form.markAllAsTouched();
        this.form.markAllAsDirty();
        this.form.updateValueAndValidity();

        if (this.form.invalid) {
            return;
        }

        const form = this.form.value;
        const receitaRequest: ReceitaRequestDTO = {
            id: this.receita?.id,
            categoriaId: form.categoria,
            formaPagamentoId: form.formaPagamento,
            statusId: form.status,
            descricao: form.descricao,
            valor: form.valor,
            dataReceita: form.dataReceita,
        };

        this._ref.close(receitaRequest);
    }

    cancelar() {
        this._ref.close();
    }
}
