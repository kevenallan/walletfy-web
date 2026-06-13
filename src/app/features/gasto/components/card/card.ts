import { CurrencyPipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { CardModel } from '../../models/card';
import { CardExibicaoModel } from '../../models/card-exibicao';

@Component({
    selector: 'app-card',
    imports: [CurrencyPipe, NgClass],
    templateUrl: './card.html',
    styleUrl: './card.css',
})
export class Card {
    cards: CardModel[] = [
        {
            titulo: 'Receita',
            valor: 1000,
            valorPorcentagemDescricao: -5,
        },
        {
            titulo: 'Despesas',
            valor: 1500,
            valorPorcentagemDescricao: 15,
        },
        {
            titulo: 'Saldo Atual',
            valor: 750,
            valorPorcentagemDescricao: -20,
        },
        {
            titulo: 'Pendentes',
            valor: 375,
            valorPorcentagemDescricao: 1,
        },
    ];

    cardsParaExibicao: CardExibicaoModel[] = [];

    constructor() {
        this.cardsParaExibicao = this.montarCardsParaExibicao();
    }

    montarCardsParaExibicao() {
        let cardExibicao: CardExibicaoModel[] = [];

        this.cards.forEach((card) => {
            cardExibicao.push({
                titulo: card.titulo,
                valor: card.valor,
                icone: this._montarIcone(card.titulo),
                corIcone: this._montarCorIcone(card.titulo),
                backgroundIcone: this._montarBackgroundIcone(card.titulo),
                descricao: this._montarDescricao(card),
            });
        });

        return cardExibicao;
    }

    private _montarIcone(titulo: string): string {
        switch (titulo) {
            case 'Receita':
                return 'pi pi-chart-bar';
            case 'Despesas':
                return 'pi pi-arrow-down';
            case 'Saldo Atual':
                return 'pi pi-wallet';
            case 'Pendentes':
                return 'pi pi-calendar-clock';
            default:
                return 'pi pi-info-circle';
        }
    }

    private _montarCorIcone(titulo: string): string {
        switch (titulo) {
            case 'Receita':
                return 'text-azul-escuro';
            case 'Despesas':
                return 'text-vermelho';
            case 'Saldo Atual':
                return 'text-verde-escuro';
            case 'Pendentes':
                return 'text-amarelo-escuro';
            default:
                return 'text-black';
        }
    }

    private _montarBackgroundIcone(titulo: string): string {
        switch (titulo) {
            case 'Receita':
                return 'bg-azul-claro';
            case 'Despesas':
                return 'bg-vermelho-claro';
            case 'Saldo Atual':
                return 'bg-verde-claro';
            case 'Pendentes':
                return 'bg-amarelo-claro';
            default:
                return 'bg-cinza-claro';
        }
    }

    private _montarDescricao(card: CardModel): string {
        if (card.titulo !== 'Pendentes') {
            return `${card.valorPorcentagemDescricao > 0 ? 'Aumento' : 'Redução'} de ${Math.abs(card.valorPorcentagemDescricao)}% em relação ao mês anterior`;
        }

        return `${card.valorPorcentagemDescricao} conta${card.valorPorcentagemDescricao !== 1 ? 's' : ''} a vencer`;
    }
}
