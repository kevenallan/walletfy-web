import { Component } from '@angular/core';
import { Cartoes } from "../../components/cartoes/cartoes";
import { Card } from "../../components/card/card";

@Component({
    selector: 'app-cartao',
    imports: [Cartoes, Card],
    templateUrl: './cartao.html',
    styleUrl: './cartao.css',
})
export class Cartao {}
