import { Component, HostListener } from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from '../../components/card/card';

@Component({
    selector: 'app-gasto',
    imports: [Button, Card],
    templateUrl: './gasto.html',
    styleUrl: './gasto.css',
})
export class Gasto {
    isMobile = window.innerWidth < 768;

    @HostListener('window:resize')
    onResize() {
        this.isMobile = window.innerWidth < 768;
    }
}
