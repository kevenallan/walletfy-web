import { Component, effect, inject, output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { AuthService } from '../../features/auth/services/auth';

@Component({
    selector: 'app-menu',
    imports: [DrawerModule, RouterLink, RouterLinkActive],
    templateUrl: './menu.html',
    styleUrl: './menu.css',
})
export class Menu {
    sidebarVisible = false;
    sair = output<void>();

    nomeUsuario!: string;

    private _router = inject(Router);

    private _authService = inject(AuthService);

    constructor() {
        effect(() => {
            this.nomeUsuario = this._authService.usuario()?.nome || '';
        });
    }

    editarPerfil() {
        this._router.navigate(['perfil/editar']);
    }
}
