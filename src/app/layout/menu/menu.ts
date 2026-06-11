import { Component } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';

@Component({
    selector: 'app-menu',
    imports: [DrawerModule],
    templateUrl: './menu.html',
    styleUrl: './menu.css',
})
export class Menu {
    sidebarVisible = false;
}
