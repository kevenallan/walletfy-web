import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GastoDTO } from '../models/gasto';
import { GastoRequestDTO } from '../models/gasto-request';
import { ResumoMesDTO } from '../models/resumo-mes';

@Injectable({
    providedIn: 'root',
})
export class GastoService {
    private _apiGasto = environment.apiUrl + '/gasto';

    private _http = inject(HttpClient);

    listar(dataInicio: string, dataFim: string): Observable<GastoDTO[]> {
        return this._http.get<GastoDTO[]>(`${this._apiGasto}`, {
            params: { dataInicio, dataFim },
        });
    }

    detalhar(gastoId: number): Observable<GastoDTO> {
        return this._http.get<GastoDTO>(`${this._apiGasto}/${gastoId}`);
    }

    listarResumo(): Observable<ResumoMesDTO[]> {
        return this._http.get<ResumoMesDTO[]>(`${this._apiGasto}/resumo`);
    }

    cadastrar(gasto: GastoRequestDTO): Observable<GastoDTO> {
        return this._http.post<GastoDTO>(`${this._apiGasto}`, gasto);
    }

    atualizar(gasto: GastoRequestDTO): Observable<GastoDTO> {
        return this._http.put<GastoDTO>(`${this._apiGasto}`, gasto);
    }

    deletar(gastoId: number): Observable<GastoDTO> {
        return this._http.delete<GastoDTO>(`${this._apiGasto}/${gastoId}`);
    }
}
