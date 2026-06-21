import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "../sidebar/sidebar";

@Component({
    selector: 'app-main',
    imports: [RouterOutlet, Sidebar],
    templateUrl: './main.html',
    styleUrl: './main.css',
})
export class Main {
    visible = false;
}
