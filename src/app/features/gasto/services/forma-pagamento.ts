import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormaPagamentoDTO } from '../models/forma-pagamento';

@Injectable({
    providedIn: 'root',
})
export class FormaPagamentoService {
    private _apiFormapagamento = environment.apiUrl + '/formas-pagamento';
    private _http = inject(HttpClient);

    listar(): Observable<FormaPagamentoDTO[]> {
        return this._http.get<FormaPagamentoDTO[]>(this._apiFormapagamento);
    }
}
