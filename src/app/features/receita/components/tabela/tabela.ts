import {
    Component,
    computed,
    HostListener,
    inject,
    input,
    OnInit,
    output,
    signal,
    WritableSignal,
} from '@angular/core';
import { ReceitaResponseDTO } from '../../models/receita-response';
import { TableFilterEvent, TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { CurrencyPipe, DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { CoresBadgeService } from '../../../../core/services/cores-badge';
import { StatusReceitaDTO } from '../../models/status-receita';
import { CategoriaDTO } from '../../../categoria/models/categoria';
import { FormaPagamentoDTO } from '../../../gasto/models/forma-pagamento';
import { FormaPagamentoService } from '../../../gasto/services/forma-pagamento';
import { CategoriaService } from '../../../categoria/services/categoria';
import { TipoCategoria } from '../../../../core/enum/tipo-categoria';
import { MultiSelect } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { DatasEmissao } from '../../../gasto/models/datas-Emissao';
import { primeiroDiaMesDate, ultimoDiaMesDate } from '../../../../shared/utils/data';
import { DatePicker } from 'primeng/datepicker';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { StatusReceitaService } from '../../services/status-receita';

@Component({
    selector: 'app-tabela',
    imports: [
        TableModule,
        NgClass,
        DatePipe,
        TitleCasePipe,
        CurrencyPipe,
        Tag,
        MultiSelect,
        FormsModule,
        DatePicker,
        Button,
        IconField,
        InputIcon,
        InputTextModule,
    ],
    templateUrl: './tabela.html',
    styleUrl: './tabela.css',
})
export class Tabela implements OnInit {
    receitaResponseDTO = input<ReceitaResponseDTO[]>([]);
    isMobile = window.innerWidth < 768;
    tableSize: 'small' | 'large' | undefined = this.isMobile ? 'small' : undefined;
    @HostListener('window:resize')
    onResize() {
        this.isMobile = window.innerWidth < 768;
        this.tableSize = this.isMobile ? 'small' : undefined;
    }

    datasEmissaoOutput = output<DatasEmissao>({});
    dataInicio = signal<Date>(primeiroDiaMesDate());
    dataFim = signal<Date>(ultimoDiaMesDate());
    receitaEditarOutput = output<number>();
    receitaDeletarOutput = output<number>();

    dataInicioInvalida = false;
    dataFimInvalida = false;
    msgErroData = '';
    statusFiltro = signal<StatusReceitaDTO[]>([]);
    statusFiltroSelecionado = signal<StatusReceitaDTO[]>([]);
    categoriaFiltro = signal<CategoriaDTO[]>([]);
    categoriaFiltroSelecionado = signal<CategoriaDTO[]>([]);
    formaPagamentoFiltro = signal<FormaPagamentoDTO[]>([]);
    formaPagamentoFiltroSelecionado = signal<FormaPagamentoDTO[]>([]);

    receitas = computed(() =>
        this.receitaResponseDTO().map((r) => ({
            ...r,
            corFormaPagamento: this._coresBadgeService.getCorFormaPagamento(r.formaPagamento.nome),
            corStatus: this._coresBadgeService.getCorStatusReceita(r.status.nome),
        })),
    );
    private _coresBadgeService = inject(CoresBadgeService);
    private _statusService = inject(StatusReceitaService);
    private _categoriaService = inject(CategoriaService);
    private _formaPagamentoService = inject(FormaPagamentoService);

    ngOnInit() {
        this.getStatusReceita();
        this.getCategoria();
        this.getFormaPagamento();
    }

    getStatusReceita() {
        this._statusService.listar().subscribe({
            next: (response) => {
                this.statusFiltro.set(
                    response.map((s) => ({
                        ...s,
                        nomeExibicao:
                            s.nome.charAt(0).toUpperCase() + s.nome.slice(1).toLowerCase(),
                    })),
                );
            },
        });
    }

    getCategoria() {
        this._categoriaService.listar(TipoCategoria.RECEITA).subscribe({
            next: (response) => {
                this.categoriaFiltro.set(response);
            },
        });
    }

    getFormaPagamento() {
        this._formaPagamentoService.listar().subscribe({
            next: (response) => {
                this.formaPagamentoFiltro.set(response);
            },
        });
    }

    onFiltroTabela(event: TableFilterEvent) {
        const filtros: Record<string, WritableSignal<unknown[]>> = {
            'status.nome': this.statusFiltroSelecionado,
            'categoria.nome': this.categoriaFiltroSelecionado,
            'formaPagamento.nome': this.formaPagamentoFiltroSelecionado,
        };

        Object.entries(filtros).forEach(([campo, signal]) => {
            if (this.filtroFoiLimpo(event.filters?.[campo])) {
                signal.set([]);
            }
        });
    }

    private filtroFoiLimpo(filtro: unknown): boolean {
        return !filtro || (Array.isArray(filtro) && filtro[0]?.value === null);
    }

    emitirBuscar() {
        if (this.validarDatas()) {
            const datas: DatasEmissao = {
                dataInicio: this.dataInicio(),
                dataFim: this.dataFim(),
            };

            this.datasEmissaoOutput.emit(datas);
        }
    }
    emitirReceitaDeletar(idGasto: number) {
        this.receitaDeletarOutput.emit(idGasto);
    }
    validarDatas(): boolean {
        this.msgErroData = '';
        this.dataInicioInvalida = false;
        this.dataFimInvalida = false;

        if (this.dataInicio() == null && this.dataFim() == null) {
            this.msgErroData = 'As datas devem ser preenchidas';
            this.dataInicioInvalida = true;
            this.dataFimInvalida = true;
            return false;
        }
        if (this.dataInicio() == null) {
            this.msgErroData = 'A data inicio deve ser preenchida';
            this.dataInicioInvalida = true;
            return false;
        }
        if (this.dataFim() == null) {
            this.msgErroData = 'A data fim deve ser preenchida';
            this.dataFimInvalida = true;
            return false;
        }
        if (!(this.dataInicio() instanceof Date) || isNaN(this.dataInicio().getTime())) {
            this.msgErroData = 'A data inicial é inválida';
            this.dataInicioInvalida = true;
            return false;
        }

        if (!(this.dataFim() instanceof Date) || isNaN(this.dataFim().getTime())) {
            this.msgErroData = 'A data final é inválida';
            this.dataFimInvalida = true;
            return false;
        }
        if (this.dataInicio() > this.dataFim()) {
            this.dataInicioInvalida = true;
            this.dataFimInvalida = true;
            this.msgErroData = 'A data fim não pode ser menor que a data inicial';
            return false;
        }
        return true;
    }

    emitirReceitaEditar(receitaId: number) {
        this.receitaEditarOutput.emit(receitaId);
    }
}
