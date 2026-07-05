import { TipoConta } from '../../../core/enum/tipo-conta';

export interface ContaRequestDTO {
    id?: number;
    nome: string;
    tipo: TipoConta;
    saldoInicial: number;
    bancoId: number;
}
