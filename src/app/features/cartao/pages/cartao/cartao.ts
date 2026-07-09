import { Component, inject, OnInit, signal } from '@angular/core';
import { Cartoes } from '../../components/cartoes/cartoes';
import { Card } from '../../components/card/card';
import { CartaoResponseDTO } from '../../models/cartao-response';
import { CartaoService } from '../../services/cartao';

@Component({
    selector: 'app-cartao',
    imports: [Cartoes, Card],
    templateUrl: './cartao.html',
    styleUrl: './cartao.css',
})
export class Cartao implements OnInit {
    cartaoReponseDTO = signal<CartaoResponseDTO[]>([]);
    private _cartaoService = inject(CartaoService);

    ngOnInit(): void {
        this.listar();
    }

    listar() {
        this._cartaoService.listar().subscribe({
            next: (response) => {
                this.cartaoReponseDTO.set(response);
                console.log(response);

            },
        });
    }
}
