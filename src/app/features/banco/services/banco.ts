import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Banco } from '../models/banco';

@Injectable({
    providedIn: 'root',
})
export class BancoService {
    private _apiBanco = environment.apiUrl + '/banco';
    private _http = inject(HttpClient);

    listar(): Observable<Banco[]> {
        return this._http.get<Banco[]>(`${this._apiBanco}`);
    }
}
