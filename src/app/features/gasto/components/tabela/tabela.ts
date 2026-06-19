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

import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';

import { TableFilterEvent, TableModule } from 'primeng/table';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { NgClass } from '@angular/common';
import { GastoDTO } from '../../models/gasto';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';
import { StatusGastoDTO } from '../../models/status-gasto';
import { StatusGastoService } from '../../services/status-gasto';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../../categoria/service/categoria';
import { FormaPagamentoService } from '../../services/forma-pagamento';
import { CategoriaDTO } from '../../../categoria/models/categoria';
import { FormaPagamentoDTO } from '../../models/forma-pagamento';
import { DatePicker } from 'primeng/datepicker';
import { primeiroDiaMesDate, ultimoDiaMesDate } from '../../../../shared/utils/data';
import { Button } from 'primeng/button';
import { DatasEmissao } from '../../models/datas-Emissao';

@Component({
    selector: 'app-tabela',
    imports: [
        TableModule,
        IconField,
        InputIcon,
        InputTextModule,
        NgClass,
        CurrencyPipe,
        DatePipe,
        TitleCasePipe,
        TagModule,
        MultiSelectModule,
        FormsModule,
        DatePicker,
        Button,
    ],
    templateUrl: './tabela.html',
    styleUrl: './tabela.css',
})
export class Tabela implements OnInit {
    gastos = input<GastoDTO[]>([]);

    datasEmissaoOutput = output<DatasEmissao>({});
    dataInicio = signal<Date>(primeiroDiaMesDate());
    dataFim = signal<Date>(ultimoDiaMesDate());
    gastoEditarOutput = output<number>();
    gastoDeletarOutput = output<number>();

    gastosComCor = computed(() =>
        this.gastos().map((g) => ({
            ...g,
            corFormaPagamento: this.getCorFormaPagamento(g.formaPagamento.nome),
            corStatus: this.getCorStatus(g.status.nome),
            corIconeStatus: this.getCorIconeStatus(g.status.nome),
        })),
    );

    isMobile = window.innerWidth < 768;
    tableSize: 'small' | 'large' | undefined = this.isMobile ? 'small' : undefined;
    @HostListener('window:resize')
    onResize() {
        this.isMobile = window.innerWidth < 768;
        this.tableSize = this.isMobile ? 'small' : undefined;
    }

    private readonly CORES_FORMA_PAGAMENTO: Record<string, string> = {
        PIX: 'bg-verde! text-white!',
        Débito: 'bg-azul! text-white!',
        Crédito: 'bg-roxo! text-white!',
        Dinheiro: 'bg-amarelo! text-white!',
        Boleto: 'bg-laranja! text-white!',
        Transferência: 'bg-cinza! text-white!',
    };

    private readonly CORES_STATUS: Record<string, string> = {
        PAGO: 'bg-verde-claro! text-verde!',
        PENDENTE: 'bg-amarelo-claro! text-amarelo!',
        ATRASADO: 'bg-vermelho-claro! text-vermelho!',
        CANCELADO: 'bg-cinza-claro! text-cinza!',
    };

    private readonly CORES_ICONE_STATUS: Record<string, string> = {
        PAGO: 'text-verde!',
        PENDENTE: 'text-amarelo!',
        ATRASADO: 'text-vermelho!',
        CANCELADO: 'text-cinza!',
    };

    private _statusService = inject(StatusGastoService);
    private _categoriaService = inject(CategoriaService);
    private _formaPagamentoService = inject(FormaPagamentoService);

    statusFiltro = signal<StatusGastoDTO[]>([]);
    statusFiltroSelecionado = signal<StatusGastoDTO[]>([]);
    categoriaFiltro = signal<CategoriaDTO[]>([]);
    categoriaFiltroSelecionado = signal<CategoriaDTO[]>([]);
    formaPagamentoFiltro = signal<FormaPagamentoDTO[]>([]);
    formaPagamentoFiltroSelecionado = signal<FormaPagamentoDTO[]>([]);

    ngOnInit() {
        this.getStatusGasto();
        this.getCategoria();
        this.getFormaPagamento();
    }

    getStatusGasto() {
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
        this._categoriaService.listar(1).subscribe({
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

    private getCorFormaPagamento(formaPagamento: string): string {
        return this.CORES_FORMA_PAGAMENTO[formaPagamento] ?? 'bg-cinza! text-white!';
    }

    private getCorStatus(status: string): string {
        return this.CORES_STATUS[status] ?? 'bg-cinza-claro! text-cinza!';
    }

    private getCorIconeStatus(status: string): string {
        return this.CORES_ICONE_STATUS[status] ?? 'text-cinza!';
    }

    emitirGastoEditar(idGasto: number) {
        this.gastoEditarOutput.emit(idGasto);
    }

    emitirGastoDeletar(idGasto: number) {
        this.gastoDeletarOutput.emit(idGasto);
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
        const datas: DatasEmissao = {
            dataInicio: this.dataInicio(),
            dataFim: this.dataFim(),
        };

        this.datasEmissaoOutput.emit(datas);
    }
}
