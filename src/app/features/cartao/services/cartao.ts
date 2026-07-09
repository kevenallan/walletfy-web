import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CartaoRequestDTO } from '../models/cartao-request';
import { Observable } from 'rxjs';
import { CartaoResponseDTO } from '../models/cartao-response';

@Injectable({
    providedIn: 'root',
})
export class CartaoService {
    private _apiCartao = environment.apiUrl + '/cartao';
    private _http = inject(HttpClient);

    cadastrar(contaDTO: CartaoRequestDTO): Observable<CartaoResponseDTO> {
        return this._http.post<CartaoResponseDTO>(`${this._apiCartao}`, contaDTO);
    }

    listar(): Observable<CartaoResponseDTO[]> {
        return this._http.get<CartaoResponseDTO[]>(`${this._apiCartao}`);
    }
}
