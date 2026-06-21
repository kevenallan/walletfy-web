import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatusGastoDTO } from '../models/status-gasto';

@Injectable({
    providedIn: 'root',
})
export class StatusGastoService {
    private _apiStatusGasto = environment.apiUrl + '/status-gasto';
    private _http = inject(HttpClient);

    listar(): Observable<StatusGastoDTO[]> {
        return this._http.get<StatusGastoDTO[]>(this._apiStatusGasto);
    }
}
