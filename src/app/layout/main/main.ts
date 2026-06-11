import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from '../menu/menu';
import { Drawer } from 'primeng/drawer';
import { MenuMobile } from '../menu-mobile/menu-mobile';

@Component({
    selector: 'app-main',
    imports: [RouterOutlet, Menu, Drawer, MenuMobile],
    templateUrl: './main.html',
    styleUrl: './main.css',
})
export class Main {
    visible = false;
}
