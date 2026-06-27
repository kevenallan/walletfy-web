import { Component, inject, OnInit, output } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { RouterLink } from '@angular/router';
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

    private _authService = inject(AuthService);

    ngOnInit(): void {
        this.nomeUsuario = this._authService.usuario()?.nome || '';
    }
}
