import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatusReceitaDTO } from '../models/status-receita';

@Injectable({
    providedIn: 'root',
})
export class StatusReceitaService {
    private _apiStatusReceita = environment.apiUrl + '/status-receita';
    private _http = inject(HttpClient);

    listar(): Observable<StatusReceitaDTO[]> {
        return this._http.get<StatusReceitaDTO[]>(this._apiStatusReceita);
    }
}
