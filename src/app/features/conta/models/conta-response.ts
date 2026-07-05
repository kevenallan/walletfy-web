import { TipoConta } from '../../../core/enum/tipo-conta';
import { Banco } from '../../banco/models/banco';

export interface ContaResponseDTO {
    id: number;
    nome: string;
    icone: string;
    tipo: TipoConta;
    saldo: number;
    ativo: boolean;
    banco: Banco;
}
