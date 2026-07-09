import { Component, input, OnInit } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { CartaoResponseDTO } from '../../models/cartao-response';
import { CurrencyPipe } from '@angular/common';
@Component({
    selector: 'app-cartoes',
    imports: [ProgressBarModule, CurrencyPipe],
    templateUrl: './cartoes.html',
    styleUrl: './cartoes.css',
})
export class Cartoes implements OnInit {
    cartoes = input<CartaoResponseDTO[]>([]);

    ngOnInit(): void {
        console.log(this.cartoes());
    }
}
