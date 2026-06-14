import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GastoDTO } from '../models/gasto';

@Injectable({
    providedIn: 'root',
})
export class GastoService {
    private _apiGasto = environment.apiUrl + '/gasto';
    private _http = inject(HttpClient);

    listar(usuarioId: number): Observable<GastoDTO[]> {
        return this._http.get<GastoDTO[]>(`${this._apiGasto}/${usuarioId}`);
    }
}
