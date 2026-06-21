import { Component, output } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-menu-mobile',
    imports: [RouterLink],
    templateUrl: './menu-mobile.html',
    styleUrl: './menu-mobile.css',
})
export class MenuMobile {
    sair = output<void>();
}
