import { Component, output } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-menu',
    imports: [DrawerModule, RouterLink],
    templateUrl: './menu.html',
    styleUrl: './menu.css',
})
export class Menu {
    sidebarVisible = false;
    sair = output<void>();
}
