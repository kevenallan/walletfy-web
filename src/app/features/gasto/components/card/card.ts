import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-card',
    imports: [CurrencyPipe],
    templateUrl: './card.html',
    styleUrl: './card.css',
})
export class Card {}
