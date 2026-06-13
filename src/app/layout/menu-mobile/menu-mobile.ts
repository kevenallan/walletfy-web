import { Component, inject } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu-mobile',
    imports: [],
    templateUrl: './menu-mobile.html',
    styleUrl: './menu-mobile.css',
})
export class MenuMobile {
    private _authService = inject(AuthService);
    private _router = inject(Router);

    sair() {
        this._authService.logout();
        this._router.navigate(['']);
    }
}
