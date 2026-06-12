import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private _apiLogin = environment.apiUrl + '/auth';

    private _http = inject(HttpClient);

    login(email: string, senha: string) {
        this._http.post(`${this._apiLogin}/login`, { email, senha }).subscribe({
            next: (response) => {
                console.log('Login bem-sucedido:', response);
            },
            error: (error) => {
                console.error('Erro no login:', error);
            },
        });
    }
}
