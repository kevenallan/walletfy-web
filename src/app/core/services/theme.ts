import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class Theme {
    isDark = signal(false);

    toggle(){
        this.isDark.update(v => !v);
        document.documentElement.classList.toggle('dark-mode', this.isDark());
    }
}
