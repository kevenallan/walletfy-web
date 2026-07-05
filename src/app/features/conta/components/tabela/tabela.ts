import { Component, computed, HostListener, input, output } from '@angular/core';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ContaResponseDTO } from '../../models/conta-response';
import { TIPO_CONTA_LABEL } from '../../../../core/enum/tipo-conta';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-tabela',
    imports: [TableModule, IconField, InputIcon, InputTextModule, CurrencyPipe],
    templateUrl: './tabela.html',
    styleUrl: './tabela.css',
})
export class Tabela {
    contas = input<ContaResponseDTO[]>([]);
    protected readonly TIPO_CONTA_LABEL = TIPO_CONTA_LABEL;
    contasComLabel = computed<ContaResponseDTO[]>(() =>
        this.contas().map((conta) => ({
            ...conta,
            tipoLabel: TIPO_CONTA_LABEL[conta.tipo],
            imagemConta: this.imagemConta(conta),
        })),
    );
    deletar = output<number>();
    editar = output<ContaResponseDTO>();
    isMobile = window.innerWidth < 768;
    tableSize: 'small' | 'large' | undefined = this.isMobile ? 'small' : undefined;
    @HostListener('window:resize')
    onResize() {
        this.isMobile = window.innerWidth < 768;
        this.tableSize = this.isMobile ? 'small' : undefined;
    }
    imagemConta(conta: ContaResponseDTO) {
        const path = '/icons/bancos/';
        let imagem: string;
        const extensao = '.png';
        switch (conta.tipo) {
            case 'CORRENTE':
            case 'POUPANCA':
                imagem = conta.banco.icone;
                break;
            case 'CARTEIRA':
                imagem = 'carteira';
                break;
            case 'VALE_REFEICAO':
                imagem = 'vr';
                break;
            case 'VALE_ALIMENTACAO':
                imagem = 'va';
                break;
            default:
                imagem = 'carteira';
                break;
        }

        return path + imagem + extensao;
    }
}
