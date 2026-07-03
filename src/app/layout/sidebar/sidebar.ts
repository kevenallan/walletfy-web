import { Component, inject } from '@angular/core';
import { Menu } from '../menu/menu';
import { Drawer } from 'primeng/drawer';
import { MenuMobile } from '../menu-mobile/menu-mobile';
import { AuthService } from '../../features/auth/services/auth';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
    selector: 'app-sidebar',
    imports: [Menu, Drawer, MenuMobile],
    templateUrl: './sidebar.html',
    styleUrl: './sidebar.css',
})
export class Sidebar {
    visible = false;

    private _authService = inject(AuthService);
    private _router = inject(Router);

    constructor() {
        this._router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
                this.visible = false;
            });
    }

    sair() {
        this._authService.logout();
        this._router.navigate(['']);
    }
}
