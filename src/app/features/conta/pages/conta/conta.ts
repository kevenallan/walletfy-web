import { Component, HostListener } from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from '../../components/card/card';
import { Tabela } from '../../components/tabela/tabela';

@Component({
    selector: 'app-conta',
    imports: [Button, Card, Tabela],
    templateUrl: './conta.html',
    styleUrl: './conta.css',
})
export class Conta {
    isMobile = window.innerWidth < 768;

    @HostListener('window:resize')
    onResize() {
        this.isMobile = window.innerWidth < 768;
    }

    verResumo = false;
}
