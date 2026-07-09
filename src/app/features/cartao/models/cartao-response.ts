import { Conta } from '../../conta/pages/conta/conta';

export interface CartaoResponseDTO {
    id: number;
    conta: Conta;
    nome: string;
    limite: number;
    diaFechamento: number;
    diaVencimento: number;
}
