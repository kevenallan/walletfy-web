import { Component, inject } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { AuthService } from '../../features/auth/services/auth';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    imports: [DrawerModule],
    templateUrl: './menu.html',
    styleUrl: './menu.css',
})
export class Menu {
    sidebarVisible = false;

    private _authService = inject(AuthService);
    private _router = inject(Router);

    redirecionarParaGastos() {
        this._router.navigate(['gasto']);
    }

    redirecionarParaCategorias() {
        this._router.navigate(['categoria']);
    }

    sair() {
        this._authService.logout();
        this._router.navigate(['']);
    }
}
