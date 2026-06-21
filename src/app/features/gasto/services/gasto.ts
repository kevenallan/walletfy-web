import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
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

    listar(usuarioId: number, dataInicio: string, dataFim: string): Observable<GastoDTO[]> {
        return this._http.get<GastoDTO[]>(`${this._apiGasto}/${usuarioId}`, {
            params: { dataInicio, dataFim },
        });
    }

    detalhar(gastoId: number, usuarioId: number): Observable<GastoDTO> {
        const params = new HttpParams()
            .set('gastoId', gastoId.toString())
            .set('usuarioId', usuarioId.toString());

        return this._http.get<GastoDTO>(`${this._apiGasto}`, { params });
    }

    listarResumo(usuarioId: number): Observable<ResumoMesDTO[]> {
        const params = new HttpParams().set('usuarioId', usuarioId.toString());

        return this._http.get<ResumoMesDTO[]>(`${this._apiGasto}/resumo`, { params });
    }

    cadastrar(gasto: GastoRequestDTO, usuarioId: number): Observable<GastoDTO> {
        return this._http.post<GastoDTO>(`${this._apiGasto}/${usuarioId}`, gasto);
    }

    atualizar(gasto: GastoRequestDTO, usuarioId: number): Observable<GastoDTO> {
        return this._http.put<GastoDTO>(`${this._apiGasto}/${usuarioId}`, gasto);
    }

    deletar(gastoId: number, usuarioId: number): Observable<GastoDTO> {
        return this._http.delete<GastoDTO>(`${this._apiGasto}/${usuarioId}/${gastoId}`);
    }
}
