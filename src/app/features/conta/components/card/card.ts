import { Component, computed, input } from '@angular/core';
import { CardConfig } from '../../../categoria/models/card-config';
import { ContaResumoResponseDTO } from '../../models/conta-resumo-response';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-card',
    imports: [NgClass],
    templateUrl: './card.html',
    styleUrl: './card.css',
})
export class Card {
    resumo = input<ContaResumoResponseDTO | null>();

    cards = computed<CardConfig[]>(() => {
        const r = this.resumo();
        if (!r) return [];

        return [
            {
                titulo: 'Saldo total',
                valor: `${new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(r.saldoTotal as number)}`,
                descricao: 'Total em todas as contas',
                icone: 'pi-wallet',
                corIcone: 'text-verde',
                corFundo: 'bg-verde-suave',
            },
            {
                titulo: 'Maior movimentação',
                valor: `${r.contaMovimentacaoNome}`,
                descricao: `A conta teve ${r.contaMovimentacaoQtd} transações`,
                icone: 'pi-chart-line',
                corIcone: 'text-azul',
                corFundo: 'bg-azul-suave',
            },
            {
                titulo: 'Maior saldo',
                valor: `${r.contaMaiorSaldoNome}`,
                descricao: `A conta possui ${new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(r.contaMaiorSaldoValor as number)}`,
                icone: 'pi-dollar',
                corIcone: 'text-amarelo',
                corFundo: 'bg-amarelo-claro',
            },
            {
                titulo: 'Total poupança',
                valor: `${new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(r.totalPoupanca as number)}`,
                descricao: 'Você guardou esta quantia',
                icone: 'pi-briefcase',
                corIcone: 'text-roxo',
                corFundo: 'bg-roxo-claro',
            },
        ];
    });
}
