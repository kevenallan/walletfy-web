import { Component, inject, OnInit, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { AuthService } from '../../features/auth/services/auth';

@Component({
    selector: 'app-menu',
    imports: [DrawerModule, RouterLink],
    templateUrl: './menu.html',
    styleUrl: './menu.css',
})
export class Menu implements OnInit {
    sidebarVisible = false;
    sair = output<void>();

    nomeUsuario!: string;
    rotaAtual = 'gasto';

    private _authService = inject(AuthService);

    ngOnInit(): void {
        this.nomeUsuario = this._authService.usuario()?.nome || '';
    }

    selecionarMenu(menu: string) {
        this.rotaAtual = menu;
    }
}
