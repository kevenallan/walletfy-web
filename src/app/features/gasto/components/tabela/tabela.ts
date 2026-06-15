import {
    Component,
    computed,
    EventEmitter,
    HostListener,
    input,
    output,
    Output,
} from '@angular/core';

import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';

import { TableModule } from 'primeng/table';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { NgClass } from '@angular/common';
import { GastoDTO } from '../../models/gasto';
import { TagModule } from 'primeng/tag';

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
    ],
    templateUrl: './tabela.html',
    styleUrl: './tabela.css',
})
export class Tabela {
    gastos = input<GastoDTO[]>([]);

    gastoEditarOutput = output<number>();

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
}
