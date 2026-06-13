import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-card',
    imports: [CurrencyPipe],
    templateUrl: './card.html',
    styleUrl: './card.css',
})
export class Card {
    cards = [
        {
            icone: '',
            corIcone: '',
            backgroundIcone: '',
            //DTO
            titulo: 'Receita',
            valor: 1000,
            valorPorcentagemDescricao: -5,
            //
            descricao: '',
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
}
