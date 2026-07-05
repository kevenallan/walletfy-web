import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContaResponseDTO } from '../models/conta-response';
import { ContaRequestDTO } from '../models/conta-request';

@Injectable({
    providedIn: 'root',
})
export class ContaService {
    private _apiConta = environment.apiUrl + '/conta';
    private _http = inject(HttpClient);

    cadastrar(contaDTO: ContaRequestDTO): Observable<ContaResponseDTO> {
        return this._http.post<ContaResponseDTO>(`${this._apiConta}`, contaDTO);
    }
    listar(): Observable<ContaResponseDTO[]> {
        return this._http.get<ContaResponseDTO[]>(`${this._apiConta}`);
    }
}
