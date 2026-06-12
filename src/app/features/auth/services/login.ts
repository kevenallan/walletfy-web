import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private _apiLogin = environment.apiUrl + '/auth';

    private _http = inject(HttpClient);

    // TODO: criar interfaces
    login(email: string, senha: string): Observable<any> {
        return this._http.post(`${this._apiLogin}`, { email, senha });
    }
}
