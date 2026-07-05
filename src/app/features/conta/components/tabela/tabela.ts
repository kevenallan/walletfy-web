import { Component, HostListener, output, signal } from '@angular/core';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ContaResponseDTO } from '../../models/conta-response';
import { TipoConta } from '../../../../core/enum/tipo-conta';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-tabela',
    imports: [TableModule, IconField, InputIcon, InputTextModule, CurrencyPipe],
    templateUrl: './tabela.html',
    styleUrl: './tabela.css',
})
export class Tabela {
    contas = signal<ContaResponseDTO[]>([
        {
            id: 1,
            nome: 'Nubank',
            icone: '/',
            tipo: TipoConta.CORRENTE,
            saldo: 1000,
            ativo: true,
            banco: {
                id: 1,
                nome: 'Nubank',
                icone: 'nubank',
                cor: '#8A05BE',
            },
        },
                {
            id: 1,
            nome: 'bb',
            icone: '/',
            tipo: TipoConta.CORRENTE,
            saldo: 1000,
            ativo: true,
            banco: {
                id: 1,
                nome: 'bb',
                icone: 'bb',
                cor: '#8A05BE',
            },
        },
                {
            id: 1,
            nome: 'bradesco',
            icone: '/',
            tipo: TipoConta.CORRENTE,
            saldo: 1000,
            ativo: true,
            banco: {
                id: 1,
                nome: 'bradesco',
                icone: 'bradesco',
                cor: '#8A05BE',
            },
        },
                {
            id: 1,
            nome: 'c6',
            icone: '/',
            tipo: TipoConta.CORRENTE,
            saldo: 1000,
            ativo: true,
            banco: {
                id: 1,
                nome: 'c6',
                icone: 'c6',
                cor: '#8A05BE',
            },
        },
                {
            id: 1,
            nome: 'caixa',
            icone: '/',
            tipo: TipoConta.CORRENTE,
            saldo: 1000,
            ativo: true,
            banco: {
                id: 1,
                nome: 'caixa',
                icone: 'caixa',
                cor: '#8A05BE',
            },
        },
                {
            id: 1,
            nome: 'inter',
            icone: '/',
            tipo: TipoConta.CORRENTE,
            saldo: 1000,
            ativo: true,
            banco: {
                id: 1,
                nome: 'inter',
                icone: 'inter',
                cor: '#8A05BE',
            },
        },
                {
            id: 1,
            nome: 'itau',
            icone: '/',
            tipo: TipoConta.CORRENTE,
            saldo: 1000,
            ativo: true,
            banco: {
                id: 1,
                nome: 'itau',
                icone: 'itau',
                cor: '#8A05BE',
            },
        },
                {
            id: 1,
            nome: 'santander',
            icone: '/',
            tipo: TipoConta.CORRENTE,
            saldo: 1000,
            ativo: true,
            banco: {
                id: 1,
                nome: 'santander',
                icone: 'santander',
                cor: '#8A05BE',
            },
        },
    ]);
    deletar = output<number>();
    editar = output<number>();
    isMobile = window.innerWidth < 768;
    tableSize: 'small' | 'large' | undefined = this.isMobile ? 'small' : undefined;
    @HostListener('window:resize')
    onResize() {
        this.isMobile = window.innerWidth < 768;
        this.tableSize = this.isMobile ? 'small' : undefined;
    }
}
